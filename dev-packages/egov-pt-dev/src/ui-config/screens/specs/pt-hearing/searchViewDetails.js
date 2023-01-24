import React from "react";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import {
  getLocaleLabels,
  getTransformedLocalStorgaeLabels,
  getStatusKey,
} from "egov-ui-framework/ui-utils/commons";
// import { setRoute } from "egov-ui-kit/redux/app/actions";
import { getApplicationType, setRoute } from "egov-ui-kit/utils/commons";
import { getLocalization } from "egov-ui-kit/utils/localStorageUtils";

import { getEpochForDate, sortByEpoch } from "../utils";
import { routeTo } from "egov-ui-kit/utils/PTCommon/FormWizardUtils/formActionUtils";

const getLocalTextFromCode = (localCode) => {
  return JSON.parse(getLocalization("localization_en_IN")).find(
    (item) => item.code === localCode
  );
};

export const textToLocalMapping = {
  "Assessee No": getLocaleLabels(
    "Assessee No",
    "Assessee No",
    getTransformedLocalStorgaeLabels()
  ),
  "Premises No": getLocaleLabels(
    "Premises No",
    "Premises No",
    getTransformedLocalStorgaeLabels()
  ),
  "Owner Name": getLocaleLabels(
    "Owner Name",
    "Owner Name",
    getTransformedLocalStorgaeLabels()
  ),
  Street: getLocaleLabels(
    "Street",
    "Street",
    getTransformedLocalStorgaeLabels()
  ),
  "Effective Quarter": getLocaleLabels(
    "Effective Quarter",
    "Effective Quarter",
    getTransformedLocalStorgaeLabels()
  ),
  "Proposed Quarter": getLocaleLabels(
    "Proposed Quarter",
    "Proposed Quarter",
    getTransformedLocalStorgaeLabels()
  ),
  "proposed AV": getLocaleLabels(
    "proposed AV",
    "proposed AV",
    getTransformedLocalStorgaeLabels()
  ),

  "Unique Property ID": getLocaleLabels(
    "Unique Property ID",
    "PT_COMMON_TABLE_COL_PT_ID",
    getTransformedLocalStorgaeLabels()
  ),
  "Owner Name": getLocaleLabels(
    "Owner Name",
    "PT_COMMON_TABLE_COL_OWNER_NAME",
    getTransformedLocalStorgaeLabels()
  ),
  "Guardian Name": getLocaleLabels(
    "Guardian Name",
    "PT_GUARDIAN_NAME",
    getTransformedLocalStorgaeLabels()
  ),
  "Existing Property Id": getLocaleLabels(
    "Existing Property Id",
    "PT_COMMON_COL_EXISTING_PROP_ID",
    getTransformedLocalStorgaeLabels()
  ),
  Address: getLocaleLabels(
    "Address",
    "PT_COMMON_COL_ADDRESS",
    getTransformedLocalStorgaeLabels()
  ),
  "Application No": getLocaleLabels(
    "Application No.",
    "PT_COMMON_COL_APPLICATION_NO",
    getTransformedLocalStorgaeLabels()
  ),
  "Application Type": getLocaleLabels(
    "Application Type",
    "PT_COMMON_COL_APPLICATION_TYPE",
    getTransformedLocalStorgaeLabels()
  ),
  Status: getLocaleLabels(
    "Status",
    "PT_COMMON_TABLE_COL_STATUS_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  INITIATED: getLocaleLabels(
    "Initiated,",
    "PT_INITIATED",
    getTransformedLocalStorgaeLabels()
  ),
  APPLIED: getLocaleLabels(
    "Applied",
    "PT_APPLIED",
    getTransformedLocalStorgaeLabels()
  ),
  DOCUMENTVERIFY: getLocaleLabels(
    "Pending for Document Verification",
    "WF_PT_DOCUMENTVERIFY",
    getTransformedLocalStorgaeLabels()
  ),
  APPROVED: getLocaleLabels(
    "Approved",
    "PT_APPROVED",
    getTransformedLocalStorgaeLabels()
  ),
  REJECTED: getLocaleLabels(
    "Rejected",
    "PT_REJECTED",
    getTransformedLocalStorgaeLabels()
  ),
  CANCELLED: getLocaleLabels(
    "Cancelled",
    "PT_CANCELLED",
    getTransformedLocalStorgaeLabels()
  ),
  PENDINGAPPROVAL: getLocaleLabels(
    "Pending for Approval",
    "WF_PT_PENDINGAPPROVAL",
    getTransformedLocalStorgaeLabels()
  ),
  PENDINGPAYMENT: getLocaleLabels(
    "Pending payment",
    "WF_PT_PENDINGPAYMENT",
    getTransformedLocalStorgaeLabels()
  ),
  FIELDINSPECTION: getLocaleLabels(
    "Pending for Field Inspection",
    "WF_PT_FIELDINSPECTION",
    getTransformedLocalStorgaeLabels()
  ),
  "Search Results for PT Applications": getLocaleLabels(
    "Search Results for PT Applications",
    "PT_HOME_SEARCH_RESULTS_TABLE_HEADING",
    getTransformedLocalStorgaeLabels()
  ),
};

export const searchViewDetailsTable = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    className: "appTab",
    columns: [
      {
        labelName: "Assessee No",
        labelKey: "Assessee No",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <a
              href="javascript:void(0)"
              onClick={(dispatch) => {
                applicationNumberClick(dispatch);
              }}
            >
              {value}
            </a>
          ),
        },
      },
      {
        labelName: "Premises No",
        labelKey: "Premises No",
      },
      { labelName: "Street", labelKey: "Street" },
      { labelName: "AV", labelKey: "AV" },
      { labelName: "Effective Quarter", labelKey: "Effective Quarter" },
      { labelName: "Proposed Quarter", labelKey: "Proposed Quarter" },
      // {
      //   labelName: "Status",
      //   labelKey: "Status",
      //   options: {
      //     filter: false,
      //     customBodyRender: (value) => (
      //       <LabelContainer
      //         style={value === "ACTIVE" ? { color: "green" } : { color: "red" }}
      //         labelKey={getStatusKey(value).labelKey}
      //         labelName={getStatusKey(value).labelName}
      //       />
      //     ),
      //   },
      // },
      {
        labelName: "tenantId",
        labelKey: "tenantId",
        options: {
          display: false,
        },
      },
      {
        name: "searchViewDetails",
        options: {
          display: false,
        },
      },
    ],
    title: {
      labelKey: "Hearing Notice View Details",
      labelName: "Hearing Notice View Details",
    },
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: (row, index, dispatch) => {},
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map((item) => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      },
    },
  },
};

// const onPropertyTabClick = (tableMeta) => {
//   switch (tableMeta.rowData[5]) {
//     case "INITIATED":
//       window.location.href = `apply?applicationNumber=${tableMeta.rowData[0]}&tenantId=${tableMeta.rowData[6]}`;
//       break;
//     default:
//       navigate(propertyInformationScreenLink(tableMeta.rowData[0], tableMeta.rowData[6]));
//       break;
//   }
// };

const applicationNumberClick = async (dispatch) => {
  let link = "/pt-hearing/hearingNoticeViewEntry";
  routeTo(link);
  // window.location.href = `../pt-hearing/hearingNoticeEntry`;
};

const assesseeNumberClick = async (item) => {
  window.location.href = `pt-hearing/hearingNotice`;
};

const navigate = (url) => {
  setRoute(url);
};
