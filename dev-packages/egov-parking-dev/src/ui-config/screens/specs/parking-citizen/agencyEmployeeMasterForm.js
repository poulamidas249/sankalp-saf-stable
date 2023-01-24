import {
  getSelectField,
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getLabel,
  getPattern,
  getTextField,
  getDateField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "../../../../ui-utils";
import store from "ui-redux/store";

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
  let screenData =
    state.screenConfiguration.preparedFinalObject.agencyEmployeeForm;

  let agencyName = screenData.agencyName;
  let parkingLotName = screenData.parkingLotName;
  let employeeName = screenData.employeeName;
  let permanentAddress = screenData.permanentAddress;
  let permanentCity = screenData.permanentCity;
  let permanentPincode = screenData.permanentPincode;
  let temporaryAddress = screenData.temporaryAddress;
  let temporaryCity = screenData.temporaryCity;
  let temporaryPincode = screenData.temporaryPincode;
  let mobile = screenData.mobile;
  let email = screenData.email;
  let pan = screenData.pan;
  let aadhaar = screenData.aadhaar;
  let validFrom = screenData.validFrom;
  let validTo = screenData.validTo;
  // let employeeName = screenData.employeeName;
  // let codeRegex = /^[a-zA-Z0-9\\_/\"]{1,15}$/i;

  // let permanentAddress = screenData.permanentAddress;
  // let nameRegex = /^[A-Za-z ]{1,50}$/i;

  // let permanentPincode = screenData.permanentPincode;
  // let permanentPincodeRegex = /^[A-Za-z0-9]{1,15}$/i;

  // let permanentCity = screenData.permanentCity;

  // let address = screenData.address;
  // let addressRegex = /^[a-zA-Z0-9 \\,_/\"]{1,50}$/i;

  // let pincode = screenData.pincode;
  // let pincodeRegex = /^[0-9]{1,6}$/i;
  //   employeeName != undefined &&
  //   codeRegex.test(employeeName) &&
  //   permanentAddress != undefined &&
  //   nameRegex.test(permanentAddress) &&
  //   permanentCity != undefined &&
  //   permanentPincode != undefined &&
  //   permanentPincodeRegex.test(permanentPincode) &&
  //   pincode != undefined &&
  //   pincodeRegex.test(pincode) &&
  //   address != undefined &&
  //   addressRegex.test(address)
  if (
    agencyName &&
    parkingLotName &&
    employeeName &&
    permanentAddress &&
    permanentCity &&
    permanentPincode &&
    temporaryAddress &&
    temporaryCity &&
    temporaryPincode &&
    mobile &&
    email &&
    pan &&
    aadhaar &&
    validFrom &&
    validTo
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

  let selectedParkingId;

  let selectedAgencyId;

  // agency data form value
  let agencyEmployeeScreenObject =
    state.screenConfiguration.preparedFinalObject.agencyEmployeeForm;

  // agentPosMasterMdmsData.agentPosSearch.agencyDetail
  // list of parking
  let parkingData =
    state.screenConfiguration.preparedFinalObject.agencyEmployeeMasterMdmsData
      .agencyEmployeeMasterSearch.parkingDetail;

  //list of agency
  let agencyData =
    state.screenConfiguration.preparedFinalObject.agencyEmployeeMasterMdmsData
      .agencyEmployeeMasterSearch.agencyList;

  if (parkingData.length > 0) {
    parkingData.forEach((item) => {
      if (item.code == agencyEmployeeScreenObject.parkingLotName) {
        selectedParkingId = item.id;
      }
    });
  }

  if (agencyData.length > 0) {
    agencyData.forEach((item) => {
      if (item.code == agencyEmployeeScreenObject.agencyName) {
        selectedAgencyId = item.id;
      }
    });
  }
  if (isFormValid) {
    let requestBody =
      state.screenConfiguration.preparedFinalObject.agencyEmployeeForm;
    let typeOfForm = state.screenConfiguration.preparedFinalObject.typeOfForm;
    let requestData = { ...requestBody };

    requestData.parkingLotId = selectedParkingId;
    requestData.agencyId = selectedAgencyId;

     if (typeOfForm == "New") {
    try {
      let payload = null;
      payload = await httpRequest(
        "post",
        "/parking-services/registerAgencyEmployee",
        "_search",
        [],
        requestData
      );
      if (payload.status === "Successful") {
        alert("New agency Employee successfully saved");
        //window.location.href = "/parking-citizen/areaMaster";
      }
      if (payload.status === "Failed") {
        alert("Error occurred, please try again.");
      }
      dispatch(prepareFinalObject("agencyEmployeeMasterForm", get(payload)));
    } catch (e) {
      console.log(e);
    }
     } else if (typeOfForm == "Update") {
       try {
         let payload = null;
         payload = await httpRequest(
           "post",
           "/parking-services/updateAgencyEmployee",
           "_search",
           [],
           requestBody
         );
         let status = payload.status;
         if (status == "Successful") {
           dispatch(prepareFinalObject("upateAgencyEmployeeForm", get(payload)));
           alert(payload.statusDescription);
    //       // alert("updated")
    //       setRoute(`/parking-citizen/areaMaster`);
        } else if (status == "Failed") {
          alert(payload.statusDescription);
    //       //alert("not updated")
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
  labelName: `Agency Employee Master ${getName()} Record`,
  labelKey: `Agency Employee Master ${getName()} Record`,
});

const getAreaData = async (action, state, dispatch) => {
  const clickedemployeeName = get(
    state.screenConfiguration.preparedFinalObject,
    "editAgencyEmployeeForm.clickedAgencyEmployeeName",  
    ""
  );
console.log("clickedemployeeName",clickedemployeeName)
  const typeOfForm = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm",
    ""
  );
  const requestBody = { employeeId: clickedemployeeName[0] };

  if (typeOfForm == "New") {
  dispatch(
    prepareFinalObject("agencyEmployeeForm", {
      agencyName: "",
      agencyId: "",
      parkingLotName: "",
      parkingLotId: "",
      employeeName: "",
      permanentAddress: "",
      permanentCity: "",
      permanentPincode: "",
      temporaryAddress: "",
      temporaryCity: "",
      temporaryPincode: "",
      mobile: "",
      email: "",
      pan: "",
      aadhaar: "",
      validFrom: "",
      validTo: "",
      moduleId: 1,
      moduleName: "parking",
    })
  );
   } else {
     try {
       const payload = await httpRequest(
         "post",
         "/parking-services/viewAgencyEmployee",
         "",
         [],
         requestBody
       );
       console.log("EmployeePayload",payload)
       dispatch(prepareFinalObject("agencyEmployeeViewData", payload));

       const objectForDataView = {
         employeeId:payload.employeeId,
         //agencyName:payload.agencyName,
         agencyId:payload.agencyId,
        // parkingLotName:payload.parkingLotName,
         parkingLotId:payload.parkingLotId,
         employeeName: payload.employeeName,
         permanentAddress: payload.permanentAddress,
         permanentCity: payload.permanentCity,
         permanentPincode: payload.permanentPincode,
         temporaryAddress: payload.temporaryAddress,
         temporaryCity: payload.temporaryCity,
         temporaryPincode: payload.temporaryPincode,
         mobile: payload.mobile,
         email: payload.email,
         pan: payload.pan,
         aadhaar: payload.aadhaar,
         validFrom: payload.validFrom.split("T")[0],
         validTo: payload.validTo.split("T")[0],
         moduleId: 1,
         moduleName: "parking",
       };
       setTimeout(() => {
        let parkingValue = "";
        let agencyValue = "";
  
        const parkingList = get(
          state.screenConfiguration.preparedFinalObject,
          "agencyEmployeeMasterMdmsData.agencyEmployeeMasterSearch.parkingDetail",
          ""
        );
  
        const agencyList = get(
          state.screenConfiguration.preparedFinalObject,
          "agencyEmployeeMasterMdmsData.agencyEmployeeMasterSearch.agencyList",
          ""
        );
  
        if (parkingList.length > 0) {
          parkingList.map((item) => {

            if (item.code == clickedemployeeName[2]) {
              parkingValue = item.code;
              console.log("parkingValue",parkingValue)
            }
          });
        }
        if (agencyList.length > 0) {
          agencyList.map((item) => {
            if (item.code == clickedemployeeName[1]) {
              agencyValue = item.code;
            }
          });
        }
  //console.log("agencyValue",agencyValue,"parkingValue",parkingValue)
        dispatch(
          handleField(
            "agencyEmployeeMasterForm",
            "components.div.children.agencyEmployeeContainer.children.cardContent.children.agencyEmployeeForm.children.parkingLotName",
            "props.value",
            parkingValue
          )
        );
        dispatch(
          handleField(
            "agencyEmployeeMasterForm",
            "components.div.children.agencyEmployeeContainer.children.cardContent.children.agencyEmployeeForm.children.agencyName",   
             "props.value",
             agencyValue
          )
        );
      }, 500);
       dispatch(prepareFinalObject("agencyEmployeeForm", objectForDataView));
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

  if (service == "New") {
    return false;
  } else if (service == "Update") {
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
        "agencyEmployeeMasterForm",
        "components.div.children.headerDiv.children.header.children.key",
        "props.labelKey",
        `Agency Employee Master ${heading} Record`
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
          "agencyEmployeeMasterForm",
          "components.div.children.agencyEmployeeContainer.children.cardContent.children.agencyEmployeeForm.children.employeeName",
          "props.disabled",
          false
        )
      );

      dispatch(
        handleField(
          "agencyEmployeeMasterForm",
          "components.div.children.agencyEmployeeContainer.children.cardContent.children.agencyEmployeeForm.children.permanentAddress",
          "props.disabled",
          false
        )
      );
      dispatch(
        handleField(
          "agencyEmployeeMasterForm",
          "components.div.children.agencyEmployeeContainer.children.cardContent.children.agencyEmployeeForm.children.employeeId",
          "visible",
          false
        )
      );
    } else if (heading == "Update") {
      
      dispatch(
        handleField(
          "agencyEmployeeMasterForm",
          "components.div.children.agencyEmployeeContainer.children.cardContent.children.agencyEmployeeForm.children.employeeId",
          "visible",
          true
        )
      );

       dispatch(
        handleField(
          "agencyEmployeeMasterForm",
          "components.div.children.agencyEmployeeContainer.children.cardContent.children.agencyEmployeeForm.children.employeeId",
          "props.disabled",
          true
        )
      );
    }
  }, 100);
};

const getData = async (action, state, dispatch) => {
  await getAreaData(action, state, dispatch);
};

const getParkingMDMSData = async (action, dispatch) => {
  try {
    let payload = null;
    payload = await httpRequest(
      "get",
      "/parking-services/getParkingLotList",
      "_search",
      [],
      {}
    );

    let types = [];
    if (payload) {
      types = payload.map((item) => {
        return {
          id: item.parkingId,
          code: item.parkingName,
        };
      });
    }

    dispatch(
      prepareFinalObject(
        "agencyEmployeeMasterMdmsData.agencyEmployeeMasterSearch.parkingDetail",
        types
      )
    );
    console.log("parkingtypes", types);
  } catch (e) {
    console.log(e);
  }
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
      prepareFinalObject(
        "agencyEmployeeMasterMdmsData.agencyEmployeeMasterSearch.agencyList",
        types
      )
    );
    console.log("agencytypes", types);
  } catch (e) {
    console.log(e);
  }
};

const getAgencyEmployeeData = async (action, state, dispatch) => {
  const clickedAgencyEmployeeCode = get(
    state.screenConfiguration.preparedFinalObject,
    "editAgencyEmployeeForm.clickedAgencyEmployeeCode",
    ""
  );

  const typeOfForm = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm",
    ""
  );
  const requestBody = { employeeId: clickedAgencyEmployeeCode };

  if (typeOfForm == "New") {
    dispatch(
      prepareFinalObject("agencyEmployeeMasterForm", {
        agencyName: "",
        parkingLotName: "",
        employeeName: "",
        permanentAddress: "",
        permanentCity: "",
        permanentPincode: "",
        temporaryAddress: "",
        temporaryCity: "",
        temporaryPincode: "",
        mobile: "",
        email: "",
        pan: "",
        aadhaar: "",
        validFrom: "",
        validTo: "",
      })
    );
  } else {
    try {
      const payload = await httpRequest(
        "post",
        "/parking-services/viewAgencyEmployee",
        "",
        [],
        requestBody
      );
      dispatch(prepareFinalObject("agencyEmployeeViewData", payload));

      const objectForDataView = {
        employeeId:payload.employeeId,
        agencyName: payload.agencyName,
        parkingLotName: payload.parkingLotName,
        employeeName: payload.employeeName,
        permanentAddress: payload.permanentAddress,
        permanentCity: payload.permanentCity,
        permanentPincode: payload.permanentPincode,
        temporaryAddress: payload.temporaryAddress,
        temporaryCity: payload.temporaryCity,
        temporaryPincode: payload.temporaryPincode,
        mobile: payload.mobile,
        email: payload.email,
        pan: payload.pan,
        aadhaar: payload.aadhaar,
        validFrom: payload.validFrom.split("T")[0],
        validTo: payload.validTo.split("T")[0],
      };

      dispatch(
        prepareFinalObject("agencyEmployeeMasterForm", objectForDataView)
      );
    } catch (e) {
      console.log(e);
    }
  }
};

const agencyDropdown = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "agencyEmployeeForm.agencyName",
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
    sourceJsonPath:
      "agencyEmployeeMasterMdmsData.agencyEmployeeMasterSearch.agencyList",
    labelsFromLocalisation: true,
    suggestions: [],
    fullwidth: true,
    required: true,
    isClearable: true,
    inputLabelProps: {
      shrink: true,
    },
  },

  gridDefination: {
    xs: 12,
    sm: 4,
  },
};

const parkingCode = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "agencyEmployeeForm.parkingLotName",
  required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer",
    },
    label: {
      labelName: "parkingCode",
      labelKey: "Parking Lot Name",
    },

    placeholder: {
      labelName: "Select Parking Lot Name",
      labelKey: "Select Parking Lot Name",
    },
    sourceJsonPath:
      "agencyEmployeeMasterMdmsData.agencyEmployeeMasterSearch.parkingDetail",
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

const agencyEmployeeMasterForm = {
  uiFramework: "material-ui",
  name: "agencyEmployeeMasterForm",

  beforeInitScreen: (action, state, dispatch) => {
    setHeader(action, state, dispatch);
    setFieldSet(action, state, dispatch);
    getData(action, state, dispatch);
    getParkingMDMSData(action, dispatch);
    getMDMSAgencyData(action, dispatch);
    getAgencyEmployeeData(action, state, dispatch);
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
        agencyEmployeeContainer: getCommonCard({
          agencyEmployeeForm: getCommonContainer({
            employeeId: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Employee Id",
              },
              placeholder: {
                labelKey: "Please Enter Employee Id",
              },
              required: true,
              visible: setDisableField(),
              //  disabled: setDisableField(),
              jsonPath: "agencyEmployeeForm.employeeId",
              // pattern: /^[A-Za-z0-9]{1,15}$/i,
              //errorMessage: "Invalid Employee Name",
            }),
            agencyName: agencyDropdown,
            parkingLotName: parkingCode,
            employeeName: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Employee Name",
              },
              placeholder: {
                labelKey: "Please Enter Employee Name",
              },
              required: true,
              visible: true,
              //  disabled: setDisableField(),
              jsonPath: "agencyEmployeeForm.employeeName",
              // pattern: /^[A-Za-z0-9]{1,15}$/i,
              //errorMessage: "Invalid Employee Name",
            }),
            permanentAddress: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Permanent Address",
              },
              placeholder: {
                labelKey: "Please Enter Permanent Address",
              },
              required: true,
              visible: true,
              jsonPath: "agencyEmployeeForm.permanentAddress",
              // pattern: /^[A-Za-z ]{1,15}$/i,
              //errorMessage: "Invalid Permanent Address",
            }),
            permanentCity: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Permanent City",
              },
              placeholder: {
                labelKey: "Please Enter permanent City",
              },
              required: true,
              visible: true,

              jsonPath: "agencyEmployeeForm.permanentCity",
              // pattern: /^[A-Za-z0-9]{1,15}$/i,
              //errorMessage: "Invalid permanent City",
            }),
            permanentPincode: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Permanent Pincode",
              },
              placeholder: {
                labelKey: "Please Enter Permanent Pincode",
              },
              required: true,
              visible: true,

              jsonPath: "agencyEmployeeForm.permanentPincode",
              pattern: getPattern("Pincode"),
              errorMessage: "Invalid Permanent Pincode..",
            }),
            temporaryAddress: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "temporaryAddress",
              },
              placeholder: {
                labelKey: "Please temporaryAddress",
              },
              required: true,
              visible: true,
              jsonPath: "agencyEmployeeForm.temporaryAddress",
              ////pattern: ge//tPattern("temporaryAddress"),
              //errorMessage: "Invalid temporaryAddress..",
            }),
            temporaryCity: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Temporary City",
              },
              placeholder: {
                labelKey: "Please Temporary City",
              },
              required: true,
              visible: true,
              jsonPath: "agencyEmployeeForm.temporaryCity",
              ////pattern: ge//tPattern("temporaryCity"),
              //errorMessage: "Invalid Temporary City..",
            }),
            temporaryPincode: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Temporary Pincode",
              },
              placeholder: {
                labelKey: "Please Enter Temporary Pincode",
              },
              required: true,
              visible: true,
              //  disabled: setDisableField(),
              jsonPath: "agencyEmployeeForm.temporaryPincode",
              pattern: getPattern("Pincode"),
              errorMessage: "Invalid Temporary Pincode..",
            }),
            mobile: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Mobile",
              },
              placeholder: {
                labelKey: "Please Enter Mobile",
              },
              required: true,
              visible: true,
              jsonPath: "agencyEmployeeForm.mobile",
              pattern: getPattern("MobileNo"),
              errorMessage: "Invalid Mobile No..",
            }),
            email: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Email",
              },
              placeholder: {
                labelKey: "Please Enter Email",
              },
              required: true,
              visible: true,

              jsonPath: "agencyEmployeeForm.email",
              pattern: getPattern("Email"),
              errorMessage: "Invalid Email Id..",
            }),
            pan: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Pan",
              },
              placeholder: {
                labelKey: "Please Enter Pan",
              },
              required: true,
              visible: true,

              jsonPath: "agencyEmployeeForm.pan",
              pattern: getPattern("PAN"),
              errorMessage: "Invalid PAN..",
            }),
            aadhaar: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Aadhaar",
              },
              placeholder: {
                labelKey: "Please Enter Aadhaar",
              },
              required: true,
              visible: true,

              jsonPath: "agencyEmployeeForm.aadhaar",
              //pattern: /^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/i,
              // errorMessage: "Invalid Aadhaar",
            }),
            validFrom: getDateField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelName: "Valid From",
                labelKey: "Valid From",
              },
              placeholder: {
                labelName: "Select Date",
                labelKey: "Valid From",
              },
              required: true,
              // pattern: ge//tPattern("Date"),
              jsonPath: "agencyEmployeeForm.validFrom",

              afterFieldChange: (action, state, dispatch) => {
                dispatch(
                  handleField(
                    "agencyEmployeeMasterForm",
                    "components.div.children.agencyEmployeeContainer.children.cardContent.children.agencyEmployeeForm.children.validTo",
                    "props.inputProps",
                    { min: action.value }
                  )
                );
              },
            }),
            validTo: getDateField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelName: "Valid To",
                labelKey: "Valid To",
              },
              placeholder: {
                labelName: "Select Date",
                labelKey: "Valid To",
              },
              required: true,
              // pattern: ge//tPattern("Date"),
              jsonPath: "agencyEmployeeForm.validTo",
              // props:{
              //   inputProps:{
              //     max:getCurrentDate()
              //   }
              // },
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
                  labelName: "Save",
                  labelKey: "Save",
                }),
              },
              onClickDefination: {
                action: "condition",
                callBack: submitApplication,
              },
            },
          }),
        }),
      },
    },
  },
};

export default agencyEmployeeMasterForm;
