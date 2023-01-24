import React from "react";
import store from "../../../../ui-redux/store";
import get from "lodash/get";
import {
  prepareFinalObject,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { routeTo } from "egov-ui-kit/utils/PTCommon/FormWizardUtils/formActionUtils";

const applicationNumberClick = async (value, tableMeta, updateValue) => {
  //  check all the field is inserted
  const state = store.getState();

  let capturedProposed = get(
    state.screenConfiguration,
    "preparedFinalObject.capturedProposed"
  );

  if (
    capturedProposed.assesseeNo != "" &&
    capturedProposed.grIr != "" &&
    capturedProposed.proposedQuarterNo != "" &&
    capturedProposed.proposedQuarterYr != ""
  ) {
    store.dispatch(prepareFinalObject("showSummary", true));
    let link = `/property-tax/inspection-summary?assessmentId=${capturedProposed.assesseeNo}&tenantId=km.kolkata&isInspection=yes`;
    // let link = `/property-tax/assessment-form?assessmentId=${capturedProposed.assesseeNo}&propertyId=${capturedProposed.assesseeNo}&tenantId=km.kolkata&type=property&purpose=reassess&isInspection=yes`;
    routeTo(link);
  } else {
    store.dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill all the search criteria to go forward",
          labelKey: "Please fill all the search criteria to go forward",
        },
        "warning"
      )
    );
  }
};

const getAssesseeNoButtonHandler = (value, tableMeta, updateValue) => {
  return (
    <a
      href="javascript:void(0)"
      style={{
        color: "#FE7A51",
        cursor: "pointer",
      }}
      onClick={() => applicationNumberClick(value, tableMeta, updateValue)}
    >
      {value}
    </a>
  );
};

export const searchAssesseeResult = {
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
        labelName: "Assessee No.",
        labelKey: "Assessee No.",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) =>
            getAssesseeNoButtonHandler(value, tableMeta, updateValue),
        },
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Ward",
        labelKey: "Ward",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Address",
        labelKey: "Address",
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
        labelName: "Annual Value",
        labelKey: "Annual Value",
      },
    ],
    title: {
      labelName: "Search Results for Assessee",
      labelKey: "Search Results for Assessee",
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
