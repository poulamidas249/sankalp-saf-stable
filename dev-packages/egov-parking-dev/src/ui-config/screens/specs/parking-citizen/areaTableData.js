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
// import { getEpochForDate, sortByEpoch } from "../../utils";
import { setRoute } from "egov-ui-kit/utils/commons";
import store from "ui-redux/store";

const onClickActionButtonHandler = async (value, tableData) => {
  store.dispatch(prepareFinalObject("typeOfForm", "Update"));
  store.dispatch(
    prepareFinalObject("editAreaForm.clickedAreaCode", tableData.rowData[0])
  );
  setRoute(`/parking-citizen/areaMasterForm?isNew=false`);
  
};
export const searchAreaResult = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
        {
            gridDefination: {
              xs: 12,
              sm: 1
            },
            labelName: "Area Code",
            labelKey: "Area Code",
          },
          { gridDefination: {
            xs: 12,
            sm: 1
          },labelName: "Street Name", labelKey: "Street Name"},
          { gridDefination: {
            xs: 12,
            sm: 1
          },labelName: "Type", labelKey: "Type"},
          { gridDefination: {
            xs: 12,
            sm: 1
          },labelName: "Ward ID", labelKey: "Ward ID"},
          { gridDefination: {
            xs: 12,
            sm: 1
          },labelName: "Address", labelKey: "Address"},
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
      labelName: "Search Results for Area",
      labelKey: "Search Results for Area",
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

