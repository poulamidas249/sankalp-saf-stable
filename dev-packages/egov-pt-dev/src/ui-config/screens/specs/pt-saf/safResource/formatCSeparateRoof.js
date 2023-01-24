import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";

export const formatCSeparateRoof = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Details of Separately transferred roof with construction under the permises",
                labelKey: "Details of Separately transferred roof with construction under the permises"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),

        asseseDetailsConatiner: getCommonContainer({
            
            totalRoofArea: getTextField({
                label: {
                    labelName: "Seperately transferred roof C2a",
                    labelKey: "Seperately transferred roof C2a "
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Seperately transferred roof ",
                    labelKey: "Enter Seperately transferred roof "
                },
                jsonPath: "Saf[0].asseseDetail.totalRoofArea"
            }),

            constructedRoofArea: getTextField({
                label: {
                    labelName: "Covered Space constructed over separately transferred roof C2b",
                    labelKey: "Covered Space constructed over separately transferred roof C2b"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Covered Space constructed over separately transferred roof (if there is construction)",
                    labelKey: "Enter Covered Space constructed over separately transferred roof (if there is construction)"
                },
                jsonPath: "Saf[0].asseseDetail.constructedRoofArea"
            }),

            unConstructedRoofArea: getTextField({
                label: {
                    labelName: "Area of separately transferred roof that remains un-constructed",
                    labelKey: "Area of separately transferred roof that remains un-constructed"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Area of separately transferred roof that remains un-constructed (C2a-C2b)",
                    labelKey: "Enter Area of separately transferred roof that remains un-constructed (C2a-C2b)"
                },
                jsonPath: "Saf[0].asseseDetail.unConstructedRoofArea"
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
