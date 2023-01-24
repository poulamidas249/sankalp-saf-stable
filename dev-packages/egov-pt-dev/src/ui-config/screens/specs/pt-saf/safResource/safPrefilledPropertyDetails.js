import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";

export const safPrefilledPropertyDetails = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Assessee Property Details",
                labelKey: "Assessee Property Details"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),
        asseseDetailsConatiner: getCommonContainer({

            asseseWardNumber: getTextField({
                label: {
                    labelName: "Ward Number",
                    labelKey: "Ward Number"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Ward Number",
                    labelKey: "Enter Ward Number"
                },
                jsonPath: "Saf[0].asseseDetail.wardNo"
            }),
            asseseBlock: getTextField({
                label: {
                    labelName: "Block",
                    labelKey: "Block"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Block",
                    labelKey: "Enter Block"
                },
                jsonPath: "Saf[0].asseseDetail.asseseBlock"
            }),
            asseseCategory: getTextField({
                label: {
                    labelName: "Category",
                    labelKey: "Category"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Category",
                    labelKey: "Enter Category"
                },
                jsonPath: "Saf[0].asseseDetail.asseseCategory"
            }),
            assesePropertySituatedIn: getTextField({
                label: {
                    labelName: "Property situated in",
                    labelKey: "Property situated in"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Property Situated In",
                    labelKey: "Enter Property Situated In"
                },
                jsonPath: "Saf[0].asseseDetail.assesePropertySituatedIn"
            }),
            asseseKMCStreetCode: getTextField({
                label: {
                    labelName: "KMC Street Code",
                    labelKey: "KMC Street Code"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter KMC Street Code",
                    labelKey: "Enter KMC Street Code"
                },
                jsonPath: "Saf[0].asseseDetail.asseseKMCStreetCode"
            }),
            asseseKMCPremisesNumber: getTextField({
                label: {
                    labelName: "KMC Premises Number",
                    labelKey: "KMC Premises Number"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter KMC Premises Number",
                    labelKey: "Enter KMC Premises Number"
                },
                jsonPath: "Saf[0].asseseDetail.asseseKMCPremisesNumber"
            }),
            asseseKMCStreetName: getTextField({
                label: {
                    labelName: "KMC Street Name",
                    labelKey: "KMC Street Name"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter KMC Street Name",
                    labelKey: "Enter KMC Street Name"
                },
                jsonPath: "Saf[0].asseseDetail.asseseKMCStreetName"
            }),
            asseseLastReturnSubmitted: getTextField({
                label: {
                    labelName: "Last Return Submitted",
                    labelKey: "Last Return Submitted"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Last Return Submitted",
                    labelKey: "Enter Last Return Submitted"
                },
                jsonPath: "Saf[0].asseseDetail.asseseLastReturnSubmitted"
            }),
            asseseQuarter: getTextField({
                label: {
                    labelName: "Quarter",
                    labelKey: "Quarter"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Quarter",
                    labelKey: "Enter Quarter"
                },
                jsonPath: "Saf[0].asseseDetail.asseseQuarter"
            }),
            asseseAnnualValueOfPropertyFixed: getTextField({
                label: {
                    labelName: "Annual Value Of Property",
                    labelKey: "Annual Value Of Property"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Annual Value Of Property",
                    labelKey: "Enter Annual Value Of Property"
                },
                jsonPath: "Saf[0].asseseDetail.asseseAnnualValueOfPropertyFixed"
            }),
            asseseLastCompletedGRIREffectiveFrom: getTextField({
                label: {
                    labelName: "Last completed GR/IR effective From",
                    labelKey: "Last completed GR/IR effective From"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Block",
                    labelKey: "Enter Block"
                },
                jsonPath: "Saf[0].asseseDetail.asseseLastCompletedGRIREffectiveFrom"
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
