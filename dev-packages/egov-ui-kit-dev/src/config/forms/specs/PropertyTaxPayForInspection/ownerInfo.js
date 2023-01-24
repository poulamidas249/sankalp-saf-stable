import { getPattern } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getLocaleLabels } from "egov-ui-framework/ui-utils/commons.js";
import { handleFieldChange, setFieldProperty } from "egov-ui-kit/redux/form/actions";
//import { getOwnerCategory } from "egov-ui-kit/utils/PTCommon";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import set from "lodash/set";
import { setDependentFields } from "./utils/enableDependentFields";

const formConfig = {
  name: "ownerInfo",
  fields: {
    ownerName: {
      id: "ownerName",
      jsonPath: "Properties[0].owners[0].userName",
      type: "textfield",
      floatingLabelText: "PT_OWNER_NAME",
      hintText: "PT_FORM3_OWNER_NAME_PLACEHOLDER",
      required: true,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: getPattern("Name"),
      errorMessage: "PT_NAME_ERROR_MESSAGE",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].owners[0].userName", field.value));
      },
    },

    ownerMobile: {
      id: "ownerMobile",
      jsonPath: "Properties[0].owners[0].mobileNumber",
      type: "textfield",
      floatingLabelText: "PT_FORM3_MOBILE_NO",
      hintText: "PT_FORM3_MOBILE_NO_PLACEHOLDER",
      required: true,
      pattern: getPattern("MobileNo"),
      errorMessage: "PT_MOBILE_NUMBER_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].owners[0].mobileNumber", field.value));
      },
    },

    ownerEmail: {
      id: "ownerEmail",
      jsonPath: "Properties[0].owners[0].emailId",
      type: "textfield",
      floatingLabelText: "PT_FORM3_EMAIL_ID",
      hintText: "PT_FORM3_EMAIL_ID_PLACEHOLDER",
      errorMessage: "PT_EMAIL_ID_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: getPattern("Email"),
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].owners[0].emailId", field.value));
      },
    },

    ownerGuardian: {
      id: "ownerGuardian",
      jsonPath: "Properties[0].owners[0].fatherOrHusbandName",
      type: "textfield",
      floatingLabelText: "PT_SEARCHPROPERTY_TABEL_GUARDIANNAME",
      hintText: "PT_FORM3_GUARDIAN_PLACEHOLDER",
      pattern: getPattern("Name"),
      required: true,
      errorMessage: "PT_NAME_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].owners[0].fatherOrHusbandName", field.value));
      },
    },

    ownerRelationship: {
      id: "ownerRelationship",
      required: true,
      jsonPath: "Properties[0].owners[0].relationship",
      type: "AutocompleteDropdown",
      localePrefix: "PT_RELATION",
      labelsFromLocalisation: false,
      floatingLabelText: "PT_FORM3_RELATIONSHIP",
      hintText: "",
      // gridDefination: {
      //   xs: 12,
      //   sm: 6,
      // },
      dropDownData: [
        { label: getLocaleLabels("Father's Name", "PT_ACK_LOCALIZATION_FATHERS_NAME"), value: "FATHER" },
        { label: getLocaleLabels("Husband's Name", "PT_ACK_LOCALIZATION_HUSBAND_NAME"), value: "HUSBAND" },
      ],
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      formName: "ownerInfo",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].owners[0].relationship", field.value));
      },
    },

    ownerAddress: {
      id: "ownerAddress",
      jsonPath: "Properties[0].owners[0].permanentAddress",
      type: "textfield",
      floatingLabelText: "PT_FORM3_CORRESPONDENCE_ADDRESS",
      hintText: "PT_FORM3_CORRESPONDENCE_ADDRESS_PLACEHOLDER",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: getPattern("Address"),
      errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].owners[0].permanentAddress", field.value));
      },
    },

    pincode: {
      id: "pincode",
      jsonPath: "Properties[0].owners[0].pincode",
      type: "textfield",
      floatingLabelText: "PinCode",
      hintText: "PinCode",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: getPattern("pincode"),
      errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].owners[0].pincode", field.value));
      },
    },

    policeStation: {
      id: "policeStation",
      jsonPath: "Properties[0].owners[0].policeStation",
      type: "textfield",
      floatingLabelText: "Police Station",
      hintText: "Police Station",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: getPattern("pincode"),
      errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].owners[0].policeStation", field.value));
      },
    },

    postOffice: {
      id: "postOffice",
      jsonPath: "Properties[0].owners[0].postOffice",
      type: "textfield",
      floatingLabelText: "Post Office",
      hintText: "Post Office",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: getPattern("pincode"),
      errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].owners[0].postOffice", field.value));
      },
    },

    //   fullWidth: true,
    //   errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    //   formName: "ownerInfo",
    //   updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
    //     const { value } = sourceField;
    //     const dependentFields = ["ownerCategoryId", "ownerCategoryIdType"];
    //     let documentTypes = get(
    //       state,
    //       `${process.env.REACT_APP_NAME === "Citizen" ? "citizen" : "employee"}.mdms.document.MdmsRes.PropertyTax.OwnerTypeDocument`,
    //       []
    //     )
    //       .filter((docu) => {
    //         return docu.ownerTypeCode === value;
    //       })
    //       .reduce((acc, curr) => {
    //         let currAcc = [...acc];
    //         let dropDownData = {
    //           label: curr.name,
    //           value: curr.code,
    //         };
    //         currAcc.push(dropDownData);
    //         return currAcc;
    //       }, []);
    //     documentTypes && documentTypes.length > 0 && documentTypes.forEach(data => { data.label = getLocaleLabels(`PROPERTYTAX_OWNERTYPEDOCUMENT_${data.value}`, `PROPERTYTAX_OWNERTYPEDOCUMENT_${data.value}`) });
    //     dispatch(setFieldProperty(formKey, "ownerCategoryIdType", "dropDownData", documentTypes));
    //     dispatch(handleFieldChange(formKey, "ownerCategoryIdType", get(documentTypes, "[0].value", "")));
    //     dispatch(setFieldProperty(formKey, "ownerCategoryIdType", "value", get(documentTypes, "[0].value", "")));
    //     switch (value) {
    //       case "NONE":
    //         dispatch(handleFieldChange(formKey, "ownerCategoryId", null));
    //         setDependentFields(dependentFields, dispatch, formKey, true);
    //         break;
    //       case "WIDOW":
    //         dispatch(setFieldProperty(formKey, "ownerGender", "value", "Female"));
    //         setDependentFields(dependentFields, dispatch, formKey, false);
    //         break;
    //       default:
    //         setDependentFields(dependentFields, dispatch, formKey, false);
    //         break;
    //     }
    //   },
    //   updateOnSetField: (store, action) => {
    //     const dispatch = store.dispatch;
    //     const state = store.getState();
    //     const { fieldKey, formKey, propertyValue } = action;
    //     const dependentFields = ["ownerCategoryId", "ownerCategoryIdType"];
    //     const currentCategory = get(state, `form.${formKey}.fields.${fieldKey}.value`, "NONE");
    //     let documentTypes = get(
    //       state,
    //       `${process.env.REACT_APP_NAME === "Citizen" ? "citizen" : "employee"}.mdms.document.MdmsRes.PropertyTax.OwnerTypeDocument`,
    //       []
    //     )
    //       .filter((docu) => {
    //         return docu.ownerTypeCode === currentCategory;
    //       })
    //       .reduce((acc, curr) => {
    //         let currAcc = [...acc];
    //         let dropDownData = {
    //           label: curr.name,
    //           value: curr.code,
    //         };
    //         currAcc.push(dropDownData);
    //         return currAcc;
    //       }, []);
    //     documentTypes && documentTypes.length > 0 && documentTypes.forEach(data => { data.label = getLocaleLabels(`PROPERTYTAX_OWNERTYPEDOCUMENT_${data.value}`, `PROPERTYTAX_OWNERTYPEDOCUMENT_${data.value}`) });
    //     dispatch(setFieldProperty(formKey, "ownerCategoryIdType", "dropDownData", documentTypes));
    //     dispatch(setFieldProperty(formKey, "ownerCategoryIdType", "value", get(documentTypes, "[0].value", "")));
    //     if (propertyValue.length > 0) {
    //       if (currentCategory === "NONE") {
    //         setDependentFields(dependentFields, dispatch, formKey, true);
    //       } else {
    //         setDependentFields(dependentFields, dispatch, formKey, false);
    //       }
    //     }
    //     return action;
    //   },
    // },
    // ownerCategoryId: {
    //   id: "ownerCategoryId",
    //   jsonPath: "Properties[0].propertyDetails[0].owners[0].document.documentUid",
    //   required: true,
    //   type: "textfield",
    //   floatingLabelText: "PT_FORM3_DOCUMENT_ID_NO",
    //   hintText: "PT_FORM3_DOCUMENT_ID_NO_PLACEHOLDER",
    //   toolTip: true,
    //   toolTipMessage: "PT_DOCUMENT_ID_TOOLTIP_MESSAGE",
    //   errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    //   hideField: true,
    // },
    // ownerCategoryIdType: {
    //   id: "ownerCategoryIdType",
    //   jsonPath: "Properties[0].propertyDetails[0].owners[0].document.documentType",
    //   required: true,
    //   localePrefix: { moduleName: "PropertyTax", masterName: "OwnerTypeDocument" },
    //   type: "AutocompleteDropdown",
    //   floatingLabelText: "PT_FORM3_DOCUMENT_ID_TYPE",
    //   fullWidth: true,
    //   hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    //   toolTip: true,
    //   toolTipMessage: "PT_DOCUMENT_ID_TYPE_TOOLTIP_MESSAGE",
    //   errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    //   dropDownData: [],
    //   hideField: true,
    //   gridDefination: {
    //     xs: 12,
    //     sm: 6
    //   },
    //   formName: "ownerInfo",
    //   updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
    //     const { value } = sourceField;
    //     if (value === "Aadhar") {
    //       dispatch(setFieldProperty(formKey, "ownerCategoryId", "pattern", /^[0-9]{12}$/i));
    //       dispatch(setFieldProperty(formKey, "ownerCategoryId", "errorMessage", "Enter valid 12 digits aadhar no"));
    //     } else {
    //       dispatch(setFieldProperty(formKey, "ownerCategoryId", "pattern", ""));
    //       dispatch(setFieldProperty(formKey, "ownerCategoryId", "errorMessage", ""));
    //     }
    //   },
    // },
    ownerGender: {
      id: "ownerGender",
      jsonPath: "Properties[0].owners[0].gender",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].owners[0].gender", field.value));
      },
    },
    // ownershipType:{
    //   id : "ownershipType" ,
    //   jsonPath : "Properties[0].propertyDetails[0].ownershipType" ,
    //   type: "textfield",
    //   hidden : true,
    //   formName: "ownerInfo" ,
    //   value : "STATEGOVERNMENT"
    // }  ,
    // premisesType:{
    //   id : "premisesType" ,
    //   jsonPath : "Properties[0].propertyDetails[0].premisesType" ,
    //   type: "textfield",
    //   hidden : true,
    //   formName: "ownerInfo",
    //   value : "STATEGOVERNMENT"
    // }  ,
    // isSameAsPropertyAddress: {
    //   id: "rcpt",
    //   type: "checkbox",
    //   jsonPath: "Properties[0].propertyDetails[0].owners[0].isCorrespondenceAddress",
    //   errorMessage: "",
    //   floatingLabelText: "PT_FORM3_ADDRESS_CHECKBOX",
    //   value: "",
    //   updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
    //     const { value: iscorrAddrSameProp } = sourceField;
    //     const { city = "", colony = "", houseNumber = "", mohalla = "", pincode = "", street = "" } = get(state, "form.propertyAddress.fields", {});
    //     const mohallaDetails =
    //       mohalla && mohalla.dropDownData && mohalla.dropDownData.find((mohallaData) => mohallaData.value === get(mohalla, "value", ""));
    //     if (iscorrAddrSameProp) {
    //       const correspondingAddress = [
    //         `${get(houseNumber, "value", "")}`,
    //         `${get(colony, "value", "")}`,
    //         `${get(street, "value", "")}`,
    //         `${get(mohallaDetails, "label", "")}`,
    //         `${get(city, "value", "")
    //           .split(".")
    //           .pop()}`,
    //         `${get(pincode, "value", "")}`,
    //       ]
    //         .join(", ")
    //         .replace(/^(,\s)+|(,\s)+$/g, "")
    //         .replace(/(,\s){2,}/g, ", ")
    //         .replace(":", "");
    //       dispatch(setFieldProperty(formKey, "ownerAddress", "value", correspondingAddress));
    //       dispatch(handleFieldChange(formKey, "ownerAddress", correspondingAddress));
    //     } else {
    //       dispatch(setFieldProperty(formKey, "ownerAddress", "value", ""));
    //     }
    //   },
    // },
  },
  beforeInitForm: (action, store, dispatch) => {
    try {
      let state = store.getState();

      const OwnerTypes = get(state, `common.generalMDMSDataById.OwnerType`);
      // let financialYearFromQuery = window.location.search.split("FY=")[1];
      // financialYearFromQuery = financialYearFromQuery.split("&")[0];
      // const dropdownData = getOwnerCategoryByYear(Object.values(OwnerTypes), financialYearFromQuery);
      // let dropdownData = getOwnerCategory(Object.values(OwnerTypes));
      dropdownData &&
        dropdownData.length > 0 &&
        dropdownData.forEach((data) => {
          data.label = getLocaleLabels(`COMMON_MASTERS_OWNERTYPE_${data.value}`, `COMMON_MASTERS_OWNERTYPE_${data.value}`);
        });

      //  set(action, "form.fields.ownerCategory.dropDownData", dropdownData);
      const ownerShipType = get(state, "form.ownershipType.fields.typeOfOwnership.value", "");
      if (ownerShipType === "SINGLEOWNER") {
        set(action, "form.fields.ownerGender.value", get(state, "form.ownerInfo.fields.ownerGender.value", "Male"));
      }

      return action;
    } catch (e) {
      return action;
    }
  },
  afterInitForm: (action, store, dispatch) => {
    // set the form
    const setFields = () => {
      // dispatch for inspection form
      function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return "";
        return decodeURIComponent(results[2].replace(/\+/g, " "));
      }

      const urlParams = getParameterByName("isInspection");

      if (urlParams == "yes") {
        let state = store.getState();
        let data = get(state.screenConfiguration.preparedFinalObject, "Properties");

        if (data && data.length > 0) {
          if (data[0].owners.length > 0) {
            let ownerInfo = data[0].owners[0];

            dispatch(setFieldProperty("ownerInfo", "ownerName", "value", ownerInfo.userName ? ownerInfo.userName : ""));
            dispatch(setFieldProperty("ownerInfo", "ownerMobile", "value", ownerInfo.mobileNumber ? ownerInfo.mobileNumber : ""));
            dispatch(setFieldProperty("ownerInfo", "ownerEmail", "value", ownerInfo.emailId ? ownerInfo.emailId : ""));
            dispatch(setFieldProperty("ownerInfo", "ownerGuardian", "value", ownerInfo.fatherOrHusbandNam ? ownerInfo.fatherOrHusbandNam : ""));
            dispatch(setFieldProperty("ownerInfo", "ownerRelationship", "value", ownerInfo.relationship ? ownerInfo.relationship : ""));
            dispatch(setFieldProperty("ownerInfo", "ownerAddress", "value", ownerInfo.permanentAddress ? ownerInfo.permanentAddress : ""));
            dispatch(setFieldProperty("ownerInfo", "pincode", "value", ownerInfo.pincode ? ownerInfo.pincode : ""));
            dispatch(setFieldProperty("ownerInfo", "policeStation", "value", ownerInfo.policeStation ? ownerInfo.policeStation : ""));
            dispatch(setFieldProperty("ownerInfo", "postOffice", "value", ownerInfo.postOffice ? ownerInfo.postOffice : ""));
            dispatch(setFieldProperty("ownerInfo", "ownerGender", "value", ownerInfo.gender ? ownerInfo.gender : ""));

            dispatch(prepareFinalObject("Properties[0].owners[0].userName", ownerInfo.userName ? ownerInfo.userName : ""));
            dispatch(prepareFinalObject("Properties[0].owners[0].mobileNumber", ownerInfo.mobileNumber ? ownerInfo.mobileNumber : ""));
            dispatch(prepareFinalObject("Properties[0].owners[0].emailId", ownerInfo.emailId ? ownerInfo.emailId : ""));
            dispatch(
              prepareFinalObject("Properties[0].owners[0].fatherOrHusbandName", ownerInfo.fatherOrHusbandName ? ownerInfo.fatherOrHusbandName : "")
            );
            dispatch(prepareFinalObject("Properties[0].owners[0].relationship", ownerInfo.relationship ? ownerInfo.relationship : ""));
            dispatch(prepareFinalObject("Properties[0].owners[0].permanentAddress", ownerInfo.permanentAddress ? ownerInfo.permanentAddress : ""));
            dispatch(prepareFinalObject("Properties[0].owners[0].pincode", ownerInfo.pincode ? ownerInfo.pincode : ""));
            dispatch(prepareFinalObject("Properties[0].owners[0].policeStation", ownerInfo.policeStation ? ownerInfo.policeStation : ""));
            dispatch(prepareFinalObject("Properties[0].owners[0].postOffice", ownerInfo.postOffice ? ownerInfo.postOffice : ""));
            dispatch(prepareFinalObject("Properties[0].owners[0].gender", ownerInfo.gender ? ownerInfo.gender : ""));
          }
        }
      }
    };

    try {
      const formKey = get(action, "form.name", "");
      const state = store.getState();
      const currentOwnershipTypeNew = get(state, "form.ownershipType.fields.ownerShipType.value", "");
      let formData = get(state, "form", {});
      let count = 0;
      for (let [key, value] of Object.entries(formData)) {
        if (key.indexOf("ownerInfo") !== -1) count = count + 1;
      }
      if (count !== 1 && count !== 0) {
        if (currentOwnershipTypeNew === "Owner Available") {
          dispatch(setFieldProperty(`ownerInfo_${count - 1}`, "ownerName", "required", true));
          dispatch(setFieldProperty(`ownerInfo_${count - 1}`, "ownerMobile", "required", true));
          dispatch(setFieldProperty(`ownerInfo_${count - 1}`, "ownerGuardian", "required", true));
        } else {
          dispatch(setFieldProperty(`ownerInfo_${count - 1}`, "ownerName", "required", false));
          dispatch(setFieldProperty(`ownerInfo_${count - 1}`, "ownerMobile", "required", false));
          dispatch(setFieldProperty(`ownerInfo_${count - 1}`, "ownerGuardian", "required", false));
        }
      }
      if (get(state, `form.${formKey}.fields.ownerRelationship.value`, "NONE") === "NONE") {
        dispatch(handleFieldChange(formKey, "ownerRelationship", "FATHER"));
      }
      //   if (get(state, `form.${formKey}.fields.ownerCategory.value`, "NONE") === "NONE") {
      //     dispatch(setFieldProperty(formKey, "ownerCategoryId", "hideField", true));
      //     dispatch(setFieldProperty(formKey, "ownerCategoryIdType", "hideField", true));
      //   } else {
      //     dispatch(setFieldProperty(formKey, "ownerCategoryId", "hideField", false));
      //     dispatch(setFieldProperty(formKey, "ownerCategoryIdType", "hideField", false));
      //   }
      //   const currentCategory = get(state, `form.${action.form.name}.fields.ownerCategory.value`, "NONE");
      let documentTypes = get(
        state,
        `${process.env.REACT_APP_NAME === "Citizen" ? "citizen" : "employee"}.mdms.document.MdmsRes.PropertyTax.OwnerTypeDocument`,
        []
      )
        .filter((docu) => {
          return docu.ownerTypeCode === currentCategory;
        })
        .reduce((acc, curr) => {
          let currAcc = [...acc];
          let dropDownData = {
            label: curr.name,
            value: curr.code,
          };
          currAcc.push(dropDownData);
          return currAcc;
        }, []);

      documentTypes &&
        documentTypes.length > 0 &&
        documentTypes.forEach((data) => {
          data.label = getLocaleLabels(`PROPERTYTAX_OWNERTYPEDOCUMENT_${data.value}`, `PROPERTYTAX_OWNERTYPEDOCUMENT_${data.value}`);
        });
      dispatch(setFieldProperty(action.form.name, "ownerCategoryIdType", "dropDownData", documentTypes));
      dispatch(setFieldProperty("ownerInfo", "ownershipType", "value", "STATEGOVERNMENT"));
      dispatch(setFieldProperty("ownerInfo", "premisesType", "value", "STATEGOVERNMENT"));

      return action;
    } catch (e) {
      setFields();
      return action;
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};
export default formConfig;
