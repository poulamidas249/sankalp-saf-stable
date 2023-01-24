import {
  getCommonCard,
  getCommonContainer,
  getPattern,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";

const hearingNoticeObjDetail = getCommonCard({
  safFormCDetailitleSeparately1: getCommonContainer({
    cancelBy: getTextField({
      label: {
        labelKey: "Cancel By",
      },
      placeholder: {
        labelKey: "Cancel By",
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.cancelBy",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      props: {
        disabled: true,
      },
    }),

    cancelDate: getTextField({
      label: {
        labelName: "Cancel Date",
        labelKey: "Cancel Date",
      },
      placeholder: {
        labelName: "Cancel Date",
        labelKey: "Cancel Date",
      },
      required: false,
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      props: {
        disabled: true,
      },
      pattern: getPattern("Date"),
      jsonPath: "firstStepHearingNotice.cancelDate",
    }),

    cancelReason: getTextField({
      label: {
        labelKey: "Cancel Reason",
      },
      placeholder: {
        labelKey: "Cancel Reason",
      },
      required: false,
      visible: true,
      props: {
        disabled: true,
      },
      jsonPath: "firstStepHearingNotice.cancelReason",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),
  }),
});

export default hearingNoticeObjDetail;
