import { mohalla } from "egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/reusableFields";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { fetchGeneralMDMSData, prepareFormData } from "egov-ui-kit/redux/common/actions";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import { fetchDropdownData, generalMDMSDataRequestObj, getGeneralMDMSDataDropdownName, getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import filter from "lodash/filter";
import get from "lodash/get";
import sortBy from "lodash/sortBy";
import { getPattern } from "egov-ui-framework/ui-config/screens/specs/utils";

const formConfig = {
  name: "registrationDetails",
  fields: {
    ward: {
      id: "ward",
      jsonPath: "PropertiesTemp[0].address.ward",
      required: false,
      localePrefix: { moduleName: "tenant", masterName: "tenants" },
      labelsFromLocalisation: true,
      type: "AutocompleteDropdown",
      floatingLabelText: "Ward Name",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      dataFetchConfig: {
        dependants: [
          {
            fieldKey: "mohalla",
          },
        ],
      },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFormData("Properties[0].tenantId", field.value));
        dispatch(
          prepareFormData(
            "Properties[0].address.ward",
            filter(get(state, "common.cities"), (ward) => {
              return ward.code === field.value;
            })[0].name
          )
        );
        dispatch(setFieldProperty("registrationDetails", "mohalla", "value", ""));
        const moduleValue = field.value;
        dispatch(fetchLocalizationLabel(getLocale(), moduleValue, moduleValue));
        let requestBody = generalMDMSDataRequestObj(field.value);

        dispatch(fetchGeneralMDMSData(requestBody, "PropertyTax", getGeneralMDMSDataDropdownName()));
      },
    },

    ...mohalla,
    pincode: {
      id: "pincode",
      type: "number",
      jsonPath: "Properties[0].address.pincode",
      floatingLabelText: "PT_PROPERTY_DETAILS_PINCODE",
      hintText: "PT_PROPERTY_DETAILS_PINCODE_PLACEHOLDER",
      numcols: 6,
      required: false,
      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_PINCODE_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: "^([0-9]){6}$",
    },

    primisesNo: {
      id: "primiseNumber",
      type: "number",
      jsonPath: "Properties[0].address.primiseNumber",
      floatingLabelText: "Primise Number",
      hintText: "Primise Number",
      numcols: 6,
      required: false,
      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_Primise_Number_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: "^([0-9]){6}$",
    },
  },
  afterInitForm: (action, store, dispatch) => {
    try {
      let state = store.getState();
      const { localizationLabels } = state.app;
      const { cities, citiesByModule } = state.common;
      const PT = citiesByModule && citiesByModule.PT;
      if (PT) {
        const tenants = PT.tenants;
        const dd = tenants.reduce((dd, tenant) => {
          // let selected = cities.find((city) => {
          //   return city.code === tenant.code;
          // });

          let selected = cities.find((ward) => {
            return ward.code === tenant.code;
          });
          const label = `TENANT_TENANTS_${selected.code.toUpperCase().replace(/[.]/g, "_")}`;
          dd.push({ label: getTranslatedLabel(label, localizationLabels), value: selected.code });
          return dd;
        }, []);
        // dispatch(setFieldProperty("registrationDetails", "city", "dropDownData", sortBy(dd, ["label"])));
        dispatch(setFieldProperty("registrationDetails", "ward", "dropDownData", sortBy(dd, ["label"])));
      }
      // const tenant = get(state, 'form.registrationDetails.fields.city.value', null);
      const tenant = get(state, "form.registrationDetails.fields.ward.value", null);
      const mohallaDropDownData = get(state, "form.registrationDetails.fields.mohalla.dropDownData", []);

      if (process.env.REACT_APP_NAME === "Citizen" && tenant && mohallaDropDownData.length == 0) {
        const dataFetchConfig = {
          url: "egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
          action: "",
          queryParams: [
            {
              key: "tenantId",
              value: tenant,
            },
          ],
          requestBody: {},
          isDependent: true,
          hierarchyType: "REVENUE",
        };
        fetchDropdownData(dispatch, dataFetchConfig, "registrationDetails", "mohalla", state, true);
      }
      return action;
    } catch (e) {
      return action;
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
