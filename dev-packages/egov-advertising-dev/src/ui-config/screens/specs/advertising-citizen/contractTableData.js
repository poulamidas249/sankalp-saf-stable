import React from "react";
import { download, downloadBill } from "egov-common/ui-utils/commons";
import {
  getLocaleLabels,
  getTransformedLocale,
} from "egov-ui-framework/ui-utils/commons";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { downloadWNSBillFromConsumer } from "egov-ui-kit/utils/commons";
import { httpRequest } from "../../../../ui-utils";
import { setRoute } from "egov-ui-kit/utils/commons";
import store from "ui-redux/store";
// import { getEpochForDate, sortByEpoch } from "../../utils";

const onClickActionButtonHandler = async (value, tableData) => {
  store.dispatch(prepareFinalObject("typeOfForm", "Update"));
  store.dispatch(
    prepareFinalObject("editContractInfoForm.clickedTenderCode", tableData.rowData[0])
  );
  setRoute(`/parking-citizen/contractInfoForm?isNew=false`);
 
};

export const searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
      {
        // gridDefination: {
        //   xs: 12,
        //   sm: 1,
        // },
        labelName: "Reference Code/Contract Code",
        labelKey: "Reference Code/Contract Code",
      },

      {
        // gridDefination: {
        //   xs: 12,
        //   sm: 1,
        // },
        labelName: "Work Order No",
        labelKey: "Work Order No",
      },
      {
        labelName: "Contract Name",
        labelKey: "Contract Name",
      },
      // {
      //   labelName: "Actions",
      //   labelKey: "Actions",
      // },
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
      labelName: "Search Results for Tender/Contract",
      labelKey: "Search Results for Tender/Contract",
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
