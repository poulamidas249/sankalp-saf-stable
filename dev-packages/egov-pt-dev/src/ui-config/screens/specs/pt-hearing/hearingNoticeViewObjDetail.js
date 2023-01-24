import {
  getDateField,
  getSelectField,
  getTimeField,
  getCommonCard,
  getCommonTitle,
  getCommonContainer,
  getCommonHeader,
  getCommonSubHeader,
  getCommonParagraph,
  getLabel,
  getPattern,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";

const hearingNoticeViewObjDetail = getCommonCard({
  safFormCDetailitleSeparately1: getCommonContainer({
    objectionBy: getTextField({
      label: {
        labelKey: "Objection By",
      },
      placeholder: {
        labelKey: "Objection By",
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNoticeView.objectionBy",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      props: {
        disabled: true,
      },
    }),

    objDate: getTextField({
      label: {
        labelName: "Objection Date",
        labelKey: "Objection Date",
      },
      placeholder: {
        labelName: "Objection Date",
        labelKey: "Objection Date",
      },
      required: false,
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      props: {
        disabled: true,
      },
      pattern: getPattern("Date"),
      jsonPath: "firstStepHearingNoticeView.objDate",
    }),

    objectionMedium: getTextField({
      label: {
        labelKey: "Objection Medium",
      },
      placeholder: {
        labelKey: "Objection Medium",
      },
      required: false,
      visible: true,
      props: {
        disabled: true,
      },
      jsonPath: "firstStepHearingNoticeView.objectionMedium",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
    }),

    objectionReason: getTextField({
      label: {
        labelKey: "Objection Reason",
      },
      placeholder: {
        labelKey: "Objection reason",
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNoticeView.objectionReason",
      props: {
        disabled: true,
      },
      gridDefination: {
        xs: 12,
        sm: 6,
      },
    }),
  }),
});

export default hearingNoticeViewObjDetail;
