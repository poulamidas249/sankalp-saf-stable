import {
  getDateField,
  getBreak,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabelWithValue,
  getSelectField,
  getTimeField,
  getCommonCard,
  getCommonHeader,
  getCommonParagraph,
  getLabel,
  getPattern,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";

export const submitApplication = async (state, dispatch) => {
  alert("Data Saved !!");
};

export const backApplication = async (state, dispatch) => {
  dispatch(setRoute(`../pt-mutation/rateCardDeceidedDetail`));
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "noticeForm",
  beforeInitScreen: (action, state, dispatch) => {
    dispatch(prepareFinalObject("noticeForm.noticeNo", 123));
    dispatch(prepareFinalObject("noticeForm.assesseeNo", "Assessee No 123"));
    dispatch(prepareFinalObject("noticeForm.wardNo", "Ward No 123"));
    dispatch(prepareFinalObject("noticeForm.existingAV", "Existing AV 123"));
    dispatch(prepareFinalObject("noticeForm.existingQTR", "Existing QTR"));
    dispatch(prepareFinalObject("noticeForm.premiseNo", "Premise No"));
    dispatch(prepareFinalObject("noticeForm.division", "Division"));
    dispatch(
      prepareFinalObject("noticeForm.existingCommAV", "Existing Comm AV")
    );
    dispatch(prepareFinalObject("noticeForm.appFlag", "App Flag"));
    dispatch(prepareFinalObject("noticeForm.grTR", "GR/TR"));
    dispatch(prepareFinalObject("noticeForm.proposedAV", "Proposed AV"));
    dispatch(prepareFinalObject("noticeForm.hearingDate", "hearingDate"));
    dispatch(prepareFinalObject("noticeForm.hearingReason", "hearingReason"));
    dispatch(prepareFinalObject("noticeForm.status", "status"));
    dispatch(prepareFinalObject("noticeForm.noticeSection", "Notice Section"));
    dispatch(
      prepareFinalObject("noticeForm.proposedCommAV", "Proposed CommAV")
    );
    dispatch(prepareFinalObject("noticeForm.hearingTime", "Hearing Time"));
    dispatch(prepareFinalObject("noticeForm.hearingReason", "Hearing Reason"));
    dispatch(prepareFinalObject("noticeForm.proposedQTR", "Proposed QTR"));
    dispatch(prepareFinalObject("noticeForm.hearingOffer", "Hearing Offer"));
    dispatch(prepareFinalObject("noticeForm.appertioned", "Appertioned"));
    dispatch(prepareFinalObject("noticeForm.quarter", "Quarter"));
    dispatch(prepareFinalObject("noticeForm.av", "AV"));
    dispatch(prepareFinalObject("noticeForm.commAV", "Comm AV"));
    dispatch(
      prepareFinalObject("noticeForm.proposedquarter", "Proposed Quarter")
    );
    dispatch(prepareFinalObject("noticeForm.proposedav", "Proposed AV"));
    dispatch(
      prepareFinalObject("noticeForm.proposedcommAV", "Proposed Comm AV")
    );
    dispatch(
      prepareFinalObject("noticeForm.nextHearingDate", "Next Hearing Date")
    );
    dispatch(
      prepareFinalObject("noticeForm.nextHearingTime", "Next Hearing Time")
    );
    dispatch(
      prepareFinalObject("noticeForm.hearingOfficer", "Hearing Officer")
    );
    dispatch(prepareFinalObject("noticeForm.deceidedAV", "AV"));
    dispatch(prepareFinalObject("noticeForm.deceidedcommAV", "Comm AV"));
    dispatch(prepareFinalObject("noticeForm.deceidedqtrlyTax", "Qtrly Tax"));
    dispatch(
      prepareFinalObject("noticeForm.deceidednormalRate", "Normal Rate")
    );
    dispatch(prepareFinalObject("noticeForm.deceidedcommRate", "Comm Rate"));
    dispatch(
      prepareFinalObject("noticeForm.deceidedpayableAmount", "Payable Amount")
    );
    dispatch(
      prepareFinalObject("noticeForm.deceidedquarterAmount", "Quarter Amount")
    );
    dispatch(
      prepareFinalObject(
        "noticeForm.deceidedsurchargeAmount",
        "Surcharge Amount"
      )
    );

    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search",
      },
      children: {
        safFormCDetailHeaderC: getCommonHeader({
          labelName: "Rate Cart Summary",
          labelKey: "Rate Cart Summary",
          gridDefination: {
            xs: 12,
            sm: 12,
          },
        }),

        safFormCDetailC2: getCommonGrayCard({
          safFormCDetailitleSeparately1: getCommonContainer({
            noticeNo: getLabelWithValue(
              {
                labelName: "Notice No",
                labelKey: "Notice No",
                value: "Notice No Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.noticeNo",
              }
            ),

            assesseeNo: getLabelWithValue(
              {
                labelName: "Assessee No",
                labelKey: "Assessee No",
                value: "Assessee No Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.assesseeNo",
              }
            ),

            wardNo: getLabelWithValue(
              {
                labelName: "ward No",
                labelKey: "Ward No",
                value: "Ward No Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.wardNo",
              }
            ),

            existingAV: getLabelWithValue(
              {
                labelName: "Existing AV",
                labelKey: "Existing AV",
                value: "Existing AV Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.existingAV",
              }
            ),

            existingQTR: getLabelWithValue(
              {
                labelName: "Existing QTR",
                labelKey: "Existing QTR",
                value: "Existing QTR Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.existingQTR",
              }
            ),

            premiseNo: getLabelWithValue(
              {
                labelName: "Premise No",
                labelKey: "Premise No",
                value: "Premise No Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.premiseNo",
              }
            ),

            division: getLabelWithValue(
              {
                labelName: "Division",
                labelKey: "Division",
                value: "Division Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.division",
              }
            ),

            existingCommAV: getLabelWithValue(
              {
                labelName: "Existing Comm AV",
                labelKey: "Existing Comm AV",
                value: "Existing Comm AV Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.existingCommAV",
              }
            ),

            appFlag: getLabelWithValue(
              {
                labelName: "App Flag",
                labelKey: "App Flag",
                value: "App Flag Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.appFlag",
              }
            ),

            grTR: getLabelWithValue(
              {
                labelName: "GR/TR",
                labelKey: "GR/TR",

                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                value: "GR/TR Value",
              },
              {
                jsonPath: "noticeForm.grTR",
              }
            ),

            proposedAV: getLabelWithValue(
              {
                labelName: "Proposed AV",
                labelKey: "Proposed AV",
                value: "Proposed AV Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.proposedAV",
              }
            ),

            hearingDate: getLabelWithValue(
              {
                labelName: "Hearing Date",
                labelKey: "Hearing Date",
                value: "Hearing Date Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.hearingDate",
              }
            ),

            hearingReason: getLabelWithValue(
              {
                labelName: "Hearing Reason",
                labelKey: "Hearing Reason",
                value: "Hearing Reason Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.hearingReason",
              }
            ),

            status: getLabelWithValue(
              {
                labelName: "Status",
                labelKey: "Status",
                value: "Status Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.status",
              }
            ),

            noticeSection: getLabelWithValue(
              {
                labelName: "Notice Section",
                labelKey: "Notice Section",
                value: "Notice Section Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.noticeSection",
              }
            ),

            proposedCommAV: getLabelWithValue(
              {
                labelName: "Proposed CommAV",
                labelKey: "Proposed CommAV",
                value: "Proposed CommAV Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.proposedCommAV",
              }
            ),

            hearingTime: getLabelWithValue(
              {
                labelName: "Hearing Time",
                labelKey: "Hearing Time",
                value: "Hearing Time Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.hearingTime",
              }
            ),

            hearingReason: getLabelWithValue(
              {
                labelName: "Hearing Reason",
                labelKey: "Hearing Reason",
                value: "Hearing Reason Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.hearingReason",
              }
            ),

            proposedQTR: getLabelWithValue(
              {
                labelName: "Proposed QTR",
                labelKey: "Proposed QTR",
                value: "Proposed QTR Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.proposedQTR",
              }
            ),

            hearingOffer: getLabelWithValue(
              {
                labelName: "Hearing Offer",
                labelKey: "Hearing Offer",
                value: "Hearing Offer Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.hearingOffer",
              }
            ),

            appertioned: getLabelWithValue(
              {
                labelName: "Appertioned",
                labelKey: "Appertioned",
                value: "Appertioned Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.appertioned",
              }
            ),
          }),
        }),

        existing: getCommonGrayCard({
          safFormCDetailHeaderC: getCommonParagraph({
            labelName: "Existing",
            labelKey: "Existing",
            gridDefination: {
              xs: 12,
              sm: 12,
            },
            props: {
              style: { marginBottom: "10px" },
            },
          }),
          existingContainer: getCommonContainer({
            quarter: getLabelWithValue(
              {
                labelName: "Quarter",
                labelKey: "Quarter",
                value: "Quarter",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.quarter",
              }
            ),

            av: getLabelWithValue(
              {
                labelName: "Av",
                labelKey: "Av",
                value: "Av Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.av",
              }
            ),

            commAV: getLabelWithValue(
              {
                labelName: "Comm AV",
                labelKey: "Comm AV",
                value: "Comm AV Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.commAV",
              }
            ),
          }),
        }),

        proposed: getCommonGrayCard({
          safFormCDetailHeaderC: getCommonParagraph({
            labelName: "Proposed",
            labelKey: "Proposed",
            gridDefination: {
              xs: 12,
              sm: 12,
            },
            props: {
              style: { marginBottom: "10px" },
            },
          }),

          existingContainer: getCommonContainer({
            proposedquarter: getLabelWithValue(
              {
                labelName: "Quarter",
                labelKey: "Quarter",
                value: "Quarter",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.proposedquarter",
              }
            ),

            proposedav: getLabelWithValue(
              {
                labelName: "Av",
                labelKey: "Av",
                value: "Av Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.proposedav",
              }
            ),

            proposedcommAV: getLabelWithValue(
              {
                labelName: "Comm AV",
                labelKey: "Comm AV",
                value: "Comm AV Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.proposedcommAV",
              }
            ),
          }),
        }),

        objectionDetail: getCommonGrayCard({
          objectionDetail: getCommonParagraph({
            labelName: "Absent/Adjurnment",
            labelKey: "Absent/Adjurnment",
            gridDefination: {
              xs: 12,
              sm: 12,
            },
            props: {
              style: { marginBottom: "10px" },
            },
          }),

          objectionDetailContainer: getCommonContainer({
            nextHearingDate: getLabelWithValue(
              {
                labelName: "Next Hearing Date",
                labelKey: "Next Hearing Date",
                value: "Next Hearing Date Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.nextHearingDate",
              }
            ),

            nextHearingTime: getLabelWithValue(
              {
                labelName: "Next Hearing Time",
                labelKey: "Next Hearing Time",
                value: "Next Hearing Time Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.nextHearingTime",
              }
            ),

            hearingOfficer: getLabelWithValue(
              {
                labelName: "Hearing Officer",
                labelKey: "Hearing Officer",
                value: "Hearing Officer Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.hearingOfficer",
              }
            ),
          }),
        }),

        deceidedDetail: getCommonGrayCard({
          deceidedDetail: getCommonParagraph({
            labelName: "Decided/EX-Parte",
            labelKey: "Decided/EX-Parte",
            gridDefination: {
              xs: 12,
              sm: 12,
            },
            props: {
              style: { marginBottom: "10px" },
            },
          }),

          deceidedDetailContainer: getCommonContainer({
            deceidedAV: getLabelWithValue(
              {
                labelName: "AV",
                labelKey: "AV",
                value: "AV",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.deceidedAV",
              }
            ),

            deceidedcommAV: getLabelWithValue(
              {
                labelName: "Comm AV",
                labelKey: "Comm AV",
                value: "Comm AV Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.deceidedcommAV",
              }
            ),

            deceidedqtrlyTax: getLabelWithValue(
              {
                labelName: "Qtrly Tax(Including HBT)",
                labelKey: "Qtrly Tax(Including HBT)",
                value: "Qtrly Tax(Including HBT) Value",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.deceidedqtrlyTax",
              }
            ),

            deceidednormalRate: getLabelWithValue(
              {
                labelName: "Normal Rate",
                labelKey: "Normal Rate",
                value: "Normal Rate",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.deceidednormalRate",
              }
            ),

            deceidedcommRate: getLabelWithValue(
              {
                labelName: "Comm Rate",
                labelKey: "Comm Rate",
                value: "Comm Rate",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.deceidedcommRate",
              }
            ),

            deceidedpayableAmount: getLabelWithValue(
              {
                labelName: "Payable Amount",
                labelKey: "Payable Amount",
                value: "Payable Amount",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.deceidedpayableAmount",
              }
            ),

            deceidedquarterAmount: getLabelWithValue(
              {
                labelName: "Quarter Amount",
                labelKey: "Quarter Amount",
                value: "Quarter Amount",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.deceidedquarterAmount",
              }
            ),

            deceidedsurchargeAmount: getLabelWithValue(
              {
                labelName: "Surcharge Amount",
                labelKey: "Surcharge Amount",
                value: "Surcharge Amount",
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
              },
              {
                jsonPath: "noticeForm.deceidedsurchargeAmount",
              }
            ),
          }),
        }),
      },
    },
  },
};

export default screenConfig;
