
import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField,getCommonGrayCard
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";
import set from "lodash/set";
import get from "lodash/get";

export const safPropDetails = getCommonGrayCard(
    {
       
        asseseDetailsConatiner: getCommonContainer({

            propertyType: {
                uiFramework: "custom-containers",
                componentPath: "RadioGroupContainer",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 12
                },
                jsonPath:
                    "Saf[0].asseseDetail.propertyType",
                props: {
                    label: {
                        name: "Please select the Property Type",
                        key: "Please select the Property Type"
                    },
                    buttons: [
                        {
                            labelName: "Single Unit Building with Single Assessee No",
                            labelKey: "Single Unit Building with Single Assessee No",
                            value: "A"
                        },
                        {
                            label: "Vacant Land",
                            labelKey: "Vacant Land",
                            value: "B"
                        },
                        {
                            label: "Apartment/Flat",
                            labelKey: "Apartment/Flat",
                            value: "C"
                        },
                        {
                            label: "Separately transferred roof having no construction",
                            labelKey: "Separately transferred roof having no construction",
                            value: "D"
                        },
                        {
                            label: "Separately transferred roof with construction",
                            labelKey: "Separately transferred roof with construction",
                            value: "E"
                        },
                    ],
                    jsonPath:
                        "Saf[0].asseseDetail.propertyType",
                    required: true
                },
                afterFieldChange: async (action, state, dispatch) => {
                    
                    dispatch(prepareFinalObject("Saf[0].asseseDetail.formatDataOne",[]));
                    dispatch(prepareFinalObject("Saf[0].asseseDetail.formatDataTwo",[]));
                    let type = get(
                        state.screenConfiguration.preparedFinalObject,
                        "Saf[0].asseseDetail.propertyType",
                        null
                    )
                    switch (type) {
                        case 'A':

                            localStorage.setItem('format', 'A')

                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatCTableTwo",
                                    "visible",
                                    false
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatBLandDetails",
                                    "visible",
                                    false
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatBTableOne",
                                    "visible",
                                    false
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatCTableOne",
                                    "visible",
                                    false
                                )
                            )

                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatCSeparateRoof",
                                    "visible",
                                    false
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatCManualBill",
                                    "visible",
                                    false
                                )
                            )

                            //visible

                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatALandDetails",
                                    "visible",
                                    true
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatATableOne",
                                    "visible",
                                    true
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatATableTwo",
                                    "visible",
                                    true
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatATax",
                                    "visible",
                                    true
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatAManualBill",
                                    "visible",
                                    true
                                )
                            )


                            // dispatch(
                            //     handleField(
                            //         "apply",
                            //         "components.div.children.formwizardThirdStep",
                            //         "children",
                            //         null
                            //     )
                            // )
                            // dispatch(
                            //     handleField(
                            //         "apply",
                            //         "components.div.children.formwizardThirdStep.children",
                            //         "formatALandDetails",
                            //         formatALandDetails
                            //     )
                            // )
                            // dispatch(
                            //     handleField(
                            //         "apply",
                            //         "components.div.children.formwizardThirdStep.children",
                            //         "safFormatATableOne",
                            //         safFormatATableOne
                            //     )
                            // )
                            // dispatch(
                            //     handleField(
                            //         "apply",
                            //         "components.div.children.formwizardThirdStep.children",
                            //         "safFormatATableTwo",
                            //         safFormatATableTwo
                            //     )
                            // )
                            // dispatch(
                            //     handleField(
                            //         "apply",
                            //         "components.div.children.formwizardThirdStep.children",
                            //         "safFormatATax",
                            //         safFormatATax
                            //     )
                            // )
                            // dispatch(
                            //     handleField(
                            //         "apply",
                            //         "components.div.children.formwizardThirdStep.children",
                            //         "formatAManualBill",
                            //         formatAManualBill
                            //     )
                            // )
                            break;
                        case 'B' || 'D':
                            localStorage.setItem('format', 'B')

                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatCTableTwo",
                                    "visible",
                                    false
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatALandDetails",
                                    "visible",
                                    false
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatATableOne",
                                    "visible",
                                    false
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatCTableOne",
                                    "visible",
                                    false
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatATableTwo",
                                    "visible",
                                    false
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatCSeparateRoof",
                                    "visible",
                                    false
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatCManualBill",
                                    "visible",
                                    false
                                )
                            )


                            //visible

                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatBLandDetails",
                                    "visible",
                                    true
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatBTableOne",
                                    "visible",
                                    true
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatATax",
                                    "visible",
                                    true
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatAManualBill",
                                    "visible",
                                    true
                                )
                            )

                            break;
                        default:

                            localStorage.setItem('format', 'C')
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatALandDetails",
                                    "visible",
                                    false
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatBLandDetails",
                                    "visible",
                                    false
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatATableOne",
                                    "visible",
                                    false
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatBTableOne",
                                    "visible",
                                    false
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatATableTwo",
                                    "visible",
                                    false
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatAManualBill",
                                    "visible",
                                    false
                                )
                            )

                            //visible


                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatCTableOne",
                                    "visible",
                                    true
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatCSeparateRoof",
                                    "visible",
                                    true
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatCTableTwo",
                                    "visible",
                                    true
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.safFormatATax",
                                    "visible",
                                    true
                                )
                            )
                            dispatch(
                                handleField(
                                    "apply",
                                    "components.div.children.formwizardThirdStep.children.formatCManualBill",
                                    "visible",
                                    true
                                )
                            )


                            break;
                    }


                },
                required: true,
                type: "array"
            },
            landMark: getTextField({
                label: {
                    labelName: "Nearest Prominent Landmard",
                    labelKey: "Nearest Prominent Landmard"
                },
                props: {
                    className: "applicant-details-error"
                },
                required : true , 
                placeholder: {
                    labelName: "Enter Nearest Prominent Landmard",
                    labelKey: "Enter Nearest Prominent Landmard"
                },
                jsonPath: "Saf[0].asseseDetail.landMark"
            }),
            natureOfUse: getTextField({
                label: {
                    labelName: "Nature of Use",
                    labelKey: "Nature of Use"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Nature of Use",
                    labelKey: "Enter Nature of Use"
                },
                jsonPath: "Saf[0].asseseDetail.natureOfUse"
            }),
            frontageRoadName_Others: getTextField({
                label: {
                    labelName: "Other Frontage Road",
                    labelKey: "Other Frontage Road"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Other Frontage Road",
                    labelKey: "Enter Other Frontage Road"
                },
                jsonPath: "Saf[0].asseseDetail.frontageRoadName_Others"
            }),
            nearestLampPost: getTextField({
                label: {
                    labelName: "Nearest Lamp Post",
                    labelKey: "Nearest Lamp Post"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Nearest Lamp Post",
                    labelKey: "Enter Nearest Lamp Post"
                },
                jsonPath: "Saf[0].asseseDetail.nearestLampPost"
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
