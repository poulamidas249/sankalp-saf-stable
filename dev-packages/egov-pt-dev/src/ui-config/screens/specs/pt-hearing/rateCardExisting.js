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

const getExistingQuarter = async (action, state, dispatch) => {
  let existingQuarter = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.existingQuarter",
    ""
  );
  dispatch(prepareFinalObject("existingQuarter", existingQuarter));
};

const getExistingAV = async (action, state, dispatch) => {
  let existingAV = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.existingAV",
    ""
  );
  dispatch(prepareFinalObject("existingAV", existingAV));
};

const getExistingCommAV = async (action, state, dispatch) => {
  let existingCommAV = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.existingCommAV",
    ""
  );
  dispatch(prepareFinalObject("existingCommAV", existingCommAV));
};

const existing = getCommonCard({
  safFormCDetailitleSeparately1: getCommonContainer({
    existingQuarter: getTextField({
      label: {
        labelKey: "Existing Quarter",
      },
      disabled: true,
      required: false,
      visible: true,
      jsonPath: "rateCard.existingQuarter",
      afterFieldChange: (action, state, dispatch) => {
        getExistingQuarter(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    existingAV: getTextField({
      label: {
        labelKey: "Existing AV",
      },
      disabled: true,
      required: false,
      visible: true,
      jsonPath: "rateCard.existingAV",
      afterFieldChange: (action, state, dispatch) => {
        getExistingAV(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    existingCommAV: getTextField({
      label: {
        labelKey: "Existing Comm AV",
      },

      disabled: true,
      required: false,
      visible: true,
      jsonPath: "rateCard.existingCommAV",
      afterFieldChange: (action, state, dispatch) => {
        getExistingCommAV(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),
  }),
});

export default existing;
//export default {existing,proposed};
