import {
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getCommonSubHeader,
  getLabel,
  getPattern,
  getTextField,
  getBreak,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId, getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import { searchApiCall } from "./function";

// export const agencySearchCard = getCommonContainer({
//   searchContainer: getCommonContainer({
//     // FIXME: set the type to number only
//     agentCode: getTextField({
//       label: {
//         labelName: "Agent code",
//         labelKey: "Agent code",
//       },
//       placeholder: {
//         labelName: "Enter Agent Code",
//         labelKey: "Enter Agent Code",
//       },
//       required: false,
//       visible: true,
//       jsonPath: "searchScreen.agentCode",
//       gridDefination: {
//         xs: 12,
//         sm: 6,
//       },
//     }),

//     searchButton: {
//       componentPath: "Button",
//       gridDefination: {
//         xs: 12,
//         sm: 6,
//       },
//       props: {
//         variant: "contained",
//         style: {
//           color: "white",
//           backgroundColor: "#696969",
//           borderRadius: "2px",
//           width: window.innerWidth > 480 ? "42%" : "100%",
//           height: "48px",
//         },
//       },
//       children: {
//         buttonLabel: getLabel({
//           labelName: "SEARCH",
//           labelKey: "SEARCH",
//         }),
//       },
//       onClickDefination: {
//         action: "condition",
//         callBack: (state, dispatch) => {
//           searchApiCall(state, dispatch);
//         },
//       },
//     },
//   }),
// });
const header = getCommonHeader({
  labelName: "Agency Master",
  labelKey: "Agency Master",
});

export const submitApplication = () => {
  alert("submit data");
};

export const areaSearch = async (state, dispatch) => {
  searchApiCall(state, dispatch, 1);
};

export const agencySearchCard = {
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
                path: "/parking-citizen/newAgency",
                callBack: submitApplication,
              },
            },
          },
        },

        areaContainer: getCommonContainer({
          agentCode: getTextField({
            gridDefination: {
              xs: 12,
              sm: 4,
            },
            label: {
              labelKey: "Agent Code",
            },
            placeholder: {
              labelKey: "Please Enter Agent Code",
            },
            required: true,
            visible: true,
            jsonPath: "form.agentCode",
          }),

          searchButton: {
            componentPath: "Button",
            gridDefination: {
              xs: 12,
              sm: 4,
              align: "right",
            },
            props: {
              variant: "contained",
              style: {
                color: "white",
                margin: "8px 2px",
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
              callBack: areaSearch,
            },
          },
        }),
        break: getBreak(),
      },
    },
  },
};
