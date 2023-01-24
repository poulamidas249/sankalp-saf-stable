import React from "react";
import { initLocalizationLabels } from "egov-ui-kit/redux/app/utils";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import PropertyInfoCard from "../PropertyInfoCard";

const locale = getLocale() || "en_IN";
const localizationLabelsData = initLocalizationLabels(locale);



export const getAddressItems = (properties, OldProperty) => {
  let oldTenantInfo = [], oldStateId="", oldCityId="", oldLocality="";
  const { owners = {}, tenantId = '' } = properties;
  const ownerDetail = owners && owners.length>0 && owners[0] 
  const tenantInfo = tenantId.split('.') || [];
  const stateId = tenantInfo && tenantInfo.length === 2 && tenantInfo[0] ? tenantInfo[0].toUpperCase() : 'NA';
  const cityId = tenantInfo && tenantInfo.length === 2 && tenantInfo[1] ? tenantInfo[1].toUpperCase() : 'NA';
 // const localityCode =address && address.locality && address.locality.code ? address.locality.code : 'NA';
  if(OldProperty){
   oldTenantInfo = OldProperty.tenantId.split(".");
   oldStateId = oldTenantInfo[0]&&oldTenantInfo[0].toUpperCase();
   oldCityId = oldTenantInfo[1]&&oldTenantInfo[1].toUpperCase();
   oldLocality = OldProperty.address && OldProperty.address.locality && OldProperty.address.locality.code || 'NA';
  }

  return (
    ownerDetail && [
      {
        key: "Name",
        value: ownerDetail.userName || "NA",
        oldValue: OldProperty && OldProperty.ownerDetail && OldProperty.ownerDetail.userName
      },
      {
        key: "Mobile Number",
        value: ownerDetail.mobileNumber || "NA",
        oldValue: OldProperty && OldProperty.ownerDetail && OldProperty.ownerDetail.mobileNumber
      },
      {
        key: "Email Id",
        value: ownerDetail.emailId || "NA",
        oldValue: OldProperty && OldProperty.ownerDetail && OldProperty.ownerDetail.emailId
      },
      {
        key: "Permanent Address",
        value: ownerDetail.permanentAddress || "NA",
        oldValue: OldProperty && OldProperty.ownerDetail && OldProperty.ownerDetail.permanentAddress
      },
  
    ]
  );
}

const OwnerDetailsInfo = ({ properties, editIcon, OldProperty }) => {

  let addressItems = [];
  const header = 'Owner Details';
  if (properties) {
    addressItems = getAddressItems(properties, OldProperty);
  }

  return (
    <PropertyInfoCard editIcon={editIcon} items={addressItems} header={header}></PropertyInfoCard>
  );
};

export default OwnerDetailsInfo;
