import { mohalla } from "egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/reusableFields";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { fetchGeneralMDMSData, prepareFormData } from "egov-ui-kit/redux/common/actions";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import { fetchDropdownData, generalMDMSDataRequestObj, getGeneralMDMSDataDropdownName, getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import filter from "lodash/filter";
import get from "lodash/get";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import sortBy from "lodash/sortBy";

const formConfig = {
  name: "propertyDetails",
  fields: {


    natureOfProperty: {
      id: "natureOfProperty",
      jsonPath: "Properties[0].propertyDetailsNew.natureOfProperty",
      type: "singleValueList",
      floatingLabelText: "Nature of Property",
      hintText: "Nature of Property",
      fullWidth: true,
      required: true,
      numcols: 6,

      dropDownData: [{
        name: 'Residential-self',
        code: 'Residential-self',
        label: 'Residential-self',
        value: 'Residential-self'
      }
        , {
        name: 'Residential-Tenanted',
        code: 'Residential-Tenanted',
        label: 'Residential-Tenanted',
        value: 'Residential-Tenanted'
      }
        , {
        name: 'Non Residential-self',
        code: 'Non Residential-self',
        label: 'Non Residential-self',
        value: 'Non Residential-self'
      }
        , {
        name: 'Non Residential-Tenanted',
        code: 'Non Residential-Tenanted',
        label: 'Non Residential-Tenanted',
        value: 'Non Residential-Tenanted'
      }
      ],
      gridDefination: {
        xs: 12,
        sm: 6
      },

      formName: "propertyDetails",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
      },
    },

    typeOfUse: {
      id: "typeOfUse",
      jsonPath: "Properties[0].propertyDetailsNew.typeOfUse",
      required: false,
      type: "textfield",
      floatingLabelText: "Type Of Use",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6
      }
    },
    buildingName: {
      id: "buildingName",
      jsonPath: "Properties[0].propertyDetailsNew.buildingName",
      required: false,
      type: "textfield",
      floatingLabelText: "Block/Building No./Name",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6
      }
    },
    floorNo: {
      id: "floorNo",
      jsonPath: "Properties[0].propertyDetailsNew.floorNo",
      required: false,
      type: "textfield",
      floatingLabelText: "Floor Number",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6
      }
    },
    flatNo: {
      id: "flatNo",
      jsonPath: "Properties[0].propertyDetailsNew.flatNo",
      required: false,
      type: "textfield",
      floatingLabelText: "Flat Number",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6
      }
    },
    natureOfUse: {
      id: "natureOfUse",
      jsonPath: "Properties[0].propertyDetailsNew.natureOfUse",
      type: "singleValueList",
      floatingLabelText: "Nature of Use",
      hintText: "Nature of Use",
      fullWidth: true,
      required: true,
      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6
      },

      dropDownData: [{
        name: 'Residential',
        code: 'Residential',
        label: 'Residential',
        value: 'Residential'
      }
      , {
        name: 'PART RESI PART NON RESI',
        code: 'PART RESI PART NON RESI',
        label: 'PART RESI PART NON RESI',
        value: 'PART RESI PART NON RESI'
      }
      , {
        name: 'FULL NON RESI',
        code: 'FULL NON RESI',
        label: 'FULL NON RESI',
        value: 'FULL NON RESI'
      }
    ],
    
      formName: "propertyDetails",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
      },
    },
    occupierStatus: {
      id: "occupierStatus",
      jsonPath: "Properties[0].propertyDetailsNew.occupierStatus",
      type: "singleValueList",
      floatingLabelText: "Occupier Status",
      hintText: "Occupier Status",
      fullWidth: true,
      required: true,
      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6
      },
      dropDownData: [{
        name: 'Residential-self',
        code: 'Residential-self',
        label: 'Residential-self',
        value: 'Residential-self'
      }
        , {
        name: 'Residential-Tenanted',
        code: 'Residential-Tenanted',
        label: 'Residential-Tenanted',
        value: 'Residential-Tenanted'
      }
        , {
        name: 'Non Residential-self',
        code: 'Non Residential-self',
        label: 'Non Residential-self',
        value: 'Non Residential-self'
      }
        , {
        name: 'Non Residential-Tenanted',
        code: 'Non Residential-Tenanted',
        label: 'Non Residential-Tenanted',
        value: 'Non Residential-Tenanted'
      }
      ],
      formName: "propertyDetails",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
      },
    },
    occupierName: {
      id: "occupierName",
      jsonPath: "Properties[0].propertyDetailsNew.occupierName",
      required: false,
      type: "textfield",
      floatingLabelText: "Occupier Name",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6
      }
    },
    pRent: {
      id: "pRent",
      jsonPath: "Properties[0].propertyDetailsNew.pRent",
      required: false,
      type: "textfield",
      floatingLabelText: "Rent",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6
      }
    },
    avpropertyDetailsNew: {
      id: "avpropertyDetailsNew",
      jsonPath: "Properties[0].propertyDetailsNew.avpropertyDetailsNew",
      required: false,
      type: "textfield",
      floatingLabelText: "AV",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6
      }
    },


  },
  afterInitForm: (action, store, dispatch) => {
    try {
      let state = store.getState();
      const { propertyRes } = state.screenConfiguration.preparedFinalObject
      const { localizationLabels } = state.app;
      const { cities, citiesByModule } = state.common;
      const PT = citiesByModule && citiesByModule.PT;

      // dispatch(setFieldProperty("propertyDetailsNew", "premisesTypeDropDown", "dropDownData", premisesTypeStaticData));
      // const wardDropDownData = get(state, 'form.propertyDetailsNew.fields.ward.dropDownData', []);

      return action;
    } catch (e) {
      console.log(e);
      return action;
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: true,
};

export default formConfig;
