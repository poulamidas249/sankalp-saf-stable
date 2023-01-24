import {
  getBreak,
  getCommonContainer,
  getCommonHeader,
  getTextField,
  getCommonCard,
  getCommonSubHeader,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
// import { httpRequest } from "../../../../ui-utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { applicationSearch } from "./functions";
import { searchSafResultForApply } from "./SearchTableForApply"
export const searchSafHandler = async (state, dispatch) => {

  const asseseData = get(
    state.screenConfiguration.preparedFinalObject,
    "asseseData.asseseNumber",
    ""
  );
  if( !asseseData) return
  const safDetails = [
    {
      akgNo: asseseData,
      quarter: "1/2017",
      wardNo: "002",
      blockId: "2/1",
      streetName: "D GUPTA LANE",
      sourceType: "Portal",
      statusChangeDate: "2017-12-19 14:05:47:0",
    },
  ];

  const safTableData = safDetails.map((item) => {
    return {
      akgNo: get(item, "akgNo"),
      quarter: get(item, "quarter"),
      wardNo: get(item, "wardNo"),
      blockId: get(item, "blockId"),
      streetName: get(item, "streetName"),
      sourceType: get(item, "sourceType"),
      statusChangeDate: get(item, "statusChangeDate"),
    };
  });

  let data = safTableData.map((item) => ({
    ["Assesse No"]: item.akgNo || "-",
    ["Quarter"]: item.quarter || "-",
    ["Ward No"]: item.wardNo || "-",
    ["Block Id"]: item.blockId || "-",
    ["Street Name"]: item.streetName || "-",
    ["Source Type"]: item.sourceType || "-",
    ["Status Change Date"]: item.statusChangeDate || "-",
  }));

  dispatch(prepareFinalObject("safSearchResult", safDetails));

  dispatch(
    handleField(
      "search",
      "components.div.children.searchSafResultForApply",
      "props.data",
      data
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.searchSafResultForApply",
      "props.tableData",
      safTableData
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.searchSafResultForApply",
      "props.rows",
      safTableData.length
    )
  );

  showHideTable(true, dispatch);
};

const header = getCommonHeader({
  labelName: "Apply for Self Assessment Form",
});

const subHeader = getCommonSubHeader({
  labelName:
    "Provide at least one non-mandatory parameter to search for an application",
});

const search = {
  uiFramework: "material-ui",
  name: "search",

  beforeInitScreen: (action, state, dispatch) => {


    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",

      props: {
        className: "common-div-css",
        id: "search",
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
          //   header: header,
          subHeader: subHeader,
          break: getBreak(),
          safContainer: getCommonContainer({
            assesseNo: getTextField({
              label: {
                labelName: "Assesse No.",
                labelKey: "Assesse No.",
              },
              props: {
                className: "applicant-details-error"
              },
              placeholder: {
                labelName: "Enter Assesse No.",
                labelKey: "Enter Assesse No.",
              },
              gridDefination: {
                xs: 12,
                sm: 6,
              },
              jsonPath: "asseseData.asseseNumber"
            }),
            break: getBreak(),

            button: getCommonContainer({
              buttonContainer: getCommonContainer({
                resetButton: {
                  componentPath: "Button",
                  gridDefination: {
                    xs: 12,
                    sm: 6,
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
                    callBack: (state, dispatch) => {
                      dispatch(
                        handleField(
                          "search",
                          "components.div.children.searchCard.children.cardContent.children.safContainer.children.assesseNo",
                          "props.value",
                          ""
                        )
                      );
                      dispatch(prepareFinalObject("asseseData.asseseNumber", null))
                      dispatch(
                        handleField(
                          "search",
                          "components.div.children.searchSafResultForApply",
                          "visible",
                          false
                        )
                      );
                    },
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
                    callBack: searchSafHandler,
                  },
                },
              }),
            }),
          }),
        }),

        break: getBreak(),
        searchSafResultForApply,
      },
    },
  },
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "search",
      "components.div.children.searchSafResultForApply",
      "visible",
      booleanHideOrShow
    )
  );
};

export default search;
