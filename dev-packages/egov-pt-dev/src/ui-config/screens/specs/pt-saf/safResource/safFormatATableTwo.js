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
      dispatch(prepareFinalObject("Saf[0].asseseDetail.tableTwo.A2b", blockValue));
       
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2a",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2aa",
            "props.value",
            ""
        )
    )
    // dispatch(
    //     handleField(
    //         "apply",
    //         "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2b",
    //         "props.value",
    //         ""
    //     )
    // )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2c",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2d",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2e",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2f",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2g",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2h",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2i",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2j",
            "props.value",
            ""
        )
    )





    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2a",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2aa",
            "props.error",
            false
        )
    )
    // dispatch(
    //     handleField(
    //         "apply",
    //         "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2b",
    //         "props.error",
    //       false
    //     )
    // )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2c",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2d",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2e",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2f",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2g",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2h",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2i",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA2j",
            "props.error",
            false
        )
    )
}
export const safFormatATableTwo = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Details of Property for Tax Calculation for Constructed Portion",
                labelKey: "Details of Property for Tax Calculation for Constructed Portion"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),

        asseseDetailsConatiner: getCommonContainer({
            asseseDetailsConatinerIn: getCommonContainer({
                asseseA2a: getTextField({
                    label: {
                        labelName: "Portion Location/Description A2a",
                        labelKey: "Portion Location/Description A2a"
                    },
                    gridDefination: {
                        xs: 12,
                        sm: 4,
                    },
                    props: {
                        className: "applicant-details-error"
                    },
                    required: true,
                    placeholder: {
                        labelName: "Enter Portion Location/Description/Unit",
                        labelKey: "Enter Portion Location/Description/Unit"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableTwo.A2a"
                }),

                asseseA2aa: {
                    ...getSelectField({
                        label: {
                            labelName: "It is already acceseed A2aa",
                            labelKey: "It is already acceseed A2aa"
                        },
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        required: true,
                        data: [{ label: "Yes", code: "Y", value: "Y" }, { label: "No", code: "N", value: "N" }],
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.tableTwo.A2aa",
                        optionLabel: "label",
                        props: {
                        }
                    }),
                    beforeFieldChange: async (action, state, dispatch) => {

                    }
                },

                asseseA2b: getTextField({
                    label: {
                        labelName: "Base Unit Area Value A2b",
                        labelKey: "Base Unit Area Value A2b"
                    },
                    gridDefination: {
                        xs: 12,
                        sm: 4,
                    },
                    required: true,
                    props: {
                        className: "applicant-details-error",
                        disabled: true,
                        defaultValue: '32'
                    },
                    placeholder: {

                        labelName: "Enter Base Unit Area Value A2b",
                        labelKey: "Enter Base Unit Area Value A2b"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableTwo.A2b"
                }),

                asseseA2c: getTextField({
                    label: {
                        labelName: "Covered Space (Sq. Ft.) A2c",
                        labelKey: "Covered Space (Sq. Ft.) A2c"
                    },
                    gridDefination: {
                        xs: 12,
                        sm: 4,
                    },
                    required: true,
                    props: {
                        type: "number",
                        className: "applicant-details-error"
                    },
                    placeholder: {
                        labelName: "Enter Covered Space (Sq. Ft.) A2c",
                        labelKey: "Enter Covered Space (Sq. Ft.) A2c"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableTwo.A2c"
                }),

                asseseA2d: {
                    ...getSelectField({
                        label: {
                            labelName: "Age M factor A2d",
                            labelKey: "Age M factor A2d"
                        },
                        required: true,
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.AGE_MULTI_FACTOR",
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.A2d",
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
                        let AGE_MULTI_FACTOR = MDMSDATA.AGE_MULTI_FACTOR
                        let OValue = ""
                        if (action.value !== "") {
                            if (Array.isArray(AGE_MULTI_FACTOR)) {
                                let LObj = AGE_MULTI_FACTOR.filter(l => { return l.description === action.value })

                                OValue = LObj[0].value
                            }
                        }

                        dispatch(prepareFinalObject("Saf[0].asseseDetail.tableTwo.A2d", OValue));

                    }
                },
                asseseA2e: {
                    ...getSelectField({
                        label: {
                            labelName: "Structure M Factor A2e",
                            labelKey: "Structure M Factor A2e"
                        },
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        required: true,
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.STRUCTURE_MULTI_FACTOR",
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.A2e",
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
                        let STRUCTURE_MULTI_FACTOR = MDMSDATA.STRUCTURE_MULTI_FACTOR
                        let OValue = ""
                        if (action.value !== "") {
                            if (Array.isArray(STRUCTURE_MULTI_FACTOR)) {
                                let LObj = STRUCTURE_MULTI_FACTOR.filter(l => { return l.description === action.value })

                                OValue = LObj[0].value
                            }

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableTwo.A2e", OValue));
                        }
                    }
                },
                asseseA2f: {
                    ...getSelectField({
                        label: {
                            labelName: "Usage Multiplicative Factor A2f",
                            labelKey: "Usage Multiplicative Factor A2f"
                        },
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        required: true,
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.USAGE_MULTI_FACTOR",
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.tableTwo.A2f",
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

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableTwo.A2f", OValue));
                        }
                    }
                },
                asseseA2g: {
                    ...getSelectField({
                        label: {
                            labelName: "Location Multiplicative Factor A2g",
                            labelKey: "Location Multiplicative Factor A2g"
                        },
                        required: true,
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.LOCATION_MULTI_FACTOR",
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.A2g",
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
                        }
                        dispatch(prepareFinalObject("Saf[0].asseseDetail.tableTwo.A2g", OValue));

                    }
                },
                asseseA2h: {
                    ...getSelectField({
                        label: {
                            labelName: "Occupancy Multiplicative Factor A2h",
                            labelKey: "Occupancy Multiplicative Factor A2h"
                        },
                        required: true,
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.OCCUPANCY_MULTI_FACTOR",
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.A2h",
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

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableTwo.A2h", OValue));
                        }
                    }
                },

                asseseA2i: getTextField({
                    label: {
                        labelName: "Annual Value(Rs.) A2i",
                        labelKey: "Annual Value(Rs.) A2i"
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
                        labelName: "Enter Annual Value(Rs.)",
                        labelKey: "Enter Annual Value(Rs.)"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableTwo.A2i"
                }),


                asseseA2j: getTextField({
                    label: {
                        labelName: "Aggregate Result(Rs.) A2j",
                        labelKey: "Aggregate Result(Rs.) A2j"
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
                        labelName: "Enter Aggregate Result(Rs.) A2j",
                        labelKey: "Enter Aggregate Result(Rs.) A2j"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableTwo.A2j"
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
                                    "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children",
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
                                            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.applicationsCardsdaf",
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


        }),
        applicationsCardsdaf: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-pt",
            componentPath: "FormatATableTwo",
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
