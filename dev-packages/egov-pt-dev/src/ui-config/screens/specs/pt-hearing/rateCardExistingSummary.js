import {
  getCommonSubHeader,
  getCommonContainer,
  getCommonGrayCard,
  getLabelWithValue,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";

import { changeStep } from "./applyResource/rateCardFooter";

const rateCardExistingSummary = getCommonGrayCard({
  rateCardEntryContainer: getCommonContainer({
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
          changeStep(state, dispatch, "", 1);
        },
      },
    },
  }),

  existingContainer: getCommonContainer({
    existingQuarter: getLabelWithValue(
      {
        labelName: "Quarter",
        labelKey: "Quarter",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "rateCard.existingQuarter",
      }
    ),

    existingAV: getLabelWithValue(
      {
        labelName: "Av",
        labelKey: "Av",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      { jsonPath: "rateCard.existingAV" }
    ),

    existingCommAV: getLabelWithValue(
      {
        labelName: "Comm AV",
        labelKey: "Comm AV",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "rateCard.existingCommAV",
      }
    ),
  }),
});

export default rateCardExistingSummary;
