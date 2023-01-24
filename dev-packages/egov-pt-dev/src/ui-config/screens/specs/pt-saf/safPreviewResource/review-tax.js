import {
  getCommonContainer, getCommonGrayCard,
  getCommonSubHeader,
  getLabelWithValueSingleLine,
  getBreak,
  getDivider,

  getLabel, getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { checkValueForNA,checkValueForNATax, convertEpochToDate } from "../../utils";

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
export const grossTaxDetails = {

  grossQtrTax: getLabelWithValueSingleLine(
    {
      labelName: "Gross Quarterly Tax payable under UAA System (Rs.)",
      labelKey: "Gross Quarterly Tax payable under UAA System (Rs.)"
    },
    { jsonPath: "Saf[0].asseseDetail.grossQtrTax", callBack: checkValueForNATax }),

  prevQtrTaxPayble: getLabelWithValueSingleLine(
    {
      labelName: "Gross Quarterly Tax payable under ARV System (Rs.)",
      labelKey: "Gross Quarterly Tax payable under ARV System (Rs.)"
    },
    { jsonPath: "Saf[0].asseseDetail.prevQtrTaxPayble", callBack: checkValueForNATax }),
  taxChangeAmount: getLabelWithValueSingleLine(
    {
      labelName: "Change in amount in gross quarterly tax for already assessed portion",
      labelKey: "Change in amount in gross quarterly tax for already assessed portion"
    },
    { jsonPath: "Saf[0].asseseDetail.taxChangeAmount", callBack: checkValueForNATax }),
  taxChangePercent: getLabelWithValueSingleLine(
    {
      labelName: "The % change in gross quarterly tax (for already assessed portion)",
      labelKey: "The % change in gross quarterly tax (for already assessed portion)"
    },
    { jsonPath: "Saf[0].asseseDetail.taxChangePercent", callBack: checkValueForNATax }),
  grossCappedTax: getLabelWithValueSingleLine(
    {
      labelName: "Gross Quarterly Property Tax payable (after capping)* in Rs.",
      labelKey: "Gross Quarterly Property Tax payable (after capping)* in Rs."
    },
    { jsonPath: "Saf[0].asseseDetail.grossCappedTax", callBack: checkValueForNATax }),
}
export const taxDetails = {

  grossCappedTax: getLabelWithValueSingleLine(
    {
      labelName: "Gross Quarterly Tax payable* (after capping if applicable) in Rs",
      labelKey: "Gross Quarterly Tax payable* (after capping if applicable) in Rs"
    },
    { jsonPath: "Saf[0].asseseDetail.grossCappedTax", callBack: checkValueForNATax }),

    netQtrTax: getLabelWithValueSingleLine(
    {
      labelName: "Net Quarterly tax payable after rebate* (based on Table in Annexure 6) in Rs.",
      labelKey: "Net Quarterly tax payable after rebate* (based on Table in Annexure 6) in Rs."
    },
    { jsonPath: "Saf[0].asseseDetail.netQtrTax", callBack: checkValueForNATax }),
    currentFinPaid: getLabelWithValueSingleLine(
    {
      labelName: "Whether any tax for the current financial year is paid or not.",
      labelKey: "Whether any tax for the current financial year is paid or not."
    },
    { jsonPath: "Saf[0].asseseDetail.currentFinPaid", callBack: checkValueForNATax }),
    currentFinPaidAmt: getLabelWithValueSingleLine(
    {
      labelName: "Amount of Tax paid in the current financial year in Rs.",
      labelKey: "Amount of Tax paid in the current financial year in Rs."
    },
    { jsonPath: "Saf[0].asseseDetail.currentFinPaidAmt", callBack: checkValueForNATax }),
    currentFinPaidQtr: getLabelWithValueSingleLine(
    {
      labelName: "Current financial year Tax paid in quarter.",
      labelKey: "Current financial year Tax paid in quarter."
    },
    { jsonPath: "Saf[0].asseseDetail.currentFinPaidQtr", callBack: checkValueForNATax }),
    totalTaxPayable: getLabelWithValueSingleLine(
    {
      labelName: "Total Tax payable (adjusting payment already made for current year) for the current financial year under UAA System Rs.",
      labelKey: "Total Tax payable (adjusting payment already made for current year) for the current financial year under UAA System Rs."
    },
    { jsonPath: "Saf[0].asseseDetail.totalTaxPayable", callBack: checkValueForNATax }),
}

export const getReviewTax = (isEditable = true) => {
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
            labelName: "Tax Summary",
            labelKey: "Tax Summary"
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
        labelName: "Gross Tax",
        labelKey: "Gross Tax"
      }),
      breakOne: getBreak(),
      grossTaxDetailsContainer: getCommonContainer(grossTaxDetails),
      div2: getDivider(),
      breakTwo: getBreak(),
      headTwo: getCommonSubHeader({
        labelName: "Tax Details",
        labelKey: "Tax Details"
      }),
      breakThree: getBreak(),
      taxDetailsContainer: getCommonContainer(taxDetails)
    }),
  });
};
