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
  name: "propertyAreaDetails",
  fields: {

    coveredSpace: {
      id: "coveredSpace",
      type: "number",
      className: "pt-old-pid-text-field",
      jsonPath: "Properties[0].propertyAreaDetails.coveredSpace",
      floatingLabelText: "Area",
      hintText: "Area",
      numcols: 4,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      toolTipMessage: "PT_OLDPID_TOOLTIP_MESSAGE",
      maxLength: 64,
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;
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
        if (value && value !== "") {
          dispatch(setFieldProperty("propertyAreaDetails", "coveredSpaceUnit", "required", true));
          dispatch(setFieldProperty("propertyAreaDetails", "coveredSpaceSize", "required", true));
          dispatch(setFieldProperty("propertyAreaDetails", "coveredSpaceUnit", "disabled", false));
          dispatch(setFieldProperty("propertyAreaDetails", "coveredSpaceSize", "disabled", false));

        } else {
          dispatch(setFieldProperty("propertyAreaDetails", "coveredSpaceUnit", "required", false));
          dispatch(setFieldProperty("propertyAreaDetails", "coveredSpaceSize", "required", false));
          dispatch(setFieldProperty("propertyAreaDetails", "coveredSpaceUnit", "disabled", true));
          dispatch(setFieldProperty("propertyAreaDetails", "coveredSpaceSize", "disabled", true));
        }

      },
    },
    coveredSpaceUnit: {
      id: "coveredSpaceUnit",
      jsonPath: "Properties[0].propertyAreaDetails.coveredSpaceUnit",
      type: "singleValueList",
      floatingLabelText: "Unit", disabled: true,
      fullWidth: true,
      required: false,
      numcols: 3,
      gridDefination: {
        xs: 12,
        sm: 3
      },
      dropDownData: [{
        name: 'sqMt',
        code: 'sqMt',
        label: 'sqMt',
        value: 'sqMt'
      }, {
        name: 'sqFt',
        code: 'sqFt',
        label: 'sqFt',
        value: 'sqFt'
      }],
      formName: "propertyAreaDetails",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;

        if (value && value !== "") {
          const coveredSpaceValue = get(state, "form.propertyAreaDetails.fields.coveredSpace.value", "");
          const coveredSpaceSizeValue = get(state, "form.propertyAreaDetails.fields.coveredSpaceSize.value", "");

          let newValue = coveredSpaceValue + '-' + value + '-' + coveredSpaceSizeValue

          dispatch(prepareFormData("Properties[0].propertyDetailsNew.coveredSpace", newValue));

        }
      }
    },
    coveredSpaceSize: {
      id: "coveredSpaceSize",
      jsonPath: "Properties[0].propertyAreaDetails.coveredSpaceSize",
      type: "singleValueList",
      floatingLabelText: "Size", disabled: true,
      fullWidth: true,
      required: false,
      numcols: 4,
      numcols: 3,
      gridDefination: {
        xs: 12,
        sm: 3
      },
      dropDownData: [{
        name: 'small',
        code: 'small',
        label: 'small',
        value: 'small'
      }, {
        name: 'medium',
        code: 'medium',
        label: 'medium',
        value: 'medium'
      }, {
        name: 'large',
        code: 'large',
        label: 'large',
        value: 'large'
      }
      ],
      formName: "propertyAreaDetails",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;

        if (value && value !== "") {
          const coveredSpaceValue = get(state, "form.propertyAreaDetails.fields.coveredSpace.value", "");
          const coveredSpaceUnitValue = get(state, "form.propertyAreaDetails.fields.coveredSpaceUnit.value", "");

          let newValue = coveredSpaceValue + '-' + coveredSpaceUnitValue + '-' + value

          dispatch(prepareFormData("Properties[0].propertyDetailsNew.coveredSpace", newValue));

        }
      }
    },

    openCarParking: {
      id: "openCarParking",
      type: "number",
      className: "pt-old-pid-text-field",
      jsonPath: "Properties[0].propertyAreaDetails.openCarParking",
      floatingLabelText: "Area",
      hintText: "Area",
      numcols: 4,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      toolTipMessage: "PT_OLDPID_TOOLTIP_MESSAGE",
      maxLength: 64,
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;
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
        if (value && value !== "") {
          dispatch(setFieldProperty("propertyAreaDetails", "openCarParkingUnit", "required", true));
          dispatch(setFieldProperty("propertyAreaDetails", "openCarParkingSize", "required", true));

          dispatch(setFieldProperty("propertyAreaDetails", "openCarParkingUnit", "disabled", false));
          dispatch(setFieldProperty("propertyAreaDetails", "openCarParkingSize", "disabled", false));

        } else {
          dispatch(setFieldProperty("propertyAreaDetails", "openCarParkingUnit", "required", false));
          dispatch(setFieldProperty("propertyAreaDetails", "openCarParkingSize", "required", false));

          dispatch(setFieldProperty("propertyAreaDetails", "openCarParkingUnit", "disabled", true));
          dispatch(setFieldProperty("propertyAreaDetails", "openCarParkingSize", "disabled", true));

        }

      },
    },
    openCarParkingUnit: {
      id: "openCarParkingUnit",
      jsonPath: "Properties[0].propertyAreaDetails.openCarParkingUnit",
      type: "singleValueList",
      floatingLabelText: "Unit", disabled: true,
      fullWidth: true,
      required: false,
      numcols: 3,
      gridDefination: {
        xs: 12,
        sm: 3
      },
      dropDownData: [{
        name: 'sqMt',
        code: 'sqMt',
        label: 'sqMt',
        value: 'sqMt'
      }, {
        name: 'sqFt',
        code: 'sqFt',
        label: 'sqFt',
        value: 'sqFt'
      }],
      formName: "propertyAreaDetails",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;

        if (value && value !== "") {
          const openCarParkingValue = get(state, "form.propertyAreaDetails.fields.openCarParking.value", "");
          const openCarParkingSizeValue = get(state, "form.propertyAreaDetails.fields.openCarParkingSize.value", "");

          let newValue = openCarParkingValue + '-' + value + '-' + openCarParkingSizeValue

          dispatch(prepareFormData("Properties[0].propertyDetailsNew.openCarParking", newValue));

        }
      }
    },
    openCarParkingSize: {
      id: "openCarParkingSize",
      jsonPath: "Properties[0].propertyAreaDetails.openCarParkingSize",
      type: "singleValueList",
      floatingLabelText: "Size", disabled: true,
      fullWidth: true,
      required: false,
      numcols: 4,
      numcols: 3,
      gridDefination: {
        xs: 12,
        sm: 3
      },
      dropDownData: [{
        name: 'small',
        code: 'small',
        label: 'small',
        value: 'small'
      }, {
        name: 'medium',
        code: 'medium',
        label: 'medium',
        value: 'medium'
      }, {
        name: 'large',
        code: 'large',
        label: 'large',
        value: 'large'
      }
      ],
      formName: "propertyAreaDetails",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;

        if (value && value !== "") {
          const openCarParkingValue = get(state, "form.propertyAreaDetails.fields.openCarParking.value", "");
          const openCarParkingUnitValue = get(state, "form.propertyAreaDetails.fields.openCarParkingUnit.value", "");

          let newValue = openCarParkingValue + '-' + openCarParkingUnitValue + '-' + value

          dispatch(prepareFormData("Properties[0].propertyDetailsNew.openCarParking", newValue));

        }
      }
    },

    coveredCarParking: {
      id: "coveredCarParking",
      type: "number",
      className: "pt-old-pid-text-field",
      jsonPath: "Properties[0].propertyAreaDetails.coveredCarParking",
      floatingLabelText: "Area",
      hintText: "Area",
      numcols: 4,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      toolTipMessage: "PT_OLDPID_TOOLTIP_MESSAGE",
      maxLength: 64,
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;
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
        if (value && value !== "") {
          dispatch(setFieldProperty("propertyAreaDetails", "coveredCarParkingUnit", "required", true));
          dispatch(setFieldProperty("propertyAreaDetails", "coveredCarParkingSize", "required", true));

          dispatch(setFieldProperty("propertyAreaDetails", "coveredCarParkingUnit", "disabled", false));
          dispatch(setFieldProperty("propertyAreaDetails", "coveredCarParkingSize", "disabled", false));
        } else {
          dispatch(setFieldProperty("propertyAreaDetails", "coveredCarParkingUnit", "required", false));
          dispatch(setFieldProperty("propertyAreaDetails", "coveredCarParkingSize", "required", false));

          dispatch(setFieldProperty("propertyAreaDetails", "coveredCarParkingUnit", "disabled", true));
          dispatch(setFieldProperty("propertyAreaDetails", "coveredCarParkingSize", "disabled", true));

        }

      },
    },
    coveredCarParkingUnit: {
      id: "coveredCarParkingUnit",
      jsonPath: "Properties[0].propertyAreaDetails.coveredCarParkingUnit",
      type: "singleValueList",
      floatingLabelText: "Unit", disabled: true,
      fullWidth: true,
      required: false,
      numcols: 3,
      gridDefination: {
        xs: 12,
        sm: 3
      },
      dropDownData: [{
        name: 'sqMt',
        code: 'sqMt',
        label: 'sqMt',
        value: 'sqMt'
      }, {
        name: 'sqFt',
        code: 'sqFt',
        label: 'sqFt',
        value: 'sqFt'
      }],
      formName: "propertyAreaDetails",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;

        if (value && value !== "") {
          const coveredCarParkingValue = get(state, "form.propertyAreaDetails.fields.coveredCarParking.value", "");
          const coveredCarParkingSizeValue = get(state, "form.propertyAreaDetails.fields.coveredCarParkingSize.value", "");

          let newValue = coveredCarParkingValue + '-' + value + '-' + coveredCarParkingSizeValue

          dispatch(prepareFormData("Properties[0].propertyDetailsNew.coveredCarParking", newValue));

        }
      }
    },
    coveredCarParkingSize: {
      id: "coveredCarParkingSize",
      jsonPath: "Properties[0].propertyAreaDetails.coveredCarParkingSize",
      type: "singleValueList",
      floatingLabelText: "Size", disabled: true,
      fullWidth: true,
      required: false,
      numcols: 4,
      numcols: 3,
      gridDefination: {
        xs: 12,
        sm: 3
      },
      dropDownData: [{
        name: 'small',
        code: 'small',
        label: 'small',
        value: 'small'
      }, {
        name: 'medium',
        code: 'medium',
        label: 'medium',
        value: 'medium'
      }, {
        name: 'large',
        code: 'large',
        label: 'large',
        value: 'large'
      }
      ],
      formName: "propertyAreaDetails",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;

        if (value && value !== "") {
          const coveredCarParkingValue = get(state, "form.propertyAreaDetails.fields.coveredCarParking.value", "");
          const coveredCarParkingUnitValue = get(state, "form.propertyAreaDetails.fields.coveredCarParkingUnit.value", "");

          let newValue = coveredCarParkingValue + '-' + coveredCarParkingUnitValue + '-' + value

          dispatch(prepareFormData("Properties[0].propertyDetailsNew.coveredCarParking", newValue));

        }
      }
    },

    openTerrace: {
      id: "openTerrace",
      type: "number",
      className: "pt-old-pid-text-field",
      jsonPath: "Properties[0].propertyAreaDetails.openTerrace",
      floatingLabelText: "Area",
      hintText: "Area",
      numcols: 4,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      toolTipMessage: "PT_OLDPID_TOOLTIP_MESSAGE",
      maxLength: 64,
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;
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
        if (value && value !== "") {
          dispatch(setFieldProperty("propertyAreaDetails", "openTerraceUnit", "required", true));
          dispatch(setFieldProperty("propertyAreaDetails", "openTerraceSize", "required", true));

          dispatch(setFieldProperty("propertyAreaDetails", "openTerraceUnit", "disabled", false));
          dispatch(setFieldProperty("propertyAreaDetails", "openTerraceSize", "disabled", false));
        } else {
          dispatch(setFieldProperty("propertyAreaDetails", "openTerraceUnit", "required", false));
          dispatch(setFieldProperty("propertyAreaDetails", "openTerraceSize", "required", false));

          dispatch(setFieldProperty("propertyAreaDetails", "openTerraceUnit", "disabled", true));
          dispatch(setFieldProperty("propertyAreaDetails", "openTerraceSize", "disabled", true));
        }

      },
    },
    openTerraceUnit: {
      id: "openTerraceUnit",
      jsonPath: "Properties[0].propertyAreaDetails.openTerraceUnit",
      type: "singleValueList",
      floatingLabelText: "Unit", disabled: true,
      fullWidth: true,
      required: false,
      numcols: 3,
      gridDefination: {
        xs: 12,
        sm: 3
      },
      dropDownData: [{
        name: 'sqMt',
        code: 'sqMt',
        label: 'sqMt',
        value: 'sqMt'
      }, {
        name: 'sqFt',
        code: 'sqFt',
        label: 'sqFt',
        value: 'sqFt'
      }],
      formName: "propertyAreaDetails",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;

        if (value && value !== "") {
          const openTerraceValue = get(state, "form.propertyAreaDetails.fields.openTerrace.value", "");
          const openTerraceSizeValue = get(state, "form.propertyAreaDetails.fields.openTerraceSize.value", "");

          let newValue = openTerraceValue + '-' + value + '-' + openTerraceSizeValue

          dispatch(prepareFormData("Properties[0].propertyDetailsNew.openTerrace", newValue));

        }
      }
    },
    openTerraceSize: {
      id: "openTerraceSize",
      jsonPath: "Properties[0].propertyAreaDetails.openTerraceSize",
      type: "singleValueList",
      floatingLabelText: "Size", disabled: true,
      fullWidth: true,
      required: false,
      numcols: 4,
      numcols: 3,
      gridDefination: {
        xs: 12,
        sm: 3
      },
      dropDownData: [{
        name: 'small',
        code: 'small',
        label: 'small',
        value: 'small'
      }, {
        name: 'medium',
        code: 'medium',
        label: 'medium',
        value: 'medium'
      }, {
        name: 'large',
        code: 'large',
        label: 'large',
        value: 'large'
      }
      ],
      formName: "propertyAreaDetails",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;

        if (value && value !== "") {
          const openTerraceValue = get(state, "form.propertyAreaDetails.fields.openTerrace.value", "");
          const openTerraceUnitValue = get(state, "form.propertyAreaDetails.fields.openTerraceUnit.value", "");

          let newValue = openTerraceValue + '-' + openTerraceUnitValue + '-' + value

          dispatch(prepareFormData("Properties[0].propertyDetailsNew.openTerrace", newValue));

        }
      }
    },




    commonSpace: {
      id: "commonSpace",
      type: "number",
      className: "pt-old-pid-text-field",
      jsonPath: "Properties[0].propertyAreaDetails.commonSpace",
      floatingLabelText: "Area",
      hintText: "Area",
      numcols: 4,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      toolTipMessage: "PT_OLDPID_TOOLTIP_MESSAGE",
      maxLength: 64,
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;
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
        if (value && value !== "") {
          dispatch(setFieldProperty("propertyAreaDetails", "commonSpaceUnit", "required", true));
          dispatch(setFieldProperty("propertyAreaDetails", "commonSpaceSize", "required", true));

          dispatch(setFieldProperty("propertyAreaDetails", "commonSpaceUnit", "disabled", false));
          dispatch(setFieldProperty("propertyAreaDetails", "commonSpaceSize", "disabled", false));
        } else {
          dispatch(setFieldProperty("propertyAreaDetails", "commonSpaceUnit", "required", false));
          dispatch(setFieldProperty("propertyAreaDetails", "commonSpaceSize", "required", false));

          dispatch(setFieldProperty("propertyAreaDetails", "commonSpaceUnit", "disabled", true));
          dispatch(setFieldProperty("propertyAreaDetails", "commonSpaceSize", "disabled", true));
        }

      },
    },
    commonSpaceUnit: {
      id: "commonSpaceUnit",
      jsonPath: "Properties[0].propertyAreaDetails.commonSpaceUnit",
      type: "singleValueList",
      floatingLabelText: "Unit", disabled: true,
      fullWidth: true,
      required: false,
      numcols: 3,
      gridDefination: {
        xs: 12,
        sm: 3
      },
      dropDownData: [{
        name: 'sqMt',
        code: 'sqMt',
        label: 'sqMt',
        value: 'sqMt'
      }, {
        name: 'sqFt',
        code: 'sqFt',
        label: 'sqFt',
        value: 'sqFt'
      }],
      formName: "propertyAreaDetails",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;

        if (value && value !== "") {
          const commonSpaceValue = get(state, "form.propertyAreaDetails.fields.commonSpace.value", "");
          const commonSpaceSizeValue = get(state, "form.propertyAreaDetails.fields.commonSpaceSize.value", "");

          let newValue = commonSpaceValue + '-' + value + '-' + commonSpaceSizeValue

          dispatch(prepareFormData("Properties[0].propertyDetailsNew.commonSpace", newValue));

        }
      }
    },
    commonSpaceSize: {
      id: "commonSpaceSize",
      jsonPath: "Properties[0].propertyAreaDetails.commonSpaceSize",
      type: "singleValueList",
      floatingLabelText: "Size", disabled: true,
      fullWidth: true,
      required: false,
      numcols: 4,
      numcols: 3,
      gridDefination: {
        xs: 12,
        sm: 3
      },
      dropDownData: [{
        name: 'small',
        code: 'small',
        label: 'small',
        value: 'small'
      }, {
        name: 'medium',
        code: 'medium',
        label: 'medium',
        value: 'medium'
      }, {
        name: 'large',
        code: 'large',
        label: 'large',
        value: 'large'
      }
      ],
      formName: "propertyAreaDetails",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;

        if (value && value !== "") {
          const commonSpaceValue = get(state, "form.propertyAreaDetails.fields.commonSpace.value", "");
          const commonSpaceUnitValue = get(state, "form.propertyAreaDetails.fields.commonSpaceUnit.value", "");

          let newValue = commonSpaceValue + '-' + commonSpaceUnitValue + '-' + value

          dispatch(prepareFormData("Properties[0].propertyDetailsNew.commonSpace", newValue));

        }
      }
    },



    roof: {
      id: "roof",
      type: "number",
      className: "pt-old-pid-text-field",
      jsonPath: "Properties[0].propertyAreaDetails.roof",
      floatingLabelText: "Area",
      hintText: "Area",
      numcols: 4,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      toolTipMessage: "PT_OLDPID_TOOLTIP_MESSAGE",
      maxLength: 64,
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;
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
        if (value && value !== "") {
          dispatch(setFieldProperty("propertyAreaDetails", "roofUnit", "required", true));
          dispatch(setFieldProperty("propertyAreaDetails", "roofSize", "required", true));

          dispatch(setFieldProperty("propertyAreaDetails", "roofUnit", "disabled", false));
          dispatch(setFieldProperty("propertyAreaDetails", "roofSize", "disabled", false));
        } else {
          dispatch(setFieldProperty("propertyAreaDetails", "roofUnit", "required", false));
          dispatch(setFieldProperty("propertyAreaDetails", "roofSize", "required", false));

          dispatch(setFieldProperty("propertyAreaDetails", "roofUnit", "disabled", true));
          dispatch(setFieldProperty("propertyAreaDetails", "roofSize", "disabled", true));
        }

      },
    },
    roofUnit: {
      id: "roofUnit",
      jsonPath: "Properties[0].propertyAreaDetails.roofUnit",
      type: "singleValueList",
      floatingLabelText: "Unit", disabled: true,
      fullWidth: true,
      required: false,
      numcols: 3,
      gridDefination: {
        xs: 12,
        sm: 3
      },
      dropDownData: [{
        name: 'sqMt',
        code: 'sqMt',
        label: 'sqMt',
        value: 'sqMt'
      }, {
        name: 'sqFt',
        code: 'sqFt',
        label: 'sqFt',
        value: 'sqFt'
      }],
      formName: "propertyAreaDetails",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;

        if (value && value !== "") {
          const roofValue = get(state, "form.propertyAreaDetails.fields.roof.value", "");
          const roofSizeValue = get(state, "form.propertyAreaDetails.fields.roofSize.value", "");

          let newValue = roofValue + '-' + value + '-' + roofSizeValue

          dispatch(prepareFormData("Properties[0].propertyDetailsNew.roof", newValue));

        }
      }
    },
    roofSize: {
      id: "roofSize",
      jsonPath: "Properties[0].propertyAreaDetails.roofSize",
      type: "singleValueList",
      floatingLabelText: "Size", disabled: true,
      fullWidth: true,
      required: false,
      numcols: 4,
      numcols: 3,
      gridDefination: {
        xs: 12,
        sm: 3
      },
      dropDownData: [{
        name: 'small',
        code: 'small',
        label: 'small',
        value: 'small'
      }, {
        name: 'medium',
        code: 'medium',
        label: 'medium',
        value: 'medium'
      }, {
        name: 'large',
        code: 'large',
        label: 'large',
        value: 'large'
      }
      ],
      formName: "propertyAreaDetails",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;

        if (value && value !== "") {
          const roofValue = get(state, "form.propertyAreaDetails.fields.roof.value", "");
          const roofUnitValue = get(state, "form.propertyAreaDetails.fields.roofUnit.value", "");

          let newValue = roofValue + '-' + roofUnitValue + '-' + value

          dispatch(prepareFormData("Properties[0].propertyDetailsNew.roof", newValue));

        }
      }
    },


    swimingpool: {
      id: "swimingpool",
      type: "number",
      className: "pt-old-pid-text-field",
      jsonPath: "Properties[0].propertyAreaDetails.swimingpool",
      floatingLabelText: "Area",
      hintText: "Area",
      numcols: 4,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      toolTipMessage: "PT_OLDPID_TOOLTIP_MESSAGE",
      maxLength: 64,
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;
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
        if (value && value !== "") {
          dispatch(setFieldProperty("propertyAreaDetails", "swimingpoolUnit", "required", true));
          dispatch(setFieldProperty("propertyAreaDetails", "swimingpoolSize", "required", true));

          dispatch(setFieldProperty("propertyAreaDetails", "swimingpoolUnit", "disabled", false));
          dispatch(setFieldProperty("propertyAreaDetails", "swimingpoolSize", "disabled", false));
        } else {
          dispatch(setFieldProperty("propertyAreaDetails", "swimingpoolUnit", "required", false));
          dispatch(setFieldProperty("propertyAreaDetails", "swimingpoolSize", "required", false));

          dispatch(setFieldProperty("propertyAreaDetails", "swimingpoolUnit", "disabled", true));
          dispatch(setFieldProperty("propertyAreaDetails", "swimingpoolSize", "disabled", true));
        }

      },
    },
    swimingpoolUnit: {
      id: "swimingpoolUnit",
      jsonPath: "Properties[0].propertyAreaDetails.swimingpoolUnit",
      type: "singleValueList",
      floatingLabelText: "Unit", disabled: true,
      fullWidth: true,
      required: false,
      numcols: 3,
      gridDefination: {
        xs: 12,
        sm: 3
      },
      dropDownData: [{
        name: 'sqMt',
        code: 'sqMt',
        label: 'sqMt',
        value: 'sqMt'
      }, {
        name: 'sqFt',
        code: 'sqFt',
        label: 'sqFt',
        value: 'sqFt'
      }],
      formName: "propertyAreaDetails",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;

        if (value && value !== "") {
          const swimingpoolValue = get(state, "form.propertyAreaDetails.fields.swimingpool.value", "");
          const swimingpoolSizeValue = get(state, "form.propertyAreaDetails.fields.swimingpoolSize.value", "");

          let newValue = swimingpoolValue + '-' + value + '-' + swimingpoolSizeValue

          dispatch(prepareFormData("Properties[0].propertyDetailsNew.swimingpool", newValue));

        }
      }
    },
    swimingpoolSize: {
      id: "swimingpoolSize",
      jsonPath: "Properties[0].propertyAreaDetails.swimingpoolSize",
      type: "singleValueList",
      floatingLabelText: "Size", disabled: true,
      fullWidth: true,
      required: false,
      numcols: 4,
      numcols: 3,
      gridDefination: {
        xs: 12,
        sm: 3
      },
      dropDownData: [{
        name: 'small',
        code: 'small',
        label: 'small',
        value: 'small'
      }, {
        name: 'medium',
        code: 'medium',
        label: 'medium',
        value: 'medium'
      }, {
        name: 'large',
        code: 'large',
        label: 'large',
        value: 'large'
      }
      ],
      formName: "propertyAreaDetails",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;

        if (value && value !== "") {
          const swimingpoolValue = get(state, "form.propertyAreaDetails.fields.swimingpool.value", "");
          const swimingpoolUnitValue = get(state, "form.propertyAreaDetails.fields.swimingpoolUnit.value", "");

          let newValue = swimingpoolValue + '-' + swimingpoolUnitValue + '-' + value

          dispatch(prepareFormData("Properties[0].propertyDetailsNew.swimingpool", newValue));

        }
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

      let areaObj = get(state, "common.prepareFormData.Properties[0].propertyAreaDetails", {})
      
      if (Object.keys(areaObj).includes("coveredSpace")) {
      
        dispatch(setFieldProperty("propertyAreaDetails", "coveredSpaceUnit", "disabled", false));
        dispatch(setFieldProperty("propertyAreaDetails", "coveredSpaceSize", "disabled", false)); 
        dispatch(setFieldProperty("propertyAreaDetails", "coveredSpaceSize", "value", areaObj.coveredSpaceSize));
        dispatch(setFieldProperty("propertyAreaDetails", "coveredSpaceUnit", "value", areaObj.coveredSpaceUnit));
      
      }
      if (Object.keys(areaObj).includes("coveredCarParking")) {
      
        dispatch(setFieldProperty("propertyAreaDetails", "coveredCarParkingUnit", "disabled", false));
        dispatch(setFieldProperty("propertyAreaDetails", "coveredCarParkingSize", "disabled", false)); 
        dispatch(setFieldProperty("propertyAreaDetails", "coveredCarParkingSize", "value", areaObj.coveredCarParkingSize));
        dispatch(setFieldProperty("propertyAreaDetails", "coveredCarParkingUnit", "value", areaObj.coveredCarParkingUnit));
      
      }
      if (Object.keys(areaObj).includes("commonSpace")) {
      
        dispatch(setFieldProperty("propertyAreaDetails", "commonSpaceUnit", "disabled", false));
        dispatch(setFieldProperty("propertyAreaDetails", "commonSpaceSize", "disabled", false)); 
        dispatch(setFieldProperty("propertyAreaDetails", "commonSpaceSize", "value", areaObj.commonSpaceSize));
        dispatch(setFieldProperty("propertyAreaDetails", "commonSpaceUnit", "value", areaObj.commonSpaceUnit));
      
      }
      if (Object.keys(areaObj).includes("openCarParking")) {
      
        dispatch(setFieldProperty("propertyAreaDetails", "openCarParkingUnit", "disabled", false));
        dispatch(setFieldProperty("propertyAreaDetails", "openCarParkingSize", "disabled", false)); 
        dispatch(setFieldProperty("propertyAreaDetails", "openCarParkingSize", "value", areaObj.openCarParkingSize));
        dispatch(setFieldProperty("propertyAreaDetails", "openCarParkingUnit", "value", areaObj.openCarParkingUnit));
      
      }
      if (Object.keys(areaObj).includes("openTerrace")) {
      
        dispatch(setFieldProperty("propertyAreaDetails", "openTerraceUnit", "disabled", false));
        dispatch(setFieldProperty("propertyAreaDetails", "openTerraceSize", "disabled", false)); 
        dispatch(setFieldProperty("propertyAreaDetails", "openTerraceSize", "value", areaObj.openTerraceSize));
        dispatch(setFieldProperty("propertyAreaDetails", "openTerraceUnit", "value", areaObj.openTerraceUnit));
      
      }
      if (Object.keys(areaObj).includes("roof")) {
      
        dispatch(setFieldProperty("propertyAreaDetails", "roofUnit", "disabled", false));
        dispatch(setFieldProperty("propertyAreaDetails", "roofSize", "disabled", false)); 
        dispatch(setFieldProperty("propertyAreaDetails", "roofSize", "value", areaObj.roofSize));
        dispatch(setFieldProperty("propertyAreaDetails", "roofUnit", "value", areaObj.roofUnit));
      
      }
      if (Object.keys(areaObj).includes("swimingpool")) {
      
        dispatch(setFieldProperty("propertyAreaDetails", "swimingpoolUnit", "disabled", false));
        dispatch(setFieldProperty("propertyAreaDetails", "swimingpoolSize", "disabled", false)); 
        dispatch(setFieldProperty("propertyAreaDetails", "swimingpoolSize", "value", areaObj.swimingpoolSize));
        dispatch(setFieldProperty("propertyAreaDetails", "swimingpoolUnit", "value", areaObj.swimingpoolUnit));
      
      }

      // dispatch(setFieldProperty("propertyAreaDetails", "premisesTypeDropDown", "dropDownData", premisesTypeStaticData));
      // const wardDropDownData = get(state, 'form.propertyAreaDetails.fields.ward.dropDownData', []);

      return action;
    } catch (e) {
      console.log(e);
      return action;
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
