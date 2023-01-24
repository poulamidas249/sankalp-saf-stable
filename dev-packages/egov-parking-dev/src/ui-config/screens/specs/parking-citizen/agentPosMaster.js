import {
  getBreak,
  getCommonContainer,
  getCommonHeader,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "../../../../ui-utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { searchAgentPosResult } from "./agentPosMasterTable";

export const submitApplication = (state, dispatch) => {
  dispatch(prepareFinalObject("typeOfForm", "New"));
  dispatch(setRoute(`/parking-citizen/agentPosMasterForm?isNew=true`));
};

export const searchPosMasterHandler = async (state, dispatch) => {
  let detailScreenObject =
    state.screenConfiguration.preparedFinalObject.agentPosSearch;

  let parkingData =
    state.screenConfiguration.preparedFinalObject.agentPosMasterMdmsData
      .agentPosSearch.parkingDetail;

  let selectedParkingId;

  if (parkingData.length > 0) {
    parkingData.forEach((item) => {
      if (item.code == detailScreenObject.parkingId) {
        selectedParkingId = item.id;
      }
    });
  }

  let requestBody =
    state.screenConfiguration.preparedFinalObject.agentPosSearch;

  let requestData = { ...requestBody };
  requestData.parkingId = selectedParkingId;

  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/parking-services/viewParkingAgencyPOSMaster",
      "",
      [],
      requestData
    );

    const agencyPos = payload || [];

    const agencyPosTableData = agencyPos.map((item) => {
      return {
        parkingId: get(item, "parkingId"),
        posId: get(item, "posId"),
        agencyId: get(item, "agencyId"),
        parkingName: get(item, "parkingName"),
        agencyName: get(item, "agencyName"),
      };
    });

    let data = agencyPosTableData.map((item) => ({
      ["Parking Id"]: item.parkingId || "-",
      ["Pos Id"]: item.posId || "-",
      ["Agency Id"]: item.agencyId || "-",
      ["Parking Name"]: item.parkingName || "-",
      ["Agency Name"]: item.agencyName || "-",
    }));
    dispatch(prepareFinalObject("parkingDetailsSearchResult", agencyPos));

    dispatch(
      handleField(
        "agentPosMaster",
        "components.div.children.searchAgentPosResult",
        "props.data",
        data
      )
    );
    dispatch(
      handleField(
        "agentPosMaster",
        "components.div.children.searchAgentPosResult",
        "props.tableData",
        agencyPosTableData
      )
    );
    dispatch(
      handleField(
        "agentPosMaster",
        "components.div.children.searchAgentPosResult",
        "props.rows",
        agencyPosTableData.length
      )
    );

    showHideTable(true, dispatch);
  } catch (e) {
    console.log(e);
  }
};

const getMDMSData = async (action, dispatch) => {
  try {
    let payload = null;
    payload = await httpRequest(
      "get",
      "/parking-services/getParkingLotList",
      "_search",
      [],
      {}
    );

    //   console.log("Parking Deatils Payload => ", payload);

    let types = [];
    if (payload) {
      types = payload.map((item) => {
        return {
          id: item.parkingId,
          code: item.parkingName,
        };
      });
    }

    dispatch(
      prepareFinalObject(
        "agentPosMasterMdmsData.agentPosSearch.parkingDetail",
        types
      )
    );
  } catch (e) {
    console.log(e);
  }
};

const getAgencyMDMSData = async (action, dispatch) => {
  try {
    let payload = null;
    payload = await httpRequest(
      "get",
      "/parking-services/getAllParkingAgency",
      "_search",
      [],
      {}
    );

    let agencyTypes = [];
    if (payload) {
      agencyTypes = payload.map((item) => {
        return {
          id: item.agencyId,
          code: item.agencyName,
        };
      });
    }

    dispatch(
      prepareFinalObject(
        "agentPosMasterMdmsData.agentPosSearch.agencyDetail",
        agencyTypes
      )
    );
  } catch (e) {
    console.log(e);
  }
};

const parkingId = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "agentPosSearch.parkingId",
  required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer",
    },
    label: {
      labelName: "parkingId",
      labelKey: "Parking Name",
    },

    placeholder: {
      labelName: "Select Parking Name",
      labelKey: "Select Parking Name",
    },
    sourceJsonPath: "agentPosMasterMdmsData.agentPosSearch.parkingDetail",
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

const header = getCommonHeader({
  labelName: "Agent POS Master",
});

//  const searchApplicationTable = {
//     uiFramework: "custom-molecules",
//     componentPath: "Table",
//     visible: false,
//     props: {

//       className: "appTab",
//       columns: [

//         {
//           gridDefination: {
//             xs: 12,
//             sm: 1
//           },
//           labelName: "Parking Id",
//           labelKey: "Parking Id",
//           // options: {
//           //   filter: false,
//           //   customBodyRender: value => (
//           //     <a href="javascript:void(0)"
//           //       onClick={() => propertyIdClick(value) }
//           //     >
//           //       {value.propertyId}
//           //     </a>
//           //   )
//           // }
//         },
//         { gridDefination: {
//           xs: 12,
//           sm: 1
//         },labelName: "Agent Id", labelKey: "Agent Id"},
//         { gridDefination: {
//           xs: 12,
//           sm: 1
//         },labelName: "Pos Id", labelKey: "Pos Id"},

//         // {
//         //   labelName: "Status",
//         //   labelKey: "PT_COMMON_TABLE_COL_STATUS_LABEL",
//         //   options: {
//         //     filter: false,
//         //     customBodyRender: value => (
//         //       <LabelContainer
//         //         style={
//         //           value === "ACTIVE" ? { color: "green" } : { color: "red" }
//         //         }
//         //         labelKey={getStatusKey(value).labelKey}
//         //         labelName={getStatusKey(value).labelName}
//         //       />
//         //     )
//         //   }
//         // },
//         {
//           labelName: "tenantId",
//           labelKey: "tenantId",
//           options: {
//             display: false,
//           }
//         },
//       ],
//       title: {labelKey:"Search Results for Parking Details", labelName:"Search Results for Parking Details"},
//       rows:"",
//       options: {
//         filter: false,
//         download: false,
//         responsive: "stacked",
//         selectableRows: false,
//         hover: true,
//         rowsPerPageOptions: [10, 15, 20],
//         onRowClick: (row, index, dispatch) => {
//           // onApplicationTabClick(row,index, dispatch);
//         }
//       },
//       customSortColumn: {
//         column: "Application Date",
//         sortingFn: (data, i, sortDateOrder) => {
//           const epochDates = data.reduce((acc, curr) => {
//             acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
//             return acc;
//           }, []);
//           const order = sortDateOrder === "asc" ? true : false;
//           const finalData = sortByEpoch(epochDates, !order).map(item => {
//             item.pop();
//             return item;
//           });
//           return { data: finalData, currentOrder: !order ? "asc" : "desc" };
//         }
//       }
//     }
//   };

const agentPosMaster = {
  uiFramework: "material-ui",
  name: "agentPosMaster",
  beforeInitScreen: (action, state, dispatch) => {
    dispatch(
      prepareFinalObject("agentPosSearch", {
        parkingId: "",
      })
    );
    getAgencyMDMSData(action, dispatch);
    getMDMSData(action, dispatch);
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      // props: {
      //   className: "common-div-css",
      // },
      props: {
        className: "common-div-css",
        id: "agentPosMaster",
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
                  labelName: "NEW RECORD",
                  labelKey: "NEW RECORD",
                }),
              },
              onClickDefination: {
                action: "condition",
                // path: "/parking-citizen/agentPosMasterForm",
                callBack: submitApplication,
              },
              // onClickDefination: {
              //   path : "parking-citizen/areaMaster"
              // }
              // roleDefination: {

              //   path : "parking-citizen/areaMaster"

              // }
              // onClickDefination: {
              //   action: "condition",
              //   callBack: (state, dispatch) => {
              //     showHideAdhocPopup(state, dispatch, "propertySearch");

              //   }
              // },
              // roleDefination: {
              //   rolePath: "user-info.roles",
              //   path : "tradelicence/apply"

              // }
            },
          },
        },

        areaContainer: getCommonContainer({
          parkingId: parkingId,

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
                searchPosMasterHandler(state, dispatch);
              },
              // callBack: searchPosMasterHandler,
            },
          },
        }),
        break: getBreak(),
        searchAgentPosResult,
      },
    },
  },
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "agentPosMaster",
      "components.div.children.searchAgentPosResult",
      "visible",
      booleanHideOrShow
    )
  );
};

export default agentPosMaster;
