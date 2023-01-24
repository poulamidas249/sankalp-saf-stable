import {
  getCommonContainer,
  getCommonHeader,
  getStepperObject,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { hearingNoticeFooter } from "./applyResource/hearingNoticeFooter";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import firstStepHearingNotice from "./firstStepHearingNotice";
import hearingNoticeObjDetail from "./hearingNoticeObjDetail";
import hearingNoticeSummary from "./hearingNoticeSummary";
import hearingNoticeObjDetailSummary from "./hearingNoticeObjDetailSummary";
import { assesseeSearchHearingNotice } from "./functions";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const getData = (action, state, dispatch) => {
  assesseeSearchHearingNotice(state, dispatch);
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
    firstStepHearingNotice,
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
    hearingNoticeObjDetail,
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
    hearingNoticeSummary,
    hearingNoticeObjDetailSummary,
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
          "mdmsDataForHearing.hearingReason",
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
          "mdmsDataForHearing.hearingOfficer",
          hearingOfficerArray
        )
      );

      let hearingNoticeArray = [];
      let hearingNotice = mdmsData.HEARING_SECTION;
      if (hearingNotice && hearingNotice.length > 0) {
        hearingNotice.map((reason) => {
          let noticeObject = {
            code: reason.name,
            value: reason.code,
          };
          hearingNoticeArray.push(noticeObject);
        });
      }

      dispatch(
        prepareFinalObject(
          "mdmsDataForHearing.hearingNotice",
          hearingNoticeArray
        )
      );
    }
    dispatch(
      prepareFinalObject("createNoticeMdmsData", get(response, "MdmsRes"))
    );
  } catch (e) {
    console.log(e);
  }
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "hearingNoticeEntry",
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
        hearingNoticeFooter,
      },
    },
  },
};

export default screenConfig;
