import {
  getCommonSubHeader,
  getCommonContainer,
  getCommonGrayCard,
  getLabelWithValue,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";

import { changeStep } from "./applyResource/rateCardFooter";

export const submitApplication = async (state, dispatch) => {
};

export const backApplication = async (state, dispatch) => {
  dispatch(setRoute(`../pt-hearing/rateCardDecideSummary`));
};

const rateCardDecideSummary = getCommonGrayCard({
  rateCardEntryContainer: getCommonContainer({
    deceidedDetail: getCommonSubHeader({
      labelName: "Decided/EX-Parte",
      labelKey: "Decided/EX-Parte",
      gridDefination: {
        xs: 12,
        sm: 12,
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
          changeStep(state, dispatch, "", 2);
        },
      },
    },
  }),

  deceidedDetailContainer: getCommonContainer({
    decidedav: getLabelWithValue(
      {
        labelName: "AV",
        labelKey: "AV",
        value: "AV",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "rateCard.decidedav",
      }
    ),

    // decidedcommAV: getLabelWithValue(
    //   {
    //     labelName: "Comm AV",
    //     labelKey: "Comm AV",
    //     gridDefination: {
    //       xs: 12,
    //         sm: 3,
    //     },
    //   },
    //   {
    //     jsonPath: "rateCard.decidedcommAV",
    //   },
    // ),

    decidedcommAV: getLabelWithValue(
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

    decidedqtrlyTax: getLabelWithValue(
      {
        labelName: "Qtrly Tax(Including HBT)",
        labelKey: "Qtrly Tax(Including HBT)",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "rateCard.decidedqtrlyTax", 
      }
    ),

    decidednormalRate: getLabelWithValue(
      {
        labelName: "Normal Rate",
        labelKey: "Normal Rate",
        value: "Normal Rate",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "rateCard.decidednormalRate",
      }
    ),

    deceidedcommRate: getLabelWithValue(
      {
        labelName: "Comm Rate",
        labelKey: "Comm Rate",
        value: "Comm Rate",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "rateCard.decidedcommRate",

        //  jsonPath: "rateCard.deceidedcommRate",
      }
    ),

    decidedpayableAmount: getLabelWithValue(
      {
        labelName: "Payable Amount",
        labelKey: "Payable Amount",
        value: "Payable Amount",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "rateCard.decidedpayableAmount",
      }
    ),

    decidedcommRate: getLabelWithValue(
      {
        labelName: "Quarter Amount",
        labelKey: "Quarter Amount",
        value: "Quarter Amount",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "rateCard.decidedcommRate",
      }
    ),

    decidedquarterAmount: getLabelWithValue(
      {
        labelName: "Quarter Amount",
        labelKey: "Quarter Amount",
        value: "Quarter Amount",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "rateCard.decidedquarterAmount",
      }
    ),

    decidedsurchargeAmount: getLabelWithValue(
      {
        labelName: "Surcharge Amount",
        labelKey: "Surcharge Amount",
        value: "Surcharge Amount",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "rateCard.decidedsurchargeAmount",
      }
    ),
  }),
});
export default rateCardDecideSummary;
