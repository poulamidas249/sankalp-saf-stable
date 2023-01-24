import {
  getCommonSubHeader,
  getCommonContainer,
  getCommonGrayCard,
  getLabelWithValue,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "./applyResource/fsBillFooter";

const fsBillObhDetailSummary = getCommonGrayCard({
  fsBillEntryContainer: getCommonContainer({
    objectionDetail: getCommonSubHeader({
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

    // editSection: {
    //   componentPath: "Button",
    //   props: {
    //     color: "primary",
    //   },
    //   gridDefination: {
    //     xs: 12,
    //     sm: 2,
    //     align: "right",
    //   },
    //   visible: true,
    //   children: {
    //     editIcon: {
    //       uiFramework: "custom-atoms",
    //       componentPath: "Icon",
    //       props: {
    //         iconName: "edit",
    //       },
    //     },
    //     buttonLabel: getLabel({
    //       labelName: "Edit",
    //       labelKey: "Edit",
    //     }),
    //   },
    //   onClickDefination: {
    //     action: "condition",
    //     callBack: (state, dispatch) => {
    //       changeStep(state, dispatch, "", 2);
    //     },
    //   },
    // },
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
        jsonPath: "nextHearingDate",
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
        jsonPath: "nextHearingTime",
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
        jsonPath: "firstStepHearingNotice.hearingOfficer",
      }
    ),
  }),
});

export default fsBillObhDetailSummary;
