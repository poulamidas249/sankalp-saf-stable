import React from "react";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import { getLocaleLabels, getTransformedLocalStorgaeLabels, getStatusKey } from "egov-ui-framework/ui-utils/commons";
// import { setRoute } from "egov-ui-kit/redux/app/actions";
import { getApplicationType,setRoute } from "egov-ui-kit/utils/commons";
import { getLocalization } from "egov-ui-kit/utils/localStorageUtils";

// import store from "ui-redux/store";
import { getEpochForDate, getTextToLocalMapping, sortByEpoch } from "../utils";

const getLocalTextFromCode = localCode => {
  return JSON.parse(getLocalization("localization_en_IN")).find(
    item => item.code === localCode
  );
};


export const rateCardSearchDetailsTable = {
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
          customBodyRender: (value, tableMeta, updateValue) => (
            <a
              href="javascript:void(0)"
              onClick={() => {
                applicationNumberClick();
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
      {labelName: "Street", labelKey: "Street"},

      {labelName: "Hearing Date", labelKey: "Hearing Date"},
      {labelName: "Notice No", labelKey: "Notice No"},
      {labelName: "Effective Quarter", labelKey: "Effective Quarter"},
      {labelName: "proposed AV", labelKey: "proposed AV"},
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
        labelName: "tenantId",
        labelKey: "tenantId",
        options: {
          display: false,
        }
      }, {
        name: "rateCardSearchDetails",

        options: {
          display: false,


        }
      }
    ],
    title: {labelKey:"PT_HOME_APPLICATION_RESULTS_TABLE_HEADING", labelName:"Search Results for Property Application"},
    rows:"",
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


const applicationNumberClick = async () => { 
  window.location.href = `../pt-mutation/rateCard`;
};

const propertyIdClick = (item) => {
  navigate(propertyInformationScreenLink(item.propertyId,item.tenantId));
}

const navigate=(url)=>{
  // store.dispatch(setRoute(url));
  setRoute(url);
}

const propertyInformationScreenLink=(propertyId,tenantId)=>{
  if(process.env.REACT_APP_NAME == "Citizen"){
    return `/property-tax/my-properties/property/${propertyId}/${tenantId}`;
  }else{
    return `/property-tax/property/${propertyId}/${tenantId}`;
  }
}