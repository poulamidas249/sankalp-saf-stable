import {
  getSelectField,
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
import { validateFields } from "../utils/index";
import { getPattern } from "../../../../../../../packages/lib/egov-ui-framework/ui-config/screens/specs/utils";
import { httpRequest } from "../../../../ui-utils";

const getName = () => {
  let state = store.getState();

  let heading = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm"
  );
  return heading;
};

const header = getCommonHeader({
  labelName: `Agency Master ${getName()} Record`,
  labelKey: `Agency Master ${getName()} Record`,
});

export const submitApplication = async (state, dispatch) => {
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "agencyForm",
    {}
  );

  if (Object.keys(searchScreenObject).length == 0) {
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

  let formValid = false;

  if (
    searchScreenObject.agencyCode != "" &&
    searchScreenObject.agencyName != "" &&
    searchScreenObject.address != "" &&
    searchScreenObject.pincode != "" &&
    searchScreenObject.contactName != "" &&
    searchScreenObject.contactMobile != "" &&
    searchScreenObject.contactEmail != "" &&
    searchScreenObject.gstNum != "" &&
    searchScreenObject.pan != ""
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
  const isAgencyCodeValid = validateFields(
    "components.div.children.areaContainer.children.cardContent.children.agencyForm.children.agencyCode",
    state,
    dispatch,
    "newAgency"
  );
  const isAgencyNameValid = validateFields(
    "components.div.children.areaContainer.children.cardContent.children.agencyForm.children.agencyName",
    state,
    dispatch,
    "newAgency"
  );
  const isAddressValid = validateFields(
    "components.div.children.areaContainer.children.cardContent.children.agencyForm.children.address",
    state,
    dispatch,
    "newAgency"
  );
  const isPincodeValid = validateFields(
    "components.div.children.areaContainer.children.cardContent.children.agencyForm.children.pincode",
    state,
    dispatch,
    "newAgency"
  );
  const isContactNameValid = validateFields(
    "components.div.children.areaContainer.children.cardContent.children.agencyForm.children.contactName",
    state,
    dispatch,
    "newAgency"
  );
  const isContactMobileValid = validateFields(
    "components.div.children.areaContainer.children.cardContent.children.agencyForm.children.contactMobile",
    state,
    dispatch,
    "newAgency"
  );
  const isContactEmailValid = validateFields(
    "components.div.children.areaContainer.children.cardContent.children.agencyForm.children.contactEmail",
    state,
    dispatch,
    "newAgency"
  );

  const isGstNumValid = validateFields(
    "components.div.children.areaContainer.children.cardContent.children.agencyForm.children.gstNum",
    state,
    dispatch,
    "newAgency"
  );

  const isPanValid = validateFields(
    "components.div.children.areaContainer.children.cardContent.children.agencyForm.children.pan",
    state,
    dispatch,
    "newAgency"
  );

  if (
    !(
      isAgencyCodeValid &&
      isAgencyNameValid &&
      isAddressValid &&
      isPincodeValid &&
      isContactNameValid &&
      isContactMobileValid &&
      isContactEmailValid &&
      isGstNumValid &&
      isPanValid
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
    let requestBody = state.screenConfiguration.preparedFinalObject.agencyForm;
    requestBody.moduleId = 1;
    requestBody.moduleName = "Parking";

    let typeOfForm = state.screenConfiguration.preparedFinalObject.typeOfForm;
    if (typeOfForm == "New") {
      requestBody.blacklist = "No";
      try {
        let payload = null;
        payload = await httpRequest(
          "post",
          "/parking-services/registerAgency",
          "_search",
          [],
          requestBody
        );

        let status = payload.status;
        if (status == "Successful") {
          dispatch(prepareFinalObject("newAgencyForm", get(payload)));

          dispatch(
            toggleSnackbar(
              true,
              {
                labelName: "New Agency Record successfully saved!",
                labelKey: "New agency Record successfully saved!",
              },
              "success"
            )
          );
          dispatch(setRoute(`/parking-citizen/agencyMaster`));
        } else if (status == "Failed")
          dispatch(
            toggleSnackbar(
              true,
              {
                labelName: payload.statusDescription,
                labelKey: payload.statusDescription,
              },
              "error"
            )
          );
        //  alert(payload.statusDescription);
      } catch (e) {
        console.log(e);
      }
    } else if (typeOfForm == "Update") {
      try {
        let payload = null;
        payload = await httpRequest(
          "post",
          "/parking-services/updateAgency",
          "_search",
          [],
          requestBody
        );

        let status = payload.status;
        if (status == "Successful") {
          dispatch(prepareFinalObject("upateAgencyForm", get(payload)));
          dispatch(
            toggleSnackbar(
              true,
              {
                labelName: "Agency Record successfully updated",
                labelKey: "Agency Record successfully updated",
              },
              "success"
            )
          );
          // alert(payload.statusDescription);
          setRoute(`/parking-citizen/agencyMaster`);
        } else if (status == "Failed")
          dispatch(
            toggleSnackbar(
              true,
              {
                labelName: payload.statusDescription,
                labelKey: payload.statusDescription,
              },
              "error"
            )
          );
        //  alert(payload.statusDescription);
      } catch (e) {
        console.log(e);
      }
    }
  }
};

const getAgencyData = async (action, state, dispatch) => {
  const clickedAgencyCode = get(
    state.screenConfiguration.preparedFinalObject,
    "editAgencyForm.clickedAgencyCode",
    ""
  );

  const typeOfForm = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm",
    ""
  );
  const requestBody = { agencyCode: clickedAgencyCode };

  if (typeOfForm == "New") {
    dispatch(
      prepareFinalObject("agencyForm", {
        agencyCode: "",
        agencyName: "",
        address: "",
        pincode: "",
        contactName: "",
        contactMobile: "",
        contactEmail: "",
        blacklist: "",
        gstNum: "",
        pan: "",
        moduleId: 1,
        moduleName: "parking",
      })
    );
  } else {
    try {
      const payload = await httpRequest(
        "post",
        "/parking-services/viewAgency",
        "",
        [],
        requestBody
      );
      dispatch(prepareFinalObject("agencyViewData", payload));

      const objectForDataView = {
        agencyCode: payload.agencyCode,
        agencyName: payload.agencyName,
        address: payload.address,
        pincode: payload.pincode,
        contactName: payload.contactName,
        contactMobile: payload.contactMobile,
        contactEmail: payload.contactEmail,
        blacklist: payload.blacklist,
        gstNum: payload.gstNum,
        pan: payload.pan,
      };

      dispatch(prepareFinalObject("agencyForm", objectForDataView));
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

  if (service == "New") {
    return false;
  } else if (service == "Update") {
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
        "newAgency",
        "components.div.children.headerDiv.children.header.children.key",
        "props.labelKey",
        `Agency Master ${heading} Record`
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
          "newAgency",
          "components.div.children.areaContainer.children.cardContent.children.agencyForm.children.agencyCode",
          "props.disabled",
          false
        )
      );

      dispatch(
        handleField(
          "newAgency",
          "components.div.children.areaContainer.children.cardContent.children.agencyForm.children.agencyName",
          "props.disabled",
          false
        )
      );
      dispatch(
        handleField(
          "newAgency",
          "components.div.children.areaContainer.children.cardContent.children.agencyForm.children.blacklist",
          "visible",
          false
        )
      );
    } else if (heading == "Update") {
      dispatch(
        handleField(
          "newAgency",
          "components.div.children.areaContainer.children.cardContent.children.agencyForm.children.agencyCode",
          "props.disabled",
          true
        )
      );

      dispatch(
        handleField(
          "newAgency",
          "components.div.children.areaContainer.children.cardContent.children.agencyForm.children.agencyName",
          "props.disabled",
          true
        )
      );
      dispatch(
        handleField(
          "newAgency",
          "components.div.children.areaContainer.children.cardContent.children.agencyForm.children.blacklist",
          "visible",
          true
        )
      );
    }
  }, 100);
};

const getData = async (action, state, dispatch) => {
  await getAgencyData(action, state, dispatch);
};

const newAgencyForm = {
  uiFramework: "material-ui",
  name: "newAgency",
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
          agencyForm: getCommonContainer({
            agencyCode: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              pattern: /^[a-zA-Z0-9-]*$/i,
              errorMessage: "Invalid Code..",
              label: {
                labelKey: "Agent Code",
              },
              maxLength: 15,
              placeholder: {
                labelKey: "Please Enter Agent Code",
              },
              required: true,
              visible: true,
              disabled: setDisableField(),
              jsonPath: "agencyForm.agencyCode",
            }),

            agencyName: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Agent Name",
              },
              placeholder: {
                labelKey: "Please Enter Agent Name",
              },
              disabled: setDisableField(),
              required: true,
              pattern: getPattern("Name"),
              errorMessage: "Invalid Name..",
              visible: true,
              jsonPath: "agencyForm.agencyName",
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
              pattern: getPattern("Address"),
              errorMessage: "Invalid Address..",
              visible: true,
              jsonPath: "agencyForm.address",
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
                labelKey: "Please Enter Pincode",
              },
              required: true,
              pattern: getPattern("Pincode"),
              errorMessage: "Invalid Pincode..",
              visible: true,
              jsonPath: "agencyForm.pincode",
            }),

            contactName: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Contact Name",
              },
              placeholder: {
                labelKey: "Please Enter Contact Name",
              },
              pattern: getPattern("Name"),
              errorMessage: "Invalid Name..",
              required: true,
              visible: true,
              jsonPath: "agencyForm.contactName",
            }),

            contactMobile: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Phone Number",
              },
              placeholder: {
                labelKey: "Please Enter Phone Number",
              },
              iconObj: {
                label: "+91 |",
                position: "start",
              },
              pattern: getPattern("MobileNo"),
              errorMessage: "Invalid Mobile No..",
              required: true,
              visible: true,
              jsonPath: "agencyForm.contactMobile",
            }),

            contactEmail: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Email",
              },
              placeholder: {
                labelKey: "Please Enter Email",
              },
              required: true,
              visible: true,
              pattern: getPattern("Email"),
              errorMessage: "Invalid Email Id..",
              jsonPath: "agencyForm.contactEmail",
            }),

            blacklist: getSelectField({
              label: {
                labelName: "Black List",
                labelKey: "Black List",
              },
              placeholder: {
                labelName: "Select Black List",
                labelKey: "Select Black List",
              },

              visible: setDisableField(),
              jsonPath: "agencyForm.blacklist",
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              data: [
                { code: "Yes", name: "Yes" },
                { code: "No", name: "No" },
              ],
            }),

            gstNum: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "GST No.",
              },
              placeholder: {
                labelKey: "Please Enter GST No.",
              },
              pattern: getPattern("GSTNo"),
              errorMessage: "Invalid GST..",
              required: true,
              visible: true,
              jsonPath: "agencyForm.gstNum",
            }),

            pan: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "PAN",
              },
              placeholder: {
                labelKey: "Please Enter PAN",
              },
              required: true,
              pattern: getPattern("PAN"),
              errorMessage: "Invalid PAN..",
              visible: true,
              jsonPath: "agencyForm.pan",
            }),

            saveButton: {
              componentPath: "Button",

              gridDefination: {
                xs: 12,
                sm: 12,
                // align: "right",
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

export default newAgencyForm;
