import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";

export const formatAManualBill = getCommonCard(
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
        style: getQueryArg(window.location.href, "action") === "EDITRENEWAL" || getQueryArg(window.location.href, "workflowService") === "EDITRENEWAL" ? { "cursor": "not-allowed", overflow: "visible" } : { overflow: "visible" }
    }
);
