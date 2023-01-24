import { LabelContainer } from "egov-ui-framework/ui-containers";
import {
  handleScreenConfigurationFieldChange as handleField,
  toggleSnackbar,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
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

export const responseCaptureHandler = async (state, dispatch) => {
  searchApiCallForResponseCapture(state, dispatch, 0);
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

  showHideTable(true, dispatch);
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
  query["assesseeNo"] = searchScreenObject["assesseeNo"].trim();
  query["searchType"] = "MASTER";

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

    var requiredJSON = {
      ward: "",
      street: "",
      premisesNo: "",
      premisesType: "",
      propertyDetails: [],
      buildingdetails: {},
      address: {
        ownerShipCategoryDropDown: "",
      },
      registrationDetails: {},
      taxdetails: {},
      owners: {},
    };

    if (response.Properties.length > 0) {
      const createRequiredJSON = (properties) => {
        let registrationDetails = properties.registrationDetails;
        let buildingdetails = properties.buildingdetails;

        requiredJSON.ward = properties.ward;
        requiredJSON.street = properties.street;
        requiredJSON.premisesNo = properties.premisesNo;
        requiredJSON.premisesType = properties.premisesType;

        let ownerArr = [];

        if (properties.owners.length > 0) {
          properties.owners.map((item) => {
            let object = {
              id: item.id,
              uuid: item.id,
              userName: item.id,
              password: item.id,
              salutation: item.id,
              name: item.id,
              gender: item.id,
              mobileNumber: item.id,
              emailId: item.id,
              altContactNumber: item.id,
              pan: item.id,
              aadhaarNumber: item.id,
              permanentAddress: item.id,
              permanentCity: item.id,
              permanentPinCode: item.id,
              correspondenceCity: item.id,
              correspondencePinCode: item.id,
              correspondenceAddress: item.id,
              active: item.id,
              dob: item.id,
              pwdExpiryDate: item.id,
              locale: item.id,
              type: item.id,
              signature: item.id,
              accountLocked: item.id,
              roles: item.id,
              fatherOrHusbandName: item.id,
              bloodGroup: item.id,
              identificationMark: item.id,
              photo: item.id,
              createdBy: item.id,
              createdDate: item.id,
              lastModifiedBy: item.id,
              lastModifiedDate: item.id,
              tenantId: item.id,
              alternatemobilenumber: item.id,
              ownerInfoUuid: item.id,
              isPrimaryOwner: null,
              ownerShipPercentage: item.id,
              ownerType: item.ownerType,
              institutionId: item.institutionId,
              status: item.status,
              documents: item.documents,
              relationship: item.relationship,
              postOffice: item.postOffice,
              policeStation: item.policeStation,
              pincode: item.pincode,
              address: item.address,
            };
            ownerArr.push(object);
          });
        }

        requiredJSON.ownershipCategory = properties.ownershipCategory;
        requiredJSON.ownerShipType = properties.ownershipType;
        requiredJSON.ownerShipCategoryDropDown = properties.ownershipCategory;
        requiredJSON.personLiableTax = properties.personLiableTax;
        requiredJSON.subOwnershipCategory = "MULTIPLEOWNERS";

        let proposedQuarter = properties.taxdetails.proposedQtr
          .toString()
          .substr(4, 5);

        let effectiveQuarter = properties.taxdetails.effectiveQtr
          .toString()
          .substr(4, 5);

        let proposedYear = properties.taxdetails.proposedQtr
          .toString()
          .substr(0, 4);

        let buildingObject = {
          status: buildingdetails.status,
          id: buildingdetails.id,
          planCaseNo: buildingdetails.planCaseNo,
          buildingType: buildingdetails.buildingType,
          numberOfStories: buildingdetails.numberOfStories,
          flatNo: buildingdetails.flatNo,
          occupancyStatus: buildingdetails.occupancyStatus,
          coveredArea: buildingdetails.coveredArea,
          parkingArea: buildingdetails.parkingArea,
          commonArea: buildingdetails.commonArea,
          plotArea: buildingdetails.plotArea,
          areaOfTheProperty: buildingdetails.areaOfTheProperty,
          pondId: buildingdetails.pondId,
          heritageId: buildingdetails.heritageId,
          characterofPremises: buildingdetails.characterofPremises,
          acre: buildingdetails.acre,
          bigha: buildingdetails.bigha,
          cottah: buildingdetails.cottah,
          chatak: buildingdetails.chatak,
          satak: buildingdetails.satak,
          sqMt: buildingdetails.sqMt,
          sqFt: buildingdetails.sqFt,
        };
        let registrationObject = {
          dag: registrationDetails.dag,
          khatian: registrationDetails.khatian,
          mouza: registrationDetails.mouza,
          queryNo: registrationDetails.queryNo,
          queryYear: registrationDetails.queryYear,
          deedNo: registrationDetails.deedNo,
          deedYear: registrationDetails.deedYear,
          location: registrationDetails.location,
          ro: registrationDetails.ro,
          book: registrationDetails.book,
        };

        let taxObject = {
          proposedQTR: proposedQuarter,
          proposedYear: proposedYear,
          effectiveQtr: effectiveQuarter,
          rrMonth: proposedQuarter,
          AV: properties.taxdetails.av.toString(),
          commRate: properties.taxdetails.commRate.toString(),
          howrghBridge: 0,
          taxQtr: 0,
          surcharge: properties.taxdetails.surcharge.toString(),
          payableAmount: properties.taxdetails.paybleAmount.toString(),
          rebateAmount: properties.taxdetails.rebateAmount.toString(),
          netAmount: properties.taxdetails.netAmount.toString(),
        };

        requiredJSON.owners = ownerArr;
        requiredJSON.buildingdetails = buildingObject;
        requiredJSON.registrationDetails = registrationObject;
        requiredJSON.taxdetails = taxObject;

        dispatch(
          prepareFinalObject("capturedProposedAVPropertyData", requiredJSON)
        );

        dispatch(prepareFinalObject("Properties", [requiredJSON]));
        console.log("Properties => ", requiredJSON);
      };
      let capturedProposed = get(
        state.screenConfiguration,
        "preparedFinalObject.capturedProposed"
      );

      let propertyData = response.Properties;

      propertyData[0].taxdetails["proposedYear"] =
        capturedProposed.proposedQuarterYr;

      propertyData[0].taxdetails["proposedQtr"] =
        capturedProposed.proposedQuarterNo;
      propertyData[0].owners[0].ownerType = "SINGLE";

      dispatch(
        prepareFinalObject("capturedProposedAVPropertyData", propertyData[0])
      );
      dispatch(prepareFinalObject("Properties", propertyData));
    } else {
      dispatch(
        prepareFinalObject("capturedProposedAVPropertyData", requiredJSON)
      );
    }

    if (response.Properties && response.Properties.length > 0) {
      let propertyData = response.Properties;
      let taxdetailsNew = {};

      // loop tax details
      let tax = propertyData[0].taxdetails;
      for (const key in tax) {
        if (tax[key] && tax[key] != null) {
          taxdetailsNew[key] = tax[key].toString();
        } else {
          taxdetailsNew[key] = tax[key];
        }
      }

      propertyData[0].taxdetails = taxdetailsNew;

      dispatch(
        prepareFinalObject("capturedProposedAVPropertyData", propertyData)
      );
      dispatch(prepareFinalObject("Properties", propertyData));
    } else {
      dispatch(prepareFinalObject("capturedProposedAVPropertyData", []));
      dispatch(prepareFinalObject("Properties", []));
    }

    const capturedTableData = response.Properties.map((item) => {
      let effectiveQuarter = `${item.taxdetails.effectiveQtr
        .toString()
        .substr(4, 5)}/${item.taxdetails.effectiveQtr.toString().substr(0, 4)}`;

      return {
        assesseeNo: get(item, "assesseeNo"),
        ward: get(item, "ward"),
        address: get(item, "item.owners[0].address"),
        effectiveQtr: get(item, effectiveQuarter),
        av: get(item, "item.taxdetails[0].av"),
      };
    });

    let data = response.Properties.map((item) => ({
      ["Assessee No."]: item.assesseeNo || "-",
      ["Ward"]: item.ward || "-",
      ["Address"]: item.owners[0].address || "-",
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

const searchApiCallForResponseCapture = async (state, dispatch, index) => {
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "responseCaptureScreen"
  );

  let query = { tenantId: "km.kolkata" };
  query["assesseeNo"] = searchScreenObject["assesseeNo"].trim();
  query["searchType"] = "INSPECTION";

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
      prepareFinalObject("responseCaptureSearchResult", response.Properties)
    );

    const responseTableData = response.Properties.map((item) => {
      let effectiveQuarter = `${item.taxdetails.effectiveQtr
        .toString()
        .substr(4, 5)}/${item.taxdetails.effectiveQtr.toString().substr(0, 4)}`;

      let proposedQuarter = `${item.taxdetails.proposedQtr
        .toString()
        .substr(4, 5)}/${item.taxdetails.proposedQtr.toString().substr(0, 4)}`;

      return {
        assesseeNo: get(item, "assesseeNo"),
        owner: get(item, "owners[0].userName"),
        premisesNo: get(item, "premisesNo"),
        street: get(item, "street"),
        av: get(item, "taxdetails.av"),
        effectiveQtr: effectiveQuarter,
        proposedQtr: proposedQuarter,
      };
    });

    let data = responseTableData.map((item) => ({
      ["Assessee No."]: item.assesseeNo || "-",
      ["Owner"]: item.owner || "-",
      ["Premise No."]: item.premisesNo || "-",
      ["Street"]: item.street || "-",
      ["Annual Value"]: item.av || "-",
      ["Effective Qtr"]: item.effectiveQtr || "-",
      ["Proposed Qtr"]: item.proposedQtr || "-",
    }));

    dispatch(
      handleField(
        "responseCaptureScreen",
        "components.div.children.responseCaptureResult",
        "props.data",
        data
      )
    );
    dispatch(
      handleField(
        "responseCaptureScreen",
        "components.div.children.responseCaptureResult",
        "props.tableData",
        responseTableData
      )
    );
    dispatch(
      handleField(
        "responseCaptureScreen",
        "components.div.children.responseCaptureResult",
        "props.rows",
        responseTableData.length
      )
    );

    showHideTableForResponseCapture(true, dispatch);
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

const showHideTableForResponseCapture = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "responseCaptureScreen",
      "components.div.children.responseCaptureResult",
      "visible",
      booleanHideOrShow
    )
  );
  dispatch(
    handleField(
      "responseCaptureScreen",
      "components.div.children.objectionCapture",
      "visible",
      true
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
