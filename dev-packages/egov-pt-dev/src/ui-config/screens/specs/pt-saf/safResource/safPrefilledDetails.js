import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";

export const safPrefilledDetails = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Assessee Identification",
                labelKey: "Assessee Identification"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),

        asseseDetailsConatiner: getCommonContainer({

            asseseName: getTextField({
                label: {
                    labelName: "Name",
                    labelKey: "Name"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Name",
                    labelKey: "Enter Name"
                },
                jsonPath: "Saf[0].asseseDetail.asseseName"
            }),
            asseseRelationToProperty: getTextField({
                label: {
                    labelName: "Relation to Property",
                    labelKey: "Relation to Property"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Relation to Property",
                    labelKey: "Enter Relation to Property"
                },
                jsonPath: "Saf[0].asseseDetail.asseseRelationToProperty"
            }),
            asseseAddress: getTextField({
                label: {
                    labelName: "Address",
                    labelKey: "Address"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Address",
                    labelKey: "Enter Address"
                },
                jsonPath: "Saf[0].asseseDetail.asseseAddress"
            }),
            assesePIN: getTextField({
                label: {
                    labelName: "PIN",
                    labelKey: "PIN"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter PIN",
                    labelKey: "Enter PIN"
                },
                jsonPath: "Saf[0].asseseDetail.assesePIN"
            }),
            asseseTelephoneNumber: getTextField({
                label: {
                    labelName: "Telephone Number",
                    labelKey: "Telephone Number"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Telephone Number",
                    labelKey: "Enter Telephone Number"
                },
                jsonPath: "Saf[0].asseseDetail.asseseTelephoneNumber"
            }),
            asseseEmail: getTextField({
                label: {
                    labelName: "Email",
                    labelKey: "Email"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Email",
                    labelKey: "Enter Email"
                },
                jsonPath: "Saf[0].asseseDetail.asseseEmail"
            }),


            assesePhotoIdNumber: getTextField({
                label: {
                    labelName: "Photo Id Number",
                    labelKey: "Photo Id Number"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Photo Id Number",
                    labelKey: "Enter Photo Id Number"
                },
                jsonPath: "Saf[0].asseseDetail.assesePhotoIdNumber"
            }),

            assesePhotoIdType: {
                ...getSelectField({
                    label: {
                        labelName: "Photo Id Type",
                        labelKey: "Photo Id Type"
                    },
                    localePrefix: {
                        moduleName: "TENANT",
                        masterName: "TENANTS"
                    },
                    optionLabel: "name",
                    placeholder: { labelName: "Select Photo Id Type", labelKey: "Select Photo Id Type" },
                    sourceJsonPath: "applyScreenMdmsData.asseseDetail.assesePhotoIdType",
                    jsonPath: "Saf[0].asseseDetail.assesePhotoIdType",
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
