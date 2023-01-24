import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";

export const safTaxDetails = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Details of Tax Payment",
                labelKey: "Details of Tax Payment"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),

        asseseDetailsConatiner: getCommonContainer({

            assesseeNo: getTextField({
                label: {
                    labelName: "Gross Quarterly Tax payable* (after capping if applicable) in Rs",
                    labelKey: "Gross Quarterly Tax payable* (after capping if applicable) in Rs"
                },
                props: {
                    className: "applicant-details-error"
                },
                disabled: true,
                gridDefination: {
                    xs: 12,
                    sm: 12
                },
                placeholder: {
                    labelName: "Enter Gross Quarterly Tax payable* (after capping if applicable) in Rs",
                    labelKey: "Enter Gross Quarterly Tax payable* (after capping if applicable) in Rs"
                },
                required: true, errorMessage: "Required",
                jsonPath: "Saf[0].asseseDetail.assesseeNo"
            }),
            applicantName: getTextField({
                label: {
                    labelName: "Net Quarterly tax payable after rebate* (based on Table in Annexure 6) in Rs.",
                    labelKey: "Net Quarterly tax payable after rebate* (based on Table in Annexure 6) in Rs."
                },
                props: {
                    className: "applicant-details-error",
                    disabled: true
                },
                gridDefination: {
                    xs: 12,
                    sm: 12
                },
                required: true, errorMessage: "Required",
                placeholder: {
                    labelName: "Enter Net Quarterly tax payable after rebate* (based on Table in Annexure 6) in Rs.",
                    labelKey: "Enter Net Quarterly tax payable after rebate* (based on Table in Annexure 6) in Rs."
                },
                jsonPath: "Saf[0].asseseDetail.applicantName"
            }),
            applicantAddress: getTextField({
                label: {
                    labelName: "Whether any tax for the current financial year is paid or not.",
                    labelKey: "Whether any tax for the current financial year is paid or not."
                },
                gridDefination: {
                    xs: 12,
                    sm: 12
                },
                props: {
                    className: "applicant-details-error"
                },
                disabled: true,
                required: true, errorMessage: "Required",
                placeholder: {
                    labelName: "Enter Whether any tax for the current financial year is paid or not.",
                    labelKey: "Enter Whether any tax for the current financial year is paid or not."
                },
                jsonPath: "Saf[0].asseseDetail.applicantAddress"
            }),
            applicantPinCode: getTextField({
                label: {
                    labelName: "Amount of Tax paid in the current financial year in Rs.",
                    labelKey: "Amount of Tax paid in the current financial year in Rs."
                },
                gridDefination: {
                    xs: 12,
                    sm: 12
                },
                disabled: true,
                required: true, errorMessage: "Required",
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Amount of Tax paid in the current financial year in Rs.",
                    labelKey: "Enter Amount of Tax paid in the current financial year in Rs."
                },
                jsonPath: "Saf[0].asseseDetail.applicantPinCode"
            }),

            applicantOtherRelation: getTextField({
                label: {
                    labelName: "Current financial year Tax paid in quarter.",
                    labelKey: "Current financial year Tax paid in quarter."
                },
                gridDefination: {
                    xs: 12,
                    sm: 12
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Current financial year Tax paid in quarter.",
                    labelKey: "Enter Current financial year Tax paid in quarter."
                },
                jsonPath: "Saf[0].asseseDetail.applicantOtherRelation"
            }),
            applicantOtherRelationTESt: getTextField({
                label: {
                    labelName: "Total Tax payable (adjusting payment already made for current year) for the current financial year under UAA System Rs.",
                    labelKey: "Total Tax payable (adjusting payment already made for current year) for the current financial year under UAA System Rs."
                },
                gridDefination: {
                    xs: 12,
                    sm: 12
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Total Tax payable (adjusting payment already made for current year) for the current financial year under UAA System Rs.",
                    labelKey: "Enter Total Tax payable (adjusting payment already made for current year) for the current financial year under UAA System Rs."
                },
                jsonPath: "Saf[0].asseseDetail.applicantOtherRelation"
            }),


        },
            {
                style: getQueryArg(window.location.href, "action") === "EDITRENEWAL" || getQueryArg(window.location.href, "workflowService") === "EDITRENEWAL" ? { "pointer-events": "none" } : {}
            }
        ),
        mapsDialog: {
            componentPath: "Dialog",
            props: {
                open: false
            },
            children: {
                dialogContent: {
                    componentPath: "DialogContent",
                    children: {
                        // popup: getMapLocator()
                    }
                }
            }
        }
    },
    {
        style: getQueryArg(window.location.href, "action") === "EDITRENEWAL" || getQueryArg(window.location.href, "workflowService") === "EDITRENEWAL" ? { "cursor": "not-allowed", overflow: "visible" } : { overflow: "visible" }
    }
);
