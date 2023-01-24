import { mohalla } from "egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/reusableFields";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { fetchGeneralMDMSData, prepareFormData } from "egov-ui-kit/redux/common/actions";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import { fetchDropdownData, generalMDMSDataRequestObj, getGeneralMDMSDataDropdownName, getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import filter from "lodash/filter";
import get from "lodash/get";
import sortBy from "lodash/sortBy";
import {getPattern} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
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
        sm: 6
      }
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
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
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
        errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
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
        errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
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
        errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
    },
    deedNo: {
        id: "deedNo",
        type: "textfield",
        jsonPath: "Properties[0].registrationDetails.deedNo",
        floatingLabelText: "Deed Number",
        numcols: 6,
        required: false,
        //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
        errorMessage: "PT_DEED_NO_ERROR_MESSAGE",
        errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
    },
    deedYear: {
        id: "deedYear",
        type: "textfield",
        jsonPath: "Properties[0].registrationDetails.deedYear",
        floatingLabelText: "Deed Year",
        numcols: 6,
        required: false,
        //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
        errorMessage: "PT_DEED_YEAR_ERROR_MESSAGE",
        errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
    },
    location: {
        id: "location",
        type: "textfield",
        jsonPath: "Properties[0].registrationDetails.location",
        floatingLabelText: "Location",
        numcols: 6,
        required: false,
        //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
        errorMessage: "PT_LOCATION_ERROR_MESSAGE",
        errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
    },
    ro: {
        id: "ro",
        type: "textfield",
        jsonPath: "Properties[0].registrationDetails.ro",
        floatingLabelText: "RO",
        numcols: 6,
        required: false,
        //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
        errorMessage: "PT_RO_ERROR_MESSAGE",
        errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
    },
    // district: {
    //     id: "district",
    //     type: "textfield",
    //     jsonPath: "Properties[0].registrationDetails.district",
    //     floatingLabelText: "District",
    //     numcols: 6,
    //     required: false,
    //     //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
    //     errorMessage: "PT_DISTRICT_ERROR_MESSAGE",
    //     errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
    // },
    book: {
        id: "book",
        type: "textfield",
        jsonPath: "Properties[0].registrationDetails.book",
        floatingLabelText: "Book",
        numcols: 6,
        required: false,
        //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
        errorMessage: "PT_BOOK_ERROR_MESSAGE",
        errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
    },
    // dateOfRegistration: {
    //     id: "dateOfRegistration",
    //     type: "textfield",
    //     jsonPath: "Properties[0].registrationDetails.dateOfRegistration",
    //     floatingLabelText: "PT_REGISTRATION_DETAILS_DATE_OF_REGISTRATION",
    //     hintText: "PT_REGISTRATION_DETAILS_DATE_OF_REGISTRATION_PLACEHOLDER",
    //     numcols: 6,
    //     required: false,
    //     //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
    //     errorMessage: "PT_DATE_OF_REGISTRATION_ERROR_MESSAGE",
    //     errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
    // }
   
  },
  afterInitForm: (action, store, dispatch) => {
    let state = store.getState();
    const {propertyRes } = state.screenConfiguration.preparedFinalObject
  //   if (getQueryArg(window.location.href, "purpose") == 'approve') {

  //     let property = propertyRes
   
  //     dispatch(setFieldProperty("propertyRegistrationDetails", "dag", "value", property.registrationDetails.dag));
  //     dispatch(setFieldProperty("propertyRegistrationDetails", "khatian", "value", property.registrationDetails.khatian));
  //     dispatch(setFieldProperty("propertyRegistrationDetails", "mouza", "value", property.registrationDetails.mouza));
  //     dispatch(setFieldProperty("propertyRegistrationDetails", "queryNo", "value", property.registrationDetails.queryNo));
  //     dispatch(setFieldProperty("propertyRegistrationDetails", "queryYear", "value", property.registrationDetails.queryYear));
  //     dispatch(setFieldProperty("propertyRegistrationDetails", "deedNo", "value", property.registrationDetails.deedNo));
  //     dispatch(setFieldProperty("propertyRegistrationDetails", "deedYear", "value", property.registrationDetails.deedYear));
  //     dispatch(setFieldProperty("propertyRegistrationDetails", "location", "value", property.registrationDetails.location));
  //     dispatch(setFieldProperty("propertyRegistrationDetails", "ro", "value", property.registrationDetails.ro));
  //     dispatch(setFieldProperty("propertyRegistrationDetails", "book", "value", property.registrationDetails.book));

  // }
    // try {
    //   let state = store.getState();
    //   const { localizationLabels } = state.app;
    //   const { cities, citiesByModule } = state.common;
      
    //   return action;
    // } catch (e) {
    //   return action;
    // }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
