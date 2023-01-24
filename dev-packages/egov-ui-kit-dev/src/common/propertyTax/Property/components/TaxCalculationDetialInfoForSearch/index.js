import React from "react";
import { initLocalizationLabels } from "egov-ui-kit/redux/app/utils";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import PropertyInfoCard from "../PropertyInfoCard";

const locale = getLocale() || "en_IN";
const localizationLabelsData = initLocalizationLabels(locale);



export const getAddressItems = (properties, OldProperty) => {
  let oldTenantInfo = [], oldStateId = "", oldCityId = "", oldLocality = "";
  const { taxdetails = {}, tenantId = '' } = properties;
  const tenantInfo = tenantId.split('.') || [];
  const stateId = tenantInfo && tenantInfo.length === 2 && tenantInfo[0] ? tenantInfo[0].toUpperCase() : 'NA';
  const cityId = tenantInfo && tenantInfo.length === 2 && tenantInfo[1] ? tenantInfo[1].toUpperCase() : 'NA';
  //const localityCode = address.locality && address.locality.code ? address.locality.code : 'NA';
  if (OldProperty) {
    oldTenantInfo = OldProperty.tenantId.split(".");
    oldStateId = oldTenantInfo[0] && oldTenantInfo[0].toUpperCase();
    oldCityId = oldTenantInfo[1] && oldTenantInfo[1].toUpperCase();
    //oldLocality = OldProperty.address && OldProperty.address.locality && OldProperty.address.locality.code || 'NA';
  }
  return (
    taxdetails && [
      {
        key: "Effective QTR",
        value: taxdetails.effectiveQtr ? taxdetails.effectiveQtr.toString().substring(0, 4) + "/" + taxdetails.effectiveQtr.toString().substring(4, 5) : "NA" || "NA",
        oldValue: OldProperty && OldProperty.taxdetails && OldProperty.taxdetails.effectiveQtr
      },
      {
        key: "Reasonable Rent",
        value: taxdetails.reasonableRent ? taxdetails.reasonableRent.toString() : "NA" || "NA",
        oldValue: OldProperty && OldProperty.taxdetails && OldProperty.taxdetails.rrMonth
      },
      {
        key: "av",
        value: taxdetails.av ? taxdetails.av.toString() : "NA" || "NA",
        oldValue: OldProperty && OldProperty.taxdetails && OldProperty.taxdetails.AV
      },
      {
        key: "Common Rate",
        value: taxdetails.commRate ? taxdetails.commRate.toString() : "NA" || "NA",
        oldValue: OldProperty && OldProperty.taxdetails && OldProperty.taxdetails.commRate
      },
      {
        key: "Howrgh Bridge",
        value: taxdetails.hbtAmount ? taxdetails.hbtAmount.toString() : "NA" || "NA",
        oldValue: OldProperty && OldProperty.taxdetails && OldProperty.taxdetails.howrghBridge
      },
      {
        key: "Surcharge",
        value: taxdetails.surcharge ? taxdetails.surcharge.toString() : "NA" || "NA",
        oldValue: OldProperty && OldProperty.taxdetails && OldProperty.taxdetails.surcharge
      },
      {
        key: "Payable Amount",
        value: taxdetails.paybleAmount ? taxdetails.paybleAmount.toString() : "NA" || "NA",
        oldValue: OldProperty && OldProperty.taxdetails && OldProperty.taxdetails.payableAmount
      },
      {
        key: "Rebate Amount",
        value: taxdetails.rebateAmount ? taxdetails.rebateAmount.toString() : "NA" || "NA",
        oldValue: OldProperty && OldProperty.taxdetails && OldProperty.taxdetails.rebateAmount
      },
      {
        key: "Net Amount",
        value: taxdetails.netAmount ? taxdetails.netAmount.toString() : "NA" || "NA",
        oldValue: OldProperty && OldProperty.taxdetails && OldProperty.taxdetails.netAmount
      },

    ]
  );
}

const TaxCalculationDetialInfoForSearch = ({ properties, editIcon, OldProperty }) => {

  let addressItems = [];
  const header = 'Tax Details';
  if (properties) {
    addressItems = getAddressItems(properties, OldProperty);
  }

  return (
    <PropertyInfoCard editIcon={editIcon} items={addressItems} header={header}></PropertyInfoCard>
  );
};

export default TaxCalculationDetialInfoForSearch;
