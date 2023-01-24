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
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const getProposedquarter = async (action, state, dispatch) => {
  let proposedquarter = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.proposedquarter",
    ""
  );
  dispatch(prepareFinalObject("proposedquarter", proposedquarter));
};

const getProposedav = async (action, state, dispatch) => {
  let propAv = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.propAv",
    ""
  );
  dispatch(prepareFinalObject("propAv", propAv));
};

const getProposedcommAV = async (action, state, dispatch) => {
  let proposedcommAV = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.proposedcommAV",
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
      jsonPath: "rateCard.proposedquarter",
      afterFieldChange: (action, state, dispatch) => {
        getProposedquarter(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    propAv: getTextField({
      label: {
        labelKey: "Proposed AV",
      },
      placeholder: {
        labelKey: "Proposed AV",
      },
      required: false,
      visible: true,
      disabled: true,
      jsonPath: "rateCard.propAv",
      afterFieldChange: (action, state, dispatch) => {
        getProposedav(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    proposedcommAV: getTextField({
      label: {
        labelKey: "Proposed Comm AV",
      },
      placeholder: {
        labelKey: "Proposed Comm AV",
      },
      disabled: true,
      required: false, 
      visible: true,
      jsonPath: "rateCard.propCommAv",
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
