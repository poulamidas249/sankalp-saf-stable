import { getBreak, getCommonHeader, getLabel, getCommonCard, getCommonTitle, getCommonParagraph, getCommonContainer, getCommonSubHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject, unMountScreen } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getQueryArg, getRequiredDocData, showHideAdhocPopup } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import set from "lodash/set";
const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;
const tenant = getTenantId();

//console.log(captureMutationDetails);


const header = getCommonHeader({
  labelName: "Property Tax",
  labelKey: "PROPERTY_TAX"
});
const screenConfig = {
  uiFramework: "material-ui",
  name: "search",


  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search"
      },
      children: {
        searchCard: getCommonCard({
          subHeader: getCommonTitle({
            labelName: "Search Property",
            labelKey: "SEARCH_PROPERTY"
          }),

          subParagraph: getCommonParagraph({
            labelName: "Provide at least one non-mandatory parameter to search for an application",
            labelKey: "PT_HOME_SEARCH_RESULTS_DESC"
          }),
          wardContainer: getCommonContainer({
            ward: {
              uiFramework: "custom-containers-local",
              moduleName: "egov-pt",
              componentPath: "AutosuggestContainer",
              props: {
                className: "autocomplete-dropdown",
                suggestions: [],
                label: {
                  labelName: "Ward",
                  labelKey: "Ward"
                },
                placeholder: {
                  labelName: "Select Ward",
                  labelKey: "Select Ward"
                },
                localePrefix: {
                  moduleName: "TENANT",
                  masterName: "TENANTS"
                },
                jsonPath: "ptSearchScreen.tenantId",
                sourceJsonPath: "searchScreenMdmsData.tenant.tenants",
                labelsFromLocalisation: true,
                required: true,
                disabled: process.env.REACT_APP_NAME === "Citizen" ? false : true,
                inputLabelProps: {
                  shrink: true
                }
              },
              required: true,
              jsonPath: "ptSearchScreen.tenantId",
              sourceJsonPath: "searchScreenMdmsData.tenant.tenants",
              gridDefination: {
                xs: 12,
                sm: 4
              },
              beforeFieldChange: async (action, state, dispatch) => {

              }
            },


          }),
          button: getCommonContainer({
            buttonContainer: getCommonContainer({
              resetButton: {
                componentPath: "Button",
                gridDefination: {
                  xs: 12,
                  sm: 6
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
                    float: "right"
                  }
                },
                children: {
                  buttonLabel: getLabel({
                    labelName: "Reset",
                    labelKey: "Reset"
                  })
                },
                onClickDefination: {
                  action: "condition",
                  callBack: () => { alert('hi') }
                }
              },
              searchButton: {
                componentPath: "Button",
                gridDefination: {
                  xs: 12,
                  sm: 6
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
                    height: "48px"
                  }
                },
                children: {
                  buttonLabel: getLabel({
                    labelName: "Search",
                    labelKey: "PT_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
                  })
                },
                onClickDefination: {
                  action: "condition",
                  callBack: () => { alert('hi') }
                }
              }
            })
          })
        })
      }
    }
  }
};

export default screenConfig;

