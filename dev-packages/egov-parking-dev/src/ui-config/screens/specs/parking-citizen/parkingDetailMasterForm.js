import {
  getSelectField,
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getLabel,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "../../../../ui-utils";
import store from "ui-redux/store";
import { validateFields } from "../utils/index";

const getName = () => {
  let state = store.getState();

  let heading = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm"
  );
  return heading;
};

const header = getCommonHeader({
  labelName: `Parking Details Master ${getName()} Record`,
  labelKey: `Parking Details Master ${getName()} Record`,
});

export const submitApplication = async (state, dispatch) => {
  let isFormValid;
  let selectedParkingId;
  let detailScreenObject =
    state.screenConfiguration.preparedFinalObject.detailsMasterForm;

  let parkingData =
    state.screenConfiguration.preparedFinalObject.parkingDetailMasterMdmsData
      .parkingDetailSearch.parkingDetail;

  if (parkingData.length > 0) {
    parkingData.forEach((item) => {
      if (item.code == detailScreenObject.parkingId) {
        selectedParkingId = item.id;
      }
    });
  }

  let screenData =
    state.screenConfiguration.preparedFinalObject.detailsMasterForm;
  let parkingId = screenData.parkingId;

  let dayCharge = screenData.dayCharge;
  let chargeRegex = /^[0-9]{1,3}$/i;

  let nightCharge = screenData.nightCharge;

  let parkingCategory = screenData.parkingCategory;

  if (
    parkingId != undefined &&
    dayCharge != undefined &&
    chargeRegex.test(dayCharge) &&
    nightCharge != undefined &&
    chargeRegex.test(nightCharge) &&
    parkingCategory != undefined
  ) {
    isFormValid = true;
  } else {
    isFormValid = false;
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields",
          labelKey: "Please fill valid fields",
        },
        "error"
      )
    );
  }
  if (isFormValid) {
    let requestBody =
      state.screenConfiguration.preparedFinalObject.detailsMasterForm;
    let requestData = { ...requestBody };
    requestData.parkingId = selectedParkingId;

    let typeOfForm = state.screenConfiguration.preparedFinalObject.typeOfForm;
  
    if (typeOfForm == "New") {
      try {
        let payload = null;
        payload = await httpRequest(
          "post",
          "/parking-services/registerParkingMasterDetail",
          "_search",
          [],
          requestData
        );

        if (payload.status === "Successful") {
          alert("New Detail Master successfully saved");
        }
        if (payload.status === "Failed") {
          alert("Error occurred, please try again.");
        }
        dispatch(prepareFinalObject("detailsMasterForm", get(payload)));
      } catch (e) {
        console.log(e);
      }
    } else if (typeOfForm == "Update") {
      let parkingId =
        state.screenConfiguration.preparedFinalObject
          .parkingDetailsSearchResult[0].parkingId;
      requestData.parkingId = parkingId;

      try {
        let payload = null;
        payload = await httpRequest(
          "post",
          "/parking-services/updateParkingMasterDetail",
          "_search",
          [],
          requestData
        );

        if (payload.status === "Successful") {
          alert("Detail Master successfully updated");
          setRoute(`/parking-citizen/agencyMaster`);
        }
        if (payload.status === "Failed") {
          alert("Error occurred, please try again.");
        }
        dispatch(prepareFinalObject("detailsMasterForm", get(payload)));
      } catch (e) {
        console.log(e);
      }
    }
  } else {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields ",
          labelKey: "Please fill valid fields ",
        },
        "error"
      )
    );
  }
};

const getParkingDetailsData = async (action, state, dispatch) => {
  const clickedParkingCode = get(
    state.screenConfiguration.preparedFinalObject,
    "editParkingDetailsForm.clickedParkingCode",
    ""
  );
console.log('clickedParkingCode',clickedParkingCode)
  const typeOfForm = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm",
    ""
  );
  const requestBody = { parkingId: clickedParkingCode[0] };

  if (typeOfForm == "New") {
    dispatch(
      prepareFinalObject("detailsMasterForm", {
        parkingId: "",
        dayCharge: "",
        nightCharge: "",
        parkingCategory: "",
      })
    );
  } else {
    try {
      const payload = await httpRequest(
        "post",
        "/parking-services/viewParkingMasterDetails",
        "",
        [],
        requestBody
      );
      dispatch(prepareFinalObject("parkingDetailsViewData", payload));
      const clickedParkingCode = get(
        state.screenConfiguration.preparedFinalObject,
        "editParkingDetailsForm.clickedParkingCode",
        ""
      );
      const objectForDataView = {
        parkingId: payload[0].parkingId,
        dayCharge: clickedParkingCode[2],
        nightCharge: clickedParkingCode[3],
        parkingCategory: clickedParkingCode[4],
      };

      dispatch(prepareFinalObject("detailsMasterForm", objectForDataView));

      setTimeout(() => {
        let parkingValue = "";

        const parkingList = get(
          state.screenConfiguration.preparedFinalObject,
          "parkingDetailMasterMdmsData.parkingDetailSearch.parkingDetail",
          ""
        );

        if (parkingList.length > 0) {
          parkingList.forEach((item) => {
            if (item.id == payload[0].parkingId) {
              parkingValue = item.code;
            }
          });
        }

        console.log({ parkingList });
        console.log({ parkingValue });

        dispatch(
          handleField(
            "parkingDetailMasterForm",
            "components.div.children.areaContainer.children.cardContent.children.detailsMasterForm.children.parkingId",
            "props.value",
            parkingValue
          )
        );
      }, 500);
    } catch (e) {
      console.log(e);
    }
  }
};

const getMDMSData = async (action, dispatch) => {
  try {
    let payload = null;
    payload = await httpRequest(
      "get",
      "/parking-services/getParkingLotList",
      "_search",
      [],
      {}
    );

    console.log("Parking Deatils Payload => ", payload);

    let types = [];
    if (payload) {
      types = payload.map((item) => {
        return {
          id: item.parkingId,
          code: item.parkingName,
        };
      });
    }

    dispatch(
      prepareFinalObject(
        "parkingDetailMasterMdmsData.parkingDetailMaster.parkingDetail",
        types
      )
    );
  } catch (e) {
    console.log(e);
  }
};

const setHeader = (action, state, dispatch) => {
  setTimeout(() => {
    let state = store.getState();
    let heading = get(
      state.screenConfiguration.preparedFinalObject,
      "typeOfForm"
    );
    dispatch(
      handleField(
        "parkingDetailMasterForm",
        "components.div.children.headerDiv.children.header.children.key",
        "props.labelKey",
        `Parking Details Master ${heading} Record`
      )
    );
  }, 100);
};

const setFieldSet = (action, state, dispatch) => {
  setTimeout(() => {
    let state = store.getState();

    let heading = get(
      state.screenConfiguration.preparedFinalObject,
      "typeOfForm"
    );

    if (heading == "New") {
      dispatch(
        handleField(
          "parkingDetailMasterForm",
          "components.div.children.areaContainer.children.cardContent.children.detailsMasterForm.children.parkingId",
          "props.disabled",
          false
        )
      );
      dispatch(
        handleField(
          "parkingDetailMasterForm",
          "components.div.children.areaContainer.children.cardContent.children.detailsMasterForm.children.parkingCategory",
          "props.disabled",
          false
        )
      );
    } else if (heading == "Update") {
      dispatch(
        handleField(
          "parkingDetailMasterForm",
          "components.div.children.areaContainer.children.cardContent.children.detailsMasterForm.children.parkingId",
          "props.disabled",
          true
        )
      );
      dispatch(
        handleField(
          "parkingDetailMasterForm",
          "components.div.children.areaContainer.children.cardContent.children.detailsMasterForm.children.parkingCategory",
          "props.disabled",
          true
        )
      );
    }
  }, 100);
};

const getData = async (action, state, dispatch) => {
  await getParkingDetailsData(action, state, dispatch);
};

const parkingId = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "detailsMasterForm.parkingId",
  required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer",
    },
    label: {
      labelName: "parkingId",
      labelKey: "Parking Name",
    },

    placeholder: {
      labelName: "Select Parking Name",
      labelKey: "Select Parking Name",
    },
    sourceJsonPath:
      "parkingDetailMasterMdmsData.parkingDetailSearch.parkingDetail",
    labelsFromLocalisation: true,
    suggestions: [],
    fullwidth: true,
    required: true,
    isClearable: true,
    inputLabelProps: {
      shrink: true,
    },
  },
  // afterFieldChange: (action, state, dispatch) => {
  //   dispatch(
  //     handleField(
  //       "incentiveReport",
  //       `components.div.children.billSlabSearchForm.children.cardContent.children.cityNameContainer.children.dynamicMdms`,
  //       "props.screenTenantId",
  //       action.value
  //     )
  //   );
  // },
  gridDefination: {
    xs: 12,
    sm: 4,
  },
};

const parkingDetailMasterForm = {
  uiFramework: "material-ui",
  name: "parkingDetailMasterForm",
  beforeInitScreen: (action, state, dispatch) => {
    setHeader(action, state, dispatch);
    setFieldSet(action, state, dispatch);
    getData(action, state, dispatch);
    // dispatch(prepareFinalObject("detailsMasterForm", {}));

    // getMDMSData(action, dispatch);
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css",
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6,
              },
              ...header,
            },
          },
        },
        areaContainer: getCommonCard({
          detailsMasterForm: getCommonContainer({
            // parkingId: getTextField({
            //   gridDefination: {
            //     xs: 12,
            //     sm: 4,
            //   },
            //   label: {
            //     labelKey: "Parking Id"
            //   },
            //   placeholder: {
            //     labelKey: "Please Enter Parking Id"
            //   },
            //   required: true,
            //   visible: true,
            //   jsonPath: "detailsMasterForm.parkingId",
            //   pattern: /^[A-Za-z0-9]{1,15}$/i,
            //   errorMessage: "Invalid Parking Id",
            // }),

            parkingId: parkingId,

            dayCharge: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Day Charge",
              },
              placeholder: {
                labelKey: "Please Enter Day Charge",
              },
              required: true,
              visible: true,
              jsonPath: "detailsMasterForm.dayCharge",
              pattern: /^[0-9]{1,3}$/i,
              errorMessage: "Invalid Day Charge",
            }),
            nightCharge: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Night Charge",
              },
              placeholder: {
                labelKey: "Please Enter Night Charge",
              },
              required: true,
              visible: true,
              jsonPath: "detailsMasterForm.nightCharge",
              pattern: /^[0-9]{1,3}$/i,
              errorMessage: "Invalid Night Charge",
            }),

            parkingCategory: getSelectField({
              label: {
                labelName: "Parking Category",
                labelKey: "Please Select Parking Category",
              },
              placeholder: {
                labelName: "Parking Category",
                labelKey: "Please Select Parking Category",
              },
              required: true,
              visible: true,
              jsonPath: "detailsMasterForm.parkingCategory",
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              data: [
                { code: "2 Wheeler", name: "Option1" },
                { code: "4 Wheeler", name: "Option2" },
                { code: "Heavy Vehicle", name: "Option3" },
              ],
              afterFieldChange: (action, state, dispatch) => {
                const detailsMasterForm = get(
                  state.screenConfiguration,
                  "preparedFinalObject.detailsMasterForm",
                  []
                );
              },
            }),
            saveButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 12,
                align: "right",
              },
              props: {
                variant: "contained",
                style: {
                  color: "white",
                  margin: "8px",
                  backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
                  borderRadius: "2px",
                  width: "220px",
                  height: "48px",
                  float: "right",
                },
              },
              children: {
                buttonLabel: getLabel({
                  labelName: "Save",
                  labelKey: "Save",
                }),
              },
              onClickDefination: {
                action: "condition",
                callBack: submitApplication,
              },
            },
          }),
        }),

        // searchApplicationTable
      },
    },
  },
};

export default parkingDetailMasterForm;
