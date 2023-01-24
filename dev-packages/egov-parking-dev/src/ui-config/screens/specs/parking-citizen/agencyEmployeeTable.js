import React from "react";
import store from "ui-redux/store";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-kit/utils/commons";

const onClickActionButtonHandler = async (value, tableData) => {
  console.log("tableDataEmployee",tableData)
  store.dispatch(prepareFinalObject("typeOfForm", "Update"));
  store.dispatch(
    prepareFinalObject(
      "editAgencyEmployeeForm.clickedAgencyEmployeeName",
       tableData.rowData
      
    )
  );

  setRoute(`/parking-citizen/agencyEmployeeMasterForm`);
};

export const searchAgencyEmployeeResult = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
      {
        gridDefination: {
          xs: 0,
          sm: 0,
        },
        
        labelName: "Employee Id",
        labelKey: "Employee Id",
       
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        
        labelName: "Agency Name",
        labelKey: "Agency Name",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Parking Lot Name",
        labelKey: "Parking Lot Name",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Employee Name",
        labelKey: "Employee Name",
      },
      {
        labelName: "Action",
        labelKey: "Action",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta) =>
            getActionButton(value, tableMeta),
        },
      },
    ],
    title: {
      labelName: "Search Results for Agency Employee",
      labelKey: "Search Results for Agency Employee",
    },
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
    },
  },
};

const getActionButton = (value, tableMeta) => {
  return (
    <a
      href="javascript:void(0)"
      style={{
        color: "#FE7A51",
        cursor: "pointer",
      }}
      onClick={() => onClickActionButtonHandler(value, tableMeta)}
    >
      Edit
    </a>
  );
};
