import {
  getDateField,
  getSelectField,
  getTimeField,
  getCommonCard,
  getCommonTitle,
  getCommonContainer,
  getCommonHeader,
  getCommonSubHeader,
  getCommonParagraph,
  getLabel,
  getPattern,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { searchViewDetailsTable } from "./searchViewDetails";
// import {
//   applicationSearch,
//   propertySearch,
//   noticeSearch,
// } from "../pt-hearing/functions";
import get from "lodash/get";
import {
  toggleSnackbar,
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
// import { getSearchResults } from "../../../../ui-utils/commons";
import { assesseeSearchHearingNoticeView } from "../pt-hearing/functions";

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

const subheader = getCommonSubHeader({ 
  labelName: "Please provide at least one non-mandatory field to search.",
});

export const searchHearingNoticeHandler = async (state, dispatch) => {
  let assesseeNo = get(
    state.screenConfiguration.preparedFinalObject,
    "hearingNoticeViewSearch.assesseeNo"
  );

  if (assesseeNo == "") {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill Assessee no.",
          labelKey: "Please fill Assessee no.",
        },
        "warning"
      )
    );
  } else {
    assesseeSearchHearingNoticeView(state, dispatch);
  }
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "hearingNoticeViewSearch",

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search",
      },
      children: {
        safFormCDetailHeaderC: getCommonHeader({
          labelName: "Hearing Notice View",
          labelKey: "Hearing Notice View",
          gridDefination: {
            xs: 12,
            sm: 12,
          },
        }),

        searchNotice: getCommonCard({
          subheader: subheader,
          searchNoticeContainer: getCommonContainer({
            assesseeNo: getTextField({
              label: {
                labelKey: "Assessee No",
              },
              placeholder: {
                labelKey: "Assessee No",
              },
              required: false,
              visible: true,
              jsonPath: "hearingNoticeViewSearch.assesseeNo",
              gridDefination: {
                xs: 12,
                sm: 4,
              },
            }),

            wardNo: getTextField({
              label: {
                labelKey: "Ward No",
              },
              placeholder: {
                labelKey: "Ward No",
              },
              required: false,
              visible: true,
              jsonPath: "hearingNoticeViewSearch.wardNo",

              gridDefination: {
                xs: 12,
                sm: 4,
              },
            }),

            proposedQtr: getTextField({
              label: {
                labelKey: "Proposed Qtr",
              },
              placeholder: {
                labelKey: "Proposed Qtr",
              },
              required: false,
              visible: true,
              jsonPath: "hearingNoticeViewSearch.proposedQtr",

              gridDefination: {
                xs: 12,
                sm: 4,
              },
            }),
          }),

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
                callBack: searchHearingNoticeHandler,
              },
            },
          }),
        }),

        searchViewDetailsTable,
      },
    },
  },
};

export default screenConfig;
