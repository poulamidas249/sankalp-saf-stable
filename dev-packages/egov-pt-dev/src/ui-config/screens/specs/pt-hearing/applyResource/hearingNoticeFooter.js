import {
  dispatchMultipleFieldChangeAction,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import { getCommonApplyFooter } from "../../utils";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { routeTo } from "egov-ui-kit/utils/PTCommon/FormWizardUtils/formActionUtils";



export const submitHandeler = async (state, dispatch) => {

  let requestBody = {
    Property: {
      assesseeNo: "",
      tmpAssesseeNo: "",
      tenantId: "km.kolkata",
      creationReason:"UPDATE",
      notice: {
        actFlag: "OBJECTED",
      },

    },
   
    hearing: {
      propAv: "",
      propCommAv: "",
      hearingTime: "",
      hearingOfficer: "",
      reason: "",
      hearingReason: "",
      hearingSection: "",
      hearingStatus: "HEARING"

    },
  };

  let inputBody = state.screenConfiguration.preparedFinalObject.firstStepHearingNotice;
  let searchResult = state.screenConfiguration.preparedFinalObject.hearingNoticeSearchResult;
  
  requestBody.Property.assesseeNo = searchResult.assesseeNo;
  requestBody.Property.tmpAssesseeNo = searchResult.tmpAssesseeNo;
  requestBody.hearing.propAv = inputBody.propAv;
  requestBody.hearing.propCommAv = inputBody.propCommAv;
  requestBody.hearing.hearingTime = inputBody.hearingTime;
  requestBody.hearing.hearingOfficer = inputBody.hearingOfficer;
  requestBody.hearing.reason = inputBody.reason;
  requestBody.hearing.hearingReason = inputBody.hearingReason;
  requestBody.hearing.hearingSection = inputBody.hearingSection;

  try {
    payload = await httpRequest(
      "post",
      "/property-services/property/_updateNotice",
      "_search",
      [],
      requestBody
    );

    if (payload.status === "Successful") {
      alert("New Record Successfully Saved");
      // let link = `/pt-inspection/acknowledgementGRIR?purpose=apply&status=success&applicationNumber=${searchResult.assesseeNo}&noticeNo`;
      // routeTo(link)
    }

    if (payload.status === "Failed") {
      alert("Error occurred, please try again.");
    }
  } catch (e) {
    console.log(e);
  }
};
export const callBackForNext = async (state, dispatch) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["hearingNoticeEntry"],
    "components.div.children.stepper.props.activeStep",
    0
  );

  if (activeStep === 0) {
    changeStep(state, dispatch);
  }
  if (activeStep === 1) {
    changeStep(state, dispatch);
  }
  if (activeStep === 2) {
    changeStep(state, dispatch);
  }
  if (activeStep === 3) {
    changeStep(state, dispatch);
  }
  if (activeStep === 4) {
    changeStep(state, dispatch);
  }
  // if (activeStep !== 3) {

  // }
};
export const changeStep = (
  state,
  dispatch,
  mode = "next",
  defaultActiveStep = -1
) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["hearingNoticeEntry"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  if (defaultActiveStep === -1) {
    if (activeStep === 2 && mode === "next") {
      const isDocsUploaded = get(
        state.screenConfiguration.preparedFinalObject,
        "LicensesTemp[0].reviewDocData",
        null
      );
      activeStep = isDocsUploaded ? 3 : 2;
    } else {
      activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
    }
  } else {
    activeStep = defaultActiveStep;
  }

  const isPreviousButtonVisible = activeStep > 0 ? true : false;
  const isNextButtonVisible = activeStep < 2 ? true : false;
  const isPayButtonVisible = activeStep === 2 ? true : false;
  const isPrinteButtonVisible = activeStep === 2 ? true : false;
  const isUAAButtonVisible = activeStep === 2 ? true : false;

  const actionDefination = [
    {
      path: "components.div.children.stepper.props",
      property: "activeStep",
      value: activeStep,
    },
    {
      path: "components.div.children.hearingNoticeFooter.children.previousButton",
      property: "visible",
      value: isPreviousButtonVisible,
    },
    {
      path: "components.div.children.hearingNoticeFooter.children.nextButton",
      property: "visible",
      value: isNextButtonVisible,
    },
    {
      path: "components.div.children.hearingNoticeFooter.children.submitButton",
      property: "visible",
      value: isPayButtonVisible,
    },
    {
      path: "components.div.children.hearingNoticeFooter.children.printhearingnoticeButton",
      property: "visible",
      value: isPrinteButtonVisible,
    },
    {
      path: "components.div.children.hearingNoticeFooter.children.printUAAButton",
      property: "visible",
      value: isUAAButtonVisible,
    },
  ];
  dispatchMultipleFieldChangeAction(
    "hearingNoticeEntry",
    actionDefination,
    dispatch
  );
  renderSteps(activeStep, dispatch);
};

export const renderSteps = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0:
      dispatchMultipleFieldChangeAction(
        "hearingNoticeEntry",
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case 1:
      dispatchMultipleFieldChangeAction(
        "hearingNoticeEntry",
        getActionDefinationForStepper(
          "components.div.children.formwizardSecondStep"
        ),
        dispatch
      );
      break;

    default:
      dispatchMultipleFieldChangeAction(
        "hearingNoticeEntry",
        getActionDefinationForStepper(
          "components.div.children.formwizardThirdStep"
        ),
        dispatch
      );
  }
};

export const getActionDefinationForStepper = (path) => {
  const actionDefination = [
    {
      path: "components.div.children.formwizardFirstStep",
      property: "visible",
      value: true,
    },
    {
      path: "components.div.children.formwizardSecondStep",
      property: "visible",
      value: true,
    },
    {
      path: "components.div.children.formwizardThirdStep",
      property: "visible",
      value: true,
    },
  ];
  for (var i = 0; i < actionDefination.length; i++) {
    actionDefination[i] = {
      ...actionDefination[i],
      value: false,
    };
    if (path === actionDefination[i].path) {
      actionDefination[i] = {
        ...actionDefination[i],
        value: true,
      };
    }
  }
  return actionDefination;
};

export const callBackForPrevious = (state, dispatch) => {
  changeStep(state, dispatch, "previous");
};

export const hearingNoticeFooter = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "16px",
        borderRadius: "inherit",
      },
    },
    children: {
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_left",
        },
      },
      previousButtonLabel: getLabel({
        labelName: "Previous Step",
        labelKey: "Previous Step",
      }),
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious,
    },
    visible: false,
  },
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit",
      },
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "Next Step",
        labelKey: "Next Step",
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right",
        },
      },
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext,
    },
  },
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit",
      },
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "Submit",
        labelKey: "Submit",
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right",
        },
      },
    },
    onClickDefination: {
      action: "condition",
      callBack: submitHandeler,
    },
    visible: false,
  },

  // printhearingnoticeButton: {
  //   componentPath: "Button",
  //   props: {
  //     variant: "contained",
  //     color: "primary",
  //     style: {
  //       minWidth: "180px",
  //       height: "48px",
  //       marginRight: "45px",
  //       borderRadius: "inherit",
  //     },
  //   },
  //   children: {
  //     printhearingnoticeButtonLabel: getLabel({
  //       labelName: "Print Hearing Notice",
  //       labelKey: "Print Hearing Notice",
  //     }),
  //     printhearingnoticeButtonIcon: {
  //       uiFramework: "custom-atoms",
  //       componentPath: "Icon",
  //       props: {
  //         iconName: "keyboard_arrow_right",
  //       },
  //     },
  //   },
  //   onClickDefination: {
  //     action: "condition",
  //     callBack: callBackForSubmit,
  //   },
  //   visible: false,
  // },

  // printUAAButton: {
  //   componentPath: "Button",
  //   props: {
  //     variant: "outlined",
  //     color: "primary",
  //     style: {
  //       minWidth: "180px",
  //       height: "48px",
  //       marginRight: "16px",
  //     },
  //   },
  //   children: {
  //     printUAAButtonLabel: getLabel({
  //       labelName: "UAA Print Hearing Notice",
  //       labelKey: "UAA Print Hearing Notice",
  //     }),
  //     printUAAButtonIcon: {
  //       uiFramework: "custom-atoms",
  //       componentPath: "Icon",
  //       props: {
  //         iconName: "keyboard_arrow_right",
  //       },
  //     },
  //   },
  //   onClickDefination: {
  //     action: "condition",
  //     callBack: () => {
  //       // generatePdfAndDownload(
  //       //   state,
  //       //   dispatch,
  //       //   "print",
  //       //   applicationNumber,
  //       //   tenant
  //       // );
  //     },
  //   },
  //   visible: false,
  // },
});
