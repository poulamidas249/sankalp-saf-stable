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
import { searchParkingDetailResult } from "./parkingDetailMasterTable";

export const submitApplication = (state, dispatch) => {
  dispatch(prepareFinalObject("typeOfForm", "New"));
  dispatch(setRoute(`/parking-citizen/parkingDetailMasterForm?isNew=true`));
};

export const searchParkingDetailsHandler = async (state, dispatch) => {
  let detailScreenObject =
    state.screenConfiguration.preparedFinalObject.parkingDetailSearch;

  let parkingData =
    state.screenConfiguration.preparedFinalObject.parkingDetailMasterMdmsData
      .parkingDetailSearch.parkingDetail;

  let selectedParkingId;

  if (parkingData.length > 0) {
    parkingData.forEach((item) => {
      if (item.code == detailScreenObject.parkingId) {
        selectedParkingId = item.id;
      }
    });
  }
  let requestBody =
    state.screenConfiguration.preparedFinalObject.parkingDetailSearch;
  let requestData = { ...requestBody };
  requestData.parkingId = selectedParkingId;

  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/parking-services/viewParkingMasterDetails",
      "",
      [],
      requestData
    );

    const parkingDetails = payload || [];

    const parkingDetailsTableData = parkingDetails.map((item) => {
      return {
        parkingId: get(item, "parkingId"),
        parkingName: get(item, "parkingName"),
        dayCharge: get(item, "dayCharge"),
        nightCharge: get(item, "nightCharge"),
        parkingCategory: get(item, "parkingCategory"),
      };
    });

    let data = parkingDetailsTableData.map((item) => ({
      ["Parking Id"]: item.parkingId || "-",
      ["Parking Name"]: item.parkingName || "-",
      ["Day Charge"]: item.dayCharge || "-",
      ["Night Charge"]: item.nightCharge || "-",
      ["Parking Category"]: item.parkingCategory || "-",
    }));

    dispatch(prepareFinalObject("parkingDetailsSearchResult", parkingDetails));

    dispatch(
      handleField(
        "parkingDetailMaster",
        "components.div.children.searchParkingDetailResult",
        "props.data",
        data
      )
    );
    dispatch(
      handleField(
        "parkingDetailMaster",
        "components.div.children.searchParkingDetailResult",
        "props.tableData",
        parkingDetailsTableData
      )
    );
    dispatch(
      handleField(
        "parkingDetailMaster",
        "components.div.children.searchParkingDetailResult",
        "props.rows",
        parkingDetailsTableData.length
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
        "parkingDetailMasterMdmsData.parkingDetailSearch.parkingDetail",
        types
      )
    );
  } catch (e) {
    console.log(e);
  }
};

const parkingId = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "parkingDetailSearch.parkingId",
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
    sourceJsonPath:
      "parkingDetailMasterMdmsData.parkingDetailSearch.parkingDetail",
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
  labelName: "Parking Details Master",
});

const parkingDetailMaster = {
  uiFramework: "material-ui",
  name: "parkingDetailMaster",

  beforeInitScreen: (action, state, dispatch) => {
    dispatch(
      prepareFinalObject("parkingDetailSearch", {
        parkingId: "",
      })
    );
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
        id: "parkingDetailMaster",
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
                // path: "/parking-citizen/newAgency?isNew=true",
                callBack: submitApplication,
              },
              // onClickDefination: {
              //   path : "parking-citizen/parkingDetailMaster"
              // }
              // roleDefination: {

              //   path : "parking-citizen/parkingDetailMaster"

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
              callBack: searchParkingDetailsHandler,
            },
          },
        }),
        break: getBreak(),
        searchParkingDetailResult,
      },
    },
  },
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "parkingDetailMaster",
      "components.div.children.searchParkingDetailResult",
      "visible",
      booleanHideOrShow
    )
  );
};

export default parkingDetailMaster;
