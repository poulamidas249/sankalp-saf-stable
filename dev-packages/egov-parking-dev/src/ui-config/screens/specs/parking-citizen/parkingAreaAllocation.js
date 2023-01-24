import {
  getBreak,
  getCommonHeader,
  getCommonContainer,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { searchAreaAllocationResult } from "./areaAllocationMasterTable";
import { httpRequest } from "../../../../ui-utils";
import "./index.css";

const header = getCommonHeader({
  labelName: "Parking Area Allocation Master",
  labelKey: "Parking Area Allocation Master",
});

export const submitApplication = (state, dispatch) => {
  dispatch(prepareFinalObject("typeOfForm", "New"));
  dispatch(setRoute(`/parking-citizen/newParkingAreaAllocation?isNew=true`));
};

export const searchAreaAllocationHandler = async (state, dispatch) => {
  let detailScreenObject =
    state.screenConfiguration.preparedFinalObject.areaAllocationSearchForm;

  let parkingData =
    state.screenConfiguration.preparedFinalObject.areaAllocationMasterMdmsData
      .areaAllocation.parkingList;
  let selectedParkingId;

  if (parkingData.length > 0) {
    parkingData.forEach((item) => {
      if (item.code == detailScreenObject.parkingId) {
        selectedParkingId = item.id;
      }
    });
  }
  let requestBody =
    state.screenConfiguration.preparedFinalObject.areaAllocationSearchForm;
  let requestData = { ...requestBody };
  requestData.parkingId = selectedParkingId;

  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/parking-services/viewParkingAllocation",
      "",
      [],
      requestData
    );

    const areaAllocation = payload || [];
    const areaAllocationTableData = areaAllocation.map((item) => {
      return {
        id: get(item, "id"),
        parkingId: get(item, "parkingId"),
        tenderId: get(item, "tenderId"),
        parkingName: get(item, "parkingName"),
        tenderName: get(item, "tenderName"),
      };
    });

    let data = areaAllocationTableData.map((item) => ({
      ["Id"]: item.id || "-",
      ["Parking Id"]: item.parkingId || "-",
      ["Contract Id"]: item.tenderId || "-",
      ["Parking Name"]: item.parkingName || "-",
      ["Tender Name"]: item.tenderName || "-",
    }));

    dispatch(prepareFinalObject("areaAllocationSearchResult", areaAllocation));
    dispatch(
      prepareFinalObject("areaAllocationTableData", areaAllocationTableData)
    );
    dispatch(
      handleField(
        "parkingAreaAllocation",
        "components.div.children.searchAreaAllocationResult",
        "props.data",
        data
      )
    );
    dispatch(
      handleField(
        "parkingAreaAllocation",
        "components.div.children.searchAreaAllocationResult",
        "props.tableData",
        areaAllocationTableData
      )
    );
    dispatch(
      handleField(
        "parkingAreaAllocation",
        "components.div.children.searchAreaAllocationResult",
        "props.rows",
        areaAllocationTableData.length
      )
    );

    showHideTable(true, dispatch);
  } catch (e) {
    console.log(e);
  }
};

const getMDMSParkingData = async (action, dispatch) => {
  try {
    let payload = null;
    payload = await httpRequest(
      "get",
      "/parking-services/getParkingLotList",
      "_search",
      [],
      {}
    );
    dispatch(
      prepareFinalObject(
        "areaAllocationMasterMdmsData.allocationDropdownData",
        payload
      )
    );
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
        "areaAllocationMasterMdmsData.areaAllocation.parkingList",
        types
      )
    );
  } catch (e) {
    console.log(e);
  }
};

const getMDMSParkingAllocationData = async (action, dispatch) => {
  try {
    let payload = null;
    payload = await httpRequest(
      "get",
      "/parking-services/getParkingLotListForAllocation",
      "_search",
      [],
      {}
    );

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
        "areaAllocationMasterMdmsData.areaAllocation.parkingAllocationList",
        types
      )
    );
  } catch (e) {
    console.log(e);
  }
};

const getMDMSTenderData = async (action, dispatch) => {
  try {
    let payload = null;
    payload = await httpRequest(
      "get",
      "/parking-services/getAvailableTenderList",
      "_search",
      [],
      {}
    );

    let types = [];
    if (payload) {
      types = payload.map((item) => {
        return {
          id: item.tenderId,
          code: item.tenderName,
        };
      });
    }

    dispatch(
      prepareFinalObject(
        "areaAllocationMasterMdmsData.areaAllocation.tenderList",
        types
      )
    );
  } catch (e) {
    console.log(e);
  }
};

const getMDMSAgencyData = async (action, dispatch) => {
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
      types = payload.map((item) => {
        return {
          id: item.agencyId,
          code: item.agencyName,
        };
      });
    }

    dispatch(
      prepareFinalObject(
        "areaAllocationMasterMdmsData.areaAllocation.agencyList",
        types
      )
    );
  } catch (e) {
    console.log(e);
  }
};

const parkingDropdown = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "areaAllocationSearchForm.parkingId",
  // required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer",
    },
    label: {
      labelName: "Parking Name",
      labelKey: "Parking Name",
    },

    placeholder: {
      labelName: "Select Parking Name",
      labelKey: "Select Parking Name",
    },
    sourceJsonPath: "areaAllocationMasterMdmsData.areaAllocation.parkingList",
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

// const agencyDropdown = {
//   uiFramework: "custom-containers",
//   componentPath: "AutosuggestContainer",
//   jsonPath: "areaAllocationSearchForm.agencyId",
//   required: true,
//   props: {
//     style: {
//       width: "100%",
//       cursor: "pointer",
//     },
//     label: {
//       labelName: "Agency Id",
//       labelKey: "Agency Id",
//     },

//     placeholder: {
//       labelName: "Select Agency Id",
//       labelKey: "Select Agency Id",
//     },
//     sourceJsonPath: "areaAllocationMasterMdmsData.areaAllocation.agencyList",
//     labelsFromLocalisation: true,
//     suggestions: [],
//     fullwidth: true,
//     required: true,
//     isClearable: true,
//     inputLabelProps: {
//       shrink: true,
//     },
//   },
//   // afterFieldChange: (action, state, dispatch) => {
//   //   dispatch(
//   //     handleField(
//   //       "incentiveReport",
//   //       `components.div.children.billSlabSearchForm.children.cardContent.children.cityNameContainer.children.dynamicMdms`,
//   //       "props.screenTenantId",
//   //       action.value
//   //     )
//   //   );
//   // },
//   gridDefination: {
//     xs: 12,
//     sm: 3,
//   },
// };

// const tenderDropdown = {
//   uiFramework: "custom-containers",
//   componentPath: "AutosuggestContainer",
//   jsonPath: "areaAllocationSearchForm.tenderId",
//   // required: true,
//   props: {
//     style: {
//       width: "100%",
//       cursor: "pointer",
//     },
//     label: {
//       labelName: "Contract",
//       labelKey: "Contract",
//     },

//     placeholder: {
//       labelName: "Select Contract",
//       labelKey: "Select Contract",
//     },
//     sourceJsonPath: "areaAllocationMasterMdmsData.areaAllocation.tenderList",
//     labelsFromLocalisation: true,
//     suggestions: [],
//     fullwidth: true,
//     required: true,
//     isClearable: true,
//     inputLabelProps: {
//       shrink: true,
//     },
//   },
//   // afterFieldChange: (action, state, dispatch) => {
//   //   dispatch(
//   //     handleField(
//   //       "incentiveReport",
//   //       `components.div.children.billSlabSearchForm.children.cardContent.children.cityNameContainer.children.dynamicMdms`,
//   //       "props.screenTenantId",
//   //       action.value
//   //     )
//   //   );
//   // },
//   gridDefination: {
//     xs: 12,
//     sm: 3,
//   },
// };

const parkingAreaAllocation = {
  uiFramework: "material-ui",
  name: "parkingAreaAllocation",

  beforeInitScreen: (action, state, dispatch) => {
    dispatch(prepareFinalObject("selectedParkingInformation", {}));
    dispatch(prepareFinalObject("selectedTenderInformation", {}));
    dispatch(
      prepareFinalObject("areaAllocationSearchForm", {
        parkingId: "",
      })
    );
    getMDMSParkingAllocationData(action, dispatch);
    getMDMSParkingData(action, dispatch);
    getMDMSTenderData(action, dispatch);
    getMDMSAgencyData(action, dispatch);
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

        // areaContainer: getCommonContainer({
        areaAllocationSearchForm: getCommonContainer({
          parkingId: parkingDropdown,
          // tenderId: tenderDropdown,
          // agencyId: agencyDropdown,
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
                searchAreaAllocationHandler(state, dispatch);
              },
            },
          },
        }),
        // }),
        break: getBreak(),
        searchAreaAllocationResult,
      },
    },
  },
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "parkingAreaAllocation",
      "components.div.children.searchAreaAllocationResult",
      "visible",
      booleanHideOrShow
    )
  );
};

export default parkingAreaAllocation;
