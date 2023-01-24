import { LabelContainer } from "egov-ui-framework/ui-containers";
import {
  handleScreenConfigurationFieldChange as handleField,
  toggleSnackbar,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";

import {
  disableField,
  enableField,
  getLocaleLabels,
  getTransformedLocale,
} from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import React from "react";
import { getSearchResults } from "../../../../ui-utils/commons";
import { validateFields } from "../utils/index";

export const propertySearch = async (state, dispatch) => {
  searchApiCall(state, dispatch, 0);
};
export const assesseeSearchInspection = async (state, dispatch) => {
  searchApiCallForInspection(state, dispatch, 0);
};

export const assesseeSearchHearingNotice = async (state, dispatch) => {
  searchApiCallForHearingNotice(state, dispatch, 0);
};

export const assesseeSearchHearingNoticeView = async (state, dispatch) => {
  searchApiCallForHearingNoticeView(state, dispatch, 0);
};

export const submitHearingNoticeData = async (state, dispatch) => {
  submitApiDataForHearingNotice(state, dispatch, 0);
};

export const submitRateCardData = async (state, dispatch) => {
  submitApiDataForRateCard(state, dispatch, 0);
};


const submitApiDataForRateCard = async (state, dispatch, index) => {
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCardSearch"
  );

  let query = { tenantId: "km.kolkata" };
  query["searchType"] = "HEARING";
  query["assesseeNo"] = searchScreenObject["assesseeNo"].trim();

  let queryObject = [];
  Object.keys(query).map((key) => {
    queryObject.push({
      key: key,
      value: key == "doorNo" ? encodeURIComponent(query[key]) : query[key],
    });
  });
  try {
    const response = await getSearchResults(queryObject);
    dispatch(
      prepareFinalObject("rateCardSearchResult", response.Properties[0])
    );

    let effectiveQuarter = `${response.Properties[0]["taxdetails"][
      "effectiveQtr"
    ]
      .toString()
      .substr(4, 5)}/${response.Properties[0]["taxdetails"]["effectiveQtr"]
      .toString()
      .substr(0, 4)}`;

    let proposedQuarterVal = `${response.Properties[0]["taxdetails"][
      "proposedQtr"
    ]
      .toString()
      .substr(4, 5)}/${response.Properties[0]["taxdetails"]["proposedQtr"]
      .toString()
      .substr(0, 4)}`;

    const rateCard = {
      propertyId: response.Properties[0]["assesseeNo"],
      noticeNo: response.Properties[0]["noticeNo"],
      assesseeNo: response.Properties[0]["assesseeNo"],
      wardNo: response.Properties[0]["ward"],
      division: "1",
      appFlag: response.Properties[0]["taxdetails"]["appdFlag"],
      grTR: "",
      hearingDate: "",
      hearingOfficer: "",
      hearingReason: "",
      status: response.Properties[0]["taxdetails"]["status"],
      hearingSection: "",
      hearingTime: "",
      appertioned: "",

      premiseNo: response.Properties[0]["premisesNo"],
      existingAV: response.Properties[0]["taxdetails"]["existingAV"],
      existingQTR: effectiveQuarter,
      existingCommAV: response.Properties[0]["taxdetails"]["commAv"].toString(),

      proposedAV: response.Properties[0]["taxdetails"]["av"],
      propCommAv: response.Properties[0]["taxdetails"]["commAv"].toString(),
      proposedQTR: proposedQuarterVal,

      nextHearingDate: "",
      hearingOfficer: "",
      nextHearingTime: "",

      existingQuarter: effectiveQuarter,
      proposedquarter: proposedQuarterVal,
      fixedav: response.Properties[0]["taxdetails"]["fixedav"],
      fixedCommAv: response.Properties[0]["taxdetails"]["fixedCommAv"],
      decidedqtrlyTax:
        response.Properties[0]["taxdetails"]["quarter"].toString(),
      decidednormalRate: response.Properties[0]["taxdetails"]["rate"],
      decidedcommRate: response.Properties[0]["taxdetails"]["commRate"],
      decidedpayableAmount:
        response.Properties[0]["taxdetails"]["paybleAmount"],
      decidedquarterAmount:
        response.Properties[0]["taxdetails"]["quateryAmount"],
      decidedsurchargeAmount: response.Properties[0]["taxdetails"]["netAmount"],
    };
    dispatch(prepareFinalObject("rateCard", rateCard));
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
  }
};

const searchApiCallForHearingNoticeView = async (state, dispatch, index) => {
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "hearingNoticeViewSearch"
  );

  let query = { tenantId: "km.kolkata" };
  query["searchType"] = "HEARING";
  query["assesseeNo"] = searchScreenObject["assesseeNo"].trim();

  let queryObject = [];
  Object.keys(query).map((key) => {
    queryObject.push({
      key: key,
      value: key == "doorNo" ? encodeURIComponent(query[key]) : query[key],
    });
  });
  try {
    const response = await getSearchResults(queryObject);
    if (response.Properties.length > 0) {
      dispatch(
        prepareFinalObject(
          "hearingNoticeViewSearchResult",
          response.Properties[0]
        )
      );

      let effectiveQuarter = `${response.Properties[0]["taxdetails"][
        "effectiveQtr"
      ]
        .toString()
        .substr(4, 5)}/${response.Properties[0]["taxdetails"]["effectiveQtr"]
        .toString()
        .substr(0, 4)}`;

      let proposedQuarterVal = `${response.Properties[0]["taxdetails"][
        "proposedQtr"
      ]
        .toString()
        .substr(4, 5)}/${response.Properties[0]["taxdetails"]["proposedQtr"]
        .toString()
        .substr(0, 4)}`;

      const capturedTableData = response.Properties.map((item) => {
        let effectiveQuarter = `${item.taxdetails.effectiveQtr
          .toString()
          .substr(4, 5)}/${item.taxdetails.effectiveQtr
          .toString()
          .substr(0, 4)}`;

        let proposedQuarterVal = `${item.taxdetails.proposedQtr
          .toString()
          .substr(4, 5)}/${item.taxdetails.proposedQtr
          .toString()
          .substr(0, 4)}`;
        return {
          assesseeNo: get(item, "assesseeNo"),
          premisesNo: get(item, "premisesNo"),
          street: get(item, "street"),
          AV: get(item, "taxdetails.av"),
          effectiveQuarter: effectiveQuarter,
          proposedQuarter: proposedQuarterVal, // get(item, "taxdetails.proposedQtr"),
          Status: get(item, "Properties.status"),
        };
      });

      const firstStepHearingNoticeView = {
        noticeNo: response.Properties[0]["noticeNo"],
        premiseNo: response.Properties[0]["premisesNo"],
        street: response.Properties[0]["street"],
        ownerName: response.Properties[0]["owners"][0]["userName"],
        assesseeNo: response.Properties[0]["assesseeNo"],
        wardNo: response.Properties[0]["ward"],
        existingAV: response.Properties[0]["taxdetails"]["existingAV"],
        existingQTR: effectiveQuarter,
        division: "1",
        existingCommAV:
          response.Properties[0]["taxdetails"]["commAv"].toString(),
        propCommAv: response.Properties[0]["taxdetails"]["commAv"].toString(),

        appFlag: response.Properties[0]["taxdetails"]["appdFlag"],
        propAv: response.Properties[0]["taxdetails"]["av"],
        hearingSection: "",
        hearingTime: "12:10 AM",
        proposedQTR: proposedQuarterVal,

        objectionBy: "Aurobinda Sahoo",
        objDate: "10/29/2022",
        objectionMedium: "Objection Medium",
        objectionReason: "Objection Reason",
      };
      dispatch(
        prepareFinalObject(
          "firstStepHearingNoticeView",
          firstStepHearingNoticeView
        )
      );

      let data = response.Properties.map((item) => ({
        ["Assessee No"]: item.assesseeNo || "-",
        ["Premises No"]: item.premisesNo || "-",
        ["Street"]: item.street || "-",
        ["AV"]: item.taxdetails.av || "-",
        ["Effective Quarter"]:
          `${item.taxdetails.effectiveQtr
            .toString()
            .substr(4, 5)}/${item.taxdetails.effectiveQtr
            .toString()
            .substr(0, 4)}` || "-",
        ["Proposed Quarter"]:
          `${item.taxdetails
            .proposedQtrtoString()
            .substr(4, 5)}/${item.taxdetails.proposedQtr
            .toString()
            .substr(0, 4)}` || "-",
        ["Status"]: item.status || "-",
      }));

      dispatch(
        handleField(
          "hearingNoticeViewSearch",
          "components.div.children.searchViewDetailsTable",
          "props.data",
          data
        )
      );

      dispatch(
        handleField(
          "hearingNoticeViewSearch",
          "components.div.children.searchViewDetailsTable",
          "props.tableData",
          capturedTableData
        )
      );
      dispatch(
        handleField(
          "hearingNoticeViewSearch",
          "components.div.children.searchViewDetailsTable",
          "props.rows",
          capturedTableData.length
        )
      );

      showHideTableHearingNoticeView(true, dispatch);
    } else {
      dispatch(
        handleField(
          "hearingNoticeViewSearch",
          "components.div.children.searchViewDetailsTable",
          "props.data",
          []
        )
      );

      dispatch(
        handleField(
          "hearingNoticeViewSearch",
          "components.div.children.searchViewDetailsTable",
          "props.tableData",
          []
        )
      );
      dispatch(
        handleField(
          "hearingNoticeViewSearch",
          "components.div.children.searchViewDetailsTable",
          "props.rows",
          0
        )
      );

      showHideTableHearingNoticeView(true, dispatch);
    }
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
  }
};

const showHideTableHearingNoticeView = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "hearingNoticeViewSearch",
      "components.div.children.searchViewDetailsTable",
      "visible",
      booleanHideOrShow
    )
  );
};
// search property in hearing notice
const searchApiCallForHearingNotice = async (state, dispatch, index) => {
  
  // let query = { tenantId: "km.kolkata" };
  // query["searchType"] = "HEARING";
  // query["assesseeNo"] = searchScreenObject["assesseeNo"].trim();
  
    try {
      let searchScreenObject = get(
       state.screenConfiguration.preparedFinalObject,
       "hearingNoticeSearch"
     );
     
          let response = null;
          response = await httpRequest(
            "post",
            `/property-services/property/_search?assesseeNo=${searchScreenObject["assesseeNo"]}&tenantId=km.kolkata&searchType=HEARING`,
            "_search",
            [],
            {}
          );
     
       let propertyVal = response.Properties.length;
   
       if (propertyVal > 0) {
      dispatch(
        prepareFinalObject("hearingNoticeSearchResult", response.Properties[0])
      );

      let effectiveQuarter = `${response.Properties[0]["taxdetails"][
        "effectiveQtr"
      ]
        .toString()
        .substr(4, 5)}/${response.Properties[0]["taxdetails"]["effectiveQtr"]
        .toString()
        .substr(0, 4)}`;

      let proposedQuarterVal = `${response.Properties[0]["taxdetails"][
        "proposedQtr"
      ]
        .toString()
        .substr(4, 5)}/${response.Properties[0]["taxdetails"]["proposedQtr"]
        .toString()
        .substr(0, 4)}`;

      const capturedTableData = response.Properties.map((item) => {
        let effectiveQuarter = `${item.taxdetails.effectiveQtr
          .toString()
          .substr(4, 5)}/${item.taxdetails.effectiveQtr
          .toString()
          .substr(0, 4)}`;

        let proposedQuarterVal = `${item.taxdetails.proposedQtr
          .toString()
          .substr(4, 5)}/${item.taxdetails.proposedQtr
          .toString()
          .substr(0, 4)}`;
        return {
          assesseeNo: get(item, "assesseeNo") ? get(item, "assesseeNo") : "-",
          premisesNo:get(item, "premisesNo") ? get(item, "premisesNo") : "-",
          street: get(item, "street") ? get(item, "street") : "-",
          AV: get(item, "taxdetails.av") ? get(item, "taxdetails.av") : "-",
          effectiveQuarter: get(item, effectiveQtr)
          ? get(item, effectiveQtr)
          : "-",
          proposedQuarter: get(item, proposedQuarter)
          ? get(item, proposedQuarter) : "-", 
          Status: get(item, "Properties.status"),
        };
      });

      const firstStepHearingNotice = {
        noticeNo: response.Properties[0]["noticeNo"],
        premiseNo: response.Properties[0]["premisesNo"],
        street: response.Properties[0]["street"],
        ownerName: response.Properties[0]["owners"][0]["userName"],
        assesseeNo: response.Properties[0]["assesseeNo"],
        wardNo: response.Properties[0]["ward"],
        existingAV: response.Properties[0]["taxdetails"]["av"],
        existingQTR: effectiveQuarter,
        division: "1",
        existingCommAV:
          response.Properties[0]["taxdetails"]["commAv"].toString(),
        appFlag: response.Properties[0]["taxdetails"]["appdFlag"],
        propAv: response.Properties[0].taxdetails.av.toString(),
        hearingSection: "",
        hearingTime: "",
        hearingDate: "",
        hearingReason: "",
        noticeSection: "",
        propCommAv: response.Properties[0]["taxdetails"]["commAv"].toString(),
        proposedQTR: proposedQuarterVal,
        reason: "",
        cancelReason: "",
        cancelDate: "",
        cancelBy: "",
        hearingOfficer: "",
      };
      dispatch(
        prepareFinalObject("firstStepHearingNotice", firstStepHearingNotice)
      );

      let data = response.Properties.map((item) => ({
        ["Assessee No"]: item.assesseeNo || "-",
        ["Premises No"]: item.premisesNo || "-",
        ["Street"]: item.street || "-",
        ["AV"]: item.taxdetails.av || "-",
        ["Effective Quarter"]:
          `${item.taxdetails.effectiveQtr
            .toString()
            .substr(4, 5)}/${item.taxdetails.effectiveQtr
            .toString()
            .substr(0, 4)}` || "-",
        ["Proposed Quarter"]:
          `${item.taxdetails.proposedQtr
            .toString()
            .substr(4, 5)}/${item.taxdetails.proposedQtr
            .toString()
            .substr(0, 4)}` || "-",
        ["Status"]: item.status || "-",
      }));

      dispatch(
        handleField(
          "hearingNoticeSearch",
          "components.div.children.searchDetailsTable",
          "props.data",
          data
        )
      );

      dispatch(
        handleField(
          "hearingNoticeSearch",
          "components.div.children.searchDetailsTable",
          "props.tableData",
          capturedTableData
        )
      );

      dispatch(
        handleField(
          "hearingNoticeSearch",
          "components.div.children.searchDetailsTable",
          "props.rows",
          capturedTableData.length
        )
      );

      showHideTableHearingNotice(true, dispatch);
    } else {
      dispatch(
        handleField(
          "hearingNoticeSearch",
          "components.div.children.searchDetailsTable",
          "props.data",
          []
        )
      );

      dispatch(
        handleField(
          "hearingNoticeSearch",
          "components.div.children.searchDetailsTable",
          "props.tableData",
          []
        )
      );

      dispatch(
        handleField(
          "hearingNoticeSearch",
          "components.div.children.searchDetailsTable",
          "props.rows",
          0
        )
      );
      showHideTableHearingNotice(true, dispatch);
    }
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
  }
};

const showHideTableHearingNotice = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "hearingNoticeSearch",
      "components.div.children.searchDetailsTable",
      "visible",
      booleanHideOrShow
    )
  );
};
export const assesseeSearchRateCard = async (state, dispatch) => {
  searchApiCallForRateCard(state, dispatch, 0);
};

export const assesseeSearchfsBill = async (state, dispatch) => {
  searchApiCallForfsBill(state, dispatch, 0);
};

const searchApiCallForfsBill = async (state, dispatch, index) => {
 

  // let query = { tenantId: "km.kolkata" };
  // query["searchType"] = "FSBILL";
  // query["assesseeNo"] = searchScreenObject["assesseeNo"].trim();
  // query["IsFsDetails"] = "false";

  // let queryObject = [];
  // Object.keys(query).map((key) => {
  //   queryObject.push({
  //     key: key,
  //     value: key == "doorNo" ? encodeURIComponent(query[key]) : query[key],
  //   });
  // });

  try {
   let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBillSearch"
  );
  
       let response = null;
       response = await httpRequest(
         "post",
         `/property-services/property/_search?assesseeNo=${searchScreenObject["assesseeNo"]}&tenantId=km.kolkata&searchType=FSBILL&IsFsDetails=false`,
         "_search",
         [],
         {}
       );
  
    let propertyVal = response.Properties.length;

    if (propertyVal > 0) {
      dispatch(prepareFinalObject("fsBillSearchResult", response.Properties));

      const capturedTableData = response.Properties.map((item) => {
        // let effectiveQuarter = `${item.taxdetails.effectiveQtr.toString().substr(4, 5)}/${item.hearing.effectiveQtr.toString().substr(0, 4)}`;
        let proposedQuarter = `${item.hearing.proposedQuarter
          .toString()
          .substr(4, 5)}/${item.hearing.proposedQuarter
          .toString()
          .substr(0, 4)}`;

        return {
          assesseeNo: get(item, "assesseeNo") ? get(item, "assesseeNo") : "-",
          premisesNo: get(item, "premisesNo") ? get(item, "premisesNo") : "-",
          street: get(item, "street") ? get(item, "street") : "-",
          hearingDate: get(item, "hearing.hearingDate")
            ? get(item, "hearing.hearingDate")
            : "-",
          noticeNo: get(item, "hearing.hearingNoticeNo")
            ? get(item, "hearing.hearingNoticeNo")
            : "-",
          // effectiveQuarter: effectiveQuarter,
          proposedAV: get(item, "hearing.propAv")
            ? get(item, "hearing.propAv")
            : "-",
          proposedQuarter: get(item, proposedQuarter)
            ? get(item, proposedQuarter)
            : "-",
          Status: get(item, "Properties.status")
            ? get(item, "Properties.status")
            : "-",
        };
      });
     
      let data = capturedTableData.map((item) => ({
        ["Assessee No"]: item.assesseeNo || "-",
        ["Premises No"]: item.premisesNo || "-",
        ["Street"]: item.street || "-",
        ["Hearing Date"]: item.hearingDate || "-",
        ["Notice No"]: item.noticeNo || "-",
        ["Proposed AV"]: item.proposedAV || "-",
        ["Proposed Quarter"]: item.proposedQuarter || "-",
        ["Status"]: item.status || "-",
      }));

      dispatch(
        handleField(
          "fsBillSearch",
          "components.div.children.fsBillSearchDetailsTable",
          "props.data",
          data
        )
      );
      dispatch(
        handleField(
          "fsBillSearch",
          "components.div.children.fsBillSearchDetailsTable",
          "props.tableData",
          capturedTableData
        )
      );
      dispatch(
        handleField(
          "fsBillSearch",
          "components.div.children.fsBillSearchDetailsTable",
          "props.rows",
          capturedTableData.length
        )
      );
      showHideTableFSBill(true, dispatch);
    } else {
      dispatch(
        handleField(
          "fsBillSearch",
          "components.div.children.fsBillSearchDetailsTable",
          "props.data",
          []
        )
      );
      dispatch(
        handleField(
          "fsBillSearch",
          "components.div.children.fsBillSearchDetailsTable",
          "props.tableData",
          []
        )
      );
      dispatch(
        handleField(
          "fsBillSearch",
          "components.div.children.fsBillSearchDetailsTable",
          "props.rows",
          0
        )
      );
      showHideTableFSBill(true, dispatch);
    }
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
  }
};

const showHideTableFSBill = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "fsBillSearch",
      "components.div.children.fsBillSearchDetailsTable",
      "visible",
      booleanHideOrShow
    )
  );
};
const searchApiCallForRateCard = async (state, dispatch, index) => {
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCardSearch"
  );

  let query = { tenantId: "km.kolkata" };
  query["searchType"] = "HEARING";
  query["assesseeNo"] = searchScreenObject["assesseeNo"];
  
    try {
      let searchScreenObject = get(
       state.screenConfiguration.preparedFinalObject,
       "rateCardSearch"
     );
     
          let response = null;
          response = await httpRequest(
            "post",
            `/property-services/property/_search?assesseeNo=${searchScreenObject["assesseeNo"]}&tenantId=km.kolkata&searchType=HEARING`,
            "_search",
            [],
            {}
          );
     
       let propertyVal = response.Properties.length;
   
       if (propertyVal > 0) {
      dispatch(
        prepareFinalObject("rateCardSearchResult", response.Properties[0])
      );

      let effectiveQuarter = `${response.Properties[0]["taxdetails"][
        "effectiveQtr"
      ]
        .toString()
        .substr(4, 5)}/${response.Properties[0]["taxdetails"]["effectiveQtr"]
        .toString()
        .substr(0, 4)}`;

      let proposedQuarterVal = `${response.Properties[0]["taxdetails"][
        "proposedQtr"
      ]
        .toString()
        .substr(4, 5)}/${response.Properties[0]["taxdetails"]["proposedQtr"]
        .toString()
        .substr(0, 4)}`;

      const rateCard = {
        propertyId: response.Properties[0]["assesseeNo"],
        noticeNo: response.Properties[0]["noticeNo"],
        assesseeNo: response.Properties[0]["assesseeNo"],
        wardNo: response.Properties[0]["ward"],
        premiseNo: response.Properties[0]["premisesNo"],
        existingAV: response.Properties[0]["taxdetails"]["existingAV"],
        existingQTR: effectiveQuarter,
        division: "1",
        existingCommAV:
          response.Properties[0]["taxdetails"]["commAv"].toString(),
        propCommAv: response.Properties[0]["taxdetails"]["commAv"].toString(),
        appFlag: response.Properties[0]["taxdetails"]["appdFlag"],
        grTR: "GR",
        proposedAV: response.Properties[0]["taxdetails"]["av"],
        hearingDate: "11/10/2022",
        hearingReason: "Hearing Reason",
        status: response.Properties[0]["taxdetails"]["status"],
        hearingSection: "",
        hearingTime: "",
        proposedQTR: proposedQuarterVal,
        appertioned: "",

        existingQuarter: effectiveQuarter,
        proposedquarter: proposedQuarterVal,

        decidedav: response.Properties[0]["taxdetails"]["decidedav"],
        fixedCommAv: response.Properties[0]["taxdetails"]["fixedCommAv"],
        decidedqtrlyTax:
          response.Properties[0]["taxdetails"]["quarter"].toString(),
        decidednormalRate: response.Properties[0]["taxdetails"]["rate"],
        decidedcommRate: response.Properties[0]["taxdetails"]["commRate"],
        decidedpayableAmount:
          response.Properties[0]["taxdetails"]["paybleAmount"],
        decidedquarterAmount:
          response.Properties[0]["taxdetails"]["quateryAmount"],
        decidedsurchargeAmount:
          response.Properties[0]["taxdetails"]["netAmount"],
      };
      dispatch(prepareFinalObject("rateCard", rateCard));


      const capturedTableData = response.Properties.map((item) => {
        let effectiveQuarter = `${item.taxdetails.effectiveQtr
          .toString()
          .substr(4, 5)}/${item.taxdetails.effectiveQtr
          .toString()
          .substr(0, 4)}`;

        let proposedAVal = `${item.taxdetails.proposedQtr
          .toString()
          .substr(4, 5)}/${item.taxdetails.proposedQtr
          .toString()
          .substr(0, 4)}`;

        return {
          assesseeNo: get(item, "assesseeNo") ? get(item, "assesseeNo") : "-",
          premisesNo: get(item, "premisesNo") ? get(item, "premisesNo") : "-",
          street: get(item, "street") ? get(item, "street") : "-",
          effectiveQuarter: get(item, effectiveQtr) ? get(item, effectiveQtr): "-",
          proposedAV: get(item, "taxdetails.av") ? get(item, "taxdetails.av"): "",
          Status: get(item, "Properties.status") ? get(item, "Properties.status") : "",
        };
      });

      let data = response.Properties.map((item) => ({
        ["Assessee No"]: item.assesseeNo || "-",
        ["Premises No"]: item.premisesNo || "-",
        ["Street"]: item.street || "-",
        ["Hearing Date"]: "31/10/2022" || "-",
        ["Notice No"]: "Notice No 123" || "-",
        ["Effective Quarter"]:
          `${item.taxdetails.effectiveQtr
            .toString()
            .substr(4, 5)}/${item.taxdetails.effectiveQtr
            .toString()
            .substr(0, 4)}` || "-",
        ["Proposed AV"]: item.taxdetails.av || "-",
        ["Proposed Quarter"]:
          `${item.taxdetails.proposedQtr
            .toString()
            .substr(4, 5)}/${item.taxdetails.proposedQtr
            .toString()
            .substr(0, 4)}` || "-",
        ["Status"]: item.status || "-",
      }));

      dispatch(
        handleField(
          "rateCardSearch",
          "components.div.children.rateCardSearchDetailsTable",
          "props.data",
          data
        )
      );
      dispatch(
        handleField(
          "rateCardSearch",
          "components.div.children.rateCardSearchDetailsTable",
          "props.tableData",
          capturedTableData
        )
      );
      dispatch(
        handleField(
          "rateCardSearch",
          "components.div.children.rateCardSearchDetailsTable",
          "props.rows",
          capturedTableData.length
        )
      );

      showHideTableRateCard(true, dispatch);
    } else {
      dispatch(
        handleField(
          "rateCardSearch",
          "components.div.children.rateCardSearchDetailsTable",
          "props.data",
          []
        )
      );
      dispatch(
        handleField(
          "rateCardSearch",
          "components.div.children.rateCardSearchDetailsTable",
          "props.tableData",
          []
        )
      );
      dispatch(
        handleField(
          "rateCardSearch",
          "components.div.children.rateCardSearchDetailsTable",
          "props.rows",
          0
        )
      );
      showHideTableRateCard(true, dispatch);
    }
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
  }
};

const showHideTableRateCard = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "rateCardSearch",
      "components.div.children.rateCardSearchDetailsTable",
      "visible",
      booleanHideOrShow
    )
  );
};

const hearingNoticeDataval = async (state, dispatch, index) => {
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "hearingNoticeSearch"
  );

  let query = { tenantId: "km.kolkata" };
  query["searchType"] = "INSPECTION";
  query["assesseeNo"] = searchScreenObject["assesseeNo"].trim();

  let queryObject = [];
  Object.keys(query).map((key) => {
    queryObject.push({
      key: key,
      value: key == "doorNo" ? encodeURIComponent(query[key]) : query[key],
    });
  });
  try {
    const response = await getSearchResults(queryObject);
    dispatch(prepareFinalObject("hearingNoticeResult", response.Properties[0]));

    const hearingNoticeData = response.Properties.map((item) => {
      let effectiveQuarter = `${item.taxdetails.effectiveQtr
        .toString()
        .substr(4, 5)}/${item.taxdetails.effectiveQtr.toString().substr(0, 4)}`;

      let proposedQtrVal = `${item.taxdetails.proposedQtr
        .toString()
        .substr(4, 5)}/${item.taxdetails.proposedQtr.toString().substr(0, 4)}`;

      return {
        assesseeNo: get(item, "assesseeNo"),
        premisesNo: get(item, "premisesNo"),
        street: get(item, "street"),
        AV: get(item, "taxdetails.av"),
        effectiveQuarter: effectiveQuarter,
        proposedQuarter: proposedQtrVal,
        Status: get(item, "Properties.status"),
      };
    });

    let data = response.Properties.map((item) => ({
      ["Assessee No"]: item.assesseeNo || "-",
      ["Premises No"]: item.premisesNo || "-",
      ["Street"]: item.street || "-",
      ["AV"]: item.taxdetails.av || "-",
      ["Effective Quarter"]:
        `${item.taxdetails.effectiveQtr
          .toString()
          .substr(4, 5)}/${item.taxdetails.effectiveQtr
          .toString()
          .substr(0, 4)}` || "-",
      ["Proposed Quarter"]:
        `${item.taxdetails.proposedQtr
          .toString()
          .substr(4, 5)}/${item.taxdetails.proposedQtr
          .toString()
          .substr(0, 4)}` || "-",
      ["Status"]: item.status || "-",
    }));

    dispatch(
      handleField(
        "hearingNoticeSearch",
        "components.div.children.searchDetailsTable",
        "props.data",
        data
      )
    );
    dispatch(
      handleField(
        "hearingNoticeSearch",
        "components.div.children.searchDetailsTable",
        "props.tableData",
        hearingNoticeData
      )
    );
    dispatch(
      handleField(
        "hearingNoticeSearch",
        "components.div.children.searchDetailsTable",
        "props.rows",
        hearingNoticeData.length
      )
    );

    const showHideTable = (booleanHideOrShow, dispatch) => {
      dispatch(
        handleField(
          "hearingNoticeSearch",
          "components.div.children.searchDetailsTable",
          "visible",
          booleanHideOrShow
        )
      );
    };
    showHideTable(true, dispatch);
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
  }
};

export const applicationSearch = async (state, dispatch) => {
  // searchApiCall(state, dispatch, 1)
  const safDetails = [
    {
      akgNo: "002/03/2017-2018/0000034",
      quarter: "1/2017",
      wardNo: "002",
      blockId: "2/1",
      streetName: "D GUPTA LANE",
      sourceType: "Portal",
      statusChangeDate: "2017-12-19 14:05:47:0",
    },
  ];

  const safTableData = safDetails.map((item) => {
    return {
      akgNo: get(item, "akgNo"),
      quarter: get(item, "quarter"),
      wardNo: get(item, "wardNo"),
      blockId: get(item, "blockId"),
      streetName: get(item, "streetName"),
      sourceType: get(item, "sourceType"),
      statusChangeDate: get(item, "statusChangeDate"),
    };
  });

  let data = safTableData.map((item) => ({
    ["Acknowledgement No"]: item.akgNo || "-",
    ["Quarter"]: item.quarter || "-",
    ["Ward No"]: item.wardNo || "-",
    ["Block Id"]: item.blockId || "-",
    ["Street Name"]: item.streetName || "-",
    ["Source Type"]: item.sourceType || "-",
    ["Status Change Date"]: item.statusChangeDate || "-",
  }));

  dispatch(prepareFinalObject("propertySearchResult", safDetails));

  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.searchAssesseResult",
      "props.data",
      data
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.searchAssesseResult",
      "props.tableData",
      safTableData
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.searchAssesseResult",
      "props.rows",
      safTableData.length
    )
  );
};

const removeValidation = (state, dispatch, index) => {
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo",
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.propertyTaxUniqueId",
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.existingPropertyId",
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.propertyTaxApplicationNo",
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.ownerMobNoProp",
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.applicationPropertyTaxUniqueId",
      "props.error",
      false
    )
  );

  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo",
      "isFieldValid",
      true
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.propertyTaxUniqueId",
      "isFieldValid",
      true
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.existingPropertyId",
      "isFieldValid",
      true
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.propertyTaxApplicationNo",
      "isFieldValid",
      true
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.ownerMobNoProp",
      "isFieldValid",
      true
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.applicationPropertyTaxUniqueId",
      "isFieldValid",
      true
    )
  );
};

const getAddress = (item) => {
  let doorNo = item.address.doorNo != null ? item.address.doorNo + "," : "";
  let buildingName =
    item.address.buildingName != null ? item.address.buildingName + "," : "";
  let street = item.address.street != null ? item.address.street + "," : "";
  let mohalla = item.address.locality.name
    ? getLocaleLabels(
        "NA",
        `${getTransformedLocale(item.tenantId)}_REVENUE_${
          item.address.locality.code
        }`
      ) + ","
    : "";
  let city =
    item.tenantId != null
      ? getLocaleLabels(
          "NA",
          `TENANT_TENANTS_${getTransformedLocale(item.tenantId)}`
        )
      : "";
  return doorNo + buildingName + street + mohalla + city;
};

const searchApiCall = async (state, dispatch, index) => {
  showHideTable(false, dispatch, 0);
  showHideTable(false, dispatch, 1);

  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "ptSearchScreen",
    {}
  );
  Object.keys(searchScreenObject).map((key) => {
    searchScreenObject[key] =
      searchScreenObject[key] &&
      typeof searchScreenObject[key] == "string" &&
      searchScreenObject[key].trim();
  });
  if (!searchScreenObject.tenantId && index == 0) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields to search",
          labelKey: "ERR_PT_FILL_VALID_FIELDS",
        },
        "error"
      )
    );
    return;
  }

  let query = { tenantId: searchScreenObject.tenantId };
  if (index == 1 && process.env.REACT_APP_NAME == "Citizen") {
    query = {};
  }

  let form1 = validateFields(
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails",
    state,
    dispatch,
    "propertySearch"
  );
  let form2 = validateFields(
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails",
    state,
    dispatch,
    "propertySearch"
  );
  // "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails"
  // "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails"
  // "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo"
  const isSearchBoxFirstRowValid = validateFields(
    "components.div.children.captureMutationDetails.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchProperty.children.searchPropertyDetails.children.ulbCityContainer.children",
    state,
    dispatch,
    "propertySearch"
  );

  const isownerCityRowValid = validateFields(
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ulbCity",
    state,
    dispatch,
    "propertySearch"
  );
  const isownerLocalityRowValid =
    validateFields(
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.locality",
      state,
      dispatch,
      "propertySearch"
    ) || searchScreenObject.locality == "";
  const isownerDoorNoRowValid =
    validateFields(
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.doorNo",
      state,
      dispatch,
      "propertySearch"
    ) || searchScreenObject.doorNo == "";
  const isownerNameRowValid =
    validateFields(
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerName",
      state,
      dispatch,
      "propertySearch"
    ) || searchScreenObject.name == "";

  const isownerMobNoRowValid =
    validateFields(
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo",
      state,
      dispatch,
      "propertySearch"
    ) || searchScreenObject.mobileNumber == "";

  const ispropertyTaxUniqueIdRowValid =
    validateFields(
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.propertyTaxUniqueId",
      state,
      dispatch,
      "propertySearch"
    ) || searchScreenObject.ids == "";

  const isexistingPropertyIdRowValid =
    validateFields(
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.existingPropertyId",
      state,
      dispatch,
      "propertySearch"
    ) || searchScreenObject.oldPropertyId == "";
  const ispropertyTaxApplicationNoRowValid =
    validateFields(
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.propertyTaxApplicationNo",
      state,
      dispatch,
      "propertySearch"
    ) || searchScreenObject.acknowledgementIds == "";
  const ispropertyTaxApplicationOwnerNoRowValid =
    validateFields(
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.ownerMobNoProp",
      state,
      dispatch,
      "propertySearch"
    ) || searchScreenObject.mobileNumber == "";
  const ispropertyTaxApplicationPidRowValid =
    validateFields(
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.applicationPropertyTaxUniqueId",
      state,
      dispatch,
      "propertySearch"
    ) || searchScreenObject.ids == "";

  let formValid = false;
  if (index == 0) {
    if (
      searchScreenObject.locality != "" &&
      (searchScreenObject.ids != "" ||
        searchScreenObject.mobileNumber != "" ||
        searchScreenObject.oldPropertyId != "" ||
        searchScreenObject.name != "" ||
        searchScreenObject.doorNo != "")
    ) {
      formValid = true;
    }
  } else {
    if (
      searchScreenObject.ids != "" ||
      searchScreenObject.mobileNumber != "" ||
      searchScreenObject.acknowledgementIds != ""
    ) {
      formValid = true;
    }
  }
  if (!formValid) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields to search",
          labelKey: "ERR_PT_FILL_VALID_FIELDS",
        },
        "error"
      )
    );
    return;
  }

  if (!isSearchBoxFirstRowValid) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields to search",
          labelKey: "ERR_PT_FILL_VALID_FIELDS",
        },
        "error"
      )
    );
    return;
  }
  if (
    index == 0 &&
    !(
      isSearchBoxFirstRowValid &&
      isownerCityRowValid &&
      ispropertyTaxUniqueIdRowValid &&
      isexistingPropertyIdRowValid &&
      isownerMobNoRowValid &&
      isownerLocalityRowValid &&
      isownerDoorNoRowValid &&
      isownerNameRowValid
    )
  ) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field along with city",
          labelKey: "PT_INVALID_INPUT",
        },
        "error"
      )
    );
    return;
  } else if (
    index == 1 &&
    !(
      ispropertyTaxApplicationPidRowValid &&
      ispropertyTaxApplicationOwnerNoRowValid &&
      ispropertyTaxApplicationNoRowValid
    )
  ) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field along with city",
          labelKey: "PT_INVALID_INPUT",
        },
        "error"
      )
    );
    return;
  }

  if (
    Object.keys(searchScreenObject).length == 0 ||
    Object.keys(searchScreenObject).length == 1 ||
    Object.values(searchScreenObject).every((x) => x === "")
  ) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field along with city",
          labelKey:
            "PT_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE_OTHER_THAN_CITY",
        },
        "error"
      )
    );
    return;
  } else {
    removeValidation(state, dispatch, index);
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key].trim() !== ""
      ) {
        if (key === "tenantId") {
        } else if (key === "ids") {
          query["propertyIds"] = searchScreenObject[key].trim();
        } else {
          query[key] = searchScreenObject[key].trim();
        }
      }
    }
    let queryObject = [];
    Object.keys(query).map((key) => {
      queryObject.push({
        key: key,
        value: key == "doorNo" ? encodeURIComponent(query[key]) : query[key],
      });
    });
    try {
      disableField(
        "propertySearch",
        "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.button.children.buttonContainer.children.searchButton",
        dispatch
      );
      disableField(
        "propertySearch",
        "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.button.children.buttonContainer.children.searchButton",
        dispatch
      );

      /* Fuzzy serach seperate API implementation */
      /* const response = (searchScreenObject['doorNo'] || searchScreenObject['name']) && index == 0 ? await getSearchResults(queryObject, {}, "/property-services/property/fuzzy/_search") : await getSearchResults(queryObject); */

      const response = await getSearchResults(queryObject);

      let propertyData = response.Properties.map((item) => ({
        ["PT_COMMON_TABLE_COL_PT_ID"]: item.propertyId || "-",
        ["PT_COMMON_TABLE_COL_OWNER_NAME"]: item.owners[0].name || "-",
        ["PT_GUARDIAN_NAME"]: item.owners[0].fatherOrHusbandName || "-",
        ["PT_COMMON_COL_EXISTING_PROP_ID"]: item.oldPropertyId || "-",
        ["PT_COMMON_COL_ADDRESS"]: getAddress(item) || "-",
        ["TENANT_ID"]: item.tenantId,
        ["PT_COMMON_TABLE_COL_STATUS_LABEL"]: item.status || "-",
      }));

      let applicationData = response.Properties.map((item) => ({
        ["PT_COMMON_TABLE_COL_APP_NO"]: item || "-",
        ["PT_COMMON_TABLE_COL_PT_ID"]: item || "-",
        ["PT_COMMON_TABLE_COL_APP_TYPE"]: item.creationReason ? (
          <LabelContainer
            labelName={"PT." + item.creationReason}
            labelKey={"PT." + item.creationReason}
          />
        ) : (
          "NA"
        ),
        ["PT_COMMON_TABLE_COL_OWNER_NAME"]: item.owners[0].name || "-",
        ["PT_COMMON_COL_ADDRESS"]: getAddress(item) || "-",
        ["TENANT_ID"]: item.tenantId,
        ["PT_COMMON_TABLE_COL_STATUS_LABEL"]: item.status || "-",
        temporary: item,
      }));
      enableField(
        "propertySearch",
        "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.button.children.buttonContainer.children.searchButton",
        dispatch
      );
      enableField(
        "propertySearch",
        "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.button.children.buttonContainer.children.searchButton",
        dispatch
      );
      dispatch(
        handleField(
          "propertySearch",
          "components.div.children.searchPropertyTable",
          "props.data",
          propertyData
        )
      );
      dispatch(
        handleField(
          "propertySearch",
          "components.div.children.searchPropertyTable",
          "props.rows",
          response.Properties.length
        )
      );
      dispatch(
        handleField(
          "propertySearch",
          "components.div.children.searchApplicationTable",
          "props.data",
          applicationData
        )
      );
      dispatch(
        handleField(
          "propertySearch",
          "components.div.children.searchApplicationTable",
          "props.rows",
          response.Properties.length
        )
      );
      //showHideProgress(false, dispatch);
      showHideTable(true, dispatch, index);
    } catch (error) {
      //showHideProgress(false, dispatch);
      enableField(
        "propertySearch",
        "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.button.children.buttonContainer.children.searchButton",
        dispatch
      );
      enableField(
        "propertySearch",
        "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.button.children.buttonContainer.children.searchButton",
        dispatch
      );
      dispatch(
        toggleSnackbar(
          true,
          { labelName: error.message, labelKey: error.message },
          "error"
        )
      );
    }
  }
};
const searchApiCallForInspection = async (state, dispatch, index) => {
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "capturedProposed"
  );

  let query = { tenantId: "km.kolkata" };

  query["propertyIds"] = searchScreenObject["assesseNo"].trim();

  let queryObject = [];
  Object.keys(query).map((key) => {
    queryObject.push({
      key: key,
      value: key == "doorNo" ? encodeURIComponent(query[key]) : query[key],
    });
  });
  try {
    const response = await getSearchResults(queryObject);

    dispatch(
      prepareFinalObject("capturedProposedAVTableData", response.Properties[0])
    );

    dispatch(
      handleField(
        "capturedProposedAV",
        "components.div.children.searchAssesseeResult",
        "props.data",
        data
      )
    );

    const capturedTableData = response.Properties.map((item) => {
      let effectiveQuarter = `${item.taxdetails.effectiveQtr
        .toString()
        .substr(4, 5)}/${item.taxdetails.effectiveQtr.toString().substr(0, 4)}`;

      return {
        propertyId: get(item, "propertyId"),
        ward: get(item, "ward"),
        address: get(item, "item.owners[0].correspondenceAddress"),
        effectiveQtr: get(item, effectiveQuarter),
        av: get(item, "item.taxdetails[0].av"),
      };
    });

    let data = response.Properties.map((item) => ({
      ["Assessee No."]: item.assesseeNo || "-",
      ["Ward"]: item.ward || "-",
      ["Address"]: item.owners[0].correspondenceAddress || "-",
      ["Effective Quarter"]:
        `${item.taxdetails.effectiveQtr
          .toString()
          .substr(4, 5)}/${item.taxdetails.effectiveQtr
          .toString()
          .substr(0, 4)}` || "-",
      ["Annual Value"]: item.taxdetails.av || "-",
    }));

    dispatch(
      handleField(
        "capturedProposedAV",
        "components.div.children.searchAssesseeResult",
        "props.data",
        data
      )
    );
    dispatch(
      handleField(
        "capturedProposedAV",
        "components.div.children.searchAssesseeResult",
        "props.tableData",
        capturedTableData
      )
    );
    dispatch(
      handleField(
        "capturedProposedAV",
        "components.div.children.searchAssesseeResult",
        "props.rows",
        capturedTableData.length
      )
    );

    showHideTableForInspection(true, dispatch);
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
  }
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.searchApplicationTable",
      "visible",
      booleanHideOrShow
    )
  );
};
const showHideTableForInspection = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "capturedProposedAV",
      "components.div.children.searchAssesseeResult",
      "visible",
      booleanHideOrShow
    )
  );
};

export const downloadPrintContainer = (
  action,
  state,
  dispatch,
  status,
  applicationNumber,
  tenantId
) => {
  /** MenuButton data based on status */
  let downloadMenu = [];
  let printMenu = [];
  let ptMutationCertificateDownloadObject = {
    label: { labelName: "PT Certificate", labelKey: "MT_CERTIFICATE" },
    link: () => {},
    leftIcon: "book",
  };
  let ptMutationCertificatePrintObject = {
    label: { labelName: "PT Certificate", labelKey: "MT_CERTIFICATE" },
    link: () => {
      console.log("clicked");
    },
    leftIcon: "book",
  };
  let receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "MT_RECEIPT" },
    link: () => {
      console.log("clicked");
    },
    leftIcon: "receipt",
  };
  let receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "MT_RECEIPT" },
    link: () => {
      console.log("clicked");
    },
    leftIcon: "receipt",
  };
  let applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "MT_APPLICATION" },
    link: () => {
      console.log("clicked");
    },
    leftIcon: "assignment",
  };
  let applicationPrintObject = {
    label: { labelName: "Application", labelKey: "MT_APPLICATION" },
    link: () => {
      console.log("clicked");
    },
    leftIcon: "assignment",
  };
  switch (status) {
    case "APPROVED":
      downloadMenu = [
        ptMutationCertificateDownloadObject,
        receiptDownloadObject,
        applicationDownloadObject,
      ];
      printMenu = [
        ptMutationCertificatePrintObject,
        receiptPrintObject,
        applicationPrintObject,
      ];
      break;
    case "APPLIED":
    case "CITIZENACTIONREQUIRED":
    case "FIELDINSPECTION":
    case "PENDINGAPPROVAL":
    case "PENDINGPAYMENT":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "CANCELLED":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "REJECTED":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    default:
      break;
  }
  /** END */

  return {
    rightdiv: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: { textAlign: "right", display: "flex" },
      },
      children: {
        downloadMenu: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-pt",
          componentPath: "MenuButton",
          props: {
            data: {
              label: { labelName: "DOWNLOAD", labelKey: "MT_DOWNLOAD" },
              leftIcon: "cloud_download",
              rightIcon: "arrow_drop_down",
              props: {
                variant: "outlined",
                style: { height: "60px", color: "#FE7A51", marginRight: "5px" },
                className: "pt-download-button",
              },
              menu: downloadMenu,
            },
          },
        },
        printMenu: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-pt",
          componentPath: "MenuButton",
          props: {
            data: {
              label: { labelName: "PRINT", labelKey: "MT_PRINT" },
              leftIcon: "print",
              rightIcon: "arrow_drop_down",
              props: {
                variant: "outlined",
                style: { height: "60px", color: "#FE7A51" },
                className: "pt-print-button",
              },
              menu: printMenu,
            },
          },
        },
      },
      // gridDefination: {
      //   xs: 12,
      //   sm: 6
      // }
    },
  };
};
