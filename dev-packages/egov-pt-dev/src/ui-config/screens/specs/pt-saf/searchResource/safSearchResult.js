import React from "react";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import { getLocaleLabels, getTransformedLocalStorgaeLabels, getStatusKey } from "egov-ui-framework/ui-utils/commons";
// import { setRoute } from "egov-ui-kit/redux/app/actions";
import { getApplicationType, setRoute } from "egov-ui-kit/utils/commons";
import { getLocalization } from "egov-ui-kit/utils/localStorageUtils";

// import store from "ui-redux/store";
import { getEpochForDate, getTextToLocalMapping, sortByEpoch } from "../../utils";

const getLocalTextFromCode = localCode => {
  return JSON.parse(getLocalization("localization_en_IN")).find(
    item => item.code === localCode
  );
};

export const textToLocalMapping = {
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
  "Address": getLocaleLabels(
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
  )
};

export const searchPropertyTable = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    className: "propertyTab",
    columns: [
      {
        labelName: "Unique Property ID",
        labelKey: "PT_COMMON_TABLE_COL_PT_ID",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta) => (
            <div>
              <a href="javascript:void(0)" onClick={() => onPropertyTabClick(tableMeta)}>{value}</a>
            </div>
          )
        }
      },
      { labelName: "Owner Name", labelKey: "PT_COMMON_TABLE_COL_OWNER_NAME" },
      { labelName: "Guardian Name", labelKey: "PT_GUARDIAN_NAME" },
      { labelName: "Existing Property Id", labelKey: "PT_COMMON_COL_EXISTING_PROP_ID" },
      { labelName: "Address", labelKey: "PT_COMMON_COL_ADDRESS" },
      {
        labelName: "Status",
        labelKey: "PT_COMMON_TABLE_COL_STATUS_LABEL",
        options: {
          filter: false,
          customBodyRender: value => (
            <LabelContainer
              style={
                value === "ACTIVE" ? { color: "green" } : { color: "red" }
              }
              labelKey={getStatusKey(value).labelKey}
              labelName={getStatusKey(value).labelName}
            />
          )
        }
      },
      {
        labelName: "Tenant Id",
        labelKey: "TENANT_ID",
        options: {
          display: false
        }
      }
    ],
    title: { labelKey: "PT_HOME_PROPERTY_RESULTS_TABLE_HEADING", labelName: "Search Results for Properties" },
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20]
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map(item => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};

export const searchApplicationTable = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    className: "appTab",
    columns: [
      {
        labelName: "SAF Number",
        labelKey: "SAF Number",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta) => (
            <a href="javascript:void(0)"
              onClick={() => applicationNumberClick(value, tableMeta)}
            >
              {value}
            </a>
          )
        }
      },
      // {
      //   labelName: "Unique Property ID",
      //   labelKey: "PT_COMMON_TABLE_COL_PT_ID",
      //   options: {
      //     filter: false,
      //     customBodyRender: value => (
      //       <a href="javascript:void(0)"
      //         onClick={() => propertyIdClick(value) }
      //       >
      //         {value.propertyId}
      //       </a>
      //     )
      //   }
      // },
      // {labelName: "Application Type", labelKey: "PT_COMMON_TABLE_COL_APP_TYPE"},
      { labelName: "Assessee Number", labelKey: "Assessee Number" },
      { labelName: "Owner Name", labelKey: "Owner Name" },
      { labelName: "Status Change Date", labelKey: "Status Change Date" },
      { labelName: "Source Type", labelKey: "Source Type" },
      { labelName: "Is Suo Moto", labelKey: "Is Suo Moto" },
      {
        labelName: "Status",
        labelKey: "Status",
        options: {
          filter: false,
          customBodyRender: value => (
            <LabelContainer
              style={
                value === "ACTIVE" ? { color: "green" } : { color: "red" }
              }
              labelKey={getStatusKey(value).labelKey}
              labelName={getStatusKey(value).labelName}
            />
          )
        }
      }
    ],
    title: { labelKey: "Search Results for Property Application", labelName: "Search Results for Property Application" },
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: (row, index, dispatch) => {
        // onApplicationTabClick(row,index, dispatch);
      }
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map(item => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};



const onPropertyTabClick = (tableMeta) => {

  switch (tableMeta.rowData[5]) {
    case "INITIATED":
      window.location.href = `apply?applicationNumber=${tableMeta.rowData[0]}&tenantId=${tableMeta.rowData[6]}`;
      break;
    default:
      navigate(propertyInformationScreenLink(tableMeta.rowData[0], tableMeta.rowData[6]));
      break;
  }
};


const applicationNumberClick = async (item, tableMeta) => {
  console.log('tableMeta1234', tableMeta)
  // let clickedData = tableMeta.rowData.filter(t => { return t.safNo === item })

  if (tableMeta.rowData[6] == 'SAVE' || tableMeta.rowData[6] == 'MASTER') {
    navigate(`/pt-saf/apply?safNo=${item}&isDraft=ture`)
  } else {
    navigate(`/pt-saf/search-preview?safNumber=${item}`)
  }

}

const propertyIdClick = (item) => {
  navigate(propertyInformationScreenLink(item.propertyId, item.tenantId));
}

const navigate = (url) => {
  // store.dispatch(setRoute(url));
  setRoute(url);
}

const propertyInformationScreenLink = (propertyId, tenantId) => {
  if (process.env.REACT_APP_NAME == "Citizen") {
    return `/property-tax/my-properties/property/${propertyId}/${tenantId}`;
  } else {
    return `/property-tax/property/${propertyId}/${tenantId}`;
  }
}