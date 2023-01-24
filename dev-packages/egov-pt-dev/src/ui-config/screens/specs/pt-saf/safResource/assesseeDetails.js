import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";

export const assesseeDetails = getCommonCard(
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

            assesseeNo: getTextField({
                label: {
                    labelName: "Assessee Number",
                    labelKey: "Assessee Number"
                },
                props: {
                    className: "applicant-details-error"
                },
                disabled :true,
                placeholder: {
                    labelName: "Enter Assessee Number",
                    labelKey: "Enter Assessee Number"
                },
                required: true, errorMessage: "Required",
                jsonPath: "Saf[0].asseseDetail.assesseeNo"
            }),
            applicantName: getTextField({
                label: {
                    labelName: "Full Name",
                    labelKey: "Full Name"
                },
                props: {
                    className: "applicant-details-error" ,
                    disabled :true
                },
                required: true, errorMessage: "Required",
                placeholder: {
                    labelName: "Enter Full Name",
                    labelKey: "Enter Full Name"
                },
                jsonPath: "Saf[0].asseseDetail.applicantName"
            }),
            applicantAddress: getTextField({
                label: {
                    labelName: "Address",
                    labelKey: "Address"
                },
                props: {
                    className: "applicant-details-error"
                },
                disabled :true,
                required: true, errorMessage: "Required",
                placeholder: {
                    labelName: "Enter Address",
                    labelKey: "Enter Address"
                },
                jsonPath: "Saf[0].asseseDetail.applicantAddress"
            }),
            applicantPinCode: getTextField({
                label: {
                    labelName: "PIN",
                    labelKey: "PIN"
                },
                disabled :true,
                required: true, errorMessage: "Required",
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter PIN",
                    labelKey: "Enter PIN"
                },
                jsonPath: "Saf[0].asseseDetail.applicantPinCode"
            }),
            applicantRelation: {
                ...getSelectField({
                    label: {
                        labelName: "Relation to Property",
                        labelKey: "Relation to Property"
                    },
                    optionLabel: "name",
                    placeholder: { labelName: "Select", labelKey: "Select" },
                    data: [{ name: "Present Owner", code: "O", value: "O" }, { name: "Others", code: "O", value: "O" }],
                    optionValue: "code",
                    optionLabel: "name",
                    jsonPath: "Saf[0].asseseDetail.applicantRelation",
                    required: true, errorMessage: "Required",
                    props: {
                        required: true, errorMessage: "Required",
                    }
                }),
                beforeFieldChange: async (action, state, dispatch) => {

                }
            },
            applicantOtherRelation: getTextField({
                label: {
                    labelName: "Other Relation",
                    labelKey: "Other Relation"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Other Relation",
                    labelKey: "Enter Other Relation"
                },
                jsonPath: "Saf[0].asseseDetail.applicantOtherRelation"
            }),
            
            mobileNo: getTextField({
                label: {
                    labelName: "Mobile Number",
                    labelKey: "Mobile Number"
                },
                props: {
                    className: "applicant-details-error"
                },
                required: true, errorMessage: "Required",
                placeholder: {
                    labelName: "Enter Mobile Number",
                    labelKey: "Enter Mobile Number"
                },
                jsonPath: "Saf[0].asseseDetail.mobileNo"
            }),
            alternateMobileNo: getTextField({
                label: {
                    labelName: "Alternate Mobile Number",
                    labelKey: "Alternate Mobile Number"
                },
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Alternate Mobile Number",
                    labelKey: "Enter Alternate Mobile Number"
                },
                jsonPath: "Saf[0].asseseDetail.alternateMobileNo"
            }),
            applicantEMail: getTextField({
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
                jsonPath: "Saf[0].asseseDetail.applicantEMail"
            }),


            photoIdType: {
                ...getSelectField({
                    label: {
                        labelName: "Photo Id Type",
                        labelKey: "Photo Id Type"
                    },
                    optionLabel: "name",
                    placeholder: { labelName: "Select Photo Id Type", labelKey: "Select Photo Id Type" },
                    data: [{ name: "Voter Id Card", code: "32", value: "32" },
                    { name: "PAN Card", code: "31", value: "31" },
                    { name: "Adhar Card", code: "30", value: "30" },
                    { name: "Passport", code: "29", value: "29" },
                    { name: "Driving Licence", code: "28", value: "28" },
                    ],
                    optionValue: "code",
                    optionLabel: "name",
                    jsonPath: "Saf[0].asseseDetail.photoIdType",
                    required: true, errorMessage: "Required",
                    props: {
                        required: true, errorMessage: "Required",
                    }
                }),
                beforeFieldChange: async (action, state, dispatch) => {

                }
            },


            photoId: getTextField({
                label: {
                    labelName: "Photo Id Number",
                    labelKey: "Photo Id Number"
                },
                required: true, errorMessage: "Required",
                props: {
                    className: "applicant-details-error"
                },
                placeholder: {
                    labelName: "Enter Photo Id Number",
                    labelKey: "Enter Photo Id Number"
                },
                jsonPath: "Saf[0].asseseDetail.photoId"
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
