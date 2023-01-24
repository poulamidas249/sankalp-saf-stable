import {
  getDateField,
  getSelectField,
  getTimeField,
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getCommonSubHeader,
  getCommonParagraph,
  getLabel,
  getPattern,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const getAV = async (action, state, dispatch) => {
  let decidedav = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.decidedav",
    ""
  );
  dispatch(prepareFinalObject("decidedav", decidedav));
};

const getCommAV = async (action, state, dispatch) => {
  let decidedcommAV = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.decidedcommAV",
    ""
  );
  dispatch(prepareFinalObject("decidedcommAV", decidedcommAV));
};

const getQtrlyTax = async (action, state, dispatch) => {
  let decidedqtrlyTax = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.decidedqtrlyTax",
    ""
  );
  dispatch(prepareFinalObject("decidedqtrlyTax", decidedqtrlyTax));
};

const getNormalRate = async (action, state, dispatch) => {
  let decidednormalRate = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.decidednormalRate",
    ""
  );
  dispatch(prepareFinalObject("decidednormalRate", decidednormalRate));
};

const getCommRate = async (action, state, dispatch) => {
  let decidedcommRate = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.decidedcommRate",
    ""
  );
  dispatch(prepareFinalObject("decidedcommRate", decidedcommRate));
};

const getPayableAmount = async (action, state, dispatch) => {
  let decidedpayableAmount = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.decidedpayableAmount",
    ""
  );
  dispatch(prepareFinalObject("decidedpayableAmount", decidedpayableAmount));
};

const getQuarterAmount = async (action, state, dispatch) => {
  let decidedquarterAmount = get(
    state.screenConfiguration.screenConfig["fsBillEntry"],
    "components.div.children.formwizardThirdStep.children.fsBillObjectionDetail.children.cardContent.children.safFormCDetailitleSeparately1.children.decidedquarterAmount.props.value",
    ""
  );
  dispatch(prepareFinalObject("decidedquarterAmount", decidedquarterAmount));
};

const deceidedDetail = getCommonCard({
  safFormCDetailitleSeparately1: getCommonContainer({
    decidedav: getTextField({
      label: {
        labelKey: "AV",
      },
      placeholder: {
        labelKey: "AV",
      },
      disabled: true,
      required: false,
      jsonPath: "fsBill.decidedav",
      afterFieldChange: (action, state, dispatch) => {
        getAV(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      gridDefination: {
        xs: 12,
        sm: 6,
      },
    }),

    decidedcommAV: getTextField({
      label: {
        labelKey: "Comm AV",
      },
      placeholder: {
        labelKey: "Comm AV",
      },
      disabled: true,
      required: false,
      visible: true,
      jsonPath: "fsBill.decidedav",
      afterFieldChange: (action, state, dispatch) => {
        getCommAV(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      gridDefination: {
        xs: 12,
        sm: 6,
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
      jsonPath: "fsBill.decidedqtrlyTax",
      afterFieldChange: (action, state, dispatch) => {
        getQtrlyTax(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      gridDefination: {
        xs: 12,
        sm: 6,
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
      jsonPath: "fsBill.decidednormalRate",
      afterFieldChange: (action, state, dispatch) => {
        getNormalRate(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      gridDefination: {
        xs: 12,
        sm: 6,
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
      jsonPath: "fsBill.decidedcommRate",
      afterFieldChange: (action, state, dispatch) => {
        getCommRate(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      gridDefination: {
        xs: 12,
        sm: 6,
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
      jsonPath: "fsBill.decidedpayableAmount",
      afterFieldChange: (action, state, dispatch) => {
        getPayableAmount(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      gridDefination: {
        xs: 12,
        sm: 6,
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
      jsonPath: "fsBill.decidedquarterAmount",
      afterFieldChange: (action, state, dispatch) => {
        getQuarterAmount(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      gridDefination: {
        xs: 12,
        sm: 6,
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
      jsonPath: "fsBill.decidedsurchargeAmount",
      afterFieldChange: (action, state, dispatch) => {
        getSurchargeAmount(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      gridDefination: {
        xs: 12,
        sm: 6,
      },
    }),
  }),
});

export default deceidedDetail;
