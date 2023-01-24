//import { download } from "egov-common/ui-utils/commons";
import { dispatchMultipleFieldChangeAction, getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { prepareFinalObject, toggleSnackbar, handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { generateTLAcknowledgement } from "egov-ui-kit/utils/pdfUtils/generateTLAcknowledgement";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import get from "lodash/get";
import set from "lodash/set";
import some from "lodash/some";
//import { applyTradeLicense, checkValidOwners, getNextFinancialYearForRenewal } from "../../../../../ui-utils/commons";
import { createEstimateData, downloadCertificateForm, getButtonVisibility, getCommonApplyFooter, getDocList, setMultiOwnerForApply, setValidToFromVisibilityForApply, validateFields } from "../../utils";

const moveToSuccess = (LicenseData, dispatch) => {
  const applicationNo = get(LicenseData, "applicationNumber");
  const tenantId = get(LicenseData, "tenantId");
  const financialYear = get(LicenseData, "financialYear");
  const purpose = "apply";
  const status = "success";
  dispatch(
    setRoute(
      `/tradelicence/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNo}&FY=${financialYear}&tenantId=${tenantId}`
    )
  );
};
const editRenewalMoveToSuccess = (LicenseData, dispatch) => {
  const applicationNo = get(LicenseData, "applicationNumber");
  const tenantId = get(LicenseData, "tenantId");
  const financialYear = get(LicenseData, "financialYear");
  const licenseNumber = get(LicenseData, "licenseNumber");
  const purpose = "EDITRENEWAL";
  const status = "success";
  dispatch(
    setRoute(
      `/tradelicence/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNo}&licenseNumber=${licenseNumber}&FY=${financialYear}&tenantId=${tenantId}`
    )
  );
};

export const generatePdfFromDiv = (action, applicationNumber) => {
  let target = document.querySelector("#custom-atoms-div");
  html2canvas(target, {
    onclone: function (clonedDoc) {
      // clonedDoc.getElementById("custom-atoms-footer")[
      //   "data-html2canvas-ignore"
      // ] = "true";
      clonedDoc.getElementById("custom-atoms-footer").style.display = "none";
    }
  }).then(canvas => {
    var data = canvas.toDataURL("image/jpeg", 1);
    var imgWidth = 200;
    var pageHeight = 295;
    var imgHeight = (canvas.height * imgWidth) / canvas.width;
    var heightLeft = imgHeight;
    var doc = new jsPDF("p", "mm");
    var position = 0;

    doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
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
export const callBackForDraft = async (state, dispatch) => {

  let isSafInitiationValid = validateFields(
    "components.div.children.formwizardSecondStep.children.safProp.children.cardContent.children.safInitiation.children.cardContent.children.asseseDetailsConatiner.children",
    state,
    dispatch
  );
  let isSafPropDetailsValid = validateFields(
    "components.div.children.formwizardSecondStep.children.safProp.children.cardContent.children.safPropDetails.children.cardContent.children.asseseDetailsConatiner.children", state,
    dispatch
  );
  let isasseseDetailsConatinerValid = validateFields(
    "components.div.children.formwizardSecondStep.children.returnDetails.children.cardContent.children.asseseDetailsConatiner.children",
    state,
    dispatch
  );
  let isexistingValuationValid = validateFields(
    "components.div.children.formwizardSecondStep.children.existingValuation.children.cardContent.children.asseseDetailsConatiner.children",
    state,
    dispatch
  );
  if (isexistingValuationValid && isasseseDetailsConatinerValid && isSafPropDetailsValid && isSafInitiationValid) {

    const formatData = get(
      state.screenConfiguration.preparedFinalObject,
      "Saf[0].asseseDetail",
      {}
    );



    let safPayload = {
      "safNo": "",
      "wardNo": formatData.wardNo ? formatData.wardNo : null,
      "checkAssessee": "Y",
      "assesseeNo": formatData.assesseeNo ? formatData.assesseeNo : null,
      "applicantName": formatData.applicantName ? formatData.applicantName : null,
      "applicantAddress": formatData.applicantAddress ? formatData.applicantAddress : null,
      "applicantPinCode": formatData.applicantPinCode ? formatData.applicantPinCode : null,
      "applicantRelation": formatData.applicantRelation ? formatData.applicantRelation : null,
      "applicantOtherRelation": null,
      "blockId": formatData.blockId ? formatData.blockId : null,
      "otherBlockId": null,
      "streetCode": formatData.streetCode ? formatData.streetCode : null,
      "streetName": formatData.streetName ? formatData.streetName : null,
      "premisesNo": formatData.premisesNo ? formatData.premisesNo : null,
      "category": formatData.category ? formatData.category : null,
      "mobileNo": formatData.mobileNo ? formatData.mobileNo : null,
      "alternateMobileNo": formatData.alternateMobileNo ? formatData.alternateMobileNo : null,
      "applicantEMail": formatData.applicantEMail ? formatData.applicantEMail : null,
      "photoIdType": formatData.photoIdType ? formatData.photoIdType : null,
      "photoId": formatData.photoId ? formatData.photoId : null,
      "landMark": formatData.landMark ? formatData.landMark : null,
      "frontageRoadCode": null,
      "frontageRoadName_Others": formatData.landMark ? formatData.landMark : null,
      "propSituated": formatData.landMark ? formatData.landMark : null,
      "pattaYesNo": "N",
      "nearestLampPost": formatData.landMark ? formatData.landMark : null,
      "lastReturnYear": formatData.lastReturnYear ? formatData.lastReturnYear : null,
      "lastReturnQtr": formatData.lastReturnQtr ? formatData.lastReturnQtr : null,
      "lastReturnDate": null,
      "currReturnYear": formatData.currReturnYear ? formatData.currReturnYear : null,
      "currReturnQtr": formatData.currReturnQtr ? formatData.currReturnQtr : null,
      "propertyType": formatData.propertyType === 'D' || formatData.propertyType === 'B' ? "B" : (formatData.propertyType === 'C' || formatData.propertyType === 'E' ? 'C' : 'A'),
      "natureOfUse": formatData.natureOfUse ? formatData.natureOfUse : null,
      "av": formatData.av ? formatData.av : null,
      "effectiveQuarter": formatData.effectiveQtr ? formatData.effectiveQtr : null,
      "sourceType": process.env.REACT_APP_NAME === "Citizen" ? "P" : "M",
      "isAvRevised": "N",
      "isCharacterChange": formatData.isCharacterChange ? formatData.isCharacterChange : null,
      "characterChangeOtherDesc": formatData.characterChangeOtherDesc ? formatData.characterChangeOtherDesc : null,
      "isSuoMoto": formatData.isSuoMoto ? formatData.isSuoMoto : null,
      "isMutationApplied": "N",
      "mutationCaseNo": "",
      "changeInPropOthers": "Y",
      "isIrDoneYesNo": "N",
      "propertyDetails": [
        2,
        4,
        6
      ],
      "propertyChangeDetails": [
        20,
        21,
        36
      ],
      "changeInPropertyDate": null,
      "usageCategory": [
        "U1",
        "U2A"
      ],
      "isMasterError": null,
      "masterErrorComment": null
    }

    const isDraft = getQueryArg(window.location.href, "isDraft") ? getQueryArg(window.location.href, "isDraft") : false;
    const isSafGenerated = localStorage.getItem('safGenerated')

    if (!isDraft && isSafGenerated === "false") {

      try {
        let payload = await httpRequest(
          "post",
          "property-services/assessment/_uaaInsertUpdateMaster?operationType=SUBMIT",
          "",
          [],
          { RequestData : safPayload }
        );

        console.log('payload.ResponseData.safNo', payload.ResponseData.safNo)
        if (payload.ResponseData.safNo == null || payload.ResponseData.safNo == "") {
          let errorMessageForSafNull = {
            labelName: "SAF Number is not generated",
            labelKey: "SAF Number is not generated"
          };

          dispatch(toggleSnackbar(true, errorMessageForSafNull, "error"));

          dispatch(
            setRoute(
              `/pt-saf/propertySearch`
            )
          );

        } else {
          dispatch(prepareFinalObject("SafResponse", payload.ResponseData));
          let s = "success"
          let p = "apply"
          // dispatch(
          //   setRoute(
          //     `/pt-saf/draftAcknowledgement?purpose=${p}&status=${s}&applicationNumber=${payload.ResponseData.safNo}&tenantId=km`
          //   )
          // );

          let saveDraftMessage = {
            labelName:
              "Saf Number is generated successfully.",
            labelKey: "Saf Number is generated successfully."
          };

          dispatch(toggleSnackbar(true, saveDraftMessage, "success"));
          localStorage.setItem('safGenerated', true)

          dispatch(
            handleField(
              "apply",
              "components.div.children.headerDiv.children.header.children.applicationNumber",
              "visible",
              true
            )
          )

          dispatch(
            handleField(
              "apply",
              "components.div.children.headerDiv.children.header.children.applicationNumber",
              "props.number",
              payload.ResponseData.safNo
            )
          )
        }

        // set(
        //   action.screenConfig,
        //   "components.div.children.headerDiv.children.header.children.applicationNumber.props.number",
        //   payload.ResponseData.safNo
        // );
        // set(
        //   action.screenConfig,
        //   "components.div.children.headerDiv.children.header.children.applicationNumber.visible",
        //   true
        // );
      } catch (e) {
        console.log(e);
      }
    }
  }
}

export const callBackForNext = async (state, dispatch) => {
  let isGroundAreaValid = true
  let isLocaitonValid = true
  let activeStep = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  let isFormValid = true;
  let hasFieldToaster = true;
  if (activeStep === 0) {
    let isSafInitiationValid = validateFields(
      "components.div.children.formwizardFirstStep.children.safInitiationCard.children.cardContent.children.asseseDetailsConatiner.children",
      state,
      dispatch
    );
    let isAssesseeDetailsValid = validateFields(
      "components.div.children.formwizardFirstStep.children.assesseeDetails.children.cardContent.children.asseseDetailsConatiner.children",
      state,
      dispatch
    );
    let isConcernedPropertyDetailsValid = validateFields(
      "components.div.children.formwizardFirstStep.children.concernedPropertyDetails.children.cardContent.children.asseseDetailsConatiner.children", state,
      dispatch
    );
    if (process.env.REACT_APP_NAME === "Citizen") {
      isSafInitiationValid = true
    }
    if (isAssesseeDetailsValid && isConcernedPropertyDetailsValid && isSafInitiationValid) {
      isFormValid = true
      const isEdit = getQueryArg(window.location.href, "isEdit");

      if (isEdit) {
      } else {
        localStorage.setItem('format', null)
      }
      dispatch(
        handleField(
          "apply",
          "components.div.children.headerDiv.children.header.children.header.children.key",
          "props.labelKey",
          "Apply for Self Assessment"
        )
      )
      dispatch(
        handleField(
          "apply",
          "components.div.children.headerDiv.children.header.children.header.children.key",
          "props.labelName",
          "Apply for Self Assessment"
        )
      )
    }
    else {
      isFormValid = false
    }

  }

  if (activeStep === 1) {
    const isEdit = getQueryArg(window.location.href, "isEdit");

    let isSafPropDetailsValid = validateFields(
      "components.div.children.formwizardSecondStep.children.safProp.children.cardContent.children.safPropDetails.children.cardContent.children.asseseDetailsConatiner.children", state,
      dispatch
    );
    let isasseseDetailsConatinerValid = validateFields(
      "components.div.children.formwizardSecondStep.children.returnDetails.children.cardContent.children.asseseDetailsConatiner.children",
      state,
      dispatch
    );
    let isexistingValuationValid = validateFields(
      "components.div.children.formwizardSecondStep.children.existingValuation.children.cardContent.children.asseseDetailsConatiner.children",
      state,
      dispatch
    );
    if (isexistingValuationValid && isasseseDetailsConatinerValid && isSafPropDetailsValid) {
      isFormValid = true
      let formatName = localStorage.getItem('format')
      switch (formatName) {
        case 'A':
          dispatch(
            handleField(
              "apply",
              "components.div.children.headerDiv.children.header.children.header.children.key",
              "props.labelKey",
              "Apply for Self Assessment (Format-A)"
            )
          )
          dispatch(
            handleField(
              "apply",
              "components.div.children.headerDiv.children.header.children.header.children.key",
              "props.labelName",
              "Apply for Self Assessment (Format-A)"
            )
          )
          let blockValue = get(
            state.screenConfiguration.preparedFinalObject,
            "Saf[0].asseseDetail.blockValue",
            "32"
          );
          dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.A1f", blockValue));
          dispatch(prepareFinalObject("Saf[0].asseseDetail.tableTwo.A2b", blockValue));


          if (isEdit) {

            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardThirdStep.children.safFormatCTableTwo",
                "visible",
                false
              )
            )
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardThirdStep.children.formatBLandDetails",
                "visible",
                false
              )
            )
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardThirdStep.children.safFormatBTableOne",
                "visible",
                false
              )
            )
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardThirdStep.children.safFormatCTableOne",
                "visible",
                false
              )
            )

            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardThirdStep.children.formatCSeparateRoof",
                "visible",
                false
              )
            )
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardThirdStep.children.formatCManualBill",
                "visible",
                false
              )
            )

            //visible

            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardThirdStep.children.formatALandDetails",
                "visible",
                true
              )
            )
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardThirdStep.children.safFormatATableOne",
                "visible",
                true
              )
            )
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardThirdStep.children.safFormatATableTwo",
                "visible",
                true
              )
            )
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardThirdStep.children.safFormatATax",
                "visible",
                true
              )
            )
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardThirdStep.children.formatAManualBill",
                "visible",
                true
              )
            )

          }
          break;
        case 'B':
          dispatch(
            handleField(
              "apply",
              "components.div.children.headerDiv.children.header.children.header.children.key",
              "props.labelKey",
              "Apply for Self Assessment (Format-B)"
            )
          )
          dispatch(
            handleField(
              "apply",
              "components.div.children.headerDiv.children.header.children.header.children.key",
              "props.labelName",
              "Apply for Self Assessment (Format-B)"
            )
          )

          blockValue = get(
            state.screenConfiguration.preparedFinalObject,
            "Saf[0].asseseDetail.blockValue",
            "32"
          );
          dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.B1d", blockValue));

          if (isEdit) {

          }
          break;
        case 'C':
          dispatch(
            handleField(
              "apply",
              "components.div.children.headerDiv.children.header.children.header.children.key",
              "props.labelKey",
              "Apply for Self Assessment (Format-C)"
            )
          )
          dispatch(
            handleField(
              "apply",
              "components.div.children.headerDiv.children.header.children.header.children.key",
              "props.labelName",
              "Apply for Self Assessment (Format-C)"
            )
          )
          blockValue = get(
            state.screenConfiguration.preparedFinalObject,
            "Saf[0].asseseDetail.blockValue",
            "32"
          );
          dispatch(prepareFinalObject("Saf[0].asseseDetail.tableOne.C1b", blockValue));
          dispatch(prepareFinalObject("Saf[0].asseseDetail.tableTwo.C2d", blockValue));

          if (isEdit) {

          }
          break;
        default:
          dispatch(
            handleField(
              "apply",
              "components.div.children.headerDiv.children.header.children.header.children.key",
              "props.labelKey",
              "Apply for Self Assessment"
            )
          )
          dispatch(
            handleField(
              "apply",
              "components.div.children.headerDiv.children.header.children.header.children.key",
              "props.labelName",
              "Apply for Self Assessment"
            )
          )
          break;

      }

      const formatData = get(
        state.screenConfiguration.preparedFinalObject,
        "Saf[0].asseseDetail",
        {}
      );



      let safPayload = {
        "safNo": "",
        "wardNo": formatData.wardNo ? formatData.wardNo : null,
        "checkAssessee": "Y",
        "assesseeNo": formatData.assesseeNo ? formatData.assesseeNo : null,
        "applicantName": formatData.applicantName ? formatData.applicantName : null,
        "applicantAddress": formatData.applicantAddress ? formatData.applicantAddress : null,
        "applicantPinCode": formatData.applicantPinCode ? formatData.applicantPinCode : null,
        "applicantRelation": formatData.applicantRelation ? formatData.applicantRelation : null,
        "applicantOtherRelation": null,
        "blockId": formatData.blockId ? formatData.blockId : null,
        "otherBlockId": null,
        "streetCode": formatData.streetCode ? formatData.streetCode : null,
        "streetName": formatData.streetName ? formatData.streetName : null,
        "premisesNo": formatData.premisesNo ? formatData.premisesNo : null,
        "category": formatData.category ? formatData.category : null,
        "mobileNo": formatData.mobileNo ? formatData.mobileNo : null,
        "alternateMobileNo": formatData.alternateMobileNo ? formatData.alternateMobileNo : null,
        "applicantEMail": formatData.applicantEMail ? formatData.applicantEMail : null,
        "photoIdType": formatData.photoIdType ? formatData.photoIdType : null,
        "photoId": formatData.photoId ? formatData.photoId : null,
        "landMark": formatData.landMark ? formatData.landMark : null,
        "frontageRoadCode": null,
        "frontageRoadName_Others": formatData.landMark ? formatData.landMark : null,
        "propSituated": formatData.landMark ? formatData.landMark : null,
        "pattaYesNo": "N",
        "nearestLampPost": formatData.landMark ? formatData.landMark : null,
        "lastReturnYear": formatData.lastReturnYear ? formatData.lastReturnYear : null,
        "lastReturnQtr": formatData.lastReturnQtr ? formatData.lastReturnQtr : null,
        "lastReturnDate": null,
        "currReturnYear": formatData.currReturnYear ? formatData.currReturnYear : null,
        "currReturnQtr": formatData.currReturnQtr ? formatData.currReturnQtr : null,
        "propertyType": formatData.propertyType === 'D' || formatData.propertyType === 'B' ? "B" : (formatData.propertyType === 'C' || formatData.propertyType === 'E' ? 'C' : 'A'),
        "natureOfUse": formatData.natureOfUse ? formatData.natureOfUse : null,
        "av": formatData.av ? formatData.av : null,
        "effectiveQuarter": formatData.effectiveQtr ? formatData.effectiveQtr : null,
        "sourceType": process.env.REACT_APP_NAME === "Citizen" ? "P" : "M",
        "isAvRevised": "N",
        "isCharacterChange": formatData.isCharacterChange ? formatData.isCharacterChange : null,
        "characterChangeOtherDesc": formatData.characterChangeOtherDesc ? formatData.characterChangeOtherDesc : null,
        "isSuoMoto": formatData.isSuoMoto ? formatData.isSuoMoto : null,
        "isMutationApplied": "N",
        "mutationCaseNo": "",
        "changeInPropOthers": "Y",
        "isIrDoneYesNo": "N",
        "propertyDetails": [
          2,
          4,
          6
        ],
        "propertyChangeDetails": [
          20,
          21,
          36
        ],
        "changeInPropertyDate": null,
        "usageCategory": [
          "U1",
          "U2A"
        ],
        "isMasterError": null,
        "masterErrorComment": null
      }
      const isDraft = getQueryArg(window.location.href, "isDraft") ? getQueryArg(window.location.href, "isDraft") : false;
      const isSafGenerated = localStorage.getItem('safGenerated')

      if (!isDraft && isSafGenerated === "false") {
        try {
          let payload = await httpRequest(
            "post",
            "property-services/assessment/_uaaInsertUpdateMaster?operationType=SUBMIT",
            "",
            [],
            { RequestData : safPayload }
          );
          if (!payload.ResponseData.safNo || payload.ResponseData.safNo == "") {

            let errorMessageForSafNull = {
              labelName: "SAF Number is not generated",
              labelKey: "SAF Number is not generated"
            };

            dispatch(toggleSnackbar(true, errorMessageForSafNull, "error"));

            dispatch(
              setRoute(
                `/pt-saf/propertySearch`
              )
            );

          } else {
            dispatch(prepareFinalObject("SafResponse", payload.ResponseData));

            set(
              action.screenConfig,
              "components.div.children.headerDiv.children.header.children.applicationNumber.props.number",
              payload.ResponseData.safNo
            );
            set(
              action.screenConfig,
              "components.div.children.headerDiv.children.header.children.applicationNumber.visible",
              true
            );
          }

        } catch (e) {
          console.log(e);
        }
      }

    } else {
      isFormValid = false;
    }

    //     let ownership = get(
    //       state.screenConfiguration.preparedFinalObject,
    //       "Licenses[0].tradeLicenseDetail.subOwnerShipCategory",
    //       "INDIVIDUAL"
    //     );
    //     ownership = ownership.split(".")[0];
    //     if (ownership === "INDIVIDUAL") {
    //       let ownersJsonPath =
    //         "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard.props.items";
    //       let owners = get(
    //         state.screenConfiguration.screenConfig.apply,
    //         ownersJsonPath,
    //         []
    //       );
    //       for (var k = 0; k < owners.length; k++) {
    //         if (
    //           (owners[k].isDeleted === undefined ||
    //             owners[k].isDeleted !== false) &&
    //           !validateFields(
    //             `${ownersJsonPath}[${k}].item${k}.children.cardContent.children.tradeUnitCardContainer.children`,
    //             state,
    //             dispatch
    //           )
    //         )
    //           isFormValid = true;
    //       }
    //     } else {
    //       let ownersJsonPath =
    //         "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional.children.cardContent.children.tradeUnitCardContainerInstitutional.children";
    //       if (!validateFields(ownersJsonPath, state, dispatch)) isFormValid = true;
    //     }

    //     // check for multiple owners
    //     if (
    //       get(
    //         state.screenConfiguration.preparedFinalObject,
    //         "Licenses[0].tradeLicenseDetail.subOwnerShipCategory"
    //       ) === "INDIVIDUAL.MULTIPLEOWNERS" 
    //       &&
    //       get(
    //         state.screenConfiguration.preparedFinalObject,
    //         "Licenses[0].tradeLicenseDetail.owners"
    //       )
    //       &&
    //       get(
    //         state.screenConfiguration.preparedFinalObject,
    //         "Licenses[0].tradeLicenseDetail.owners"
    //       ).length <= 1
    //     ) {
    //       dispatch(
    //         toggleSnackbar(
    //           true,
    //           {
    //             labelName: "Please add multiple owners !",
    //             labelKey: "ERR_ADD_MULTIPLE_OWNERS"
    //           },
    //           "error"
    //         )
    //       );
    //       return false; // to show the above message
    //     }
    //     if (isFormValid && isOwnerShipValid) {
    //       isFormValid = await applyTradeLicense(state, dispatch, activeStep);
    //       if (!isFormValid) {
    //         hasFieldToaster = false;
    //       }
    //     } else {
    //       isFormValid = true;
    //     }
  }

  if (activeStep === 2) {



    const formatData = get(
      state.screenConfiguration.preparedFinalObject,
      "Saf[0].asseseDetail",
      {}
    );
    const saffRseponse = get(
      state.screenConfiguration.preparedFinalObject,
      "SafResponse",
      {}
    );

    console.log('saffRseponse1234', saffRseponse)
    console.log('formatData1234', formatData)


    let i = 0
    let VacantLandDetailsData = []
    let ConstructedDetailsData = []
    const MDMSDATA = get(
      state.screenConfiguration.preparedFinalObject,
      "applyScreenMdmsData.PropertyTax",
      {}
    );
    let LOCATION_MULTI_FACTOR = MDMSDATA.LOCATION_MULTI_FACTOR
    let USAGE_MULTI_FACTOR = MDMSDATA.USAGE_MULTI_FACTOR
    let OCCUPANCY_MULTI_FACTOR = MDMSDATA.OCCUPANCY_MULTI_FACTOR
    let STRUCTURE_MULTI_FACTOR = MDMSDATA.STRUCTURE_MULTI_FACTOR
    let AGE_MULTI_FACTOR = MDMSDATA.AGE_MULTI_FACTOR
    let LName = ""
    let UName = ""
    let OName = ""
    let SName = ""
    let AName = ""
    function allAreEqual(array) {

      const result = array.every(element => {
        if (element.A1i === array[0].A1i) {

          return true;
        }
      });
      if (result === true) {

        dispatch(prepareFinalObject("lFactorOne", array[0].A1i));
      }
      return result;
    }
    function allAreEqualTwo(array) {

      const result = array.every(element => {
        if (element.A2g === array[0].A2g) {

          return true;
        }
      });
      if (result === true) {

        dispatch(prepareFinalObject("lFactorTwo", array[0].A2g));
      }
      return result;
    }
    function groundAreaSum(array) {
      let sum = 0
      array.map(element => {
        sum = sum + parseInt(element.A2c)
      })
      console.log('result1234', sum)
      return sum;
    }
    let formatName = localStorage.getItem('format')
    switch (formatName) {
      case 'A':
        let isLandDetailsValid = validateFields(
          "components.div.children.formwizardThirdStep.children.formatALandDetails.children.cardContent.children.asseseDetailsConatiner.children",
          state,
          dispatch
        );

        if (isLandDetailsValid) {
          if (formatData.formatDataOne.length > 0) {
            let test = allAreEqual(formatData.formatDataOne)


            if (!test) {
              let errorMessage = {
                labelName: "LOCATION MULTI FACTOR must be same",
                labelKey: "LOCATION MULTI FACTOR must be same"
              };
              isLocaitonValid = false
              dispatch(toggleSnackbar(true, errorMessage, "warning"));

              break;
            } else {

              for (i = 0; i < formatData.formatDataOne.length; i++) {

                let tableData = formatData.formatDataOne[i]
                let { A1f, A1ff, A1g, A1h, A1i, A1j, A1k } = tableData

                if (Array.isArray(LOCATION_MULTI_FACTOR)) {
                  console.log('LOCATION_MULTI_FACTOR', LOCATION_MULTI_FACTOR)

                  let LObj = LOCATION_MULTI_FACTOR.filter(l => { return l.value === A1i })
                  LName = LObj[0].name
                }
                if (Array.isArray(USAGE_MULTI_FACTOR)) {
                  let LObj = USAGE_MULTI_FACTOR.filter(l => { return l.value === A1h })

                  UName = LObj[0].name
                }
                if (Array.isArray(OCCUPANCY_MULTI_FACTOR)) {
                  let LObj = OCCUPANCY_MULTI_FACTOR.filter(l => { return l.value === A1j })

                  OName = LObj[0].name
                }

                let VacantLandData = {
                  "landArea": A1f ? A1f : "0",
                  "locationFactorValue": A1i ? A1i : "0",
                  "locationFactorId": LName ? LName : "0",
                  "usageFactorValue": A1h ? A1h : "0",
                  "usageFactorId": UName ? UName : "0",
                  "occupancyFactorValue": A1j ? A1j : "0",
                  "occupancyFactorId": OName ? OName : "0",
                  "aggregateRent": A1k ? A1k : "0",
                  "alreadyAssessed": A1ff ? A1ff : "0"
                }
                VacantLandDetailsData.push(VacantLandData)
                console.log('VacantLandDetailsData1234', VacantLandDetailsData)
              }
            }

          }
          else {
            isFormValid = false
          }
          if (formatData.formatDataTwo.length > 0) {
            let testTwo = allAreEqualTwo(formatData.formatDataTwo)

            if (!testTwo) {
              let errorMessage = {
                labelName: "LOCATION MULTI FACTOR must be same",
                labelKey: "LOCATION MULTI FACTOR must be same"
              };

              dispatch(toggleSnackbar(true, errorMessage, "warning"));
              isFormValid = false
              break;
            }
            else {
              let groundArea = get(
                state.screenConfiguration.preparedFinalObject,
                "Saf[0].asseseDetail.groundArea",
                "0"
              );
              let areaSum = groundAreaSum(formatData.formatDataTwo)


              if (parseInt(areaSum) < parseInt(groundArea)) {
                let errorMessage = {
                  labelName: "Coverd Area sum must be greater or equal to Ground Area",
                  labelKey: "Coverd Area sum must be greater or equal to Ground Area"
                };

                dispatch(toggleSnackbar(true, errorMessage, "warning"));
                isGroundAreaValid = false

                break;
              } else {

                for (i = 0; i < formatData.formatDataTwo.length; i++) {

                  let tableData = formatData.formatDataTwo[i]
                  let { A2a, A2aa, A2b, A2c, A2d, A2e, A2f, A2g, A2h, A2i, A2j } = tableData

                  if (Array.isArray(AGE_MULTI_FACTOR)) {
                    let LObj = AGE_MULTI_FACTOR.filter(l => { return l.value === A2d })

                    AName = LObj[0].name
                  }
                  if (Array.isArray(STRUCTURE_MULTI_FACTOR)) {
                    let LObj = STRUCTURE_MULTI_FACTOR.filter(l => { return l.value === A2e })

                    SName = LObj[0].name
                  }
                  if (Array.isArray(LOCATION_MULTI_FACTOR)) {
                    let LObj = LOCATION_MULTI_FACTOR.filter(l => { return l.value === A2g })

                    LName = LObj[0].name
                  }
                  if (Array.isArray(USAGE_MULTI_FACTOR)) {
                    let LObj = USAGE_MULTI_FACTOR.filter(l => { return l.value === A2f })

                    UName = LObj[0].name
                  }
                  if (Array.isArray(OCCUPANCY_MULTI_FACTOR)) {
                    let LObj = OCCUPANCY_MULTI_FACTOR.filter(l => { return l.value === A2h })

                    OName = LObj[0].name
                  }

                  let ConstructedData = {
                    "unitName": A2a ? A2a : "0",
                    "coveredArea": A2c ? A2c : "0",
                    "ageFactorValue": A2d ? A2d : "0",
                    "ageFactorId": AName ? AName : "0",
                    "locationFactorValue": A2g ? A2g : "0",
                    "locationFactorId": LName ? LName : "0",
                    "structureFactorValue": A2e ? A2e : "0",
                    "structureFactorId": SName ? SName : "0",
                    "usageFactorValue": A2f ? A2f : "0",
                    "usageFactorId": UName ? UName : "0",
                    "occupancyFactorValue": A2h ? A2h : "0",
                    "occupancyFactorId": OName ? OName : "0",
                    "alreadyAssessed": A2aa ? A2aa : "0"
                  }
                  ConstructedDetailsData.push(ConstructedData)
                }
              }

            }

          }
          else {
            isFormValid = false
          }
        } else {
          isFormValid = false
        }

        break;
      case 'B':
        let isLandDetailsBValid = validateFields(
          "components.div.children.formwizardThirdStep.children.formatBLandDetails.children.cardContent.children.asseseDetailsConatiner.children",
          state,
          dispatch
        );
        if (isLandDetailsBValid) {
          if (formatData.formatDataOne.length > 0) {
            for (i = 0; i < formatData.formatDataOne.length; i++) {

              let tableData = formatData.formatDataOne[i]
              let { B1d, B1dd, B1c, B1e, B1f, B1g, B1h } = tableData

              if (Array.isArray(LOCATION_MULTI_FACTOR)) {
                let LObj = LOCATION_MULTI_FACTOR.filter(l => { return l.value === B1f })

                LName = LObj[0].name
              }
              if (Array.isArray(USAGE_MULTI_FACTOR)) {
                let LObj = USAGE_MULTI_FACTOR.filter(l => { return l.value === B1e })

                UName = LObj[0].name
              }
              if (Array.isArray(OCCUPANCY_MULTI_FACTOR)) {
                let LObj = OCCUPANCY_MULTI_FACTOR.filter(l => { return l.value === B1g })

                OName = LObj[0].name
              }

              let VacantLandData = {
                "landArea": B1c ? B1c : "0",
                "locationFactorValue": B1f ? B1f : "0",
                "locationFactorId": LName ? LName : "0",
                "usageFactorValue": B1e ? B1e : "0",
                "usageFactorId": UName ? UName : "0",
                "occupancyFactorValue": B1g ? B1g : "0",
                "occupancyFactorId": OName ? OName : "0",
                "aggregateRent": B1h ? B1h : "0",
                "alreadyAssessed": B1dd ? B1dd : "0"
              }
              VacantLandDetailsData.push(VacantLandData)
            }
          }
          else {
            isFormValid = false
          }
        } else {
          isFormValid = false
        }
        break;
      case 'C':
        if (formatData.formatDataTwo.length > 0) {
          for (i = 0; i < formatData.formatDataTwo.length; i++) {

            let tableData = formatData.formatDataTwo[i]
            let { C2dd, C2d, C2e, C2f, C2g, C2h, C2i, C2j } = tableData

            if (Array.isArray(LOCATION_MULTI_FACTOR)) {
              let LObj = LOCATION_MULTI_FACTOR.filter(l => { return l.value === C2g })

              LName = LObj[0].name
            }
            if (Array.isArray(USAGE_MULTI_FACTOR)) {
              let LObj = USAGE_MULTI_FACTOR.filter(l => { return l.value === C2f })

              UName = LObj[0].name
            }
            if (Array.isArray(OCCUPANCY_MULTI_FACTOR)) {
              let LObj = OCCUPANCY_MULTI_FACTOR.filter(l => { return l.value === C2h })

              OName = LObj[0].name
            }
            let VacantLandData = {
              "landArea": C2d ? C2d : "0",
              "locationFactorValue": C2g ? C2g : "0",
              "locationFactorId": LName ? LName : "0",
              "usageFactorValue": C2f ? C2f : "0",
              "usageFactorId": UName ? UName : "0",
              "occupancyFactorValue": C2h ? C2h : "0",
              "occupancyFactorId": OName ? OName : "0",
              "aggregateRent": C2j ? C2j : "0",
              "alreadyAssessed": C2dd ? C2dd : "0"
            }
            VacantLandDetailsData.push(VacantLandData)
          }
        } else {
          isFormValid = false
        }

        if (formatData.formatDataOne.length > 0) {
          for (i = 0; i < formatData.formatDataOne.length; i++) {

            let tableData = formatData.formatDataOne[i]
            let { C1aa, C1b, C1c, C1d, C1e, C1f, C1g, C1h, C1i, C1j } = tableData

            if (Array.isArray(AGE_MULTI_FACTOR)) {
              let LObj = AGE_MULTI_FACTOR.filter(l => { return l.value === C1d })

              AName = LObj[0].name
            }
            if (Array.isArray(STRUCTURE_MULTI_FACTOR)) {
              let LObj = STRUCTURE_MULTI_FACTOR.filter(l => { return l.value === C1e })

              SName = LObj[0].name
            }
            if (Array.isArray(LOCATION_MULTI_FACTOR)) {
              let LObj = LOCATION_MULTI_FACTOR.filter(l => { return l.value === C1g })

              LName = LObj[0].name
            }
            if (Array.isArray(USAGE_MULTI_FACTOR)) {
              let LObj = USAGE_MULTI_FACTOR.filter(l => { return l.value === C1f })

              UName = LObj[0].name
            }
            if (Array.isArray(OCCUPANCY_MULTI_FACTOR)) {
              let LObj = OCCUPANCY_MULTI_FACTOR.filter(l => { return l.value === C1h })

              OName = LObj[0].name
            }
            let ConstructedData = {
              "unitName": C1b ? C1b : "0",
              "coveredArea": C1c ? C1c : "0",
              "ageFactorValue": C1d ? C1d : "0",
              "ageFactorId": AName ? AName : "0",
              "locationFactorValue": C1g ? C1g : "0",
              "locationFactorId": LName ? LName : "0",
              "structureFactorValue": C1e ? C1e : "0",
              "structureFactorId": SName ? SName : "0",
              "usageFactorValue": C1f ? C1f : "0",
              "usageFactorId": UName ? UName : "0",
              "occupancyFactorValue": C1h ? C1h : "0",
              "occupancyFactorId": OName ? OName : "0",
              "alreadyAssessed": C1aa ? C1aa : "0"
            }
            ConstructedDetailsData.push(ConstructedData)
          }

        } else {
          isFormValid = false
        }

        break;
      default:

        break;

    }

    let lFactorTwo = get(
      state.screenConfiguration.preparedFinalObject,
      "lFactorTwo",
      ""
    );
    let lFactorOne = get(
      state.screenConfiguration.preparedFinalObject,
      "lFactorOne",
      ""
    );

    if (lFactorTwo !== lFactorOne) {

      let errorMessageNew = {
        labelName: "LOCATION MULTI FACTOR must be same",
        labelKey: "LOCATION MULTI FACTOR must be same"
      };

      dispatch(toggleSnackbar(true, errorMessageNew, "warning"));

    }


    if (lFactorTwo == lFactorOne && isFormValid && isGroundAreaValid && isLocaitonValid) {
      let formatDataPayload = {

        "safNo": saffRseponse.safNo,
        "wardNo": "001",
        "UaaPropertyFormatDetails": {
          "totalArea": formatData.totalArea ? parseInt(formatData.totalArea) : 100,
          "waterbodyArea": formatData.waterbodyArea ? parseInt(formatData.waterbodyArea) : 0,
          "groundArea": formatData.groundArea ? parseInt(formatData.groundArea) : 0,
          "remainingLand": formatData.remainingLand ? parseInt(formatData.remainingLand) : 0,
          "percentageCover": formatData.percentageCover ? parseInt(formatData.percentageCover) : 0,
          "percentageGroundCover": formatData.percentageGroundCover ? parseInt(formatData.percentageGroundCover) : 0,
          "totalRoofArea": formatData.totalRoofArea ? parseInt(formatData.totalRoofArea) : 0,
          "constructedRoofArea": formatData.constructedRoofArea ? parseInt(formatData.constructedRoofArea) : 0,
          "unConstructedRoofArea": formatData.unConstructedRoofArea ? parseInt(formatData.unConstructedRoofArea) : 0
        },
        "ConstructedDetails": ConstructedDetailsData,
        "VacantLandDetails": VacantLandDetailsData,
        "isMasterError": null,
        "masterErrorComment": null

      }
      try {
        let payload = await httpRequest(
          "post",
          "property-services/assessment/_uaaInsertUpdateFormat?operationType=SUBMIT",
          "",
          [],
          { requestData : formatDataPayload }
        );

        let appNo = "001/01/2017-2018/0000001"
        let s = "success"
        let p = "apply"
        dispatch(
          setRoute(
            `/pt-saf/acknowledgement?purpose=${p}&status=${s}&applicationNumber=${saffRseponse.safNo}&tenantId=km`
          )
        );

      } catch (e) {
        console.log(e);
      }
    }




  }

  if (activeStep !== 3) {
    if (isFormValid && isGroundAreaValid && isLocaitonValid) {
      changeStep(state, dispatch);
    } else if (!isFormValid) {
      let errorMessage = {
        labelName:
          "Please fill all mandatory fields, then do next !",
        labelKey: "Please fill all mandatory fields, then do next !"
      };
      switch (activeStep) {
        case 0:
          errorMessage = {
            labelName:
              "Please fill all mandatory fields, then do next !",
            labelKey: "Please fill all mandatory fields, then do next !"
          };
          break;
        case 1:
          errorMessage = {
            labelName:
              "Please fill all mandatory fields, then do next !",
            labelKey: "Please fill all mandatory fields, then do next !"
          };
          break;
        case 2:
          errorMessage = {
            labelName:
              "Please fill all mandatory fields, then do next !",
            labelKey: "Please fill all mandatory fields, then do next !"
          };
          break;
      }
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
    }
  }
};

export const changeStep = (
  state,
  dispatch,
  mode = "next",
  defaultActiveStep = -1
) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  if (defaultActiveStep === -1) {

    activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;

  } else {
    activeStep = defaultActiveStep;
  }

  const isPreviousButtonVisible = activeStep > 0 && activeStep !== 2 ? true : false;
  const isNextButtonVisible = activeStep < 2 ? true : false;
  const isPayButtonVisible = activeStep === 2 ? true : false;
  const isSaveDraftButtonVisible = activeStep === 1 ? true : false;
  if (activeStep === 1) {
    const isEdit = getQueryArg(window.location.href, "isEdit");

    if (isEdit) {
    } else {
      localStorage.setItem('format', null)
    }
    dispatch(
      handleField(
        "apply",
        "components.div.children.headerDiv.children.header.children.header.children.key",
        "props.labelKey",
        "Apply for Self Assessment"
      )
    )
    dispatch(
      handleField(
        "apply",
        "components.div.children.headerDiv.children.header.children.header.children.key",
        "props.labelName",
        "Apply for Self Assessment"
      )
    )
  }
  const actionDefination = [
    {
      path: "components.div.children.stepper.props",
      property: "activeStep",
      value: activeStep
    },
    {
      path: "components.div.children.footer.children.previousButton",
      property: "visible",
      value: isPreviousButtonVisible
    },
    {
      path: "components.div.children.footer.children.nextButton",
      property: "visible",
      value: isNextButtonVisible
    },
    {
      path: "components.div.children.footer.children.payButton",
      property: "visible",
      value: isPayButtonVisible
    },
    {
      path: "components.div.children.footer.children.saveButton",
      property: "visible",
      value: isSaveDraftButtonVisible
    }
  ];
  dispatchMultipleFieldChangeAction("apply", actionDefination, dispatch);
  renderSteps(activeStep, dispatch);
};

export const renderSteps = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case 1:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardSecondStep"
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardThirdStep"
        ),
        dispatch
      );
  }
};

export const getActionDefinationForStepper = path => {
  const actionDefination = [
    {
      path: "components.div.children.formwizardFirstStep",
      property: "visible",
      value: true
    },
    {
      path: "components.div.children.formwizardSecondStep",
      property: "visible",
      value: false
    },
    {
      path: "components.div.children.formwizardThirdStep",
      property: "visible",
      value: false
    }
  ];
  for (var i = 0; i < actionDefination.length; i++) {
    actionDefination[i] = {
      ...actionDefination[i],
      value: false
    };
    if (path === actionDefination[i].path) {
      actionDefination[i] = {
        ...actionDefination[i],
        value: true
      };
    }
  }
  return actionDefination;
};

export const callBackForPrevious = (state, dispatch) => {

  let activeStep = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  if (activeStep == '2') {
    dispatch(prepareFinalObject("Saf[0].asseseDetail.propertyType", null));
    dispatch(
      handleField(
        "apply",
        "components.div.children.formwizardSecondStep.children.safProp.children.cardContent.children.safPropDetails.children.cardContent.children.asseseDetailsConatiner.children.propertyType",
        "props.value",
        null
      )
    )
  }
  changeStep(state, dispatch, "previous");
};

export const footer = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "16px",
        borderRadius: "inherit"
      }
    },
    children: {
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_left"
        }
      },
      previousButtonLabel: getLabel({
        labelName: "Previous Step",
        labelKey: "Previous Step"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious
    },
    visible: false
  },
  saveButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "16px",
        borderRadius: "inherit"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "Save as Draft",
        labelKey: "Save as Draft"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForDraft
    },
    visible: false

  },
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "Next Step",
        labelKey: "Next Step"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    }
  },
  payButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "Submit",
        labelKey: "Submit"
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    },
    visible: false
  }
});



// export const renewTradelicence = async (financialYear, state, dispatch) => {
//   const licences = get(
//     state.screenConfiguration.preparedFinalObject,
//     `Licenses`
//   );

//   const tenantId = get(licences[0], "tenantId");

//   const nextFinancialYear = await getNextFinancialYearForRenewal(financialYear);

//   const wfCode = "DIRECTRENEWAL";
//   set(licences[0], "action", "INITIATE");
//   set(licences[0], "workflowCode", wfCode);
//   set(licences[0], "applicationType", "RENEWAL");
//   set(licences[0], "financialYear", nextFinancialYear);

//   const response = await httpRequest("post", "/tl-services/v1/_update", "", [], {
//     Licenses: licences
//   })
//   const renewedapplicationNo = get(
//     response,
//     `Licenses[0].applicationNumber`
//   );
//   const licenseNumber = get(
//     response,
//     `Licenses[0].licenseNumber`
//   );
//   dispatch(
//     setRoute(
//       `/tradelicence/acknowledgement?purpose=EDITRENEWAL&status=success&applicationNumber=${renewedapplicationNo}&licenseNumber=${licenseNumber}&FY=${nextFinancialYear}&tenantId=${tenantId}&action=${wfCode}`
//     ));
// };

// export const footerReview = (
//   action,
//   state,
//   dispatch,
//   status,
//   applicationNumber,
//   tenantId,
//   financialYear
// ) => {
//   /** MenuButton data based on status */
//   let licenseNumber = get(state.screenConfiguration.preparedFinalObject.Licenses[0], "licenseNumber")
//   const responseLength = get(
//     state.screenConfiguration.preparedFinalObject,
//     `licenseCount`,
//     1
//   );

//   return getCommonApplyFooter({
//     container: {
//       uiFramework: "custom-atoms",
//       componentPath: "Container",
//       children: {
//         rightdiv: {
//           uiFramework: "custom-atoms",
//           componentPath: "Div",
//           props: {

//             style: {
//               float: "right",
//               display: "flex"
//             }
//           },
//           children: {

//             resubmitButton: {
//               componentPath: "Button",
//               props: {
//                 variant: "contained",
//                 color: "primary",
//                 style: {
//                   minWidth: "180px",
//                   height: "48px",
//                   marginRight: "45px"
//                 }
//               },
//               children: {
//                 nextButtonLabel: getLabel({
//                   labelName: "RESUBMIT",
//                   labelKey: "TL_RESUBMIT"
//                 })
//               },
//               onClickDefination: {
//                 action: "condition",
//                 callBack: openPopup
//               },
//               visible: getButtonVisibility(status, "RESUBMIT"),
//               roleDefination: {
//                 rolePath: "user-info.roles",
//                 roles: ["TL_CEMP", "CITIZEN"]
//               }
//             },
//             editButton: {
//               componentPath: "Button",
//               props: {
//                 variant: "outlined",
//                 color: "primary",
//                 style: {
//                   minWidth: "180px",
//                   height: "48px",
//                   marginRight: "16px",
//                   borderRadius: "inherit"
//                 }
//               },
//               children: {
//                 previousButtonIcon: {
//                   uiFramework: "custom-atoms",
//                   componentPath: "Icon",
//                   props: {
//                     iconName: "keyboard_arrow_left"
//                   }
//                 },
//                 previousButtonLabel: getLabel({
//                   labelName: "Edit for Renewal",
//                   labelKey: "TL_RENEWAL_BUTTON_EDIT"
//                 })
//               },
//               onClickDefination: {
//                 action: "condition",
//                 callBack: () => {
//                   dispatch(
//                     setRoute(
//                       // `/tradelicence/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNo}&FY=${financialYear}&tenantId=${tenantId}`
//                       `/tradelicense-citizen/apply?applicationNumber=${applicationNumber}&licenseNumber=${licenseNumber}&tenantId=${tenantId}&action=EDITRENEWAL`
//                     )
//                   );
//                 },

//               },
//               visible: (getButtonVisibility(status, "APPROVED") || getButtonVisibility(status, "EXPIRED")) && (responseLength === 1),
//             },
//             submitButton: {
//               componentPath: "Button",
//               props: {
//                 variant: "contained",
//                 color: "primary",
//                 style: {
//                   minWidth: "180px",
//                   height: "48px",
//                   marginRight: "45px",
//                   borderRadius: "inherit"
//                 }
//               },
//               children: {
//                 nextButtonLabel: getLabel({
//                   labelName: "Submit for Renewal",
//                   labelKey: "TL_RENEWAL_BUTTON_SUBMIT"
//                 }),
//                 nextButtonIcon: {
//                   uiFramework: "custom-atoms",
//                   componentPath: "Icon",
//                   props: {
//                     iconName: "keyboard_arrow_right"
//                   }
//                 }
//               },
//               onClickDefination: {
//                 action: "condition",
//                 callBack: () => {
//                   renewTradelicence(financialYear, state, dispatch);
//                 },

//               },
//               visible: (getButtonVisibility(status, "APPROVED") || getButtonVisibility(status, "EXPIRED")) && (responseLength === 1),
//             },
//             makePayment: {
//               componentPath: "Button",
//               props: {
//                 variant: "contained",
//                 color: "primary",
//                 style: {
//                   minWidth: "180px",
//                   height: "48px",
//                   marginRight: "45px",
//                   borderRadius: "inherit"
//                 }
//               },
//               children: {
//                 submitButtonLabel: getLabel({
//                   labelName: "MAKE PAYMENT",
//                   labelKey: "TL_COMMON_BUTTON_CITIZEN_MAKE_PAYMENT"
//                 })
//               },
//               onClickDefination: {
//                 action: "condition",
//                 callBack: () => {
//                   dispatch(
//                     setRoute(
//                       `/egov-common/pay?consumerCode=${applicationNumber}&tenantId=${tenantId}&businessService=TL`
//                     )
//                   );
//                 },

//               },
//               visible: process.env.REACT_APP_NAME === "Citizen" && getButtonVisibility(status, "PENDINGPAYMENT") ? true : false
//             }
//           },
//           gridDefination: {
//             xs: 12,
//             sm: 12
//           }
//         },
//       }
//     }
//   });
// };
// export const footerReviewTop = (
//   action,
//   state,
//   dispatch,
//   status,
//   applicationNumber,
//   tenantId,
//   financialYear
// ) => {
//   /** MenuButton data based on status */
//   let downloadMenu = [];
//   let printMenu = [];
//   let licenseNumber = get(state.screenConfiguration.preparedFinalObject.Licenses[0], "licenseNumber")
//   const uiCommonConfig = get(state.screenConfiguration.preparedFinalObject, "uiCommonConfig");
//   const receiptKey = get(uiCommonConfig, "receiptKey");
//   const responseLength = get(
//     state.screenConfiguration.preparedFinalObject,
//     `licenseCount`,
//     1
//   );
//   // let renewalMenu=[];
//   let tlCertificateDownloadObject = {
//     label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
//     link: () => {
//       const { Licenses } = state.screenConfiguration.preparedFinalObject;
//       downloadCertificateForm(Licenses);
//     },
//     leftIcon: "book"
//   };
//   let tlCertificatePrintObject = {
//     label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
//     link: () => {
//       const { Licenses } = state.screenConfiguration.preparedFinalObject;
//       downloadCertificateForm(Licenses, 'print');
//     },
//     leftIcon: "book"
//   };
//   let receiptDownloadObject = {
//     label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
//     link: () => {


//       const receiptQueryString = [
//         { key: "consumerCodes", value: get(state.screenConfiguration.preparedFinalObject.Licenses[0], "applicationNumber") },
//         { key: "tenantId", value: get(state.screenConfiguration.preparedFinalObject.Licenses[0], "tenantId") },
//         { key: "businessService", value:'TL' }
//       ]
//       download(receiptQueryString, "download", receiptKey||"consolidatedreceipt",'PAYMENT' ,state);
//       // generateReceipt(state, dispatch, "receipt_download");
//     },
//     leftIcon: "receipt"
//   };
//   let receiptPrintObject = {
//     label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
//     link: () => {
//       const receiptQueryString = [
//         { key: "consumerCodes", value: get(state.screenConfiguration.preparedFinalObject.Licenses[0], "applicationNumber") },
//         { key: "tenantId", value: get(state.screenConfiguration.preparedFinalObject.Licenses[0], "tenantId") },
//         { key: "businessService", value:'TL' }
//       ]
//       download(receiptQueryString, "print", receiptKey||"consolidatedreceipt",'PAYMENT', state);
//       // generateReceipt(state, dispatch, "receipt_print");
//     },
//     leftIcon: "receipt"
//   };
//   let applicationDownloadObject = {
//     label: { labelName: "Application", labelKey: "TL_APPLICATION" },
//     link: () => {
//       const { Licenses, LicensesTemp } = state.screenConfiguration.preparedFinalObject;
//       const documents = LicensesTemp[0].reviewDocData;
//       set(Licenses[0], "additionalDetails.documents", documents)
//       generateTLAcknowledgement(state.screenConfiguration.preparedFinalObject, `tl-acknowledgement-${Licenses[0].applicationNumber}`);
//     },
//     leftIcon: "assignment"
//   };
//   let applicationPrintObject = {
//     label: { labelName: "Application", labelKey: "TL_APPLICATION" },
//     link: () => {
//       const { Licenses, LicensesTemp } = state.screenConfiguration.preparedFinalObject;
//       const documents = LicensesTemp[0].reviewDocData;
//       set(Licenses[0], "additionalDetails.documents", documents)
//       generateTLAcknowledgement(state.screenConfiguration.preparedFinalObject, 'print');

//     },
//     leftIcon: "assignment"
//   };

//   switch (status) {
//     case "APPROVED":
//       downloadMenu = [
//         tlCertificateDownloadObject,
//         receiptDownloadObject,
//         applicationDownloadObject
//       ];
//       printMenu = [
//         tlCertificatePrintObject,
//         receiptPrintObject,
//         applicationPrintObject
//       ];
//       break;
//     case "APPLIED":
//     case "CITIZENACTIONREQUIRED":
//     case "FIELDINSPECTION":
//     case "PENDINGAPPROVAL":
//     case "PENDINGPAYMENT":
//       downloadMenu = [applicationDownloadObject];
//       printMenu = [applicationPrintObject];
//       break;
//     case "pending_approval":
//       downloadMenu = [receiptDownloadObject, applicationDownloadObject];
//       printMenu = [receiptPrintObject, applicationPrintObject];
//       break;
//     case "CANCELLED":
//       downloadMenu = [applicationDownloadObject];
//       printMenu = [applicationPrintObject];
//       break;
//     case "REJECTED":
//       downloadMenu = [applicationDownloadObject];
//       printMenu = [applicationPrintObject];
//       break;
//     default:
//       break;
//   }
//   /** END */

//   return {
//     rightdiv: {
//       uiFramework: "custom-atoms",
//       componentPath: "Div",
//       props: {
//         style: { textAlign: "right", display: "flex" }
//       },
//       children: {
//         downloadMenu: {
//           uiFramework: "custom-atoms-local",
//           moduleName: "egov-tradelicence",
//           componentPath: "MenuButton",
//           props: {
//             data: {
//               label: { labelName: "DOWNLOAD", labelKey: "TL_DOWNLOAD" },
//               leftIcon: "cloud_download",
//               rightIcon: "arrow_drop_down",
//               props: { variant: "outlined", style: { height: "60px", color: "#FE7A51", marginRight: "5px" }, className: "tl-download-button" },
//               menu: downloadMenu
//             }
//           }
//         },
//         printMenu: {
//           uiFramework: "custom-atoms-local",
//           moduleName: "egov-tradelicence",
//           componentPath: "MenuButton",
//           props: {
//             data: {
//               label: { labelName: "PRINT", labelKey: "TL_PRINT" },
//               leftIcon: "print",
//               rightIcon: "arrow_drop_down",
//               props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "tl-print-button" },
//               menu: printMenu
//             }
//           }
//         }

//       },
//       // gridDefination: {
//       //   xs: 12,
//       //   sm: 6
//       // }
//     }
//   }

// };

// export const openPopup = (state, dispatch) => {
//   dispatch(
//     prepareFinalObject("ResubmitAction", true)
//   );
// }

// export const downloadPrintContainer = (
//   action,
//   state,
//   dispatch,
//   status,
//   applicationNumber,
//   tenantId
// ) => {
//   /** MenuButton data based on status */
//   const uiCommonConfig = get(state.screenConfiguration.preparedFinalObject, "uiCommonConfig");
//   const receiptKey = get(uiCommonConfig, "receiptKey");
//   let downloadMenu = [];
//   let printMenu = [];
//   let tlCertificateDownloadObject = {
//     label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
//     link: () => {
//       const { Licenses } = state.screenConfiguration.preparedFinalObject;
//       downloadCertificateForm(Licenses);
//     },
//     leftIcon: "book"
//   };
//   let tlCertificatePrintObject = {
//     label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
//     link: () => {
//       const { Licenses } = state.screenConfiguration.preparedFinalObject;
//       downloadCertificateForm(Licenses, 'print');
//     },
//     leftIcon: "book"
//   };
//   let receiptDownloadObject = {
//     label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
//     link: () => {
//       const receiptQueryString = [
//         { key: "consumerCodes", value: get(state.screenConfiguration.preparedFinalObject.Licenses[0], "applicationNumber") },
//         { key: "tenantId", value: get(state.screenConfiguration.preparedFinalObject.Licenses[0], "tenantId") },
//         { key: "businessService", value:'TL' }
//       ]
//       download(receiptQueryString, "download", receiptKey);
//     },
//     leftIcon: "receipt"
//   };
//   let receiptPrintObject = {
//     label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
//     link: () => {
//       const receiptQueryString = [
//         { key: "consumerCodes", value: get(state.screenConfiguration.preparedFinalObject.Licenses[0], "applicationNumber") },
//         { key: "tenantId", value: get(state.screenConfiguration.preparedFinalObject.Licenses[0], "tenantId") },
//         { key: "businessService", value:'TL' }
//       ]
//       download(receiptQueryString, "print", receiptKey);
//     },
//     leftIcon: "receipt"
//   };
//   let applicationDownloadObject = {
//     label: { labelName: "Application", labelKey: "TL_APPLICATION" },
//     link: () => {
//       const { Licenses, LicensesTemp } = state.screenConfiguration.preparedFinalObject;
//       const documents = LicensesTemp[0].reviewDocData;
//       set(Licenses[0], "additionalDetails.documents", documents)
//       // downloadAcknowledgementForm(Licenses);
//       generateTLAcknowledgement(state.screenConfiguration.preparedFinalObject, `tl-acknowledgement-${Licenses[0].applicationNumber}`);
//     },
//     leftIcon: "assignment"
//   };
//   let applicationPrintObject = {
//     label: { labelName: "Application", labelKey: "TL_APPLICATION" },
//     link: () => {
//       const { Licenses, LicensesTemp } = state.screenConfiguration.preparedFinalObject;
//       const documents = LicensesTemp[0].reviewDocData;
//       set(Licenses[0], "additionalDetails.documents", documents)
//       // downloadAcknowledgementForm(Licenses,'print');
//       generateTLAcknowledgement(state.screenConfiguration.preparedFinalObject, 'print');
//     },
//     leftIcon: "assignment"
//   };
//   switch (status) {
//     case "APPROVED":
//       downloadMenu = [
//         tlCertificateDownloadObject,
//         receiptDownloadObject,
//         applicationDownloadObject
//       ];
//       printMenu = [
//         tlCertificatePrintObject,
//         receiptPrintObject,
//         applicationPrintObject
//       ];
//       break;
//     case "APPLIED":
//     case "CITIZENACTIONREQUIRED":
//     case "FIELDINSPECTION":
//     case "PENDINGAPPROVAL":
//     case "PENDINGPAYMENT":
//       downloadMenu = [applicationDownloadObject];
//       printMenu = [applicationPrintObject];
//       break;
//     case "CANCELLED":
//       downloadMenu = [applicationDownloadObject];
//       printMenu = [applicationPrintObject];
//       break;
//     case "REJECTED":
//       downloadMenu = [applicationDownloadObject];
//       printMenu = [applicationPrintObject];
//       break;
//     default:
//       break;
//   }
//   /** END */

//   return {
//     rightdiv: {
//       uiFramework: "custom-atoms",
//       componentPath: "Div",
//       props: {
//         style: { textAlign: "right", display: "flex" }
//       },
//       children: {
//         downloadMenu: {
//           uiFramework: "custom-atoms-local",
//           moduleName: "egov-tradelicence",
//           componentPath: "MenuButton",
//           props: {
//             data: {
//               label: { labelName: "DOWNLOAD", labelKey: "TL_DOWNLOAD" },
//               leftIcon: "cloud_download",
//               rightIcon: "arrow_drop_down",
//               props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "tl-download-button" },
//               menu: downloadMenu
//             }
//           }
//         },
//         printMenu: {
//           uiFramework: "custom-atoms-local",
//           moduleName: "egov-tradelicence",
//           componentPath: "MenuButton",
//           props: {
//             data: {
//               label: { labelName: "PRINT", labelKey: "TL_PRINT" },
//               leftIcon: "print",
//               rightIcon: "arrow_drop_down",
//               props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "tl-print-button" },
//               menu: printMenu
//             }
//           }
//         }

//       },
//       // gridDefination: {
//       //   xs: 12,
//       //   sm: 6
//       // }
//     }
//   }
// };
