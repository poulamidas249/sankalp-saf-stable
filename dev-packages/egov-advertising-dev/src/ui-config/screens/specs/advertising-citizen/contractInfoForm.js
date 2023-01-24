import {
  getDateField,
  getSelectField,
  getCommonCard,
  getCommonTitle,
  getCommonContainer,
  getCommonHeader,
  getCommonSubHeader,
  getLabel,
  getPattern,
  getTextField,
  getLabelWithValue,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import commonConfig from "config/common.js";
import get from "lodash/get";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";

import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  unMountScreen,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "../../../../ui-utils";
import store from "ui-redux/store";
import { validateFields } from "../utils/index";
//import { getPattern } from "../../../../../../../packages/lib/egov-ui-framework/ui-config/screens/specs/utils";
import {
  getQueryArg,
  showHideAdhocPopup,
} from "egov-ui-framework/ui-utils/commons";

export const showHidePopup = (state, dispatch, screenKey) => {
 // console.log("screenKey---",screenKey);
  let toggle = get(
    state.screenConfiguration.screenConfig[screenKey],
    "components.adhocDialog.props.open",
    false
  );
  dispatch(
    handleField(screenKey, "components.adhocDialog", "props.open", !toggle)
  );
};
const getName = () => {
  let state = store.getState();

  let heading = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm"
  );
  return heading;
};
export const submitApplication = async (state, dispatch) => {
  let isFormValid;
  let selectedAgencyId;
  let tenderScreenObject = state.screenConfiguration.preparedFinalObject.contractInfoForm;

  let tenderData =
  state.screenConfiguration.preparedFinalObject.tenderMasterMdmsData.tenderMaster.agencyList;
  
  if (tenderData.length > 0) {
    tenderData.forEach((item) => {
      if (item.code == tenderScreenObject.agencyId) {
        selectedAgencyId = item.id;
      }
      console.log("item.code==",item.code ,"tenderScreenObject.agencyId==", tenderScreenObject.agencyId,"item.id==",item.id)
    });
  }
  
  let screenData = state.screenConfiguration.preparedFinalObject.contractInfoForm;

  let tenderCode = screenData.tenderCode;
  let codeRegex = /^[a-zA-Z0-9\\_/\"]{1,15}$/i;

  let tenderName = screenData.tenderName;
  let nameRegex = /^[A-Za-z ]{1,15}$/i;

  let contractValue = screenData.contractValue;
  let cValueRegex = /^[0-9]{1,3}$/i;

  let description = screenData.description;
  let descriptionRegex = /^[A-Za-z ]{1,50}$/i;

  let workOrderFromDate = screenData.workOrderFromDate;

  let workOrderToDate = screenData.workOrderToDate;

  let workOrderNum = screenData.workOrderNum;
  let workOrderNumRegex = /^[A-Za-z0-9]{1,15}$/i;

  // if (tenderCode != undefined && codeRegex.test(tenderCode) && tenderName != undefined && nameRegex.test(tenderName) &&
  // description != undefined && descriptionRegex.test(description) &&  workOrderFromDate != undefined && workOrderToDate != undefined &&
  // workOrderNum != undefined && workOrderNumRegex.test(workOrderNum)
  // ) {
  if (
    tenderCode != undefined &&
    codeRegex.test(tenderCode) &&
    tenderName != undefined &&
    nameRegex.test(tenderName) &&
    contractValue != undefined &&
    cValueRegex.test(contractValue) &&
    description != undefined &&
    descriptionRegex.test(description) &&
    workOrderFromDate != undefined &&
    workOrderToDate != undefined &&
    workOrderNum != undefined &&
    workOrderNumRegex.test(workOrderNum)
  ) {
    isFormValid = true;
  } else {
    isFormValid = false;
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields",
          labelKey: "Please fill valid fields",
        },
        "error"
      )
    );
  }

 // console.log("isFormValid == ", isFormValid);
  // else{
  //   console.log("entere not sucessfully")
  //   alert("Error occurred, enter Tender code.");
  // }
  if (isFormValid) {
    
    let requestBody = state.screenConfiguration.preparedFinalObject.contractInfoForm;
    let requestData = { ...requestBody };
    requestData.agencyId = selectedAgencyId;
    let typeOfForm = state.screenConfiguration.preparedFinalObject.typeOfForm;
   // console.log("typeOfForm==",typeOfForm)
    if (typeOfForm == "New") { 
    try {
      let payload = null;
      payload = await httpRequest(
        "post",
        "/parking-services/registerTender",
        "_search",
        [],
        requestBody
      );
      console.log("payload==", payload);
      if (payload.status === "Successful") {
        alert("Contract New Record Successfully Saved");
        
        //window.location.href = "/parking-citizen/tenderMaster";
      }
      if (payload.status === "Failed") {
        alert("Error occurred, please try again.");
      }
      dispatch(prepareFinalObject("contractInfoForm", get(payload)));
    } catch (e) {
      console.log(e);
    }
   }else if (typeOfForm == "Update") {

    try {
      let payload = null;
      payload = await httpRequest(
        "post",
        "/parking-services/updateTender",
        "_search",
        [],
        requestBody
      );
      let status = payload.status;
      if (status == "Successful") {
        dispatch(prepareFinalObject("upatecontractInfoForm", get(payload)));
        alert(payload.statusDescription);
      // alert("updated")
        setRoute(`/parking-citizen/tenderMaster`);
      } else if (status == "Failed") {
        alert(payload.statusDescription);
        //alert("not updated")
      }
    } catch (e) {
      console.log(e);
    }
  
  }
  } else {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields ",
          labelKey: "Please fill valid fields ",
        },
        "error"
      )
    );
    // alert("Error occurred in the input, please try again.");
  }
};

// const header = getCommonHeader({
//   labelName: getQueryArg(window.location.href, "isNew")
//     ? "Contract Info New Record"
//     : "new",
// });
const header = getCommonHeader({
  labelName: `Contract Info ${getName()} Record`,
  labelKey: `Contract Info ${getName()} Record`,
});



export const tenderPopup = getCommonContainer({
  gridDefination: {
    xs: 10,
    sm: 10,
  },
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css",
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 12,
              },
              ...header,
            },
          },
        },
        areaContainer: getCommonCard({
          gridDefination: {
            xs: 10,
            sm: 10,
          },
          popup: getCommonContainer({

            statusDate: getLabelWithValue(
              
              {
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
                labelName: "Date",
                labelKey: "28/07/1996",
              },

              // {
              //   jsonPath: "statusDate",
              // }
            ),
            updaterName: getLabelWithValue(
              {
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
                labelName: "Updated by",
                labelKey: "Test User",
              },
              // {
              //   jsonPath: "updaterName",
              // }
            ),
            currentOnwerName: getLabelWithValue(
              {
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
                labelName: "Current Owner",
                labelKey: "Test User",
              },
              // {
              //   jsonPath: "currentOnwerName",
              // }
            ),
            currentStatus: getLabelWithValue(
              {
                gridDefination: {
                  xs: 12,
                  sm: 3,
                },
                labelName: "Status",
                labelKey: "Owner",
              },
              // {
              //   jsonPath: "currentStatus",
              // }
            ),
          }),
        }),

        // searchApplicationTable
      },

    },
  
});

const getTenderData = async (action, state, dispatch) => {
  const clickedTenderCode = get(
    state.screenConfiguration.preparedFinalObject,
    "editcontractInfoForm.clickedTenderCode",
    ""
  );

  const typeOfForm = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm",
    ""
  );
  const requestBody = { tenderCode: clickedTenderCode };

  if (typeOfForm == "New") {
    dispatch(
      prepareFinalObject("contractInfoForm", {
        tenderCode: "",
        tenderName: "",
        contractValue: "",
        description: "",
        workOrderFromDate: "",
        workOrderToDate: "",
        workOrderNum: "",
        workOrderIssueDate: "",
        agencyId:"",
        moduleId: 1,
        moduleName: "parking",
      })
    );
  } else {
    try {
      const payload = await httpRequest(
        "post",
        "/parking-services/viewTender",
        "",
        [],
        requestBody
      );
      dispatch(prepareFinalObject("tenderViewData", payload));
              // console.log("tenderPayload==",payload)
      const objectForDataView = {
        tenderCode: payload.tenderCode,
        tenderName: payload.tenderName,
        contractValue: payload.contractValue,
        description: payload.description,
        workOrderFromDate: payload.workOrderFromDate.split('T')[0],
        workOrderToDate: payload.workOrderToDate.split('T')[0],
        workOrderNum: payload.workOrderNum,
        workOrderIssueDate: payload.workOrderIssueDate.split('T')[0],
        agencyId:"",
        moduleId: 1,
        moduleName: "parking",
      };

      dispatch(prepareFinalObject("contractInfoForm", objectForDataView));
    } catch (e) {
      console.log(e);
    }
  }
};
const setDisableField = () => {
  const state = store.getState();
  let service = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm"
  );

  if (service == "true") {
    return false;
  } else {
    return true;
  }
};
const setHeader = (action, state, dispatch) => {
  setTimeout(() => {
    let state = store.getState();
    let heading = get(
      state.screenConfiguration.preparedFinalObject,
      "typeOfForm"
    );
    dispatch(
      handleField(
        "contractInfoForm",
        "components.div.children.headerDiv.children.header.children.key",
        "props.labelKey",
        `Contract Info ${heading} Record`
      )
    );
  }, 100);
};
const setFieldSet = (action, state, dispatch) => {
  setTimeout(() => {
    let state = store.getState();

    let heading = get(
      state.screenConfiguration.preparedFinalObject,
      "typeOfForm"
    );

    if (heading == "New") {
      dispatch(
        handleField(
          "contractInfoForm",
          "components.div.children.areaContainer.children.cardContent.children.contractInfoForm.children.tenderCode",
          "props.disabled",
          false
        )
      );

      dispatch(
        handleField(
          "contractInfoForm",
          "components.div.children.areaContainer.children.cardContent.children.contractInfoForm.children.tenderName",
          "props.disabled",
          false
        )
      );
    } else if (heading == "Update") {
      dispatch(
        handleField(
          "contractInfoForm",
          "components.div.children.areaContainer.children.cardContent.children.contractInfoForm.children.tenderCode",
          "props.disabled",
          true
        )
      );

      dispatch(
        handleField(
          "contractInfoForm",
          "components.div.children.areaContainer.children.cardContent.children.contractInfoForm.children.tenderName",
          "props.disabled",
          true
        )
      );
    }
  }, 100);
};
const getData = async (action, state, dispatch) => {
  await getTenderData(action, state, dispatch);
};
const getMDMSAgencyData = async (action, dispatch) => {
  try {
    let payload = null;
    payload = await httpRequest(
      "get",
      "/parking-services/getAgencyListForAllocation",
      "_search",
      [],
      {}
    );

    let types = [];
    if (payload) {
      types = payload.map((item) => {
        return {
          id: item.agencyId,
          code: item.agencyName,
        };
      });
    }

    dispatch(
      prepareFinalObject(
        "tenderMasterMdmsData.tenderMaster.agencyList",
        types
      )
    );
  } catch (e) {
    console.log(e);
  }
};
const agencyDropdown = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "contractInfoForm.agencyId",
  required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer",
    },
    label: {
      labelName: "Agency Name",
      labelKey: "Agency Name",
    },

    placeholder: {
      labelName: "Select Agency Name",
      labelKey: "Select Agency Name",
    },
    sourceJsonPath: "tenderMasterMdmsData.tenderMaster.agencyList",
    labelsFromLocalisation: true,
    suggestions: [],
    fullwidth: true,
    required: true,
    isClearable: true,
    inputLabelProps: {
      shrink: true,
    },
  },
  // afterFieldChange: (action, state, dispatch) => {
  //   dispatch(
  //     handleField(
  //       "incentiveReport",
  //       `components.div.children.billSlabSearchForm.children.cardContent.children.cityNameContainer.children.dynamicMdms`,
  //       "props.screenTenantId",
  //       action.value
  //     )
  //   );
  // },
  gridDefination: {
    xs: 12,
    sm: 4,
  },
};

const contractInfoForm = {
  uiFramework: "material-ui",
  name: "contractInfoForm",
  // beforeInitScreen: (action, state, dispatch) => {
  //   // like component did mount
  //   const newTitle = getQueryArg(window.location.href, "isNew");
  //   console.log("newTitle==", newTitle);
  //   if (newTitle === "true") {
  //     console.log("insideIf");
  //     dispatch(
  //       handleField(
  //         "contractInfoForm",
  //         "components.div.children.headerDiv.children.header.children.key",
  //         "props.labelName",
  //         "new name"
  //       )
  //     );
  //   }
  //   console.log("init method");
  //   // getDropdownData(action, state, dispatch);
  //   dispatch(prepareFinalObject("contractInfoForm", {}));
  //   dispatch(
  //     prepareFinalObject("ddValues.apiOptions", [
  //       { code: "api_value1", name: "APIOption1" },
  //       { code: "api_value2", name: "APIOption2" },
  //     ])
  //   );
  //   return action;
  // },
  beforeInitScreen: (action, state, dispatch) => {
    setHeader(action, state, dispatch);
    setFieldSet(action, state, dispatch);
    getData(action, state, dispatch);
    getMDMSAgencyData(action, dispatch);

    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css",
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6,
              },
              ...header,
            },
          },
        },
        areaContainer: getCommonCard({
          contractInfoForm: getCommonContainer({
            tenderCode: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Reference Code/Contract Code",
              },
              placeholder: {
                labelKey: "Please Enter Reference Code/Contract Code",
              },
              required: true,
              visible: true,
              disabled: setDisableField(),
              jsonPath: "contractInfoForm.tenderCode",
              // pattern: /^[A-Za-z0-9]{1,15}$/i,
              pattern: /^[a-zA-Z0-9\\_/\"]{1,15}$/i,
              errorMessage: "Invalid Reference Code/Contract Code",
              //   afterFieldChange: (action, state, dispatch) => {
              //  if(!errorMessage){
              //   dispatch(
              //     handleField(
              //       "contractInfoForm",
              //       "components.div.children.areaContainer.children.cardContent.children.contractInfoForm.children.tenderCode",
              //       "props.inputProps",
              //       action.value
              //     )
              //   );
              //  }

              // }
            }),
            tenderName: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Contract Name",
              },
              placeholder: {
                labelKey: "Please Enter Contract Name",
              },
              pattern: /^[A-Za-z ]{1,15}$/i,
              errorMessage: "Invalid Contract Name",
              required: true,
              visible: true,
              disabled: setDisableField(),
              jsonPath: "contractInfoForm.tenderName",
            }),
            
            workOrderNum: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Work Order No",
              },
              placeholder: {
                labelKey: "Please Work Order No",
              },
              required: true,
              visible: true,
              jsonPath: "contractInfoForm.workOrderNum",
              pattern: /^[A-Za-z0-9]{1,15}$/i,
              errorMessage: "Invalid Work Order No",
            }),
            workOrderFromDate: getDateField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelName: "Work Order From Date",
                labelKey: "Work Order From Date",
              },
              placeholder: {
                labelName: "Select Date",
                labelKey: "Work Order From Date",
              },
              required: true,
              pattern: getPattern("Date"),
              jsonPath: "contractInfoForm.workOrderFromDate",

              afterFieldChange: (action, state, dispatch) => {
                dispatch(
                  handleField(
                    "contractInfoForm",
                    "components.div.children.areaContainer.children.cardContent.children.contractInfoForm.children.workOrderToDate",
                    "props.inputProps",
                    { min: action.value }
                  )
                );
              },
            }),
            workOrderToDate: getDateField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelName: "Work Order To Date",
                labelKey: "Work Order To Date",
              },
              placeholder: {
                labelName: "Select Date",
                labelKey: "Work Order To Date",
              },
              required: true,
              pattern: getPattern("Date"),
              jsonPath: "contractInfoForm.workOrderToDate",
              // props:{
              //   inputProps:{
              //     max:getCurrentDate()
              //   }
              // },
            }),
            contractValue: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Work Order Value",
              },
              placeholder: {
                labelKey: "Please Enter Work Order Value",
              },
              pattern: /^[0-9]{1,3}$/i,
              errorMessage: "Invalid Work Order Value",
              visible: true,
              required: true,
              jsonPath: "contractInfoForm.contractValue",
            }),
            workOrderIssueDate: getDateField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelName: "Work Order Issue Date",
                labelKey: "Work Order Issue Date",
              },
              placeholder: {
                labelName: "Select Date",
                labelKey: "Work Order Issue Date",
              },
              required: true,
              pattern: getPattern("Date"),
              jsonPath: "contractInfoForm.workOrderIssueDate",
              afterFieldChange: (action, state, dispatch) => {
                dispatch(
                  handleField(
                    "contractInfoForm",
                    "components.div.children.areaContainer.children.cardContent.children.contractInfoForm.children.workOrderFromDate",
                    "props.inputProps",
                    { min: action.value }
                  )
                );
              },
            }),
            description: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Description",
              },
              placeholder: {
                labelKey: "Please Enter Description",
              },
              pattern: /^[A-Za-z ]{1,50}$/i,
              visible: true,
              jsonPath: "contractInfoForm.description",
            }),
            agencyDropdown:agencyDropdown,


            saveButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 12,
                align: "right",
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
                  float: "right",
                },
              },
              children: {
                buttonLabel: getLabel({
                  labelName: "Save",
                  labelKey: "Save",
                }),
              },
              onClickDefination: {
                action: "condition",
                 callBack: submitApplication,
                // callBack: (state, dispatch) => {
                //   showHidePopup(state, dispatch, "contractInfoForm");
                // },
              },
            },
          }),
        }),

        // searchApplicationTable
      },
    },
    adhocDialog: {
      uiFramework: "custom-containers",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "contractInfoForm",
      },
      children: {
        popup: tenderPopup,
      },
    },
  },
  // ...searchApplicationDetails
};

export default contractInfoForm;
