import { getDateField, getSelectField,getTimeField, getCommonCard, getCommonTitle, getCommonContainer, getCommonHeader, getCommonSubHeader, getCommonParagraph, getLabel, getPattern, getTextField } from "egov-ui-framework/ui-config/screens/specs/utils";
import { rateCardSearchDetailsTable } from "./rateCardSearchDetails";
import { applicationSearch, propertySearch } from "./functions";
import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject} from "egov-ui-framework/ui-redux/screen-configuration/actions";

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

    dispatch(prepareFinalObject(
      "ptSearchScreen.tenantId",
      ''
    ))
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
  dispatch(prepareFinalObject(
    "ptSearchScreen.acknowledgementIds",
    ''
  ))
  dispatch(
    handleField("propertySearch", ComponentJsonPath.ward, "props.errorMessage", "")
  );

  dispatch(
    handleField("propertySearch", ComponentJsonPath.ward, "props.helperText", "")
  );
  dispatch(
    handleField("propertySearch", ComponentJsonPath.ward, "props.error", false)
  );
  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.street,
      "props.value",
      ""
    )
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
  dispatch(prepareFinalObject(
    "ptSearchScreen.street",
    ''
  ))
  dispatch(prepareFinalObject(
    "ptSearchScreen.ids",
    ''
  ))
  dispatch(prepareFinalObject(
    "ptSearchScreen.mobileNumber",
    ''
  ))
  dispatch(prepareFinalObject(
    "ptSearchScreen.oldPropertyId",
    ''
  ))
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
  dispatch(prepareFinalObject(
    "ptSearchScreen.name",
    ''
  ))

  dispatch(
    handleField(
      "propertySearch",
      ComponentJsonPath.doorNo,
      "props.value",
      ""
    )
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
  dispatch(prepareFinalObject(
    "ptSearchScreen.doorNo",
    ''
  ))
};

export const searchSafHandler = async (state, dispatch) => {
 
  const safDetails = [
    {
      assesseeNo: "PT-AC-NPD-2022-04-22-1007858",
      premisesNo:"PT-AC-NPD-2022-04-22-1007858",
      street:"Bomikhal",
      hearingDate: "Hearing Date",
      noticeNo: "Notice No",
      effectiveQuarter:"Effective Quarter",
      proposedAV:"proposed AV"
    },
  ];

  const safTableData = safDetails.map((item) => {
    return {
      assesseeNo: get(item, "assesseeNo"),
      premisesNo: get(item, "premisesNo"),
      street: get(item, "street"),
      hearingDate: get(item, "hearingDate"),
      noticeNo: get(item, "noticeNo"),
      effectiveQuarter: get(item, "effectiveQuarter"),
      proposedAV: get(item, "proposedAV"),
    };
  });

  let data = safTableData.map((item) => ({
    ["Assessee No"]: item.assesseeNo || "-",   
    ["Premises No"]: item.premisesNo || "-",
    ["Street"]: item.street || "-",
    ["Hearing Date"]: item.hearingDate || "-",
    ["Notice No"]: item.noticeNo || "-",    
    ["Effective Quarter"]: item.effectiveQuarter || "-",
    ["proposed AV"]: item.proposedAV || "-",
  }));

  dispatch(prepareFinalObject("safSearchResult", safDetails));

  dispatch(
    handleField(
      "rateCardSearch",
      "components.div.children.rateCardSearchDetailsTable",
      "props.data",
      data
    )
  );
  
  dispatch(
    handleField(
      "rateCardSearch",
      "components.div.children.rateCardSearchDetailsTable",
      "props.tableData",
      safTableData
    )
  );
  dispatch(
    handleField(
      "rateCardSearch",
      "components.div.children.rateCardSearchDetailsTable",
      "props.rows",
      safTableData.length
    )
  );

  showHideTable(true, dispatch);
};


const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "rateCardSearch",
      "components.div.children.rateCardSearchDetailsTable",
      "visible",
      booleanHideOrShow
    )
  );
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "rateCardSearch",


  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search"
      },
      children: {

        safFormCDetailHeaderC: getCommonHeader({
          labelName: "Rate Card Search",
          labelKey: "Rate Card Search",
          gridDefination: {
            xs: 12,
            sm: 12,
          },        
        }),
       


  searchNotice: getCommonCard({
    searchNoticeContainer: getCommonContainer({ 
      

      assesseeNo: getTextField({
        label: {
          labelKey: "Assessee No"
        },
        placeholder: {
          labelKey: "Assessee No"
        },
        required: false,
        visible: true,
        jsonPath: "rateCardSearch.assesseeNo",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
                
      }),

      wardNo: getTextField({
        label: {
          labelKey: "Ward No"
        },
        placeholder: {
          labelKey: "Ward No"
        },
        required: false,
        visible: true,
        jsonPath: "rateCardSearch.wardNo",
       
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

  }),

  buttonContainer: getCommonContainer({
    resetButton: {
      componentPath: "Button",
      gridDefination: {
        xs: 12,
        sm: 6
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
          float: "right"
        }
      },
      children: {
        buttonLabel: getLabel({
          labelName: "Reset",
          labelKey: "Reset"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: resetFields
      }
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
        callBack: searchSafHandler,
      },
    },
  })


    }),

  

  rateCardSearchDetailsTable

}
}
}
      
    

}

export default screenConfig ;
