import {
  getCommonContainer,
  getCommonHeader,
  getStepperObject,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { fsBillFooter } from "./applyResource/fsBillFooter";
import { assesseeSearchfsBill } from "./functions";
import get from "lodash/get";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";

import fsBill from "./fsBill";
import fsBillExisting from "./fsBillExisting";
import fsBillProposed from "./fsBillProposed";
import fsBillObjectionDetail from "./fsBillObjectionDetail";
import { httpRequest } from "egov-ui-framework/ui-utils/api";

import fsBillDeceidedDetail from "./fsBillDeceidedDetail";
import fsBillSummary from "./fsBillSummary";
import fsBillExistingSummary from "./fsBillExistingSummary";
import fsBillProSummary from "./fsBillProSummary";
import fsBillObhDetailSummary from "./fsBillObhDetailSummary";
import fsBillDecideSummary from "./fsBillDecideSummary";

export const stepsData = [
  { labelName: "FS Bill Generation", labelKey: "FS Bill Generation" },
  // { labelName: "Existing & Proposed Tax", labelKey: "Existing & Proposed Tax" },
  // { labelName: "Entry", labelKey: "Entry" },
  // { labelName: "Summary", labelKey: "Summary" },
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
          "mdmsDataForfsBill.hearingReason",
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
          "mdmsDataForfsBill.hearingOfficer",
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

      dispatch(prepareFinalObject("mdmsDataForfsBill.Notice", ratecardArray));
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
  assesseeSearchfsBill(state, dispatch);
};

export const stepper = getStepperObject(
  { props: { activeStep: 3 } },
  stepsData
);

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "FS Bill Generation",
    labelKey: "FS Bill Generation",
  }),
});

export const formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1",
  },
  children: {
    fsBill,
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
    fsBillExisting,
    fsBillProposed,
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
    fsBillObjectionDetail,
    fsBillDeceidedDetail,
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
    fsBillSummary,
    fsBillExistingSummary,
    fsBillProSummary,
    fsBillObhDetailSummary,
    fsBillDecideSummary,
  },
  visible: true,
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "fsBillEntry",
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
        // stepper,
        // formwizardFirstStep,
        // formwizardSecondStep,
        // formwizardThirdStep,
        formwizardFourthStep,
        fsBillFooter,
      },
    },
  },
};

export default screenConfig;
