import { getOwnerDetails } from "./utils/formConfigModifier";
import set from "lodash/set";
import get from "lodash/get";
import { updateInstituteType } from "./utils/formConfigModifier";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import { prepareFormData } from "egov-ui-kit/redux/common/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
const formConfig = {
    name: "roomPropertyDetails",
    fields: {
       
        bedRoom: {
            id: "bedRoom",
            jsonPath: "Properties[0].roomPropertyDetails.bedRoom",
            type : "number",
            floatingLabelText: "Bedroom",
            hintText: "Bedroom",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        covered: {
            id: "covered",
            jsonPath: "Properties[0].roomPropertyDetails.covered",
            type : "number",
            floatingLabelText: "Covered",
            hintText: "Covered",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        classRoom: {
            id: "classRoom",
            jsonPath: "Properties[0].roomPropertyDetails.classRoom",
            type : "number",
            floatingLabelText: "ClassRoom",
            hintText: "ClassRoom",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        garrage: {
            id: "garrage",
            jsonPath: "Properties[0].roomPropertyDetails.garrage",
            type : "number",
            floatingLabelText: "Garrage",
            hintText: "Garrage",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        shed: {
            id: "shed",
            jsonPath: "Properties[0].roomPropertyDetails.shed",
            type : "number",
            floatingLabelText: "Shed",
            hintText: "Shed",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        wallShop: {
            id: "wallShop",
            jsonPath: "Properties[0].roomPropertyDetails.wallShop",
            type : "number",
            floatingLabelText: "WallShop",
            hintText: "WallShop",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        hall: {
            id: "hall",
            jsonPath: "Properties[0].roomPropertyDetails.hall",
            type : "number",
            floatingLabelText: "Hall",
            hintText: "Hall",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        thakurGhar: {
            id: "thakurGhar",
            jsonPath: "Properties[0].roomPropertyDetails.thakurGhar",
            type : "number",
            floatingLabelText: "Thakur Ghar",
            hintText: "Thakur Ghar",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        verandah: {
            id: "verandah",
            jsonPath: "Properties[0].roomPropertyDetails.verandah",
            type : "number",
            floatingLabelText: "Verandah",
            hintText: "Verandah",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        stairCase: {
            id: "stairCase",
            jsonPath: "Properties[0].roomPropertyDetails.stairCase",
            type : "number",
            floatingLabelText: "Stair Case",
            hintText: "Stair Case",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        terrace: {
            id: "terrace",
            jsonPath: "Properties[0].roomPropertyDetails.terrace",
            type : "number",
            floatingLabelText: "Terrace",
            hintText: "Terrace",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        swimingPool: {
            id: "swimingPool",
            jsonPath: "Properties[0].roomPropertyDetails.swimingPool",
            type : "number",
            floatingLabelText: "Swiming Pool",
            hintText: "Swiming Pool",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        livingDining: {
            id: "livingDining",
            jsonPath: "Properties[0].roomPropertyDetails.livingDining",
            type : "number",
            floatingLabelText: "Living Dining",
            hintText: "Living Dining",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        bathRoom: {
            id: "bathRoom",
            jsonPath: "Properties[0].roomPropertyDetails.bathRoom",
            type : "number",
            floatingLabelText: "Bath Room",
            hintText: "Bath Room",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        mezzanine: {
            id: "mezzanine",
            jsonPath: "Properties[0].roomPropertyDetails.mezzanine",
            type : "number",
            floatingLabelText: "Mezzanine",
            hintText: "Mezzanine",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        office: {
            id: "office",
            jsonPath: "Properties[0].roomPropertyDetails.office",
            type : "number",
            floatingLabelText: "Office",
            hintText: "Office",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        shop: {
            id: "shop",
            jsonPath: "Properties[0].roomPropertyDetails.shop",
            type : "number",
            floatingLabelText: "Shop",
            hintText: "Shop",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        conference: {
            id: "conference",
            jsonPath: "Properties[0].roomPropertyDetails.conference",
            type : "number",
            floatingLabelText: "Conference",
            hintText: "Conference",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        healthClub: {
            id: "healthClub",
            jsonPath: "Properties[0].roomPropertyDetails.healthClub",
            type : "number",
            floatingLabelText: "Health Club",
            hintText: "Health Club",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        kitchen: {
            id: "kitchen",
            jsonPath: "Properties[0].roomPropertyDetails.kitchen",
            type : "number",
            floatingLabelText: "Kitchen",
            hintText: "Kitchen",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        study: {
            id: "study",
            jsonPath: "Properties[0].roomPropertyDetails.study",
            type : "number",
            floatingLabelText: "Study",
            hintText: "Study",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        store: {
            id: "store",
            jsonPath: "Properties[0].roomPropertyDetails.store",
            type : "number",
            floatingLabelText: "Store",
            hintText: "Store",
            numcols: 4,
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        }


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
    isFormValid: true,
};

export default formConfig;
