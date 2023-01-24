import React from "react";
import store from "ui-redux/store";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-kit/utils/commons";

const onClickActionButtonHandler = async (value, tableData) => {
  store.dispatch(prepareFinalObject("typeOfForm", "Update"));
  store.dispatch(
    prepareFinalObject(
      "editParkingForm.clickedParkingCode",
      tableData.rowData[0]
    )
  );
  setRoute(`/parking-citizen/newParking?isNew=false`);
};

export const searchParkingResult = {
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
        labelName: "Parking Code",
        labelKey: "Parking Code",
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
        labelName: "Area",
        labelKey: "Area",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Total Occupancy",
        labelKey: "Total Occupancy",
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
      labelName: "Search Results for Parking",
      labelKey: "Search Results for Parking",
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
