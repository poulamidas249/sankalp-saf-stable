import { getBreak, getCommonHeader, getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject, unMountScreen } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getQueryArg, getRequiredDocData, showHideAdhocPopup } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import set from "lodash/set";
import { cityChange, resetFields } from "./safMutation-methods";
import propertySearchTabs from "./property-search-tabs";
import { searchApplicationTable, searchPropertyTable } from "./searchResource/safSearchResult";
import { searchPropertyDetails, searchApplicationDetails } from "./safMutation-methods";
const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;
const tenant = getTenantId();

//console.log(captureMutationDetails);

const getMDMSData = async (action, dispatch) => {
  const moduleDetails = [
    {
      moduleName: "PropertyTax",
      masterDetails: [
        { name: "Documents" }
      ]
    },
    {
      moduleName: "tenant",
      masterDetails: [
        {
          name: "tenants"
        }, { name: "citymodule" }
      ]
    }
  ]

  try {
    getRequiredDocData(action, dispatch, moduleDetails).then((payload) => {
      if (process.env.REACT_APP_NAME != "Citizen") {
        dispatch(
          prepareFinalObject(
            "ptSearchScreen.tenantId",
            tenant
          )
        );
        set(action.screenConfig,
          "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ulbCity.props.isDisabled",
          true
        );
        set(action.screenConfig,
          "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ulbCity.isDisabled",
          true
        );
        cityChange(dispatch, tenant)
      }
      const tenants = get(payload, 'payload.MdmsRes.tenant.tenants', []).sort((t1, t2) => t1.code.localeCompare(t2.code))
      dispatch(prepareFinalObject("searchScreenMdmsData.tenant.tenants", tenants));
    })
    
  } catch (e) {
    console.log(e);
  }
};

const header = getCommonHeader({
  labelName: "UAA-Search And View Self Assessment Form",
  labelKey: "UAA-Search And View Self Assessment Form"
});
const screenConfig = {
  uiFramework: "material-ui",
  name: "safSearch",

  beforeInitScreen: (action, state, dispatch) => {
    resetFields(state, dispatch);
    dispatch(unMountScreen("search-preview"));
    getMDMSData(action, dispatch);
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6
              },
              ...header
            },
          }
        },
        //propertySearchTabs,
        searchApplicationDetails,
        breakAfterSearch: getBreak(),
        searchApplicationTable

      }
    },
    adhocDialog: {
      uiFramework: "custom-containers",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "propertySearch"
      },
      children: {
        popup: {}
      }
    }
  }
};

export default screenConfig;

