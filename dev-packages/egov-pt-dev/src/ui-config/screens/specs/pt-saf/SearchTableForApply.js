import React from "react";
import store from "ui-redux/store";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-kit/utils/commons";

const navigate = (url) => {
  // store.dispatch(setRoute(url));
  setRoute(url);
};

const applicationNumberClick = async (value) => {
  console.log("redirecting");
  navigate(`/pt-saf/apply?AssesseNo=${value}`);
};

export const searchSafResultForApply = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    className: "appTab",
    columns: [
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Assesse No",
        labelKey: "Assesse No",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => (
            <a
              href="javascript:void(0)"
              onClick={() => {
                applicationNumberClick(value);
              }}
            >
              {value}
            </a>
          ),
        },
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Quarter",
        labelKey: "Quarter",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Ward No",
        labelKey: "Ward No",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Block Id",
        labelKey: "Block Id",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Street Name",
        labelKey: "Street Name",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Source Type",
        labelKey: "Source Type",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Status Change Date",
        labelKey: "Status Change Date",
      },
    ],
    title: {
      labelName: "Search Results for SAF",
      labelKey: "Search Results for SAF",
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
