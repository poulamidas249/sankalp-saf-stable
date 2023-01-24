// import { mohalla } from "egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/reusableFields";
// import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
// import { fetchGeneralMDMSData, prepareFormData } from "egov-ui-kit/redux/common/actions";
// import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
// import { fetchDropdownData, generalMDMSDataRequestObj, fetchWardDropdown, getGeneralMDMSDataDropdownName, getTranslatedLabel } from "egov-ui-kit/utils/commons";
// import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
// import filter from "lodash/filter";
// import get from "lodash/get";
// import sortBy from "lodash/sortBy";
// import { getPattern } from "egov-ui-framework/ui-config/screens/specs/utils";
// const ward = [
//   {
//     name: "010",
//     code: "10",
//     active: true,

//     borough: "2",
//     office: [
//       {
//         name: "A.C NORTH",
//         code: "1"
//       }
//     ],
//     street: [
//       {
//         name: "ABHOY GHOSE LANE",
//         code: "1"
//       },
//       {
//         name: "ANANDA LANE",
//         code: "2"
//       }
//     ]
//   },
//   {
//     name: "001",
//     code: "1",
//     active: true,
//     borough: "1",
//     office: [
//       {
//         name: "A.C NORTH",
//         code: "1"
//       }
//     ],
//     street: [
//       {
//         name: "BARRACKPORE TRUNK ROAD",
//         code: "1"
//       },
//       {
//         name: "CHANDRA KUMAR ROY LANE",
//         code: "2"
//       },
//       {
//         name: "COSSIPORE ROAD",
//         code: "3"
//       },
//       {
//         name: "GOBINDA MONDAL ROAD",
//         code: "4"
//       },
//       {
//         name: "GOPAL CHANDRA CHATTERJEE ROAD",
//         code: "5"
//       },
//       {
//         name: "GOPI MONDAL LANE",
//         code: "6"
//       },
//       {
//         name: "KASI NATH DUTT ROAD",
//         code: "7"
//       },
//       {
//         name: "KASISWAR CHATTERJEE LANE",
//         code: "8"
//       },
//       {
//         name: "KHAGENDRA CHATTERJEE ROAD",
//         code: "9"
//       },
//       {
//         name: "NAFAR CHANDRA LAHA LANE",
//         code: "10"
//       },
//       {
//         name: "NARENDRA NATH PAUL ROAD",
//         code: "11"
//       },
//       {
//         name: "PARAMANICK GHAT LANE",
//         code: "12"
//       },
//       {
//         name: "PRAMANICK GHAT ROAD",
//         code: "13"
//       },
//       {
//         name: "PRANNATH CHOWDHURY LANE",
//         code: "14"
//       },
//       {
//         name: "PRANNATH SUR LANE",
//         code: "15"
//       },
//       {
//         name: "RADHA MOHAN DE LANE",
//         code: "16"
//       },
//       {
//         name: "RAJENDRA NATH ROY CHOWDHURY LANE",
//         code: "17"
//       },
//       {
//         name: "RATAN BABU ROAD",
//         code: "18"
//       },
//       {
//         name: "RUSTOMJEE PARSEE ROAD",
//         code: "19"
//       },
//       {
//         name: "SATCHASI PARA LANE",
//         code: "20"
//       },
//       {
//         name: "SATCHASI PARA ROAD",
//         code: "21"
//       },
//       {
//         name: "SEALS GARDEN LANE",
//         code: "22"
//       },
//       {
//         name: "SHAMA CHARAN MAITRA LANE",
//         code: "23"
//       },
//       {
//         name: "SRISTIDHAR DEY LANE",
//         code: "24"
//       },
//       {
//         name: "BUSTEE RE HOUSING SCH NO I",
//         code: "25"
//       }
//     ]
//   },
//   {
//     name: "002",
//     code: "2",
//     active: true,
//     borough: "1",
//     office: [
//       {
//         name: "A.C NORTH",
//         code: "1"
//       }
//     ],
//     street: [
//       {
//         name: "BARRACKPORE TRUNK ROAD",
//         code: "1"
//       },
//       {
//         name: "CENTRE SINTHEE ROAD",
//         code: "2"
//       },
//       {
//         name: "D GUPTA LANE",
//         code: "3"
//       },
//       {
//         name: "DUM DUM ROAD",
//         code: "4"
//       },
//       {
//         name: "DUM DUM STATION ROAD",
//         code: "5"
//       },
//       {
//         name: "GOPAL CHANDRA BOSE LANE",
//         code: "6"
//       },
//       {
//         name: "GOUR SUNDER SETT LANE",
//         code: "7"
//       },
//       {
//         name: "HAREY KRISTA SETT LANE",
//         code: "8"
//       },
//       {
//         name: "HARISH CHANDRA PAUL LANE",
//         code: "9"
//       },
//       {
//         name: "HEM DE LANE",
//         code: "10"
//       },
//       {
//         name: "KALI CHARAN GHOSE ROADs",
//         code: "11"
//       },
//       {
//         name: "KALI CHARAN SETT LANE",
//         code: "12"
//       },
//       {
//         name: "KEDAR NATH DAS LANE",
//         code: "13"
//       },
//       {
//         name: "NORTHERN AVENUE",
//         code: "14"
//       },
//       {
//         name: "PANCHANANTALA LANE",
//         code: "15"
//       },
//       {
//         name: "RAJA APURBA KRISTO LANE",
//         code: "16"
//       },
//       {
//         name: "RAJA BAGAN LANE",
//         code: "17"
//       },
//       {
//         name: "RAM KRISHNA GHOSE ROAD",
//         code: "18"
//       },
//       {
//         name: "ROYPARA BYE LANE",
//         code: "19"
//       },
//       {
//         name: "ROYPARA LANE",
//         code: "20"
//       },
//       {
//         name: "ROYPARA ROAD",
//         code: "21"
//       },
//       {
//         name: "SAMAR SARANEE",
//         code: "22"
//       },
//       {
//         name: "SANTRAPARA LANE",
//         code: "23"
//       },
//       {
//         name: "SEVEN TANKS LANE",
//         code: "24"
//       },
//       {
//         name: "GANAPATI SUR SARANI",
//         code: "25"
//       }
//     ]
//   },
//   {
//     name: "044",
//     code: "044",
//     active: true,
//     borough: "5",
//     office: [
//       {
//         name: "A.C NORTH",
//         code: "1"
//       }
//     ],
//     street: [
//       {
//         name: "ANGARIKA DHARMAPALA STREET",
//         code: "1"
//       },
//       {
//         name: "BEPIN BEHARI GANGULY STREET",
//         code: "2"
//       }
//     ]
//   }
// ];
// const formConfig = {
//   name: "propertyAddress",
//   fields: {

//     ward: {
//       id: "ward",
//       jsonPath: "Properties[0].ward",
//       required: true,
//       localePrefix: true,
//       labelsFromLocalisation: true,
//       type: "AutocompleteDropdown",
//       floatingLabelText: "Ward",
//       errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
//       fullWidth: true,
//       hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
//       numcols: 6,
//       gridDefination: {
//         xs: 12,
//         sm: 6
//       },

//       updateDependentFields: ({ formKey, field, dispatch, state }) => {
//         function getStreetList(name) {
//           let selectedWard = ward.filter((w) => w.code === name)[0];

//           let streeDropDownDataNew = [];
//           selectedWard.street.map((s) => {
//             streeDropDownDataNew.push({
//               name: s.name,
//               code: s.code,
//               value: s.name,
//               label: s.name,
//               active: "true"
//             });
//             return streeDropDownDataNew;
//           });
//           return streeDropDownDataNew;
//         }
//         // dispatch(setFieldProperty("propertyAddress", "mohalla", "value", ""));
//         // dispatch(setFieldProperty("propertyAddress", "ward", "value", ""));
//         // const moduleValue = field.value;
//         // dispatch(fetchLocalizationLabel(getLocale(), moduleValue, moduleValue));
//         // let requestBody = generalMDMSDataRequestObj(field.value);

//         // dispatch(
//         //   fetchGeneralMDMSData(requestBody, "PropertyTax", getGeneralMDMSDataDropdownName())
//         // );
//         if (field.value) {
//           let dd = getStreetList(field.value)
//           dispatch(setFieldProperty("propertyAddress", "mohalla", "dropDownData", dd));
//         } else {
//           dispatch(setFieldProperty("propertyAddress", "mohalla", "dropDownData", ""));
//         }
//       },
//     },
//     mohalla: {
//       id: "mohalla",
//       jsonPath: "Properties[0].street",
//       type: "AutocompleteDropdown",
//       floatingLabelText: "Street",
//       hintText: "Street",
//       fullWidth: true,
//
//       required: false,
//       localePrefix: true,
//
//       labelsFromLocalisation: true,
//       boundary: true,
//       numcols: 6,
//       gridDefination: {
//         xs: 12,
//         sm: 6
//       },
//       errorMessage: "PT_PROPERTY_DETAILS_MOHALLA_ERRORMSG",
//       errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
//       formName: "propertyAddress",
//       updateDependentFields: ({ formKey, field, dispatch, state }) => {
//       },
//     },
//     pincode: {
//       id: "pincode",
//       type: "number",
//       jsonPath: "Properties[0].pincode",
//       floatingLabelText: "PT_PROPERTY_DETAILS_PINCODE",
//       hintText: "PT_PROPERTY_DETAILS_PINCODE_PLACEHOLDER",
//       numcols: 6,
//       //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
//       errorMessage: "PT_PINCODE_ERROR_MESSAGE",
//       errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
//       pattern: "^([0-9]){6}$",
//       required: true,
//     },
//     oldPID: {
//       id: "oldpid",
//       type: "textfield",
//       className: "pt-old-pid-text-field",
//       // text: "PT_SEARCH_BUTTON",
//       // iconRedirectionURL: "https://pmidc.punjab.gov.in/propertymis/search.php",
//       jsonPath: "Properties[0].oldPropertyId",
//       floatingLabelText: "PT_PROPERTY_ADDRESS_EXISTING_PID",
//       hintText: "PT_PROPERTY_ADDRESS_EXISTING_PID_PLACEHOLDER",
//       numcols: 6,
//       errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
//       errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
//
//       pattern: /^[^\$\"'<>?\\\\~`!@$%^+={}*,.:;“”‘’]{1,64}$/i,
//       toolTipMessage: "PT_OLDPID_TOOLTIP_MESSAGE",
//       maxLength: 64,
//     },
//     buildingName: {
//       id: "buildingName",
//       type: "textfield",
//       className: "pt-old-pid-text-field",
//       // text: "PT_SEARCH_BUTTON",
//       // iconRedirectionURL: "https://pmidc.punjab.gov.in/propertymis/search.php",
//       jsonPath: "Properties[0].buildingName",
//       floatingLabelText: "Premise Number",
//       hintText: "Premise Number",
//       required : true ,
//       numcols: 6,
//       errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
//       errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
//
//       pattern: /^[^\$\"'<>?\\\\~`!@$%^+={}*,.:;“”‘’]{1,64}$/i,
//       toolTipMessage: "PT_OLDPID_TOOLTIP_MESSAGE",
//       maxLength: 64,
//     },
//   },
//   afterInitForm: (action, store, dispatch) => {
//     try {
//       let state = store.getState();
//       const { localizationLabels } = state.app;
//       const { cities, citiesByModule } = state.common;
//       const PT = citiesByModule && citiesByModule.PT;
//       if (PT) {
//         const tenants = PT.tenants;
//         const dd = tenants.reduce((dd, tenant) => {
//           let selected = cities.find((city) => {
//             return city.code === tenant.code;
//           });

//           selected.code = selected.code && selected.code.trim()
//           const label = `TENANT_TENANTS_${selected.code.toUpperCase().replace(/[.]/g, "_")}`;
//           dd.push({ label: getTranslatedLabel(label, localizationLabels), value: selected.code });
//           return dd;
//         }, []);
//       }

//       let wardDropDownDataStatic = [];
//       function getWardList() {
//         ward.map((w) => {
//           wardDropDownDataStatic.push({
//             name: w.name,
//             code: w.code,
//             label: w.name,
//             value: w.code
//           });
//           return wardDropDownDataStatic;
//         });
//       };
//       getWardList()
//       dispatch(setFieldProperty("propertyAddress", "ward", "dropDownData", wardDropDownDataStatic));
//       const tenant = get(state, 'form.propertyAddress.fields.city.value', null);
//       const mohallaDropDownData = get(state, 'form.propertyAddress.fields.mohalla.dropDownData', []);
//       const wardDropDownData = get(state, 'form.propertyAddress.fields.ward.dropDownData', []);
//       // if (process.env.REACT_APP_NAME === "Citizen" && tenant && mohallaDropDownData.length == 0) {
//       //   const dataFetchConfig = {
//       //     url: "egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
//       //     action: "",
//       //     queryParams: [{
//       //       key: "tenantId",
//       //       value: tenant
//       //     }],
//       //     requestBody: {},
//       //     isDependent: true,
//       //     hierarchyType: "REVENUE"
//       //   }
//       //   fetchDropdownData(dispatch, dataFetchConfig, 'propertyAddress', 'mohalla', state, true);
//       // }
//       // if(process.env.REACT_APP_NAME === "Citizen" && tenant && wardDropDownData.length == 0){
//       //   const queryObject = [
//       //    {
//       //     key: "tenantId",
//       //     value: tenant
//       //    }
//       //   ]
//       //   fetchWardDropdown(dispatch,queryObject,'propertyAddress','ward',state)
//       // }
//       return action;
//     } catch (e) {
//       console.log(e);
//       return action;
//     }
//   },
//   action: "",
//   redirectionRoute: "",
//   saveUrl: "",
//   isFormValid: false,
// };

// export default formConfig;

import { mohalla } from "egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/reusableFields";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { fetchGeneralMDMSData, prepareFormData } from "egov-ui-kit/redux/common/actions";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import { fetchDropdownData, generalMDMSDataRequestObj, getGeneralMDMSDataDropdownName, getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import filter from "lodash/filter";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import sortBy from "lodash/sortBy";

const wardStaticData = [
  {
    name: "010",
    code: "10",
    active: true,
    borough: "2",
    office: [
      {
        name: "A.C NORTH",
        code: "1",
      },
    ],
    street: [
      {
        name: "ABHOY GHOSE LANE",
        code: "1",
      },
      {
        name: "ANANDA LANE",
        code: "2",
      },
    ],
  },
  {
    name: "001",
    code: "001",
    active: true,
    borough: "1",
    office: [
      {
        name: "A.C NORTH",
        code: "1",
      },
    ],
    street: [
      {
        name: "BARRACKPORE TRUNK ROAD",
        code: "08",
      },
      {
        name: "CHANDRA KUMAR ROY LANE",
        code: "2",
      },
      {
        name: "COSSIPORE ROAD",
        code: "3",
      },
      {
        name: "GOBINDA MONDAL ROAD",
        code: "4",
      },
      {
        name: "GOPAL CHANDRA CHATTERJEE ROAD",
        code: "5",
      },
      {
        name: "GOPI MONDAL LANE",
        code: "6",
      },
      {
        name: "KASI NATH DUTT ROAD",
        code: "7",
      },
      {
        name: "KASISWAR CHATTERJEE LANE",
        code: "8",
      },
      {
        name: "KHAGENDRA CHATTERJEE ROAD",
        code: "9",
      },
      {
        name: "NAFAR CHANDRA LAHA LANE",
        code: "10",
      },
      {
        name: "NARENDRA NATH PAUL ROAD",
        code: "11",
      },
      {
        name: "PARAMANICK GHAT LANE",
        code: "12",
      },
      {
        name: "PRAMANICK GHAT ROAD",
        code: "13",
      },
      {
        name: "PRANNATH CHOWDHURY LANE",
        code: "009",
      },
      {
        name: "PRANNATH SUR LANE",
        code: "15",
      },
      {
        name: "RADHA MOHAN DE LANE",
        code: "16",
      },
      {
        name: "RAJENDRA NATH ROY CHOWDHURY LANE",
        code: "17",
      },
      {
        name: "RATAN BABU ROAD",
        code: "18",
      },
      {
        name: "RUSTOMJEE PARSEE ROAD",
        code: "19",
      },
      {
        name: "SATCHASI PARA LANE",
        code: "20",
      },
      {
        name: "SATCHASI PARA ROAD",
        code: "21",
      },
      {
        name: "SEALS GARDEN LANE",
        code: "22",
      },
      {
        name: "SHAMA CHARAN MAITRA LANE",
        code: "23",
      },
      {
        name: "SRISTIDHAR DEY LANE",
        code: "24",
      },
      {
        name: "BUSTEE RE HOUSING SCH NO I",
        code: "25",
      },
    ],
  },
  {
    name: "002",
    code: "2",
    active: true,
    borough: "1",
    office: [
      {
        name: "A.C NORTH",
        code: "1",
      },
    ],
    street: [
      {
        name: "BARRACKPORE TRUNK ROAD",
        code: "1",
      },
      {
        name: "CENTRE SINTHEE ROAD",
        code: "2",
      },
      {
        name: "D GUPTA LANE",
        code: "3",
      },
      {
        name: "DUM DUM ROAD",
        code: "4",
      },
      {
        name: "DUM DUM STATION ROAD",
        code: "5",
      },
      {
        name: "GOPAL CHANDRA BOSE LANE",
        code: "6",
      },
      {
        name: "GOUR SUNDER SETT LANE",
        code: "7",
      },
      {
        name: "HAREY KRISTA SETT LANE",
        code: "8",
      },
      {
        name: "HARISH CHANDRA PAUL LANE",
        code: "9",
      },
      {
        name: "HEM DE LANE",
        code: "10",
      },
      {
        name: "KALI CHARAN GHOSE ROADs",
        code: "11",
      },
      {
        name: "KALI CHARAN SETT LANE",
        code: "12",
      },
      {
        name: "KEDAR NATH DAS LANE",
        code: "13",
      },
      {
        name: "NORTHERN AVENUE",
        code: "14",
      },
      {
        name: "PANCHANANTALA LANE",
        code: "15",
      },
      {
        name: "RAJA APURBA KRISTO LANE",
        code: "16",
      },
      {
        name: "RAJA BAGAN LANE",
        code: "17",
      },
      {
        name: "RAM KRISHNA GHOSE ROAD",
        code: "18",
      },
      {
        name: "ROYPARA BYE LANE",
        code: "19",
      },
      {
        name: "ROYPARA LANE",
        code: "20",
      },
      {
        name: "ROYPARA ROAD",
        code: "21",
      },
      {
        name: "SAMAR SARANEE",
        code: "22",
      },
      {
        name: "SANTRAPARA LANE",
        code: "23",
      },
      {
        name: "SEVEN TANKS LANE",
        code: "24",
      },
      {
        name: "GANAPATI SUR SARANI",
        code: "25",
      },
    ],
  },
  {
    name: "044",
    code: "044",
    active: true,
    borough: "5",
    office: [
      {
        name: "A.C NORTH",
        code: "1",
      },
    ],
    street: [
      {
        name: "ANGARIKA DHARMAPALA STREET",
        code: "1",
      },
      {
        name: "BEPIN BEHARI GANGULY STREET",
        code: "2",
      },
    ],
  },
];

const premisesTypeStaticData = [
  {
    label: "HO Govt",
    value: "08",
  },
  {
    label: "HO Govt",
    value: "17",
  },
  {
    label: "Kolkata Proper",
    value: "11",
  },
  {
    label: "HO Bustee",
    value: "12",
  },
  {
    label: "Multi Storeyed Building",
    value: "14",
  },
  {
    label: "Kolkata Port Trust",
    value: "16",
  },
];

const formConfig = {
  name: "propertyAddress",
  fields: {
    ward: {
      id: "ward",
      jsonPath: "Properties[0].ward",
      required: true,
      localePrefix: true,
      labelsFromLocalisation: true,
      type: "AutocompleteDropdown",
      floatingLabelText: "Ward",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6,
      },

      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        function getStreetList(name) {
          let selectedWard = wardStaticData.filter((w) => w.code === name)[0];

          let streeDropDownDataNew = [];
          selectedWard.street.map((s) => {
            streeDropDownDataNew.push({
              name: s.name,
              code: s.code,
              value: s.code,
              label: s.name,
              active: "true",
            });
            return streeDropDownDataNew;
          });
          return streeDropDownDataNew;
        }
        dispatch(setFieldProperty("propertyAddress", "mohalla", "value", ""));
        // dispatch(setFieldProperty("propertyAddress", "ward", "value", ""));
        // const moduleValue = field.value;
        // dispatch(fetchLocalizationLabel(getLocale(), moduleValue, moduleValue));
        // let requestBody = generalMDMSDataRequestObj(field.value);

        // dispatch(
        //   fetchGeneralMDMSData(requestBody, "PropertyTax", getGeneralMDMSDataDropdownName())
        // );
        if (field.value) {
          let dd = getStreetList(field.value);
          dispatch(prepareFinalObject("Properties[0].ward", field.value));
          dispatch(setFieldProperty("propertyAddress", "mohalla", "dropDownData", dd));
        } else {
          dispatch(setFieldProperty("propertyAddress", "mohalla", "dropDownData", ""));
        }
      },
    },
    mohalla: {
      id: "mohalla",
      jsonPath: "Properties[0].street",
      type: "AutocompleteDropdown",
      floatingLabelText: "Street",
      fullWidth: true,
      required: true,
      localePrefix: true,
      labelsFromLocalisation: true,
      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      formName: "propertyAddress",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) {
          dispatch(prepareFinalObject("Properties[0].street", field.value));
        }
      },
    },

    premisesNo: {
      id: "premisesNo",
      type: "textfield",
      className: "pt-old-pid-text-field",
      jsonPath: "Properties[0].premisesNo",
      floatingLabelText: "Premise Number",
      hintText: "Premise Number",
      required: true,
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      toolTipMessage: "PT_OLDPID_TOOLTIP_MESSAGE",
      maxLength: 64,
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) {
          dispatch(prepareFinalObject("Properties[0].premisesNo", field.value));
        }
      },
    },

    premisesType: {
      id: "premisesType",
      jsonPath: "Properties[0].premisesType",
      type: "AutocompleteDropdown",
      floatingLabelText: "Premise Type",
      hintText: "Premise Type",
      fullWidth: true,

      required: true,
      localePrefix: true,

      labelsFromLocalisation: false,

      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      formName: "propertyAddress",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        if (field.value) dispatch(prepareFinalObject("Properties[0].premisesType", field.value));
      },
    },

    city: {
      id: "city",
      jsonPath: "PropertiesTemp[0].address.city",
      required: true,
      localePrefix: { moduleName: "tenant", masterName: "tenants" },
      labelsFromLocalisation: true,
      type: "AutocompleteDropdown",
      floatingLabelText: "CORE_COMMON_CITY",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      hideStyle: true,
      value: "od.angul",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      numcols: 6,
      gridDefination: {
        xs: 0,
        sm: 0,
      },

      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFormData("Properties[0].tenantId", field.value));
        dispatch(
          prepareFormData(
            "Properties[0].city",
            filter(get(state, "common.cities"), (city) => {
              return city.code === field.value;
            })[0].name
          )
        );
        dispatch(setFieldProperty("propertyAddress", "mohalla", "value", ""));
        const moduleValue = field.value;
        dispatch(fetchLocalizationLabel(getLocale(), moduleValue, moduleValue));
        let requestBody = generalMDMSDataRequestObj(field.value);

        dispatch(fetchGeneralMDMSData(requestBody, "PropertyTax", getGeneralMDMSDataDropdownName()));
      },
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
        // const dd = tenants.reduce((dd, tenant) => {
        //   let selected = cities.find((city) => {
        //     return city.code === tenant.code;
        //   });

        //   const label = `TENANT_TENANTS_${selected.code.toUpperCase().replace(/[.]/g, "_")}`;
        //   dd.push({ label: getTranslatedLabel(label, localizationLabels), value: selected.code });
        //   return dd;
        // }, []);
        // const label = `TENANT_TENANTS_${selected.code.toUpperCase().replace(/[.]/g, "_")}`;
        const label = `TENANT_TENANTS_KOLKATA_KM`;
        let dd = [{ label: getTranslatedLabel(label, localizationLabels), value: "km.kolkata" }];
        dispatch(setFieldProperty("propertyAddress", "city", "dropDownData", sortBy(dd, ["label"])));
        // dispatch(setFieldProperty("propertyAddress", "city", "dropDownData", sortBy(dd, ["label"])));
      }

      let wardDropDownDataStatic = [];
      function getWardList() {
        wardStaticData.map((w) => {
          wardDropDownDataStatic.push({
            name: w.name,
            code: w.code,
            label: w.name,
            value: w.code,
          });
          return wardDropDownDataStatic;
        });
      }
      getWardList();
      dispatch(setFieldProperty("propertyAddress", "ward", "dropDownData", wardDropDownDataStatic));
      dispatch(setFieldProperty("propertyAddress", "premisesType", "dropDownData", premisesTypeStaticData));
      const wardDropDownData = get(state, "form.propertyAddress.fields.ward.dropDownData", []);
      const tenant = get(state, "form.propertyAddress.fields.city.value", null);
      const mohallaDropDownData = get(state, "form.propertyAddress.fields.mohalla.dropDownData", []);

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
        fetchDropdownData(dispatch, dataFetchConfig, "propertyAddress", "mohalla", state, true);
      }

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
        let data = get(state.screenConfiguration.preparedFinalObject, "Properties[0]");

        function getStreetList(name) {
          let selectedWard = wardStaticData.filter((w) => w.code === name)[0];

          let streeDropDownDataNew = [];
          selectedWard.street.map((s) => {
            streeDropDownDataNew.push({
              name: s.name,
              code: s.code,
              value: s.code,
              label: s.name,
              active: "true",
            });
            return streeDropDownDataNew;
          });
          return streeDropDownDataNew;
        }

        let streetValue = getStreetList(data.ward);

        dispatch(setFieldProperty("propertyAddress", "mohalla", "dropDownData", streetValue));

        dispatch(setFieldProperty("propertyAddress", "ward", "value", data.ward ? data.ward.toString() : ""));
        dispatch(setFieldProperty("propertyAddress", "mohalla", "value", data.street ? data.street.toString() : ""));
        dispatch(setFieldProperty("propertyAddress", "premisesNo", "value", data.premisesNo ? data.premisesNo.toString() : ""));
        dispatch(setFieldProperty("propertyAddress", "premisesType", "value", data.premisesType ? data.premisesType : ""));

        dispatch(prepareFinalObject("Properties[0].ward", data.ward ? data.ward.toString() : ""));
        dispatch(prepareFinalObject("Properties[0].street", data.street ? data.street.toString() : ""));
        dispatch(prepareFinalObject("Properties[0].premisesNo", data.premisesNo ? data.premisesNo.toString() : ""));
        dispatch(prepareFinalObject("Properties[0].premisesType", data.premisesType ? data.premisesType : ""));
      }

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
