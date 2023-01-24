import { getOwnerDetails } from "./utils/formConfigModifier";
import set from "lodash/set";
import get from "lodash/get";
import { updateInstituteType } from "./utils/formConfigModifier";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import { prepareFormData } from "egov-ui-kit/redux/common/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
const formConfig = {
  name: "ownershipType",
  fields: {


    ownerShipCategoryDropDown: {
      id: "ownerShipCategoryDropDown",
      jsonPath: "Properties[0].propertyDetails[0].ownerShipCategoryDropDown",
      required: true,
      type: "singleValueList",
      floatingLabelText: "Ownership Category",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      numcols: 6,

      gridDefination: {
        xs: 12,
        sm: 6
      },

      updateDependentFields: ({ formKey, field, dispatch, state }) => {

      },
    },
    ownerShipType: {
      id: "ownerShipType",
      jsonPath: "Properties[0].propertyDetails[0].ownerShipType",
      type: "radioButton",
      localePrefix: true,
      numcols: 5,
      floatingLabelText: "Ownership Type",
      hintText: "Select Ownership Type",
      required: false,
      fullWidth: true,
      showFloatingLabelText: true,
      gridDefination: {
        xs: 12,
        sm: 6
      },
      options: [
        { label: "Owner Available", value: 'Owner Available' },
        { label: "Owner Not Available", value: 'Owner Not Available' }
      ],
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const currentOwnershipTypeNew = get(state, "form.ownershipType.fields.ownerShipType.value", "");
        let formData = get(state, "form", {})
        let count = 0;
        for (let [key, value] of Object.entries(formData)) {
          if (key.indexOf("ownerInfo") !== -1) count = count + 1;
        }
        for (let i = 0; i < count; i++) {
          if (currentOwnershipTypeNew === "Owner Available") {
            //dispatch(setFieldProperty(`ownershipType`, "personLiableToPayTax", "visible", true));
            dispatch(setFieldProperty(`ownershipType`, "personLiableToPayTax", "disabled", false));
            dispatch(setFieldProperty(`ownershipType`, "personLiableToPayTax", "value", ""));
            dispatch(
              prepareFormData(
                "Properties[0].propertyDetails[0].personLiableToPayTax",
                get(state, "form.ownershipType.fields.personLiableToPayTax.value", "")
                )
            );
            dispatch(setFieldProperty(`ownerInfo_${i}`, "name", "required", true));
            dispatch(setFieldProperty(`ownerInfo_${i}`, "mobileNumber", "required", true));
            dispatch(setFieldProperty(`ownerInfo_${i}`, "fatherOrHusbandName", "required", true));
            dispatch(setFieldProperty(`ownerInfo_${i}`, "pincode", "required", true));
            dispatch(setFieldProperty(`ownerInfo_${i}`, "address", "required", true));
          } else {
            //dispatch(setFieldProperty(`ownershipType`, "personLiableToPayTax", "visible", false));     
            dispatch(setFieldProperty(`ownershipType`, "personLiableToPayTax", "disabled", true));
            dispatch(setFieldProperty(`ownershipType`, "personLiableToPayTax", "value", ""));
            dispatch(
              prepareFormData(
                "Properties[0].propertyDetails[0].personLiableToPayTax",
                ""
                )
            );
            dispatch(setFieldProperty(`ownerInfo_${i}`, "name", "required", false));
            dispatch(setFieldProperty(`ownerInfo_${i}`, "mobileNumber", "required", false));
            dispatch(setFieldProperty(`ownerInfo_${i}`, "fatherOrHusbandName", "required", false));
            dispatch(setFieldProperty(`ownerInfo_${i}`, "pincode", "required", false));
            dispatch(setFieldProperty(`ownerInfo_${i}`, "address", "required", false));
          }
        }
      },
    },
    personLiableToPayTax: {
      id: "personLiableToPayTax",
      jsonPath: "Properties[0].propertyDetails[0].personLiableToPayTax",
      type: "textfield",
      floatingLabelText: "Person Liable To PayTax",
      hintText: "Person Liable To PayTax",
      required: false,
      disabled: false,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorMessage: "PT_NAME_ERROR_MESSAGE",
    },

    typeOfOwnership: {
      id: "typeOfOwnership",
      jsonPath: "Properties[0].propertyDetails[0].subOwnershipCategory",
      type: "AutocompleteDropdown",
      floatingLabelText: "Ownership Category",
      localePrefix: "PROPERTYTAX_BILLING_SLAB",
      hidden: true,
      hideStyle: true,
      labelsFromLocalisation: false,
      value: "MULTIPLEOWNERS",
      hintText: "PT_FORM3_OWNERSHIP_TYPE_PLACEHOLDER",
      numcols: 0,
      required: true,
      gridDefination: {
        xs: 0,
        sm: 0
      },
      formName: "ownershipType",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;
        const institutedropDown = updateInstituteType(state, value);
        dispatch(
          prepareFormData(
            "Properties[0].propertyDetails[0].ownershipCategory",
            get(state, `common.generalMDMSDataById.SubOwnerShipCategory[${sourceField.value}].ownerShipCategory`, value)
          )
        );
        if (value.toUpperCase().indexOf("INSTITUTIONAL") !== -1) {
          dispatch(prepareFormData("Properties[0].propertyDetails[0].subOwnershipCategory", null));
        }
        dispatch(setFieldProperty("institutionDetails", "type", "dropDownData", institutedropDown));
      },
    },

  },
  beforeInitForm: (action, store) => {
    let state = store.getState();

    const { dispatch } = store;
    const ownerDetails = getOwnerDetails(state);
    set(action, "form.fields.ownerShipType.value", get(state, "form.ownershipType.fields.ownerShipType.value", "Owner Available"));
    
    if (ownerDetails && ownerDetails.length) {
      const currentOwnershipType = get(state, "form.ownershipType.fields.typeOfOwnership.value", ownerDetails[0].value);


      set(action, "form.fields.typeOfOwnership.dropDownData", ownerDetails);
    }
    return action;
  },
  afterInitForm: (action, store, dispatch) => {
    let state = store.getState();
    const { propertyRes } = state.screenConfiguration.preparedFinalObject

    const numberOfOwnersData = [
      { name: "Single", code: "Single", value: "Single", label: "Single" },
      { name: "Multiple", code: "Multiple", value: "Multiple", label: "Multiple" },
    ]
    const premisesTypeData = [
      { name: "State Government", code: "State Government", value: "State Government", label: "State Government" },
      { name: "Central Government", code: "Central Government", value: "Central Government", label: "Central Government" },
      { name: "Kolkata Proper", code: "Kolkata Proper", value: "Kolkata Proper", label: "Kolkata Proper" },
      { name: "Bustee", code: "Bustee", value: "Bustee", label: "Bustee" },
      { name: "Multi Storied Building", code: "Multi Storied Building", value: "Multi Storied Building", label: "Multi Storied Building" },
      { name: "Kolkata Port Trust", code: "Kolkata Port Trust", value: "Kolkata Port Trust", label: "Kolkata Port Trust" },
      { name: "Colony", code: "Colony", value: "Colony", label: "Colony" },
    ]

    const ownerShipTypeData = [
      { name: "State Govt Premises", code: "State Govt Premises", value: "State Govt Premises", label: "State Govt Premises" },
      { name: "Central Govt Premises", code: "Central Govt Premises", value: "Central Govt Premises", label: "Central Govt Premises" },
      { name: "Statutory Bodies", code: "Statutory Bodies", value: "Statutory Bodies", label: "Statutory Bodies" },
      { name: "Thika Premises", code: "Thika Premises", value: "Thika Premises", label: "Thika Premises" },
      { name: "Bustee Premises", code: "Bustee Premises", value: "Bustee Premises", label: "Bustee Premises" },
      { name: "Khasmahal Property", code: "Khasmahal Property", value: "Khasmahal Property", label: "Khasmahal Property" },
      { name: "Private Property", code: "Private Property", value: "Private Property", label: "Private Property" },
    ]

    dispatch(setFieldProperty("ownershipType", "ownerShipCategoryDropDown", "dropDownData", ownerShipTypeData));

  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: true,
};

export default formConfig;
