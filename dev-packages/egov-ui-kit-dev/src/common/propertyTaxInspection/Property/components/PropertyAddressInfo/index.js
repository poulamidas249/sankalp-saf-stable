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
  const { address = {}, tenantId = "" } = properties;
  const tenantInfo = tenantId.split(".") || [];
  const stateId = tenantInfo && tenantInfo.length === 2 && tenantInfo[0] ? tenantInfo[0].toUpperCase() : "NA";
  const cityId = tenantInfo && tenantInfo.length === 2 && tenantInfo[1] ? tenantInfo[1].toUpperCase() : "NA";
  // const localityCode =address && address.locality && address.locality.code ? address.locality.code : 'NA';
  if (OldProperty) {
    oldTenantInfo = OldProperty.tenantId.split(".");
    oldStateId = oldTenantInfo[0] && oldTenantInfo[0].toUpperCase();
    oldCityId = oldTenantInfo[1] && oldTenantInfo[1].toUpperCase();
    oldLocality = (OldProperty.address && OldProperty.address.locality && OldProperty.address.locality.code) || "NA";
  }

  return (
    properties && [
      {
        key: "Ward",
        value: properties.ward || "NA",
        oldValue: OldProperty && OldProperty.properties && OldProperty.properties.ward,
      },

      {
        key: "Street Name",
        value: properties.street || "NA",
        oldValue: OldProperty && OldProperty.properties && OldProperty.properties.street,
      },

      {
        key: "Building Name",
        value: properties.premiseType || "NA",
        oldValue: OldProperty && OldProperty.properties.premiseType,
      },
    ]
  );
};

const PropertyAddressInfo = ({ properties, editIcon, OldProperty }) => {
  let addressItems = [];
  const header = "PT_PROPERTY_ADDRESS_SUB_HEADER";
  if (properties) {
    addressItems = getAddressItems(properties, OldProperty);
  }

  return <PropertyInfoCard editIcon={editIcon} items={addressItems} header={header}></PropertyInfoCard>;
};

export default PropertyAddressInfo;
