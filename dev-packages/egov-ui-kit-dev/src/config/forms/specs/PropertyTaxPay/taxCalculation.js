import { mohalla } from "egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/reusableFields";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { fetchGeneralMDMSData, prepareFormData } from "egov-ui-kit/redux/common/actions";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import { fetchDropdownData, generalMDMSDataRequestObj, getGeneralMDMSDataDropdownName, getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import filter from "lodash/filter";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import sortBy from "lodash/sortBy";
import { getPattern } from "egov-ui-framework/ui-config/screens/specs/utils";
import {
    toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";

import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";

const formConfig = {
    name: "taxCalculation",
    fields: {
        propsedQTR: {
            id: "propsedQTR",
            jsonPath: "Properties[0].taxdetails.propsedQTR",
            required: true,
            localePrefix: true,
            labelsFromLocalisation: true,
            type: "AutocompleteDropdown",
            floatingLabelText: "Propsed QTR",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            fullWidth: true,
            hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
            numcols: 6,
            gridDefination: {
                xs: 12,
                sm: 6
            },

            updateDependentFields: ({ formKey, field, dispatch, state }) => {
                //     dispatch(prepareFormData("Properties[0].tenantId", field.value));
                //     dispatch(
                //       prepareFormData(
                //         "Properties[0].taxdetails.ward",
                //         filter(get(state, "common.cities"), (ward) => {
                //           return ward.code === field.value;
                //         })[0].name
                //       )
                //     );
                //     dispatch(setFieldProperty("registrationDetails", "mohalla", "value", ""));
                //     const moduleValue = field.value;
                //     dispatch(fetchLocalizationLabel(getLocale(), moduleValue, moduleValue));
                //     let requestBody = generalMDMSDataRequestObj(field.value);

                //     dispatch(
                //       fetchGeneralMDMSData(requestBody, "PropertyTax", getGeneralMDMSDataDropdownName())
                //     );
                //   },
            },
        },
        propsedYear: {
            id: "propsedYear",
            type: "number",
            jsonPath: "Properties[0].taxdetails.propsedYear",
            floatingLabelText: "Propsed Year",
            hintText: "Propsed Year",
            numcols: 6,
            required: true,

            //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
            errorMessage: "Enter valid year",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            pattern: "^[12][0-9]{3}$",
        },
        rrMonth: {
            id: "rrMonth",
            type: "number",
            jsonPath: "Properties[0].taxdetails.rrMonth",
            floatingLabelText: "Resonable Rent/Month",
            hintText: "Resonable Rent/Month",
            numcols: 6,
            required: true,

            //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
            errorMessage: "PT_PINCODE_ERROR_MESSAGE",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },

        },

        AV: {
            id: "AV",
            type: "number",
            jsonPath: "Properties[0].taxdetails.AV",
            floatingLabelText: "AV",
            hintText: "AV",
            numcols: 3,
            required: true,

            disabled: true,
            //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
            errorMessage: "PT_PINCODE_ERROR_MESSAGE",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },

            gridDefination: {
                xs: 4,
                sm: 4
            },
        },
        testButton: {
            id: "testButton",
            type: "button",
            onClickFunc: async (state, dispatch) => {
                console.log('state1234', state)
                const propsedYearData = get(state, "form.taxCalculation.fields.propsedYear.value", "");
                const propsedQTRData = get(state, "form.taxCalculation.fields.propsedQTR.value", "");
                const premiseTypeData = get(state, "form.propertyAddress.fields.premisesType.value", "");
                const rrMonthData = get(state, "form.taxCalculation.fields.rrMonth.value", "");
                let payloadResponse = {}
                // dispatch(toggleSnackbarAndSetText(true, { labelName: "clicked", labelKey: "clicked" }, "error"));

                if (propsedQTRData && propsedYearData) {

                    if (parseInt(propsedYearData) > 2016) {

                        dispatch(toggleSnackbarAndSetText(true, { labelName: "No Tax", labelKey: "No Tax" }, "error"))
                        dispatch(setFieldProperty("taxCalculation", "commRate", "value", "0"));
                        dispatch(setFieldProperty("taxCalculation", "howrghBridge", "value", "0"));
                        dispatch(setFieldProperty("taxCalculation", "taxQtr", "value", "0"));
                        dispatch(setFieldProperty("taxCalculation", "surcharge", "value", "0"));
                        dispatch(setFieldProperty("taxCalculation", "payableAmount", "value", "0"));
                        dispatch(setFieldProperty("taxCalculation", "rebateAmount", "value", "0"));
                        dispatch(setFieldProperty("taxCalculation", "netAmount", "value", "0"));
                        dispatch(prepareFormData("Properties[0].taxdetails.commRate", "0"));
                        dispatch(prepareFormData("Properties[0].taxdetails.howrghBridge", "0"));
                        dispatch(prepareFormData("Properties[0].taxdetails.taxQtr", "0"));
                        dispatch(prepareFormData("Properties[0].taxdetails.surcharge", "0"));
                        dispatch(prepareFormData("Properties[0].taxdetails.payableAmount", "0"));
                        dispatch(prepareFormData("Properties[0].taxdetails.rebateAmount", "0"));
                        dispatch(prepareFormData("Properties[0].taxdetails.netAmount", "0"));
                        
                    } else {
                        try {
                            let payload = await httpRequest(
                                "post",
                                "property-services/property/_calculateArvTax",
                                "",
                                [],
                                {
                                    "taxDetails": {
                                        "quarter": parseInt(propsedQTRData),
                                        "proposedQtr": parseInt(propsedYearData),
                                        "reasonableRent": parseInt(rrMonthData),
                                        "premisesType": premiseTypeData

                                    }
                                }
                            );
                            payloadResponse = payload
                            console.log('payload1324', payload)
                            dispatch(prepareFinalObject("taxDetailsResponse", payloadResponse.taxDetails));
                            dispatch(
                                prepareFormData(
                                  "Properties[0].taxdetails",
                                  get(payloadResponse, "taxDetails", {})
                                  )
                              );
                            dispatch(setFieldProperty("taxCalculation", "commAV", "disabled", false));
                            dispatch(setFieldProperty("taxCalculation", "commAV", "value", ""));


                            dispatch(setFieldProperty("taxCalculation", "commRate", "value", payloadResponse.taxDetails.commRate));
                            dispatch(setFieldProperty("taxCalculation", "AV", "value", payloadResponse.taxDetails.av));
                            dispatch(setFieldProperty("taxCalculation", "howrghBridge", "value", payloadResponse.taxDetails.hbtAmount));
                            dispatch(setFieldProperty("taxCalculation", "taxQtr", "value", payloadResponse.taxDetails.quarter));
                            dispatch(setFieldProperty("taxCalculation", "surcharge", "value", payloadResponse.taxDetails.surcharge));
                            dispatch(setFieldProperty("taxCalculation", "payableAmount", "value", payloadResponse.taxDetails.paybleAmount));
                            dispatch(setFieldProperty("taxCalculation", "rebateAmount", "value", payloadResponse.taxDetails.rebateAmount));
                            dispatch(setFieldProperty("taxCalculation", "netAmount", "value", payloadResponse.taxDetails.netAmount));
    
                            dispatch(prepareFormData("Properties[0].taxdetails.commRate", payloadResponse.taxDetails.commRate));
                            dispatch(prepareFormData("Properties[0].taxdetails.AV", payloadResponse.taxDetails.av));
                            dispatch(prepareFormData("Properties[0].taxdetails.howrghBridge", payloadResponse.taxDetails.hbtAmount));
                            dispatch(prepareFormData("Properties[0].taxdetails.taxQtr", payloadResponse.taxDetails.quarter));
                            dispatch(prepareFormData("Properties[0].taxdetails.surcharge", payloadResponse.taxDetails.surcharge));
                            dispatch(prepareFormData("Properties[0].taxdetails.payableAmount", payloadResponse.taxDetails.paybleAmount));
                            dispatch(prepareFormData("Properties[0].taxdetails.rebateAmount", payloadResponse.taxDetails.rebateAmount));
                            dispatch(prepareFormData("Properties[0].taxdetails.netAmount", payloadResponse.taxDetails.netAmount));
                        
                            dispatch(prepareFinalObject("Properties[0].taxdetails.commRate", payloadResponse.taxDetails.commRate));
                            dispatch(prepareFinalObject("Properties[0].taxdetails.AV", payloadResponse.taxDetails.av));
                            dispatch(prepareFinalObject("Properties[0].taxdetails.howrghBridge", payloadResponse.taxDetails.hbtAmount));
                            dispatch(prepareFinalObject("Properties[0].taxdetails.taxQtr", payloadResponse.taxDetails.quarter));
                            dispatch(prepareFinalObject("Properties[0].taxdetails.surcharge", payloadResponse.taxDetails.surcharge));
                            dispatch(prepareFinalObject("Properties[0].taxdetails.payableAmount", payloadResponse.taxDetails.paybleAmount));
                            dispatch(prepareFinalObject("Properties[0].taxdetails.rebateAmount", payloadResponse.taxDetails.rebateAmount));
                            dispatch(prepareFinalObject("Properties[0].taxdetails.netAmount", payloadResponse.taxDetails.netAmount));
                        
                            return payload;
                        } catch (e) {
                            console.log(e);
                        }
                    }
                } else {
                    dispatch(toggleSnackbarAndSetText(true, { labelName: "Please enter Proposed QTR and Proposed Year", labelKey: "Please enter Proposed QTR and Proposed Year" }
                        , "error"))

                }
            },
            label: "Calculate AV",
            buttonType: true,
            numcols: 3,
            gridDefination: {
                xs: 2,
                sm: 2
            }
        },

        commAV: {
            id: "commAV",
            type: "number",
            jsonPath: "Properties[0].taxdetails.commAV",
            floatingLabelText: "Commercial AV",
            hintText: "Commercial AV",
            numcols: 6,
            required : true, 
            disabled: true,
            //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
            errorMessage: "PT_PINCODE_ERROR_MESSAGE",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },

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

        },
        howrghBridge: {
            id: "howrghBridge",
            type: "number",
            jsonPath: "Properties[0].taxdetails.howrghBridge",
            floatingLabelText: "Howrgh Bridge",
            hintText: "Howrgh Bridge",
            numcols: 6,
            
            disabled: true,
            //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
            errorMessage: "PT_PINCODE_ERROR_MESSAGE",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },

        },
        taxQtr: {
            id: "taxQtr",
            type: "number",
            disabled: true,
            jsonPath: "Properties[0].taxdetails.taxQtr",
            floatingLabelText: "Tax/Qtr",
            hintText: "Tax/Qtr",
            numcols: 6,
            

            //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
            errorMessage: "PT_PINCODE_ERROR_MESSAGE",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },

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

        },
        payableAmount: {
            id: "payableAmount",
            type: "number",
            disabled: true,
            jsonPath: "Properties[0].taxdetails.payableAmount",
            floatingLabelText: "Payable Amount",
            hintText: "Payable Amount",
            numcols: 6,
            

            //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
            errorMessage: "PT_PINCODE_ERROR_MESSAGE",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },

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

        },
    },
    afterInitForm: (action, store, dispatch) => {
        let propsedQTRDropDownData = [
            {
                name: '1',
                code: '1',
                label: '1',
                value: '1'
            },
            {
                name: '2',
                code: '2',
                label: '2',
                value: '2'
            },
            {
                name: '3',
                code: '3',
                label: '3',
                value: '3'
            },
            {
                name: '4',
                code: '4',
                label: '4',
                value: '4'
            },
        ]
        dispatch(setFieldProperty("taxCalculation", "propsedQTR", "dropDownData", propsedQTRDropDownData));
        return action;
    },

    action: "",
    redirectionRoute: "",
    saveUrl: "",
    isFormValid: false,
};

export default formConfig;

