import {
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getCommonSubHeader,
  getLabel,
  getPattern,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId, getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import { searchApiCall } from "./function";

export const rateSearchCard = getCommonCard({
  subheader: getCommonSubHeader({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "Provide at least one parameter to search for an application",
  }),
  searchContainer: getCommonContainer({
    parkingId: getTextField({
      label: {
        labelName: "Parking Id",
        labelKey: "Parking Id",
      },
      placeholder: {
        labelName: "Enter Parking Id",
        labelKey: "Enter Parking Id",
      },
      required: false,
      visible: true,
      jsonPath: "searchScreen.parkingId",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
    }),
    tenderId: getTextField({
      label: {
        labelName: "Tender Id",
        labelKey: "Tender Id",
      },
      placeholder: {
        labelName: "Enter Tender Id",
        labelKey: "Enter Tender Id",
      },
      required: false,
      visible: true,
      jsonPath: "searchScreen.tenderId",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
    }),
    agencyId: getTextField({
      label: {
        labelName: "Agency Id",
        labelKey: "Agency Id",
      },
      placeholder: {
        labelName: "Enter Agency Id",
        labelKey: "Enter Agency Id",
      },
      required: false,
      visible: true,
      jsonPath: "searchScreen.agencyId",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
    }),
  }),
  buttonContainer: getCommonContainer({
    firstCont: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      props: {
        variant: "contained",
        style: {
          marginTop: "18px",
        },
      },
    },
    searchButton: {
      componentPath: "Button",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      props: {
        variant: "contained",
        style: {
          color: "white",
          backgroundColor: "#696969",
          borderRadius: "2px",
          width: window.innerWidth > 480 ? "42%" : "100%",
          height: "48px",
        },
      },
      children: {
        buttonLabel: getLabel({
          labelName: "SEARCH",
          labelKey: "SEARCH",
        }),
      },
      onClickDefination: {
        action: "condition",
        callBack: (state, dispatch) => {
          searchApiCall(state, dispatch);
        },
      },
    },
  }),
  lastCont: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    gridDefination: {
      xs: 12,
      sm: 4,
    },
  },
});
