import {
    getCommonCard, getCommonContainer, getCommonTitle, getLabel, getPattern, getBreak, getSelectField, getTextField, getCommonGrayCard
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";
import get from "lodash/get";
import set from "lodash/set";

import { createEstimateData, downloadCertificateForm, getButtonVisibility, getCommonApplyFooter, getDocList, setMultiOwnerForApply, setValidToFromVisibilityForApply, validateFields } from "../../utils";

const resetForm = async (state, dispatch) => {
    dispatch(prepareFinalObject("Saf[0].asseseDetail.tableTwo", null));
    let blockValue = get(
        state.screenConfiguration.preparedFinalObject,
        "Saf[0].asseseDetail.blockValue",
        "32"
      );
      dispatch(prepareFinalObject("Saf[0].asseseDetail.tableTwo.C2d", blockValue));
      // dispatch(
    //     handleField(
    //         "apply",
    //         "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2d",
    //         "props.value",
    //         ""
    //     )
    // )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2dd",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2e",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2f",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2g",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2h",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2i",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2j",
            "props.value",
            ""
        )
    )





    // dispatch(
    //     handleField(
    //         "apply",
    //         "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2d",
    //         "props.error",
    //         false
    //     )
    // )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2dd",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2e",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2f",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2g",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2h",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2i",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC2j",
            "props.error",
            false
        )
    )






}
export const safFormatCTableTwo = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Calculation of Annual Tax for Unconstructed Area of Separately Transferred Roof",
                labelKey: "Calculation of Annual Tax for Unconstructed Area of Separately Transferred Roof"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),

        asseseDetailsConatiner: getCommonContainer({
            asseseDetailsConatinerIn: getCommonContainer({

                asseseC2d: getTextField({
                    label: {
                        labelName: "Base Unit Area Value C2d",
                        labelKey: "Base Unit Area Value C2d"
                    },
                    gridDefination: {
                        xs: 12,
                        sm: 4,
                    },
                    props: {
                        disabled: true,
                        className: "applicant-details-error"
                    },
                    placeholder: {
                        labelName: "Enter Base Unit Area Value C2d",
                        labelKey: "Enter Base Unit Area Value C2d"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableTwo.C2d"
                }),

                asseseC2dd: {
                    ...getSelectField({
                        label: {
                            labelName: "It is already acceseed C2dd",
                            labelKey: "It is already acceseed C2dd"
                        },
                        required: true,
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        data: [{ label: "Yes", code: "Y", value: "Y" }, { label: "No", code: "N", value: "N" }],
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.tableTwo.C2dd",

                        props: {
                        }
                    }),
                    beforeFieldChange: async (action, state, dispatch) => {

                    }
                },

                asseseC2e: getTextField({
                    label: {
                        labelName: "Separately Transferred Roof(Sq. Ft.) C2e",
                        labelKey: "Separately Transferred Roof(Sq. Ft.) C2e"
                    },
                    required: true,
                    gridDefination: {
                        xs: 12,
                        sm: 4,
                    },
                    props: {
                        type: "number",
                        className: "applicant-details-error"
                    },
                    placeholder: {
                        labelName: "Enter Separately Transferred Roof Unconstructed Portion(Sq. Ft.) C2e",
                        labelKey: "Enter Separately Transferred Roof Unconstructed Portion(Sq. Ft.) C2e"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableTwo.C2e"
                }),

                asseseC2f: {
                    ...getSelectField({
                        label: {
                            labelName: "Usage Multiplicative Factor C2f",
                            labelKey: "Usage Multiplicative Factor C2f"
                        },
                        required: true,
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.USAGE_MULTI_FACTOR",
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.C2f",
                        optionLabel: "description",
                        props: {
                            optionValue: "description",
                        }
                    }),
                    beforeFieldChange: async (action, state, dispatch) => {

                    },
                    afterFieldChange: async (action, state, dispatch) => {
                        const MDMSDATA = get(
                            state.screenConfiguration.preparedFinalObject,
                            "applyScreenMdmsData.PropertyTax",
                            {}
                        );
                        let USAGE_MULTI_FACTOR = MDMSDATA.USAGE_MULTI_FACTOR
                        let OValue = ""
                        if (action.value !== "") {
                            if (Array.isArray(USAGE_MULTI_FACTOR)) {
                                let LObj = USAGE_MULTI_FACTOR.filter(l => { return l.description === action.value })

                                OValue = LObj[0].value
                            }

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableTwo.C2f", OValue));
                        }
                    }
                },
                asseseC2g: {
                    ...getSelectField({
                        label: {
                            labelName: "Location Multiplicative Factor C2g",
                            labelKey: "Location Multiplicative Factor C2g"
                        },
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        required: true,
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.LOCATION_MULTI_FACTOR",
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.C2g",
                        optionLabel: "description",
                        props: {
                            optionValue: "description",
                        }
                    }),
                    beforeFieldChange: async (action, state, dispatch) => {

                    },
                    afterFieldChange: async (action, state, dispatch) => {
                        const MDMSDATA = get(
                            state.screenConfiguration.preparedFinalObject,
                            "applyScreenMdmsData.PropertyTax",
                            {}
                        );
                        let LOCATION_MULTI_FACTOR = MDMSDATA.LOCATION_MULTI_FACTOR
                        let OValue = ""
                        if (action.value !== "") {
                            if (Array.isArray(LOCATION_MULTI_FACTOR)) {
                                let LObj = LOCATION_MULTI_FACTOR.filter(l => { return l.description === action.value })

                                OValue = LObj[0].value
                            }

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableTwo.C2g", OValue));
                        }
                    }
                },
                asseseC2h: {
                    ...getSelectField({
                        label: {
                            labelName: "Occupancy Multiplicative Factor C2h",
                            labelKey: "Occupancy Multiplicative Factor C2h"
                        },
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        required: true,
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.OCCUPANCY_MULTI_FACTOR",
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.C2h",
                        optionLabel: "description",
                        props: {
                            optionValue: "description",
                        }
                    }),
                    beforeFieldChange: async (action, state, dispatch) => {

                    },
                    afterFieldChange: async (action, state, dispatch) => {
                        const MDMSDATA = get(
                            state.screenConfiguration.preparedFinalObject,
                            "applyScreenMdmsData.PropertyTax",
                            {}
                        );
                        let OCCUPANCY_MULTI_FACTOR = MDMSDATA.OCCUPANCY_MULTI_FACTOR
                        let OValue = ""
                        if (action.value !== "") {
                            if (Array.isArray(OCCUPANCY_MULTI_FACTOR)) {
                                let LObj = OCCUPANCY_MULTI_FACTOR.filter(l => { return l.description === action.value })

                                OValue = LObj[0].value
                            }

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableTwo.C2h", OValue));
                        }
                    }
                },

                asseseC2i: getTextField({
                    label: {
                        labelName: "Annual Value(Rs.) C2i",
                        labelKey: "Annual Value(Rs.) C2i"
                    },
                    gridDefination: {
                        xs: 12,
                        sm: 4,
                    },
                    props: {
                        disabled: true,
                        className: "applicant-details-error"
                    },
                    placeholder: {
                        labelName: "Enter Base Unit Area Value (Rs.)",
                        labelKey: "Enter Base Unit Area Value (Rs.)"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableTwo.C2i"
                }),


                asseseC2j: getTextField({
                    label: {
                        labelName: "Aggregate Result(Rs.) C2j",
                        labelKey: "Aggregate Result(Rs.) C2j"
                    },
                    gridDefination: {
                        xs: 12,
                        sm: 4,
                    },
                    props: {
                        disabled: true,
                        className: "applicant-details-error"
                    },
                    placeholder: {
                        labelName: "Enter Aggregate Result(Rs.) C2j",
                        labelKey: "Enter Aggregate Result(Rs.) C2j"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableTwo.C2j"
                }),
            }),

            button: getCommonContainer({
                buttonContainer: getCommonContainer({
                    resetButton: {
                        componentPath: "Button",
                        gridDefination: {
                            xs: 12,
                            sm: 6
                            // align: "center"
                        },
                        props: {
                            variant: "outlined",
                            style: {
                                color: "black",
                                borderColor: "black",
                                width: "220px",
                                height: "48px",
                                margin: "8px",
                                float: "right"
                            }
                        },
                        children: {
                            buttonLabel: getLabel({
                                labelName: "Reset",
                                labelKey: "Reset"
                            })
                        },
                        onClickDefination: {
                            action: "condition",
                            callBack: resetForm
                        }
                    },
                    searchButton: {
                        componentPath: "Button",
                        gridDefination: {
                            xs: 12,
                            sm: 6
                            // align: "center"
                        },
                        props: {
                            variant: "contained",
                            style: {
                                color: "white",
                                margin: "8px",
                                backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
                                borderRadius: "2px",
                                width: "220px",
                                height: "48px"
                            }
                        },
                        children: {
                            buttonLabel: getLabel({
                                labelName: "Add",
                                labelKey: "Add"
                            })
                        },
                        onClickDefination: {
                            action: "condition",
                            callBack: async (state, dispatch) => {
                                let isSafFormatValid = validateFields(
                                    "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children",
                                    state,
                                    dispatch
                                );
                                if (isSafFormatValid) {
                                    let tableTwo = get(
                                        state,
                                        "screenConfiguration.preparedFinalObject.Saf[0].asseseDetail.tableTwo"
                                    );
                                    let tableTwoData = get(
                                        state,
                                        "screenConfiguration.preparedFinalObject.Saf[0].asseseDetail.formatDataTwo",
                                        []
                                    );
                                    tableTwoData.push(tableTwo)
                                    dispatch(prepareFinalObject("Saf[0].asseseDetail.formatDataTwo", tableTwoData));
                                    dispatch(
                                        handleField(
                                            "apply",
                                            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.applicationsCardsdaf",
                                            "props.newData",
                                            tableTwoData
                                        )
                                    )
                                    resetForm(state, dispatch)
                                }
                            }
                        }
                    }
                })
            }),
            breakAfterSearch: getBreak(),


        }),
        applicationsCardsdaf: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-pt",
            componentPath: "FormatCTableTwo",
            props: {
                newData: []
            }
        },
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
