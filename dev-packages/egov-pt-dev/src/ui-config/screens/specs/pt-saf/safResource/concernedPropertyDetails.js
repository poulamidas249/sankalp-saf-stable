import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";
import get from "lodash/get";

export const concernedPropertyDetails = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Details of Concerned Property",
                labelKey: "Details of Concerned Property"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),
        asseseDetailsConatiner: getCommonContainer({

            wardNo: getTextField({
                label: {
                    labelName: "Ward Number",
                    labelKey: "Ward Number"
                },
                props: {
                    className: "applicant-details-error"
                },
                disabled: true,
                required: true,
                placeholder: {
                    labelName: "Enter Ward Number",
                    labelKey: "Enter Ward Number"
                },
                jsonPath: "Saf[0].asseseDetail.wardNo"
            }),
            streetCode: getTextField({
                label: {
                    labelName: "KMC Street Code",
                    labelKey: "KMC Street Code"
                },
                disabled: true,
                props: {
                    className: "applicant-details-error"
                },
                required: true,
                placeholder: {
                    labelName: "Enter KMC Street Code",
                    labelKey: "Enter KMC Street Code"
                },
                jsonPath: "Saf[0].asseseDetail.streetCode"
            }),
            premisesNo: getTextField({
                label: {
                    labelName: "KMC Premises Number",
                    labelKey: "KMC Premises Number"
                },
                disabled: true,
                required: true,
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter KMC Premises Number",
                    labelKey: "Enter KMC Premises Number"
                },
                jsonPath: "Saf[0].asseseDetail.premisesNo"
            }),
            streetName: getTextField({
                label: {
                    labelName: "KMC Street Name",
                    labelKey: "KMC Street Name"
                },
                disabled: true,
                props: {
                    className: "applicant-details-error"
                },
                required: true,
                placeholder: {
                    labelName: "Enter KMC Street Name",
                    labelKey: "Enter KMC Street Name"
                },
                jsonPath: "Saf[0].asseseDetail.streetName"
            }),
            blockId: {
                ...getSelectField({
                    label: {
                        labelName: "Block",
                        labelKey: "Block"
                    },
                    placeholder: { labelName: "Select", labelKey: "Select" },
                    sourceJsonPath: "blockDropDownData",
                    optionValue: "code",
                    optionLabel: "name",
                    jsonPath: "Saf[0].asseseDetail.blockId",
                    required: true,
                    props: {
                        required: true,
                    }
                }),
                beforeFieldChange: async (action, state, dispatch) => {


                },
                afterFieldChange: async (action, state, dispatch) => {
                    let blockDropDownData = get(
                        state.screenConfiguration.preparedFinalObject,
                        "blockDropDownData",
                        []
                    );
                    if (!blockDropDownData || blockDropDownData==[] ) {
                        dispatch(setRoute("/pt-saf/propertySearch"))
                        return action
                      }
                    let categoryData = blockDropDownData.filter(b => {
                        return b.code === action.value
                    })
                    console.log('categoryData1234', categoryData)
                    dispatch(prepareFinalObject("Saf[0].asseseDetail.category", categoryData[0] ? categoryData[0].category : ""));
                    dispatch(prepareFinalObject("Saf[0].asseseDetail.blockValue", categoryData[0] ? categoryData[0].value : "32"));

                }
            },
            category: getTextField({
                label: {
                    labelName: "Category",
                    labelKey: "Category"
                },
                props: {
                    className: "applicant-details-error"
                },
                disabled: true,
                required: true,
                placeholder: {
                    labelName: "Enter Category",
                    labelKey: "Enter Category",
                    disabled: true
                },
                jsonPath: "Saf[0].asseseDetail.category"
            }),
            propSituated: {
                ...getSelectField({
                    label: {
                        labelName: "Property situated in",
                        labelKey: "Property situated in"
                    },
                    placeholder: { labelName: "Select", labelKey: "Select" },
                    data: [{ name: "Slum", code: "Slum", value: "Slum" }, { name: "Colony", code: "Colony", value: "Colony" }, { name: "Govt. Notified EWS", code: "Govt. Notified EWS", value: "Govt. Notified EWS" }],
                    optionValue: "code",
                    optionLabel: "name",
                    jsonPath: "Saf[0].asseseDetail.propSituated",
                    required: true,
                    props: {
                        required: true,
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
