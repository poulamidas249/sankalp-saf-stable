import { LabelContainer } from "egov-ui-framework/ui-containers";
import { handleScreenConfigurationFieldChange as handleField, toggleSnackbar, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { disableField, enableField, getLocaleLabels, getTransformedLocale } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import React from "react";
import { getSearchResultsForSafFormat, getSearchResultsForSafMaster, getSearchResultsForTempAssessee } from "../../../../ui-utils/commons";
import { validateFields } from "../utils/index";

export const propertySearch = async (state, dispatch) => {
  searchApiCall(state, dispatch, 0)
}

export const applicationSearch = async (state, dispatch) => {
  searchApiCall(state, dispatch, 1)
}

const removeValidation = (state, dispatch, index) => {

  dispatch(
    handleField(
      "propertySearchTemp",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo",
      "props.error",
      false
    )
  );

  dispatch(
    handleField(
      "propertySearchTemp",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo",
      "isFieldValid",
      true
    )
  );

}

const getAddress = (item) => {
  let doorNo = item.address.doorNo != null ? (item.address.doorNo + ",") : '';
  let buildingName = item.address.buildingName != null ? (item.address.buildingName + ",") : '';
  let street = item.address.street != null ? (item.address.street + ",") : '';
  let mohalla = item.address.locality.name ? (getLocaleLabels("NA", `${getTransformedLocale(item.tenantId)}_REVENUE_${item.address.locality.code}`) + ",") : '';
  let city = item.tenantId != null ? (getLocaleLabels("NA", `TENANT_TENANTS_${getTransformedLocale(item.tenantId)}`)) : '';
  return (doorNo + buildingName + street + mohalla + city);
}

const searchApiCall = async (state, dispatch, index) => {
  showHideTable(false, dispatch, 0);
  showHideTable(false, dispatch, 1);

  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "ptSearchScreen",
    {}
  );
  Object.keys(searchScreenObject).map(key => {
    searchScreenObject[key] = searchScreenObject[key] && typeof searchScreenObject[key] == 'string' && searchScreenObject[key].trim();
  })

  let query = { "tenantId": "km.kolkata", "searchType": "DRAFT" };
  // if (index == 1 && process.env.REACT_APP_NAME == "Citizen") {
  //   query = {}
  // }

  const isPropertyAssesseeNumberValid = validateFields(
    "components.div.children.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.propertyAssesseeNumber",
    state,
    dispatch,
    "propertySearchTemp"
  ) || searchScreenObject.assessmentNumber == "";

  const isPropertyAcknowledgementNumberValid = validateFields(
    "components.div.children.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.propertyAcknowledgementNumber",
    state,
    dispatch,
    "propertySearchTemp"
  ) || searchScreenObject.acknowledgementNumber == "";

  let formValid = false;
  if (searchScreenObject.propertyDraftAssesseeNumber && searchScreenObject.propertyDraftAssesseeNumber != "" || searchScreenObject.propertyAssesseeNumber &&  searchScreenObject.propertyAssesseeNumber != "") {
    formValid = true;
  }
  if (!formValid) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid field to search",
          labelKey: "Please fill valid field to search"
        },
        "error"
      )
    );
    return;
  }



  if (
    Object.keys(searchScreenObject).length == 0 || (Object.values(searchScreenObject).every(x => x === ""))
  ) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field",
          labelKey: "Please fill at least one field"
        },
        "error"
      )
    );
    return;
  }

  else {

    //removeValidation(state, dispatch, index);
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key].trim() !== ""
      ) {
        if (key === "tenantId") {

        }
        else if (key === "propertyDraftAssesseeNumber") {
          query["tmpAsseseeNo"] = searchScreenObject[key].trim();
        }
        else {
          query[key] = searchScreenObject[key].trim();
        }
      }
    }
    let queryObject = [];
    Object.keys(query).map(key => {
      queryObject.push({
        key: key, value: key == "doorNo" ? encodeURIComponent(query[key]) : query[key]
      })
    })
    try {
      disableField('propertySearchTemp', "components.div.children.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.searchButton", dispatch);

      /* Fuzzy serach seperate API implementation */
      /* const response = (searchScreenObject['doorNo'] || searchScreenObject['name']) && index == 0 ? await getSearchResults(queryObject, {}, "/property-services/property/fuzzy/_search") : await getSearchResults(queryObject); */

      let response = await getSearchResultsForTempAssessee(queryObject);
      response = response.Properties[0]
      dispatch(prepareFinalObject("propertyRes", response));

      console.log('response1234', response)

      let applicationData = [{
        ["Draft Assessee Number"]:
          response.tmpAssesseeNo || "-",
        ["Acknowldgement Number"]:
          response.acknowldgementNumber || "-",
        ["Owner Name"]:
          response.owners[0].userName || "-",
        ["Address"]:
          response.owners[0].address || "-",
        ["Status"]: response.status || "-",

      }]

      enableField('propertySearchTemp', "components.div.children.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.searchButton", dispatch);
      dispatch(
        handleField(
          "propertySearchTemp",
          "components.div.children.searchPropertyTable",
          "props.data",
          []
        )
      );
      dispatch(
        handleField(
          "propertySearchTemp",
          "components.div.children.searchPropertyTable",
          "props.rows",
          0
        )
      );
      dispatch(
        handleField(
          "propertySearchTemp",
          "components.div.children.searchApplicationTable",
          "props.data",
          applicationData
        )
      );
      dispatch(
        handleField(
          "propertySearchTemp",
          "components.div.children.searchApplicationTable",
          "props.rows",
          applicationData.length
        )
      );
      //showHideProgress(false, dispatch);
      showHideTable(true, dispatch, index);
    } catch (error) {
      //showHideProgress(false, dispatch);
      enableField('propertySearchTemp', "components.div.children.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.searchButton", dispatch);
      // dispatch(
      //   toggleSnackbar(
      //     true,
      //     { labelName: error.message, labelKey: error.message },
      //     "error"
      //   )
      // );
      dispatch(
        toggleSnackbar(
          true,
          { labelName: "Draft Assessee Number not found", labelKey: "Draft Assessee Number not found" },
          "error"
        )
      );
    }
  }
};
const showHideTable = (booleanHideOrShow, dispatch, index) => {
  if (index == 0) {
    dispatch(
      handleField(
        "propertySearchTemp",
        "components.div.children.searchPropertyTable",
        "visible",
        booleanHideOrShow
      )
    );
  }
  else {
    dispatch(
      handleField(
        "propertySearchTemp",
        "components.div.children.searchApplicationTable",
        "visible",
        booleanHideOrShow
      )
    );
  }
};

