import React from "react";
import { download, downloadBill } from "egov-common/ui-utils/commons";
import {
  getLocaleLabels,
  getTransformedLocale,
} from "egov-ui-framework/ui-utils/commons";
import { downloadWNSBillFromConsumer } from "egov-ui-kit/utils/commons";
// import { getEpochForDate, sortByEpoch } from "../../utils";

export const billDownload = async (
  consumerCode,
  tenantId,
  billKey,
  searchURL,
  service
) => {
  if (billKey == "ws-bill") {
    downloadWNSBillFromConsumer(consumerCode, tenantId, service);
  } else {
    downloadBill(consumerCode, tenantId, billKey, searchURL);
  }
};

export const allocationAreaSearchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: true,
  props: {
    columns: [
      {
        labelName: "ID",
        labelKey: "ID",
      },
      {
        labelName: "Parking ID",
        labelKey: "Parking ID",
      },
      {
        labelName: "Tender ID",
        labelKey: "Tender ID",
      },
      {
        labelName: "Agency ID",
        labelKey: "Agency ID",
      },
      {
        labelName: "Key",
        labelKey: "Key",
      },
    ],
    title: {
      labelName: "Search Results for Parking Area Allocation",
      labelKey: "Search Results for Parking Area Allocation",
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
    // customSortColumn: {
    //   column: "Bill Date",
    //   sortingFn: (data, i, sortDateOrder) => {
    //     const epochDates = data.reduce((acc, curr) => {
    //       acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
    //       return acc;
    //     }, []);
    //     const order = sortDateOrder === "asc" ? true : false;
    //     const finalData = sortByEpoch(epochDates, !order).map((item) => {
    //       item.pop();
    //       return item;
    //     });
    //     return { data: finalData, currentOrder: !order ? "asc" : "desc" };
    //   },
    // },
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
      onClick={(value) => {
        const appName =
          process.env.REACT_APP_NAME === "Citizen" ? "citizen" : "employee";
        if (tableMeta.rowData[5] === "PAID") {
          const receiptQueryString = [
            { key: "billIds", value: tableMeta.rowData[11] },
            { key: "tenantId", value: tableMeta.rowData[10] },
            { key: "businessService", value: tableMeta.rowData[7] },
          ];
          download(
            receiptQueryString,
            "download",
            tableMeta.rowData[8] || "consolidatedreceipt",
            "PAYMENT"
          );
        } else {
          const url =
            process.env.NODE_ENV === "development"
              ? `/egov-common/pay?consumerCode=${tableMeta.rowData[1]}&tenantId=${tableMeta.rowData[10]}&businessService=${tableMeta.rowData[7]}`
              : `/${appName}/egov-common/pay?consumerCode=${tableMeta.rowData[1]}&tenantId=${tableMeta.rowData[10]}&businessService=${tableMeta.rowData[7]}`;
          document.location.href = `${document.location.origin}${url}`;
        }
      }}
    >
      {getLocaleLabels(value, getTransformedLocale(`${value}`))}
    </a>
  );
};
