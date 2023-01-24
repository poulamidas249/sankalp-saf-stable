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

const getProposedquarter = async (action, state, dispatch) => {
  let proposedquarter = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.proposedquarter",
    ""
  );
  dispatch(prepareFinalObject("proposedquarter", proposedquarter));
};

const getProposedav = async (action, state, dispatch) => {
  let proposedav = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.proposedav",
    ""
  );
  dispatch(prepareFinalObject("proposedav", proposedav));
};

const getProposedcommAV = async (action, state, dispatch) => {
  let proposedcommAV = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.proposedcommAV",
    ""
  );
  dispatch(prepareFinalObject("proposedcommAV", proposedcommAV));
};

const proposed = getCommonCard({
  safFormCDetailitleSeparately1: getCommonContainer({
    proposedquarter: getTextField({
      label: {
        labelKey: "Proposed Quarter",
      },
      placeholder: {
        labelKey: "Proposed Quarter",
      },
      required: false,
      visible: true,
      disabled: true,
      jsonPath: "fsBill.proposedquarter",
      afterFieldChange: (action, state, dispatch) => {
        getProposedquarter(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    proposedav: getTextField({
      label: {
        labelKey: "Proposed AV",
      },
      placeholder: {
        labelKey: "Proposed AV",
      },
      required: false,
      visible: true,
      disabled: true,
      jsonPath: "fsBill.proposedAV",
      afterFieldChange: (action, state, dispatch) => {
        getProposedav(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
     
    }),

    propCommAv: getTextField({
      label: {
        labelKey: "Proposed Comm AV",
      },
      placeholder: {
        labelKey: "Proposed Comm AV",
      },
      disabled: true,
      required: false,
      visible: true,
      jsonPath: "fsBill.propCommAv",
      afterFieldChange: (action, state, dispatch) => {
        getProposedcommAV(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),
  }),
});
export default proposed;
