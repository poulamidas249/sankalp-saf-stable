import React from "react";
import { initLocalizationLabels } from "egov-ui-kit/redux/app/utils";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import PropertyInfoCard from "../PropertyInfoCard";

const locale = getLocale() || "en_IN";
const localizationLabelsData = initLocalizationLabels(locale);

export const getAddressItems = (properties, OldProperty) => {
    let oldTenantInfo = [], oldStateId = "", oldCityId = "", oldLocality = "";
    const { buildingdetails = {}, tenantId = '' } = properties;
    const landDetails = buildingdetails
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
        landDetails && [

            {
                key: "Character of Premises",
                value: landDetails.characterofPremises || "NA",
                oldValue: OldProperty && OldProperty.landDetails && OldProperty.landDetails.characterofPremises
            },
            {
                key: "Acre",
                value: landDetails.acre || "NA",
                oldValue: OldProperty && OldProperty.landDetails && OldProperty.landDetails.acre
            },
            {
                key: "Bigha",
                value: landDetails.bigha || "NA",
                oldValue: OldProperty && OldProperty.landDetails && OldProperty.landDetails.bigha
            },
            {
                key: "Chatak",
                value: landDetails.chatak || "NA",
                oldValue: OldProperty && OldProperty.landDetails && OldProperty.landDetails.chatak
            },
            {
                key: "Cotah",
                value: landDetails.cotah || "NA",
                oldValue: OldProperty && OldProperty.landDetails && OldProperty.landDetails.cotah
            },
            {
                key: "Satak",
                value: landDetails.satak || "NA",
                oldValue: OldProperty && OldProperty.landDetails && OldProperty.landDetails.satak
            },
            {
                key: "Square Meter",
                value: landDetails.sqMt || "NA",
                oldValue: OldProperty && OldProperty.landDetails && OldProperty.landDetails.sqMt
            },
            {
                key: "Square Feet",
                value: landDetails.sqFt || "NA",
                oldValue: OldProperty && OldProperty.landDetails && OldProperty.landDetails.sqFt
            },



        ]
    );
}

const LandDetailsInfo = ({ properties, editIcon, OldProperty }) => {

    let addressItems = [];
    const header = 'Land Details';
    if (properties) {
        addressItems = getAddressItems(properties, OldProperty);
    }

    return (
        <PropertyInfoCard editIcon={editIcon} items={addressItems} header={header}></PropertyInfoCard>
    );
};

export default LandDetailsInfo;
