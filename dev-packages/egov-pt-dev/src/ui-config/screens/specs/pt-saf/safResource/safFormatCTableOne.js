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
      dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.C1b", blockValue));
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1a",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1aa",
            "props.value",
            ""
        )
    )
    // dispatch(
    //     handleField(
    //         "apply",
    //         "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1b",
    //         "props.value",
    //         ""
    //     )
    // )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1c",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1d",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1e",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1f",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1g",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1h",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1i",
            "props.value",
            ""
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1j",
            "props.value",
            ""
        )
    )







    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1a",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1aa",
            "props.error",
            false
        )
    )
    // dispatch(
    //     handleField(
    //         "apply",
    //         "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1b",
    //         "props.error",
    //         false
    //     )
    // )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1c",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1d",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1e",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1f",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1g",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1h",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1i",
            "props.error",
            false
        )
    )
    dispatch(
        handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children.asseseC1j",
            "props.error",
            false
        )
    )

}
export const safFormatCTableOne = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Details of Property for Tax Calculation",
                labelKey: "Details of Property for Tax Calculation"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),

        asseseDetailsConatiner: getCommonContainer({
            asseseDetailsConatinerIn: getCommonContainer({

                asseseC1a: getTextField({
                    label: {
                        labelName: "Location/Description/Unit C1a",
                        labelKey: "Location/Description/Unit C1a"
                    },
                    gridDefination: {
                        xs: 12,
                        sm: 4,
                    },
                    required: true,
                    props: {
                        className: "applicant-details-error"
                    },
                    placeholder: {
                        labelName: "Enter Location/Description/Unit C1a",
                        labelKey: "Enter Location/Description/Unit C1a"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableOne.C1a"
                }),
                asseseC1b: getTextField({
                    label: {
                        labelName: "Base unit Area Value(Rs.) C1b",
                        labelKey: "Base unit Area Value(Rs.) C1b"
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
                        labelName: "Enter Base unit Area Value(Rs.) C1b",
                        labelKey: "Enter Base unit Area Value(Rs.) C1b"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableOne.C1b"
                }),
                asseseC1c: getTextField({
                    label: {
                        labelName: "Covered Space(Sq. Ft.) C1c",
                        labelKey: "Covered Space(Sq. Ft.) C1c"
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
                        labelName: "Enter Covered Space(Sq. Ft.) C1c",
                        labelKey: "Enter Covered Space(Sq. Ft.) C1c"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableOne.C1c"
                }),
                asseseC1d: {
                    ...getSelectField({
                        label: {
                            labelName: "Age M factor C1d",
                            labelKey: "Age M factor C1d"
                        },
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        required: true,
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.AGE_MULTI_FACTOR",
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.C1d",
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

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.C1d", OValue));
                        }
                    }
                },
                asseseC1e: {
                    ...getSelectField({
                        label: {
                            labelName: "Structure M Factor C1e",
                            labelKey: "Structure M Factor C1e"
                        },
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        required: true,
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.STRUCTURE_MULTI_FACTOR",
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.C1e",
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

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.C1e", OValue));
                        }
                    }
                },
                asseseC1f: {
                    ...getSelectField({
                        label: {
                            labelName: "Usage Multiplicative Factor C1f",
                            labelKey: "Usage Multiplicative Factor C1f"
                        },
                        required: true,
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.USAGE_MULTI_FACTOR",
                        jsonPath: "Saf[0].asseseDetail.C1f",
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

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.C1f", OValue));
                        }
                    }
                },
                asseseC1g: {
                    ...getSelectField({
                        label: {
                            labelName: "Location Multiplicative Factor C1g",
                            labelKey: "Location Multiplicative Factor C1g"
                        },
                        required: true,
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.LOCATION_MULTI_FACTOR",
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.C1g",
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

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.C1g", OValue));
                        }
                    }
                },
                asseseC1h: {
                    ...getSelectField({
                        label: {
                            labelName: "Occupancy Multiplicative Factor C1h",
                            labelKey: "Occupancy Multiplicative Factor C1h"
                        },
                        required: true,
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        sourceJsonPath: "applyScreenMdmsData.PropertyTax.OCCUPANCY_MULTI_FACTOR",
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.C1h",
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

                            dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.C1h", OValue));
                        }
                    }
                },
                asseseC1i: getTextField({
                    label: {
                        labelName: "Annual Value(Rs.) C1i",
                        labelKey: "Annual Value(Rs.) C1i"
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
                        labelName: "Enter Annual Value(Rs.) C1i",
                        labelKey: "Enter Annual Value(Rs.) C1i"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableOne.C1i"
                }),
                asseseC1j: getTextField({
                    label: {
                        labelName: "Aquiring Rent(Rs.) C1j",
                        labelKey: "Aquiring Rent(Rs.) C1j"
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
                        labelName: "Enter Aquiring Rent,if any,including Maintenance/Service Charges(Rs.) C1j",
                        labelKey: "Enter Aquiring Rent,if any,including Maintenance/Service Charges(Rs.) C1j"
                    },
                    jsonPath: "Saf[0].asseseDetail.tableOne.C1j"
                }),


                asseseC1aa: {
                    ...getSelectField({
                        label: {
                            labelName: "It is already acceseed C1aa",
                            labelKey: "It is already acceseed C1aa"
                        },
                        gridDefination: {
                            xs: 12,
                            sm: 4,
                        },
                        data: [{ label: "Yes", code: "Y", value: "Y" }, { label: "No", code: "N", value: "N" }],
                        placeholder: { labelName: "Select", labelKey: "Select" },
                        jsonPath: "Saf[0].asseseDetail.tableOne.C1aa",

                        props: {
                        }
                    }),
                    beforeFieldChange: async (action, state, dispatch) => {

                    }
                },
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
                                    "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.asseseDetailsConatiner.children.asseseDetailsConatinerIn.children",
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
                                            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.FormatCTableOne",
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
        FormatCTableOne: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-pt",
            componentPath: "FormatCTableOne",
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
