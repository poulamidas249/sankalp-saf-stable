import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";

export const formatCManualBill = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Manual Bill Amount",
                labelKey: "Manual Bill Amount"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),

        asseseDetailsConatiner: getCommonContainer({
            manualBillAmountSelection: {
                uiFramework: "custom-containers",
                componentPath: "RadioGroupContainer",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                },
                jsonPath: "Saf[0].asseseDetail.assesemanualBillAmountSelection",
                props: {
                    label: {
                        name: "Manual Bill Amount Selection",
                        key: "Manual Bill Amount Selection"
                    },
                    buttons: [
                        {
                            labelName: "Manual payable Amount",
                            labelKey: "Manual payable Amount",
                            value: "Manual payable Amount"
                        },
                        {
                            label: "Separation / Apportionment / Amalgamation Mannual Capped TAX",
                            labelKey: "Separation / Apportionment / Amalgamation Mannual Capped TAX",
                            value: "Separation / Apportionment / Amalgamation Mannual Capped TAX"
                        }
                    ],
                    jsonPath:
                        "Saf[0].asseseDetail.asseseTypeOfInitiation",
                    required: true
                },
                required: true,
                type: "array"
            },

            asseseManualBillAmount: getTextField({
                label: {
                    labelName: "Manual Bill Amount",
                    labelKey: "Manual Bill Amount"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Manual Bill Amount",
                    labelKey: "Enter Manual Bill Amount"
                },
                jsonPath: "Saf[0].asseseDetail.asseseManualBillAmount"
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
        style: { "display": "none" }
    }
);
