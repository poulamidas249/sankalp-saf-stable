import { mohalla } from "egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/reusableFields";
// import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { fetchGeneralMDMSData, prepareFormData } from "egov-ui-kit/redux/common/actions";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import { fetchDropdownData, generalMDMSDataRequestObj, getGeneralMDMSDataDropdownName, getTranslatedLabel } from "egov-ui-kit/utils/commons";
// import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
// import filter from "lodash/filter";
import get from "lodash/get";
// import sortBy from "lodash/sortBy";
// import { getPattern } from "egov-ui-framework/ui-config/screens/specs/utils";
// import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";

const formConfig = {
  name: "taxCalculation",
  fields: {
    proposedQtr: {
      id: "proposedQtr",
      jsonPath: "Properties[0].taxdetails.proposedQtr",
      required: true,
      localePrefix: true,
      labelsFromLocalisation: true,
      type: "AutocompleteDropdown",
      floatingLabelText: "Proposed QTR",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorMessage: "Proposed Qtr required!",
      fullWidth: true,
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6,
      },

      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFinalObject("Properties[0].taxdetails.proposedQtr", field.value));
        //   //     dispatch(prepareFormData("Properties[0].tenantId", field.value));
        //   //     dispatch(
        //   //       prepareFormData(
        //   //         "Properties[0].taxdetails.ward",
        //   //         filter(get(state, "common.cities"), (ward) => {
        //   //           return ward.code === field.value;
        //   //         })[0].name
        //   //       )
        //   //     );
        //   //     dispatch(setFieldProperty("registrationDetails", "mohalla", "value", ""));
        //   //     const moduleValue = field.value;
        //   //     dispatch(fetchLocalizationLabel(getLocale(), moduleValue, moduleValue));
        //   //     let requestBody = generalMDMSDataRequestObj(field.value);
        //   //     dispatch(
        //   //       fetchGeneralMDMSData(requestBody, "PropertyTax", getGeneralMDMSDataDropdownName())
        //   //     );
        //   //   },
      },
    },

    proposedYear: {
      id: "proposedYear",
      type: "number",
      jsonPath: "Properties[0].taxdetails.proposedYear",
      floatingLabelText: "Propsed Year",
      hintText: "Propsed Year",
      numcols: 6,
      required: true,
      errorMessage: "Proposed Year required!",
      errorMessage: "Enter valid year",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: "^[12][0-9]{3}$",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        field.value && dispatch(prepareFinalObject("Properties[0].taxdetails.proposedYear", field.value));
      },
    },
    rrMonth: {
      id: "rrMonth",
      type: "number",
      jsonPath: "Properties[0].taxdetails.reasonableRent",
      floatingLabelText: "Resonable Rent/Month",
      hintText: "Resonable Rent/Month",
      numcols: 6,
      required: true,
      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_PINCODE_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        field.value && dispatch(prepareFormData("Properties[0].taxdetails.reasonableRent", field.value.toString()));
      },
    },

    AV: {
      id: "AV",
      type: "number",
      jsonPath: "Properties[0].taxdetails.av",
      floatingLabelText: "AV",
      hintText: "AV",
      numcols: 3,
      required: true,
      disabled: true,
      errorMessage: "PT_PINCODE_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },

      gridDefination: {
        xs: 4,
        sm: 4,
      },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFinalObject("Properties[0].taxdetails.av", field.value));
      },
    },

    // TODO: Fix the Calculate AV functionality
    testButton: {
      id: "testButton",
      type: "button",
      onClickFunc: async (state, dispatch) => {
        const proposedYearData = get(state, "form.taxCalculation.fields.proposedYear.value", "");
        const proposedQTRData = get(state, "form.taxCalculation.fields.proposedQtr.value", "");
        const premiseTypeData = get(state, "form.propertyAddress.fields.premisesType.value", "");
        const rrMonthData = get(state, "form.taxCalculation.fields.rrMonth.value", "");
        let payloadResponse = {};
        // dispatch(toggleSnackbarAndSetText(true, { labelName: "clicked", labelKey: "clicked" }, "error"));

        if (proposedQTRData && proposedYearData) {
          if (parseInt(proposedYearData) > 2016) {
            dispatch(toggleSnackbarAndSetText(true, { labelName: "No Tax", labelKey: "No Tax" }, "error"));
            dispatch(setFieldProperty("taxCalculation", "commRate", "value", "50"));
            dispatch(setFieldProperty("taxCalculation", "howrghBridge", "value", "0"));
            dispatch(setFieldProperty("taxCalculation", "taxQtr", "value", "0"));
            dispatch(setFieldProperty("taxCalculation", "surcharge", "value", "0"));
            dispatch(setFieldProperty("taxCalculation", "payableAmount", "value", "0"));
            dispatch(setFieldProperty("taxCalculation", "rebateAmount", "value", "0"));
            dispatch(setFieldProperty("taxCalculation", "netAmount", "value", "0"));

            dispatch(prepareFormData("Properties[0].taxdetails.commRate", "50"));
            dispatch(prepareFormData("Properties[0].taxdetails.howrghBridge", "0"));
            dispatch(prepareFormData("Properties[0].taxdetails.taxQtr", "0"));
            dispatch(prepareFormData("Properties[0].taxdetails.surcharge", "0"));
            dispatch(prepareFormData("Properties[0].taxdetails.payableAmount", "0"));
            dispatch(prepareFormData("Properties[0].taxdetails.rebateAmount", "0"));
            dispatch(prepareFormData("Properties[0].taxdetails.netAmount", "0"));
          } else {
            try {
              let payload = await httpRequest("post", "property-services/property/_calculateArvTax", "", [], {
                taxDetails: {
                  quarter: parseInt(proposedQTRData),
                  proposedQtr: parseInt(proposedYearData),
                  reasonableRent: parseInt(rrMonthData),
                  premisesType: premiseTypeData,
                },
              });
              payloadResponse = payload;

              dispatch(prepareFinalObject("taxDetailsResponse", payloadResponse.taxDetails));
              dispatch(setFieldProperty("taxCalculation", "commRate", "value", "50"));
              dispatch(setFieldProperty("taxCalculation", "rrMonth", "value", payloadResponse.taxDetails.reasonableRent.toString()));
              dispatch(setFieldProperty("taxCalculation", "AV", "value", payloadResponse.taxDetails.av.toString()));
              dispatch(setFieldProperty("taxCalculation", "howrghBridge", "value", payloadResponse.taxDetails.hbtAmount.toString()));
              dispatch(setFieldProperty("taxCalculation", "taxQtr", "value", payloadResponse.taxDetails.quarter.toString()));
              dispatch(setFieldProperty("taxCalculation", "surcharge", "value", payloadResponse.taxDetails.surcharge.toString()));
              dispatch(setFieldProperty("taxCalculation", "payableAmount", "value", payloadResponse.taxDetails.paybleAmount.toString()));
              dispatch(setFieldProperty("taxCalculation", "rebateAmount", "value", payloadResponse.taxDetails.rebateAmount.toString()));
              dispatch(setFieldProperty("taxCalculation", "netAmount", "value", payloadResponse.taxDetails.netAmount.toString()));

              dispatch(prepareFinalObject("Properties[0].taxdetails.commRate", "50"));
              dispatch(prepareFinalObject("Properties[0].taxdetails.reasonableRent", payloadResponse.taxDetails.reasonableRent.toString()));
              dispatch(prepareFinalObject("Properties[0].taxdetails.av", payloadResponse.taxDetails.av.toString()));
              dispatch(prepareFinalObject("Properties[0].taxdetails.hbtAmount", payloadResponse.taxDetails.hbtAmount.toString()));
              dispatch(prepareFinalObject("Properties[0].taxdetails.quateryAmount", payloadResponse.taxDetails.quateryAmount.toString()));
              dispatch(prepareFinalObject("Properties[0].taxdetails.surcharge", payloadResponse.taxDetails.surcharge.toString()));
              dispatch(prepareFinalObject("Properties[0].taxdetails.payableAmount", payloadResponse.taxDetails.paybleAmount.toString()));
              dispatch(prepareFinalObject("Properties[0].taxdetails.rebateAmount", payloadResponse.taxDetails.rebateAmount.toString()));
              dispatch(prepareFinalObject("Properties[0].taxdetails.netAmount", payloadResponse.taxDetails.netAmount.toString()));

              return payload;
            } catch (e) {
              console.log(e);
            }
          }
        } else {
          dispatch(
            toggleSnackbarAndSetText(
              true,
              { labelName: "Please enter Proposed QTR and Proposed Year", labelKey: "Please enter Proposed QTR and Proposed Year" },
              "error"
            )
          );
        }
      },
      label: "Calculate AV",
      buttonType: true,
      numcols: 3,
      gridDefination: {
        xs: 2,
        sm: 2,
      },
    },

    commRate: {
      id: "commRate",
      type: "number",
      jsonPath: "Properties[0].taxdetails.commRate",
      floatingLabelText: "Comm Rate",
      hintText: "Comm Rate",
      numcols: 6,
      disabled: true,
      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_PINCODE_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFinalObject("Properties[0].taxdetails.commRate", field.value));
      },
    },
    howrghBridge: {
      id: "howrghBridge",
      type: "number",
      jsonPath: "Properties[0].taxdetails.hbtAmount",
      floatingLabelText: "Howrgh Bridge",
      hintText: "Howrgh Bridge",
      numcols: 6,
      disabled: true,
      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_PINCODE_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFinalObject("Properties[0].taxdetails.hbtAmount", field.value));
      },
    },
    taxQtr: {
      id: "taxQtr",
      type: "number",
      disabled: true,
      jsonPath: "Properties[0].taxdetails.quateryAmount",
      floatingLabelText: "Tax/Qtr",
      hintText: "Tax/Qtr",
      numcols: 6,
      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_PINCODE_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFinalObject("Properties[0].taxdetails.quateryAmount", field.value));
      },
    },
    surcharge: {
      id: "surcharge",
      type: "number",
      disabled: true,
      jsonPath: "Properties[0].taxdetails.surcharge",
      floatingLabelText: "Surcharge",
      hintText: "Surcharge",
      numcols: 6,

      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_PINCODE_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFinalObject("Properties[0].taxdetails.surcharge", field.value));
      },
    },
    payableAmount: {
      id: "payableAmount",
      type: "number",
      disabled: true,
      jsonPath: "Properties[0].taxdetails.paybleAmount",
      floatingLabelText: "Payable Amount",
      hintText: "Payable Amount",
      numcols: 6,

      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_PINCODE_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFinalObject("Properties[0].taxdetails.paybleAmount", field.value));
      },
    },
    rebateAmount: {
      id: "rebateAmount",
      type: "number",
      disabled: true,
      jsonPath: "Properties[0].taxdetails.rebateAmount",
      floatingLabelText: "Rebate Amount",
      hintText: "Rebate Amount",
      numcols: 6,

      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_PINCODE_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFinalObject("Properties[0].taxdetails.rebateAmount", field.value));
      },
    },
    netAmount: {
      id: "netAmount",
      type: "number",
      disabled: true,
      jsonPath: "Properties[0].taxdetails.netAmount",
      floatingLabelText: "Net Amount",
      hintText: "Net Amount",
      numcols: 6,

      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_PINCODE_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFinalObject("Properties[0].taxdetails.netAmount", field.value));
      },
    },
  },
  afterInitForm: (action, store, dispatch) => {
    let propsedQTRDropDownData = [
      {
        name: "1",
        code: "1",
        label: "1",
        value: "1",
      },
      {
        name: "2",
        code: "2",
        label: "2",
        value: "2",
      },
      {
        name: "3",
        code: "3",
        label: "3",
        value: "3",
      },
      {
        name: "4",
        code: "4",
        label: "4",
        value: "4",
      },
    ];
    dispatch(setFieldProperty("taxCalculation", "proposedQtr", "dropDownData", propsedQTRDropDownData));

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
      let proposedQuarterNo = get(state.screenConfiguration, "preparedFinalObject.capturedProposed.proposedQuarterNo");
      let proposedQuarterYr = get(state.screenConfiguration, "preparedFinalObject.capturedProposed.proposedQuarterYr");

      if (data && data.length > 0) {
        let taxDetails = data[0].taxdetails;

        if (taxDetails && Object.keys(taxDetails).length > 0) {
          dispatch(setFieldProperty("taxCalculation", "proposedQtr", "value", proposedQuarterNo.toString()));
          dispatch(setFieldProperty("taxCalculation", "proposedYear", "value", proposedQuarterYr.toString()));
          dispatch(setFieldProperty("taxCalculation", "rrMonth", "value", taxDetails.reasonableRent ? taxDetails.reasonableRent.toString() : ""));
          dispatch(setFieldProperty("taxCalculation", "AV", "value", taxDetails.av ? taxDetails.av.toString() : ""));
          dispatch(setFieldProperty("taxCalculation", "commRate", "value", "50"));
          dispatch(setFieldProperty("taxCalculation", "howrghBridge", "value", taxDetails.hbtAmount ? taxDetails.hbtAmount.toString() : ""));
          dispatch(setFieldProperty("taxCalculation", "taxQtr", "value", taxDetails.quateryAmount ? taxDetails.quateryAmount.toString() : ""));
          dispatch(setFieldProperty("taxCalculation", "surcharge", "value", taxDetails.surcharge ? taxDetails.surcharge.toString() : ""));
          dispatch(setFieldProperty("taxCalculation", "payableAmount", "value", taxDetails.paybleAmount ? taxDetails.paybleAmount.toString() : ""));
          dispatch(setFieldProperty("taxCalculation", "rebateAmount", "value", taxDetails.rebateAmount ? taxDetails.rebateAmount.toString() : ""));
          dispatch(setFieldProperty("taxCalculation", "netAmount", "value", taxDetails.netAmount ? taxDetails.netAmount.toString() : ""));

          dispatch(prepareFinalObject("Properties[0].taxdetails.proposedQtr", proposedQuarterNo));
          dispatch(prepareFinalObject("Properties[0].taxdetails.proposedYear", proposedQuarterYr));
          dispatch(
            prepareFinalObject("Properties[0].taxdetails.reasonableRent", taxDetails.reasonableRent ? taxDetails.reasonableRent.toString() : "")
          );
          dispatch(prepareFinalObject("Properties[0].taxdetails.av", taxDetails.av ? taxDetails.av.toString() : ""));
          dispatch(prepareFinalObject("Properties[0].taxdetails.commRate", "50"));
          dispatch(prepareFinalObject("Properties[0].taxdetails.hbtAmount", taxDetails.hbtAmount ? taxDetails.hbtAmount.toString() : ""));
          dispatch(prepareFinalObject("Properties[0].taxdetails.quateryAmount", taxDetails.quateryAmount ? taxDetails.quateryAmount.toString() : ""));
          dispatch(prepareFinalObject("Properties[0].taxdetails.surcharge", taxDetails.surcharge ? taxDetails.surcharge.toString() : ""));
          dispatch(prepareFinalObject("Properties[0].taxdetails.paybleAmount", taxDetails.paybleAmount ? taxDetails.paybleAmount.toString() : ""));
          dispatch(prepareFinalObject("Properties[0].taxdetails.rebateAmount", taxDetails.rebateAmount ? taxDetails.rebateAmount.toString() : ""));
          dispatch(prepareFinalObject("Properties[0].taxdetails.netAmount", taxDetails.netAmount ? taxDetails.netAmount.toString() : ""));
        }
      }
    }
    return action;
  },

  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
