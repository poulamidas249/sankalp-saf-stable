import {
  getSelectField,
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getLabel,
  getPattern,
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

const getName = () => {
  let state = store.getState();

  let heading = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm"
  );
  return heading;
};

export const submitApplication = async (state, dispatch) => {
  let isFormValid;
  let screenData = state.screenConfiguration.preparedFinalObject.areaForm;

  let areaCode = screenData.areaCode;
  let codeRegex = /^[a-zA-Z0-9\\_/\"]{1,15}$/i;

  let streetName = screenData.streetName;
  let nameRegex = /^[A-Za-z ]{1,50}$/i;

  let wardId = screenData.wardId;
  let wardIdRegex = /^[A-Za-z0-9]{1,15}$/i;

  let areaType = screenData.areaType;

  let address = screenData.address;
  let addressRegex = /^[a-zA-Z0-9 \\,_/\"]{1,50}$/i;

  let pincode = screenData.pincode;
  let pincodeRegex = /^[0-9]{1,6}$/i;

  if (
    areaCode != undefined &&
    codeRegex.test(areaCode) &&
    streetName != undefined &&
    nameRegex.test(streetName) &&
    areaType != undefined &&
    wardId != undefined &&
    wardIdRegex.test(wardId) &&
    pincode != undefined &&
    pincodeRegex.test(pincode) &&
    address != undefined &&
    addressRegex.test(address)
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
  console.log("isFormValid == ", isFormValid);
  if (isFormValid) {
    let requestBody = state.screenConfiguration.preparedFinalObject.areaForm;
    let typeOfForm = state.screenConfiguration.preparedFinalObject.typeOfForm;
    if (typeOfForm == "New") {
      try {
        let payload = null;
        payload = await httpRequest(
          "post",
          "/parking-services/registerArea",
          "_search",
          [],
          requestBody
        );
        if (payload.status === "Successful") {
          alert("New area successfully saved");
          //window.location.href = "/parking-citizen/areaMaster";
        }
        if (payload.status === "Failed") {
          alert("Error occurred, please try again.");
        }
        dispatch(prepareFinalObject("areaMasterForm", get(payload)));
      } catch (e) {
        console.log(e);
      }
    } else if (typeOfForm == "Update") {
      try {
        let payload = null;
        payload = await httpRequest(
          "post",
          "/parking-services/updateArea",
          "_search",
          [],
          requestBody
        );
        let status = payload.status;
        if (status == "Successful") {
          dispatch(prepareFinalObject("upateAreaForm", get(payload)));
          alert(payload.statusDescription);
          // alert("updated")
          setRoute(`/parking-citizen/areaMaster`);
        } else if (status == "Failed") {
          alert(payload.statusDescription);
          //alert("not updated")
        }
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
    // alert("Error occurred in the input, please try again.");
  }
};

const header = getCommonHeader({
  labelName: `Area Master ${getName()} Record`,
  labelKey: `Area Master ${getName()} Record`,
});

const getAreaData = async (action, state, dispatch) => {
  const clickedAreaCode = get(
    state.screenConfiguration.preparedFinalObject,
    "editAreaForm.clickedAreaCode",
    ""
  );

  const typeOfForm = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm",
    ""
  );
  const requestBody = { areaCode: clickedAreaCode };

  if (typeOfForm == "New") {
    dispatch(
      prepareFinalObject("areaForm", {
        areaCode: "",
        streetName: "",
        areaType: "",
        wardId: "",
        pincode: "",
        address: "",
      })
    );
  } else {
    try {
      const payload = await httpRequest(
        "post",
        "/parking-services/viewArea",
        "",
        [],
        requestBody
      );
      dispatch(prepareFinalObject("areaViewData", payload));

      const objectForDataView = {
        areaCode: payload.areaCode,
        streetName: payload.streetName,
        areaType: payload.areaType,
        wardId: payload.wardId,
        pincode: payload.pincode,
        address: payload.address,
      };

      dispatch(prepareFinalObject("areaForm", objectForDataView));
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

const setHeader = (action, state, dispatch) => {
  setTimeout(() => {
    let state = store.getState();
    let heading = get(
      state.screenConfiguration.preparedFinalObject,
      "typeOfForm"
    );
    dispatch(
      handleField(
        "areaMasterForm",
        "components.div.children.headerDiv.children.header.children.key",
        "props.labelKey",
        `Area Master ${heading} Record`
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
          "areaMasterForm",
          "components.div.children.areaContainer.children.cardContent.children.areaForm.children.areaCode",
          "props.disabled",
          false
        )
      );

      dispatch(
        handleField(
          "areaMasterForm",
          "components.div.children.areaContainer.children.cardContent.children.areaForm.children.streetName",
          "props.disabled",
          false
        )
      );
    } else if (heading == "Update") {
      dispatch(
        handleField(
          "areaMasterForm",
          "components.div.children.areaContainer.children.cardContent.children.areaForm.children.areaCode",
          "props.disabled",
          true
        )
      );

      // dispatch(
      //   handleField(
      //     "areaMasterForm",
      //     "components.div.children.areaContainer.children.cardContent.children.areaForm.children.streetName",
      //     "props.disabled",
      //     true
      //   )
      // );
    }
  }, 100);
};
const getData = async (action, state, dispatch) => {
  await getAreaData(action, state, dispatch);
};
const areaMasterForm = {
  uiFramework: "material-ui",
  name: "areaMasterForm",

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
          areaForm: getCommonContainer({
            areaCode: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Area Code",
              },
              placeholder: {
                labelKey: "Please Enter Area Code",
              },
              required: true,
              visible: true,
              disabled: setDisableField(),
              jsonPath: "areaForm.areaCode",
              pattern: /^[A-Za-z0-9]{1,15}$/i,
              errorMessage: "Invalid Area Code",
            }),
            streetName: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Street Name",
              },
              placeholder: {
                labelKey: "Please Enter Street Name",
              },
              required: true,
              visible: true,
              jsonPath: "areaForm.streetName",
              pattern: /^[A-Za-z ]{1,50}$/i,
              errorMessage: "Invalid Street Name",
            }),
            wardId: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Ward ID",
              },
              placeholder: {
                labelKey: "Please Enter Ward ID",
              },
              required: true,
              visible: true,

              jsonPath: "areaForm.wardId",
              pattern: /^[A-Za-z0-9]{1,15}$/i,
              errorMessage: "Invalid Ward ID",
            }),

            areaType: getSelectField({
              label: {
                labelName: "Area Type",
                labelKey: "Please Select Area type",
              },
              placeholder: {
                labelName: "Area Type",
                labelKey: "Please Select Area type",
              },
              required: true,
              visible: true,
              jsonPath: "areaForm.areaType",
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              data: [
                { code: "Cataegory A", name: "Option1" },
                { code: "Cataegory B", name: "Option2" },
                { code: "Cataegory C", name: "Option3" },
              ],
              afterFieldChange: (action, state, dispatch) => {
                // on change
                console.log("action");
                const areaForm = get(
                  state.screenConfiguration,
                  "preparedFinalObject.areaForm",
                  []
                );
                console.log("demoText", areaForm);
              },
            }),
            address: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Address",
              },
              placeholder: {
                labelKey: "Please Enter Address",
              },
              required: true,
              visible: true,
              jsonPath: "areaForm.address",
              pattern: /^[A-Za-z0-9 \\,_/\"]{1,50}$/i,
              errorMessage: "Invalid Address",
            }),

            pincode: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Pincode",
              },
              placeholder: {
                labelKey: "Please Pincode",
              },
              required: true,
              visible: true,
              jsonPath: "areaForm.pincode",
              pattern: getPattern("Pincode"),
              errorMessage: "Invalid Pincode..",
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
      },
    },
  },
};

export default areaMasterForm;
