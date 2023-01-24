
import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";
import set from "lodash/set";
import get from "lodash/get";

export const safPropertyDetials = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Property Details",
                labelKey: "Property Details"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),

        asseseDetailsConatiner: getCommonContainer({


            landMark: getTextField({
                label: {
                    labelName: "Nearest Prominent Landmark",
                    labelKey: "Nearest Prominent Landmark"
                },
                required : true ,
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Nearest Prominent Landmark",
                    labelKey: "Enter Nearest Prominent Landmark"
                },
                jsonPath: "Saf[0].asseseDetail.landMark"
            }),

            frontageRoadName_Others: getTextField({
                label: {
                    labelName: "Other Frontage Road",
                    labelKey: "Other Frontage Road"
                },
                required : true ,
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
                    labelName: "Nearest Lamp Post ",
                    labelKey: "Nearest Lamp Post "
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Nearest Lamp Post ",
                    labelKey: "Enter Nearest Lamp Post "
                },
                jsonPath: "Saf[0].asseseDetail.nearestLampPost"
            }),
            asseseNatureOfUse: getTextField({
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
                jsonPath: "Saf[0].asseseDetail.asseseNatureOfUse"
            }),
            asseseUseCode: getTextField({
                label: {
                    labelName: "Use Code",
                    labelKey: "Use Code"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Use Code",
                    labelKey: "Enter Use Code"
                },
                jsonPath: "Saf[0].asseseDetail.asseseUseCode"
            }),


            asseseTypeOfProperty: {
                uiFramework: "custom-containers",
                componentPath: "RadioGroupContainer",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 12
                },
                jsonPath:
                    "Saf[0].asseseDetail.asseseTypeOfProperty",
                props: {
                    label: {
                        name: "Type Of Self Assessment Initiation",
                        key: "Type Of Self Assessment Initiation"
                    },
                    buttons: [
                        {
                            labelName: "Single Unit Building with Single Assessee No",
                            labelKey: "Single Unit Building with Single Assessee No",
                            value: "Single Unit Building with Single Assessee No"
                        },
                        {
                            label: "Vacant Land",
                            labelKey: "Vacant Land",
                            value: "Vacant Land"
                        },
                        {
                            label: "Apartment/Flat",
                            labelKey: "Apartment/Flat",
                            value: "Apartment/Flat"
                        },
                        {
                            label: "Separately transferred roof having no construction",
                            labelKey: "Separately transferred roof having no construction",
                            value: "Separately transferred roof having no construction"
                        },
                        {
                            label: "Separately transferred roof with construction",
                            labelKey: "Separately transferred roof with construction",
                            value: "Separately transferred roof with construction"
                        },
                    ],
                    jsonPath:
                        "Saf[0].asseseDetail.asseseTypeOfProperty",
                    required: true
                },
                afterFieldChange: async (action, state, dispatch) => {

                    let type = get(
                        state.screenConfiguration.preparedFinalObject,
                        "Saf[0].asseseDetail.asseseTypeOfProperty",
                        null
                    )
                    switch (type) {
                        case 'Single Unit Building with Single Assessee No':

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
                        case 'Vacant Land' || 'Separately transferred roof having no construction':
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
                                    "components.div.children.formwizardThirdStep.children.formatALandDetails",
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

            asseseChangeInNatureOfProperty: {
                ...getSelectField({
                    label: {
                        labelName: "Has there been any change in nature and character of the property since last assessment period?",
                        labelKey: "Has there been any change in nature and character of the property since last assessment period?"
                    },
                    localePrefix: {
                        moduleName: "TENANT",
                        masterName: "TENANTS"
                    },
                    gridDefination: {
                        xs: 12,
                        sm: 12
                    },
                    optionLabel: "name",
                    placeholder: { labelName: "Select", labelKey: "Select" },
                    sourceJsonPath: "applyScreenMdmsData.asseseDetail.asseseChangeInNatureOfProperty",
                    jsonPath: "Saf[0].asseseDetail.asseseChangeInNatureOfProperty",
                    required: true,
                    props: {
                        required: true,
                        disabled: true,
                        gridDefination: {
                            xs: 12,
                            sm: 12
                        },
                    }
                }),
                beforeFieldChange: async (action, state, dispatch) => {

                }
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
