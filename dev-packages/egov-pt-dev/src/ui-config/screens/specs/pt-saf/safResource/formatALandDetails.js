import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";
import get from "lodash/get";
import set from "lodash/set";

export const formatALandDetails = getCommonCard(
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
                    labelName: "Total Plot Area (including water body)",
                    labelKey: "Total Plot Area (including water body)"
                },
                required: true,
                props: {
                    type: "number",
                    className: "applicant-details-error"
                },
                gridDefination: {
                    xs: 12,
                    sm: 4,
                },
                placeholder: {
                    labelName: "Enter Total Plot Area (including water body, if any)",
                    labelKey: "Enter Total Plot Area (including water body, if any)"
                },
                iconObj: {
                    label: "Sq. Ft.",
                    position: "end"
                },
                jsonPath: "Saf[0].asseseDetail.totalArea",
                afterFieldChange: (action, state, dispatch) => {
                    if (action.value !== "") {
                        
                        dispatch(
                            handleField(
                                "apply",
                                "components.div.children.formwizardThirdStep.children.formatALandDetails.children.cardContent.children.asseseDetailsConatiner.children.percentageGroundCover",
                                "visible",
                                true
                            )
                        )
                        dispatch(
                            handleField(
                                "apply",
                                "components.div.children.formwizardThirdStep.children.formatALandDetails.children.cardContent.children.asseseDetailsConatiner.children.percentageCover",
                                "visible",
                                true
                            )
                        )
                        dispatch(
                            handleField(
                                "apply",
                                "components.div.children.formwizardThirdStep.children.formatALandDetails.children.cardContent.children.asseseDetailsConatiner.children.remainingLand",
                                "visible",
                                true
                            )
                        )
                        dispatch(prepareFinalObject("Saf[0].asseseDetail.percentageCover", "40"));
                        dispatch(
                            handleField(
                                "apply",
                                "components.div.children.formwizardThirdStep.children.formatALandDetails.children.cardContent.children.asseseDetailsConatiner.children.percentageCover",
                                "props.value",
                                "40"
                            )
                        )
                        dispatch(prepareFinalObject("Saf[0].asseseDetail.remainingLand", action.value));
                        dispatch(
                            handleField(
                                "apply",
                                "components.div.children.formwizardThirdStep.children.formatALandDetails.children.cardContent.children.asseseDetailsConatiner.children.remainingLand",
                                "props.value",
                                action.value
                            )
                        )
                    } else {
                        dispatch(prepareFinalObject("Saf[0].asseseDetail.percentageCover", ""));
                        dispatch(
                            handleField(
                                "apply",
                                "components.div.children.formwizardThirdStep.children.formatALandDetails.children.cardContent.children.asseseDetailsConatiner.children.percentageCover",
                                "props.value",
                                ""
                            )
                        )
                    }

                },
            }),

            waterbodyArea: getTextField({
                label: {
                    labelName: "Area of water body (if any)",
                    labelKey: "Area of water body (if any)"
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
                    labelName: "Enter Area of water body (if any)",
                    labelKey: "Enter Area of water body (if any)"
                },
                jsonPath: "Saf[0].asseseDetail.waterbodyArea"
            }),

            groundArea: getTextField({
                label: {
                    labelName: "Total Covered Area at Ground Floor",
                    labelKey: "Total Covered Area at Ground Floor"
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
                    labelName: "Enter Total Covered Area at Ground Floor",
                    labelKey: "Enter Total Covered Area at Ground Floor"
                },
                jsonPath: "Saf[0].asseseDetail.groundArea",
                afterFieldChange: (action, state, dispatch) => {
                    if (action.value !== "") {
                        
                        dispatch(
                            handleField(
                                "apply",
                                "components.div.children.formwizardThirdStep.children.formatALandDetails.children.cardContent.children.asseseDetailsConatiner.children.percentageGroundCover",
                                "visible",
                                true
                            )
                        )
                        dispatch(
                            handleField(
                                "apply",
                                "components.div.children.formwizardThirdStep.children.formatALandDetails.children.cardContent.children.asseseDetailsConatiner.children.percentageCover",
                                "visible",
                                true
                            )
                        )
                        dispatch(
                            handleField(
                                "apply",
                                "components.div.children.formwizardThirdStep.children.formatALandDetails.children.cardContent.children.asseseDetailsConatiner.children.remainingLand",
                                "visible",
                                true
                            )
                        )
                        let totalArea = get(
                            state,
                            "screenConfiguration.preparedFinalObject.Saf[0].asseseDetail.totalArea",
                            ""
                        );
                        if (totalArea !== "") {
                            let remainingValue = (action.value / totalArea) * 100;
                            let remainingLandValue = totalArea - action.value
                            dispatch(prepareFinalObject("Saf[0].asseseDetail.percentageGroundCover", remainingValue.toFixed(2)));
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatALandDetails.children.cardContent.children.asseseDetailsConatiner.children.percentageGroundCover",
                                    "props.value",
                                    remainingValue.toFixed(2)
                                )
                            )
                            dispatch(prepareFinalObject("Saf[0].asseseDetail.remainingLand", remainingLandValue.toFixed(2)));
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatALandDetails.children.cardContent.children.asseseDetailsConatiner.children.remainingLand",
                                    "props.value",
                                    remainingLandValue.toFixed(2)
                                )
                            )
                        }
                    } else {
                        dispatch(prepareFinalObject("Saf[0].asseseDetail.percentageGroundCover", ""));
                        dispatch(
                            handleField(
                                "apply",
                                "components.div.children.formwizardThirdStep.children.formatALandDetails.children.cardContent.children.asseseDetailsConatiner.children.percentageGroundCover",
                                "props.value",
                                ""
                            )
                        )
                        dispatch(prepareFinalObject("Saf[0].asseseDetail.remainingLand", ""));
                        dispatch(
                            handleField(
                                "apply",
                                "components.div.children.formwizardThirdStep.children.formatALandDetails.children.cardContent.children.asseseDetailsConatiner.children.remainingLand",
                                "props.value",
                                ""
                            )
                        )
                    }

                },
            }),

            remainingLand: getTextField({
                label: {
                    labelName: "Remaining Land After Construction",
                    labelKey: "Remaining Land After Construction"
                },
                gridDefination: {
                    xs: 12,
                    sm: 4,
                },
                iconObj: {
                    label: "Sq. Ft.",
                    position: "end"
                },
                props: {
                    className: "applicant-details-error"
                },
                disabled: true,
                placeholder: {
                    labelName: "Enter Remaining Land After Construction",
                    labelKey: "Enter Remaining Land After Construction"
                },
                jsonPath: "Saf[0].asseseDetail.remainingLand", 
                visible : getQueryArg(window.location.href, "isEdit")?false : true
            }),

            percentageCover: getTextField({
                label: {
                    labelName: "Percentage Limit for Ground Coverage",
                    labelKey: "Percentage Limit for Ground Coverage"
                },
                props: {
                    className: "applicant-details-error"
                },
                gridDefination: {
                    xs: 12,
                    sm: 4,
                },
                iconObj: {
                    label: "%",
                    position: "end"
                },
                disabled: true,
                placeholder: {
                    labelName: "Enter Percentage Limit for Ground Coverage",
                    labelKey: "Enter Percentage Limit for Ground Coverage"
                },
                jsonPath: "Saf[0].asseseDetail.percentageCover",
                visible : getQueryArg(window.location.href, "isEdit")?false : true
            }),

            percentageGroundCover: getTextField({
                label: {
                    labelName: "Actual Percentage of Ground Coverage",
                    labelKey: "Actual Percentage of Ground Coverage"
                },
                gridDefination: {
                    xs: 12,
                    sm: 4,
                },
                iconObj: {
                    label: "%",
                    position: "end"
                },
                disabled: true,
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Actual Percentage of Ground Coverage",
                    labelKey: "Enter Actual Percentage of Ground Coverage"
                },
                jsonPath: "Saf[0].asseseDetail.percentageGroundCover",
                visible : getQueryArg(window.location.href, "isEdit")?false : true
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
