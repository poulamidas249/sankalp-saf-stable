import React from "react";
import store from "ui-redux/store";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-kit/utils/commons";

const onClickActionButtonHandler = async (value, tableData) => {
  console.log("TableData => ", tableData.rowData);
  store.dispatch(prepareFinalObject("typeOfForm", "Update"));
  store.dispatch(
    prepareFinalObject(
      "editAgencyPOSForm.clickedParkingCode",
      tableData.rowData[0]
    )
  );
  store.dispatch(
    prepareFinalObject("editAgencyPOSForm.clickedPosId", tableData.rowData[1])
  );
  setRoute(`/parking-citizen/agentPosMasterForm?isNew=false`);
};

export const searchAgentPosResult = {
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
        labelName: "Pos Id",
        labelKey: "Pos Id",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Agency Id",
        labelKey: "Agency Id",
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
        labelName: "Agency Name",
        labelKey: "Agency Name",
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
      labelName: "Search Results for Agency Pos",
      labelKey: "Search Results for Agency Pos",
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
