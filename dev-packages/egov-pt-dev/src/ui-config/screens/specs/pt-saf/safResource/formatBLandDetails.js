import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";
import get from "lodash/get";
import set from "lodash/set";

export const formatBLandDetails = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Land/Plot Details",
                labelKey: "Land/Plot Details"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),

        asseseDetailsConatiner: getCommonContainer({

            totalArea: getTextField({

                label: {
                    labelName: "Total Plot Area (Inc. water body) B1a",
                    labelKey: "Total Plot Area (Inc. water body) B1a"
                },
                props: {
                    type: "number",
                    className: "applicant-details-error"
                },
                required: true,
                gridDefination: {
                    xs: 12,
                    sm: 4,
                },
                placeholder: {
                    labelName: "Enter Total Plot Area (including water body, if any) B1a",
                    labelKey: "Enter Total Plot Area (including water body, if any) B1a"
                },
                iconObj: {
                    label: "Sq. Ft.",
                    position: "end"
                },
                jsonPath: "Saf[0].asseseDetail.totalArea",
                
            }),

            waterbodyArea: getTextField({
                label: {
                    labelName: "Area of water body (if any) B1b",
                    labelKey: "Area of water body (if any) B1b"
                },
                required: true,
                gridDefination: {
                    xs: 12,
                    sm: 4,
                },
                iconObj: {
                    label: "Sq. Ft.",
                    position: "end"
                },
                props: {
                    type: "number",
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Area of water body (if any) B1b",
                    labelKey: "Enter Area of water body (if any) B1b"
                },
                jsonPath: "Saf[0].asseseDetail.waterbodyArea"
            }),

            groundArea: getTextField({
                label: {
                    labelName: "Area of separately transferred roof B1c.",
                    labelKey: "Area of separately transferred roof B1c."
                },
                required: true,
                gridDefination: {
                    xs: 12,
                    sm: 4,
                },
                iconObj: {
                    label: "Sq. Ft.",
                    position: "end"
                },
                props: {
                    type: "number",
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Area of separately transferred roof B1c.",
                    labelKey: "Enter Area of separately transferred roof B1c."
                },
                jsonPath: "Saf[0].asseseDetail.groundArea",
           
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
