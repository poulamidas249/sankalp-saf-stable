import { getOwnerDetails } from "./utils/formConfigModifier";
import set from "lodash/set";
import get from "lodash/get";
import { updateInstituteType } from "./utils/formConfigModifier";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import { prepareFormData } from "egov-ui-kit/redux/common/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
const formConfig = {
    name: "landDetails",
    fields: {

        characterofPremises: {
            id: "characterofPremises",
            jsonPath: "Properties[0].buildingdetails.characterofPremises",
            type: "singleValueList",
            floatingLabelText: "Character of Premises",
            hintText: "Character of Premises",
            numcols: 6,
            gridDefination: {
                xs: 12,
                sm: 6
            },
            style: {
                'width': '100%'
            },
            formName: "landDetails",
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
        acre: {
            id: "acre",
            jsonPath: "Properties[0].buildingdetails.acre",
            type: "textfield",
            floatingLabelText: "Acre",
            hintText: "Acre",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        bigha: {
            id: "bigha",
            jsonPath: "Properties[0].buildingdetails.bigha",
            type: "textfield",
            floatingLabelText: "Bigha",
            hintText: "Bigha",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        chatak: {
            id: "chatak",
            jsonPath: "Properties[0].buildingdetails.chatak",
            type: "textfield",
            floatingLabelText: "Chatak",
            hintText: "Chatak",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        cottah: {
            id: "cottah",
            jsonPath: "Properties[0].buildingdetails.cottah",
            type: "textfield",
            floatingLabelText: "Cotah",
            hintText: "Cotah",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        satak: {
            id: "satak",
            jsonPath: "Properties[0].buildingdetails.satak",
            type: "textfield",
            floatingLabelText: "Satak",
            hintText: "Satak",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        sqMt: {
            id: "sqMt",
            jsonPath: "Properties[0].buildingdetails.sqMt",
            type: "textfield",
            floatingLabelText: "Sq Mt",
            hintText: "Sq Mt",
            errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
            errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
        },
        sqFt: {
            id: "sqFt",
            jsonPath: "Properties[0].buildingdetails.sqFt",
            type: "textfield",
            floatingLabelText: "Sq Ft",
            hintText: "Sq Ft",
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
        //     console.log('propertyRes12341234', propertyRes)
        //     dispatch(setFieldProperty("landDetails", "characterofPremises", "value", property.buildingdetails.characterofPremises));
        //     dispatch(setFieldProperty("landDetails", "acre", "value", property.buildingDetails.acre));
        //     dispatch(setFieldProperty("landDetails", "bigha", "value", property.buildingDetails.bigha));
        //     dispatch(setFieldProperty("landDetails", "cottah", "value", property.buildingDetails.cottah));
        //     dispatch(setFieldProperty("landDetails", "chatak", "value", property.buildingDetails.chatak));
        //     dispatch(setFieldProperty("landDetails", "satak", "value", property.buildingDetails.satak));
        //     dispatch(setFieldProperty("landDetails", "sqMt", "value", property.buildingDetails.sqMt));
        //     dispatch(setFieldProperty("landDetails", "sqFt", "value", property.buildingDetails.sqFt));


        // }

 
        let characterOfPremiseTypeDropDownData = [
            {
                name: 'Vacant Land',
                code: 'Vacant Land',
                label: 'Vacant Land',
                value: 'Vacant Land'
            },
            {
                name: 'Water Body',
                code: 'Water Body',
                label: 'Water Body',
                value: 'Water Body'
            },
            {
                name: 'Khatal',
                code: 'Khatal',
                label: 'Khatal',
                value: 'Khatal'
            },
            {
                name: 'Land With Tank',
                code: 'Land With Tank',
                label: 'Land With Tank',
                value: 'Land With Tank'
            },
            {
                name: 'Constructed Building',
                code: 'Constructed Building',
                label: 'Constructed Building',
                value: 'Constructed Building'
            },
            {
                name: 'Under Construction',
                code: 'Under Construction',
                label: 'Under Construction',
                value: 'Under Construction'
            },

        ]
        dispatch(setFieldProperty("landDetails", "characterofPremises", "dropDownData", characterOfPremiseTypeDropDownData));



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
