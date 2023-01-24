import {
  getDateField,
  getBreak,
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
import { changeStep } from "./applyResource/hearingNoticeFooter";

const hearingNoticeViewSummary = getCommonGrayCard({
  rateCardEntryContainer: getCommonContainer({
    safFormCDetailHeaderC: getCommonSubHeader({
      labelName: "Hearing Notice Summary",
      labelKey: "Hearing Notice Summary",
      gridDefination: {
        xs: 12,
        sm: 10,
      },
    }),
    editSection: {
      componentPath: "Button",
      props: {
        color: "primary",
        style: { marginTop: "-10px" },
      },
      gridDefination: {
        xs: 12,
        sm: 2,
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

  hearingNoticeViewSummaryContainer: getCommonContainer({
    noticeNo: getLabelWithValue(
      {
        labelName: "Notice No",
        labelKey: "Notice No",
        value: "Notice No Value",
        gridDefination: {
          xs: 12,
          sm: 3,
          props: {
            style: { marginBottom: "25px" },
          },
        },
      },
      {
        jsonPath: "firstStepHearingNoticeView.noticeNo",
        props: {
          style: { marginBottom: "25px" },
        },
      }
    ),

    street: getLabelWithValue(
      {
        labelName: "Street",
        labelKey: "street",
        value: "street",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "firstStepHearingNoticeView.street",
      }
    ),

    ownerName: getLabelWithValue(
      {
        labelName: "Owner Name",
        labelKey: "Owner Name",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "firstStepHearingNoticeView.ownerName",
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
        jsonPath: "firstStepHearingNoticeView.assesseeNo",
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
        jsonPath: "firstStepHearingNoticeView.wardNo",
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
        jsonPath: "firstStepHearingNoticeView.existingAV",
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
        jsonPath: "firstStepHearingNoticeView.existingQTR",
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
        jsonPath: "firstStepHearingNoticeView.premiseNo",
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
        jsonPath: "firstStepHearingNoticeView.division",
      }
    ),

    existingCommAV: getLabelWithValue(
      {
        labelName: "Existing Comm AV",
        labelKey: "Existing Comm AV",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "firstStepHearingNoticeView.existingCommAV",
      }
    ),

    appFlag: getLabelWithValue(
      {
        labelName: "App Flag",
        labelKey: "App Flag",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "firstStepHearingNoticeView.appFlag",
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
        jsonPath: "firstStepHearingNoticeView.grIR",
      }
    ),

    proposedAV: getLabelWithValue(
      {
        labelName: "Proposed AV",
        labelKey: "Proposed AV",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      { jsonPath: "firstStepHearingNoticeView.proposedAv" }
    ),

    hearingDate: getLabelWithValue(
      {
        labelName: "Hearing Date",
        labelKey: "Hearing Date",
        pattern: getPattern("Date"),
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "firstStepHearingNoticeView.hearingDate",
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
        jsonPath: "firstStepHearingNoticeView.hearingReason",
      }
    ),

    noticeSection: getLabelWithValue(
      {
        labelName: "Notice Section",
        labelKey: "Notice Section",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "firstStepHearingNoticeView.noticeSection",
      }
    ),

    proposedCommAV: getLabelWithValue(
      {
        labelName: "Proposed CommAV",
        labelKey: "Proposed CommAV",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      { jsonPath: "firstStepHearingNoticeView.proposedCommAV" }
    ),

    hearingTime: getLabelWithValue(
      {
        labelName: "Hearing Time",
        labelKey: "Hearing Time",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "firstStepHearingNoticeView.hearingTime",
      }
    ),

    hearingOfficer: getLabelWithValue(
      {
        labelName: "Hearing Officer",
        labelKey: "Hearing Officer",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "firstStepHearingNoticeView.hearingOfficer",
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
        jsonPath: "firstStepHearingNoticeView.hearingReason",
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
        jsonPath: "firstStepHearingNoticeView.proposedQTR",
      }
    ),
  }),
});
export default hearingNoticeViewSummary;
