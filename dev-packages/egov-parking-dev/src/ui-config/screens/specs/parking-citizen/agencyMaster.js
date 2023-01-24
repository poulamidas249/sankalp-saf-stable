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
import { searchResults } from "./agencySearchResources/searchResults";
import { httpRequest } from "../../../../ui-utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import "./index.css";

const header = getCommonHeader({
  labelName: "Agency Master",
  labelKey: "Agency Master",
});

export const submitApplication = (state, dispatch) => {
  dispatch(prepareFinalObject("typeOfForm", "New"));
  dispatch(setRoute(`/parking-citizen/newAgency?isNew=true`));
};

export const searchAgencyHandler = async (state, dispatch) => {
  let requestBody = state.screenConfiguration.preparedFinalObject.agencySearch;

  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/parking-services/viewAgency",
      "",
      [],
      requestBody
    );

    const agency = [payload] || [];
    const agencyTableData = agency.map((item) => {
      return {
        agencyCode: get(item, "agencyCode"),
        agencyName: get(item, "agencyName"),
        gstNum: get(item, "gstNum"),
      };
    });

    let data = agencyTableData.map((item) => ({
      ["Agent Code"]: item.agencyCode || "-",
      ["Agent Name"]: item.agencyName || "-",
      ["GST No."]: item.gstNum || "-",
    }));

    dispatch(prepareFinalObject("agencySearchResult", agency));
    dispatch(
      handleField(
        "agencyMaster",
        "components.div.children.searchResults",
        "props.data",
        data
      )
    );
    dispatch(
      handleField(
        "agencyMaster",
        "components.div.children.searchResults",
        "props.tableData",
        agencyTableData
      )
    );
    dispatch(
      handleField(
        "agencyMaster",
        "components.div.children.searchResults",
        "props.rows",
        agencyTableData.length
      )
    );

    showHideTable(true, dispatch);
  } catch (e) {
    console.log(e);
  }
};

const getMDMSAgencyData = async (action, state, dispatch) => {
  try {
    let payload = null;
    payload = await httpRequest(
      "get",
      "/parking-services/getAgencyListForAllocation",
      "_search",
      [],
      {}
    );

    let types = [];
    if (payload) {
      types = payload
        .filter((data) => {
          return data.moduleId === 1;
        })
        .map((item) => {
          return {
            id: item.agencyId,
            code: item.agencyName,
          };
        });
    }

    dispatch(
      prepareFinalObject("tenderMasterMdmsData.tenderMaster.agencyList", types)
    );
  } catch (e) {
    console.log(e);
  }
};

const agencyDropdown = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "agencyMaster.agencyCode",
  required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer",
    },
    label: {
      labelName: "agencyId",
      labelKey: "Agency Name",
    },

    placeholder: {
      labelName: "Select Agency Code",
      labelKey: "Select Agency Code",
    },
    sourceJsonPath: "tenderMasterMdmsData.tenderMaster.agencyList",
    labelsFromLocalisation: true,
    suggestions: [],
    fullwidth: true,
    required: true,
    isClearable: true,
    inputLabelProps: {
      shrink: true,
    },
  },

  gridDefination: {
    xs: 12,
    sm: 6,
  },
};

const agencyMaster = {
  uiFramework: "material-ui",
  name: "agencyMaster",
  beforeInitScreen: (action, state, dispatch) => {
    getMDMSAgencyData(action, state, dispatch);
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
                  labelKey: "New Record",
                }),
              },
              onClickDefination: {
                action: "condition",
                // path: "/parking-citizen/newAgency?isNew=true",
                callBack: submitApplication,
              },
            },
          },
        },

        areaContainer: getCommonContainer({
          // agencyCode: getTextField({
          //   gridDefination: {
          //     xs: 12,
          //     sm: 6,
          //   },
          //   label: {
          //     labelKey: "Agency",
          //   },
          //   placeholder: {
          //     labelKey: "Please Enter Agency",
          //   },
          //   required: true,
          //   visible: true,
          //   jsonPath: "agencySearch.agencyCode",
          // }),

          agencyDropdown: agencyDropdown,

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
                searchAgencyHandler(state, dispatch);
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
      "agencyMaster",
      "components.div.children.searchResults",
      "visible",
      booleanHideOrShow
    )
  );
};

export default agencyMaster;
