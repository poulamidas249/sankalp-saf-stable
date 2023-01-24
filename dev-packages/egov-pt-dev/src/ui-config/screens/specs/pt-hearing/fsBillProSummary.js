import {
  getCommonSubHeader,
  getCommonContainer,
  getCommonGrayCard,
  getLabelWithValue,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "./applyResource/fsBillFooter";

const fsBillProposedSummary = getCommonGrayCard({
  fsBillEntryContainer: getCommonContainer({
    safFormCDetailHeaderC: getCommonSubHeader({
      labelName: "Proposed",
      labelKey: "Proposed",
      gridDefination: {
        xs: 12,
        sm: 10,
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
    //       changeStep(state, dispatch, "", 1);
    //     },
    //   },
    // },
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
        jsonPath: "fsBill.proposedquarter",
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
        jsonPath: "fsBill.proposedav",
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
        jsonPath: "fsBill.proposedcommAV",
      }
    ),
  }),
});

export default fsBillProposedSummary;
