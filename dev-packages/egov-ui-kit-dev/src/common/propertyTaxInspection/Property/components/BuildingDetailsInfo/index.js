import React from "react";
import { initLocalizationLabels } from "egov-ui-kit/redux/app/utils";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import PropertyInfoCard from "../PropertyInfoCard";

const locale = getLocale() || "en_IN";
const localizationLabelsData = initLocalizationLabels(locale);

export const getAddressItems = (properties, OldProperty) => {
  let oldTenantInfo = [],
    oldStateId = "",
    oldCityId = "",
    oldLocality = "";
  const { buildingdetails = {}, tenantId = "" } = properties;
  const buildingDetails = buildingdetails && Object.keys(buildingdetails).length > 0 ? buildingdetails : {};
  const tenantInfo = tenantId.split(".") || [];
  const stateId = tenantInfo && tenantInfo.length === 2 && tenantInfo[0] ? tenantInfo[0].toUpperCase() : "NA";
  const cityId = tenantInfo && tenantInfo.length === 2 && tenantInfo[1] ? tenantInfo[1].toUpperCase() : "NA";
  //const localityCode = address.locality && address.locality.code ? address.locality.code : 'NA';
  if (OldProperty) {
    oldTenantInfo = OldProperty.tenantId.split(".");
    oldStateId = oldTenantInfo[0] && oldTenantInfo[0].toUpperCase();
    oldCityId = oldTenantInfo[1] && oldTenantInfo[1].toUpperCase();
    //oldLocality = OldProperty.address && OldProperty.address.locality && OldProperty.address.locality.code || 'NA';
  }
  return (
    buildingDetails && [
      {
        key: "Building Type",
        value: buildingDetails.buildingType || "NA",
        oldValue: OldProperty && OldProperty.buildingDetails && OldProperty.buildingDetails.buildingType,
      },
      {
        key: "Occupancy Status",
        value: buildingDetails.occupancyStatus || "NA",
        oldValue: OldProperty && OldProperty.buildingDetails && OldProperty.buildingDetails.occupancyStatus,
      },
      {
        key: "Number Of Stories",
        value: buildingDetails.numberOfStories || "NA",
        oldValue: OldProperty && OldProperty.buildingDetails && OldProperty.buildingDetails.numberOfStories,
      },
      {
        key: "Plot Area",
        value: buildingDetails.plotArea || "NA",
        oldValue: OldProperty && OldProperty.buildingDetails && OldProperty.buildingDetails.plotArea,
      },
      {
        key: "Covered Area",
        value: buildingDetails.coveredArea || "NA",
        oldValue: OldProperty && OldProperty.buildingDetails && OldProperty.buildingDetails.coveredArea,
      },
      {
        key: "Parking Area",
        value: buildingDetails.parkingArea || "NA",
        oldValue: OldProperty && OldProperty.buildingDetails && OldProperty.buildingDetails.parkingArea,
      },
      {
        key: "Common Area",
        value: buildingDetails.commonArea || "NA",
        oldValue: OldProperty && OldProperty.buildingDetails && OldProperty.buildingDetails.commonArea,
      },
    ]
  );
};

const BuildingDetailsInfo = ({ properties, editIcon, OldProperty }) => {
  let addressItems = [];
  const header = "Building Details";
  if (properties) {
    addressItems = getAddressItems(properties, OldProperty);
  }

  return <PropertyInfoCard editIcon={editIcon} items={addressItems} header={header}></PropertyInfoCard>;
};

export default BuildingDetailsInfo;
