import {
  getBreak,
  getDateField,
  getSelectField,
  getCommonCard,
  getCommonTitle,
  getCommonContainer,
  getCommonHeader,
  getCommonSubHeader,
  getLabel,
  getPattern,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import commonConfig from "config/common.js";
import get from "lodash/get";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  unMountScreen,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "../../../../ui-utils";
import { searchAreaResult } from "./areaTableData";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
export const submitApplication = (state, dispatch) => {
  dispatch(prepareFinalObject("typeOfForm", "New"));
  dispatch(setRoute(`/parking-citizen/areaMasterForm?isNew=true`));
};

export const searchareaHandler = async (state, dispatch) => {
  let requestBody = state.screenConfiguration.preparedFinalObject.areaSearch;
  console.log("Request => ", requestBody);

  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/parking-services/viewArea",
      "",
      [],
      requestBody
    );
    console.log("payload==", payload);
    const area = [payload] || [];

    const areaTableData = area.map((item) => {
      return {
        areaCode: get(item, "areaCode"),
        streetName: get(item, "streetName"),
        wardId: get(item, "wardId"),
        areaType: get(item, "areaType"),
        address: get(item, "address"),
      };
    });
    // console.log("areaTableData", areaTableData);
    let data = areaTableData.map((item) => ({
      ["Area Code"]: item.areaCode || "-",
      ["Street Name"]: item.streetName || "-",
      ["Ward ID"]: item.wardId || "-",
      ["Type"]: item.areaType || "-",
      ["Address"]: item.address || "-",
    }));

    dispatch(prepareFinalObject("areaSearchResult", area));
    // dispatch(
    //   prepareFinalObject("searchScreenMdmsData.tenderSearchResponse", area)
    // );

    dispatch(
      handleField(
        "areaMaster",
        "components.div.children.searchAreaResult",
        "props.data",
        data
      )
    );
    dispatch(
      handleField(
        "areaMaster",
        "components.div.children.searchAreaResult",
        "props.tableData",
        areaTableData
      )
    );
    dispatch(
      handleField(
        "areaMaster",
        "components.div.children.searchAreaResult",
        "props.rows",
        areaTableData.length
      )
    );

    showHideTable(true, dispatch);
  } catch (e) {
    console.log(e);
  }
};

const header = getCommonHeader({
  labelName: "Area Master",
});
const getMDMSData = async (action, dispatch) => {
  try {
    let payload = null;
    payload = await httpRequest(
      "get",
      "/parking-services/getParkingAreaList",
      "_search",
      [],
      {}
    );

    let types = [];
    if (payload) {
      types = payload.map((item) => {
        return {
          code: item.areaCode,
        };
      });
    }
    console.log("payload==>", payload);
    dispatch(
      prepareFinalObject(
        "parkingMasterMdmsData.parkingMaster.areaDetails",
        types
      )
    );
  } catch (e) {
    console.log(e);
  }
};

const areaCode = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "areaSearch.areaCode",
  required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer",
    },
    label: {
      labelName: "areaCode",
      labelKey: "Area Code",
    },

    placeholder: {
      labelName: "Select Area Code",
      labelKey: "Select Area Code",
    },
    sourceJsonPath: "parkingMasterMdmsData.parkingMaster.areaDetails",
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
const areaMaster = {
  uiFramework: "material-ui",
  name: "areaMaster",
  beforeInitScreen: (action, state, dispatch) => {
    dispatch(
      prepareFinalObject("areaSearch", {
        areaCode: "",
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
        id: "areaMaster",
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
                //path:"/parking-citizen/areaMasterForm",
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
          areaCode: areaCode,
          // areaCode: getTextField({
          //   gridDefination: {
          //     xs: 12,
          //     sm: 6,
          //   },
          //   label: {
          //     labelKey: "Area Code"
          //   },
          //   placeholder: {
          //     labelKey: "Please Enter Area Code"
          //   },
          //   required: true,
          //   visible: true,
          //   jsonPath: "areaSearch.areaCode",
          // }),
          // areaName: getTextField({
          //   gridDefination: {
          //     xs: 12,
          //     sm: 4,
          //   },
          //   label: {
          //     labelKey: "Area Name"
          //   },
          //   placeholder: {
          //     labelKey: "Please Enter Area Name"
          //   },
          //   // required: true,
          //   visible: true,
          //   jsonPath: "areaSearch.areaName",
          // }),
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
              // callBack: searchareaHandler
              callBack: (state, dispatch) => {
                searchareaHandler(state, dispatch);
              },
            },
          },
        }),
        break: getBreak(),
        searchAreaResult,
      },
    },
  },
};
const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "areaMaster",
      "components.div.children.searchAreaResult",
      "visible",
      booleanHideOrShow
    )
  );
};
export default areaMaster;
