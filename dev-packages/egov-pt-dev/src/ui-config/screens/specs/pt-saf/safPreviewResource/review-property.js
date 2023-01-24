import {
  getCommonContainer, getCommonGrayCard,
  getCommonSubHeader,


  getLabel, getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { checkValueForNA, convertEpochToDate } from "../../utils";

export const reviewOwnerDOB = getLabelWithValue(
  {
    labelName: "Date of Birth",
    labelKey: "TL_EMP_APPLICATION_DOB"
  },
  {
    jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].dob",
    callBack: convertEpochToDate
  }
);

export const assesseePropertyDetails = {
  wardNo: getLabelWithValue(
    {
      labelName: "Ward Number",
      labelKey: "Ward Number"
    },
    { jsonPath: "Saf[0].asseseDetail.wardNo", callBack: checkValueForNA }),
    streetCode: getLabelWithValue(
    {
      labelName: "KMC Street Code",
      labelKey: "KMC Street Code"
    },
    { jsonPath: "Saf[0].asseseDetail.streetCode", callBack: checkValueForNA }),
    premisesNo: getLabelWithValue(
    {
      labelName: "KMC Premises Number",
      labelKey: "KMC Premises Number"
    },
    { jsonPath: "Saf[0].asseseDetail.premisesNo", callBack: checkValueForNA }),
    streetName: getLabelWithValue(
    {
      labelName: "KMC Street Name",
      labelKey: "KMC Street Name"
    },
    { jsonPath: "Saf[0].asseseDetail.streetName", callBack: checkValueForNA }),
    blockId: getLabelWithValue(
    {
      labelName: "Block",
      labelKey: "Block"
    },
    { jsonPath: "Saf[0].asseseDetail.blockId", callBack: checkValueForNA }),
    category: getLabelWithValue(
    {
      labelName: "Category",
      labelKey: "Category"
    },
    { jsonPath: "Saf[0].asseseDetail.category", callBack: checkValueForNA }),
    propSituated: getLabelWithValue(
    {
      labelName: "Property situated in",
      labelKey: "Property situated in"
    },
    { jsonPath: "Saf[0].asseseDetail.propSituated", callBack: checkValueForNA }),
    propertyType: getLabelWithValue(
    {
      labelName: "Property Type",
      labelKey: "Property Type"
    },
    { jsonPath: "Saf[0].asseseDetail.propertyType", callBack: checkValueForNA }),
    landMark: getLabelWithValue(
    {
      labelName: "Nearest Prominent Landmard",
      labelKey: "Nearest Prominent Landmard"
    },
    { jsonPath: "Saf[0].asseseDetail.landMark", callBack: checkValueForNA }),
    natureOfUse: getLabelWithValue(
    {
      labelName: "Nature of Use",
      labelKey: "Nature of Use"
    },
    { jsonPath: "Saf[0].asseseDetail.natureOfUse", callBack: checkValueForNA }),
    frontageRoadName_Others: getLabelWithValue(
    {
      labelName: "Enter Other Frontage Road",
      labelKey: "Enter Other Frontage Road"
    },
    { jsonPath: "Saf[0].asseseDetail.frontageRoadName_Others", callBack: checkValueForNA }),
    nearestLampPost: getLabelWithValue(
      {
        labelName: "Nearest Lamp Post",
        labelKey: "Nearest Lamp Post"
      },
      { jsonPath: "Saf[0].asseseDetail.nearestLampPost", callBack: checkValueForNA }),
      isSuoMoto: getLabelWithValue(
        {
          labelName: "Type Of SAF Initiation",
          labelKey: "Type Of SAF Initiation"
        },
        { jsonPath: "Saf[0].asseseDetail.isSuoMoto", callBack: checkValueForNA }),
}

export const getReviewProperty = (isEditable = true) => {
  return getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 10
          },
          ...getCommonSubHeader({
            labelName: "Property Details",
            labelKey: "Property Details"
          })
        },
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isEditable,
          gridDefination: {
            xs: 12,
            sm: 2,
            align: "right"
          },
          children: {
            editIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "edit"
              }
            },
            buttonLabel: getLabel({
              labelName: "Edit",
              labelKey: "TL_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {

            }
          }
        }
      }
    },
    ownerDetails :  getCommonGrayCard({
      ownerDetailContainer: getCommonContainer(assesseePropertyDetails)
    }),
  });
};
