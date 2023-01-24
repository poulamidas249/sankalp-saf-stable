import {
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getLabel,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import store from "ui-redux/store";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getPattern } from "../../../../../../../packages/lib/egov-ui-framework/ui-config/screens/specs/utils";
import { httpRequest } from "../../../../ui-utils";
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
  labelName: `Agent POS Master ${getName()} Record`,
  labelKey: `Agent POS Master ${getName()} Record`,
});

export const submitApplication = async (state, dispatch) => {
  let isFormValid;
  let selectedParkingId;

  let selectedAgencyId;

  // agency data form value
  let posScreenObject =
    state.screenConfiguration.preparedFinalObject.agentPosForm;

  // agentPosMasterMdmsData.agentPosSearch.agencyDetail
  // list of parking
  let parkingData =
    state.screenConfiguration.preparedFinalObject.agentPosMasterMdmsData
      .agentPosSearch.parkingDetail;

  //list of agency
  let agencyData =
    state.screenConfiguration.preparedFinalObject.agentPosMasterMdmsData
      .agentPosSearch.agencyDetail;

  if (parkingData.length > 0) {
    parkingData.forEach((item) => {
      if (item.code == posScreenObject.parkingId) {
        selectedParkingId = item.id;
      }
    });
  }

  if (agencyData.length > 0) {
    agencyData.forEach((item) => {
      if (item.code == posScreenObject.agencyId) {
        selectedAgencyId = item.id;
      }
    });
  }

  let screenData = state.screenConfiguration.preparedFinalObject.agentPosForm;

  let parkingId = screenData.parkingId;

  let agencyId = screenData.agencyId;

  let posId = screenData.posId;

  let posidRegex = /^[a-zA-Z0-9]{1,15}$/i;

  if (parkingId && posId && posidRegex.test(posId) && agencyId) {
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
      state.screenConfiguration.preparedFinalObject.agentPosForm;
    let requestData = { ...requestBody };

    requestData.parkingId = selectedParkingId;
    requestData.agencyId = selectedAgencyId;

    let typeOfForm = state.screenConfiguration.preparedFinalObject.typeOfForm;

    if (typeOfForm == "New") {
      try {
        let payload = null;
        payload = await httpRequest(
          "post",
          "/parking-services/registerAgencyPOS",
          "_search",
          [],
          requestData
        );
        console.log("payload==", payload);
        if (payload.status === "Successful") {
          // alert("New Agent Pos Record successfully saved");
          dispatch(
            toggleSnackbar(
              true,
              {
                labelName: "New Agent Pos Record successfully saved",
                labelKey: "New Agent Pos Record successfully saved",
              },
              "success"
            )
          );
          dispatch(prepareFinalObject("agentPosForm", {}));
          setRoute(`/parking-citizen/agentPosMaster`);
        }
        if (payload.status === "Failed") {
          alert("Error occurred, please try again.");
        }
        dispatch(prepareFinalObject("detailsMasterForm", get(payload)));
      } catch (e) {
        console.log(e);
      }
    } else if (typeOfForm == "Update") {
      let selectedId;
      let clickedPosId =
        state.screenConfiguration.preparedFinalObject.editAgencyPOSForm
          .clickedPosId;
      let editId =
        state.screenConfiguration.preparedFinalObject.agencyPOSViewData;

      editId &&
        editId.length > 0 &&
        editId.map((item) => {
       
          if (
            item.parkingId == selectedParkingId 
            // item.agencyId == selectedAgencyId &&
            // item.posId == clickedPosId
          ) {
            selectedId = item.id;
          }
        });

      requestData.id = selectedId;
      console.log("selectedId", selectedId);
      try {
        let payload = null;
        payload = await httpRequest(
          "post",
          "/parking-services/updateAgencyPOS",
          "_search",
          [],
          requestData
        );

        if (payload.status === "Successful") {
          // alert("Agent Pos Record successfully updated");
          dispatch(
            toggleSnackbar(
              true,
              {
                labelName: "Agent Pos Record successfully updated",
                labelKey: "Agent Pos Record successfully updated",
              },
              "success"
            )
          );
          dispatch(prepareFinalObject("agentPosForm", {}));
          dispatch(setRoute(`/parking-citizen/parkingMaster`));
        }
        if (payload.status === "Failed") {
          alert("Error occurred, please try again.");
          dispatch(prepareFinalObject("agentPosForm", {}));
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

const getPosMasterData = async (action, state, dispatch) => {
  const clickedParkingCode = get(
    state.screenConfiguration.preparedFinalObject,
    "editAgencyPOSForm.clickedParkingCode",
    ""
  );

  const typeOfForm = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm",
    ""
  );
  const requestBody = { parkingId: clickedParkingCode };

  if (typeOfForm == "New") {
    dispatch(
      prepareFinalObject("agencyForm", {
        parkingId: "",
        posId: "",
        agencyId: "",
      })
    );
  } else {
    try {
      const payload = await httpRequest(
        "post",
        "/parking-services/viewParkingAgencyPOSMaster",
        "",
        [],
        requestBody
      );
      dispatch(prepareFinalObject("agencyPOSViewData", payload));

      const objectForDataView = {
        parkingId: payload[0].parkingId,
        posId: payload[0].posId,
        agencyId: payload[0].agencyId,
      };

      dispatch(prepareFinalObject("agentPosForm", objectForDataView));

      setTimeout(() => {
        let parkingValue = "";
        let agencyValue = "";

        const parkingList = get(
          state.screenConfiguration.preparedFinalObject,
          "agentPosMasterMdmsData.agentPosSearch.parkingDetail",
          ""
        );

        if (parkingList.length > 0) {
          parkingList.forEach((item) => {
            if (item.id == payload[0].parkingId) {
              parkingValue = item.code;
            }
          });
        }

        dispatch(
          handleField(
            "agentPosMasterForm",
            "components.div.children.areaContainer.children.cardContent.children.agentPosForm.children.parkingId",
            "props.value",
            parkingValue
          )
        );

        const agencyList = get(
          state.screenConfiguration.preparedFinalObject,
          "agentPosMasterMdmsData.agentPosSearch.agencyDetail",
          ""
        );

        if (agencyList.length > 0) {
          agencyList.forEach((item) => {
            if (item.id == payload[0].agencyId) {
              agencyValue = item.code;
            }
          });
        }

        console.log({ parkingValue });
        console.log({ agencyValue });
        dispatch(
          handleField(
            "agentPosMasterForm",
            "components.div.children.areaContainer.children.cardContent.children.agentPosForm.children.agencyId",
            "props.value",
            agencyValue
          )
        );
        // dispatch(
        //   handleField(
        //     "agentPosMasterForm",
        //     "components.div.children.areaContainer.children.cardContent.children.agentPosForm.children.posId",
        //     "props.value",
        //     payload[0].posId
        //   )
        // );
      }, 500);
    } catch (e) {
      console.log(e);
    }
  }
};

const setDisableField = () => {
  const state = store.getState();
  let service = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm"
  );

  if (service == "true") {
    return false;
  } else {
    return true;
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
        "posMasterMdmsData.posMasterDetails.parkingDetail",
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
        "agentPosMasterForm",
        "components.div.children.headerDiv.children.header.children.key",
        "props.labelKey",
        `Agent POS Master ${heading} Record`
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
          "agentPosMasterForm",
          "components.div.children.areaContainer.children.cardContent.children.agentPosForm.children.parkingId",
          "props.disabled",
          false
        )
      );
    } else if (heading == "Update") {
      dispatch(
        handleField(
          "agentPosMasterForm",
          "components.div.children.areaContainer.children.cardContent.children.agentPosForm.children.parkingId",
          "props.disabled",
          true
        )
      );
    }
  }, 100);
};

const getData = async (action, state, dispatch) => {
  await getPosMasterData(action, state, dispatch);
};

const parkingId = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "agentPosForm.parkingId",
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
    sourceJsonPath: "agentPosMasterMdmsData.agentPosSearch.parkingDetail",
    labelsFromLocalisation: true,
    suggestions: [],
    fullwidth: true,
    required: true,
    disabled: setDisableField(),
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

const agencyId = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "agentPosForm.agencyId",
  required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer",
    },
    label: {
      labelName: "agencyId",
      labelKey: "Agency Name",
    },

    placeholder: {
      labelName: "Select Agency Name",
      labelKey: "Select Agency Name",
    },
    sourceJsonPath: "agentPosMasterMdmsData.agentPosSearch.agencyDetail",
    jsonPath: "agentPosForm.agencyId",
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

const agentPosMasterForm = {
  uiFramework: "material-ui",
  name: "agentPosMasterForm",
  beforeInitScreen: (action, state, dispatch) => {
    setHeader(action, state, dispatch);
    setFieldSet(action, state, dispatch);
    getData(action, state, dispatch);

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
          agentPosForm: getCommonContainer({
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
            //   jsonPath: "agentPosForm.parkingId",
            // }),
            parkingId: parkingId,
            posId: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "POS Id",
              },
              placeholder: {
                labelKey: "Please Enter POS Id",
              },
              required: true,
              visible: true,
              jsonPath: "agentPosForm.posId",
            }),

            // agencyid: getTextField({
            //   gridDefination: {
            //     xs: 12,
            //     sm: 4,
            //   },
            //   label: {
            //     labelKey: "Agency Id"
            //   },
            //   placeholder: {
            //     labelKey: "Please Enter Agency Id"
            //   },
            //   required: true,
            //   visible: true,
            //   jsonPath: "agentPosForm.agencyid",
            // }),
            agencyId: agencyId,
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
  // ...searchApplicationDetails
};

export default agentPosMasterForm;
