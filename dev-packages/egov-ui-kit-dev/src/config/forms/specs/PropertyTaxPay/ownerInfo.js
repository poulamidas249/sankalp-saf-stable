import {
  getPattern
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getLocaleLabels } from "egov-ui-framework/ui-utils/commons.js";
import { handleFieldChange, setFieldProperty } from "egov-ui-kit/redux/form/actions";
//import { getOwnerCategory } from "egov-ui-kit/utils/PTCommon";
import get from "lodash/get";
import set from "lodash/set";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { setDependentFields } from "./utils/enableDependentFields";
const formConfig = {
  name: "ownerInfo",
  fields: {
    // premisesType: {
    //     id: "premisesType",
    //     required: true,
    //     jsonPath: "Properties[0].propertyDetails[0].owners[0].premisesType",
    //     type: "AutocompleteDropdown",
    //     localePrefix: "PT_PREMISES",
    //     labelsFromLocalisation: false,
    //     floatingLabelText: "Premises Type",
    //     hintText: "",
    //     gridDefination: {
    //       xs: 12,
    //       sm: 6
    //     },
    //     dropDownData: [{ label: getLocaleLabels("Father's Name", "primises Name One"), value: "One" }, { label: getLocaleLabels("primises Name Two", "primises Name One"), value: "Two" }],
    //     errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    //     formName: "ownerInfo"
    //   },
    // premisesType: {
    //     id: "premisesType",
    //     required: true,
    //     jsonPath: "Properties[0].propertyDetails[0].owners[0].premisesType",
    //     type: "AutocompleteDropdown",
    //     localePrefix: "PT_PREMISES",
    //     labelsFromLocalisation: false,
    //     floatingLabelText: "Premises Type",
    //     hintText: "",
    //     gridDefination: {
    //       xs: 12,
    //       sm: 6
    //     },
    //     dropDownData: [{ label: getLocaleLabels("Father's Name", "primises Name One"), value: "One" }, { label: getLocaleLabels("primises Name Two", "primises Name One"), value: "Two" }],
    //     errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    //     formName: "ownerInfo"
    //   },

    name: {
      id: "name",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].name",
      type: "textfield",
      floatingLabelText: "PT_OWNER_NAME",
      hintText: "PT_FORM3_OWNER_NAME_PLACEHOLDER",
      required: true,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: getPattern("Name"),
      errorMessage: "PT_NAME_ERROR_MESSAGE",
    },
    mobileNumber: {
      id: "mobileNumber",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].mobileNumber",
      type: "textfield",
      floatingLabelText: "PT_FORM3_MOBILE_NO",
      hintText: "PT_FORM3_MOBILE_NO_PLACEHOLDER",
      required: true,
      pattern: getPattern("MobileNo"),
      errorMessage: "PT_MOBILE_NUMBER_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    },
    // ownerAlterMobile: {
    //   id: "ownerAlterMobile",
    //   jsonPath: "Properties[0].propertyDetails[0].owners[0].alternatemobilenumber",
    //   type: "textfield",
    //   floatingLabelText: "PT_FORM3_ALT_MOBILE_NO",
    //   hintText: "PT_FORM3_ALT_MOBILE_NO_PLACEHOLDER",
    //   required: false,
    //   pattern: getPattern("MobileNo"),
    //   errorMessage: "PT_MOBILE_NUMBER_ERROR_MESSAGE",
    //   errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    // },
    fatherOrHusbandName: {
      id: "fatherOrHusbandName",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].fatherOrHusbandName",
      type: "textfield",
      floatingLabelText: "PT_SEARCHPROPERTY_TABEL_GUARDIANNAME",
      hintText: "PT_FORM3_GUARDIAN_PLACEHOLDER",
      pattern: getPattern("Name"),
      required: true,
      errorMessage: "PT_NAME_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    },
    emailId: {
      id: "emailId",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].emailId",
      type: "textfield",
      floatingLabelText: "PT_FORM3_EMAIL_ID",
      hintText: "PT_FORM3_EMAIL_ID_PLACEHOLDER",
      errorMessage: "PT_EMAIL_ID_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: getPattern("Email"),
    },
    address: {
      id: "address",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].address",
      type: "textfield",
      required: true,
      floatingLabelText: "PT_FORM3_CORRESPONDENCE_ADDRESS",
      hintText: "PT_FORM3_CORRESPONDENCE_ADDRESS_PLACEHOLDER",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: getPattern("Address"),
      errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
    },
    relationship: {
      id: "relationship",
      required: true,
      jsonPath: "Properties[0].propertyDetails[0].owners[0].relationship",
      type: "AutocompleteDropdown",
      localePrefix: "PT_RELATION",
      labelsFromLocalisation: false,
      floatingLabelText: "PT_FORM3_RELATIONSHIP",
      hintText: "",
      gridDefination: {
        xs: 12,
        sm: 6
      },
      dropDownData: [{ label: getLocaleLabels("Father's Name", "PT_ACK_LOCALIZATION_FATHERS_NAME"), value: "FATHER" }, { label: getLocaleLabels("Husband's Name", "PT_ACK_LOCALIZATION_HUSBAND_NAME"), value: "HUSBAND" }],
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      formName: "ownerInfo"
    },
    pincode: {
      id: "pincode",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].pincode",
      type: "textfield",
      required: true,
      floatingLabelText: "Pincode",
      hintText: "Pincode",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: getPattern("pincode"),
      errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
    },
    policeStation: {
      id: "policeStation",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].policeStation",
      type: "textfield",
      floatingLabelText: "Police Station",
      hintText: "Police Station",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: getPattern("pincode"),
      errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
    },
    postOffice: {
      id: "postOffice",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].postOffice",
      type: "textfield",
      floatingLabelText: "Post Office",
      hintText: "Post Office",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: getPattern("pincode"),
      errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
    },
    ownerGender: {
      id: "ownerGender",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].gender",
    },
    // ownerCategory: {
    //   id: "ownerCategory",
    //   required: true,
    //   localePrefix: { moduleName: "PropertyTax", masterName: "OwnerType" },
    //   jsonPath: "Properties[0].propertyDetails[0].owners[0].ownerType",
    //   type: "AutocompleteDropdown",
    //   defaultSort: false,
    //   floatingLabelText: "PT_FORM3_SPECIAL_CATEGORY",
    //   hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    //   dropDownData: [],
    //   gridDefination: {
    //     xs: 12,
    //     sm: 6
    //   },
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
    //       dispatch(setFieldProperty(formKey, "address", "value", correspondingAddress));
    //       dispatch(handleFieldChange(formKey, "address", correspondingAddress));
    //     } else {
    //       dispatch(setFieldProperty(formKey, "address", "value", ""));
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
      dropdownData && dropdownData.length > 0 && dropdownData.forEach(data => { data.label = getLocaleLabels(`COMMON_MASTERS_OWNERTYPE_${data.value}`, `COMMON_MASTERS_OWNERTYPE_${data.value}`) });
      //  set(action, "form.fields.ownerCategory.dropDownData", dropdownData);
      // const ownerShipType = get(state, "form.ownershipType.fields.typeOfOwnership.value", "");
      // if (ownerShipType === "SINGLEOWNER") {
      // }
      set(action, "form.fields.ownerGender.value", get(state, "form.ownerInfo.fields.ownerGender.value", "Male"));
      return action;
    } catch (e) {
      return action;
    }
  },
  afterInitForm: (action, store, dispatch) => {


    try {
      const formKey = get(action, "form.name", "");
      const state = store.getState();
      const {propertyRes } = state.screenConfiguration.preparedFinalObject
      const currentOwnershipTypeNew = get(state, "form.ownershipType.fields.ownerShipType.value", "");
      let formData = get(state, "form", {})
      let count = 0;
      for (let [key, value] of Object.entries(formData)) {
        if (key.indexOf("ownerInfo") !== -1) count = count + 1;
      }
      if (count !== 1 && count !== 0) {
        if (currentOwnershipTypeNew === "Owner Available") {

          dispatch(setFieldProperty(`ownerInfo_${count - 1}`, "name", "required", true));
          dispatch(setFieldProperty(`ownerInfo_${count - 1}`, "mobileNumber", "required", true));
          dispatch(setFieldProperty(`ownerInfo_${count - 1}`, "fatherOrHusbandName", "required", true));

        } else {

          dispatch(setFieldProperty(`ownerInfo_${count - 1}`, "name", "required", false));
          dispatch(setFieldProperty(`ownerInfo_${count - 1}`, "mobileNumber", "required", false));
          dispatch(setFieldProperty(`ownerInfo_${count - 1}`, "fatherOrHusbandName", "required", false));

        }
      }
      if (get(state, `form.${formKey}.fields.relationship.value`, "NONE") === "NONE") {
        dispatch(handleFieldChange(formKey, "relationship", "FATHER"));
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
      documentTypes && documentTypes.length > 0 && documentTypes.forEach(data => { data.label = getLocaleLabels(`PROPERTYTAX_OWNERTYPEDOCUMENT_${data.value}`, `PROPERTYTAX_OWNERTYPEDOCUMENT_${data.value}`) });
      dispatch(setFieldProperty(action.form.name, "ownerCategoryIdType", "dropDownData", documentTypes));
      dispatch(setFieldProperty("ownerInfo", "ownershipType", "value", "STATEGOVERNMENT"));
      dispatch(setFieldProperty("ownerInfo", "premisesType", "value", "STATEGOVERNMENT"));


      // if (getQueryArg(window.location.href, "purpose") == 'approve') {

      //   let property = propertyRes
      //   dispatch(setFieldProperty("ownerInfo_0", "name", "value", property.owners[0].name));
      //   dispatch(setFieldProperty("ownerInfo_0", "mobileNumber", "value", property.owners[0].mobileNumber));
      //   dispatch(setFieldProperty("ownerInfo_0", "fatherOrHusbandName", "value", property.owners[0].fatherOrHusbandName));
      //   dispatch(setFieldProperty("ownerInfo_0", "emailId", "value", property.owners[0].emailId));
      //   dispatch(setFieldProperty("ownerInfo_0", "address", "value", property.owners[0].address));
      //   dispatch(setFieldProperty("ownerInfo_0", "relationship", "value", property.owners[0].relationship));
      //   dispatch(setFieldProperty("ownerInfo_0", "pincode", "value", property.owners[0].pincode));
      //   dispatch(setFieldProperty("ownerInfo_0", "policeStation", "value", property.owners[0].policeStation));
      //   dispatch(setFieldProperty("ownerInfo_0", "postOffice", "value", property.owners[0].postOffice));
      //   dispatch(setFieldProperty("ownerInfo_0", "ownerGender", "value", property.owners[0].ownerGender));

      // }
      return action;
    } catch (e) {
      return action;
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};
export default formConfig;

