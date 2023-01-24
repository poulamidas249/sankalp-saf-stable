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

export const parkingSearchCard = getCommonCard({
  subheader: getCommonSubHeader({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "Provide at least one parameter to search for an application",
  }),
  searchContainer: getCommonContainer({
    // FIXME: set the type to number only
    parkingCode: getTextField({
      label: {
        labelName: "Parking code",
        labelKey: "Parking code",
      },
      placeholder: {
        labelName: "Enter Parking Code",
        labelKey: "Enter Parking Code",
      },
      required: false,
      visible: true,
      jsonPath: "searchScreen.parkingCode",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
    }),

    searchButton: {
      componentPath: "Button",
      gridDefination: {
        xs: 12,
        sm: 6,
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
});
