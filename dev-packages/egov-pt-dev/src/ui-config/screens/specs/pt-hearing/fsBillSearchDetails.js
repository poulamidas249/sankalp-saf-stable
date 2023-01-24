import React from "react";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import { getStatusKey } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import store from "ui-redux/store";
import {
  handleScreenConfigurationFieldChange as handleField,
  toggleSnackbar,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-kit/utils/commons";

import { routeTo } from "egov-ui-kit/utils/PTCommon/FormWizardUtils/formActionUtils";
import { getEpochForDate, getTextToLocalMapping, sortByEpoch } from "../utils";

// const getLocalTextFromCode = (localCode) => {
//   return JSON.parse(getLocalization("localization_en_IN")).find(
//     (item) => item.code === localCode
//   );
// };

export const fsBillSearchDetailsTable = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    className: "appTab",
    columns: [
      {
        labelName: "Notice No",
        labelKey: "Notice No",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => (
            <a
              href="javascript:void(0)"
              onClick={() => {
                applicationNumberClick(value, tableMeta, updateValue);
              }}
            >
              {value}
            </a>
          ),
        },
      },
      {
        labelName: "Assessee No",
        labelKey: "Assessee No",
      },
      {
        labelName: "Premises No",
        labelKey: "Premises No",
      },
      { labelName: "Street", labelKey: "Street" },

      { labelName: "Hearing Date", labelKey: "Hearing Date" },
      // { labelName: "Notice No", labelKey: "Notice No" },
      //  { labelName: "Proposed Quarter", labelKey: "Proposed Quarter" },
      { labelName: "Proposed AV", labelKey: "Proposed AV" },
      {
        labelName: "Status",
        labelKey: "Status",
        options: {
          filter: false,
          customBodyRender: (value) => (
            <LabelContainer
              style={value === "ACTIVE" ? { color: "green" } : { color: "red" }}
              labelKey={getStatusKey(value).labelKey}
              labelName={getStatusKey(value).labelName}
            />
          ),
        },
      },
      {
        labelName: "tenantId",
        labelKey: "tenantId",
        options: {
          display: false,
        },
      },
      {
        name: "fsBillSearchDetails",

        options: {
          display: false,
        },
      },
    ],
    title: {
      labelKey: "FS Bill Search Details",
      labelName: "FS Bill Search Details",
    },
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
      },
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

const applicationNumberClick = async (value, tableMeta, updateValue) => {
  let noticeval = tableMeta.rowData[0];
  let assesseeNoVal = tableMeta.rowData[1];
  try {
    let response = null;
    response = await httpRequest(
      "post",
      `/property-services/property/_search?assesseeNo=${assesseeNoVal}&hearingNoticeNo=${noticeval}&tenantId=km.kolkata&searchType=FSBILL&IsFsDetails=true`,
      "_search",
      [],
      {}
    );

    if (response.Properties.length > 0) {
      const fsBill = {
        propertyId: response.Properties[0].assesseeNo
          ? response.Properties[0].assesseeNo
          : "",
        noticeNo: response.Properties[0].hearing.hearingNoticeNo
          ? response.Properties[0].hearing.hearingNoticeNo
          : "",
        assesseeNo: response.Properties[0].assesseeNo
          ? response.Properties[0].assesseeNo
          : "",
        wardNo: response.Properties[0].hearing.wardNo
          ? response.Properties[0].hearing.wardNo
          : "",
        division: "1",
        appFlag: response.Properties[0].hearing.appFlag
          ? response.Properties[0].hearing.appFlag
          : "",

        grIR: response.Properties[0].hearing.grIr
        ? response.Properties[0].hearing.grIr
        : "",
        hearingDate: response.Properties[0].hearing.hearingDate
        ? response.Properties[0].hearing.hearingDate
        : "",
        hearingOfficer: response.Properties[0].hearing.hearingOfficer
        ? response.Properties[0].hearing.hearingOfficer
        : "",
        hearingReason: response.Properties[0].hearing.hearingReason
        ? response.Properties[0].hearing.hearingReason
        : "",
        status: response.Properties[0].hearingStatus
        ? response.Properties[0].hearingStatus
        : "",
        hearingSection: response.Properties[0].hearing.hearingSection
        ? response.Properties[0].hearing.hearingSection
        : "",
        hearingTime: response.Properties[0].hearing.hearingTime
        ? response.Properties[0].hearing.hearingTime
        : "",
        appertioned: response.Properties[0].hearing.hearingTime
        ? response.Properties[0].hearing.hearingTime
        : "",

        premiseNo:  response.Properties[0].premisesNo
        ? response.Properties[0].premisesNo
        : "",
        existingAV:  response.Properties[0].hearing.existingAV
        ? response.Properties[0].hearing.existingAV
        : "",
        existingQTR: response.Properties[0].hearing.existingQtr
        ? response.Properties[0].hearing.existingQtr
        : "",
        existingCommAV: response.Properties[0].hearing.existingCommAv
        ? response.Properties[0].hearing.existingCommAv
        : "",

        proposedAV: response.Properties[0].hearing.propAv
        ? response.Properties[0].hearing.propAv
        : "",
        propCommAv: response.Properties[0].hearing.propCommAv
        ? response.Properties[0].hearing.propCommAv
        : "",
        proposedQTR: response.Properties[0].hearing.proposedQuarter
        ? response.Properties[0].hearing.proposedQuarter
        : "",

        nextHearingDate: response.Properties[0].hearing.proposedQuarter
        ? response.Properties[0].hearing.proposedQuarter
        : "",
        nextHearingTime: response.Properties[0].hearing.hearingTime
        ? response.Properties[0].hearing.hearingTime
        : "",

        existingQuarter: response.Properties[0].hearing.existingQtr
        ? response.Properties[0].hearing.existingQtr
        : "",
        proposedquarter: response.Properties[0].hearing.proposedQuarter
        ? response.Properties[0].hearing.proposedQuarter
        : "",
        fixedav: response.Properties[0].hearing.fixedav
        ? response.Properties[0].hearing.fixedav
        : "",
        fixedCommAv: response.Properties[0].hearing.fixedCommAv
        ? response.Properties[0].hearing.fixedCommAv
        : "",
        
        decidednormalRate:  response.Properties[0].hearing.existingRate
        ? response.Properties[0].hearing.existingRate
        : "",
        decidedcommRate: response.Properties[0].hearing.fixedCommRate
        ? response.Properties[0].hearing.fixedCommRate
        : "",
       
      };
      store.dispatch(prepareFinalObject("fsBill", fsBill));
      let link = `/pt-hearing/fsBillEntry`;
      routeTo(link);
    }
  } catch (e) {
    console.log(e);
  }
  //console.log({ tableMeta });
};
