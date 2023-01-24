import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";

export const safFormatATax = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Proposed Valuation and Tax Details",
                labelKey: "Proposed Valuation and Tax Details"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),

        asseseDetailsConatiner: getCommonContainer({

            asseseTotalAnnualValue: getTextField({
                label: {
                    labelName: "Total Annual Value in Rs.",
                    labelKey: "Total Annual Value in Rs."
                },
                props: {
                    className: "applicant-details-error"
                },
                disabled :true,
                placeholder: {
                    labelName: "Enter Total Annual Value in Rs.",
                    labelKey: "Enter Total Annual Value in Rs."
                },
                jsonPath: "Saf[0].asseseDetail.asseseTotalAnnualValue"
            }),
            asseseRateOfProperty: getTextField({
                label: {
                    labelName: "Rate of Property Tax %",
                    labelKey: "Rate of Property Tax %"
                },
                disabled :true,
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Rate of Property Tax %",
                    labelKey: "Enter Rate of Property Tax %"
                },
                jsonPath: "Saf[0].asseseDetail.asseseRateOfProperty"
            }),
            asseseRateOfHowrahBridge: getTextField({
                label: {
                    labelName: "Rate of Howrah Bridge Tax %",
                    labelKey: "Rate of Howrah Bridge Tax %"
                },
                disabled :true,
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Rate of Howrah Bridge Tax %",
                    labelKey: "Enter Rate of Howrah Bridge Tax %"
                },
                jsonPath: "Saf[0].asseseDetail.asseseRateOfHowrahBridge"
            }),
            asseseGrossAmt: getTextField({
                label: {
                    labelName: "Gross Amt. of Property Tax payable per quarter incl. HB Tax(Rs.)",
                    labelKey: "Gross Amt. of Property Tax payable per quarter incl. HB Tax(Rs.)"
                },
                disabled :true,
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Gross Amt. of Property Tax payable per quarter incl. HB Tax(Rs.)",
                    labelKey: "Enter Gross Amt. of Property Tax payable per quarter incl. HB Tax(Rs.)"
                },
                jsonPath: "Saf[0].asseseDetail.asseseGrossAmt"
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
