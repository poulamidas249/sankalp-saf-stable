import Step from "@material-ui/core/Step";
import store from "ui-redux/store";
import { get } from "lodash";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Button } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import React from "react";
import "./index.css";

const theme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      completed: {
        color: "#39CB74!important",
      },
      active: {
        color: "#fe7a51!important",
      },
    },
  },
});

const ptSteps = [
  "PT_PROPERTY_ADDRESS_SUB_HEADER",
  "PT_OWNERSHIP_INFO_SUB_HEADER",
  "Land/Building Info",
  "Registration Details",
  "Valuation & Tax Details",
  "PT_COMMON_SUMMARY",
];

const WizardComponentInspection = ({
  downloadAcknowledgementForm,
  content,
  header,
  footer,
  onTabClick,
  selected,
  closeDialogue,
  dialogueOpen,
  onPayButtonClick,
  formValidIndexArray,
  updateIndex,
  backLabel,
  nextLabel,
  history,
  nextButtonEnabled,
}) => {
  const state = store.getState();

  const isSummaryShow = get(
    state.screenConfiguration,
    "preparedFinalObject.showSummary",
    ""
  );

  selected == 6 || selected == 8
    ? selected == 6
      ? (backLabel = "PT_APPLICATION_BUTTON_DOWN_CONF")
      : (backLabel = "PT_ASSESS_PAY_FOR_NEW_YEAR")
    : backLabel;
  return (
    <div className={`wizard-cont active-step-${selected}`}>
      {selected < 6 && isSummaryShow == false && (
        <div>
          <MuiThemeProvider theme={theme}>
            <Stepper
              activeStep={selected}
              alternativeLabel
              style={{
                background: "inherit",
              }}
              className="stepper-container"
            >
              {ptSteps.map((label) => {
                return (
                  <Step key={label}>
                    <StepLabel>
                      <Label label={label} />
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </MuiThemeProvider>
        </div>
      )}
      {/* {selected < 5 && <div>{header}</div>} */}
      <div className="wizard-content clearfix">{content}</div>
      {footer}
      <div
        id="tax-wizard-buttons"
        className="wizard-footer col-sm-10"
        style={{ textAlign: "right" }}
      >
        <div className="button-container col-xs-10" style={{ float: "right" }}>
          {selected != 6 && selected != 5 && (
            <Button
              label={
                <Label buttonLabel={true} label={backLabel} color="#fe7a51" />
              }
              onClick={() => {
                selected - 1 === -1
                  ? history.push("/pt-inspection/capturedProposedAV")
                  : onTabClick(selected - 1);
              }}
              labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fe7a51" }}
              buttonStyle={{ border: "1px solid #fe7a51" }}
              style={{ marginRight: 45, width: "30%" }}
            />
          )}
          {/* {selected == 4 && <Button
            label={<Label buttonLabel={true} label={backLabel} color="#fe7a51" />}
            onClick={() => {
              downloadAcknowledgementForm();
            }}
            labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fe7a51" }}
            buttonStyle={{ border: "1px solid #fe7a51" }}
            style={{ marginRight: 45, width: "30%" }}
          />} */}
          <Button
            label={<Label buttonLabel={true} label={nextLabel} color="#fff" />}
            style={{ width: "30%" }}
            backgroundColor="#fe7a51"
            labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fff" }}
            buttonStyle={{ border: 0 }}
            // onClick={
            //   selected === 4
            //     ? onPayButtonClick
            //     : () => {
            //         updateIndex(selected + 1);
            //       }
            // }
            onClick={
              selected === 8 || selected === 5
                ? onPayButtonClick
                : () => {
                    updateIndex(selected + 1);
                  }
            }
            disabled={!nextButtonEnabled}
          />
        </div>
      </div>
      {/*<Declaration open={dialogueOpen} closeDialogue={closeDialogue} selected={selected} updateIndex={updateIndex}/>*/}
    </div>
  );
};

export default WizardComponentInspection;
