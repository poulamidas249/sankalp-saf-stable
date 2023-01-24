import commonConfig from "config/common.js";
import { getCommonCard, getCommonContainer, getCommonHeader, getBreak, getCommonParagraph, getCommonTitle, getStepperObject } from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, unMountScreen } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { getAllDataFromBillingSlab, getCurrentFinancialYear, pageResetAndChange } from "../utils";
import { footer } from "./safResource/footer";
import { safPrefilledDetails } from "./safResource/safPrefilledDetails";
import { safPrefilledPropertyDetails } from "./safResource/safPrefilledPropertyDetails";
import { safPropertyDetials } from "./safResource/safPropertyDetials";
import { tradeLocationDetails } from "./safResource/tradeLocationDetails";
import { safFormatCTableOne } from "./safResource/safFormatCTableOne";
import { safFormatCTableTwo } from "./safResource/safFormatCTableTwo";
import { formatALandDetails } from "./safResource/formatALandDetails";
import { formatBLandDetails } from "./safResource/formatBLandDetails";
import { safFormatATableOne } from "./safResource/safFormatATableOne";
import { safFormatATableTwo } from "./safResource/safFormatATableTwo";
import { safFormatATax } from "./safResource/safFormatATax";
import { formatCManualBill } from "./safResource/formatCManualBill";
import { formatAManualBill } from "./safResource/formatAManualBill";
import { safFormatBTableOne } from "./safResource/safFormatBTableOne";
import { formatCSeparateRoof } from "./safResource/formatCSeparateRoof";
import { assesseeDetails } from "./safResource/assesseeDetails";
import { concernedPropertyDetails } from "./safResource/concernedPropertyDetails";
import { safInitiation } from "./safResource/safInitiation";
import { safInitiationCard } from "./safResource/safInitiationCard";
import { safPropDetails } from "./safResource/safPropDetails";
import { safGrossTax } from "./safResource/safGrossTax";
import { safTaxDetails } from "./safResource/safTaxDetails";
import { returnDetails } from "./safResource/returnDetails";
import { existingValuation } from "./safResource/existingValuation";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { httpRequest } from "../../../../ui-utils";
import set from "lodash/set";
import get from "lodash/get";
import { getSearchResultsForSafFormat, getSearchResultsForSafMaster } from "../../../../ui-utils/commons";
export const stepsData = [
  { labelName: "Assessee Details", labelKey: "Assessee Details" },
  { labelName: "Property Details", labelKey: "Property Details" },
  { labelName: "Format Details", labelKey: "Format Details" },
];
export const stepper = getStepperObject(
  { props: { activeStep: 0 } },
  stepsData
);
export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Apply for Self Assessment",
    labelKey: "Apply for Self Assessment"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pt",
    componentPath: "ApplicationNoContainer",
    props: {
      number: "NA",
      label: {
        labelValue: 'Saf Number',
        labelKey: 'Saf Number'
      }
    },
    visible: false
  }
});

export const getMdmsData = async (action, state, dispatch, propData) => {
  let mdmsBody = {
    MdmsCriteria: {
      "tenantId": "km",
      "moduleDetails": [
        {
          "moduleName": "PropertyTax",
          "masterDetails": [
            {
              "name": "AGE_MULTI_FACTOR",

            },
            {
              "name": "LOCATION_MULTI_FACTOR"
            },
            {
              "name": "STRUCTURE_MULTI_FACTOR"
            },
            {
              "name": "OCCUPANCY_MULTI_FACTOR"
            },
            {
              "name": "USAGE_MULTI_FACTOR"
            },
            {
              "name": "ward"
            },
          ]
        }
      ],

    }
  };
  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );

    let wardMdmsData = [
      {
        "name": "001",
        "code": "001",
        "active": true,
        "office": [
          {
            "name": "A.C NORTH",
            "code": "1"
          }
        ],
        "street": [
          {
            "name": "BARRACKPORE TRUNK ROAD",
            "code": "01"
          },
          {
            "name": "CHANDRA KUMAR ROY LANE",
            "code": "02"
          },
          {
            "name": "COSSIPORE ROAD",
            "code": "03"
          },
          {
            "name": "GOBINDA MONDAL ROAD",
            "code": "04"
          },
          {
            "name": "GOPAL CHANDRA CHATTERJEE ROAD",
            "code": "05"
          }
        ],
        "block": [
          {
            "name": "1/1",
            "code": "1/1",
            "category": "E",
            "value": "24"
          },
          {
            "name": "1/2",
            "code": "1/2",
            "category": "D",
            "value": "32"
          }
        ]
      },
      {
        "name": "002",
        "code": "002",
        "active": true,
        "office": [
          {
            "name": "A.C NORTH",
            "code": "1"
          }
        ],
        "street": [
          {
            "name": "BARRACKPORE TRUNK ROAD",
            "code": "01"
          },
          {
            "name": "CENTRE SINTHEE ROAD",
            "code": "02"
          },
          {
            "name": "D GUPTA LANE",
            "code": "03"
          }
        ],
        "block": [
          {
            "name": "2/1",
            "code": "2/1",
            "category": "D",
            "value": "32"
          }
        ]
      },
      {
        "name": "003",
        "code": "003",
        "active": true,
        "office": [
          {
            "name": "A.C NORTH",
            "code": "1"
          }
        ],
        "street": [
          {
            "name": "ANATH NATH DEB LANE",
            "code": "01"
          },
          {
            "name": "BEERPARA LANE",
            "code": "02"
          },
          {
            "name": "BUTTO KRISTO PAUL LANE",
            "code": "03"
          }
        ],
        "block": [
          {
            "name": "3/1",
            "code": "3/1",
            "category": "D",
            "value": "32"
          },
          {
            "name": "3/2",
            "code": "3/2",
            "category": "E",
            "value": "24"
          },
          {
            "name": "3/3",
            "code": "3/3",
            "category": "D",
            "value": "32"
          },
          {
            "name": "3/4",
            "code": "3/4",
            "category": "E",
            "value": "24"
          }
        ]
      },
      {
        "name": "004",
        "code": "004",
        "active": true,
        "office": [
          {
            "name": "A.C NORTH",
            "code": "1"
          }
        ],
        "street": [
          {
            "name": "BARRACKPORE TRUNK ROAD",
            "code": "01"
          },
          {
            "name": "BEERPARA LANE",
            "code": "02"
          },
          {
            "name": "CHANDRA NATH SIMLAI LANE",
            "code": "03"
          }
        ],
        "block": [
          {
            "name": "4/1",
            "code": "4/1",
            "category": "D",
            "value": "32"
          }
        ]
      },
      {
        "name": "005",
        "code": "005",
        "active": true,
        "office": [
          {
            "name": "A.C NORTH",
            "code": "1"
          }
        ],
        "street": [
          {
            "name": "ANATH NATH DEB LANE",
            "code": "01"
          },
          {
            "name": "BARRACKPORE TRUNK ROAD",
            "code": "02"
          },
          {
            "name": "BHAIRAB MOOKHERJEE LANE",
            "code": "03"
          }
        ],
        "block": [
          {
            "name": "5/1",
            "code": "5/1",
            "category": "D",
            "value": "32"
          },
          {
            "name": "5/2",
            "code": "5/2",
            "category": "E",
            "value": "24"
          }
        ]
      }
    ]
    dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
    dispatch(prepareFinalObject("applyScreenMdmsData.PropertyTax.ward", wardMdmsData));

    //let wardMdmsData = payload.MdmsRes.PropertyTax.ward

    console.log('propData1234', propData)
    let blockDropDownData = {}
    if (wardMdmsData.length > 0) {
      let blockDropDownObj = wardMdmsData.filter((w) => {
        return w.code === propData.ward;
      });
      blockDropDownData = blockDropDownObj[0].block
      dispatch(prepareFinalObject("blockDropDownData", blockDropDownData));

    }


  } catch (e) {
    console.log("e", e);
  }
};

const fakeApiCall = async (dispatch, safNumber, action, state) => {

  try {
    // getHeaders(dispatch)
    const masterResponse = await getSearchResultsForSafMaster(safNumber);
    const formatResponse = await getSearchResultsForSafFormat(safNumber);

    console.log('formatResponse1234', formatResponse)
    dispatch(prepareFinalObject("Saf[0].asseseDetail.assesseeNo", masterResponse.assesseeNo));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.applicantName", masterResponse.applicantName));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.applicantAddress", masterResponse.applicantAddress));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.applicantPinCode", masterResponse.applicantPinCode));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.applicantRelation", masterResponse.applicantRelation));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.applicantOtherRelation", masterResponse.applicantOtherRelation));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.mobileNo", masterResponse.mobileNo));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.alternateMobileNo", masterResponse.alternateMobileNo));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.applicantEMail", masterResponse.applicantEMail));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.photoIdType", masterResponse.photoIdType));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.photoId", masterResponse.photoId));


    dispatch(prepareFinalObject("Saf[0].asseseDetail.wardNo", masterResponse.wardNo));
    let mdmsPropsData = { ward: masterResponse.wardNo }

    getMdmsData(action, state, dispatch, mdmsPropsData)
    dispatch(prepareFinalObject("Saf[0].asseseDetail.streetCode", masterResponse.streetCode));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.premisesNo", masterResponse.premisesNo));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.streetName", masterResponse.streetName));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.blockId", masterResponse.blockId));

    let blockDropDownData = get(
      state.screenConfiguration.preparedFinalObject,
      "blockDropDownData",
      []
    );
    if (!blockDropDownData || blockDropDownData == []) {
      dispatch(setRoute("/pt-saf/propertySearch"))
      return action
    }
    let categoryData = blockDropDownData.filter(b => {
      return b.code === action.value
    })
    console.log('categoryData1234', categoryData)
    dispatch(prepareFinalObject("Saf[0].asseseDetail.blockValue", categoryData[0] ? categoryData[0].value : "32"));

    dispatch(prepareFinalObject("Saf[0].asseseDetail.category", masterResponse.category));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.propSituated", masterResponse.propSituated));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.propertyType", null));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.landMark", masterResponse.landMark));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.natureOfUse", masterResponse.natureOfUse));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.frontageRoadName_Others", masterResponse.frontageRoadName_Others));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.nearestLampPost", masterResponse.nearestLampPost));

    dispatch(prepareFinalObject("Saf[0].asseseDetail.lastReturnYear", masterResponse.lastReturnYear));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.currReturnYear", masterResponse.currReturnYear));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.lastReturnQtr", masterResponse.lastReturnQtr));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.currReturnQtr", masterResponse.currReturnQtr));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.av", masterResponse.av));

    dispatch(prepareFinalObject("Saf[0].asseseDetail.landMark", masterResponse.landMark));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.natureOfUse", masterResponse.natureOfUse));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.frontageRoadName_Others", masterResponse.frontageRoadName_Others));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.nearestLampPost", masterResponse.nearestLampPost));

    dispatch(prepareFinalObject("Saf[0].asseseDetail.totalTaxPayable", formatResponse.totalTaxPayable));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.currentFinPaidQtr", formatResponse.currentFinPaidQtr));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.currentFinPaidAmt", formatResponse.currentFinPaidAmt));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.currentFinPaid", formatResponse.currentFinPaid));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.netQtrTax", formatResponse.netQtrTax));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.grossCappedTax", formatResponse.grossCappedTax));

    dispatch(prepareFinalObject("Saf[0].asseseDetail.grossQtrTax", formatResponse.grossQtrTax));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.prevQtrTaxPayble", formatResponse.prevQtrTaxPayble));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.taxChangeAmount", formatResponse.taxChangeAmount));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.taxChangePercent", formatResponse.taxChangePercent));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.grossCappedTax", formatResponse.grossCappedTax));

    dispatch(prepareFinalObject("Saf[0].asseseDetail.grossQtrTax", formatResponse.grossQtrTax));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.taxRate", formatResponse.taxRate));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.hbtRate", formatResponse.hbtRate));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.totalTaxPayable", formatResponse.totalTaxPayable));

    dispatch(prepareFinalObject("Saf[0].asseseDetail.totalArea", formatResponse.UaaPropertyFormatDetails.totalArea));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.waterbodyArea", formatResponse.UaaPropertyFormatDetails.waterbodyArea));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.groundArea", formatResponse.UaaPropertyFormatDetails.groundArea));

    let reviewTableDataOne = []
    let reviewTableDataTwo = []

    let formatName = masterResponse.propertyType

    switch (formatName) {
      case 'A':
        localStorage.setItem('format', 'A')

        formatResponse.VacantLandDetails.map(v => {
          reviewTableDataOne.push({
            "A1ff": v.alreadyAssessed,
            "A1g": v.landArea,
            "A1h": v.usageFactorValue,
            "A1i": v.locationFactorValue,
            "A1j": v.occupancyFactorValue,
            "A1k": v.AnnualValue,
            "A1f": "32"
          })
        })
        formatResponse.ConstructedDetails.map(v => {
          reviewTableDataTwo.push({
            "A2a": v.unitName,
            "A2aa": v.alreadyAssessed,
            "A2b": "32",
            "A2c": v.coveredArea,
            "A2d": v.ageFactorValue,
            "A2e": v.structureFactorValue,
            "A2f": v.usageFactorValue,
            "A2g": v.locationFactorValue,
            "A2h": v.occupancyFactorValue,
            "A2i": v.annualValue,
            "A2j": ""
          })
        })

        dispatch(prepareFinalObject("Saf[0].asseseDetail.formatData", []));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.formatDataOne", reviewTableDataOne));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.formatDataTwo", reviewTableDataTwo));
        dispatch(
          handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.FormatATableOne",
            "props.tableData",
            reviewTableDataOne
          )
        )
        dispatch(
          handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatATableTwo.children.cardContent.children.applicationsCardsdaf",
            "props.newData",
            reviewTableDataTwo
          )
        )

        break;
      case 'B':
        localStorage.setItem('format', 'B')

        formatResponse.VacantLandDetails.map(v => {
          reviewTableDataOne.push({
            "B1dd": v.alreadyAssessed,
            "B1c": v.landArea,
            "B1e": v.usageFactorValue,
            "B1f": v.locationFactorValue,
            "B1g": v.occupancyFactorValue,
            "A1k": v.AnnualValue,
            "B1h": "32"
          })
        })

        dispatch(prepareFinalObject("Saf[0].asseseDetail.formatData", []));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.formatDataOne", reviewTableDataOne));

        dispatch(
          handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatBTableOne.children.cardContent.children.FormatBTableOne",
            "props.tableData",
            reviewTableDataOne
          )
        )

        break;
      case 'C':

        localStorage.setItem('format', 'C')

        formatResponse.VacantLandDetails.map(v => {
          reviewTableDataTwo.push({
            "C2dd": v.alreadyAssessed,
            "C2e": v.landArea,
            "C2f": v.usageFactorValue,
            "C2g": v.locationFactorValue,
            "C2h": v.occupancyFactorValue,
            "C2i": v.AnnualValue,
            "C2d": "32",
            "C2j": ""
          })
        })

        formatResponse.ConstructedDetails.map(v => {
          reviewTableDataOne.push({
            "C1a": v.unitName,
            "C1aa": v.alreadyAssessed,
            "A2b": "32",
            "C1c": v.coveredArea,
            "C1d": v.ageFactorValue,
            "C1e": v.structureFactorValue,
            "C1f": v.usageFactorValue,
            "C1g": v.locationFactorValue,
            "C1h": v.occupancyFactorValue,
            "C1i": v.annualValue,
            "C1j": ""
          })
        })

        dispatch(prepareFinalObject("Saf[0].asseseDetail.formatData", []));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.formatDataOne", reviewTableDataOne));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.formatDataTwo", reviewTableDataTwo));
        dispatch(
          handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableOne.children.cardContent.children.FormatCTableOne",
            "props.tableData",
            reviewTableDataOne
          )
        )
        dispatch(
          handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.safFormatCTableTwo.children.cardContent.children.applicationsCardsdaf",
            "props.newData",
            reviewTableDataTwo
          )
        )

        break;
      default:

        break;

    }



  } catch (e) {
    console.log('e', e)
  }
}
const draftSearch = async (dispatch, safNumber, action, state) => {

  try {
    // getHeaders(dispatch)
    const masterResponse = await getSearchResultsForSafMaster(safNumber);

    dispatch(prepareFinalObject("Saf[0].asseseDetail.assesseeNo", masterResponse.assesseeNo));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.applicantName", masterResponse.applicantName));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.applicantAddress", masterResponse.applicantAddress));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.applicantPinCode", masterResponse.applicantPinCode));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.applicantRelation", masterResponse.applicantRelation));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.applicantOtherRelation", masterResponse.applicantOtherRelation));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.mobileNo", masterResponse.mobileNo));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.alternateMobileNo", masterResponse.alternateMobileNo));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.applicantEMail", masterResponse.applicantEMail));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.photoIdType", masterResponse.photoIdType));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.photoId", masterResponse.photoId));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.isSuoMoto", masterResponse.isSuoMoto));


    dispatch(prepareFinalObject("Saf[0].asseseDetail.wardNo", masterResponse.wardNo));
    let mdmsPropsData = { ward: masterResponse.wardNo }

    getMdmsData(action, state, dispatch, mdmsPropsData)
    dispatch(prepareFinalObject("Saf[0].asseseDetail.streetCode", masterResponse.streetCode));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.premisesNo", masterResponse.premisesNo));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.streetName", masterResponse.streetName));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.blockId", masterResponse.blockId));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.category", masterResponse.category));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.propSituated", masterResponse.propSituated));
    dispatch(
      handleField(
        "apply",
        "components.div.children.formwizardSecondStep.children.safProp.children.cardContent.children.safPropDetails.children.cardContent.children.asseseDetailsConatiner.children.propertyType",
        "props.value",
        masterResponse.propertyType
      )
    )
    //dispatch(prepareFinalObject("Saf[0].asseseDetail.propertyType", null));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.landMark", masterResponse.landMark));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.isCharacterChange", masterResponse.isCharacterChange));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.natureOfUse", masterResponse.natureOfUse));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.frontageRoadName_Others", masterResponse.frontageRoadName_Others));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.nearestLampPost", masterResponse.nearestLampPost));

    dispatch(prepareFinalObject("Saf[0].asseseDetail.lastReturnYear", masterResponse.lastReturnYear));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.currReturnYear", masterResponse.currReturnYear));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.lastReturnQtr", masterResponse.lastReturnQtr));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.currReturnQtr", masterResponse.currReturnQtr));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.av", masterResponse.av));

    dispatch(prepareFinalObject("Saf[0].asseseDetail.landMark", masterResponse.landMark));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.natureOfUse", masterResponse.natureOfUse));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.frontageRoadName_Others", masterResponse.frontageRoadName_Others));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.nearestLampPost", masterResponse.nearestLampPost));

  } catch (e) {
    console.log('e', e)
  }
}

export const formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    safInitiationCard,
    assesseeDetails,
    concernedPropertyDetails

  }
};

export const formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    safProp: getCommonCard({
      header: getCommonTitle(
        {
          labelName: "Property Details",
          labelKey: "Property Details"
        },
        {
          style: {
            marginBottom: 18
          }
        }
      ),
      safPropDetails: safPropDetails
    }),
    returnDetails,
    existingValuation
  },
  visible: false
};

export const formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form3"
  },
  children: {

    formatALandDetails,
    formatBLandDetails,
    safFormatATableOne,
    safFormatBTableOne,
    safFormatCTableOne,
    formatCSeparateRoof,
    safFormatATableTwo,
    safFormatCTableTwo,
    safFormatATax,
    formatCManualBill

  },
  visible: false
};

export const formwizardFourthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form4"
  },
  children: {
    tradeLocationDetails
  },
  visible: false
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  // hasBeforeInitAsync:true,
  beforeInitScreen: (action, state, dispatch) => {
    dispatch(prepareFinalObject("Saf[0].asseseDetail", {}));
    localStorage.setItem('safGenerated', false)
    const isEdit = getQueryArg(window.location.href, "isEdit");
    const isDraft = getQueryArg(window.location.href, "isDraft");

    if (isEdit) {
      let safNumber = getQueryArg(window.location.href, "safNo");
      fakeApiCall(dispatch, safNumber, action, state)
    } else if (isDraft) {
      let safNumber = getQueryArg(window.location.href, "safNo");
      set(
        action.screenConfig,
        "components.div.children.headerDiv.children.header.children.applicationNumber.props.number",
        safNumber
      );
      set(
        action.screenConfig,
        "components.div.children.headerDiv.children.header.children.applicationNumber.visible",
        true
      );
      draftSearch(dispatch, safNumber, action, state)
    } else {
      let propertyDataObject = get(
        state.screenConfiguration.preparedFinalObject,
        "propertyData",
        {}
      );
      let propData = propertyDataObject && propertyDataObject.Properties && propertyDataObject.Properties.length > 0 && propertyDataObject.Properties[0]
      if (!propData || (propData && Object.keys(propData).length === 0)) {
        dispatch(setRoute("/pt-saf/propertySearch"))
        return action
      }
      else {
        getMdmsData(action, state, dispatch, propData)
        dispatch(
          handleField(
            "apply",
            "components.div.children.formwizardSecondStep.children.existingValuation.children.cardContent.children.asseseDetailsConatiner.children.characterChangeOtherDesc",
            "visible",
            false
          )
        );
        const assesseeNumber = getQueryArg(window.location.href, "AssesseNo");


        dispatch(prepareFinalObject("Saf[0].asseseDetail.assesseeNo", propData.assesseeNo));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.applicantName", propData.owners[0].userName));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.applicantAddress", propData.owners[0].address));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.applicantPinCode", propData.owners[0].pincode));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.wardNo", propData.ward));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.streetCode", propData.street));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.premisesNo", propData.premisesNo));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.streetName", "Barrackeore Trunk Road"));
        // dispatch(prepareFinalObject("Saf[0].asseseDetail.blockId", propData."2/1"));
        // dispatch(prepareFinalObject("Saf[0].asseseDetail.category",propData. "D"));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.lastReturnYear", "2015"));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.lastReturnQtr", "1"));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.effectiveQtr", propData.taxdetails.effectiveQtr));
        dispatch(prepareFinalObject("Saf[0].asseseDetail.av", propData.taxdetails.av));
      }
    }
    return action;

  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              },
              ...header
            }
          }
        },
        stepper,
        formwizardFirstStep,
        formwizardSecondStep,
        formwizardThirdStep,
        footer
      }
    },
    // breakUpDialog: {
    //   uiFramework: "custom-containers-local",
    //   moduleName: "egov-tradelicence",
    //   componentPath: "ViewBreakupContainer",
    //   props: {
    //     open: false,
    //     maxWidth: "md",
    //     screenKey: "apply"
    //   }
    // }
  }
};

export default screenConfig;
