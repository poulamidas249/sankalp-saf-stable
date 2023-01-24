import {
  getCommonContainer, getCommonGrayCard,
  getCommonSubHeader,


  getLabel, getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { checkValueForNA, convertEpochToDate } from "../../utils";

export const reviewOwnerDOB = getLabelWithValue(
  {
    labelName: "Date of Birth",
    labelKey: "TL_EMP_APPLICATION_DOB"
  },
  {
    jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].dob",
    callBack: convertEpochToDate
  }
);

export const assesseeIdentificationDetails = {
  assesseeNo: getLabelWithValue(
    {
      labelName: "Assessee Number",
      labelKey: "Assessee Number"
    },
    { jsonPath: "Saf[0].asseseDetail.assesseeNo", callBack: checkValueForNA }),
    applicantName: getLabelWithValue(
    {
      labelName: "Full Name",
      labelKey: "Full Name"
    },
    { jsonPath: "Saf[0].asseseDetail.applicantName", callBack: checkValueForNA }),
    applicantAddress: getLabelWithValue(
    {
      labelName: "Address",
      labelKey: "Address"
    },
    { jsonPath: "Saf[0].asseseDetail.applicantAddress", callBack: checkValueForNA }),
    applicantPinCode: getLabelWithValue(
    {
      labelName: "PIN",
      labelKey: "PIN"
    },
    { jsonPath: "Saf[0].asseseDetail.applicantPinCode", callBack: checkValueForNA }),
    applicantRelation: getLabelWithValue(
    {
      labelName: "Relation to Property",
      labelKey: "Relation to Property"
    },
    { jsonPath: "Saf[0].asseseDetail.applicantRelation", callBack: checkValueForNA }),
    applicantOtherRelation: getLabelWithValue(
    {
      labelName: "Other Relation",
      labelKey: "Other Relation"
    },
    { jsonPath: "Saf[0].asseseDetail.applicantOtherRelation", callBack: checkValueForNA }),
    mobileNo: getLabelWithValue(
    {
      labelName: "Mobile Number",
      labelKey: "Mobile Number"
    },
    { jsonPath: "Saf[0].asseseDetail.mobileNo", callBack: checkValueForNA }),
    alternateMobileNo: getLabelWithValue(
    {
      labelName: "Alternate Mobile Number",
      labelKey: "Alternate Mobile Number"
    },
    { jsonPath: "Saf[0].asseseDetail.alternateMobileNo", callBack: checkValueForNA }),
    applicantEMail: getLabelWithValue(
    {
      labelName: "Email",
      labelKey: "Email"
    },
    { jsonPath: "Saf[0].asseseDetail.applicantEMail", callBack: checkValueForNA }),
    photoIdType: getLabelWithValue(
    {
      labelName: "Photo Id Type",
      labelKey: "Photo Id Type"
    },
    { jsonPath: "Saf[0].asseseDetail.photoIdType", callBack: checkValueForNA }),
    photoId: getLabelWithValue(
    {
      labelName: "Photo Id Number",
      labelKey: "Photo Id Number"
    },
    { jsonPath: "Saf[0].asseseDetail.photoId", callBack: checkValueForNA }),
}

export const getReviewAssessee = (isEditable = true) => {
  return getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 10
          },
          ...getCommonSubHeader({
            labelName: "Assessee Details",
            labelKey: "Assessee Details"
          })
        },
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isEditable,
          gridDefination: {
            xs: 12,
            sm: 2,
            align: "right"
          },
          children: {
            editIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "edit"
              }
            },
            buttonLabel: getLabel({
              labelName: "Edit",
              labelKey: "TL_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {

            }
          }
        }
      }
    },
    ownerDetails :  getCommonGrayCard({
      ownerDetailContainer: getCommonContainer(assesseeIdentificationDetails)
    }),
  });
};
