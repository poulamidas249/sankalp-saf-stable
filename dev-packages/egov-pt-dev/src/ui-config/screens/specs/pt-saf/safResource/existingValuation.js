
import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";
import set from "lodash/set";
import get from "lodash/get";

export const existingValuation = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Existing Valuation & Tax Details",
                labelKey: "Existing Valuation & Tax Details"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),

        asseseDetailsConatiner: getCommonContainer({



            av: getTextField({
                label: {
                    labelName: "Annual Value of Property Fixed at in(Rs.)",
                    labelKey: "Annual Value of Property Fixed at in(Rs.)"
                },
                required: true,
                props: {
                    className: "applicant-details-error",
                    disabled :true,
                },
                placeholder: {
                    labelName: "Enter Annual Value of Property Fixed at in(Rs.)",
                    labelKey: "Enter Annual Value of Property Fixed at in(Rs.)"
                },
                jsonPath: "Saf[0].asseseDetail.av"
            }),

            // effectiveQuarter: getTextField({
            //     label: {
            //         labelName: "Last Completed GR/IR effective from",
            //         labelKey: "Last Completed GR/IR effective from"
            //     },
            //     props: {
            //         className: "applicant-details-error"
            //     },
            //     placeholder: {
            //         labelName: "Enter Last Completed GR/IR effective from",
            //         labelKey: "Enter Last Completed GR/IR effective from"
            //     },
            //     jsonPath: "Saf[0].asseseDetail.effectiveQuarter"
            // }),




            isCharacterChange: {
                ...getSelectField({
                    label: {
                        labelName: "Has there been any change in character of the property",
                        labelKey: "Has there been any change in character of the property"
                    },
                    gridDefination: {
                        xs: 6,
                        sm: 6
                    },
                    optionLabel: "label",
                    placeholder: { labelName: "Select", labelKey: "Select" },
                    data: [{ label: "Yes", code: "Y", value: "Y" }, { label: "No", code: "N", value: "N" }],
                    jsonPath: "Saf[0].asseseDetail.isCharacterChange",
                    required: true,
                    props: {
                        gridDefination: {
                            xs: 6,
                            sm: 6
                        },
                    }
                }),
                beforeFieldChange: async (action, state, dispatch) => {

                },
                afterFieldChange: async (action, state, dispatch) => {

                    if (action.value == "Y") {
                        dispatch(
                            handleField(
                                "apply",
                                "components.div.children.formwizardSecondStep.children.existingValuation.children.cardContent.children.asseseDetailsConatiner.children.characterChangeOtherDesc",
                                "visible",
                                true
                            )
                        );
                    } else {
                        dispatch(
                            handleField(
                                "apply",
                                "components.div.children.formwizardSecondStep.children.existingValuation.children.cardContent.children.asseseDetailsConatiner.children.characterChangeOtherDesc",
                                "visible",
                                false
                            )
                        );
                    }

                },
            },
            characterChangeOtherDesc: getTextField({
                label: {
                    labelName: "Mention change if 'Others'",
                    labelKey: "Mention change if 'Others'"
                },
                required: false,
                props: {
                    className: "applicant-details-error",
                    visible : false, 
                },
                visible : false, 
                placeholder: {
                    labelName: "Enter Mention change if 'Others'",
                    labelKey: "Enter Mention change if 'Others'"
                },
                jsonPath: "Saf[0].asseseDetail.characterChangeOtherDesc"
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
