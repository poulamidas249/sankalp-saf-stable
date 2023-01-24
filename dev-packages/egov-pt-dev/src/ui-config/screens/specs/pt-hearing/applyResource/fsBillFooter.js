import {
  dispatchMultipleFieldChangeAction,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import { getCommonApplyFooter } from "../../utils";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
export const callBackForNext = async (state, dispatch) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["fsBillEntry"],
    "components.div.children.stepper.props.activeStep",
    0
  );

  let isFormValid = true;
  let hasFieldToaster = true;

  if (activeStep === 0) {
    changeStep(state, dispatch);
  }
  if (activeStep === 1) {
    changeStep(state, dispatch);
  }
  if (activeStep === 2) {
    let nextHearingDate = get(
      state.screenConfiguration.screenConfig["fsBillEntry"],
      "components.div.children.formwizardThirdStep.children.fsBillObjectionDetail.children.cardContent.children.safFormCDetailitleSeparately1.children.nextHearingDate.props.value",
      ""
    );

    let nextHearingTime = get(
      state.screenConfiguration.screenConfig["fsBillEntry"],
      "components.div.children.formwizardThirdStep.children.fsBillObjectionDetail.children.cardContent.children.safFormCDetailitleSeparately1.children.nextHearingTime.props.value",
      ""
    );
    let hearingOfficer = get(
      state.screenConfiguration.screenConfig["fsBillEntry"],
      "components.div.children.formwizardThirdStep.children.fsBillObjectionDetail.children.cardContent.children.safFormCDetailitleSeparately1.children.hearingOfficer.props.value",
      ""
    );

    let decidedav = get(
      state.screenConfiguration.screenConfig["fsBillEntry"],
      "components.div.children.formwizardThirdStep.children.fsBillObjectionDetail.children.cardContent.children.safFormCDetailitleSeparately1.children.decidedav.props.value",
      ""
    );

    //    if(nextHearingDate != "" && nextHearingTime != "" && hearingOfficer != "" && decidedav != "")

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

export const submitHandeler = async(state, dispatch)=>{
  alert("Hey");
  let requestBody = state.screenConfiguration.preparedFinalObject.fsBill;
    
      try {
        let payload = null;
        payload = await httpRequest(
          "post",
          "/property-services/property/_createHearing",
          "_search",
          [],
          requestBody
        );
        console.log("payload==", payload);
        if (payload.status === "Successful") {
          alert("New Record Successfully Saved");
        }
        if (payload.status === "Failed") {
          alert("Error occurred, please try again.");
        }
       } catch (e) {
        console.log(e);
      }
};

export const callBackForSubmit = async (state, dispatch) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["fsBillEntry"],
    "components.div.children.stepper.props.activeStep",
    0
  );

  if (activeStep === 4) {
    changeStep(state, dispatch);
  }
};

export const changeStep = (
  state,
  dispatch,
  mode = "next",
  defaultActiveStep = -1
) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["fsBillEntry"],
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
  const actionDefination = [
    {
      path: "components.div.children.stepper.props",
      property: "activeStep",
      value: activeStep,
    },
    {
      path: "components.div.children.fsBillFooter.children.previousButton",
      property: "visible",
      value: isPreviousButtonVisible,
    },
    {
      path: "components.div.children.fsBillFooter.children.nextButton",
      property: "visible",
      value: isNextButtonVisible,
    },
    {
      path: "components.div.children.fsBillFooter.children.submitButton",
      property: "visible",
      value: isPayButtonVisible,
    },
  ];
  dispatchMultipleFieldChangeAction("fsBillEntry", actionDefination, dispatch);
  renderSteps(activeStep, dispatch);
};

export const renderSteps = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0:
      dispatchMultipleFieldChangeAction(
        "fsBillEntry",
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case 1:
      dispatchMultipleFieldChangeAction(
        "fsBillEntry",
        getActionDefinationForStepper(
          "components.div.children.formwizardSecondStep"
        ),
        dispatch
      );
      break;
    case 2:
      dispatchMultipleFieldChangeAction(
        "fsBillEntry",
        getActionDefinationForStepper(
          "components.div.children.formwizardThirdStep"
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        "fsBillEntry",
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

export const fsBillFooter = getCommonApplyFooter({
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
        labelName: "Generate FS Bill",
        labelKey: "Generate FS Bill",
      }),
    },
    onClickDefination: {
      action: "condition",
      callBack: submitHandeler,
    },
    visible: false,
  },
});
