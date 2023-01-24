
import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";
import set from "lodash/set";
import get from "lodash/get";

export const returnDetails = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Details of Return",
                labelKey: "Details of Return"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),

        asseseDetailsConatiner: getCommonContainer({

            lastReturnYear: getTextField({
                label: {
                    labelName: "Last Return Submitted for Year",
                    labelKey: "Last Return Submitted for Year"
                },
                props: {
                    className: "applicant-details-error",
                    disabled :true
                },
                placeholder: {
                    labelName: "Enter Last Return Submitted for Year",
                    labelKey: "Enter Last Return Submitted for Year"
                },
                jsonPath: "Saf[0].asseseDetail.lastReturnYear"
            }),
            lastReturnQtr: getTextField({
                label: {
                    labelName: "Last Return Quarter",
                    labelKey: "Last Return Quarter"
                },
                props: {
                    className: "applicant-details-error",
                    disabled :true
                },
                placeholder: {
                    labelName: "Enter Last Return Quarter",
                    labelKey: "Enter Last Return Quarter"
                },
                jsonPath: "Saf[0].asseseDetail.lastReturnQtr"
            }),
            currReturnYear: {
                ...getSelectField({
                    label: {
                        labelName: "Current Return Year",
                        labelKey: "Current Return Year"
                    },
                    optionLabel: "name",
                    placeholder: { labelName: "Select", labelKey: "Select" },
                    data: [{ name: "2017", code: "2017", value: "2017" },{ name: "2018", code: "2018", value: "2018" }, { name: "2019", code: "2019", value: "2019" }, { name: "2020", code: "2020", value: "2020" }, { name: "2021", code: "2021", value: "2021" }, { name: "2022", code: "2022", value: "2022" }],
                    optionValue: "code",
                    optionLabel: "name",
                    jsonPath: "Saf[0].asseseDetail.currReturnYear",
                    required: true,
                    props: {
                        required: true,
                    }
                }),
                beforeFieldChange: async (action, state, dispatch) => {

                }
            },
            currReturnQtr: {
                ...getSelectField({
                    label: {
                        labelName: "Current Return Quarter",
                        labelKey: "Current Return Quarter"
                    },
                    optionLabel: "name",
                    placeholder: { labelName: "Select", labelKey: "Select" },
                    data: [{ name: "1", code: "1", value: "1" }, { name: "2", code: "2", value: "2" }, { name: "3", code: "3", value: "3" }, { name: "4", code: "4", value: "4" }],
                    optionValue: "code",
                    optionLabel: "name",
                    jsonPath: "Saf[0].asseseDetail.currReturnQtr",
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
