import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";

export const safGrossTax = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Gross Quarterly Tax",
                labelKey: "Gross Quarterly Tax"
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
                    labelName: "Gross Quarterly Tax payable under UAA System (Rs.)",
                    labelKey: "Gross Quarterly Tax payable under UAA System (Rs.)"
                },
                props: {
                    className: "applicant-details-error"
                },
                disabled: true,
                gridDefination: {
                    xs: 12,
                    sm: 10
                },
                placeholder: {
                    labelName: "Enter Gross Quarterly Tax payable under UAA System (Rs.)",
                    labelKey: "Enter Gross Quarterly Tax payable under UAA System (Rs.)"
                },
                required: true, errorMessage: "Required",
                jsonPath: "Saf[0].asseseDetail.assesseeNo"
            }),

            applicantName: getTextField({
                label: {
                    labelName: "Gross Quarterly Tax payable under ARV System (Rs.)",
                    labelKey: "Gross Quarterly Tax payable under ARV System (Rs.)"
                },
                props: {
                    className: "applicant-details-error",
                    disabled: true
                },
                gridDefination: {
                    xs: 12,
                    sm: 10
                },
                required: true, errorMessage: "Required",
                placeholder: {
                    labelName: "Enter Gross Quarterly Tax payable under ARV System (Rs.)",
                    labelKey: "Enter Gross Quarterly Tax payable under ARV System (Rs.)"
                },
                jsonPath: "Saf[0].asseseDetail.applicantName"
            }),
            applicantAddress: getTextField({
                label: {
                    labelName: "Change in amount in gross quarterly tax for already assessed portion",
                    labelKey: "Change in amount in gross quarterly tax for already assessed portion"
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
                    labelName: "Enter Change in amount in gross quarterly tax for already assessed portion",
                    labelKey: "Enter Change in amount in gross quarterly tax for already assessed portion"
                },
                jsonPath: "Saf[0].asseseDetail.applicantAddress"
            }),
            applicantPinCode: getTextField({
                label: {
                    labelName: "The % change in gross quarterly tax (for already assessed portion)",
                    labelKey: "The % change in gross quarterly tax (for already assessed portion)"
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
                    labelName: "Enter The % change in gross quarterly tax (for already assessed portion)",
                    labelKey: "Enter The % change in gross quarterly tax (for already assessed portion)"
                },
                jsonPath: "Saf[0].asseseDetail.applicantPinCode"
            }),

            applicantOtherRelation: getTextField({
                label: {
                    labelName: "Gross Quarterly Property Tax payable (after capping)* in Rs.",
                    labelKey: "Gross Quarterly Property Tax payable (after capping)* in Rs."
                },
                gridDefination: {
                    xs: 12,
                    sm: 12
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Gross Quarterly Property Tax payable (after capping)* in Rs.",
                    labelKey: "Enter Gross Quarterly Property Tax payable (after capping)* in Rs."
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
