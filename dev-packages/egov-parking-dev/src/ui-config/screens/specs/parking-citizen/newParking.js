import {
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getLabel,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import store from "ui-redux/store";
import { getPattern } from "../../../../../../../packages/lib/egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
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
  labelName: `Parking Master ${getName()} Record`,
  labelKey: `Parking Master ${getName()} Record`,
});

export const submitApplication = async (state, dispatch) => {
  let selectedAreaId;
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "parkingForm",
    {}
  );

  let areaData = get(
    state.screenConfiguration.preparedFinalObject.parkingMasterMdmsData
      .parkingMaster,
    "area",
    {}
  );

  if (areaData.length > 0) {
    areaData.forEach((area) => {
      if (area.code == searchScreenObject.areaId) {
        selectedAreaId = area.id;
      }
    });
  }

  if (Object.keys(searchScreenObject).length == 0) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill all the fields to save",
          labelKey: "Please fill all the fields to save",
        },
        "error"
      )
    );
    return;
  }

  let formValid = false;
  if (
    searchScreenObject.parkingCode != "" &&
    searchScreenObject.parkingName != "" &&
    searchScreenObject.totalNumOfSpaces != "" &&
    searchScreenObject.areaId != ""
  ) {
    formValid = true;
  }

  if (!formValid) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields to save",
          labelKey: "Please fill valid fields to save",
        },
        "error"
      )
    );
    return;
  }
  const isParkingCodeValid = validateFields(
    "components.div.children.areaContainer.children.cardContent.children.parkingForm.children.parkingCode",
    state,
    dispatch,
    "newParking"
  );
  const isParkingNameValid = validateFields(
    "components.div.children.areaContainer.children.cardContent.children.parkingForm.children.parkingName",
    state,
    dispatch,
    "newParking"
  );
  const isOccupancyValid = validateFields(
    "components.div.children.areaContainer.children.cardContent.children.parkingForm.children.totalNumOfSpaces",
    state,
    dispatch,
    "newParking"
  );
  const isAreaValid = validateFields(
    "components.div.children.areaContainer.children.cardContent.children.parkingForm.children.areaId",
    state,
    dispatch,
    "newParking"
  );

  if (
    !(
      isParkingCodeValid &&
      isParkingNameValid &&
      isOccupancyValid &&
      isAreaValid
    )
  ) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please validate the form",
          labelKey: "Please validate the form",
        },
        "error"
      )
    );
    return;
  } else {
    formValid = true;
    let requestBody = state.screenConfiguration.preparedFinalObject.parkingForm;

    let requestData = { ...requestBody };
    requestData.areaId = selectedAreaId;
    parseInt(requestData.totalNumOfSpaces);

    let typeOfForm = state.screenConfiguration.preparedFinalObject.typeOfForm;
    if (typeOfForm == "New") {
      try {
        let payload = null;
        payload = await httpRequest(
          "post",
          "/parking-services/registerParkingLot",
          "_search",
          [],
          requestData
        );

        let status = payload.status;
        if (status == "Successful") {
          dispatch(prepareFinalObject("newParkingForm", get(payload)));
          alert(payload.statusDescription);
          setRoute(`/parking-citizen/parkingMaster`);
        } else if (status == "Failed") alert(payload.statusDescription);
      } catch (e) {
        console.log(e);
      }
    } else if (typeOfForm == "Update") {
      try {
        let payload = null;
        payload = await httpRequest(
          "post",
          "/parking-services/updateParkingLot",
          "_search",
          [],
          requestData
        );

        let status = payload.status;
        if (status == "Successful") {
          dispatch(prepareFinalObject("newParkingForm", get(payload)));
          alert(payload.statusDescription);
          setRoute(`/parking-citizen/parkingMaster`);
        } else if (status == "Failed") alert(payload.statusDescription);
      } catch (e) {
        console.log(e);
      }
    }
  }
};

const getParkingAreaList = async (action, dispatch) => {
  try {
    let payload = null;
    payload = await httpRequest(
      "get",
      "/parking-services/getParkingAreaList",
      "_search",
      [],
      {}
    );

    let types = [];
    if (payload) {
      types = payload.map((item) => {
        return {
          id: item.areaId,
          code: item.streetName,
        };
      });
    }

    dispatch(
      prepareFinalObject("parkingMasterMdmsData.parkingMaster.area", types)
    );
  } catch (e) {
    console.log(e);
  }
};

const getParkingData = async (action, state, dispatch) => {
  const clickedParkingCode = get(
    state.screenConfiguration.preparedFinalObject,
    "editParkingForm.clickedParkingCode",
    ""
  );

  const typeOfForm = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm",
    ""
  );
  const requestBody = { parkingCode: clickedParkingCode };

  if (typeOfForm == "New") {
    dispatch(
      prepareFinalObject("parkingForm", {
        parkingCode: "",
        parkingName: "",
        areaId: "",
        remarks: "",
        description: "",
        totalNumOfSpaces: "",
        latitudeOfStartingPoint: "",
        longitudeOfStartingPoint: "",
        latitudeOfEndingPoint: "",
        longitudeOfEndingPoint: "",
      })
    );
  } else {
    try {
      const payload = await httpRequest(
        "post",
        "/parking-services/viewParkingMaster",
        "",
        [],
        requestBody
      );
      dispatch(prepareFinalObject("parkingViewData", payload));

      const objectForDataView = {
        parkingCode: payload.parkingCode,
        parkingName: payload.parkingName,
        areaId: payload.areaId,
        remarks: payload.remarks,
        description: payload.description,
        totalNumOfSpaces: payload.totalNumOfSpaces,
        latitudeOfStartingPoint: payload.latitudeOfStartingPoint,
        longitudeOfStartingPoint: payload.longitudeOfStartingPoint,
        latitudeOfEndingPoint: payload.latitudeOfEndingPoint,
        longitudeOfEndingPoint: payload.longitudeOfEndingPoint,
      };

      dispatch(prepareFinalObject("parkingForm", objectForDataView));

      setTimeout(() => {
        let areaValue = "";

        const areaList = get(
          state.screenConfiguration.preparedFinalObject,
          "parkingMasterMdmsData.parkingMaster.area",
          ""
        );

        if (areaList.length > 0) {
          areaList.forEach((item) => {
            if (item.id == payload.areaId) {
              areaValue = item.code;
            }
          });
        }

        dispatch(
          handleField(
            "newParking",
            "components.div.children.areaContainer.children.cardContent.children.parkingForm.children.areaId",
            "props.value",
            areaValue
          )
        );
      }, 500);
    } catch (e) {
      console.log(e);
    }
  }
};

const getData = async (action, state, dispatch) => {
  await getParkingData(action, state, dispatch);
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
        "newParking",
        "components.div.children.headerDiv.children.header.children.key",
        "props.labelKey",
        `Parking Master ${heading} Record`
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
          "newParking",
          "components.div.children.areaContainer.children.cardContent.children.parkingForm.children.parkingCode",
          "props.disabled",
          false
        )
      );

      dispatch(
        handleField(
          "newParking",
          "components.div.children.areaContainer.children.cardContent.children.parkingForm.children.parkingCode",
          "props.disabled",
          false
        )
      );
    } else if (heading == "Update") {
      dispatch(
        handleField(
          "newParking",
          "components.div.children.areaContainer.children.cardContent.children.parkingForm.children.parkingCode",
          "props.disabled",
          true
        )
      );

      dispatch(
        handleField(
          "newParking",
          "components.div.children.areaContainer.children.cardContent.children.parkingForm.children.parkingName",
          "props.disabled",
          true
        )
      );
    }
  }, 100);
};

const areaDropdown = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "parkingForm.areaId",
  required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer",
    },
    label: {
      labelName: "streetName",
      labelKey: "Area",
    },

    placeholder: {
      labelName: "Select Area",
      labelKey: "Select Area",
    },
    sourceJsonPath: "parkingMasterMdmsData.parkingMaster.area",
    labelsFromLocalisation: true,
    suggestions: [],
    fullwidth: true,
    required: true,
    isClearable: true,
    inputLabelProps: {
      shrink: true,
    },
  },

  gridDefination: {
    xs: 12,
    sm: 4,
  },
};

const newParkingForm = {
  uiFramework: "material-ui",
  name: "newParking",
  beforeInitScreen: (action, state, dispatch) => {
    setHeader(action, state, dispatch);
    setFieldSet(action, state, dispatch);
    getParkingAreaList(action, dispatch);
    getData(action, state, dispatch);
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        // className: "common-div-css",
        style: {
          margin: "0px 16px 88px 16px",
        },
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
          parkingForm: getCommonContainer({
            parkingCode: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              pattern: /^[a-zA-Z0-9-]*$/i,
              errorMessage: "Invalid Code..",
              maxLength: 15,
              label: {
                labelKey: "Parking Code",
              },
              placeholder: {
                labelKey: "Please Enter Parking Code",
              },
              required: true,
              visible: true,
              jsonPath: "parkingForm.parkingCode",
            }),

            parkingName: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Parking Name",
              },
              pattern: getPattern("Name"),
              errorMessage: "Invalid Name..",
              placeholder: {
                labelKey: "Please Enter Parking Name",
              },
              required: true,
              visible: true,
              jsonPath: "parkingForm.parkingName",
            }),

            areaId: areaDropdown,

            // area: getSelectField({
            //   gridDefination: {
            //     xs: 12,
            //     sm: 4,
            //   },
            //   label: {
            //     labelKey: "Area",
            //   },
            //   placeholder: {
            //     labelKey: "Please Enter Area",
            //   },
            //   required: true,
            //   visible: true,
            //   jsonPath: "parkingForm.area",
            //   // data: [
            //   //   { code: "BBSR", name: "BBSR" },
            //   //   { code: "CTC", name: "CTC" },
            //   // ],
            //   // afterFieldChange: (action, state, dispatch) => {
            //   //   const parkingForm = get(
            //   //     state.screenConfiguration,
            //   //     "preparedFinalObject.parkingForm",
            //   //     []
            //   //   );
            //   //   console.log("On change area", parkingForm);
            //   // },
            // }),

            remarks: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Remarks",
              },
              placeholder: {
                labelKey: "Please Enter Remarks",
              },

              visible: true,
              jsonPath: "parkingForm.remarks",
            }),

            description: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Description",
              },
              placeholder: {
                labelKey: "Please Enter Description",
              },

              visible: true,
              jsonPath: "parkingForm.description",
            }),

            totalNumOfSpaces: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Total Occupancy",
              },

              pattern: /^[0-9]{1,3}$/i,
              errorMessage: "Invalid Occupancy",
              placeholder: {
                labelKey: "Please Enter total occupancy",
              },
              required: true,
              visible: true,
              jsonPath: "parkingForm.totalNumOfSpaces",
            }),
            latitudeOfStartingPoint: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              pattern: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/i,
              errorMessage: "Invalid Latitude of Starting Point",
              // maxLength: 15,
              label: {
                labelKey: "Latitude Of Starting Point",
              },
              placeholder: {
                labelKey: "Please Enter Latitude Of Starting Point",
              },
              required: true,
              visible: true,
              jsonPath: "parkingForm.latitudeOfStartingPoint",
            }),
            longitudeOfStartingPoint: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              pattern: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/i,
              errorMessage: "Invalid Longitude of Starting Point",
              // maxLength: 15,
              label: {
                labelKey: "Longitude Of Starting Point",
              },
              placeholder: {
                labelKey: "Please Enter Longitude Of Starting Point",
              },
              required: true,
              visible: true,
              jsonPath: "parkingForm.longitudeOfStartingPoint",
            }),
            latitudeOfEndingPoint: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              pattern: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/i,
              errorMessage: "Invalid Latitude of Ending Point",
              // maxLength: 15,
              label: {
                labelKey: "Latitude Of Ending Point",
              },
              placeholder: {
                labelKey: "Please Enter Latitude Of Ending Point",
              },
              required: true,
              visible: true,
              jsonPath: "parkingForm.latitudeOfEndingPoint",
            }),
            longitudeOfEndingPoint: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              pattern: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/i,
              errorMessage: "Invalid Longitude of Ending Point",
              // maxLength: 15,
              label: {
                labelKey: "Longitude Of Ending Point",
              },
              placeholder: {
                labelKey: "Please Enter Longitude Of Ending Point",
              },
              required: true,
              visible: true,
              jsonPath: "parkingForm.longitudeOfEndingPoint",
            }),

            saveButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 12,
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
      },
    },
  },
};

export default newParkingForm;
