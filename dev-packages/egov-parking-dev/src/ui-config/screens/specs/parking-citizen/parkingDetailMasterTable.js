import React from "react";
import store from "ui-redux/store";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-kit/utils/commons";

const onClickActionButtonHandler = async (value, tableData) => {
 
  store.dispatch(prepareFinalObject("typeOfForm", "Update"));
  store.dispatch(
    prepareFinalObject(
      "editParkingDetailsForm.clickedParkingCode",
      tableData.rowData
    )
  );
  setRoute(`/parking-citizen/parkingDetailMasterForm?isNew=false`);
};

export const searchParkingDetailResult = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Parking Id",
        labelKey: "Parking Id",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Parking Name",
        labelKey: "Parking Name",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Day Charge",
        labelKey: "Day Charge",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Night Charge",
        labelKey: "Night Charge",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Parking Category",
        labelKey: "Parking Category",
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
      labelName: "Search Results for Parking Detail",
      labelKey: "Search Results for Parking Detail",
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
