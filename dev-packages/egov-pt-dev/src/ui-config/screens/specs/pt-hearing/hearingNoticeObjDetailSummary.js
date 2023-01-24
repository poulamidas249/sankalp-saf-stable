import {
  getCommonSubHeader,
  getCommonContainer,
  getCommonGrayCard,
  getLabelWithValue,
  getLabel, 
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "./applyResource/hearingNoticeFooter";

const hearingNoticeObjDetailSummary = getCommonGrayCard({
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
    cancelBy: getLabelWithValue(
      {
        labelName: "cancel By",
        labelKey: "cancel By",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: { marginBottom: "25px" },
        },
      },
      {
        jsonPath: "firstStepHearingNotice.cancelBy",
      }
    ),

    cancelDate: getLabelWithValue(
      {
        labelName: "Cancel Date",
        labelKey: "Cancel Date",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: { marginBottom: "25px" },
        },
      },
      {
        jsonPath: "firstStepHearingNotice.cancelDate",
      }
    ),

    // cancelDate: getLabelWithValue({
    //   label: {
    //     labelName: "Cancel Date",
    //     labelKey: "Cancel Date"
    //   },

    //   gridDefination: {
    //     xs: 12,
    //     sm: 4
    //   },
    //   required: false,
    //   pattern: getPattern("Date"),
    //   jsonPath: "firstStepHearingNotice.cancelDate",

    // }),

    cancelReason: getLabelWithValue(
      {
        labelName: "Cancel Reason",
        labelKey: "Cancel Reason",
        gridDefination: {
          xs: 12,
          sm: 4,
        },
      },
      {
        jsonPath: "firstStepHearingNotice.cancelReason",
      }
    ),
  }),
});
export default hearingNoticeObjDetailSummary;
