import {
  getBreak,
  getCommonHeader,
  getCommonContainer,
  getLabel,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
// import { searchResults } from "./agencySearchResources/searchResults";
import { searchResults } from "./tenderTableData";
import { httpRequest } from "../../../../ui-utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import "./index.css";

const header = getCommonHeader({
  labelName: "Contract Info ",
  labelKey: "Contract Info ",
});

export const submitApplication = (state, dispatch) => {
  dispatch(prepareFinalObject("typeOfForm", "New"));
  dispatch(setRoute(`/parking-citizen/tenderMasterForm?isNew=true`));
};


export const searchtenderHandler = async (state, dispatch) => {
  let requestBody = state.screenConfiguration.preparedFinalObject.tenderSearch;
  

  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/parking-services/viewTender",
      "",
      [],
      requestBody
    );

    const tender = [payload] || [];

    const tenderTableData = tender.map((item) => {
      return {
        tenderCode: get(item, "tenderCode"),
        tenderName: get(item, "tenderName"),
        workOrderNum: get(item, "workOrderNum"),
      };
    });
    console.log("tenderTableData", tenderTableData);
    let data = tenderTableData.map((item) => ({
      ["Reference Code/Contract Code"]: item.tenderCode || "-",
      ["Contract Name"]: item.tenderName || "-",
      ["Work Order No"]: item.workOrderNum || "-"

    }));

    dispatch(prepareFinalObject("tenderSearchResult", tender));
    // dispatch(
    //   prepareFinalObject("searchScreenMdmsData.tenderSearchResponse", tender)
    // );

    dispatch(
      handleField(
        "tenderMaster",
        "components.div.children.searchResults",
        "props.data",
        data
      )
    );
    dispatch(
      handleField(
        "tenderMaster",
        "components.div.children.searchResults",
        "props.tableData",
        tenderTableData
      )
    );
    dispatch(
      handleField(
        "tenderMaster",
        "components.div.children.searchResults",
        "props.rows",
        tenderTableData.length
      )
    );

    showHideTable(true, dispatch);
  } catch (e) {
    console.log(e);
  }
};
const getMDMSTenderData = async (action, dispatch) => {
  try {
    let payload = null;
    payload = await httpRequest(
      "get",
      "/parking-services/getAllTender",
      "_search",
      [],
      {}
    );

    let types = [];
    if (payload) {
      types = payload.map((item) => {
        return {
          code: item.tenderCode,
        };
      });
    }
console.log("tenderPayLoad=>",payload)
    dispatch(
      prepareFinalObject(
        "areaAllocationMasterMdmsData.areaAllocation.tenderDetails",
        types
      )
    );
  } catch (e) {
    console.log(e);
  }
};
const tenderCode = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "tenderSearch.tenderCode",
  required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer",
    },
    label: {
      labelName: "tenderCode",
      labelKey: "Reference Code/Contract Code",
    },

    placeholder: {
      labelName: "Select Reference Code/Contract Code",
      labelKey: "Select Reference Code/Contract Code",
    },
    sourceJsonPath: "areaAllocationMasterMdmsData.areaAllocation.tenderDetails",
    labelsFromLocalisation: true,
    suggestions: [],
    fullwidth: true,
    required: true,
    isClearable: true,
    inputLabelProps: {
      shrink: true,
    },
  },
  // afterFieldChange: (action, state, dispatch) => {
  //   dispatch(
  //     handleField(
  //       "incentiveReport",
  //       `components.div.children.billSlabSearchForm.children.cardContent.children.cityNameContainer.children.dynamicMdms`,
  //       "props.screenTenantId",
  //       action.value
  //     )
  //   );
  // },
  gridDefination: {
    xs: 12,
    sm: 6,
  },
};
const tenderMaster = {
  uiFramework: "material-ui",
  name: "tenderMaster",
  beforeInitScreen: (action, state, dispatch) => {
    dispatch(
      prepareFinalObject("tenderSearch", {
        tenderCode: "",
      })
    );
    getMDMSTenderData(action, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css",
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
            newApplicationButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right",
              },

              props: {
                variant: "contained",
                color: "primary",
                style: {
                  color: "white",
                  borderRadius: "2px",
                  maxwidth: "220px",
                  width: "220px",
                  height: "48px",
                },
              },

              children: {
                plusIconInsideButton: {
                  uiFramework: "custom-atoms",
                  componentPath: "Icon",
                  props: {
                    iconName: "add",
                    style: {
                      fontSize: "24px",
                    },
                  },
                },

                buttonLabel: getLabel({
                  labelName: "New Record",
                  labelKey: " New Record",
                }),
              },
              onClickDefination: {
                action: "condition",
                //path: "/parking-citizen/tenderMasterForm?isNew=true",
                callBack: submitApplication,
              },
            },
          },
        },

        areaContainer: getCommonContainer({
          // tenderCode: getTextField({
          //   gridDefination: {
          //     xs: 12,
          //     sm: 6,
          //   },
          //   label: {
          //     labelKey: "Tender/Contract Code",
          //   },
          //   placeholder: {
          //     labelKey: "Please Enter Tender/Contract Code",
          //   },
          //   required: true,
          //   visible: true,
          //   jsonPath: "tenderSearch.tenderCode",
          // }),
          tenderCode:tenderCode,
          searchButton: {
            componentPath: "Button",
            gridDefination: {
              xs: 12,
              sm: 6,
              align: "right",
            },
            props: {
              variant: "contained",
              style: {
                color: "white",
                margin: "8px 0px",
                backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
                borderRadius: "2px",
                maxwidth: "220px",
                width: "220px",
                height: "48px",
                align: "right",
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

              callBack: (state, dispatch) => {
                searchtenderHandler(state, dispatch);
              },
            },
          },
        }),
        break: getBreak(),
        searchResults,
      },
    },
  },
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "tenderMaster",
      "components.div.children.searchResults",
      "visible",
      booleanHideOrShow
    )
  );
};

export default tenderMaster;
