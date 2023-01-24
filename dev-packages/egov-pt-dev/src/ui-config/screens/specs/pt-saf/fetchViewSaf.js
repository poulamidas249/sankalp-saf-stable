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
import { searchSafResult } from "./fetchViewSearchTable";

export const searchSafHandler = async (state, dispatch) => {
  const safDetails = [
    {
      akgNo: "002/03/2017-2018/0000034",
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
    ["Acknowledgement No"]: item.akgNo || "-",
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
      "fetchViewSaf",
      "components.div.children.searchSafResult",
      "props.data",
      data
    )
  );
  dispatch(
    handleField(
      "fetchViewSaf",
      "components.div.children.searchSafResult",
      "props.tableData",
      safTableData
    )
  );
  dispatch(
    handleField(
      "fetchViewSaf",
      "components.div.children.searchSafResult",
      "props.rows",
      safTableData.length
    )
  );

  showHideTable(true, dispatch);
};

const header = getCommonHeader({
  labelName: "UAA - Search and View Self Assessment Form",
});

const subHeader = getCommonSubHeader({
  labelName:
    "Provide at least one non-mandatory parameter to search for an application",
});

const fetchViewSaf = {
  uiFramework: "material-ui",
  name: "fetchViewSaf",

  beforeInitScreen: (action, state, dispatch) => {
    dispatch(
      prepareFinalObject("fetchViewSearch", {
        acknowledgementNo: "",
        assesseNo: "",
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
        id: "fetchViewSaf",
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
            acknowledgementNo: getTextField({
              label: {
                labelName: "Acknowledgement No.",
                labelKey: "Acknowledgement No.",
              },
              placeholder: {
                labelName: "Enter Acknowledgement No.",
                labelKey: "Enter Acknowledgement No.",
              },
              gridDefination: {
                xs: 12,
                sm: 6,
              },
              jsonpath: "fetchViewForm.acknowledgementNo",
            }),

            assesseNo: getTextField({
              label: {
                labelName: "Assesse No.",
                labelKey: "Assesse No.",
              },
              placeholder: {
                labelName: "Enter Assesse No.",
                labelKey: "Enter Assesse No.",
              },
              gridDefination: {
                xs: 12,
                sm: 6,
              },
              jsonpath: "fetchViewForm.assesseNo",
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
                    callBack: searchSafHandler,
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
        searchSafResult,
      },
    },
  },
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "fetchViewSaf",
      "components.div.children.searchSafResult",
      "visible",
      booleanHideOrShow
    )
  );
};

export default fetchViewSaf;
