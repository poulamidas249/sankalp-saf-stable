import React from "react";
import { initLocalizationLabels } from "egov-ui-kit/redux/app/utils";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import PropertyInfoCard from "../PropertyInfoCard";

const locale = getLocale() || "en_IN";
const localizationLabelsData = initLocalizationLabels(locale);

export const getAddressItems = (properties, OldProperty) => {
    let oldTenantInfo = [], oldStateId = "", oldCityId = "", oldLocality = "";
    const { propertyDetailsNew = {}, tenantId = '' } = properties;
    
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
        propertyDetailsNew && [

            {
                key: "Nature Of Property",
                value: propertyDetailsNew.natureOfProperty || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.natureOfProperty
            },
            {
                key: "Building Name",
                value: propertyDetailsNew.buildingName || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.buildingName
            },
            {
                key: "Flat Number",
                value: propertyDetailsNew.flatNo || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.flatNo
            },
            {
                key: "Floor Number",
                value: propertyDetailsNew.floorNo || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.floorNo
            },
            {
                key: "Nature Of Use",
                value: propertyDetailsNew.natureOfUse || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.natureOfUse
            },
            {
                key: "Occupier Name",
                value: propertyDetailsNew.occupierName || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.occupierName
            },
            {
                key: "Occupier Status",
                value: propertyDetailsNew.occupierStatus || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.occupierStatus
            },
            {
                key: "pRent",
                value: propertyDetailsNew.pRent || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.pRent
            },
            {
                key: "Type Of Use",
                value: propertyDetailsNew.typeOfUse || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.typeOfUse
            },
        
            {
                key: "Common Space",
                value: propertyDetailsNew.commonSpace || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.commonSpace
            },
       
            {
                key: "Covered Car Parking",
                value: propertyDetailsNew.coveredCarParking || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.coveredCarParking
            },
            {
                key: "Covered Space",
                value: propertyDetailsNew.coveredSpace || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.coveredSpace
            },
            {
                key: "Open Car Parking",
                value: propertyDetailsNew.openCarParking || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.openCarParking
            },
            {
                key: "Open Terrace",
                value: propertyDetailsNew.openTerrace || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.openTerrace
            },
            {
                key: "Roof",
                value: propertyDetailsNew.roof || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.roof
            },
            {
                key: "Swiming Pool",
                value: propertyDetailsNew.swimingpool || "NA",
                oldValue: OldProperty && OldProperty.propertyDetailsNew && OldProperty.propertyDetailsNew.swimingpool
            },
           

        ]
    );
}

const PropDetailInfo = ({ properties, editIcon, OldProperty }) => {

    let addressItems = [];
    const header = 'Property Details';
    if (properties) {
        addressItems = getAddressItems(properties, OldProperty);
    }

    return (
        <PropertyInfoCard editIcon={editIcon} items={addressItems} header={header}></PropertyInfoCard>
    );
};

export default PropDetailInfo;
