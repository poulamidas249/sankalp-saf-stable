import {
  getCommonSubHeader,
  getCommonContainer,
  getCommonGrayCard,
  getLabelWithValue,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";

import { changeStep } from "./applyResource/fsBillFooter";

const fsBillExistingSummary = getCommonGrayCard({
  fsBillEntryContainer: getCommonContainer({
    safFormCDetailHeaderC: getCommonSubHeader({
      labelName: "Existing",
      labelKey: "Existing",
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
    existingQuarter: getLabelWithValue(
      {
        labelName: "Existing Quarter",
        labelKey: "Existing Quarter",
        value: "Existing Quarter",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "fsBill.existingQuarter",
      }
    ),

    existingAV: getLabelWithValue(
      {
        labelName: "Existing Av",
        labelKey: "Existing Av",
        value: "Existing Av Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "fsBill.existingAV",
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
        jsonPath: "fsBill.existingCommAV",
      }
    ),
  }),
});

export default fsBillExistingSummary;
