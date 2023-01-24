import React from "react";
import { initLocalizationLabels } from "egov-ui-kit/redux/app/utils";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import PropertyInfoCard from "../PropertyInfoCard";

const locale = getLocale() || "en_IN";
const localizationLabelsData = initLocalizationLabels(locale);



export const getAddressItems = (properties, OldProperty) => {
  let oldTenantInfo = [], oldStateId="", oldCityId="", oldLocality="";
  const { registrationDetails = {}, tenantId = '' } = properties;
  const tenantInfo = tenantId.split('.') || [];
  const stateId = tenantInfo && tenantInfo.length === 2 && tenantInfo[0] ? tenantInfo[0].toUpperCase() : 'NA';
  const cityId = tenantInfo && tenantInfo.length === 2 && tenantInfo[1] ? tenantInfo[1].toUpperCase() : 'NA';
  //const localityCode = address.locality && address.locality.code ? address.locality.code : 'NA';
  if(OldProperty){
   oldTenantInfo = OldProperty.tenantId.split(".");
   oldStateId = oldTenantInfo[0]&&oldTenantInfo[0].toUpperCase();
   oldCityId = oldTenantInfo[1]&&oldTenantInfo[1].toUpperCase();
   //oldLocality = OldProperty.address && OldProperty.address.locality && OldProperty.address.locality.code || 'NA';
  }

  return (
    registrationDetails && [
      {
        key: "Dag",
        value: registrationDetails.dag || "NA",
        oldValue: OldProperty && OldProperty.registrationDetails && OldProperty.registrationDetails.dag
      },
      {
        key: "Khatian",
        value: registrationDetails.khatian || "NA",
        oldValue: OldProperty && OldProperty.registrationDetails && OldProperty.registrationDetails.khatian
      },
      {
        key: "Mouza",
        value: registrationDetails.mouza || "NA",
        oldValue: OldProperty && OldProperty.registrationDetails && OldProperty.registrationDetails.mouza
      },
      {
        key: "Query No.",
        value: registrationDetails.queryNo || "NA",
        oldValue: OldProperty && OldProperty.registrationDetails && OldProperty.registrationDetails.queryNo
      },
      {
        key: "Query Year",
        value: registrationDetails.queryYear || "NA",
        oldValue: OldProperty && OldProperty.registrationDetails && OldProperty.registrationDetails.queryYear
      },
      {
        key: "Deed No",
        value: registrationDetails.deedNo || "NA",
        oldValue: OldProperty && OldProperty.registrationDetails && OldProperty.registrationDetails.deedNo
      },
      {
        key: "Deed Year",
        value: registrationDetails.deedYear || "NA",
        oldValue: OldProperty && OldProperty.registrationDetails && OldProperty.registrationDetails.deedYear
      },
      {
        key: "Location",
        value: registrationDetails.location || "NA",
        oldValue: OldProperty && OldProperty.registrationDetails && OldProperty.registrationDetails.location
      },
      {
        key: "Ro",
        value: registrationDetails.ro || "NA",
        oldValue: OldProperty && OldProperty.registrationDetails && OldProperty.registrationDetails.ro
      },
      {
        key: "Book",
        value: registrationDetails.book || "NA",
        oldValue: OldProperty && OldProperty.registrationDetails && OldProperty.registrationDetails.book
      },
      
    ]
  );
}

const RegistrationDetailInfo = ({ properties, editIcon, OldProperty }) => {

  let addressItems = [];
  const header = 'Registration Details';
  if (properties) {
    addressItems = getAddressItems(properties, OldProperty);
  }

  return (
    <PropertyInfoCard editIcon={editIcon} items={addressItems} header={header}></PropertyInfoCard>
  );
};

export default RegistrationDetailInfo;
