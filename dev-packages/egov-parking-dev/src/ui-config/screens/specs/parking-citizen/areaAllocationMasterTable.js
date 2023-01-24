import React from "react";
import store from "ui-redux/store";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-kit/utils/commons";

const onClickActionButtonHandler = async (value, tableData) => {
  store.dispatch(prepareFinalObject("typeOfForm", "Update"));
  console.log({ tableData });
  console.log({ value });

  store.dispatch(
    prepareFinalObject(
      "editAreaAllocationForm.clickedAllocationData.parkingId",
      tableData.rowData[0]
    )
  );
  store.dispatch(
    prepareFinalObject(
      "editAreaAllocationForm.clickedAllocationData.tenderId",
      tableData.rowData[1]
    )
  );
  store.dispatch(
    prepareFinalObject(
      "editAreaAllocationForm.clickedAllocationData.tenderName",
      tableData.rowData[3]
    )
  );
  setRoute(`/parking-citizen/newParkingAreaAllocation?isNew=false`);
};

export const searchAreaAllocationResult = {
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
        labelName: "Contract Id",
        labelKey: "Contract Id",
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
        labelName: "Tender Name",
        labelKey: "Tender Name",
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
      labelName: "Search Results for Area Allocation",
      labelKey: "Search Results for Area Allocation",
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
  console.log({ tableMeta });
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
