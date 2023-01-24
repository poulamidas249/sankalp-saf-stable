import {
  getCommonCard,
  getCommonContainer,
  getCommonParagraph,
  getCommonTitle,
  getLabel,
  getPattern,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getMohallaData } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import { getLocaleLabels } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../ui-utils";
import { applicationSearch, propertySearch } from "./functions";

export const ComponentJsonPath = {
  ward: "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.wardContainer.children.ward",
  street:
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.wardContainer.children.street",
  ownerName:
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.wardContainer.children.ownerName",
  ownerMobNo:
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.wardContainer.children.ownerMobNo",
  propertyID:
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.wardContainer.children.propertyID",
  ownerName:
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.wardContainer.children.ownerName",
  doorNo:
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.wardContainer.children.doorNo",
};

const applyMohallaData = (mohallaData, tenantId, dispatch) => {
  dispatch(
    prepareFinalObject("searchScreenMdmsData.tenant.localities", mohallaData)
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.street,
      "props.data",
      mohallaData
      // payload.TenantBoundary && payload.TenantBoundary[0].boundary
    )
  );
  dispatch(
    handleField("propertySearch", ComponentJsonPath.street, "props.value", "")
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.street,
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.street,
      "isFieldValid",
      true
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.street,
      "props.errorMessage",
      ""
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.street,
      "props.helperText",
      ""
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.ward,
      "props.helperText",
      ""
    )
  );
  dispatch(
    handleField("propertySearch", ComponentJsonPath.ward, "props.error", false)
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.ward,
      "props.isFieldValid",
      true
    )
  );
  dispatch(prepareFinalObject("ptSearchScreen.street", ""));
  const mohallaLocalePrefix = {
    moduleName: tenantId,
    masterName: "REVENUE",
  };
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.street,
      "props.localePrefix",
      mohallaLocalePrefix
    )
  );
};

export const resetFields = (state, dispatch) => {
  if (process.env.REACT_APP_NAME == "Citizen") {
    dispatch(
      handleField(
        "propertySearch",
        "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.wardContainer.children.ward",
        "props.value",
        ""
      )
    );

    dispatch(prepareFinalObject("ptSearchScreen.tenantId", ""));
    dispatch(
      handleField(
        "propertySearch",
        "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.wardContainer.children.ward",
        "props.isDisabled",
        false
      )
    );
    dispatch(
      handleField(
        "propertySearch",
        "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.wardContainer.children.ward",
        "isDisabled",
        false
      )
    );
  } else {
    dispatch(
      handleField(
        "propertySearch",
        "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.wardContainer.children.ward",
        "props.isDisabled",
        true
      )
    );
    dispatch(
      handleField(
        "propertySearch",
        "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.wardContainer.children.ward",
        "isDisabled",
        true
      )
    );
  }

  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.wardContainer.children.ownerMobNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.wardContainer.children.propertyTaxUniqueId",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.wardContainer.children.existingPropertyId",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.propertyTaxApplicationNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.ownerMobNoProp",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.applicationPropertyTaxUniqueId",
      "props.value",
      ""
    )
  );
  dispatch(prepareFinalObject("ptSearchScreen.acknowledgementIds", ""));
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.ward,
      "props.errorMessage",
      ""
    )
  );

  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.ward,
      "props.helperText",
      ""
    )
  );
  dispatch(
    handleField("propertySearch", ComponentJsonPath.ward, "props.error", false)
  );
  dispatch(
    handleField("propertySearch", ComponentJsonPath.street, "props.value", "")
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.street,
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.street,
      "props.helperText",
      ""
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.street,
      "props.errorMessage",
      ""
    )
  );
  dispatch(prepareFinalObject("ptSearchScreen.street", ""));
  dispatch(prepareFinalObject("ptSearchScreen.ids", ""));
  dispatch(prepareFinalObject("ptSearchScreen.mobileNumber", ""));
  dispatch(prepareFinalObject("ptSearchScreen.oldPropertyId", ""));
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.ownerName,
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.ownerName,
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.ownerName,
      "props.helperText",
      ""
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.ownerName,
      "props.errorMessage",
      ""
    )
  );
  dispatch(prepareFinalObject("ptSearchScreen.name", ""));

  dispatch(
    handleField("propertySearch", ComponentJsonPath.doorNo, "props.value", "")
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.doorNo,
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.doorNo,
      "props.helperText",
      ""
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.doorNo,
      "props.errorMessage",
      ""
    )
  );
  dispatch(prepareFinalObject("ptSearchScreen.doorNo", ""));
};

export const cityChange = async (dispatch, value = "") => {
  try {
    dispatch(fetchLocalizationLabel(getLocale(), value, value));
    let payload = await httpRequest(
      "post",
      "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=street",
      "_search",
      [{ key: "tenantId", value: value }],
      {}
    );
    const mohallaData = getMohallaData(payload, value);
    applyMohallaData(mohallaData, value, dispatch);
  } catch (e) {
    console.log(e);
  }
};
export const searchPropertyDetails = getCommonCard({
  subHeader: getCommonTitle({
    labelName: "Search Property",
    labelKey: "SEARCH_PROPERTY",
  }),

  subParagraph: getCommonParagraph({
    labelName:
      "Provide at least one non-mandatory parameter to search for an application",
    labelKey: "PT_HOME_SEARCH_RESULTS_DESC",
  }),
  wardContainer: getCommonContainer({
    ward: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pt",
      componentPath: "AutosuggestContainer",
      props: {
        className: "autocomplete-dropdown",
        suggestions: [],
        label: {
          labelName: "Ward",
          labelKey: "Ward",
        },
        placeholder: {
          labelName: "Select Ward",
          labelKey: "Select Ward",
        },
        localePrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS",
        },
        jsonPath: "ptSearchScreen.tenantId",
        sourceJsonPath: "searchScreenMdmsData.tenant.tenants",
        labelsFromLocalisation: true,
        required: true,
        disabled: process.env.REACT_APP_NAME === "Citizen" ? false : true,
        inputLabelProps: {
          shrink: true,
        },
      },
      required: true,
      jsonPath: "ptSearchScreen.tenantId",
      sourceJsonPath: "searchScreenMdmsData.tenant.tenants",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      beforeFieldChange: async (action, state, dispatch) => {
        if (action.value) {
          cityChange(dispatch, action.value);
        }
      },
    },
    street: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pt",
      componentPath: "AutosuggestContainer",
      props: {
        label: {
          labelName: "Street",
          labelKey: "Street",
        },
        placeholder: {
          labelName: "Select Street",
          labelKey: "Select Street",
        },
        localePrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS",
        },
        required: true,
        labelsFromLocalisation: true,
        jsonPath: "ptSearchScreen.street",
        sourceJsonPath: "searchScreenMdmsData.tenant.localities",
        className: "street-dropdown autocomplete-dropdown",
      },
      required: true,
      jsonPath: "ptSearchScreen.street",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    },

    ownerMobNo: getTextField({
      label: {
        labelName: "Owner Mobile No.",
        labelKey: "PT_HOME_SEARCH_RESULTS_OWN_MOB_LABEL",
      },
      placeholder: {
        labelName: "Enter your mobile No.",
        labelKey: "PT_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER",
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      iconObj: {
        label: "+91 |",
        position: "start",
      },
      required: false,
      pattern: getPattern("MobileNo"),
      jsonPath: "ptSearchScreen.mobileNumber",
      errorMessage: "ERR_INVALID_MOBILE_NUMBER",
    }),
    ownerName: getTextField({
      label: {
        labelName: "Owner Name",
        labelKey: "PT_SEARCHPROPERTY_TABEL_OWNERNAME",
      },
      placeholder: {
        labelName: "Enter Property Owner Name",
        labelKey: "PT_SEARCH_OWNER_NAME_PLACEHOLDER",
      },
      pattern: getPattern("SearchOwnerName"),
      errorMessage: "Invalid Name",
      helperText: "PT_MIN_3CHAR",
      jsonPath: "ptSearchScreen.name",
      props: {
        className: "applicant-details-error",
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      afterFieldChange: async (action, state, dispatch) => {
        if (
          action.value.match(
            /^[^{0-9}^\$\"<>?\\\\~!@#$%^()+={}\[\]*,/_:;“”‘’]{3,50}$/i
          ) ||
          action.value.length == 0
        ) {
          dispatch(
            handleField(
              "propertySearch",
              ComponentJsonPath.ownerName,
              "props.error",
              false
            )
          );
          dispatch(
            handleField(
              "propertySearch",
              ComponentJsonPath.ownerName,
              "isFieldValid",
              true
            )
          );
          dispatch(
            handleField(
              "propertySearch",
              ComponentJsonPath.ownerName,
              "props.errorMessage",
              ""
            )
          );
        } else {
          dispatch(
            handleField(
              "propertySearch",
              ComponentJsonPath.ownerName,
              "props.error",
              true
            )
          );
          dispatch(
            handleField(
              "propertySearch",
              ComponentJsonPath.ownerName,
              "isFieldValid",
              false
            )
          );
          dispatch(
            handleField(
              "propertySearch",
              ComponentJsonPath.ownerName,
              "props.errorMessage",
              action.value.length < 3
                ? getLocaleLabels("PT_ERR_MIN3CHAR", "PT_ERR_MIN3CHAR")
                : getLocaleLabels("PT_ERR_INVALID_TEXT", "PT_ERR_INVALID_TEXT")
            )
          );
        }
      },
    }),
    // propertyTaxUniqueId: getTextField({
    //   label: {
    //     labelName: "Property Tax Unique Id",
    //     labelKey: "PT_PROPERTY_UNIQUE_ID"
    //   },
    //   placeholder: {
    //     labelName: "Enter Property Tax Unique Id",
    //     labelKey: "PT_PROPERTY_UNIQUE_ID_PLACEHOLDER"
    //   },
    //   gridDefination: {
    //     xs: 12,
    //     sm: 4,

    //   },
    //   required: false,
    //   pattern: /^[a-zA-Z0-9-]*$/i,
    //   errorMessage: "ERR_INVALID_PROPERTY_ID",
    //   jsonPath: "ptSearchScreen.ids"
    // }),
    // existingPropertyId: getTextField({
    //   label: {
    //     labelName: "Existing Property ID",
    //     labelKey: "PT_EXISTING_PROPERTY_ID"
    //   },
    //   placeholder: {
    //     labelName: "Enter Existing Property ID",
    //     labelKey: "PT_EXISTING_PROPERTY_ID_PLACEHOLDER"
    //   },
    //   gridDefination: {
    //     xs: 12,
    //     sm: 4,

    //   },
    //   required: false,
    //   pattern: /^[a-zA-Z0-9-]*$/i,
    //   errorMessage: "ERR_INVALID_PROPERTY_ID",
    //   jsonPath: "ptSearchScreen.oldPropertyId"
    // }),
    // doorNo: getTextField({
    //   label: {
    //     labelName: "Owner Name",
    //     labelKey: "PT_SEARCHPROPERTY_TABEL_DOOR_NO"
    //   },
    //   placeholder: {
    //     labelName: "Enter Property Owner Name",
    //     labelKey: "PT_SEARCH_DOOR_NO_PLACEHOLDER"
    //   },
    //   pattern: getPattern("DoorHouseNo"),
    //   errorMessage: "Invalid No",
    //   jsonPath: "ptSearchScreen.doorNo",
    //   props: {
    //     className: "applicant-details-error"
    //   },
    //   gridDefination: {
    //     xs: 12,
    //     sm: 4
    //   }
    // }),
  }),
  button: getCommonContainer({
    buttonContainer: getCommonContainer({
      resetButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6,
          // align: "center"
        },
        props: {
          variant: "outlined",
          style: {
            color: "black",
            borderColor: "black",
            width: "220px",
            height: "48px",
            margin: "8px",
            float: "right",
          },
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Reset",
            labelKey: "Reset",
          }),
        },
        onClickDefination: {
          action: "condition",
          callBack: resetFields,
        },
      },
      searchButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6,
          // align: "center"
        },
        props: {
          variant: "contained",
          style: {
            color: "white",
            margin: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
            borderRadius: "2px",
            width: "220px",
            height: "48px",
          },
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Search",
            labelKey: "PT_HOME_SEARCH_RESULTS_BUTTON_SEARCH",
          }),
        },
        onClickDefination: {
          action: "condition",
          callBack: propertySearch,
        },
      },
    }),
  }),
});

export const searchApplicationDetails = getCommonCard({
  subHeader: getCommonTitle({
    labelName: "Search Assesse",
    labelKey: "Search Assesse",
  }),

  subParagraph: getCommonParagraph({
    labelName:
      "Provide at least one non-mandatory parameter to search for an application",
    labelKey:
      "Provide at least one non-mandatory parameter to search for an application",
  }),
  
  appNumberContainer: getCommonContainer({
    propertyTaxApplicationNo: getTextField({
      label: {
        labelName: "Application No",
        labelKey: "Application No",
      },
      placeholder: {
        labelName: "Enter Application No",
        labelKey: "Enter Application No",
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_APPLICATION_NO",
      jsonPath: "ptSearchScreen.acknowledgementIds",
    }),

    ownerMobNoProp: getTextField({
      label: {
        labelName: "Owner Mobile No.",
        labelKey: "Owner Mobile No.",
      },
      placeholder: {
        labelName: "Enter your mobile No.",
        labelKey: "Enter your mobile No.",
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      iconObj: {
        label: "+91 |",
        position: "start",
      },
      required: false,
      pattern: getPattern("MobileNo"),
      jsonPath: "ptSearchScreen.mobileNumber",
      errorMessage: "Enter Valid Mobile No.",
    }),

    applicationPropertyTaxUniqueId: getTextField({
      label: {
        labelName: "Assesse Number",
        labelKey: "Assesse Number",
      },
      placeholder: {
        labelName: "Enter Assesse Number",
        labelKey: "Enter Assesse Number",
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_PROPERTY_ID",
      jsonPath: "ptSearchScreen.ids",
    }),
  }),

  button: getCommonContainer({
    buttonContainer: getCommonContainer({
      resetButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6,
          // align: "center"
        },
        props: {
          variant: "outlined",
          style: {
            color: "black",
            borderColor: "black",
            width: "220px",
            height: "48px",
            margin: "8px",
            float: "right",
          },
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Reset",
            labelKey: "Reset",
          }),
        },
        onClickDefination: {
          action: "condition",
          callBack: resetFields,
        },
      },

      searchButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6,
          // align: "center"
        },
        props: {
          variant: "contained",
          style: {
            color: "white",
            margin: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
            borderRadius: "2px",
            width: "220px",
            height: "48px",
          },
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Search",
            labelKey: "Search",
          }),
        },
        onClickDefination: {
          action: "condition",
          callBack: applicationSearch,
        },
      },
    }),
  }),
});

export const searchProperty = getCommonContainer({
  searchPropertyDetails,
});

export const searchApplication = getCommonContainer({
  searchApplicationDetails,
});
