import {
  getDateField,
  getCommonSubHeader,
  getCommonContainer,
  getCommonGrayCard,
  getCommonTitle,
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

import { changeStep } from "./applyResource/rateCardFooter";

export const submitApplication = async (state, dispatch) => {

};

const rateCardSummary = getCommonGrayCard({
  rateCardEntryContainer: getCommonContainer({
    safFormCDetailHeaderC: getCommonSubHeader({
      labelName: "Rate Card Entry",
      labelKey: "Rate Card Entry",
      gridDefination: {
        xs: 12,
        sm: 10,
      },
      props: {
        style: { marginBottom: "500px", minWidth: "850px" },
      },
    }),
    editSection: {
      componentPath: "Button",
      props: {
        color: "primary",
      },
      gridDefination: {
        xs: 12,
        sm: 2,
        align: "right",
      },
      visible: true,
      children: {
        editIcon: {
          uiFramework: "custom-atoms",
          componentPath: "Icon",
          props: {
            iconName: "edit",
          },
        },
        buttonLabel: getLabel({
          labelName: "Edit",
          labelKey: "Edit",
        }),
      },
      onClickDefination: {
        action: "condition",
        callBack: (state, dispatch) => {
          changeStep(state, dispatch, "", 0);
        },
      },
    },
  }),

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
        jsonPath: "rateCard.noticeNo",
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
        jsonPath: "rateCard.assesseeNo",
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
        jsonPath: "rateCard.wardNo",
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
        jsonPath: "rateCard.existingAV",
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
        jsonPath: "rateCard.existingQTR",
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
        jsonPath: "rateCard.premiseNo",
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
        jsonPath: "rateCard.division",
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
        jsonPath: "rateCardExisting.existingCommAV",
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
        jsonPath: "rateCard.appFlag",
      }
    ),

    grIR: getLabelWithValue(
      {
        labelName: "GR/IR",
        labelKey: "GR/IR",

        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        value: "GR/IR Value",
      },
      {
        jsonPath: "rateCard.grIR",
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
        jsonPath: "rateCard.proposedAV",
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
        jsonPath: "rateCard.hearingDate",
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
        jsonPath: "rateCard.hearingReason",
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
        jsonPath: "rateCard.status",
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
        jsonPath: "rateCard.noticeSection",
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
        jsonPath: "rateCard.proposedCommAV",
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
        jsonPath: "rateCard.hearingTime",
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
        jsonPath: "rateCard.hearingReason",
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
        jsonPath: "rateCard.proposedQTR",
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
        jsonPath: "rateCard.hearingOffer",
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
        jsonPath: "rateCard.appertioned",
      }
    ),
  }),
});

export default rateCardSummary;
