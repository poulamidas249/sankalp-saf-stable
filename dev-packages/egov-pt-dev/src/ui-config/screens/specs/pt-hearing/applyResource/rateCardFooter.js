import {
  dispatchMultipleFieldChangeAction,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import { getCommonApplyFooter } from "../../utils";
import { submitRateCardData } from "../functions";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { routeTo } from "egov-ui-kit/utils/PTCommon/FormWizardUtils/formActionUtils";

export const callBackForSubmit = async (state, dispatch) => {
  submitRateCardData(state, dispatch);
};

export const callBackForNext = async (state, dispatch) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["rateCardEntry"],
    "components.div.children.stepper.props.activeStep",
    0
  );

  let nextHearingDate = get(
    state.screenConfiguration.screenConfig["rateCardEntry"],
    "components.div.children.formwizardThirdStep.children.rateCardObjectionDetail.children.cardContent.children.safFormCDetailitleSeparately1.children.nextHearingDate.props.value",
    ""
  );

  let nextHearingTime = get(
    state.screenConfiguration.screenConfig["rateCardEntry"],
    "components.div.children.formwizardThirdStep.children.rateCardObjectionDetail.children.cardContent.children.safFormCDetailitleSeparately1.children.nextHearingTime.props.value",
    ""
  );
  let hearingOfficer = get(
    state.screenConfiguration.screenConfig["rateCardEntry"],
    "components.div.children.formwizardThirdStep.children.rateCardObjectionDetail.children.cardContent.children.safFormCDetailitleSeparately1.children.hearingOfficer.props.value",
    ""
  );

  let decidedav = get(
    state.screenConfiguration.screenConfig["rateCardEntry"],
    "components.div.children.formwizardThirdStep.children.rateCardDeceidedDetail.children.cardContent.children.safFormCDetailitleSeparately1.children.decidedav.props.value",
    ""
  );

  if (activeStep === 0) {
    changeStep(state, dispatch);
  }
  if (activeStep === 1) {
    changeStep(state, dispatch);
  }
  if (activeStep === 2) {
    if (
      nextHearingDate != "" &&
      nextHearingTime != "" &&
      hearingOfficer != ""
    ) {
      changeStep(state, dispatch);
    } else {
      let errorMessage = {
        labelName: "Kindly Enter all the mandatory feilds !",
        labelKey: "Kindly Enter all the mandatory feilds !",
      };
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
    }
  }
  if (activeStep === 3) {
    changeStep(state, dispatch);
  }
  if (activeStep === 4) {
    changeStep(state, dispatch);
  }
};

export const submitHandeler = async (state, dispatch) => {
  let requestBody = {
    Property: {
      assesseeNo: "",
      tmpAssesseeNo: "",
      tenantId: "km.kolkata",
      creationReason: "UPDATE",
      notice: {
        actFlag: "OBJECTED",
      },
    },

    hearing: {
      propAv: "",
      propCommAv: "",
      hearingStatus: "",

      // hearingDate: "",
      // hearingTime: "",
      // hearingOfficer: "",
      //reason: "",
     // hearingReason: "",
      // hearingSection: "",
      // fixedav: "",
      // fixedCommAv: "",
    },
  };

  let inputBody = state.screenConfiguration.preparedFinalObject.rateCard;
  let searchResult = state.screenConfiguration.preparedFinalObject.rateCardSearchResult;


  requestBody.Property.assesseeNo = searchResult.assesseeNo;
  requestBody.Property.tmpAssesseeNo = searchResult.tmpAssesseeNo;

  requestBody.hearing.propAv = inputBody.propAv;
  requestBody.hearing.propCommAv = inputBody.propCommAv;
  requestBody.hearing.hearingStatus = inputBody.hearingStatus;

  // requestBody.hearing.hearingDate = inputBody.hearingDate;
  // requestBody.hearing.hearingTime = inputBody.hearingTime;
  // requestBody.hearing.hearingOfficer = inputBody.hearingOfficer;
  // requestBody.hearing.reason = inputBody.reason;
  // requestBody.hearing.hearingReason = inputBody.hearingReason;
  // requestBody.hearing.hearingSection = inputBody.hearingSection;
  // requestBody.hearing.fixedav = inputBody.fixedav;
  // requestBody.hearing.fixedCommAv = inputBody.fixedCommAv;



  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "property-services/property/_updateNotice",
      "_search",
      [],
      requestBody
    );
    console.log("payload==", payload);
    if (payload.status === "Successful") {
      alert("New Record Successfully Saved");
      let link = `/pt-inspection/acknowledgementGRIR?purpose=apply&status=success&applicationNumber=${searchResult.assesseeNo}&noticeNo`;
      routeTo(link)
    }
    if (payload.status === "Failed") {
      alert("Error occurred, please try again.");
    }
  } catch (e) {
    console.log(e);
  }
};

export const changeStep = (
  state,
  dispatch,
  mode = "next",
  defaultActiveStep = -1
) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["rateCardEntry"],
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
      activeStep = isDocsUploaded ? 4 : 3;
    } else {
      activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
    }
  } else {
    activeStep = defaultActiveStep;
  }

  const isPreviousButtonVisible = activeStep > 0 ? true : false;
  const isNextButtonVisible = activeStep < 3 ? true : false;
  const isPayButtonVisible = activeStep === 3 ? true : false;
  const isPrinteButtonVisible = activeStep === 2 ? true : false;
  const isUAAButtonVisible = activeStep === 2 ? true : false;

  const actionDefination = [
    {
      path: "components.div.children.stepper.props",
      property: "activeStep",
      value: activeStep,
    },
    {
      path: "components.div.children.rateCardFooter.children.previousButton",
      property: "visible",
      value: isPreviousButtonVisible,
    },
    {
      path: "components.div.children.rateCardFooter.children.nextButton",
      property: "visible",
      value: isNextButtonVisible,
    },
    {
      path: "components.div.children.rateCardFooter.children.submitButton",
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
    "rateCardEntry",
    actionDefination,
    dispatch
  );
  renderSteps(activeStep, dispatch);
};

export const renderSteps = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0:
      dispatchMultipleFieldChangeAction(
        "rateCardEntry",
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case 1:
      dispatchMultipleFieldChangeAction(
        "rateCardEntry",
        getActionDefinationForStepper(
          "components.div.children.formwizardSecondStep"
        ),
        dispatch
      );
      break;
    case 2:
      dispatchMultipleFieldChangeAction(
        "rateCardEntry",
        getActionDefinationForStepper(
          "components.div.children.formwizardThirdStep"
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        "rateCardEntry",
        getActionDefinationForStepper(
          "components.div.children.formwizardFourthStep"
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
    {
      path: "components.div.children.formwizardFourthStep",
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

export const rateCardFooter = getCommonApplyFooter({
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
  //       labelName: "Print Rate Card",
  //       labelKey: "Print Rate Card",
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
  //       labelName: "Print Hearing Notice",
  //       labelKey: "Print Hearing Notice",
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
