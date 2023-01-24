// import {
//   getBreak,
//   getCommonHeader,
//   getLabel,
// } from "egov-ui-framework/ui-config/screens/specs/utils";
// import {
//   prepareFinalObject,
//   unMountScreen,
// } from "egov-ui-framework/ui-redux/screen-configuration/actions";
// import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
// import {
//   getQueryArg,
//   getRequiredDocData,
//   showHideAdhocPopup,
// } from "egov-ui-framework/ui-utils/commons";
// import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
// import get from "lodash/get";
// import set from "lodash/set";
// import "./index.css";
// import { cityChange, resetFields } from "./mutation-methods";
// import propertySearchTabs from "./property-search-tabs";
// import {
//   searchApplicationTable,
//   searchPropertyTable,
// } from "./searchResource/searchResults";
// import { searchAssesseResult } from "./searchApplicationTable";

// const hasButton = getQueryArg(window.location.href, "hasButton");
// let enableButton = true;
// enableButton = hasButton && hasButton === "false" ? false : true;
// const tenant = getTenantId();

// //console.log(captureMutationDetails);

// const getMDMSData = async (action, dispatch) => {
//   const moduleDetails = [
//     {
//       moduleName: "PropertyTax",
//       masterDetails: [{ name: "Documents" }],
//     },
//     {
//       moduleName: "tenant",
//       masterDetails: [
//         {
//           name: "tenants",
//         },
//         { name: "citymodule" },
//       ],
//     },
//   ];

//   try {
//     getRequiredDocData(action, dispatch, moduleDetails).then((payload) => {
//       if (process.env.REACT_APP_NAME != "Citizen") {
//         dispatch(prepareFinalObject("ptSearchScreen.tenantId", tenant));
//         set(
//           action.screenConfig,
//           "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ulbCity.props.isDisabled",
//           true
//         );
//         set(
//           action.screenConfig,
//           "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ulbCity.isDisabled",
//           true
//         );
//         cityChange(dispatch, tenant);
//       }
//       const tenants = get(payload, "payload.MdmsRes.tenant.tenants", []).sort(
//         (t1, t2) => t1.code.localeCompare(t2.code)
//       );
//       dispatch(
//         prepareFinalObject("searchScreenMdmsData.tenant.tenants", tenants)
//       );
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

// const header = getCommonHeader({
//   labelName: "Property Tax",
//   labelKey: "Property Tax",
// });

// const screenConfig = {
//   uiFramework: "material-ui",
//   name: "propertySearch",

//   beforeInitScreen: (action, state, dispatch) => {
//     resetFields(state, dispatch);
//     dispatch(unMountScreen("search-preview"));
//     getMDMSData(action, dispatch);
//     return action;
//   },

//   components: {
//     div: {
//       uiFramework: "custom-atoms",
//       componentPath: "Form",
//       props: {
//         className: "common-div-css",
//         id: "search",
//       },
//       children: {
//         headerDiv: {
//           uiFramework: "custom-atoms",
//           componentPath: "Container",

//           children: {
//             header: {
//               gridDefination: {
//                 xs: 12,
//                 sm: 6,
//               },
//               ...header,
//             },
//             newApplicationButton: {
//               componentPath: "Button",
//               gridDefination: {
//                 xs: 12,
//                 sm: 6,
//                 align: "right",
//               },
//               visible: enableButton,
//               props: {
//                 variant: "contained",
//                 color: "primary",
//                 style: {
//                   color: "white",
//                   borderRadius: "2px",
//                   width: "250px",
//                   height: "48px",
//                 },
//               },

//               children: {
//                 plusIconInsideButton: {
//                   uiFramework: "custom-atoms",
//                   componentPath: "Icon",
//                   props: {
//                     iconName: "add",
//                     style: {
//                       fontSize: "24px",
//                     },
//                   },
//                 },

//                 buttonLabel: getLabel({
//                   labelName: "Add New Assessee",
//                   labelKey: "Add New Assessee",
//                 }),
//               },
//               onClickDefination: {
//                 action: "condition",
//                 callBack: (state, dispatch) => {
//                   // showHideAdhocPopup(state, dispatch, "propertySearch");\
//                   dispatch(prepareFinalObject("documentsUploadRedux", {}));
//                   const applyUrl = `/property-tax/assessment-form`;
//                   dispatch(setRoute(applyUrl));
//                 },
//               },
//               // roleDefination: {
//               //   rolePath: "user-info.roles",
//               //   path : "tradelicence/apply"

//               // }
//             },
//           },
//         },
//         propertySearchTabs,
//         breakAfterSearch: getBreak(),
//         searchAssesseResult,
//         // searchPropertyTable,
//         // searchApplicationTable,
//       },
//     },
//     adhocDialog: {
//       uiFramework: "custom-containers",
//       componentPath: "DialogContainer",
//       props: {
//         open: false,
//         maxWidth: false,
//         screenKey: "propertySearch",
//       },
//       children: {
//         popup: {},
//       },
//     },
//   },
// };

// export default screenConfig;

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
import { searchAssesseResult } from "./searchApplicationTable";

export const searchSafHandler = async (state, dispatch) => {
  const safDetails = [
    {
      assesseNo: "110010800043",
      premiseNo: "Kolkata 2A",
      street: "BARRACKPORE TRUNK ROAD",
      ownerName: "Ananta Ojha",
      effectiveQuarter: "01/2015",
      proposedQuarter: "01/2015",
      proposedAv: "64800",
      status: "active",
      tenantID: "km",
    },
  ];

  const safTableData = safDetails.map((item) => {
    return {
      assesseNo: get(item, "assesseNo"),
      premiseNo: get(item, "premiseNo"),
      street: get(item, "street"),
      ownerName: get(item, "ownerName"),
      effectiveQuarter: get(item, "effectiveQuarter"),
      proposedQuarter: get(item, "proposedQuarter"),
      proposedAv: get(item, "proposedAv"),
      status: get(item, "status"),
      tenantID: get(item, "tenantID"),
    };
  });

  let data = safTableData.map((item) => ({
    ["Assessee No"]: item.assesseNo || "-",
    ["Premises No"]: item.premiseNo || "-",
    ["Street"]: item.street || "-",
    ["Owner Name"]: item.ownerName || "-",
    ["Effective Quarter"]: item.effectiveQuarter || "-",
    ["Proposed Quarter"]: item.proposedQuarter || "-",
    ["Proposed AV"]: item.proposedAv || "-",
    ["Status"]: item.status || "-",
    ["Tenant ID"]: item.tenantID || "-",
  }));

  dispatch(prepareFinalObject("assesseSearchResult", safDetails));

  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.searchAssesseResult",
      "props.data",
      data
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.searchAssesseResult",
      "props.tableData",
      safTableData
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.searchAssesseResult",
      "props.rows",
      safTableData.length
    )
  );

  showHideTable(true, dispatch);
};

const header = getCommonHeader({
  labelName: "Search Assessee",
});

const subHeader = getCommonSubHeader({
  labelName:
    "Provide at least one non-mandatory parameter to search for an application",
});

const searchAssesse = {
  uiFramework: "material-ui",
  name: "searchAssesse",

  // beforeInitScreen: (action, state, dispatch) => {
  //   dispatch();
  //   prepareFinalObject("fetchViewSearch", {
  //     acknowledgementNo: "",
  //     assesseNo: "",
  //   })

  //   return action;
  // },
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

            newApplicationButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right",
              },
              visible: true,
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  color: "white",
                  borderRadius: "2px",
                  width: "250px",
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
                  labelName: "Add New Assessee",
                  labelKey: "Add New Assessee",
                }),
              },
              onClickDefination: {
                action: "condition",
                callBack: (state, dispatch) => {
                  // showHideAdhocPopup(state, dispatch, "propertySearch");\
                  dispatch(prepareFinalObject("documentsUploadRedux", {}));
                  const applyUrl = `/property-tax/assessment-form`;
                  dispatch(setRoute(applyUrl));
                },
              },
              // roleDefination: {
              //   rolePath: "user-info.roles",
              //   path : "tradelicence/apply"

              // }
            },
          },
        },
        searchCard: getCommonCard({
          //   header: header,
          // subHeader: subHeader,
          break: getBreak(),
          safContainer: getCommonContainer({
            propertyTaxApplicationNo: getTextField({
              label: {
                labelName: "Application No",
                labelKey: "Application No",
              },
              placeholder: {
                labelName: "Enter Application No",
                labelKey: "Enter Application No",
              },
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              required: false,
              pattern: /^[a-zA-Z0-9-]*$/i,
              errorMessage: "Enter Valid mobile no.",
              jsonPath: "ptSearchScreen.acknowledgementIds",
            }),

            ownerMobNoProp: getTextField({
              label: {
                labelName: "Owner Mobile No.",
                labelKey: "Owner Mobile No.",
              },
              placeholder: {
                labelName: "Enter your mobile No.",
                labelKey: "Enter your mobile No.",
              },
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              iconObj: {
                label: "+91 |",
                position: "start",
              },
              required: false,
              // pattern: getPattern("MobileNo"),
              jsonPath: "ptSearchScreen.mobileNumber",
              errorMessage: "Enter Valid Mobile No.",
            }),

            applicationPropertyTaxUniqueId: getTextField({
              label: {
                labelName: "Assessee Number",
                labelKey: "Assessee Number",
              },
              placeholder: {
                labelName: "Enter Assessee Number",
                labelKey: "Enter Assessee Number",
              },
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              required: false,
              pattern: /^[a-zA-Z0-9-]*$/i,
              errorMessage: "Please enter Assesse number",
              jsonPath: "ptSearchScreen.ids",
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
        searchAssesseResult,
      },
    },
  },
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.searchAssesseResult",
      "visible",
      booleanHideOrShow
    )
  );
};

export default searchAssesse;
