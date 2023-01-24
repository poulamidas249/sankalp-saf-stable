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
import { rateSearchResults } from "./rateResources/rateSearchResults";
import { httpRequest } from "../../../../ui-utils";
import "./index.css";

const header = getCommonHeader({
  labelName: "Rate Master",
  labelKey: "Rate Master",
});

export const submitApplication = () => {
  alert("submit data");
};

export const searchRateHandler = async (state, dispatch) => {
  let requestBody = state.screenConfiguration.preparedFinalObject.rateSearch;

  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/parking-services/viewRate",
      "",
      [],
      requestBody
    );

    const rate = [payload] || [];
    // const agencyTableData = rate.map((item) => {
    //   return {
    //     rateCode: get(item, "rateCode"),
    //     agencyName: get(item, "agencyName"),
    //     regNum: get(item, "regNum"),
    //   };
    // });

    // let data = agencyTableData.map((item) => ({
    //   ["Agent Code"]: item.rateCode || "-",
    //   ["Agent Name"]: item.agencyName || "-",
    //   ["Registration No."]: item.regNum || "-",
    // }));

    // dispatch(prepareFinalObject("agencySearchResult", agency));

    // dispatch(
    //   handleField(
    //     "rateMaster",
    //     "components.div.children.searchResults",
    //     "props.data",
    //     data
    //   )
    // );
    // dispatch(
    //   handleField(
    //     "rateMaster",
    //     "components.div.children.searchResults",
    //     "props.tableData",
    //     agencyTableData
    //   )
    // );
    // dispatch(
    //   handleField(
    //     "rateMaster",
    //     "components.div.children.searchResults",
    //     "props.rows",
    //     agencyTableData.length
    //   )
    // );

    // showHideTable(true, dispatch);
  } catch (e) {
    console.log(e);
  }
};

const rateMaster = {
  uiFramework: "material-ui",
  name: "rateMaster",
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
                path: "/parking-citizen/newRate?isNew=true",
                callBack: submitApplication,
              },
            },
          },
        },

        areaContainer: getCommonContainer({
          rateCode: getTextField({
            gridDefination: {
              xs: 12,
              sm: 6,
            },
            label: {
              labelKey: "Rate code",
            },
            placeholder: {
              labelKey: "Please Enter Rate Code",
            },
            required: true,
            visible: true,
            jsonPath: "rateSearch.rateCode",
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
                searchRateHandler(state, dispatch);
              },
            },
          },
        }),
        break: getBreak(),
        rateSearchResults,
      },
    },
  },
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "rateMaster",
      "components.div.children.searchResults",
      "visible",
      booleanHideOrShow
    )
  );
};

export default rateMaster;
