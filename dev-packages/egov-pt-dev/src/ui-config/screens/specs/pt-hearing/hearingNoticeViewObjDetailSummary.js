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

const hearingNoticeViewObjDetailSummary = getCommonGrayCard({
  hearingNoticeContainer: getCommonContainer({
    safFormCDetailHeaderC: getCommonSubHeader({
      labelName: "Objection Details",
      labelKey: "Objection Details",
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
          changeStep(state, dispatch, "", 1);
        },
      },
    },
  }),

  hearingNoticeSummaryContainer: getCommonContainer({
    objectionBy: getLabelWithValue(
      {
        labelName: "Objection By",
        labelKey: "Objection By",
        value: "Objection By",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: { marginBottom: "25px" },
        },
      },
      {
        jsonPath: "firstStepHearingNoticeView.objectionBy",
        props: {
          style: { marginBottom: "15px" },
        },
      }
    ),

    objDate: getLabelWithValue({
      label: {
        labelName: "Objection Date",
        labelKey: "Objection Date",
      },

      gridDefination: {
        xs: 12,
        sm: 3,
      },
      required: false,
      pattern: getPattern("Date"),
      jsonPath: "firstStepHearingNoticeView.objDate",
    }),

    objDate: getLabelWithValue(
      {
        labelName: "Objection Medium",
        labelKey: "Objection Medium",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "firstStepHearingNoticeView.objDate",
      }
    ),

    objectionMedium: getLabelWithValue(
      {
        labelName: "Objection Medium",
        labelKey: "Objection Medium",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "firstStepHearingNoticeView.objectionMedium",
      }
    ),

    objectionReason: getLabelWithValue(
      {
        labelName: "Objection Reason",
        labelKey: "Objection Reason",
        value: "Objection Reason",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "firstStepHearingNoticeView.objectionReason",
      }
    ),
  }),
});
export default hearingNoticeViewObjDetailSummary;
