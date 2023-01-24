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

  let screenData = state.screenConfiguration.preparedFinalObject.tenderForm;

  let tenderCode = screenData.tenderCode;
  let codeRegex = /^[a-zA-Z0-9\\_/\"]{1,15}$/i;

  let tenderName = screenData.tenderName;
  let nameRegex = /^[A-Za-z0-9 ]{1,100}$/i;

  let contractValue = screenData.contractValue;
  let cValueRegex = /^[0-9]{1,13}$/i;

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
    let selectedAgencyId;
    let tenderScreenObject =
      state.screenConfiguration.preparedFinalObject.tenderForm;

    let tenderData =
      state.screenConfiguration.preparedFinalObject.tenderMasterMdmsData
        .tenderMaster.agencyList;

    if (tenderData.length > 0) {
      tenderData.forEach((item) => {
        if (item.code == tenderScreenObject.agencyId) {
          selectedAgencyId = item.id;
        }
        console.log(
          "item.code==",
          item.code,
          "tenderScreenObject.agencyId==",
          tenderScreenObject.agencyId,
          "item.id==",
          item.id
        );
      });
    }
    let requestBody = state.screenConfiguration.preparedFinalObject.tenderForm;
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
          requestData
        );
        console.log("payload==", payload);
        if (payload.status === "Successful") {
          alert("Contract New Record Successfully Saved");
          // showHidePopup(state, dispatch, "tenderMasterForm");
          //window.location.href = "/parking-citizen/tenderMaster";
        }
        if (payload.status === "Failed") {
          alert("Error occurred, please try again.");
        }
        dispatch(prepareFinalObject("tenderMasterForm", get(payload)));
      } catch (e) {
        console.log(e);
      }
    } else if (typeOfForm == "Update") {
      try {
        let payload = null;
        payload = await httpRequest(
          "post",
          "/parking-services/updateTender",
          "_search",
          [],
          requestData
        );
        let status = payload.status;
        if (status == "Successful") {
          dispatch(prepareFinalObject("upateTenderForm", get(payload)));
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

const header = getCommonHeader({
  labelName: `Contract Info ${getName()} Record`,
  labelKey: `Contract Info ${getName()} Record`,
});

export const tenderPopup = getCommonContainer({
  gridDefination: {
    xs: 12,
    sm: 12,
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
          tenderCode: getLabelWithValue(
            {
              gridDefination: {
                xs: 12,
                sm: 3,
              },
              labelName: "Tender/Contract Code",
              labelKey: "Tender/Contract Code",
            },

            {
              jsonPath: "tenderForm.tenderCode",
            }
          ),
          tenderName: getLabelWithValue(
            {
              gridDefination: {
                xs: 12,
                sm: 3,
              },
              labelName: "Tender/Contract Name",
              labelKey: "Tender/Contract Name",
            },
            {
              jsonPath: "tenderForm.tenderName",
            }
          ),
          contractValue: getLabelWithValue(
            {
              gridDefination: {
                xs: 12,
                sm: 3,
              },
              labelName: "Contract Value",
              labelKey: "Contract Value",
            },
            {
              jsonPath: "tenderForm.contractValue",
            }
          ),
          workOrderFromDate: getLabelWithValue(
            {
              gridDefination: {
                xs: 12,
                sm: 3,
              },
              labelName: "Work Order From Date",
              labelKey: "Work Order From Date",
            },
            {
              jsonPath: "tenderForm.workOrderFromDate",
            }
          ),
          workOrderToDate: getLabelWithValue(
            {
              gridDefination: {
                xs: 12,
                sm: 3,
              },
              labelName: "Work Order To Date",
              labelKey: "Work Order To Date",
            },
            {
              jsonPath: "tenderForm.workOrderToDate",
            }
          ),
          workOrderIssueDate: getLabelWithValue(
            {
              gridDefination: {
                xs: 12,
                sm: 3,
              },
              labelName: "Work Order Issue Date",
              labelKey: "Work Order Issue Date",
            },
            {
              jsonPath: "tenderForm.workOrderIssueDate",
            }
          ),
          workOrderNum: getLabelWithValue(
            {
              gridDefination: {
                xs: 12,
                sm: 3,
              },
              labelName: "Work Order Number",
              labelKey: "Work Order Number",
            },
            {
              jsonPath: "tenderForm.workOrderNum",
            }
          ),
        }),
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
              labelName: "Next",
              labelKey: "Next",
            }),
          },
          onClickDefination: {
            action: "condition",
            //callBack: submitApplication,
            callBack: (state, dispatch) => {
              dispatch(setRoute(`/parking-citizen/tenderMaster`));
            },
          },
        },
      }),

      // searchApplicationTable
    },
  },
});

const getTenderData = async (action, state, dispatch) => {
  const clickedTenderCode = get(
    state.screenConfiguration.preparedFinalObject,
    "editTenderForm.clickedTenderCode",
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
      prepareFinalObject("tenderForm", {
        tenderCode: "",
        tenderName: "",
        contractValue: "",
        description: "",
        workOrderFromDate: "",
        workOrderToDate: "",
        workOrderNum: "",
        workOrderIssueDate: "",
        agencyId: "",
        moduleId: 1,
        moduleName: "Parking",
      })
    );
  } else {
    try {
      let payload = await httpRequest(
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
        workOrderFromDate: payload.workOrderFromDate.split("T")[0],
        workOrderToDate: payload.workOrderToDate.split("T")[0],
        workOrderNum: payload.workOrderNum,
        workOrderIssueDate: payload.workOrderIssueDate.split("T")[0],
       // agencyId: "",
        moduleId: 1,
        moduleName: "Parking",
      };
      setTimeout(() => {
        let agencyValue = "";
  

  
        const agencyList = get(
          state.screenConfiguration.preparedFinalObject,
          "tenderMasterMdmsData.tenderMaster.agencyList",
          ""
        );
  

        if (agencyList.length > 0) {
          agencyList.map((item) => {
            if (item.id == payload.agencyId) {
              agencyValue = item.code;
              console.log("item.code",item.code)
            }
          });
        }
  console.log("agencyValue",agencyValue,"parkingpayload",payload)
        dispatch(
          handleField(
            "tenderMasterForm",
            "components.div.children.areaContainer.children.cardContent.children.tenderForm.children.agencyId",
             "props.value",
             agencyValue
          )
        );
      }, 500);
      dispatch(prepareFinalObject("tenderForm", objectForDataView));
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
        "tenderMasterForm",
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
          "tenderMasterForm",
          "components.div.children.areaContainer.children.cardContent.children.tenderForm.children.tenderCode",
          "props.disabled",
          false
        )
      );

      dispatch(
        handleField(
          "tenderMasterForm",
          "components.div.children.areaContainer.children.cardContent.children.tenderForm.children.tenderName",
          "props.disabled",
          false
        )
      );
    } else if (heading == "Update") {
      dispatch(
        handleField(
          "tenderMasterForm",
          "components.div.children.areaContainer.children.cardContent.children.tenderForm.children.tenderCode",
          "props.disabled",
          true
        )
      );

      // dispatch(
      //   handleField(
      //     "tenderMasterForm",
      //     "components.div.children.areaContainer.children.cardContent.children.tenderForm.children.tenderName",
      //     "props.disabled",
      //     true
      //   )
      // );
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
      // console.log("tenderpayload==",payload)
      types = payload
        .filter((data) => {
          return data.moduleId === 1;
        })
        .map((item) => {
          return {
            id: item.agencyId,
            code: item.agencyName,
          };
        });
    }

    dispatch(
      prepareFinalObject("tenderMasterMdmsData.tenderMaster.agencyList", types)
    );
  } catch (e) {
    console.log(e);
  }
};

const agencyDropdown = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "tenderForm.agencyId",
  required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer",
    },
    label: {
      labelName: "agencyId",
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

const tenderMasterForm = {
  uiFramework: "material-ui",
  name: "tenderMasterForm",
  // beforeInitScreen: (action, state, dispatch) => {
  //   // like component did mount
  //   const newTitle = getQueryArg(window.location.href, "isNew");
  //   console.log("newTitle==", newTitle);
  //   if (newTitle === "true") {
  //     console.log("insideIf");
  //     dispatch(
  //       handleField(
  //         "tenderMasterForm",
  //         "components.div.children.headerDiv.children.header.children.key",
  //         "props.labelName",
  //         "new name"
  //       )
  //     );
  //   }
  //   console.log("init method");
  //   // getDropdownData(action, state, dispatch);
  //   dispatch(prepareFinalObject("tenderForm", {}));
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
          tenderForm: getCommonContainer({
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
              jsonPath: "tenderForm.tenderCode",
              // pattern: /^[A-Za-z0-9]{1,15}$/i,
              pattern: /^[a-zA-Z0-9\\_/\"]{1,15}$/i,
              errorMessage: "Invalid Tender/Contract Code",
              //   afterFieldChange: (action, state, dispatch) => {
              //  if(!errorMessage){
              //   dispatch(
              //     handleField(
              //       "tenderMasterForm",
              //       "components.div.children.areaContainer.children.cardContent.children.tenderForm.children.tenderCode",
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
              pattern: /^[A-Za-z0-9 ]{1,100}$/i,
              errorMessage: "Invalid Tende/Contractr Name",
              required: true,
              visible: true,
              //disabled: setDisableField(),
              jsonPath: "tenderForm.tenderName",
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
              jsonPath: "tenderForm.workOrderNum",
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
              jsonPath: "tenderForm.workOrderFromDate",

              afterFieldChange: (action, state, dispatch) => {
                dispatch(
                  handleField(
                    "tenderMasterForm",
                    "components.div.children.areaContainer.children.cardContent.children.tenderForm.children.workOrderToDate",
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
              jsonPath: "tenderForm.workOrderToDate",
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
              pattern: /^[0-9]{1,13}$/i,
              errorMessage: "Invalid Work Order Value",
              visible: true,
              required: true,
              jsonPath: "tenderForm.contractValue",
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
              jsonPath: "tenderForm.workOrderIssueDate",
              afterFieldChange: (action, state, dispatch) => {
                dispatch(
                  handleField(
                    "tenderMasterForm",
                    "components.div.children.areaContainer.children.cardContent.children.tenderForm.children.workOrderFromDate",
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
              jsonPath: "tenderForm.description",
            }),
            agencyId: agencyDropdown,

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
                //   showHidePopup(state, dispatch, "tenderMasterForm");
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
        screenKey: "tenderMasterForm",
      },
      children: {
        popup: tenderPopup,
      },
    },
  },
  // ...searchApplicationDetails
};

export default tenderMasterForm;
