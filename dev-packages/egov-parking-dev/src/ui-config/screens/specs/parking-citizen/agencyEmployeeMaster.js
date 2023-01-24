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
import { searchAgencyEmployeeResult } from "./agencyEmployeeTable";
import { httpRequest } from "../../../../ui-utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import "./index.css";

const header = getCommonHeader({
  labelName: "Agency Employee Master",
  labelKey: "Agency Employee Master",
});

export const submitApplication = (state, dispatch) => {
  dispatch(prepareFinalObject("typeOfForm", "New"));
  dispatch(setRoute(`/parking-citizen/agencyEmployeeMasterForm?isNew=true`));
};

export const searchAgencyEmployeeHandler = async (state, dispatch) => {
  let clickedEmpId = null;
  let clickedEmployeeName =
    state.screenConfiguration.preparedFinalObject.agencyEmployeeMaster;

  let employeeList =
    state.screenConfiguration.preparedFinalObject.agencyEmployeeMasterMdmsData.employeeMaster.employeeList;
console.log("employeeListObj",clickedEmployeeName.agencyEmployeeId)
  employeeList &&
    employeeList.length > 0 &&
    employeeList.map((emp) => {
      if (emp.code == clickedEmployeeName.agencyEmployeeId) clickedEmpId = emp.id;
    });
    let requestBody =
    state.screenConfiguration.preparedFinalObject.agencyEmployeeMaster;
  let requestData = { ...requestBody };
  requestData.employeeId = clickedEmpId;

  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/parking-services/viewAgencyEmployee",
      "",
      [],
      requestData
    );

    const agency = [payload] || [];
    console.log("agencyEmployeePayload",payload)
    console.log("agencyEmployeeAgency",agency)
    const agencyTableData = agency.map((item) => {
      return {
        employeeId:get(item,"employeeId"),
        agencyName: get(item, "agencyName"),
        parkingLotName: get(item, "parkingLotName"),
        employeeName: get(item, "employeeName"),
      };
    });

    let data = agencyTableData.map((item) => ({

      ["Employee Id"]: item.employeeId || "-",
      ["Agency Name"]: item.agencyName || "-",
      ["Parking Lot Name"]: item.parkingLotName || "-",
      ["Employee Name"]: item.employeeName || "-",
    }));

    dispatch(prepareFinalObject("agencySearchResult", agency));
    dispatch(
      handleField(
        "agencyEmployeeMaster",
        "components.div.children.searchAgencyEmployeeResult",
        "props.data",
        data
      )
    );
    dispatch(
      handleField(
        "agencyEmployeeMaster",
        "components.div.children.searchAgencyEmployeeResult",
        "props.tableData",
        agencyTableData
      )
    );
    dispatch(
      handleField(
        "agencyEmployeeMaster",
        "components.div.children.searchAgencyEmployeeResult",
        "props.rows",
        agencyTableData.length
      )
    );

    showHideTable(true, dispatch);
  } catch (e) {
    console.log(e);
  }
};

const getMDMSAgencyEmployeeData = async (action, state, dispatch) => {
  try {
    let payload = null;
    payload = await httpRequest(
      "get",
      "/parking-services/getAgencyEmployeeList",
      "_search",
      [],
      {}
    );

    let types = [];
    if (payload && payload.length > 0) {
      types = payload.map((item) => {
        return {
          id: item.employeeId,
          code: item.employeeName,
        };
      });
    }

    dispatch(
      prepareFinalObject(
        "agencyEmployeeMasterMdmsData.employeeMaster.employeeList",
        types
      )
    );
  } catch (e) {
    console.log(e);
  }
};

const agencyEmployeeDropdown = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "agencyEmployeeMaster.agencyEmployeeId",
  required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer",
    },
    label: {
      labelName: "employeeid",
      labelKey: "Employee",
    },

    placeholder: {
      labelName: "Select Employee",
      labelKey: "Select Employee",
    },
    sourceJsonPath: "agencyEmployeeMasterMdmsData.employeeMaster.employeeList",
    labelsFromLocalisation: true,
    suggestions: [],
    fullwidth: true,
    required: true,
    isClearable: true,
    inputLabelProps: {
      shrink: true,
    },
  },

  gridDefination: {
    xs: 12,
    sm: 6,
  },
};

const agencyEmployeeMaster = {
  uiFramework: "material-ui",
  name: "agencyEmployeeMaster",
  beforeInitScreen: (action, state, dispatch) => {
    dispatch(
      prepareFinalObject("agencyEmployeeMaster", {
        agencyEmployeeId: "",
      })
    );
    getMDMSAgencyEmployeeData(action, state, dispatch);
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
                callBack: submitApplication,
              },
            },
          },
        },

        areaContainer: getCommonContainer({
          agencyEmployeeDropdown: agencyEmployeeDropdown,
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
                searchAgencyEmployeeHandler(state, dispatch);
              },
            },
          },
        }),
        break: getBreak(),
        searchAgencyEmployeeResult,
      },
    },
  },
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "agencyEmployeeMaster",
      "components.div.children.searchAgencyEmployeeResult",
      "visible",
      booleanHideOrShow
    )
  );
};

export default agencyEmployeeMaster;
