import { convertDateToEpoch } from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, toggleSnackbar, toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getTransformedLocale, getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import html2canvas from "html2canvas";
import jp from "jsonpath";
import jsPDF from "jspdf";
import get from "lodash/get";
import set from "lodash/set";
import store from "ui-redux/store";
import { getTranslatedLabel } from "../ui-config/screens/specs/utils";

const handleDeletedCards = (jsonObject, jsonPath, key) => {
  let originalArray = get(jsonObject, jsonPath, []);
  let modifiedArray = originalArray.filter(element => {
    return element.hasOwnProperty(key) || !element.hasOwnProperty("isDeleted");
  });
  modifiedArray = modifiedArray.map(element => {
    if (element.hasOwnProperty("isDeleted")) {
      element["isActive"] = false;
    }
    return element;
  });
  set(jsonObject, jsonPath, modifiedArray);
};

export const getLocaleLabelsforTL = (label, labelKey, localizationLabels) => {
  if (labelKey) {
    let translatedLabel = getTranslatedLabel(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

export const findItemInArrayOfObject = (arr, conditionCheckerFn) => {
  for (let i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};

export const getSearchResults = async (queryObject, requestBody, searchURL = "/property-services/property/_search") => {
  try {
    store.dispatch(toggleSpinner());
    const response = await httpRequest(
      "post",
      searchURL,
      "",
      queryObject,
      requestBody
    );
    response && response.Properties && response.Properties.map(property => {

      let newOwnerList = [];
      let oldOwnerList = [];
      property.owners.map(owner => {
        if (owner.status == 'ACTIVE') {
          newOwnerList.push(owner);
        } else {
          oldOwnerList.push(owner);
        }
      })
      if (property.status == "INWORKFLOW") {
        oldOwnerList.push(...newOwnerList);
        property.owners = oldOwnerList;
      } else {
        newOwnerList.push(...oldOwnerList);
        property.owners = newOwnerList;
      }
    })
    store.dispatch(toggleSpinner());
    return response;
  } catch (error) {
    store.dispatch(toggleSpinner());
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    throw error;
  }
};

export const getSearchResultsForTempAssessee = async (queryObject, requestBody, searchURL = "/property-services/property/_search") => {
  try {

    store.dispatch(toggleSpinner());
    const response = await httpRequest(
      "post",
      searchURL,
      "",
      queryObject,
      requestBody
    );
    store.dispatch(toggleSpinner());
    return response;
  } catch (error) {
    store.dispatch(toggleSpinner());
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    throw error;
  }
};
export const getSearchResultsForSafList = async (safNo, assesseeNo, queryObject, requestBody, searchURL = "/property-services/assessment/_saflistsearch") => {

  try {

    store.dispatch(toggleSpinner());

    // let SelfAssessmentForm = {
    //   "safNo": "001/01/2017-2018/0000025",
    //   "assesseeNo": "110010800043"
    // }

    let SelfAssessmentForm = {
      "safNo": safNo,
      "assesseeNo": assesseeNo
    }

    const response = await httpRequest(
      "post",
      searchURL,
      "",
      [],
      { "SelfAssessmentForm": SelfAssessmentForm }
    );
    console.log('response1234', response)
    store.dispatch(toggleSpinner());
    return response;
  } catch (error) {
    store.dispatch(toggleSpinner());
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    throw error;
  }

  // try {
  //   let response = {
  //     "ResponseInfo": {
  //       "apiId": "Mihy",
  //       "ver": ".01",
  //       "ts": null,
  //       "resMsgId": "uief87324",
  //       "msgId": "20170310130900|en_IN",
  //       "status": "successful"
  //     },
  //     "SelfAssessmentForm": null,
  //     "safList": [
  //       {
  //         "constBaseValue": null,
  //         "constTotalAv": null,
  //         "vacantBaseValue": null,
  //         "vacantTotalAV": null,
  //         "totalAv": null,
  //         "taxRate": null,
  //         "hbtRate": null,
  //         "grossQtrTax": null,
  //         "prevQtrTaxPayble": null,
  //         "taxChangeAmount": null,
  //         "taxChangePercent": null,
  //         "grossCappedTax": null,
  //         "netQtrTax": null,
  //         "currentFinPaid": null,
  //         "currentFinPaidAmt": null,
  //         "currentFinPaidQtr": null,
  //         "totalTaxPayable": null,
  //         "billGenerateFlag": null,
  //         "manualBillAmt": null,
  //         "manualPaybleType": null,
  //         "manualTax": null,
  //         "safNo": "001/01/2017-2018/0000025",
  //         "wardNo": "001",
  //         "safVersion": null,
  //         "status": "MASTER",
  //         "statusDesc": "Submitted",
  //         "statusChangeDate": "2022-10-27",
  //         "checkAssessee": null,
  //         "assesseeNo": "110010800043",
  //         "applicantName": null,
  //         "applicantRelation": null,
  //         "applicantOtherRelation": null,
  //         "blockId": "2/1",
  //         "otherBlockId": null,
  //         "streetCode": null,
  //         "streetName": "BARRACKPORE TRUNK ROAD",
  //         "category": null,
  //         "premisesNo": null,
  //         "mobileNo": "90000000",
  //         "alternateMobileNo": null,
  //         "applicantEMail": null,
  //         "photoIdType": "322",
  //         "photoId": "sasasasasa",
  //         "landMark": null,
  //         "frontageRoadCode": null,
  //         "frontageRoadName_Others": null,
  //         "applicantAddress": null,
  //         "applicantPinCode": null,
  //         "propSituated": null,
  //         "pattaYesNo": null,
  //         "nearestLampPost": null,
  //         "lastReturnYear": null,
  //         "lastReturnQtr": null,
  //         "lastReturnDate": null,
  //         "currReturnYear": "2017",
  //         "currReturnQtr": "1",
  //         "propertyType": null,
  //         "natureOfUse": null,
  //         "av": null,
  //         "effectiveQuarter": null,
  //         "isAvRevised": null,
  //         "isCharacterChange": null,
  //         "characterChangeOtherDesc": null,
  //         "propertyDetails": null,
  //         "propertyChangeDetails": null,
  //         "changeInPropertyDate": null,
  //         "changeInPropOthers": null,
  //         "isIrDoneYesNo": null,
  //         "isMutationApplied": null,
  //         "isUnassessedLandWithStructure": null,
  //         "mutationCaseNo": null,
  //         "sourceType": "Mas",
  //         "isSuoMoto": "N",
  //         "isMasterError": null,
  //         "masterErrorComment": null,
  //         "usageCategory": null,
  //         "UaaPropertyFormatDetails": null,
  //         "ConstructedDetails": null,
  //         "VacantLandDetails": null
  //       },
  //       {
  //         "constBaseValue": null,
  //         "constTotalAv": null,
  //         "vacantBaseValue": null,
  //         "vacantTotalAV": null,
  //         "totalAv": null,
  //         "taxRate": null,
  //         "hbtRate": null,
  //         "grossQtrTax": null,
  //         "prevQtrTaxPayble": null,
  //         "taxChangeAmount": null,
  //         "taxChangePercent": null,
  //         "grossCappedTax": null,
  //         "netQtrTax": null,
  //         "currentFinPaid": null,
  //         "currentFinPaidAmt": null,
  //         "currentFinPaidQtr": null,
  //         "totalTaxPayable": null,
  //         "billGenerateFlag": null,
  //         "manualBillAmt": null,
  //         "manualPaybleType": null,
  //         "manualTax": null,
  //         "safNo": "001/01/2017-2018/0000025",
  //         "wardNo": "001",
  //         "safVersion": null,
  //         "status": "SUBMIT",
  //         "statusDesc": "Submitted",
  //         "statusChangeDate": "2022-10-27",
  //         "checkAssessee": null,
  //         "assesseeNo": "110010800043",
  //         "applicantName": null,
  //         "applicantRelation": null,
  //         "applicantOtherRelation": null,
  //         "blockId": "2/1",
  //         "otherBlockId": null,
  //         "streetCode": null,
  //         "streetName": "BARRACKPORE TRUNK ROAD",
  //         "category": null,
  //         "premisesNo": null,
  //         "mobileNo": "90000000",
  //         "alternateMobileNo": null,
  //         "applicantEMail": null,
  //         "photoIdType": "322",
  //         "photoId": "sasasasasa",
  //         "landMark": null,
  //         "frontageRoadCode": null,
  //         "frontageRoadName_Others": null,
  //         "applicantAddress": null,
  //         "applicantPinCode": null,
  //         "propSituated": null,
  //         "pattaYesNo": null,
  //         "nearestLampPost": null,
  //         "lastReturnYear": null,
  //         "lastReturnQtr": null,
  //         "lastReturnDate": null,
  //         "currReturnYear": "2017",
  //         "currReturnQtr": "1",
  //         "propertyType": null,
  //         "natureOfUse": null,
  //         "av": null,
  //         "effectiveQuarter": null,
  //         "isAvRevised": null,
  //         "isCharacterChange": null,
  //         "characterChangeOtherDesc": null,
  //         "propertyDetails": null,
  //         "propertyChangeDetails": null,
  //         "changeInPropertyDate": null,
  //         "changeInPropOthers": null,
  //         "isIrDoneYesNo": null,
  //         "isMutationApplied": null,
  //         "isUnassessedLandWithStructure": null,
  //         "mutationCaseNo": null,
  //         "sourceType": "Mas",
  //         "isSuoMoto": "N",
  //         "isMasterError": null,
  //         "masterErrorComment": null,
  //         "usageCategory": null,
  //         "UaaPropertyFormatDetails": null,
  //         "ConstructedDetails": null,
  //         "VacantLandDetails": null
  //       }
  //     ]
  //   }

  //   return response;
  // } catch (error) {
  //   store.dispatch(toggleSpinner());
  //   store.dispatch(
  //     toggleSnackbar(
  //       true,
  //       { labelName: error.message, labelKey: error.message },
  //       "error"
  //     )
  //   );
  //   throw error;
  // }
};
export const getSearchResultsForSafFormat = async (safNo, assesseeNo, queryObject, requestBody, searchURL = "/property-services/assessment/_fetchUaaSafDetails?fetchType=Details") => {
  try {

    store.dispatch(toggleSpinner());

    let SelfAssessmentForm = {
      "safNo": safNo,
      "safVersion": "A"
    }

    const response = await httpRequest(
      "post",
      searchURL,
      "",
      [],
      { "requestData": SelfAssessmentForm }
    );

    store.dispatch(toggleSpinner());
    return response.ResponseData;

  } catch (error) {
    store.dispatch(toggleSpinner());
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    throw error;
  }

  // try {
  //   let response = {
  //     "taxRate": 20.00,
  //     "hbtRate": 0.50,
  //     "grossQtrTax": 3229.00,
  //     "prevQtrTaxPayble": 0.00,
  //     "taxChangeAmount": 3229.00,
  //     "taxChangePercent": 0,
  //     "grossCappedTax": 3229.00,
  //     "netQtrTax": 3067.55,
  //     "currentFinPaid": "N",
  //     "currentFinPaidAmt": null,
  //     "currentFinPaidQtr": null,
  //     "totalTaxPayable": 3067.55,
  //     "billGenerateFlag": "YFA",
  //     "manualBillAmt": null,
  //     "manualPaybleType": null,
  //     "manualTax": null,
  //     "safNo": "001/01/2017-2018/0000003",
  //     "wardNo": null,
  //     "safVersion": "A",
  //     "status": "SUBMIT",
  //     "statusDesc": null,
  //     "statusChangeDate": null,
  //     "checkAssessee": null,
  //     "assesseeNo": null,
  //     "applicantName": null,
  //     "applicantRelation": null,
  //     "applicantOtherRelation": null,
  //     "blockId": null,
  //     "otherBlockId": null,
  //     "streetCode": null,
  //     "streetName": null,
  //     "category": null,
  //     "premisesNo": null,
  //     "mobileNo": null,
  //     "alternateMobileNo": null,
  //     "applicantEMail": null,
  //     "photoIdType": null,
  //     "photoId": null,
  //     "landMark": null,
  //     "frontageRoadCode": null,
  //     "frontageRoadName_Others": null,
  //     "applicantAddress": null,
  //     "applicantPinCode": null,
  //     "propSituated": null,
  //     "pattaYesNo": null,
  //     "nearestLampPost": null,
  //     "lastReturnYear": null,
  //     "lastReturnQtr": null,
  //     "lastReturnDate": null,
  //     "currReturnYear": null,
  //     "currReturnQtr": null,
  //     "propertyType": null,
  //     "natureOfUse": null,
  //     "av": null,
  //     "effectiveQuarter": null,
  //     "isAvRevised": null,
  //     "isCharacterChange": null,
  //     "characterChangeOtherDesc": null,
  //     "propertyDetails": null,
  //     "propertyChangeDetails": null,
  //     "changeInPropertyDate": null,
  //     "changeInPropOthers": null,
  //     "isIrDoneYesNo": null,
  //     "isMutationApplied": null,
  //     "isUnassessedLandWithStructure": null,
  //     "mutationCaseNo": null,
  //     "sourceType": null,
  //     "isSuoMoto": null,
  //     "isMasterError": "null",
  //     "masterErrorComment": null,
  //     "usageCategory": null,
  //     "UaaPropertyFormatDetails": {
  //       "safNo": "001/01/2017-2018/0000003",
  //       "totalArea": 1000.00,
  //       "waterbodyArea": 700.00,
  //       "groundArea": 300.00,
  //       "remainingLand": 0.00,
  //       "percentageCover": 70.00,
  //       "percentageGroundCover": 100.00,
  //       "totalRoofArea": 500.00,
  //       "constructedRoofArea": 300.00,
  //       "unConstructedRoofArea": 200.00,
  //       "remarks": null
  //     },
  //     "ConstructedDetails": [
  //       {
  //         "unitName": "2A",
  //         "coveredArea": "400",
  //         "ageFactorValue": "1.00",
  //         "ageFactorId": "A1",
  //         "locationFactorValue": "1.00",
  //         "locationFactorId": "L1",
  //         "structureFactorValue": "1.00",
  //         "structureFactorId": "S1",
  //         "usageFactorValue": "1.50",
  //         "usageFactorId": "U2A",
  //         "occupancyFactorValue": "1.00",
  //         "occupancyFactorId": "O1",
  //         "alreadyAssessed": "Y",
  //         "annualValue": "12000.00"
  //       },
  //       {
  //         "unitName": "2B",
  //         "coveredArea": "300",
  //         "ageFactorValue": "2.00",
  //         "ageFactorId": "A2",
  //         "locationFactorValue": "1.50",
  //         "locationFactorId": "L2",
  //         "structureFactorValue": "1.00",
  //         "structureFactorId": "S1",
  //         "usageFactorValue": "1.50",
  //         "usageFactorId": "U2A",
  //         "occupancyFactorValue": "1.50",
  //         "occupancyFactorId": "O2",
  //         "alreadyAssessed": "Y",
  //         "annualValue": "40500.00"
  //       }
  //     ],
  //     "VacantLandDetails": [
  //       {
  //         "landArea": "200",
  //         "locationFactorValue": "1.00",
  //         "locationFactorId": "L1",
  //         "usageFactorValue": "1.50",
  //         "usageFactorId": "U2A",
  //         "occupancyFactorValue": "1.00",
  //         "occupancyFactorId": "O1",
  //         "alreadyAssessed": "Y",
  //         "AnnualValue": "12000.00"
  //       },
  //       {
  //         "landArea": "100",
  //         "locationFactorValue": "1.50",
  //         "locationFactorId": "L2",
  //         "usageFactorValue": "1.50",
  //         "usageFactorId": "U2A",
  //         "occupancyFactorValue": "1.50",
  //         "occupancyFactorId": "O2",
  //         "alreadyAssessed": "Y",
  //         "AnnualValue": "40500.00"
  //       }
  //     ]
  //   }

  //   return response;
  // } catch (error) {
  //   store.dispatch(toggleSpinner());
  //   store.dispatch(
  //     toggleSnackbar(
  //       true,
  //       { labelName: error.message, labelKey: error.message },
  //       "error"
  //     )
  //   );
  //   throw error;
  // }
};
export const getSearchResultsForSafMaster = async (safNo, assesseeNo, queryObject, requestBody, searchURL = "/property-services/assessment/_fetchUaaSafDetails?fetchType=MASTER") => {
  try {


    store.dispatch(toggleSpinner());

    let SelfAssessmentForm = {
      "safNo": safNo,
      "safVersion": "A"
    }

    const response = await httpRequest(
      "post",
      searchURL,
      "",
      [],
      { "requestData": SelfAssessmentForm }
    );

    store.dispatch(toggleSpinner());
    return response.ResponseData;

  } catch (error) {
    store.dispatch(toggleSpinner());
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    throw error;
  }


  // try {
  //   let response = {
  //     "taxRate": null,
  //     "hbtRate": null,
  //     "grossQtrTax": null,
  //     "prevQtrTaxPayble": null,
  //     "taxChangeAmount": null,
  //     "taxChangePercent": null,
  //     "grossCappedTax": null,
  //     "netQtrTax": null,
  //     "currentFinPaid": null,
  //     "currentFinPaidAmt": null,
  //     "currentFinPaidQtr": null,
  //     "totalTaxPayable": null,
  //     "billGenerateFlag": null,
  //     "manualBillAmt": null,
  //     "manualPaybleType": null,
  //     "manualTax": null,
  //     "safNo": "001/01/2017-2018/0000003",
  //     "wardNo": "001",
  //     "safVersion": "A",
  //     "status": "SUBMIT",
  //     "statusDesc": null,
  //     "statusChangeDate": null,
  //     "checkAssessee": "Y",
  //     "assesseeNo": "110010800020",
  //     "applicantName": "himadri naskar",
  //     "applicantRelation": "O",
  //     "applicantOtherRelation": null,
  //     "blockId": "2/1",
  //     "otherBlockId": null,
  //     "streetCode": "01",
  //     "streetName": null,
  //     "category": "B",
  //     "premisesNo": null,
  //     "mobileNo": "8481006490",
  //     "alternateMobileNo": "8240438236",
  //     "applicantEMail": "himadri.hh@gmail.com",
  //     "photoIdType": "32",
  //     "photoId": "NV23455550",
  //     "landMark": "transformer",
  //     "frontageRoadCode": null,
  //     "frontageRoadName_Others": null,
  //     "applicantAddress": "21A chourangi road kolkata 20",
  //     "applicantPinCode": "743501",
  //     "propSituated": "General",
  //     "pattaYesNo": "N",
  //     "nearestLampPost": "L21",
  //     "lastReturnYear": "2014",
  //     "lastReturnQtr": "4",
  //     "lastReturnDate": null,
  //     "currReturnYear": "2017",
  //     "currReturnQtr": "1",
  //     "propertyType": "A",
  //     "natureOfUse": null,
  //     "av": "91000.00",
  //     "effectiveQuarter": "20144",
  //     "isAvRevised": "N",
  //     "isCharacterChange": "Y",
  //     "characterChangeOtherDesc": null,
  //     "propertyDetails": null,
  //     "propertyChangeDetails": [
  //       "20",
  //       "21",
  //       "36"
  //     ],
  //     "changeInPropertyDate": null,
  //     "changeInPropOthers": "Other change details",
  //     "isIrDoneYesNo": null,
  //     "isMutationApplied": "N",
  //     "isUnassessedLandWithStructure": null,
  //     "mutationCaseNo": "",
  //     "sourceType": "M",
  //     "isSuoMoto": "N",
  //     "isMasterError": "N",
  //     "masterErrorComment": null,
  //     "usageCategory": [
  //       "U1",
  //       "U2A"
  //     ],
  //     "UaaPropertyFormatDetails": null,
  //     "ConstructedDetails": null,
  //     "VacantLandDetails": null
  //   }
  //   return response;
  // } catch (error) {
  //   store.dispatch(toggleSpinner());
  //   store.dispatch(
  //     toggleSnackbar(
  //       true,
  //       { labelName: error.message, labelKey: error.message },
  //       "error"
  //     )
  //   );
  //   throw error;
  // }
};


export const createUpdatePTApplication = async (state, dispatch, status) => {
  let nocId = get(
    state,
    "screenConfiguration.preparedFinalObject.Properties[0].id"
  );
  let method = nocId ? "UPDATE" : "CREATE";
  try {
    let payload = get(
      state.screenConfiguration.preparedFinalObject,
      "FireNOCs",
      []
    );
    let tenantId = get(
      state.screenConfiguration.preparedFinalObject,
      "FireNOCs[0].fireNOCDetails.propertyDetails.address.city",
      getTenantId()
    );
    set(payload[0], "tenantId", tenantId);
    set(payload[0], "fireNOCDetails.action", status);

    // Get uploaded documents from redux
    let reduxDocuments = get(
      state,
      "screenConfiguration.preparedFinalObject.documentsUploadRedux",
      {}
    );

    handleDeletedCards(payload[0], "fireNOCDetails.buildings", "id");
    handleDeletedCards(
      payload[0],
      "fireNOCDetails.applicantDetails.owners",
      "id"
    );

    let buildings = get(payload, "[0].fireNOCDetails.buildings", []);
    buildings.forEach((building, index) => {
      // GET UOMS FOR THE SELECTED BUILDING TYPE
      let requiredUoms = get(
        state,
        "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.BuildingType",
        []
      ).filter(buildingType => {
        return buildingType.code === building.usageType;
      });
      requiredUoms = get(requiredUoms, "[0].uom", []);
      // GET UNIQUE UOMS LIST INCLUDING THE DEFAULT
      let allUoms = [
        ...new Set([
          ...requiredUoms,
          ...[
            "NO_OF_FLOORS",
            "NO_OF_BASEMENTS",
            "PLOT_SIZE",
            "BUILTUP_AREA",
            "HEIGHT_OF_BUILDING"
          ]
        ])
      ];
      let finalUoms = [];
      allUoms.forEach(uom => {
        let value = get(building.uomsMap, uom);
        value &&
          finalUoms.push({
            code: uom,
            value: parseInt(value),
            isActiveUom: requiredUoms.includes(uom) ? true : false,
            active: true
          });
      });

      // Quick fix to repair old uoms
      let oldUoms = get(
        payload[0],
        `fireNOCDetails.buildings[${index}].uoms`,
        []
      );
      oldUoms.forEach((oldUom, oldUomIndex) => {
        set(
          payload[0],
          `fireNOCDetails.buildings[${index}].uoms[${oldUomIndex}].isActiveUom`,
          false
        );
        set(
          payload[0],
          `fireNOCDetails.buildings[${index}].uoms[${oldUomIndex}].active`,
          false
        );
      });
      // End Quick Fix

      set(payload[0], `fireNOCDetails.buildings[${index}].uoms`, [
        ...finalUoms,
        ...oldUoms
      ]);

      // Set building documents
      let uploadedDocs = [];
      jp.query(reduxDocuments, "$.*").forEach(doc => {
        if (doc.documents && doc.documents.length > 0) {
          if (
            doc.documentSubCode &&
            doc.documentSubCode.startsWith("BUILDING.BUILDING_PLAN")
          ) {
            if (doc.documentCode === building.name) {
              uploadedDocs = [
                ...uploadedDocs,
                {
                  tenantId: tenantId,
                  documentType: doc.documentSubCode,
                  fileStoreId: doc.documents[0].fileStoreId
                }
              ];
            }
          }
        }
      });
      set(
        payload[0],
        `fireNOCDetails.buildings[${index}].applicationDocuments`,
        uploadedDocs
      );
    });

    // Set owners & other documents
    let ownerDocuments = [];
    let otherDocuments = [];
    jp.query(reduxDocuments, "$.*").forEach(doc => {
      if (doc.documents && doc.documents.length > 0) {
        if (doc.documentType === "OWNER") {
          ownerDocuments = [
            ...ownerDocuments,
            {
              tenantId: tenantId,
              documentType: doc.documentSubCode
                ? doc.documentSubCode
                : doc.documentCode,
              fileStoreId: doc.documents[0].fileStoreId
            }
          ];
        } else if (!doc.documentSubCode) {
          // SKIP BUILDING PLAN DOCS
          otherDocuments = [
            ...otherDocuments,
            {
              tenantId: tenantId,
              documentType: doc.documentCode,
              fileStoreId: doc.documents[0].fileStoreId
            }
          ];
        }
      }
    });

    set(
      payload[0],
      "fireNOCDetails.applicantDetails.additionalDetail.documents",
      ownerDocuments
    );
    set(
      payload[0],
      "fireNOCDetails.additionalDetail.documents",
      otherDocuments
    );

    // Set Channel and Financial Year
    process.env.REACT_APP_NAME === "Citizen"
      ? set(payload[0], "fireNOCDetails.channel", "CITIZEN")
      : set(payload[0], "fireNOCDetails.channel", "COUNTER");
    set(payload[0], "fireNOCDetails.financialYear", "2019-20");

    // Set Dates to Epoch
    let owners = get(payload[0], "fireNOCDetails.applicantDetails.owners", []);
    owners.forEach((owner, index) => {
      set(
        payload[0],
        `fireNOCDetails.applicantDetails.owners[${index}].dob`,
        convertDateToEpoch(get(owner, "dob"))
      );
    });

    let response;
    if (method === "CREATE") {
      response = await httpRequest(
        "post",
        "/firenoc-services/v1/_create",
        "",
        [],
        { FireNOCs: payload }
      );
      response = furnishNocResponse(response);
      dispatch(prepareFinalObject("FireNOCs", response.FireNOCs));
      setApplicationNumberBox(state, dispatch);
    } else if (method === "UPDATE") {
      response = await httpRequest(
        "post",
        "/firenoc-services/v1/_update",
        "",
        [],
        { FireNOCs: payload }
      );
      response = furnishNocResponse(response);
      dispatch(prepareFinalObject("FireNOCs", response.FireNOCs));
    }

    return { status: "success", message: response };
  } catch (error) {
    dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));

    // Revert the changed pfo in case of request failure
    let fireNocData = get(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs",
      []
    );
    fireNocData = furnishNocResponse({ FireNOCs: fireNocData });
    dispatch(prepareFinalObject("FireNOCs", fireNocData.FireNOCs));

    return { status: "failure", message: error };
  }
};

export const prepareDocumentsUploadData = (state, dispatch) => {
  let documents = get(
    state,
    "screenConfiguration.preparedFinalObject.applyScreenMdmsData.PropertyTax.MutationDocuments",
    []
  );
  documents = documents.filter(item => {
    return item.active;
  });
  let documentsContract = [];
  let tempDoc = {};
  documents.forEach(doc => {
    let card = {};
    card["code"] = doc.documentType;
    card["title"] = doc.documentType;
    card["cards"] = [];
    tempDoc[doc.documentType] = card;
  });

  documents.forEach(doc => {
    // Handle the case for multiple muildings

    let card = {};
    card["name"] = doc.code;
    card["code"] = doc.code;
    card["required"] = doc.required ? true : false;
    if (doc.additionalDetails && doc.additionalDetails.filterCondition) {
      card["filterCondition"] = doc.additionalDetails.filterCondition;
    }
    if (doc.additionalDetails && doc.additionalDetails.dropdownFilter) {
      card["dropdownFilter"] = doc.additionalDetails.dropdownFilter;
    }

    // if(doc.code=='OWNER_REGISTRATIONPROOF'){
    //   card["filterCondition"]={"filterValue":["NONE"],"jsonPath":"Property.ownersTemp","onArray":true,"arrayAttribute":"ownerType"};
    // }
    if (doc.hasDropdown && doc.dropdownData) {
      let dropdown = {};
      dropdown.label = "PT_MUTATION_SELECT_DOC_LABEL";
      dropdown.required = true;
      dropdown.menu = doc.dropdownData.filter(item => {
        return item.active;
      });
      dropdown.menu = dropdown.menu.map(item => {
        let menuItem = { code: item.code, label: getTransformedLocale(item.code) };
        if (item.parentValue) {
          menuItem['parentValue'] = item.parentValue;
        }
        return { ...menuItem };
      });
      card["dropdown"] = dropdown;
    }
    tempDoc[doc.documentType].cards.push(card);

  });

  Object.keys(tempDoc).forEach(key => {
    documentsContract.push(tempDoc[key]);
  });

  dispatch(prepareFinalObject("documentsContract", documentsContract));
};

export const prepareDocumentsUploadRedux = (state, dispatch) => {
  const {
    documentsList,
    documentsUploadRedux = {},
    prepareFinalObject
  } = this.props;
  let index = 0;
  documentsList.forEach(docType => {
    docType.cards &&
      docType.cards.forEach(card => {
        if (card.subCards) {
          card.subCards.forEach(subCard => {
            let oldDocType = get(
              documentsUploadRedux,
              `[${index}].documentType`
            );
            let oldDocCode = get(
              documentsUploadRedux,
              `[${index}].documentCode`
            );
            let oldDocSubCode = get(
              documentsUploadRedux,
              `[${index}].documentSubCode`
            );
            if (
              oldDocType != docType.code ||
              oldDocCode != card.name ||
              oldDocSubCode != subCard.name
            ) {
              documentsUploadRedux[index] = {
                documentType: docType.code,
                documentCode: card.name,
                documentSubCode: subCard.name
              };
            }
            index++;
          });
        } else {
          let oldDocType = get(documentsUploadRedux, `[${index}].documentType`);
          let oldDocCode = get(documentsUploadRedux, `[${index}].documentCode`);
          if (oldDocType != docType.code || oldDocCode != card.name) {
            documentsUploadRedux[index] = {
              documentType: docType.code,
              documentCode: card.name,
              isDocumentRequired: card.required,
              isDocumentTypeRequired: card.dropdown
                ? card.dropdown.required
                : false
            };
          }
        }
        index++;
      });
  });
  prepareFinalObject("documentsUploadRedux", documentsUploadRedux);
};

export const furnishNocResponse = response => {
  // Handle applicant ownership dependent dropdowns
  let ownershipType = get(
    response,
    "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType"
  );
  set(
    response,
    "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipMajorType",
    ownershipType == undefined ? "SINGLE" : ownershipType.split(".")[0]
  );

  // Prepare UOMS and Usage Type Dropdowns in required format
  let buildings = get(response, "FireNOCs[0].fireNOCDetails.buildings", []);
  buildings.forEach((building, index) => {
    let uoms = get(building, "uoms", []);
    let uomMap = {};
    uoms.forEach(uom => {
      uomMap[uom.code] = `${uom.value}`;
    });
    set(
      response,
      `FireNOCs[0].fireNOCDetails.buildings[${index}].uomsMap`,
      uomMap
    );

    let usageType = get(building, "usageType");
    set(
      response,
      `FireNOCs[0].fireNOCDetails.buildings[${index}].usageTypeMajor`,
      usageType == undefined ? "" : usageType.split(".")[0]
    );
  });

  return response;
};

export const setApplicationNumberBox = (state, dispatch, applicationNo) => {
  if (!applicationNo) {
    applicationNo = get(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicationNumber",
      null
    );
  }

  if (applicationNo) {
    dispatch(
      handleField(
        "apply",
        "components.div.children.headerDiv.children.header.children.applicationNumber",
        "visible",
        true
      )
    );
    dispatch(
      handleField(
        "apply",
        "components.div.children.headerDiv.children.header.children.applicationNumber",
        "props.number",
        applicationNo
      )
    );
  }
};
export const generatePdfFromDiv = (action, applicationNumber, divID) => {
  const divName = divID ? divID : "#material-ui-cardContent";
  let target = document.querySelector(divName);
  html2canvas(target, {
    // imageTimeout: 1500000000,
    onclone: function (clonedDoc) {
      if (clonedDoc.getElementById("pdf-header")) {
        clonedDoc.getElementById("pdf-header").style.display = "block";
      }

      // if(clonedDoc.getElementById("property-assess-form")){
      //   clonedDoc.getElementById("property-assess-form").style.display = "none";
      // }
      // if(clonedDoc.getElementById("pt-header-button-container")){
      //   clonedDoc.getElementById("pt-header-button-container").style.display = "none";
      // }
      // if(clonedDoc.getElementById("pt-flex-child-button")){
      //   clonedDoc.getElementById("pt-flex-child-button").style.display = "none";
      // }

    }
  }).then(canvas => {
    var data = canvas.toDataURL("image/jpeg", 1);
    var imgWidth = 200;
    var pageHeight = 290;
    var imgHeight = (canvas.height * imgWidth) / canvas.width;
    var heightLeft = imgHeight;
    var doc = new jsPDF("p", "mm");
    var position = 0;

    doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(data, 'PNG', 5, 10 + position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    if (action === "download") {
      doc.save(`preview-${applicationNumber}.pdf`);
    } else if (action === "print") {
      doc.autoPrint();
      window.open(doc.output("bloburl"), "_blank");
    }
  });
};

export const getBoundaryData = async (
  action,
  state,
  dispatch,
  queryObject,
  code,
  componentPath
) => {
  try {
    let payload = await httpRequest(
      "post",
      "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
      "_search",
      queryObject,
      {}
    );
    const tenantId =
      process.env.REACT_APP_NAME === "Employee"
        ? get(
          state.screenConfiguration.preparedFinalObject,
          "Property.address.city"
        )
        : getQueryArg(window.location.href, "tenantId");

    const mohallaData =
      payload &&
      payload.TenantBoundary[0] &&
      payload.TenantBoundary[0].boundary &&
      payload.TenantBoundary[0].boundary.reduce((result, item) => {
        result.push({
          ...item,
          name: `${tenantId
            .toUpperCase()
            .replace(/[.]/g, "_")}_REVENUE_${item.code
              .toUpperCase()
              .replace(/[._:-\s\/]/g, "_")}`
        });
        return result;
      }, []);

    dispatch(
      prepareFinalObject(
        "applyScreenMdmsData.tenant.localities",
        // payload.TenantBoundary && payload.TenantBoundary[0].boundary,
        mohallaData
      )
    );

    dispatch(
      handleField(
        "register-property",
        "components.div.children.formwizardFirstStep.children.propertyLocationDetails.children.cardContent.children.propertyLocationDetailsContainer.children.localityOrMohalla",
        "props.suggestions",
        mohallaData
      )
    );
    if (code) {

      let data = payload.TenantBoundary[0].boundary;
      let messageObject =
        data &&
        data.find(item => {
          return item.code == code;
        });
      if (messageObject)
        dispatch(
          prepareFinalObject(
            "Property.address.locality.name",
            messageObject.name
          )
        );
    }
  } catch (e) {
    console.log(e);
  }
};

export const getSearchBillResult = async (queryObject, dispatch) => {
  try {
    const response = await httpRequest(
      "post",
      "/billing-service/bill/v2/_fetchbill",
      "",
      queryObject
    );
    return response;
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    console.log(error, "fetxh");
  }
};

export const getDomainLink = () => {
  let link = "";
  if (process.env.NODE_ENV !== "development") {
    link += "/" + process.env.REACT_APP_NAME.toLowerCase()
  }
  return link
};


export const downloadMutationCertificate = (queryObj, fileName) => {
  searchAndDownloadPdf(`/egov-pdf/download/PT/ptmutationcertificate`, queryObj, fileName)
}

export const printMutationCertificate = (queryObj) => {
  searchAndPrintPdf(`/egov-pdf/download/PT/ptmutationcertificate`, queryObj)
}