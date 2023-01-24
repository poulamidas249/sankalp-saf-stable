import { getDateField, getSelectField,getTimeField, getCommonCard, getCommonTitle, getCommonContainer, getCommonHeader, getCommonSubHeader, getCommonParagraph, getLabel, getPattern, getTextField } from "egov-ui-framework/ui-config/screens/specs/utils";
import { searchDetailsTable } from "./searchDetails";
import { applicationSearch, propertySearch,noticeSearch } from "./functions";
import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject} from "egov-ui-framework/ui-redux/screen-configuration/actions";



export const submitApplication = async (state, dispatch) => {

  const { history } = this.props;
  history.push('/pt-mutation/hearingNoticeSearch');
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
      av:"AV",
      effectiveQuarter:"Effective Quarter",
      proposedQuarter:"proposed Quarter",
     
      
    },
  ];

  const safTableData = safDetails.map((item) => {
    return {
      assesseeNo: get(item, "assesseeNo"),
      premisesNo: get(item, "premisesNo"),
      street: get(item, "street"),
      av: get(item, "av"),
      effectiveQuarter: get(item, "effectiveQuarter"),
      proposedQuarter: get(item, "proposedQuarter"),
    };
  });

  let data = safTableData.map((item) => ({
    ["Assessee No"]: item.assesseeNo || "-",   
    ["Premises No"]: item.premisesNo || "-",
    ["Street"]: item.street || "-",
    ["AV"]: item.av || "-",
    ["Effective Quarter"]: item.effectiveQuarter || "-",
    ["proposed Quarter"]: item.proposedQuarter || "-",
  }));

  dispatch(prepareFinalObject("safSearchResult", safDetails));

  dispatch(
    handleField(
      "hearingNoticeSearch",
      "components.div.children.searchDetailsTable",
      "props.data",
      data
    )
  );
  
  dispatch(
    handleField(
      "hearingNoticeSearch",
      "components.div.children.searchDetailsTable",
      "props.tableData",
      safTableData
    )
  );
  dispatch(
    handleField(
      "hearingNoticeSearch",
      "components.div.children.searchDetailsTable",
      "props.rows",
      safTableData.length
    )
  );

  showHideTable(true, dispatch);
};


const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "hearingNoticeSearch",
      "components.div.children.searchDetailsTable",
      "visible",
      booleanHideOrShow
    )
  );
};





const screenConfig = {
  uiFramework: "material-ui",
  name: "hearingNoticeSearch",


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
          labelName: "Search Criteria",
          labelKey: "Search Criteria",
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
        jsonPath: "hearingNoticeSearch.assesseeNo",
        gridDefination: {
          xs: 12,
            sm: 4,
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
        jsonPath: "hearingNoticeSearch.wardNo",
       
        gridDefination: {
          xs: 12,
            sm: 4,
        },          
      }),

      proposedQtr: getTextField({
        label: {
          labelKey: "Proposed Qtr"
        },
        placeholder: {
          labelKey: "Proposed Qtr"
        },
        required: false,
        visible: true,
        jsonPath: "hearingNoticeSearch.proposedQtr",
        
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

  //   btn: getCommonCard({
  //   btnContainer: getCommonContainer({ 
  //     searchButton: {
  //       componentPath: "Button",
  //       gridDefination: {
  //         xs: 12,
  //         sm: 6
  //         // align: "center"
  //       },
  //       props: {
  //         variant: "contained",
  //         style: {
  //           color: "white",
  //           margin: "8px",
  //           backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
  //           borderRadius: "2px",
  //           width: "220px",
  //           height: "48px"
  //         }
  //       },
  //       children: {
  //         buttonLabel: getLabel({
  //           labelName: "Search",
  //           labelKey: "PT_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
  //         })
  //       },
  //       onClickDefination: {
  //         action: "condition",
  //         callBack: applicationSearch
  //       }
  //     },

  //     refershButton: {
  //       componentPath: "Button",
  //       gridDefination: {
  //         xs: 12,
  //         sm: 3,
  //       },
  //       props: {
  //         variant: "outlined",
  //         style: {
  //           color: "black",
  //           borderColor: "black",
  //           width: "220px",
  //           height: "48px",
  //           margin: "8px",
  //           float: "right"
  //         }
  //       },
  //       children: {
  //         buttonLabel: getLabel({
  //           labelName: "Refersh",
  //           labelKey: "Refersh"
  //         })
  //       },
  //       onClickDefination: {
  //         action: "condition",
  //         callBack: submitApplication
  //       }
  //     },


  // }),

  // }),

  searchDetailsTable

}
}
}
      
    

}

export default screenConfig ;
