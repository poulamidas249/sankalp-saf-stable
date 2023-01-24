import { getOwnerDetails } from "./utils/formConfigModifier";
import set from "lodash/set";
import get from "lodash/get";
import { updateInstituteType } from "./utils/formConfigModifier";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import { prepareFormData } from "egov-ui-kit/redux/common/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
const formConfig = {
    name: "buildingDetails",
    fields: {

        buildingType: {
            id: "buildingType",
            jsonPath: "Properties[0].buildingDetails.buildingType",
            type: "AutocompleteDropdown",
            floatingLabelText: "Building Type",
            localePrefix: true,
            required: false,
            labelsFromLocalisation: false,
            hintText: "Building Type",
            fullWidth: true,
            numcols: 6,
            gridDefination: {
                xs: 12,
                sm: 6
            },
            formName: "buildingDetails",
            updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
                // const { value } = sourceField;
                // const institutedropDown = updateInstituteType(state, value);
                // dispatch(
                //   prepareFormData(
                //     "Properties[0].ownershipCategory",
                //     get(state, `common.generalMDMSDataById.SubOwnerShipCategory[${sourceField.value}].ownerShipCategory`, value)
                //   )
                // );
                // if (value.toUpperCase().indexOf("INSTITUTIONAL") !== -1) {
                //   dispatch(prepareFormData("Properties[0].subOwnershipCategory", null));
                // }
                // dispatch(setFieldProperty("institutionDetails", "type", "dropDownData", institutedropDown));
            },
        },
        numberOfStories: {
            id: "numberOfStories",
            jsonPath: "Properties[0].buildingDetails.numberOfStories",
            type: "textfield",
            floatingLabelText: "Number of Stories",
            hintText: "Number of Stories",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },

        occupancyStatus: {
            id: "occupancyStatus",
            jsonPath: "Properties[0].buildingDetails.occupancyStatus",
            type: "AutocompleteDropdown",
            required: false,
            floatingLabelText: "Occupancy Status",
            localePrefix: true,
            fullWidth: true,
            labelsFromLocalisation: false,
            hintText: "Occupancy Status",
            numcols: 6,
            gridDefination: {
                xs: 12,
                sm: 6
            },
            formName: "buildingDetails",
            updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
                // const { value } = sourceField;
                // const institutedropDown = updateInstituteType(state, value);
                // dispatch(
                //   prepareFormData(
                //     "Properties[0].ownershipCategory",
                //     get(state, `common.generalMDMSDataById.SubOwnerShipCategory[${sourceField.value}].ownerShipCategory`, value)
                //   )
                // );
                // if (value.toUpperCase().indexOf("INSTITUTIONAL") !== -1) {
                //   dispatch(prepareFormData("Properties[0].subOwnershipCategory", null));
                // }
                // dispatch(setFieldProperty("institutionDetails", "type", "dropDownData", institutedropDown));
            },
        },
        plotArea: {
            id: "plotArea",
            jsonPath: "Properties[0].buildingDetails.plotArea",
            type: "textfield",
            floatingLabelText: "Plot Area",
            hintText: "Plot Area",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },

        coveredArea: {
            id: "coveredArea",
            jsonPath: "Properties[0].buildingDetails.coveredArea",
            type: "textfield",
            floatingLabelText: "Covered Area",
            hintText: "Covered Area",

            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },

        parkingArea: {
            id: "parkingArea",
            jsonPath: "Properties[0].buildingDetails.parkingArea",
            type: "textfield",
            floatingLabelText: "Parking Area",
            hintText: "Parking Area",

            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },

        commonArea: {
            id: "commonArea",
            jsonPath: "Properties[0].buildingDetails.commonArea",
            type: "textfield",
            floatingLabelText: "Common Area",
            hintText: "Common Area",

            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },


    },
    beforeInitForm: (action, store) => {
        // console.log('action1234', action)
        // let state = store.getState();
        // const { dispatch } = store;
        // const ownerDetails = getOwnerDetails(state);
        // if (ownerDetails && ownerDetails.length) {
        //   const currentOwnershipType = get(state, "form.ownershipType.fields.typeOfOwnership.value", ownerDetails[0].value);


        //   set(action, "form.fields.typeOfOwnership.dropDownData", ownerDetails);
        //   // set(action, "form.fields.typeOfOwnership.value", currentOwnershipType);
        //   // dispatch(prepareFormData("Properties[0].subOwnershipCategory", currentOwnershipType ? currentOwnershipType : ownerDetails[0].value));
        //   // dispatch(prepareFormData("Properties[0].ownershipCategory",
        //   //     get(state, `common.generalMDMSDataById.OwnerShipCategory[${currentOwnershipType ? currentOwnershipType : ownerDetails[0].value}]`).ownerShipCategory)
        //   // );
        // }
        return action;
    },
    afterInitForm: (action, store, dispatch) => {



        let state = store.getState();
        const { propertyRes } = state.screenConfiguration.preparedFinalObject
        // if (getQueryArg(window.location.href, "purpose") == 'approve') {

        //     let property = propertyRes
        //     dispatch(setFieldProperty("buildingDetails", "buildingType", "value", property.buildingDetails.buildingType));
        //     dispatch(setFieldProperty("buildingDetails", "numberOfStories", "value", property.buildingDetails.numberOfStories));
        //     dispatch(setFieldProperty("buildingDetails", "flatNo", "value", property.buildingDetails.flatNo));
        //     dispatch(setFieldProperty("buildingDetails", "occupancyStatus", "value", property.buildingDetails.occupancyStatus));
        //     dispatch(setFieldProperty("buildingDetails", "coveredArea", "value", property.buildingDetails.coveredArea));
        //     dispatch(setFieldProperty("buildingDetails", "parkingArea", "value", property.buildingDetails.parkingArea));
        //     dispatch(setFieldProperty("buildingDetails", "commonArea", "value", property.buildingDetails.commonArea));
        //     dispatch(setFieldProperty("buildingDetails", "plotArea", "value", property.buildingDetails.plotArea));


        // }

        let occupancyStatusTypeDropDownData = [
            {
                name: 'Self',
                code: 'Self',
                label: 'Self',
                value: 'Self'
            },
            {
                name: 'Part Self Part Tenant',
                code: 'Part Self Part Tenant',
                label: 'Part Self Part Tenant',
                value: 'Part Self Part Tenant'
            },
            {
                name: 'Full Tenant',
                code: 'Full Tenant',
                label: 'Full Tenant',
                value: 'Full Tenant'
            },
            {
                name: 'Part Self Part Commercial',
                code: 'Part Self Part Commercial',
                label: 'Part Self Part Commercial',
                value: 'Part Self Part Commercial'
            },
            {
                name: 'Full Commercial',
                code: 'Full Commercial',
                label: 'Full Commercial',
                value: 'Full Commercial'
            },

        ]

        let buildingTypeDropDownData = [
            {
                name: 'Kancha',
                code: 'Kancha',
                label: 'Kancha',
                value: 'Kancha'
            },
            {
                name: 'Pucca',
                code: 'Pucca',
                label: 'Pucca',
                value: 'Pucca'
            },
            {
                name: 'Flat',
                code: 'Flat',
                label: 'Flat',
                value: 'Flat'
            },
            {
                name: 'Semi Pucca',
                code: 'Semi Pucca',
                label: 'Semi Pucca',
                value: 'Semi Pucca'
            },


        ]
        dispatch(setFieldProperty("buildingDetails", "buildingType", "dropDownData", buildingTypeDropDownData));
        dispatch(setFieldProperty("buildingDetails", "occupancyStatus", "dropDownData", occupancyStatusTypeDropDownData));





        // dispatch(setFieldProperty("ownershipType", "ownerShipType", "value", "Owner Available"));
        // const numberOfOwnersData = [
        //   { name: "Single", code: "Single", value: "Single", label: "Single" },
        //   { name: "Multiple", code: "Multiple", value: "Multiple", label: "Multiple" },
        // ]
        // const premisesTypeData = [
        //   { name: "State Government", code: "State Government", value: "State Government", label: "State Government" },
        //   { name: "Central Government", code: "Central Government", value: "Central Government", label: "Central Government" },
        //   { name: "Kolkata Proper", code: "Kolkata Proper", value: "Kolkata Proper", label: "Kolkata Proper" },
        //   { name: "Bustee", code: "Bustee", value: "Bustee", label: "Bustee" },
        //   { name: "Multi Storied Building", code: "Multi Storied Building", value: "Multi Storied Building", label: "Multi Storied Building" },
        //   { name: "Kolkata Port Trust", code: "Kolkata Port Trust", value: "Kolkata Port Trust", label: "Kolkata Port Trust" },
        //   { name: "Colony", code: "Colony", value: "Colony", label: "Colony" },
        // ]
        // dispatch(setFieldProperty("ownershipType", "numberOfOwners", "dropDownData", numberOfOwnersData));
        // dispatch(setFieldProperty("ownershipType", "premisesType", "dropDownData", premisesTypeData));
    },
    action: "",
    redirectionRoute: "",
    saveUrl: "",
    isFormValid: false,
};

export default formConfig;
