import {
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabelWithValue,
} from "egov-ui-framework/ui-config/screens/specs/utils";

export const parkingSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px", fontSize: "7px" },
    },
    children: {
      header: {
        gridDefination: {
          xs: 12,
          sm: 12,
        },
        ...getCommonSubHeader({
          labelName: "Parking Information",
          labelKey: "Parking Information",
        }),
      },
    },
  },
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        parkingContainer: getCommonContainer({
          parkingCode: getLabelWithValue(
            {
              labelName: "Parking Code",
              labelKey: "Parking Code",
            },
            {
              jsonPath: "selectedParkingInformation.parkingCode",
            }
          ),
          totalNumOfSpaces: getLabelWithValue(
            {
              labelName: "Total Number Of Spaces",
              labelKey: "Total Number Of Spaces",
            },
            {
              jsonPath: "selectedParkingInformation.totalNumOfSpaces",
            }
          ),
          latitudeOfStartingPoint: getLabelWithValue(
            {
              labelName: "Latitude Of Starting Point",
              labelKey: "Latitude Of Starting Point",
            },
            {
              jsonPath: "selectedParkingInformation.latitudeOfStartingPoint",
            }
          ),
          longitudeOfStartingPoint: getLabelWithValue(
            {
              labelName: "Longitude Of Starting Point",
              labelKey: "Longitude Of Starting Point",
            },
            {
              jsonPath: "selectedParkingInformation.longitudeOfStartingPoint",
            }
          ),
          latitudeOfEndingPoint: getLabelWithValue(
            {
              labelName: "Latitude Of Ending Point",
              labelKey: "Latitude Of Ending Point",
            },
            {
              jsonPath: "selectedParkingInformation.latitudeOfEndingPoint",
            }
          ),
          longitudeOfEndingPoint: getLabelWithValue(
            {
              labelName: "Longitude Of Ending Point",
              labelKey: "Longitude Of Ending Point",
            },
            {
              jsonPath: "selectedParkingInformation.longitudeOfEndingPoint",
            }
          ),
        }),
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "",
      prefixSourceJsonPath:
        "children.cardContent.children.applicantContainer.children",
      afterPrefixJsonPath: "children.value.children.key",
    },
    type: "array",
  },
});

export const agencySummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" },
    },
    children: {
      header: {
        gridDefination: {
          xs: 12,
          sm: 12,
        },
        ...getCommonSubHeader({
          labelName: "Agency Information",
          labelKey: "Agency Information",
        }),
      },
    },
  },
  body: getCommonContainer({
    agencyCode: getLabelWithValue(
      {
        labelName: "Agency Code",
        labelKey: "Agency Code",
      },
      {
        jsonPath: "selectedTenderInformation.agencyCode",
      }
    ),
    contactName: getLabelWithValue(
      {
        labelName: "Contact Name",
        labelKey: "Contact Name",
      },
      {
        jsonPath: "selectedTenderInformation.contactName",
      }
    ),
    contactMobile: getLabelWithValue(
      {
        labelName: "Contact Mobile No.",
        labelKey: "Contact Mobile No.",
      },
      {
        jsonPath: "selectedTenderInformation.contactMobile",
      }
    ),
    contactEmail: getLabelWithValue(
      {
        labelName: "Contact Email",
        labelKey: "Contact Email",
      },
      {
        jsonPath: "selectedTenderInformation.contactEmail",
      }
    ),
    address: getLabelWithValue(
      {
        labelName: "Address",
        labelKey: "Address",
      },
      {
        jsonPath: "selectedTenderInformation.address",
      }
    ),
  }),
});
