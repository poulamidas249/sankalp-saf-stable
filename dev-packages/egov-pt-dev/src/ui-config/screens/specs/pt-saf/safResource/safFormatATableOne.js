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

    dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne", null));
    let blockValue = get(
        state.screenConfiguration.preparedFinalObject,
        "Saf[0].asseseDetail.blockValue",
        "32"
      );
      dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.A1f", blockValue));
     // dispatch(
    //     handleField(
    //         "apply",
    //         "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA1f",
    //         "props.value",
    //         ""
    //     )
    // )


    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA1ff",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA1g",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA1h",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA1i",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA1j",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA1k",
            "props.value",
            ""
        )
    )



    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA1ff",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA1g",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA1h",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA1i",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA1j",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseA1k",
            "props.error",
            false
        )
    )


}
export const safFormatATableOne = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Calculation of Annual Tax for assessable Vacant Land",
                labelKey: "Calculation of Annual Tax for assessable Vacant Land"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),

        asseseDetailsConatiner: getCommonContainer({
            asseseDetailsConatinerIn: getCommonContainer({
                asseseA1f: getTextField({
                    label: {
                        labelName: "Base Unit Area Value (Rs.) A1f",
                        labelKey: "Base Unit Area Value (Rs.) A1f"
                    },
                    gridDefination: {
                        xs: 12,
                        sm: 4,
                    },
                    props: {
                        className: "applicant-details-error",
                        disabled: true,
                        defaultValue: '32'
                    },
                    placeholder: {
                        labelName: "Enter Base Unit Area Value (Rs.)",
                        labelKey: "Enter Base Unit Area Value (Rs.)"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableOne.A1f"
                }),

                asseseA1ff: {
                    ...getSelectField({
                        label: {
                            labelName: "It is already acceseed A1ff",
                            labelKey: "It is already acceseed A1ff"
                        },
                        required: true,
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        data: [{ label: "Yes", code: "Y", value: "Y" }, { label: "No", code: "N", value: "N" }],
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.tableOne.A1ff",
                        optionLabel: "label",
                        props: {
                        }
                    }),
                    beforeFieldChange: async (action, state, dispatch) => {

                    }
                },
                asseseA1g: getTextField({
                    label: {
                        labelName: "Vacant Land Area (Sq.Ft) A1g",
                        labelKey: "Vacant Land Area (Sq.Ft) A1g"
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
                        labelName: "Enter Vacant Land Area (Sq.Ft)",
                        labelKey: "Enter Vacant Land Area (Sq.Ft)"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableOne.A1g"
                }),
                asseseA1h: {
                    ...getSelectField({
                        label: {
                            labelName: "Usage Multiplicative Factor A1h",
                            labelKey: "Usage Multiplicative Factor A1h"
                        },
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        required: true,
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.USAGE_MULTI_FACTOR",
                        jsonPath: "Saf[0].asseseDetail.A1h",
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

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.A1h", OValue));

                        }
                    }
                },
                asseseA1i: {
                    ...getSelectField({
                        label: {
                            labelName: "Location Multiplicative Factor A1i",
                            labelKey: "Location Multiplicative Factor A1i"
                        },
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        required: true,
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.A1i",
                        optionLabel: "description",
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.LOCATION_MULTI_FACTOR",
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

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.A1i", OValue));

                        }
                    }
                },
                asseseA1j: {
                    ...getSelectField({
                        label: {
                            labelName: "Occupancy Multiplicative Factor A1j",
                            labelKey: "Occupancy Multiplicative Factor A1j"
                        },
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        required: true,
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.OCCUPANCY_MULTI_FACTOR",
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.A1j",
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

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.A1j", OValue));
                        }
                    }
                },

                asseseA1k: getTextField({
                    label: {
                        labelName: "Annual Value(Rs.) A1k",
                        labelKey: "Annual Value(Rs.) A1k"
                    },
                    gridDefination: {
                        xs: 12,
                        sm: 4,
                    },
                    props: {
                        className: "applicant-details-error",
                        disabled: true
                    },
                    placeholder: {
                        labelName: "Enter Annual Value(Rs.)",
                        labelKey: "Enter Annual Value(Rs.)"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableOne.A1k"
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
                                    "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children",
                                    state,
                                    dispatch
                                );
                                if (isSafFormatValid) {
                                    let tableOne = get(
                                        state,
                                        "screenConfiguration.preparedFinalObject.Saf[0].asseseDetail.tableOne"
                                    );
                                    let tableOneData = get(
                                        state,
                                        "screenConfiguration.preparedFinalObject.Saf[0].asseseDetail.formatDataOne",
                                        []
                                    );
                                    tableOneData.push(tableOne)
                                    dispatch(prepareFinalObject("Saf[0].asseseDetail.formatDataOne", tableOneData));
                                    dispatch(
                                        handleField(
                                            "apply",
                                            "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.FormatATableOne",
                                            "props.tableData",
                                            tableOneData
                                        )
                                    )
                                    resetForm(state, dispatch)
                                } else {
                                    let errorMessage = {
                                        labelName: "Please fill all mandatory fields",
                                        labelKey: "Please fill all mandatory fields"
                                    };

                                    dispatch(toggleSnackbar(true, errorMessage, "warning"));

                                }

                            }
                        }
                    }
                })
            }),


        }),

        FormatATableOne: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-pt",
            componentPath: "FormatATableOne",
            props: {
                tableData: []
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
