import React from "react";
import { initLocalizationLabels } from "egov-ui-kit/redux/app/utils";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import PropertyInfoCard from "../PropertyInfoCard";

const locale = getLocale() || "en_IN";
const localizationLabelsData = initLocalizationLabels(locale);

export const getAddressItems = (properties, OldProperty) => {
    let oldTenantInfo = [], oldStateId = "", oldCityId = "", oldLocality = "";
    const { roomPropertyDetails = {}, tenantId = '' } = properties;
    
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
        roomPropertyDetails && [

            {
                key: "BathRoom",
                value: roomPropertyDetails.bathRoom || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.bathRoom
            },
            {
                key: "Bedroom",
                value: roomPropertyDetails.bedroom || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.bedroom
            },
            {
                key: "Class Room",
                value: roomPropertyDetails.classRoom || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.classRoom
            },
            {
                key: "Conference",
                value: roomPropertyDetails.conference || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.conference
            },
            {
                key: "Covered",
                value: roomPropertyDetails.covered || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.covered
            },
            {
                key: "Garrage",
                value: roomPropertyDetails.garrage || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.garrage
            },
            {
                key: "Hall",
                value: roomPropertyDetails.hall || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.hall
            },
            {
                key: "Health Club",
                value: roomPropertyDetails.healthClub || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.healthClub
            },

            {
                key: "Kitchen",
                value: roomPropertyDetails.kitchen || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.kitchen
            },
            {
                key: "Living Dining",
                value: roomPropertyDetails.livingDining || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.livingDining
            },
            {
                key: "Mezzanine",
                value: roomPropertyDetails.mezzanine || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.mezzanine
            },
            {
                key: "Office",
                value: roomPropertyDetails.office || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.office
            },
            {
                key: "Shed",
                value: roomPropertyDetails.shed || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.shed
            },
            {
                key: "Shop",
                value: roomPropertyDetails.shop || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.shop
            },
            {
                key: "Stair Case",
                value: roomPropertyDetails.stairCase || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.stairCase
            },
            {
                key: "Study",
                value: roomPropertyDetails.study || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.study
            },
            {
                key: "Swiming Pool",
                value: roomPropertyDetails.swimingPool || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.swimingPool
            },
            {
                key: "Terrace",
                value: roomPropertyDetails.terrace || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.terrace
            },
            {
                key: "Thakur Ghar",
                value: roomPropertyDetails.thakurGhar || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.thakurGhar
            },
            {
                key: "Verandah",
                value: roomPropertyDetails.verandah || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.verandah
            },
            {
                key: "Wall Shop",
                value: roomPropertyDetails.wallShop || "NA",
                oldValue: OldProperty && OldProperty.roomPropertyDetails && OldProperty.roomPropertyDetails.wallShop
            },

        ]
    );
}

const RoomDetailInfo = ({ properties, editIcon, OldProperty }) => {

    let addressItems = [];
    const header = 'Room Details';
    if (properties) {
        addressItems = getAddressItems(properties, OldProperty);
    }

    return (
        <PropertyInfoCard editIcon={editIcon} items={addressItems} header={header}></PropertyInfoCard>
    );
};

export default RoomDetailInfo;
