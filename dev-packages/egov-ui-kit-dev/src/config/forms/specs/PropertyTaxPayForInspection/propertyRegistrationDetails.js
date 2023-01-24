import { mohalla } from "egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/reusableFields";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { fetchGeneralMDMSData, prepareFormData } from "egov-ui-kit/redux/common/actions";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { fetchDropdownData, generalMDMSDataRequestObj, getGeneralMDMSDataDropdownName, getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import filter from "lodash/filter";
import get from "lodash/get";
import sortBy from "lodash/sortBy";
import { getPattern } from "egov-ui-framework/ui-config/screens/specs/utils";

const formConfig = {
  name: "propertyRegistrationDetails",
  fields: {
    dag: {
      id: "dag",
      jsonPath: "Properties[0].registrationDetails.dag",
      required: false,
      labelsFromLocalisation: true,
      type: "textfield",
      floatingLabelText: "Dag",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].registrationDetails.dag", field.value));
      },
    },

    khatian: {
      id: "khatian",
      type: "textfield",
      jsonPath: "Properties[0].registrationDetails.khatian",
      floatingLabelText: "Khatian",
      numcols: 6,
      required: false,
      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_KHATIAN_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].registrationDetails.khatian", field.value));
      },
    },

    mouza: {
      id: "mouza",
      type: "textfield",
      jsonPath: "Properties[0].registrationDetails.mouza",
      floatingLabelText: "Mouza",
      numcols: 6,
      required: false,
      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_MOUZA_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].registrationDetails.mouza", field.value));
      },
    },

    queryNo: {
      id: "queryNo",
      type: "textfield",
      jsonPath: "Properties[0].registrationDetails.queryNo",
      floatingLabelText: "Query Number",
      numcols: 6,
      required: false,
      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_QUERY_NO_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].registrationDetails.queryNo", field.value));
      },
    },

    queryYear: {
      id: "queryYear",
      type: "textfield",
      jsonPath: "Properties[0].registrationDetails.queryYear",
      floatingLabelText: "Query Year",
      numcols: 6,
      required: false,
      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_QUERY_YEAR_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].registrationDetails.queryYear", field.value));
      },
    },

    deedNo: {
      id: "deedNo",
      type: "textfield",
      jsonPath: "Properties[0].registrationDetails.deedNo",
      floatingLabelText: "Deed Number",
      numcols: 6,
      required: false,

      errorMessage: "PT_DEED_NO_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].registrationDetails.deedNo", field.value));
      },
    },

    deedYear: {
      id: "deedYear",
      type: "textfield",
      jsonPath: "Properties[0].registrationDetails.deedYear",
      floatingLabelText: "Deed Year",
      numcols: 6,
      required: false,

      errorMessage: "PT_DEED_YEAR_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].registrationDetails.deedYear", field.value));
      },
    },

    location: {
      id: "location",
      type: "textfield",
      jsonPath: "Properties[0].registrationDetails.location",
      floatingLabelText: "Location",
      numcols: 6,
      required: false,

      errorMessage: "PT_LOCATION_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].registrationDetails.location", field.value));
      },
    },

    ro: {
      id: "ro",
      type: "textfield",
      jsonPath: "Properties[0].registrationDetails.ro",
      floatingLabelText: "RO",
      numcols: 6,
      required: false,
      errorMessage: "PT_RO_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].registrationDetails.ro", field.value));
      },
    },

    book: {
      id: "book",
      type: "textfield",
      jsonPath: "Properties[0].registrationDetails.book",
      floatingLabelText: "Book",
      numcols: 6,
      required: false,
      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_BOOK_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].registrationDetails.book", field.value));
      },
    },
  },

  afterInitForm: (action, store, dispatch) => {
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
        let registrationDetails = data[0].registrationDetails;
        dispatch(setFieldProperty("propertyRegistrationDetails", "dag", "value", registrationDetails.dag ? registrationDetails.dag : ""));
        dispatch(setFieldProperty("propertyRegistrationDetails", "khatian", "value", registrationDetails.khatian ? registrationDetails.khatian : ""));
        dispatch(setFieldProperty("propertyRegistrationDetails", "mouza", "value", registrationDetails.mouza ? registrationDetails.mouza : ""));
        dispatch(setFieldProperty("propertyRegistrationDetails", "queryNo", "value", registrationDetails.queryNo ? registrationDetails.queryNo : ""));
        dispatch(
          setFieldProperty("propertyRegistrationDetails", "queryYear", "value", registrationDetails.queryYear ? registrationDetails.queryYear : "")
        );
        dispatch(setFieldProperty("propertyRegistrationDetails", "deedNo", "value", registrationDetails.deedNo ? registrationDetails.deedNo : ""));
        dispatch(
          setFieldProperty("propertyRegistrationDetails", "deedYear", "value", registrationDetails.deedYear ? registrationDetails.deedYear : "")
        );
        dispatch(
          setFieldProperty("propertyRegistrationDetails", "location", "value", registrationDetails.location ? registrationDetails.location : "")
        );
        dispatch(setFieldProperty("propertyRegistrationDetails", "ro", "value", registrationDetails.ro ? registrationDetails.ro : ""));
        dispatch(setFieldProperty("propertyRegistrationDetails", "book", "value", registrationDetails.book ? registrationDetails.book : ""));

        dispatch(
          prepareFinalObject(
            "Properties[0].registrationDetails.characterofPremises",
            registrationDetails.characterofPremises ? registrationDetails.characterofPremises : ""
          )
        );
        dispatch(prepareFinalObject("Properties[0].registrationDetails.dag", registrationDetails.dag ? registrationDetails.dag : ""));
        dispatch(prepareFinalObject("Properties[0].registrationDetails.khatian", registrationDetails.khatian ? registrationDetails.khatian : ""));
        dispatch(prepareFinalObject("Properties[0].registrationDetails.mouza", registrationDetails.mouza ? registrationDetails.mouza : ""));
        dispatch(prepareFinalObject("Properties[0].registrationDetails.queryNo", registrationDetails.queryNo ? registrationDetails.queryNo : ""));
        dispatch(
          prepareFinalObject("Properties[0].registrationDetails.queryYear", registrationDetails.queryYear ? registrationDetails.queryYear : "")
        );
        dispatch(prepareFinalObject("Properties[0].registrationDetails.deedNo", registrationDetails.deedNo ? registrationDetails.deedNo : ""));
        dispatch(prepareFinalObject("Properties[0].registrationDetails.deedYear", registrationDetails.deedYear ? registrationDetails.deedYear : ""));
        dispatch(prepareFinalObject("Properties[0].registrationDetails.location", registrationDetails.location ? registrationDetails.location : ""));
        dispatch(prepareFinalObject("Properties[0].registrationDetails.ro", registrationDetails.ro ? registrationDetails.ro : ""));
        dispatch(prepareFinalObject("Properties[0].registrationDetails.book", registrationDetails.book ? registrationDetails.book : ""));
      }
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
