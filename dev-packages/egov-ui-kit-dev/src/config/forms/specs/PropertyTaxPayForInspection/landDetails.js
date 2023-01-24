// import { getOwnerDetails } from "./utils/formConfigModifier";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
// import set from "lodash/set";
import get from "lodash/get";
// import { updateInstituteType } from "./utils/formConfigModifier";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
// import { prepareFormData } from "egov-ui-kit/redux/common/actions";

const formConfig = {
  name: "landDetails",
  fields: {
    characterofPremises: {
      id: "characterofPremises",
      jsonPath: "Properties[0].buildingdetails.characterofPremises",
      type: "AutocompleteDropdown",
      floatingLabelText: "Character of Premises",
      localePrefix: true,
      labelsFromLocalisation: false,
      hintText: "Character of Premises",
      numcols: 6,

      gridDefination: {
        xs: 12,
        sm: 6,
      },
      formName: "landDetails",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].buildingdetails.characterofPremises", field.value));

        // const { value } = sourceField;
        // const institutedropDown = updateInstituteType(state, value);
        // dispatch(
        //   prepareFormData(
        //     "Properties[0].propertyDetails[0].ownershipCategory",
        //     get(state, `common.generalMDMSDataById.SubOwnerShipCategory[${sourceField.value}].ownerShipCategory`, value)
        //   )
        // );
        // if (value.toUpperCase().indexOf("INSTITUTIONAL") !== -1) {
        //   dispatch(prepareFormData("Properties[0].propertyDetails[0].subOwnershipCategory", null));
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
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].buildingdetails.acre", field.value));
      },
    },
    bigha: {
      id: "bigha",
      jsonPath: "Properties[0].buildingdetails.bigha",
      type: "textfield",
      floatingLabelText: "Bigha",
      hintText: "Bigha",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].buildingdetails.bigha", field.value));
      },
    },
    chatak: {
      id: "chatak",
      jsonPath: "Properties[0].buildingdetails.chatak",
      type: "textfield",
      floatingLabelText: "Chatak",
      hintText: "Chatak",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].buildingdetails.chatak", field.value));
      },
    },
    cotah: {
      id: "cotah",
      jsonPath: "Properties[0].buildingdetails.cotah",
      type: "textfield",
      floatingLabelText: "Cotah",
      hintText: "Cotah",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].buildingdetails.cotah", field.value));
      },
    },
    satak: {
      id: "satak",
      jsonPath: "Properties[0].buildingdetails.satak",
      type: "textfield",
      floatingLabelText: "Satak",
      hintText: "Satak",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].buildingdetails.satak", field.value));
      },
    },
    sqMt: {
      id: "sqMt",
      jsonPath: "Properties[0].buildingdetails.sqMt",
      type: "textfield",
      floatingLabelText: "Sq Mt",
      hintText: "Sq Mt",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].buildingdetails.sqMt", field.value));
      },
    },
    sqFt: {
      id: "sqFt",
      jsonPath: "Properties[0].buildingdetails.sqFt",
      type: "textfield",
      floatingLabelText: "Sq Ft",
      hintText: "Sq Ft",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorMessage: "PT_ADDRESS_ERROR_MESSAGE",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].buildingdetails.sqFt", field.value));
      },
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
    //   // dispatch(prepareFormData("Properties[0].propertyDetails[0].subOwnershipCategory", currentOwnershipType ? currentOwnershipType : ownerDetails[0].value));
    //   // dispatch(prepareFormData("Properties[0].propertyDetails[0].ownershipCategory",
    //   //     get(state, `common.generalMDMSDataById.OwnerShipCategory[${currentOwnershipType ? currentOwnershipType : ownerDetails[0].value}]`).ownerShipCategory)
    //   // );
    // }
    return action;
  },
  afterInitForm: (action, store, dispatch) => {
    let characterOfPremiseTypeDropDownData = [
      {
        name: "Vacant Land",
        code: "Vacant Land",
        label: "Vacant Land",
        value: "Vacant Land",
      },
      {
        name: "Water Body",
        code: "Water Body",
        label: "Water Body",
        value: "Water Body",
      },
      {
        name: "Khatal",
        code: "Khatal",
        label: "Khatal",
        value: "Khatal",
      },
      {
        name: "Land With Tank",
        code: "Land With Tank",
        label: "Land With Tank",
        value: "Land With Tank",
      },
      {
        name: "Constructed Building",
        code: "Constructed Building",
        label: "Constructed Building",
        value: "Constructed Building",
      },
      {
        name: "Under Construction",
        code: "Under Construction",
        label: "Under Construction",
        value: "Under Construction",
      },
    ];
    dispatch(setFieldProperty("landDetails", "characterofPremises", "dropDownData", characterOfPremiseTypeDropDownData));

    function getParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    const urlParams = getParameterByName("isInspection");

    if (urlParams == "yes") {
      let state = store.getState();
      let data = get(state.screenConfiguration.preparedFinalObject, "Properties[0]");

      if (data.buildingdetails && Object.keys(data.buildingdetails).length > 0) {
        let landDetails = data.buildingdetails;

        dispatch(
          setFieldProperty("landDetails", "characterofPremises", "value", landDetails.characterofPremises ? landDetails.characterofPremises : "")
        );
        dispatch(setFieldProperty("landDetails", "acre", "value", landDetails.acre ? landDetails.acre : ""));
        dispatch(setFieldProperty("landDetails", "bigha", "value", landDetails.bigha ? landDetails.bigha : ""));
        dispatch(setFieldProperty("landDetails", "chatak", "value", landDetails.chatak ? landDetails.chatak : ""));
        dispatch(setFieldProperty("landDetails", "cotah", "value", landDetails.cotah ? landDetails.cotah : ""));
        dispatch(setFieldProperty("landDetails", "satak", "value", landDetails.satak ? landDetails.satak : ""));
        dispatch(setFieldProperty("landDetails", "sqMt", "value", landDetails.sqMt ? landDetails.sqMt : ""));
        dispatch(setFieldProperty("landDetails", "sqFt", "value", landDetails.sqFt ? landDetails.sqFt : ""));

        dispatch(
          prepareFinalObject(
            "Properties[0].buildingdetails.characterofPremises",
            landDetails.characterofPremises ? landDetails.characterofPremises : ""
          )
        );
        dispatch(prepareFinalObject("Properties[0].buildingdetails.acre", landDetails.acre ? landDetails.acre : ""));
        dispatch(prepareFinalObject("Properties[0].buildingdetails.bigha", landDetails.bigha ? landDetails.bigha : ""));
        dispatch(prepareFinalObject("Properties[0].buildingdetails.chatak", landDetails.chatak ? landDetails.chatak : ""));
        dispatch(prepareFinalObject("Properties[0].buildingdetails.cotah", landDetails.cotah ? landDetails.cotah : ""));
        dispatch(prepareFinalObject("Properties[0].buildingdetails.satak", landDetails.satak ? landDetails.satak : ""));
        dispatch(prepareFinalObject("Properties[0].buildingdetails.sqMt", landDetails.sqMt ? landDetails.sqMt : ""));
        dispatch(prepareFinalObject("Properties[0].buildingdetails.sqFt", landDetails.sqFt ? landDetails.sqFt : ""));
      }
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
