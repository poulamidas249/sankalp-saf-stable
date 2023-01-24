import {
  getBreak,
  getCommonHeader,
  getCommonContainer,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "../../../../ui-utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { searchParkingResult } from "./parkingMasterTabel";
import "./index.css";

const header = getCommonHeader({
  labelName: "Parking Master",
  labelKey: "Parking Master",
});

export const submitApplication = (state, dispatch) => {
  dispatch(prepareFinalObject("typeOfForm", "New"));
  dispatch(setRoute(`/parking-citizen/newParking?isNew=true`));
};

export const searchParkingHandler = async (state, dispatch) => {
  let requestBody = state.screenConfiguration.preparedFinalObject.parkingSearch;

  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/parking-services/viewParkingMaster",
      "",
      [],
      requestBody
    );

    const parking = [payload] || [];
    const parkingTableData = parking.map((item) => {
      return {
        parkingCode: get(item, "parkingCode"),
        parkingName: get(item, "parkingName"),
        streetName: get(item, "streetName"),
        totalNumOfSpaces: get(item, "totalNumOfSpaces"),
      };
    });

    let data = parkingTableData.map((item) => ({
      ["Parking Code"]: item.parkingCode || "-",
      ["Parking Name"]: item.parkingName || "-",
      ["Area"]: item.streetName || "-",
      ["Total Occupancy"]: item.totalNumOfSpaces || "-",
    }));

    dispatch(prepareFinalObject("parkingSearchResult", parking));

    dispatch(
      handleField(
        "parkingMaster",
        "components.div.children.searchParkingResult",
        "props.data",
        data
      )
    );
    dispatch(
      handleField(
        "parkingMaster",
        "components.div.children.searchParkingResult",
        "props.tableData",
        parkingTableData
      )
    );
    dispatch(
      handleField(
        "parkingMaster",
        "components.div.children.searchParkingResult",
        "props.rows",
        parkingTableData.length
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
          code: item.parkingCode,
        };
      });
    }

    dispatch(
      prepareFinalObject(
        "parkingMasterMdmsData.parkingMasterSearch.parkingDetail",
        types
      )
    );
  } catch (e) {
    console.log(e);
  }
};

const parkingCode = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "parkingSearch.parkingCode",
  required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer",
    },
    label: {
      labelName: "parkingCode",
      labelKey: "Parking Code",
    },

    placeholder: {
      labelName: "Select Parking Code",
      labelKey: "Select Parking Code",
    },
    sourceJsonPath: "parkingMasterMdmsData.parkingMasterSearch.parkingDetail",
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

const parkingMaster = {
  uiFramework: "material-ui",
  name: "parkingMaster",
  beforeInitScreen: (action, state, dispatch) => {
    dispatch(
      prepareFinalObject("parkingSearch", {
        parkingCode: "",
      })
    );
    getMDMSData(action, dispatch);
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
                // path: "/parking-citizen/newParking?isNew=true",
                callBack: submitApplication,
              },
            },
          },
        },

        areaContainer: getCommonContainer({
          // parkingCode: getTextField({
          //   gridDefination: {
          //     xs: 12,
          //     sm: 6,
          //   },
          //   label: {
          //     labelKey: "Parking code",
          //   },
          //   placeholder: {
          //     labelKey: "Please Enter Parking Code",
          //   },
          //   required: true,
          //   visible: true,
          //   jsonPath: "parkingSearch.parkingCode",
          // }),
          parkingCode: parkingCode,
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
                searchParkingHandler(state, dispatch);
              },
            },
          },
        }),
        break: getBreak(),
        searchParkingResult,
      },
    },
  },
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "parkingMaster",
      "components.div.children.searchParkingResult",
      "visible",
      booleanHideOrShow
    )
  );
};

export default parkingMaster;
