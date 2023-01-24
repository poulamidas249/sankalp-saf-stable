import {
  getCommonCard,
  getCommonContainer,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const getAV = async (action, state, dispatch) => {
  let fixedav = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.fixedav",
    ""
  );
  dispatch(prepareFinalObject("fixedav", fixedav));
};

const getCommAV = async (action, state, dispatch) => {
  let fixedCommAv = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.fixedCommAv",
    ""
  );
  dispatch(prepareFinalObject("fixedCommAv", fixedCommAv));
};

const getQtrlyTax = async (action, state, dispatch) => {
  let decidedqtrlyTax = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.decidedqtrlyTax",
    ""
  );
  dispatch(prepareFinalObject("decidedqtrlyTax", decidedqtrlyTax));
};

const getNormalRate = async (action, state, dispatch) => {
  let decidednormalRate = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.decidednormalRate",
    ""
  );
  dispatch(prepareFinalObject("decidednormalRate", decidednormalRate));
};

const getCommRate = async (action, state, dispatch) => {
  let decidedcommRate = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.decidedcommRate",
    ""
  );
  dispatch(prepareFinalObject("decidedcommRate", decidedcommRate));
};

const getPayableAmount = async (action, state, dispatch) => {
  let decidedpayableAmount = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.decidedpayableAmount",
    ""
  );
  dispatch(prepareFinalObject("decidedpayableAmount", decidedpayableAmount));
};

const getQuarterAmount = async (action, state, dispatch) => {
  let decidedquarterAmount = get(
    state.screenConfiguration.screenConfig["rateCardEntry"],
    "components.div.children.formwizardThirdStep.children.rateCardObjectionDetail.children.cardContent.children.safFormCDetailitleSeparately1.children.decidedquarterAmount.props.value",
    ""
  );
  dispatch(prepareFinalObject("decidedquarterAmount", decidedquarterAmount));
};

const deceidedDetail = getCommonCard({
  safFormCDetailitleSeparately1: getCommonContainer({
    fixedav: getTextField({
      label: {
        labelKey: "AV",
      },
      placeholder: {
        labelKey: "AV",
      },
      required: false,
      jsonPath: "rateCard.fixedav",
      afterFieldChange: (action, state, dispatch) => {
        getAV(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 3,
      },
    }),

    fixedCommAv: getTextField({
      label: {
        labelKey: "Comm AV",
      },
      placeholder: {
        labelKey: "Comm AV",
      },
      required: false,
      visible: true,
      jsonPath: "rateCard.fixedCommAv",
      afterFieldChange: (action, state, dispatch) => {
        getCommAV(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 3,
      },
    }),

    decidedqtrlyTax: getTextField({
      label: {
        labelKey: "Qtrly Tax(Including HBT)",
      },
      placeholder: {
        labelKey: "Qtrly Tax(Including HBT)",
      },
      required: false,
      visible: true,
      disabled: true,
      jsonPath: "rateCard.decidedqtrlyTax",
      afterFieldChange: (action, state, dispatch) => {
        getQtrlyTax(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 3,
      },
    }),

    decidednormalRate: getTextField({
      label: {
        labelKey: "Normal Rate",
      },
      placeholder: {
        labelKey: "Normal Rate",
      },
      disabled: true,
      required: false,
      visible: true,
      jsonPath: "rateCard.decidednormalRate",
      afterFieldChange: (action, state, dispatch) => {
        getNormalRate(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 3,
      },
    }),

    decidedcommRate: getTextField({
      label: {
        labelKey: "Comm Rate",
      },
      placeholder: {
        labelKey: "Comm Rate",
      },
      disabled: true,
      required: false,
      visible: true,
      jsonPath: "rateCard.decidedcommRate",
      afterFieldChange: (action, state, dispatch) => {
        getCommRate(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 3,
      },
    }),

    decidedpayableAmount: getTextField({
      label: {
        labelKey: "Payable Amount",
      },
      placeholder: {
        labelKey: "Payable Amount",
      },
      disabled: true,
      required: false,
      visible: true,
      jsonPath: "rateCard.decidedpayableAmount",
      afterFieldChange: (action, state, dispatch) => {
        getPayableAmount(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 3,
      },
    }),

    decidedquarterAmount: getTextField({
      label: {
        labelKey: "Quarter Amount",
      },
      placeholder: {
        labelKey: "Quarter Amount",
      },
      required: false,
      visible: true,
      disabled: true,
      jsonPath: "rateCard.decidedquarterAmount",
      afterFieldChange: (action, state, dispatch) => {
        getQuarterAmount(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 3,
      },
    }),

    decidedsurchargeAmount: getTextField({
      label: {
        labelKey: "Surcharge Amount",
      },
      placeholder: {
        labelKey: "Surcharg Amount",
      },
      disabled: true,
      required: false,
      visible: true,
      jsonPath: "rateCard.decidedsurchargeAmount",
      afterFieldChange: (action, state, dispatch) => {
        getSurchargeAmount(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 3,
      },
    }),
  }),
});

export default deceidedDetail;
