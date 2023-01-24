import {
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getCommonSubHeader,
  getLabel,
  getBreak,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { searchDetailsTable } from "./searchDetails";
import get from "lodash/get";
import {
  toggleSnackbar,
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { assesseeSearchHearingNotice } from "./functions";

export const resetFields = (state, dispatch) => {
  if (process.env.REACT_APP_NAME == "Employee") {
    dispatch(
      handleField(
        "hearingNoticeSearch",
        "components.div.children.searchNotice.children.cardContent.children.searchNoticeContainer.children.assesseeNo",
        "props.value",
        ""
      )
    );

    dispatch(prepareFinalObject("hearingNoticeSearch.assesseeNo", ""));

    dispatch(
      handleField(
        "hearingNoticeSearch",
        "components.div.children.searchNotice.children.cardContent.children.searchNoticeContainer.children.wardNo",
        "props.value",
        ""
      )
    );

    dispatch(prepareFinalObject("hearingNoticeSearch.wardNo", ""));

    dispatch(
      handleField(
        "hearingNoticeSearch",
        "components.div.children.searchNotice.children.cardContent.children.searchNoticeContainer.children.proposedQtr",
        "props.value",
        ""
      )
    );

    dispatch(prepareFinalObject("hearingNoticeSearch.proposedQtr", ""));

    dispatch(
      handleField(
        "hearingNoticeSearch",
        "components.div.children.searchDetailsTable",
        "visible",
        false,
      )
    );
      }
  } 

 
const subheader = getCommonSubHeader({
  labelName: "Please provide at least one non-mandatory field to search.",
});

export const searchHearingNoticeHandler = async (state, dispatch) => {
  let assesseeNo = get(
    state.screenConfiguration.preparedFinalObject,
    "hearingNoticeSearch.assesseeNo"
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
    assesseeSearchHearingNotice(state, dispatch);
  }
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "hearingNoticeSearch",

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
          labelName: "Hearing Notice",
          labelKey: "Hearing Notice",
          gridDefination: {
            xs: 12,
            sm: 12,
          },
        }),

        searchNotice: getCommonCard({
          subheader: subheader,
          break: getBreak(),
          searchNoticeContainer: getCommonContainer({
            assesseeNo: getTextField({
              label: {
                labelKey: "Assessee No.",
              },
              placeholder: {
                labelKey: "Assessee No",
              },
              required: false,
              visible: true,
              jsonPath: "hearingNoticeSearch.assesseeNo",
              gridDefination: {
                xs: 12,
                sm: 4,
              },
            }),

            wardNo: getTextField({
              label: {
                labelKey: "Ward No",
              },
              placeholder: {
                labelKey: "Ward No",
              },
              required: false,
              visible: true,
              jsonPath: "hearingNoticeSearch.wardNo",

              gridDefination: {
                xs: 12,
                sm: 4,
              },
            }),

            proposedQtr: getTextField({
              label: {
                labelKey: "Proposed Quarter",
              },
              placeholder: {
                labelKey: "Proposed Quarter",
              },
              required: false,
              visible: true,
              jsonPath: "hearingNoticeSearch.proposedQtr",

              gridDefination: {
                xs: 12,
                sm: 4,
              },
            }),
          }),

          buttonContainer: getCommonContainer({
            searchButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right"
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
                callBack: searchHearingNoticeHandler,
              },
            },
            resetButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "left"
              },
              props: {
                variant: "outlined",
                style: {
                  color: "black",
                  borderColor: "black",
                  width: "220px",
                  height: "48px",
                  margin: "8px",
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
                callBack: resetFields,
              },
            },
           
          }),
        }),
        break: getBreak(),
        searchDetailsTable,
      },
    },
  },
};

export default screenConfig;
