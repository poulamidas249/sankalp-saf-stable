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
import "./index.css";

const header = getCommonHeader({
  labelName: "Agency Master",
  labelKey: "Agency Master",
});

export const submitApplication = () => {
  alert("submit data");
};

export const searchAgencyHandler = async (state, dispatch) => {
  let requestBody = state.screenConfiguration.preparedFinalObject.agencySearch;

  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/advertising-services/viewAgency",
      "",
      [],
      requestBody
    );

    const agency = [payload] || [];
    const agencyTableData = agency.map((item) => {
      return {
        agencyCode: get(item, "agencyCode"),
        agencyName: get(item, "agencyName"),
        regNum: get(item, "regNum"),
      };
    });

    let data = agencyTableData.map((item) => ({
      ["Agent Code"]: item.agencyCode || "-",
      ["Agent Name"]: item.agencyName || "-",
      ["Registration No."]: item.regNum || "-",
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

const agencyMaster = {
  uiFramework: "material-ui",
  name: "agencyMaster",
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
                action: "page_change",
                path: "/advertising-citizen/newAgency?isNew=true",
                callBack: submitApplication,
              },
            },
          },
        },

        areaContainer: getCommonContainer({
          agencyCode: getTextField({
            gridDefination: {
              xs: 12,
              sm: 6,
            },
            label: {
              labelKey: "Agency",
            },
            placeholder: {
              labelKey: "Please Enter Agency",
            },
            required: true,
            visible: true,
            jsonPath: "agencySearch.agencyCode",
          }),
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
