import {
  getBreak,
  getCommonContainer,
  getCommonHeader,
  getTextField,
  getCommonCard,
  getSelectField,
  getCommonSubHeader,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { searchAssesseeResult } from "./capturedAssesseeTable";
import { assesseeSearchInspection } from "../pt-mutation/functions";

export const applicationSearch = async (state, dispatch) => {
  let assesseeNo = get(
    state.screenConfiguration.preparedFinalObject,
    "capturedProposed.assesseeNo"
  );

  if (assesseeNo == "") {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill Assessee no.",
          labelKey: "Please fill Assessee no.",
        },
        "warning"
      )
    );
  } else {
    assesseeSearchInspection(state, dispatch);
  }
};

export const resetFields = async (state, dispatch) => {
  dispatch(
    prepareFinalObject("capturedProposed", {
      assesseeNo: "",
      proposedQuarterNo: "",
      proposedQuarterYr: "",
      grIr: "",
    })
  );
  dispatch(
    handleField(
      "capturedProposedAV",
      "components.div.children.searchAssesseeResult",
      "visible",
      false
    )
  );
};

const header = getCommonHeader({
  labelName: "Assessee Inspection (GR/IR)",
});

const subheader = getCommonSubHeader({
  labelName: "Please provide at least one non-mandatory field to search.",
});

const capturedProposedAV = {
  uiFramework: "material-ui",
  name: "capturedProposedAV",

  beforeInitScreen: (action, state, dispatch) => {
    dispatch(
      prepareFinalObject("capturedProposed", {
        assesseeNo: "",
        proposedQuarterNo: "",
        proposedQuarterYr: "",
        grIr: "",
      })
    );

    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css",
        id: "searchProposedAV",
      },

      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6,
              },
              ...header,
            },
          },
        },
        searchCard: getCommonCard({
          subheader: subheader,
          break: getBreak(),
          assesseeSearchContainer: getCommonContainer({
            assesseeNo: getTextField({
              label: {
                labelName: "Assessee No.",
                labelKey: "Assessee No.",
              },
              placeholder: {
                labelName: "Enter Assessee No.",
                labelKey: "Enter Assessee No.",
              },
              gridDefination: {
                xs: 12,
                sm: 3,
              },
              require: true,
              errorMessage: "Enter Valid Assessee No.",
              jsonPath: "capturedProposed.assesseeNo",
            }),

            proposedQuarterNo: getSelectField({
              label: {
                labelName: "Proposed Quarter No.",
                labelKey: "Proposed Quarter No.",
              },
              placeholder: {
                labelName: "Select",
                labelKey: "Select",
              },
              gridDefination: {
                xs: 12,
                sm: 3,
              },
              jsonPath: "capturedProposed.proposedQuarterNo",
              data: [
                {
                  code: "1",
                },
                {
                  code: "2",
                },
                {
                  code: "3",
                },
                {
                  code: "4",
                },
              ],
            }),

            proposedQuarterYr: getTextField({
              label: {
                labelName: "Proposed Quarter Year",
                labelKey: "Proposed Quarter Year",
              },
              placeholder: {
                labelName: "Enter Proposed Quarter Year",
                labelKey: "Enter Proposed Quarter Year",
              },
              gridDefination: {
                xs: 12,
                sm: 3,
              },
              errorMessage: "Enter valid year",
              errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
              pattern: "^[12][0-9]{3}$",
              jsonPath: "capturedProposed.proposedQuarterYr",
            }),

            grIr: getSelectField({
              label: {
                labelName: "GR/IR",
                labelKey: "GR/IR",
              },
              placeholder: {
                labelName: "Select",
                labelKey: "Select",
              },
              visible: true,
              jsonPath: "capturedProposed.grIr",
              gridDefination: {
                xs: 12,
                sm: 3,
              },
              data: [
                {
                  code: "IR",
                },
                {
                  code: "GR",
                },
              ],
            }),
          }),

          button: getCommonContainer({
            buttonContainer: getCommonContainer({
              resetButton: {
                componentPath: "Button",
                gridDefination: {
                  xs: 6,
                  sm: 6,
                },
                props: {
                  variant: "outlined",
                  style: {
                    color: "black",
                    borderColor: "black",
                    width: "220px",
                    height: "48px",
                    margin: "8px",
                    float: "right",
                  },
                },
                children: {
                  buttonLabel: getLabel({
                    labelName: "Reset",
                    labelKey: "Reset",
                  }),
                },
                onClickDefination: {
                  action: "condition",
                  callBack: resetFields,
                },
              },

              searchButton: {
                componentPath: "Button",
                gridDefination: {
                  xs: 12,
                  sm: 6,
                  // align: "center"
                },
                props: {
                  variant: "contained",
                  style: {
                    color: "white",
                    margin: "8px",
                    backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
                    borderRadius: "2px",
                    width: "220px",
                    height: "48px",
                  },
                },
                children: {
                  buttonLabel: getLabel({
                    labelName: "Search",
                    labelKey: "Search",
                  }),
                },
                onClickDefination: {
                  action: "condition",
                  callBack: applicationSearch,
                },
              },
            }),
          }),
        }),

        break: getBreak(),
        searchAssesseeResult,
      },
    },
  },
};

export default capturedProposedAV;
