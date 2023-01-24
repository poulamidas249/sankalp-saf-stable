
import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField,getCommonGrayCard
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";
import set from "lodash/set";
import get from "lodash/get";

export const safInitiation = getCommonGrayCard(
    {
      
        asseseDetailsConatiner: getCommonContainer({

            isSuoMoto: {
                uiFramework: "custom-containers",
                componentPath: "RadioGroupContainer",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 12
                },
                jsonPath: "Saf[0].asseseDetail.isSuoMoto",
                props: {
                    label: {
                        name: "Type Of Self Assessment Initiation",
                        key: "Type Of Self Assessment Initiation"
                    },
                    buttons: [
                        {
                            labelName: "SUO-MOTO",
                            labelKey: "SUO-MOTO",
                            value: "Y"
                        },
                        {
                            label: "SELF",
                            labelKey: "SELF",
                            value: "N"
                        }
                    ],
                    jsonPath:
                        "Saf[0].asseseDetail.isSuoMoto",
                    required: true
                },
                required: true,
                type: "array",

            },
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
