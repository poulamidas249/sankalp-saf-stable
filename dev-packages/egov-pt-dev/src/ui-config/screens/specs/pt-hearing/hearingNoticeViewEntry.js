import {
  getCommonContainer,
  getCommonHeader,
  getStepperObject,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { hearingNoticeViewFooter } from "./applyResource/hearingNoticeViewFooter";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import firstStepHearingNoticeView from "./firstStepHearingNoticeView";
import hearingNoticeViewObjDetail from "./hearingNoticeViewObjDetail";
import hearingNoticeViewSummary from "./hearingNoticeViewSummary";
import hearingNoticeViewObjDetailSummary from "./hearingNoticeViewObjDetailSummary";
import { assesseeSearchHearingNoticeView } from "../pt-hearing/functions";

import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const getData = (action, state, dispatch) => {
  assesseeSearchHearingNoticeView(state, dispatch);
};

export const stepsData = [
  { labelName: "Hearing Notice Entry", labelKey: "Hearing Notice Entry" },
  { labelName: "Objection Details", labelKey: "Objection Details" },
  { labelName: "Summary", labelKey: "Summary" },
];

export const stepper = getStepperObject(
  { props: { activeStep: 0 } },
  stepsData
);

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Hearing Notice Entry",
    labelKey: "Hearing Notice Entry",
  }),
});

export const formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1",
  },
  children: {
    firstStepHearingNoticeView,
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
    hearingNoticeViewObjDetail,
  },
  visible: false,
};

export const formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form6",
  },
  children: {
    hearingNoticeViewSummary,
    hearingNoticeViewObjDetailSummary,
  },
  visible: false,
};

//URL: https://kolkatamc.ddns.net/egov-mdms-service/v1/_search

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
    dispatch(
      prepareFinalObject("createNoticeMdmsData", get(response, "MdmsRes"))
    );

    console.log("reason Payload", response);
  } catch (e) {
    console.log(e);
  }
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "hearingNoticeViewEntry",
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
        hearingNoticeViewFooter,
      },
    },
  },
};

export default screenConfig;
