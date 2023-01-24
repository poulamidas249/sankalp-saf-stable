import {
  getCommonContainer, getCommonGrayCard,
  getCommonSubHeader,
  getCommonHeader,
  getBreak,
  getDivider,
  getLabel, getLabelWithValue, getLabelWithValueSingleLine
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
export const formatATaxLandDetails = {
  totalArea: getLabelWithValue(
    {
      labelName: "Total Area",
      labelKey: "Total Area"
    },
    { jsonPath: "Saf[0].asseseDetail.totalArea", callBack: checkValueForNA }),
  waterbodyArea: getLabelWithValue(
    {
      labelName: "Water Body Area",
      labelKey: "Water Body Area"
    },
    { jsonPath: "Saf[0].asseseDetail.waterbodyArea", callBack: checkValueForNA }),
  groundArea: getLabelWithValue(
    {
      labelName: "Ground Area",
      labelKey: "Ground Area"
    },
    { jsonPath: "Saf[0].asseseDetail.groundArea", callBack: checkValueForNA })
}
export const formatATaxLandDetailsC = {
  totalRoofArea: getLabelWithValue(
    {
      labelName: "Total Roof Area",
      labelKey: "Total Roof Area"
    },
    { jsonPath: "Saf[0].asseseDetail.totalRoofArea", callBack: checkValueForNA }),
    constructedRoofArea: getLabelWithValue(
    {
      labelName: "Constructed Roof Area",
      labelKey: "Constructed Roof Area"
    },
    { jsonPath: "Saf[0].asseseDetail.constructedRoofArea", callBack: checkValueForNA }),
    unConstructedRoofArea: getLabelWithValue(
    {
      labelName: "Unconstructed Roof Area",
      labelKey: "Unconstructed Roof Area"
    },
    { jsonPath: "Saf[0].asseseDetail.unConstructedRoofArea", callBack: checkValueForNA })
}
export const valuationDetails = {
  grossQtrTax: getLabelWithValue(
    {
      labelName: "Total Annual Value",
      labelKey: "Total Annual Value"
    },
    { jsonPath: "Saf[0].asseseDetail.grossQtrTax", callBack: checkValueForNA }),
    taxRate: getLabelWithValue(
    {
      labelName: "Rate of Property Tax",
      labelKey: "Rate of Property Tax"
    },
    { jsonPath: "Saf[0].asseseDetail.taxRate", callBack: checkValueForNA }),
    hbtRate: getLabelWithValue(
    {
      labelName: "Rate of Howrah Bridge Tax %",
      labelKey: "Rate of Howrah Bridge Tax %"
    },
    { jsonPath: "Saf[0].asseseDetail.hbtRate", callBack: checkValueForNA }),
    totalTaxPayable: getLabelWithValue(
    {
      labelName: "Gross Amt. of Property Tax",
      labelKey: "Gross Amt. of Property Tax"
    },
    { jsonPath: "Saf[0].asseseDetail.totalTaxPayable", callBack: checkValueForNA }),
}
export const grossTaxDetails = {

  assesseeNo: getLabelWithValueSingleLine(
    {
      labelName: "Gross Quarterly Tax payable under UAA System (Rs.)",
      labelKey: "Gross Quarterly Tax payable under UAA System (Rs.)"
    },
    { jsonPath: "Saf[0].asseseDetail.assesseeNo", callBack: checkValueForNA }),

  applicantName: getLabelWithValueSingleLine(
    {
      labelName: "Gross Quarterly Tax payable under ARV System (Rs.)",
      labelKey: "Gross Quarterly Tax payable under ARV System (Rs.)"
    },
    { jsonPath: "Saf[0].asseseDetail.applicantName", callBack: checkValueForNA }),
  applicantAddress: getLabelWithValueSingleLine(
    {
      labelName: "Change in amount in gross quarterly tax for already assessed portion",
      labelKey: "Change in amount in gross quarterly tax for already assessed portion"
    },
    { jsonPath: "Saf[0].asseseDetail.applicantAddress", callBack: checkValueForNA }),
  applicantPinCode: getLabelWithValueSingleLine(
    {
      labelName: "The % change in gross quarterly tax (for already assessed portion)",
      labelKey: "The % change in gross quarterly tax (for already assessed portion)"
    },
    { jsonPath: "Saf[0].asseseDetail.applicantPinCode", callBack: checkValueForNA }),
  applicantRelation: getLabelWithValueSingleLine(
    {
      labelName: "Gross Quarterly Property Tax payable (after capping)* in Rs.",
      labelKey: "Gross Quarterly Property Tax payable (after capping)* in Rs."
    },
    { jsonPath: "Saf[0].asseseDetail.applicantRelation", callBack: checkValueForNA }),
}

export const getReviewFormat = (isEditable = true) => {
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
            labelName: "Format Details",
            labelKey: "Format Details"
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
    ownerDetails: getCommonGrayCard({
      headOne: getCommonSubHeader({
        labelName: "Tax Details",
        labelKey: "Tax Details"
      }),
      breakOne: getBreak(),
      formatATaxLandDetails: getCommonContainer(formatATaxLandDetails),
      headOneC: getCommonSubHeader({
        labelName: "Details of Separately transferred roof",
        labelKey: "Details of Separately transferred roof"
      }),
      breakOneC: getBreak(),
      formatATaxLandDetailsC: getCommonContainer(formatATaxLandDetailsC),
      div2: getDivider(),
      headTwo: getCommonSubHeader({
        labelName: "Tax Calculation for Vacant Land",
        labelKey: "Tax Calculation for Vacant Land"
      }),
      FormatATableOnePreview: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-pt",
        componentPath: "FormatATableOnePreview",
        props: {
          tableData: [

          ]
        },

        visible: false
      },
      FormatBTableOnePreview: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-pt",
        componentPath: "FormatBTableOnePreview",
        props: {
          tableData: [

          ]
        },
        visible: false
      },
      FormatCTableOnePreview: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-pt",
        componentPath: "FormatCTableOnePreview",
        props: {
          tableData: [

          ]
        },
        visible: false
      },
      breakTwo: getBreak(),
      div3: getDivider(),
      headThree: getCommonSubHeader({
        labelName: "Tax Calculation for Constructed Portion",
        labelKey: "Tax Calculation for Constructed Portion"
      }),
      FormatATableTwoPreview: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-pt",
        componentPath: "FormatATableTwoPreview",
        props: {
          tableData: []
        },
        visible: false
      },
      FormatCTableTwoPreview: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-pt",
        componentPath: "FormatCTableTwoPreview",
        props: {
          tableData: []
        },
        visible: false
      },
      breakThree: getBreak(),
      div4: getDivider(),
      headFour: getCommonSubHeader({
        labelName: "Valuation Details",
        labelKey: "Valuation Details"
      }),
      breakFour: getBreak(),
      valuationDetails: getCommonContainer(valuationDetails),
    }),
  });
};