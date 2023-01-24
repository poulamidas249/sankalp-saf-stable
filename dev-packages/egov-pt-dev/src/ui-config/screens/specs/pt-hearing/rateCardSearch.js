import {
  getCommonCard,
  getCommonContainer, 
  getCommonHeader,
  getCommonSubHeader,
  getLabel,
  getBreak,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { rateCardSearchDetailsTable } from "./rateCardSearchDetails";
import get from "lodash/get";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { assesseeSearchRateCard } from "./functions";

export const resetFields = (state, dispatch) => {
  if (process.env.REACT_APP_NAME == "Employee") {
    dispatch(
      handleField(
        "rateCardSearch",
        "components.div.children.searchNotice.children.cardContent.children.searchNoticeContainer.children.assesseeNo",
        "props.value",
        ""
      )
    );

    dispatch(prepareFinalObject("rateCardSearch.assesseeNo", ""));

    dispatch(
      handleField(
        "rateCardSearch",
        "components.div.children.searchNotice.children.cardContent.children.searchNoticeContainer.children.wardNo",
        "props.value",
        ""
      )
    );

    dispatch(prepareFinalObject("rateCardSearch.wardNo", ""));
    dispatch(
      handleField(
        "rateCardSearch",
        "components.div.children.rateCardSearchDetailsTable",
        "visible",
        false,
      )
    );
      }
  } 

const subheader = getCommonSubHeader({ 
  labelName: "Please provide at least one non-mandatory field to search.",
});

export const rateCardSearchHandler = async (state, dispatch) => {
  let assesseeNo = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCardSearch.assesseeNo"
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
    assesseeSearchRateCard(state, dispatch);
  }
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "rateCardSearch",

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
          labelName: "Rate Card Search",
          labelKey: "Rate Card Search",
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
                labelKey: "Assessee No",
              },
              placeholder: {
                labelKey: "Assessee No",
              },
              required: false,
              visible: true,
              jsonPath: "rateCardSearch.assesseeNo",
              gridDefination: {
                xs: 12,
                sm: 3,
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
              jsonPath: "rateCardSearch.wardNo",

              gridDefination: {
                xs: 12,
                sm: 3,
              },
            }),

            searchButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 3,
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
                callBack: rateCardSearchHandler,
              },
            },

            resetButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 3,
                // align: "center"
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
            
          }),
        }),
        break: getBreak(),
        rateCardSearchDetailsTable,
      },
    },
  },
};

export default screenConfig;
