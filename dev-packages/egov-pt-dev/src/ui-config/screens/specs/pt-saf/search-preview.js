import {
  getCommonCard,
  getCommonContainer, getCommonGrayCard, getCommonHeader,
  getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  unMountScreen
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getQueryArg,
  setBusinessServiceDataToLocalStorage, setDocuments
} from "egov-ui-framework/ui-utils/commons";
import { loadUlbLogo } from "egov-ui-kit/utils/pdfUtils/generatePDF";
import get from "lodash/get";
import set from "lodash/set";
import store from "ui-redux/store";
import { httpRequest } from "../../../../ui-utils";
import { getSearchResults } from "../../../../ui-utils/commons";
import { getReviewAssessee } from "./safPreviewResource/review-assessee";
import { getReviewTax } from "./safPreviewResource/review-tax";
import { getReviewProperty } from "./safPreviewResource/review-property";
import { getReviewFormat } from "./safPreviewResource/review-format";
import { getSearchResultsForSafFormat, getSearchResultsForSafMaster } from "../../../../ui-utils/commons";
//import { footer } from "./safPreviewResource/reviewFooter";

const tenantId = getQueryArg(window.location.href, "tenantId");
let applicationNumber = getQueryArg(window.location.href, "applicationNumber");
let headerSideText = { word1: "", word2: "" };

let titleText = "SAF Preview";

const headerrow = getCommonContainer({
  header:
    getQueryArg(window.location.href, "action") !== "edit"
      ? getCommonHeader({
        labelName: `Apply for New Trade License ${process.env.REACT_APP_NAME === "Citizen"
          ? "(" + getCurrentFinancialYear() + ")"
          : ""
          }`,
        // dynamicArray: getQueryArg(window.location.href, "action") === "EDITRENEWAL" ? [getnextFinancialYear(getCurrentFinancialYear())]:[getCurrentFinancialYear()],
        labelKey: getQueryArg(window.location.href, "action") === "EDITRENEWAL" || getQueryArg(window.location.href, "workflowService") === "EDITRENEWAL" ? "TL_COMMON_APPL_RENEWAL_LICENSE_YEAR" : "SAF Application Summary"

      })
      : {},
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pt",
    componentPath: "ApplicationNoContainer",
    props: {
      number: "NA",
      label: {
        labelValue: 'Application Number',
        labelKey: 'Application Number'
      }
    },
    visible: true
  }
});

const fakeApiCall = async (dispatch, safNumber) => {

  try {
    // getHeaders(dispatch)
    const masterResponse = await getSearchResultsForSafMaster(safNumber);
    const formatResponse = await getSearchResultsForSafFormat(safNumber);

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
    dispatch(prepareFinalObject("Saf[0].asseseDetail.streetCode", masterResponse.streetCode));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.premisesNo", masterResponse.premisesNo));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.streetName", masterResponse.streetName));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.blockId", masterResponse.blockId));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.category", masterResponse.category));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.propSituated", masterResponse.propSituated));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.propertyType", masterResponse.propertyType));
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
  
    dispatch(prepareFinalObject("Saf[0].asseseDetail.totalRoofArea", formatResponse.UaaPropertyFormatDetails.totalRoofArea));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.constructedRoofArea", formatResponse.UaaPropertyFormatDetails.constructedRoofArea));
    dispatch(prepareFinalObject("Saf[0].asseseDetail.unConstructedRoofArea", formatResponse.UaaPropertyFormatDetails.unConstructedRoofArea));

    let reviewTableDataOne = []
    let reviewTableDataTwo = []

    let formatName = masterResponse.propertyType

    switch (formatName) {
      case 'A':
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.formatATaxLandDetailsC",
            "visible",
            false
          )
        )
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.headOneC",
            "visible",
            false
          )
        )
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.breakOneC",
            "visible",
            false
          )
        )
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.FormatATableOnePreview",
            "visible",
            true
          )
        )
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.FormatATableTwoPreview",
            "visible",
            true
          )
        )

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
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.FormatATableOnePreview",
            "props.tableData",
            reviewTableDataOne
          )
        )
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.FormatATableTwoPreview",
            "props.tableData",
            reviewTableDataTwo
          )
        )
        break;
      case 'B':
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.formatATaxLandDetailsC",
            "visible",
            false
          )
        )
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.headOneC",
            "visible",
            false
          )
        )
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.breakOneC",
            "visible",
            false
          )
        )
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.FormatBTableOnePreview",
            "visible",
            true
          )
        )

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
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.FormatBTableOnePreview",
            "props.tableData",
            reviewTableDataOne
          )
        )
        break;
      case 'C':
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.formatATaxLandDetails",
            "visible",
            false
          )
        )
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.headOne",
            "visible",
            false
          )
        )
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.breakOne",
            "visible",
            false
          )
        )
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.FormatCTableOnePreview",
            "visible",
            true
          )
        )
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.FormatCTableTwoPreview",
            "visible",
            true
          )
        )

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
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.FormatCTableOnePreview",
            "props.tableData",
            reviewTableDataOne
          )
        )
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.reviewFormatDetails.children.cardContent.children.ownerDetails.children.cardContent.children.FormatCTableTwoPreview",
            "props.tableData",
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

const reviewTaxDetails = getReviewTax(false);

const reviewAssesseeDetails = getReviewAssessee(false);

const reviewPropertyDetails = getReviewProperty(false);

const reviewFormatDetails = getReviewFormat(false);



// let approvalDetails = getApprovalDetails(status);
let title = getCommonTitle({ labelName: titleText });


export const tradeReviewDetails = getCommonCard({
  // viewBreakupButton: getDialogButton(
  //   "VIEW BREAKUP",
  //   "TL_PAYMENT_VIEW_BREAKUP",
  //   "search-preview"
  // ),
  reviewTaxDetails,
  reviewAssesseeDetails,
  reviewPropertyDetails,
  reviewFormatDetails,
  //footer

});

const screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: (action, state, dispatch) => {
    let safNumber = getQueryArg(window.location.href, "safNumber");
    fakeApiCall(dispatch, safNumber)
    const tenantId = getQueryArg(window.location.href, "tenantId");

    // dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));
    //To set the application no. at the  top
    set(
      action.screenConfig,
      "components.div.children.headerDiv.children.header1.children.applicationNumber.props.number",
      safNumber
    );
    // beforeInitFn(action, state, dispatch, applicationNumber);
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css search-preview"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header1: {
              gridDefination: {
                xs: 12,
                sm: 8
              },

              ...headerrow

            },
            helpSection: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
              props: {
                color: "primary",
                style: { justifyContent: "flex-end" }
              },
              gridDefination: {
                xs: 12,
                sm: 4,
                align: "right"
              }
            }
          }
        },
        tradeReviewDetails
      }
    },
    breakUpDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-tradelicence",
      componentPath: "ViewBreakupContainer",
      props: {
        open: false,
        maxWidth: "md",
        screenKey: "search-preview"
      }
    }
  }
};

export default screenConfig;
