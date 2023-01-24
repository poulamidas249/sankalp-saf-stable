import {
  getBreak,
  getCommonContainer,
  getCommonHeader,
  getTextField,
  getCommonCard,
  getSelectField,
  getLabel,
  getCommonSubHeader,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import store from "../../../../ui-redux/store";
import get from "lodash/get";
import { httpRequest } from "../../../../ui-utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { responseCaptureResult } from "./responseCaptureTable";
import { responseCaptureHandler } from "../pt-mutation/functions";

export const applicationSearch = async (state, dispatch) => {
  let assesseeNo = get(
    state.screenConfiguration.preparedFinalObject,
    "responseCaptureScreen.assesseeNo"
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
    responseCaptureHandler(state, dispatch);
  }
};

export const resetFields = async (state, dispatch) => {
  dispatch(
    prepareFinalObject("responseCaptureScreen", {
      assesseeNo: "",
      proposedQuarterNo: "",
      proposedQuarterYr: "",
      wardNo: "",
    })
  );

  dispatch(
    handleField(
      "responseCaptureScreen",
      "components.div.children.responseCaptureResult",
      "props.data",
      []
    )
  );

  dispatch(
    handleField(
      "responseCaptureScreen",
      "components.div.children.responseCaptureResult",
      "props.tableData",
      []
    )
  );
  dispatch(
    handleField(
      "responseCaptureScreen",
      "components.div.children.responseCaptureResult",
      "props.rows",
      0
    )
  );
  dispatch(
    handleField(
      "responseCaptureScreen",
      "components.div.children.responseCaptureResult",
      "visible",
      false
    )
  );
  dispatch(
    handleField(
      "responseCaptureScreen",
      "components.div.children.objectionCapture",
      "visible",
      false
    )
  );
  dispatch(
    handleField(
      "responseCaptureScreen",
      "components.div.children.searchCard.children.cardContent.children.assesseeSearchContainer.children.assesseeNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "responseCaptureScreen",
      "components.div.children.searchCard.children.cardContent.children.assesseeSearchContainer.children.proposedQuarterNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "responseCaptureScreen",
      "components.div.children.searchCard.children.cardContent.children.assesseeSearchContainer.children.proposedQuarterYr",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "responseCaptureScreen",
      "components.div.children.searchCard.children.cardContent.children.assesseeSearchContainer.children.wardNo",
      "props.value",
      ""
    )
  );
};

export const acceptButtonHandler = async (state, dispatch) => {
  //  FIXME: call the api and redirect to the acknowledge page
  // const state = store.getState();
  let requestBody = {};
  let checkedData = get(
    state.screenConfiguration,
    "preparedFinalObject.checkedTableRow"
  );

  if (checkedData && checkedData.status == "checked") {
    let tableValue = checkedData.tableValue;
    let tmpAssesseeNo = "";
    if (tableValue && tableValue.rowData && tableValue.rowData.length > 0) {
      let tableData = get(
        state.screenConfiguration,
        "preparedFinalObject.responseCaptureSearchResult"
      );

      if (tableData && tableData.length > 0) {
        tableData.map((item) => {
          if (item.assesseeNo == tableValue.rowData[1]) {
            tmpAssesseeNo = item.tmpAssesseeNo;
          }
        });
      }
      // call api for data
      requestBody = {
        Property: {
          assesseeNo: tableValue.rowData[1],
          tmpAssesseeNo: tmpAssesseeNo,
          tenantId: "km.kolkata",
          creationReason: "UPDATE",
          notice: {
            actFlag: "OBJECTED",
            objectionReason: "NA",
          },
          hearing: {
            hearingStatus: "ACCEPTED",
          },
        },
      };
      try {
        const response = await httpRequest(
          "post",
          "property-services/property/_updateNotice",
          "_search",
          [],
          requestBody
        );

        dispatch(setRoute(`/pt-inspection/acknowledgementRessponse`));
        if (response) {
        }
      } catch (e) {
        console.log(e);
      }
    }
  } else {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please check the appropriate assessee",
          labelKey: "Please check the appropriate assessee",
        },
        "warning"
      )
    );
  }
};

export const objectionButtonHandler = async (state, dispatch) => {
  // const state = store.getState();
  let requestBody = {};
  let checkedData = get(
    state.screenConfiguration,
    "preparedFinalObject.checkedTableRow"
  );
  let reason = get(
    state.screenConfiguration,
    "preparedFinalObject.responseCaptureScreen.reason"
  );

  if (checkedData && checkedData.status == "checked") {
    let tmpAssesseeNo = "";
    // if there is no reason
    if (reason) {
      let tableValue = checkedData.tableValue;
      if (tableValue && tableValue.rowData && tableValue.rowData.length > 0) {
        let tableData = get(
          state.screenConfiguration,
          "preparedFinalObject.responseCaptureSearchResult"
        );

        if (tableData && tableData.length > 0) {
          tableData.map((item) => {
            if (item.assesseeNo == tableValue.rowData[1]) {
              tmpAssesseeNo = item.tmpAssesseeNo;
            }
          });
        }

        // call api for data
        requestBody = {
          Property: {
            assesseeNo: tableValue.rowData[1],
            tmpAssesseeNo: tmpAssesseeNo,
            tenantId: "km.kolkata",
            creationReason: "UPDATE",
            notice: {
              actFlag: "OBJECTED",
              objectionReason: reason,
            },
            hearing: {
              hearingStatus: "OBJECTED",
            },
          },
        };
      }

      try {
        const response = await httpRequest(
          "post",
          "property-services/property/_updateNotice",
          "_search",
          [],
          requestBody
        );

        console.log({ response });
      } catch (e) {
        console.log(e);
      }
    } else {
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "Please provide reason",
            labelKey: "Please provide reason",
          },
          "warning"
        )
      );
    }
  } else {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please check the appropriate assessee",
          labelKey: "Please check the appropriate assessee",
        },
        "warning"
      )
    );
  }
};

const header = getCommonHeader({
  labelName: "Assessee Response Capture Screen",
});

const subheader = getCommonSubHeader({
  labelName: "Please provide at least one non-mandatory field to search.",
});

const objectionCapture = {
  uiFramework: "custom-atoms",
  componentPath: "Container",
  visible: false,
  props: {
    style: {
      marginTop: "16px",
      marginBottom: "10px",
      width: "100%",
      textAlign: "left",
    },
  },

  children: {
    cardContainer: getCommonCard({
      capturedSection: getCommonContainer({
        reason: getTextField({
          label: {
            labelName: "Accept/Object Reason",
            labelKey: "Accept/Object Reason",
          },
          placeholder: {
            labelName: "Enter Reason",
            labelKey: "Enter Reason",
          },
          gridDefination: {
            xs: 12,
            sm: 12,
          },
          jsonPath: "responseCaptureScreen.reason",
        }),
        gridDefination: {
          xs: 12,
          sm: 12,
        },
      }),

      button: getCommonContainer({
        gridDefination: {
          xs: 12,
          sm: 12,
        },
        buttonContainer: getCommonContainer({
          acceptButton: {
            componentPath: "Button",
            gridDefination: {
              xs: 12,
              sm: 6,
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
                float: "right",
              },
            },
            children: {
              buttonLabel: getLabel({
                labelName: "Accept",
                labelKey: "Accept",
              }),
            },
            onClickDefination: {
              action: "condition",
              callBack: acceptButtonHandler,
            },
          },
          objection: {
            componentPath: "Button",
            gridDefination: {
              xs: 12,
              sm: 6,
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
                float: "center",
              },
            },
            children: {
              buttonLabel: getLabel({
                labelName: "Objection",
                labelKey: "Objection",
              }),
            },
            onClickDefination: {
              action: "condition",
              callBack: objectionButtonHandler,
            },
          },
        }),
      }),
    }),
  },
};

const responseCaptureScreen = {
  uiFramework: "material-ui",
  name: "responseCaptureScreen",

  beforeInitScreen: (action, state, dispatch) => {
    dispatch(
      prepareFinalObject("responseCapture", {
        assesseeNo: "",
        proposedQuarterNo: "",
        proposedQuarterYr: "",
        wardNo: "",
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
        id: "responseCaptureScreen",
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
                sm: 4,
              },
              require: true,
              errorMessage: "Enter Valid Assessee No.",
              jsonPath: "responseCaptureScreen.assesseeNo",
            }),

            wardNo: getTextField({
              label: {
                labelName: "Ward No.",
                labelKey: "Ward No.",
              },
              placeholder: {
                labelName: "Enter Ward",
                labelKey: "Enter Ward",
              },

              jsonPath: "responseCaptureScreen.wardNo",
              gridDefination: {
                xs: 12,
                sm: 4,
              },
            }),

            searchButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 2,
                // align: "center"
              },
              props: {
                variant: "contained",
                style: {
                  color: "white",
                  margin: "8px",
                  backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
                  borderRadius: "2px",
                  width: "195px",
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
            resetButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 2,
              },
              props: {
                variant: "outlined",
                style: {
                  color: "black",
                  borderColor: "black",
                  width: "195px",
                  height: "48px",
                  margin: "8px",
                  marginLeft: "18px",
                  // float: "left",
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
          }),

          // button: getCommonContainer({
          //   buttonContainer: getCommonContainer({
          //     resetButton: {
          //       componentPath: "Button",
          //       gridDefination: {
          //         xs: 6,
          //         sm: 3,
          //       },
          //       props: {
          //         variant: "outlined",
          //         style: {
          //           color: "black",
          //           borderColor: "black",
          //           width: "220px",
          //           height: "48px",
          //           margin: "8px",
          //           float: "right",
          //         },
          //       },
          //       children: {
          //         buttonLabel: getLabel({
          //           labelName: "Reset",
          //           labelKey: "Reset",
          //         }),
          //       },
          //       onClickDefination: {
          //         action: "condition",
          //         callBack: resetFields,
          //       },
          //     },

          //     searchButton: {
          //       componentPath: "Button",
          //       gridDefination: {
          //         xs: 12,
          //         sm: 3,
          //         // align: "center"
          //       },
          //       props: {
          //         variant: "contained",
          //         style: {
          //           color: "white",
          //           margin: "8px",
          //           backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
          //           borderRadius: "2px",
          //           width: "220px",
          //           height: "48px",
          //         },
          //       },
          //       children: {
          //         buttonLabel: getLabel({
          //           labelName: "Search",
          //           labelKey: "Search",
          //         }),
          //       },
          //       onClickDefination: {
          //         action: "condition",
          //         callBack: applicationSearch,
          //       },
          //     },
          //   }),
          // }),
        }),

        break: getBreak(),
        responseCaptureResult,
        objectionCapture,
      },
    },
  },
};

export default responseCaptureScreen;
