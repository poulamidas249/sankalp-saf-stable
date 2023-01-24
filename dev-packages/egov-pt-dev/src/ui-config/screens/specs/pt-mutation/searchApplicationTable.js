import React from "react";
import store from "ui-redux/store";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-kit/utils/commons";

const navigate = (url) => {
  // store.dispatch(setRoute(url));
  setRoute(url);
};

const applicationNumberClick = async () => {
  console.log("redirecting");

  navigate(
    `/pt-mutation/applicationPreview?applicationNumber=PT-AC-NPD-2022-06-09-1007894&tenantId=km&type=property`
  );
};

const onClickActionButtonHandler = async (value, tableData) => {
  setRoute(`/pt-saf/update`);
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
      Modify
    </a>
  );
};

export const searchAssesseResult = {
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
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Premises No",
        labelKey: "Premises No",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Street",
        labelKey: "Street",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Owner Name",
        labelKey: "Owner Name",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Effective Quarter",
        labelKey: "Effective Quarter",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Proposed Quarter",
        labelKey: "Proposed Quarter",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Proposed AV",
        labelKey: "Proposed AV",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Status",
        labelKey: "Status",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Tenant ID",
        labelKey: "Tenant ID",
      },
    ],
    title: {
      labelName: "Search Results for Assesse",
      labelKey: "Search Results for Assesse",
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
