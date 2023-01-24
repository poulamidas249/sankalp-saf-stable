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
    "preparedFinalObject.responseCaptureScreen"
  );

  if (
    capturedProposed.assesseeNo == "" &&
    capturedProposed.proposedQuarterNo == "" &&
    capturedProposed.proposedQuarterYr == "" &&
    capturedProposed.grIr == ""
  ) {
    store.dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please provide all the values!",
          labelKey: "Please provide all the values!",
        },
        "warning"
      )
    );
  } else {
    store.dispatch(prepareFinalObject("showSummary", true));
    let link = `/property-tax/inspection-summary?applicationNumber=${capturedProposed.assesseNo}&tenantId=km.kolkata&type=property&isInspection=yes`;
    routeTo(link);
  }
};

const selectMode = (value, tableMeta, updateValue) => {
  return (
    <div>
      <select
        name="cars"
        id="cars"
        style={{
          width: "90%",
          background: "none",
          border: "0",
          borderBottom: "2px solid black",
          fontWeight: "bold",
          padding: ".125rem 1.25rem 0 0",
          fontSize: "14px",
        }}
      >
        <option value="volvo">Select</option>
        <option value="saab">E-mail</option>
        <option value="mercedes">Letter</option>
        <option value="audi">Other</option>
      </select>
    </div>
  );
};

function handleClick(clickStatus, tableMeta) {
  // Get the checkbox
  var checkBox = document.getElementById("selectId");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true) {
    store.dispatch(
      prepareFinalObject("checkedTableRow", {
        status: "checked",
        tableValue: tableMeta,
      })
    );
  }
}

const selectButton = (value, tableMeta, updateValue) => {
  return (
    <div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="selectId"
          onChange={() => handleClick(this, tableMeta)}
        />
      </div>
    </div>
  );
};

export const responseCaptureResult = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
      {
        labelName: "Select",
        labelKey: "Select",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) =>
            selectButton(value, tableMeta, updateValue),
        },
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Assessee No.",
        labelKey: "Assessee No.",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Owner",
        labelKey: "Owner",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Premise No.",
        labelKey: "Premise No.",
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
        labelName: "Annual Value",
        labelKey: "Annual Value",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Effective Qtr",
        labelKey: "Effective Qtr",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Proposed Qtr",
        labelKey: "Proposed Qtr",
      },
      {
        gridDefination: {
          xs: 12,
          sm: 1,
        },
        labelName: "Mode of Correspondence",
        labelKey: "Mode of Correspondence",

        options: {
          display: process.env.REACT_APP_NAME === "Citizen" ? false : true,
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) =>
            selectMode(value, tableMeta, updateValue),
        },
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
