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
      dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.B1d", blockValue));
      
    // dispatch(
    //     handleField(
    //         "apply",
    //         "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseB1d",
    //         "props.value",
    //         ""
    //     )
    // )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseB1dd",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseB1c",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseB1e",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseB1f",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseB1g",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseB1h",
            "props.value",
            ""
        )
    )












    // dispatch(
    //     handleField(
    //         "apply",
    //         "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseB1d",
    //         "props.error",
    //         false
    //     )
    // )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseB1dd",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseB1c",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseB1e",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseB1f",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseB1g",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseB1h",
            "props.error",
            false
        )
    )
}
export const safFormatBTableOne = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Calculation of AV & Tax for Vacant Land",
                labelKey: "Calculation of AV & Tax for Vacant Land"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),

        asseseDetailsConatiner: getCommonContainer({
            asseseDetailsConatinerIn: getCommonContainer({

                asseseB1d: getTextField({
                    label: {
                        labelName: "Base Unit Area Value (Rs.) B1d",
                        labelKey: "Base Unit Area Value (Rs.) B1d"
                    },
                    gridDefination: {
                        xs: 12,
                        sm: 4,
                    },
                    props: {
                        disabled: true,
                        type: "number",
                        className: "applicant-details-error"
                    },
                    placeholder: {
                        labelName: "Enter Base Unit Area Value (Rs.)",
                        labelKey: "Enter Base Unit Area Value (Rs.)"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableOne.B1d"
                }),

                asseseB1dd: {
                    ...getSelectField({
                        label: {
                            labelName: "It is already acceseed B1dd",
                            labelKey: "It is already acceseed B1dd"
                        },
                        required: true,
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        data: [{ label: "Yes", code: "Y", value: "Y" }, { label: "No", code: "N", value: "N" }],
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.tableOne.B1dd",

                        props: {
                        }
                    }),
                    beforeFieldChange: async (action, state, dispatch) => {

                    }
                },


                asseseB1c: getTextField({
                    label: {
                        labelName: "Vacant Land Area (Sq.Ft) B1c",
                        labelKey: "Vacant Land Area (Sq.Ft) B1c"
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
                        labelName: "Enter Vacant Land Area (Sq.Ft)",
                        labelKey: "Enter Vacant Land Area (Sq.Ft)"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableOne.B1c"
                }),
                asseseB1e: {
                    ...getSelectField({
                        label: {
                            labelName: "Usage Multiplicative Factor B1e",
                            labelKey: "Usage Multiplicative Factor B1e"
                        },
                        required: true,
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.USAGE_MULTI_FACTOR",
                        jsonPath: "Saf[0].asseseDetail.B1e",
                        placeholder: { labelName: "Select", labelKey: "Select" },
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

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.B1e", OValue));
                        }
                    }
                },
                asseseB1f: {
                    ...getSelectField({
                        label: {
                            labelName: "Location Multiplicative Factor B1f",
                            labelKey: "Location Multiplicative Factor B1f"
                        },
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        required: true,
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.LOCATION_MULTI_FACTOR",
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.B1f",
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

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.B1f", OValue));
                        }
                    }
                },
                asseseB1g: {
                    ...getSelectField({
                        label: {
                            labelName: "Occupancy Multiplicative Factor B1g",
                            labelKey: "Occupancy Multiplicative Factor B1g"
                        },
                        required: true,
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        optionLabel: "description",
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.OCCUPANCY_MULTI_FACTOR",
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.B1g",

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

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.B1g", OValue));
                        }
                    }
                },

                asseseB1h: getTextField({
                    label: {
                        labelName: "Annual Value(Rs.) B1h",
                        labelKey: "Annual Value(Rs.) B1h"
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
                    jsonPath: "Saf[0].asseseDetail.tableOne.B1h"
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
                                    "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children",
                                    state,
                                    dispatch
                                );
                                if (isSafFormatValid) {
                                    let tableOne = get(
                                        state,
                                        "screenConfiguration.preparedFinalObject.Saf[0].asseseDetail.tableOne"
                                    );
                                    tableOne.A1f = '32'
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
                                            "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.FormatBTableOne",
                                            "props.tableData",
                                            tableOneData
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
        FormatBTableOne: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-pt",
            componentPath: "FormatBTableOne",
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
