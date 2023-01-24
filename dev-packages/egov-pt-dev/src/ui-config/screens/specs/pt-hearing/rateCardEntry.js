import {
  getCommonContainer,
  getCommonHeader,
  getStepperObject,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { rateCardFooter } from "./applyResource/rateCardFooter";
import { assesseeSearchRateCard } from "./functions";
import get from "lodash/get";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";

import rateCard from "./rateCard";
import rateCardExisting from "./rateCardExisting";
import rateCardProposed from "./rateCardProposed";
import rateCardObjectionDetail from "./rateCardObjectionDetail";
import { httpRequest } from "egov-ui-framework/ui-utils/api";

import rateCardDeceidedDetail from "./rateCardDeceidedDetail";
import rateCardSummary from "./rateCardSummary";
import rateCardExistingSummary from "./rateCardExistingSummary";
import rateCardProSummary from "./rateCardProSummary";
import rateCardObhDetailSummary from "./rateCardObhDetailSummary";
import rateCardDecideSummary from "./rateCardDecideSummary";

export const stepsData = [
  { labelName: "Rate Card Entry", labelKey: "Rate Card Entry" },
  { labelName: "Existing & Proposed Tax", labelKey: "Existing & Proposed Tax" },
  { labelName: "Entry", labelKey: "Entry" },
  { labelName: "Summary", labelKey: "Summary" },
];

const getMDMSData = async (action, state, dispatch) => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: "km",
      moduleDetails: [
        {
          moduleName: "PropertyTax",

          masterDetails: [
            {
              name: "HEARING_SECTION",
            },
            {
              name: "HEARING_REASON",
            },
            {
              name: "HEARING_OFFICER",
            },
          ],
        },
      ],
    },
  };
  try {
    const response = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    if (response.MdmsRes && response.MdmsRes.PropertyTax) {
      let mdmsData = response.MdmsRes.PropertyTax;
      // create another object for reason and office dropdown
      let hearingReasonArray = [];
      let hearingReason = mdmsData.HEARING_REASON;
      if (hearingReason && hearingReason.length > 0) {
        hearingReason.map((reason) => {
          let reasonObject = {
            code: reason.description,
            value: reason.code,
          };
          hearingReasonArray.push(reasonObject);
        });
      }

      dispatch(
        prepareFinalObject(
          "mdmsDataForRateCard.hearingReason",
          hearingReasonArray
        )
      );

      let hearingOfficerArray = [];
      let hearingOfficer = mdmsData.HEARING_OFFICER;
      if (hearingOfficer && hearingOfficer.length > 0) {
        hearingOfficer.map((reason) => {
          let officerObject = {
            code: reason.description,
            value: reason.code,
          };
          hearingOfficerArray.push(officerObject);
        });
      }

      dispatch(
        prepareFinalObject(
          "mdmsDataForRateCard.hearingOfficer",
          hearingOfficerArray
        )
      );

      let ratecardArray = [];
      let ratecard = mdmsData.HEARING_SECTION;
      if (ratecard && ratecard.length > 0) {
        ratecard.map((reason) => {
          let noticeObject = {
            code: reason.name,
            value: reason.code,
          };
          ratecardArray.push(noticeObject);
        });
      }

      dispatch(
        prepareFinalObject(
          "mdmsDataForRateCard.Notice",
          ratecardArray
        )
      );
    }
    dispatch(
      prepareFinalObject("createNoticeMdmsData", get(response, "MdmsRes"))
    );

    console.log("reason Payload", response);
  } catch (e) {
    console.log(e);
  }
};

const getData = (action, state, dispatch) => {
 // assesseeSearchRateCard(state, dispatch);
};

export const stepper = getStepperObject(
  { props: { activeStep: 0 } },
  stepsData
);

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Rate Card Entry",
    labelKey: "Rate Card Entry",
  }),
});

export const formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1",
  },
  children: {
    rateCard,
  },
  visible: true,
};

export const formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2",
  },
  children: {
    rateCardExisting,
    rateCardProposed,
  },
  visible: false,
};

export const formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2",
  },
  children: {
    rateCardObjectionDetail,
    rateCardDeceidedDetail,
  },
  visible: false,
};

export const formwizardFourthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form3",
  },
  children: {
    rateCardSummary,
    rateCardExistingSummary,
    rateCardProSummary,
    rateCardObhDetailSummary,
    rateCardDecideSummary,
  },
  visible: false,
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "rateCardEntry",
  beforeInitScreen: (action, state, dispatch) => {
    getData(action, state, dispatch);
    getMDMSData(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css",
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10,
              },
              ...header,
            },
          },
        },
        stepper,
        formwizardFirstStep,
        formwizardSecondStep,
        formwizardThirdStep,
        formwizardFourthStep,
        rateCardFooter,
      },
    },
  },
};

export default screenConfig;
