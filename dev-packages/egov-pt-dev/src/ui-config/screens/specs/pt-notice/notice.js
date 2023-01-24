import {
  getDateField,
  getBreak,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabelWithValue,
  getSelectField,
  getTimeField,
  getCommonCard,
  getCommonHeader,
  getCommonParagraph,
  getLabel,
  getPattern,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";

export const submitApplication = async (state, dispatch) => {
  alert("Data Saved !!");
};

export const backApplication = async (state, dispatch) => {
  dispatch(setRoute(`/pt-mutation/rateCardDeceidedDetail`));
};

const assesseeNo = getTextField({
  label: {
    labelKey: "Assessee No.",
  },

  placeholder: "Please Enter Assessee No.",
  jsonPath: "notice.assesseeNo",
  required: true,
  props: {
    style: {
      width: "90%",
      margin: "0px 29px 0px 0px",
    },
    labelsFromLocalisation: true,
    suggestions: [],
    fullwidth: true,
    isClearable: true,
    inputLabelProps: {
      shrink: true,
    },
  },
  afterFieldChange: (action, state, dispatch) => {
    console.log("Change in notice no => ", action);
    console.log("Dispatch => ", dispatch);
  },

  gridDefination: {
    xs: 12,
    sm: 4,
  },
});

const noticeDate = getTextField({
  label: {
    labelKey: "Notice Date",
  },
  placeholder: "Please Enter Notice Date",
  jsonPath: "notice.noticeDate",
  required: true,
  props: {
    style: {
      width: "90%",
      margin: "0px 29px 0px 0px",
    },
    labelsFromLocalisation: true,
    suggestions: [],
    fullwidth: true,
    required: true,
    isClearable: true,
    inputLabelProps: {
      shrink: true,
    },
  },
  afterFieldChange: (action, state, dispatch) => {
    console.log("Change in notice date => ", action);
    console.log("Dispatch => ", dispatch);
  },

  gridDefination: {
    xs: 12,
    sm: 4,
  },
});

export const searchApplication = (state, dispatch) => {
  dispatch(
    prepareFinalObject(
      "notice.mailingArea",
      "Dilip Kumar Mandal, Ankit Apartment 166, Anenue south, 2nd Floor, Flat No. - 202, Kolkata - 700075"
    )
  );
  // dispatch(prepareFinalObject("notice.assesseeNo", "311030803843"));
  dispatch(prepareFinalObject("notice.noticeNo", "185/311098734538"));
  dispatch(prepareFinalObject("notice.noticeDate", "26/03/2022"));
  dispatch(prepareFinalObject("notice.premiseNo", "166 AVENUE SOUTH HEAD"));
  dispatch(prepareFinalObject("notice.proposedAV", "9220"));
  dispatch(prepareFinalObject("notice.wef", "4/2016"));
};
export const reestApplication = (state, dispatch) => {
  dispatch(prepareFinalObject("notice.mailingArea", "-"));
  dispatch(prepareFinalObject("notice.noticeNo", "-"));
  dispatch(prepareFinalObject("notice.noticeDate", "-"));
  dispatch(prepareFinalObject("notice.premiseNo", "-"));
  dispatch(prepareFinalObject("notice.proposedAV", "-"));
  dispatch(prepareFinalObject("notice.wef", "-"));
};

export const viewButtonHandler = (state, dispatch) => {
  console.log("View button handler");
};

const notice = {
  uiFramework: "material-ui",
  name: "notice",
  beforeInitScreen: (action, state, dispatch) => {
    dispatch(prepareFinalObject("notice.mailingArea", "-"));
    dispatch(prepareFinalObject("notice.noticeNo", "-"));
    dispatch(prepareFinalObject("notice.noticeDate", "-"));
    dispatch(prepareFinalObject("notice.premiseNo", "-"));
    dispatch(prepareFinalObject("notice.proposedAV", "-"));
    dispatch(prepareFinalObject("notice.wef", "-"));

    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search",
      },

      children: {
        safFormCDetailHeaderC: getCommonHeader({
          labelName: "Notice",
          labelKey: "Notice",
          gridDefination: {
            xs: 12,
            sm: 12,
          },
          props: {
            style: {
              textAlign: "center",
              fontWeight: "bold",
            },
          },
        }),

        noticeEnterArea: getCommonCard({
          noticeNoContainer: getCommonContainer({
            assesseeNo: assesseeNo,
            searchButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 2,
              },
              props: {
                variant: "contained",
                style: {
                  color: "white",
                  margin: "8px",
                  backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
                  borderRadius: "2px",
                  width: "80%",
                  height: "38px",
                  float: "left",
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
                callBack: searchApplication,
              },
            },
            resetButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 2,
              },
              props: {
                variant: "contained",
                style: {
                  color: "white",
                  margin: "8px",
                  backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
                  borderRadius: "2px",
                  width: "80%",
                  height: "38px",
                  float: "left",
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
                callBack: reestApplication,
              },
            },
          }),
        }),

        safFormCDetailC2: getCommonGrayCard({
          firstRowContainer: getCommonContainer({
            noticeNo: getLabelWithValue(
              {
                labelName: "Notice No",
                labelKey: "Notice No",
                props: {
                  style: {
                    width: "90%",
                    height: "37px",
                    margin: "0px 29px 0px 0px",
                  },
                },
                gridDefination: {
                  xs: 12,
                  sm: 4,
                },
              },
              {
                jsonPath: "notice.noticeNo",
              }
            ),

            noticeDate: getLabelWithValue(
              {
                labelName: "Notice Date",
                labelKey: "Notice Date",
                props: {
                  style: {
                    width: "90%",
                    height: "37px",
                    margin: "0px 29px 0px 0px",
                  },
                },
                gridDefination: {
                  xs: 12,
                  sm: 4,
                },
              },
              {
                jsonPath: "notice.noticeDate",
              }
            ),

            mailingArea: getLabelWithValue(
              {
                labelName: "Mailing Area",
                labelKey: "Mailing Area",
                props: {
                  style: {
                    width: "100%",
                    height: "37px",
                    margin: "0px 29px 0px 0px",
                  },
                },

                gridDefination: {
                  xs: 12,
                  sm: 4,
                },
              },
              {
                jsonPath: "notice.mailingArea",
              }
            ),
            viewButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 3,
              },
              props: {
                variant: "contained",
                style: {
                  color: "white",
                  margin: "8px",
                  backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
                  borderRadius: "2px",
                  width: "50%",
                  height: "38px",
                  float: "right",
                },
              },
              children: {
                buttonLabel: getLabel({
                  labelName: "View",
                  labelKey: "View",
                }),
              },
              onClickDefination: {
                action: "condition",
                callBack: viewButtonHandler,
              },
            },
          }),
          secondRowContainer: getCommonContainer({
            premiseNo: getLabelWithValue(
              {
                labelName: "Premise No./Hut No. and Street Name",
                labelKey: "Premise No./Hut No. and Street Name",
                props: {
                  style: {
                    width: "100%",
                    height: "37px",
                    margin: "0px 29px 0px 0px",
                  },
                },

                gridDefination: {
                  xs: 12,
                  sm: 12,
                },
              },
              {
                jsonPath: "notice.premiseNo",
              }
            ),
          }),
          thirdRowContainer: getCommonContainer({
            proposedAV: getLabelWithValue(
              {
                labelName: "Proposed AV",
                labelKey: "Proposed AV",
                props: {
                  style: {
                    width: "100%",
                    height: "37px",
                    margin: "0px 29px 0px 0px",
                  },
                },

                gridDefination: {
                  xs: 12,
                  sm: 12,
                },
              },
              {
                jsonPath: "notice.proposedAV",
              }
            ),
            wef: getLabelWithValue(
              {
                labelName: "w.e.f",
                labelKey: "w.e.f",
                props: {
                  style: {
                    width: "100%",
                    height: "37px",
                    margin: "0px 29px 0px 0px",
                  },
                },

                gridDefination: {
                  xs: 12,
                  sm: 12,
                },
              },
              {
                jsonPath: "notice.wef",
              }
            ),
          }),
        }),
      },
    },
  },
};

export default notice;
