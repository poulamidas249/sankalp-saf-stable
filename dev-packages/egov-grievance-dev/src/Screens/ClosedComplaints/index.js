import React, { Component } from "react";
import { connect } from "react-redux";
import { Screen } from "modules/common";

import { Complaints } from "modules/common";
import Label from "egov-ui-kit/utils/translationNode";
import { AutoSuggestDropdown,DatePicker,Button,Tabs, Card, TextField, Icon } from "components";
import { fetchComplaints ,fetchCloseComplaints} from "egov-ui-kit/redux/complaints/actions";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  transformComplaintForComponent,
  //transformById,
  fetchFromLocalStorage
} from "egov-ui-kit/utils/commons";


import orderby from "lodash/orderBy";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
import { httpRequest } from "egov-ui-kit/utils/api";
import { handleFieldChange } from "egov-ui-kit/redux/form/actions";
import { getTenantId, getPGRSector, setPGRSector,getCloseComplaintsCount } from "egov-ui-kit/utils/localStorageUtils";
import formHoc from "egov-ui-kit/hocs/form";
import "./index.css";
import CloseComplaintForm from "./components/CloseComplaintForm";
import { async } from "babel-runtime/regenerator";
import isEmpty from "lodash/isEmpty";
const mergeServiceWithActions = (payload) => {
  return (
    payload &&
    payload.actionHistory &&
    payload.actionHistory.reduce((result, item, index) => {
      if (!isEmpty(item) && !isEmpty(item.actions) && payload.services[index]) {
        result.push({
          ...payload.services[index],
          actions: item.actions,
        });
      }
      return result;
    }, [])
  );
};
const transformById = (payload, id) => {
  return (
    payload &&
    payload.reduce((result, item) => {
      if (!item.hasOwnProperty("active") || (item.hasOwnProperty("active") && item.active)) {
        result[item[id]] = {
          ...item,
        };
      }

      return result;
    }, {})
  );
};
const imageStyles = {
  maxHeight: "100px",
  minHeight: "100px",
};

const callIconStyle = {
  marginLeft: "17px",
  height: "17px",
  width: "17px",
  borderRadius: "50%",
  position: "relative",
  top: "2px",
};

const bottomInfoTemplate = (item, role) => {
  return role !== "citizen" ? (
    <div>
      <div className="employee-bottom-info-cont">
        {(role === "ao" || role === "csr") && (
          <div className="submitted-by-text">
            {item.complaintStatus === "ASSIGNED" && item.assignedTo !== "NA" && (
              <div className="clearfix">
                <div className="inline-Localization-text">
                  <Label containerStyle={{ display: "inline-block" }} fontSize={12} label="ES_ALL_COMPLAINTS_ASSIGNED_TO" />
                  <Label
                    containerStyle={{ display: "inline-block" }}
                    fontSize={12}
                    color="#464646"
                    labelStyle={{ marginLeft: "3px" }}
                    label={item.assignedTo}
                  />
                </div>
                {item.employeePhoneNumber && (
                  <a
                    className="pgr-call-icon"
                    href={`tel:+91${item.employeePhoneNumber}`}
                    style={{ textDecoration: "none", position: "relative", display: "flex", alignItems: "flex-end" }}
                  >
                    <Icon action="communication" name="call" style={callIconStyle} color={"#22b25f"} />
                    <span style={{ marginLeft: "10px", color: "#767676", fontSize: 12, lineHeight: "12px" }}>{`+91 ${
                      item.employeePhoneNumber
                    }`}</span>
                  </a>
                )}
              </div>
            )}
          </div>
        )}
        {(role === "employee" || role === "csr") && (
          <div className="submitted-by-text">
            {item.submittedBy !== "NA" && (
              <div className="clearfix">
                <div className="inline-Localization-text">
                  <Label containerStyle={{ display: "inline-block" }} fontSize={12} label={"ES_COMMON_FILED_BY"} />
                  <Label
                    containerStyle={{ display: "inline-block" }}
                    fontSize={12}
                    color="#464646"
                    labelStyle={{ marginLeft: "3px" }}
                    label={item.submittedBy}
                  />
                </div>
                {item.citizenPhoneNumber && (
                  <a
                    className="pgr-call-icon"
                    href={`tel:+91${item.citizenPhoneNumber}`}
                    style={{ textDecoration: "none", position: "relative", display: "flex", alignItems: "flex-end" }}
                  >
                    <Icon action="communication" name="call" style={callIconStyle} color={"#22b25f"} />
                    <span style={{ marginLeft: "10px", color: "#767676", fontSize: 12, lineHeight: "12px" }}>{`+91 ${item.citizenPhoneNumber}`}</span>
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {item.escalatedTo && role !== "csr" && (
        <div className="submitted-by-text">
          Escalated To: <span style={{ color: "#464646" }}>{item.escalatedTo}</span>
        </div>
      )}
      {item.reassign && role !== "csr" && (
        <div className="employee-bottom-msg rainmaker-displayInline">
          <Label label={role === "ao" ? `${item.reassignRequestedBy}` : "CS_MYCOMPLAINTS_REASSIGN_MESSAGE2"} dark={true} fontSize={12} />
          <Label label={"CS_MYCOMPLAINTS_REASSIGN_MESSAGE1"} dark={true} containerStyle={{ marginLeft: 4 }} fontSize={12} />
        </div>
      )}
    </div>
  ) : null;
};

const getStatusAndChangeColor = (status, assignee) => {
  let statusObj = {
    style: {},
    message: "",
    containerStyle: {},
  };
  switch (status) {
    case "CS_COMMON_OPEN_UCASE":
      statusObj.style = {
        // color: "#f89a3f",
        color: "#ffffff",
      };
      statusObj.message = (
        <div>
          <Label label={"CS_COMMON_COMPLAINT"} />
          <Label className="complaint-status-reassigned" label={`CS_COMMON_RE_ASSIGNED`} />
          <Label label={"CS_MYCOMPLAINTS_TO"} />
          <Label className="complaint-assignee" label={`${assignee}`} />
        </div>
      );
      statusObj.containerStyle = {
        backgroundColor: "red",
      };
      break;
    case "CS_COMMON_CLOSED_UCASE":
      statusObj.style = {
        // color: "#5385a6",
        color: "#ffffff",
      };
      statusObj.message = (
        <div>
          <Label label={"CS_COMMON_COMPLAINT"} />
          <Label className="complaint-status-resolved" label="CS_COMMON_RESOLVED" />
          <Label label={"CS_MYCOMPLAINTS_RATE"} />
        </div>
      );
      statusObj.containerStyle = {
        backgroundColor: "#4CAF50",
      };
      break;
    case "CS_COMMON_REJECTED_UCASE":
      statusObj.style = {
        // color: "#e74c3c",
        color: "#ffffff",
      };
      statusObj.message = (
        <div>
          <Label label={"CS_MYCOMPLAINTS_COMPLAINT_PREFIX"} />
          <Label className="complaint-status-rejected" label={`CS_COMMON_REJECTED`} />
          <Label label={"CS_MYCOMPLAINTS_RATE"} />
        </div>
      );
      statusObj.containerStyle = {
        backgroundColor: "red",
      };
      break;
    default:
      statusObj.style = {
        // color: "#484848",
        color: "#ffffff",
      };
      statusObj.message = `CS_MYCOMPLAINTS_RE_ASSIGNED ${assignee}`;
      statusObj.containerStyle = {
        backgroundColor: "#4CAF50",
      };
  }
  if (status && status.toLowerCase().includes(`overdue`)) {
    statusObj.style = { color: "#e74c3c" };
    statusObj.message = "";
  }
  if (status && status.toLowerCase().includes(`left`)) {
    statusObj.style = { color: "#22b25f" };
    statusObj.message = "";
  }
  if (status && status.includes(`/`)) {
    if (["0", "1", "2", "3"].indexOf(status.split("/")[0]) > -1) {
      statusObj.style = { color: "#e74c3c" };
      statusObj.message = "";
    } else {
      statusObj.style = { color: "#22b25f" };
      statusObj.message = "";
    }
  }
  return statusObj;
};
const ComplaintCloseFilterForm = formHoc({
 // formKey: "complaint",
 // formKeyClose: "closecomplaint",
 formKey: "closecomplaint",
  isCoreConfiguration: true,
  path: "pgr/pgr-employee"
  
})(CloseComplaintForm);

class ClosedComplaints extends Component {
  constructor(props) {
    super(props);
    this.multiselectRef = React.createRef();
    this.multiDropdownStyle = {
      chips: {
        background: "#FE7A51"
      },
      searchBox: {
        border: "none",
        borderBottom: "1px solid #cccccc",
        borderRadius: "0px",
      },
      multiselectContainer: {
        color: "#FE7A51"
      },
      optionListContainer: {
        "position": "relative !important",
        "z-index": "99999"
      }
    };
  }
  selectedSector = window.localStorage.getItem('PGRSector') ? JSON.parse(getPGRSector()).map(ele => ele.value).join() : [];
  state = {
    complaintNo: "",
    mobileNo: "",
    startDate:"",
    EndDate:"",
    complaints: [],
    search: false,
    value: window.localStorage.getItem('tabValue') ? parseInt(window.localStorage.getItem('tabValue')) : 0,
    defaultSelectedSector: window.localStorage.getItem('PGRSector') ? JSON.parse(getPGRSector()) : [],
    sortPopOpen: false,
    categoriesArr : [],
    deptname:"",
    statusname:"",
    errorText: ""
  };
  style = {
    iconStyle: {
      height: "30px",
      width: "30px"
    }
  };
  componentDidMount = async () => {
    let { fetchComplaints, fetchCloseComplaints,renderCustomTitle ,prepareFinalObject} = this.props;
   // const { startDate,EndDate } = this.state;
    var _startDate =  (new Date().getTime() - (1000 * 60 * 60 * 24 * 15));
    let _endDate = (new Date().getTime() - (1000 * 60 * 60 * 24 * 0))
    let CloseComplaints =[]
    // getLocalizedLabel = (label) => {
    //   const { localizationLabels } = this.props;
    //   return getTranslatedLabel(label, localizationLabels);
    // };
  //   department = {
  //     id: "department",
  //     jsonPath: "services[0].department",
  //     floatingLabelText: "Department",// this.getLocalizedLabel("Department"),
  //     hintText:"select department",// this.getLocalizedLabel("select department"),
  //    // errorMessage: this.getLocalizedLabel("HR_DEPARTMENT_PLACEHOLDER"),
  //     boundary: true,
  //     dropDownData: [],
  //     errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
  //     errorText: "",
  // }
 
   
    // fetchComplaints([
    //   { key: "status", value: "rejected,resolved,closed" },
    //   // { key: "startDate", value: _startDate },
    //   // { key: "endDate", value: _endDate },
    // ]);
    fetchCloseComplaints([
      { key: "status", value: "rejected,resolved,closed" },
      { key: "startDate", value: _startDate },
      { key: "endDate", value: _endDate },
    ],true,false);
    
    this.setState({startDate:this.convertEpochToDate(_startDate)})
    this.setState({EndDate:this.convertEpochToDate(_endDate)})
    this.setState({statusname:"All"})
    const complaintCountRequest = [
      { key: "tenantId", value: getTenantId() },
      { key: "status", value: "closed,resolved,rejected" },
      { key: "startDate", value: _startDate },
      { key: "endDate", value: _endDate },
     
    ];
   let  payload = await httpRequest(
      "rainmaker-pgr/v1/requests/db/_count",
      "_search",
      complaintCountRequest
    );
    // CloseComplaints = transformById(mergeServiceWithActions(payload), "serviceRequestId");
    // getting tenantId from localStorage
    // let payloadCount = await httpRequest(
    //   "rainmaker-pgr/v1/requests/_count",
    //   "_search",
    //   complaintCountRequest
    // );
    let payloadCount = payload.count//getCloseComplaintsCount();
    payloadCount
      ? payloadCount
        ? renderCustomTitle(payloadCount)
        : renderCustomTitle("0")
      : renderCustomTitle("0");
      this.setState({ CloseComplaints });
  };

  onComplaintClick = complaintNo => {
    this.props.history.push(`/complaint-details/${complaintNo}`);
  };
  handleFieldChange = (Type,Value) => {
   
       const { form, handleFieldChange } = this.props;
       if(Type ==='startDate')
       handleFieldChange("complaint", "startDate", Value);
       else  if(Type ==='EndDate')
       handleFieldChange("complaint", "EndDate", Value);
       else  if(Type ==='complaintType')
       handleFieldChange("complaint", "complaintType", Value);
  }
  
  onMobileChange = e => {
    const inputValue = e.target.value;
    this.setState({ mobileNo: inputValue });
  };
  onStartDateChnage = e =>{
    const inputValue = e.target.value
    this.setState({startDate:inputValue})
  }
  onEndDateChnage = e =>{
    const inputValue = e.target.value
    this.setState({EndDate:inputValue})
  }
  onComplaintChange = e => {
    const complaintNo = e.target.value;
    this.setState({ complaintNo });
    if (complaintNo.length < 6) {
      this.setState({
        errorText: "ERR_COMPLAINT_NUMBER_SEARCH"
      });
    } else {
      this.setState({ errorText: "" });
    }
  };
  
   convertDateToEpoch = (dateString, dayStartOrEnd = "dayend") => {
    //example input format : "2018-10-02"
    try {
      const parts = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
      const DateObj = new Date(Date.UTC(parts[1], parts[2] - 1, parts[3]));
      DateObj.setMinutes(DateObj.getMinutes() + DateObj.getTimezoneOffset());
      if (dayStartOrEnd === "dayend") {
        DateObj.setHours(DateObj.getHours() + 24);
        DateObj.setSeconds(DateObj.getSeconds() - 1);
      }
      return DateObj.getTime();
    } catch (e) {
      return dateString;
    }
  };
   convertEpochToDate = dateEpoch => {
    const dateFromApi = new Date(dateEpoch);
    let month = dateFromApi.getMonth() + 1;
    let day = dateFromApi.getDate();
    let year = dateFromApi.getFullYear();
    month = (month > 9 ? "" : "0") + month;
    day = (day > 9 ? "" : "0") + day;
   // return `${day}/${month}/${year}`;
    return `${year}-${month}-${day}`;
  };
  onSearch = async() => {
    const { complaintNo, mobileNo,categoriesArr,startDate,EndDate ,statusname} = this.state;
    const { fetchComplaints,fetchCloseComplaints, toggleSnackbarAndSetText,renderCustomTitle } = this.props;
    let queryObj = [];
    let validApicall = false
    // { key: "status", value: "rejected,resolved,closed" },
    if(statusname ==='')
    {
      validApicall = false
      toggleSnackbarAndSetText(
        true,
        {
          labelName: "Please select status",
          labelKey: `Please select status`
        },
        "warning"
      );

    }
    if(complaintNo ==="" 
    && mobileNo ==="" 
    && categoriesArr.length === 0 
    && startDate ==='' 
    && EndDate ==='')
    {
      validApicall = false
      toggleSnackbarAndSetText(
        true,
        {
          labelName: "Entered at least one input field.",
          labelKey: `COMM_ERR_VALUE_AT_LEAST_ONE_INPUT`
        },
        "warning"
      );
      // if((complaintNo !=="" 
      // || mobileNo !=="" 
      // || categoriesArr.length !== 0) && (startDate ==='' 
      // && EndDate ==='') )
      // {
      //   toggleSnackbarAndSetText(
      //     true,
      //     {
      //       labelName: "Please chose start date range",
      //       labelKey: `Please chose start date range`
      //     },
      //     "warning"
      //   );
      // }
      // else{
      //   toggleSnackbarAndSetText(
      //     true,
      //     {
      //       labelName: "Entered at least one input field.",
      //       labelKey: `COMM_ERR_VALUE_AT_LEAST_ONE_INPUT`
      //     },
      //     "warning"
      //   );
      // }
      
    }
    if((complaintNo !=="" &&complaintNo.length >= 6)
    || mobileNo !=="" 
    || categoriesArr.length >0 
    //&& startDate ==='' 
    //&& EndDate ===''
    )
    {
      validApicall = true
    }
    if(EndDate!=='' && startDate ==='')
    {
      validApicall = false
      toggleSnackbarAndSetText(
        true,
        {
          labelName: "Please chose start date",
          labelKey: `COMM_ERR_VALUE_START_DATE`
        },
        "warning"
      );
    }
    if(EndDate ==='' && startDate !=='')
    {
      validApicall = false
      toggleSnackbarAndSetText(
        true,
        {
          labelName: "Please chose end date",
          labelKey: `COMM_ERR_VALUE_END_DATE`
        },
        "warning"
      );
    }
    if(EndDate !=='' && startDate!=='' )
    {
      let _startDate = this.convertDateToEpoch(startDate,"daystart");
      let _endDate = this.convertDateToEpoch(EndDate,"dayend");
      let CurDate = new Date()
      let _curDay = CurDate.getDate()
      let _curMonth = CurDate.getMonth()+1
      let _curYear = CurDate.getFullYear()
      _curMonth = (_curMonth > 9 ? "" : "0") + _curMonth;
      _curDay = (_curDay > 9 ? "" : "0") + _curDay;
      CurDate= `${_curYear}-${_curMonth}-${_curDay}`
      let CursDate = this.convertDateToEpoch(CurDate,"daystart");
      let CurEDate = this.convertDateToEpoch(CurDate,"dayend");
      if(_startDate>CursDate || _endDate > CurEDate)
      {
        validApicall = false
        toggleSnackbarAndSetText(
          true,
          {
            labelName: "Please chose end date and start date less then current date",
            labelKey: `COMM_ERR_CUR_VALUE_START_END_DATE`
          },
          "warning"
        );
      }
      else if(_startDate>_endDate)
      {
        validApicall = false
        toggleSnackbarAndSetText(
          true,
          {
            labelName: "Please chose  start date less then end date",
            labelKey: `COMM_ERR_CUR_VALUE_START_DATE`
          },
          "warning"
        );
      }
      else if(_startDate === CursDate ||_endDate === CurEDate )
      {
        validApicall = true
        queryObj.push({ key: "startDate", value: _startDate });
        queryObj.push({ key: "endDate", value: _endDate });
        // toggleSnackbarAndSetText(
        //   true,
        //   {
        //     labelName: "Please chose  start date and end date less then current date",
        //     labelKey: `COMM_ERR_CUR_VALUE_START_END_EQUAL_DATE`
        //   },
        //   "warning"
        // );
      }
      else if(_startDate<=CursDate && _endDate <= CurEDate)
      {
        validApicall = true
        queryObj.push({ key: "startDate", value: _startDate });
        queryObj.push({ key: "endDate", value: _endDate });
      }
     
       // { key: "startDate", value: _startDate },
      // { key: "endDate", value: _endDate },
    }
    
    if (complaintNo) {
      queryObj.push({ key: "serviceRequestId", value: complaintNo });
    }
    if (mobileNo) {
      queryObj.push({ key: "phone", value: mobileNo });
    }
    if(categoriesArr.length > 0){
      const allCategory = categoriesArr.map(cat => cat.label)
      queryObj.push({ key: "category", value: allCategory });
    }
    if (complaintNo) {
      if (complaintNo.length >= 6) {
        //fetchComplaints(queryObj, true, true);
      } else {
        toggleSnackbarAndSetText(
          true,
          {
            labelName: "Entered value is less than 6 characters in length.",
            labelKey: `ERR_VALUE_LESS_THAN_SIX_CHARACTERS`
          },
          "error"
        );
      }
    } else if (mobileNo) {
      //fetchComplaints(queryObj, true, true);
    }
    else if (categoriesArr.length > 0) {
     // fetchComplaints(queryObj, true, true);
    }
    let payloadCount_ =0
    if(validApicall)
    {
      let status =''
      if(statusname ==='All')
      {
        status = 'rejected,resolved,closed'
      }
      else{
        status = statusname
      }
      queryObj.push({ key: "status", value: status })
      fetchCloseComplaints(queryObj, true, false);
      let payload = await httpRequest(
        "rainmaker-pgr/v1/requests/db/_count",
        "_search",
        queryObj
      );
      let  payloadCount = payload.count;
      payloadCount
        ? payloadCount
          ? renderCustomTitle(payloadCount)
          : renderCustomTitle("0")
        : renderCustomTitle("0");
    

      //  payloadCount_ = payloadCount && payloadCount.count;
        
    }
    const complaintCountRequest = [
      { key: "tenantId", value: getTenantId() },
      { key: "status", value: "closed,resolved,rejected" },
      // { key: "startDate", value: _startDate },
      // { key: "endDate", value: _endDate },
     // {key:"category",value:"Metering"}
    ]; // getting tenantId from localStorage
   
  
  
    // if (complaintNo || mobileNo) {
    //   fetchComplaints(queryObj, true, true);
    // }
    if(payloadCount_===0)
    {
    this.setState({
      search: true,
      noComplaintMessage: "ES_MYCOMPLAINTS_NO_COMPLAINTS_ASSIGNED"
    });
  }
  };

  clearSearch = () => {
    const { fetchComplaints, fetchCloseComplaints,renderCustomTitle} = this.props;
   // fetchCloseComplaints([{ key: "status", value: "status" }],true,false);
   // renderCustomTitle("0");
    this.setState({
      mobileNo: "",
      complaintNo: "",
      search: false,
      noComplaintMessage: "",
      deptname:"",
      statusname:"All",
      EndDate:"",
      startDate:"",
      categoriesArr:[],
    });
    let callbackUrl = `${
      process.env.NODE_ENV === "production"
        ? `${window.origin}/employee`
        : window.origin
    }/closed-complaints`;
   // window.location = callbackUrl;
  };
  render() {
    const { onComplaintClick } = this;
    const { closedComplaints, role, loading ,departmentName,categories,localizationLabels,CloseComplaints,statusName} = this.props;
    const {
      mobileNo,
      startDate,
      EndDate,
      complaintNo,
      search,
      sortPopOpen,
      deptname,
      statusname,
      errorText
    } = this.state;
    const hintTextStyle = {
      letterSpacing: "0.7px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      width: "90%",
      overflow: "hidden"
    };
    console.log(this)
    console.log(this.state)
   

    return (
      <Screen loading={loading}  >
        {/* loading={loading} */}
         <div className="form-without-button-cont-generic"  >
        
         <Card
            id="complaint-search-card"
            className="complaint-search-main-card"
            textChildren={
              <div className="complaint-search-cont clearfix">
                <div className="col-xs-12" style={{ paddingLeft: 8 }}>
                  <Label
                    label="CORE_COMMON_SEARCH_COMPLAINT"
                    fontSize={16}
                    dark={true}
                    bold={true}
                  />
                </div>
                <div
                  className="col-sm-4 col-xs-12"
                  style={{ paddingLeft: 8, paddingRight: 40 }}
                >
                  <TextField
                    id="mobile-no"
                    name="mobile-no"
                    type="number"
                    value={mobileNo}
                    hintText={
                      <Label
                        label="CORE_COMMON_MOBILE_NUMBER_PLACEHOLDER"
                        color="rgba(0, 0, 0, 0.3799999952316284)"
                        fontSize={16}
                        labelStyle={hintTextStyle}
                      />
                    }
                    floatingLabelText={
                      <Label
                        key={0}
                        label="ES_CREATECOMPLAINT_MOBILE_NUMBER"
                        color="rgba(0,0,0,0.60)"
                        fontSize="12px"
                      />
                    }
                    onChange={(e, value) => this.onMobileChange(e)}
                    underlineStyle={{ bottom: 7 }}
                    underlineFocusStyle={{ bottom: 7 }}
                    hintStyle={{ width: "100%" }}
                  />
                </div>
               
                
                  <div
                  className="col-sm-3 col-xs-12"
                  style={{ paddingLeft: 8, paddingRight: 40 }}
                >
                  <TextField
                    id="startDate"
                    name="startDate"
                    type="Date"
                    value={startDate}
                    // hintText={
                    //   <Label
                    //     label="Start Date"
                    //     color="rgba(0, 0, 0, 0.3799999952316284)"
                    //     fontSize={16}
                    //     labelStyle={hintTextStyle}
                    //   />
                    // }
                    floatingLabelText={
                      <Label
                        key={0}
                        label="EVENTS_START_DATE_LABEL"
                        color="rgba(0,0,0,0.60)"
                        fontSize="12px"
                      />
                    }
                    onChange={(e, value) => this.onStartDateChnage(e)}
                    underlineStyle={{ bottom: 7 }}
                    underlineFocusStyle={{ bottom: 7 }}
                    hintStyle={{ width: "100%" }}
                  />
                </div>
                <div
                  className="col-sm-3 col-xs-12"
                  style={{ paddingLeft: 8, paddingRight: 40 }}
                >
                  <TextField
                    id="EndDate"
                    name="EndDate"
                    type="Date"
                    value={EndDate}
                    inputProps= {
                       {
                        max: new Date().toISOString().slice(0, 10),
                      }
                    }
                    // hintText={
                    //   <Label
                    //     label="Start Date"
                    //     color="rgba(0, 0, 0, 0.3799999952316284)"
                    //     fontSize={16}
                    //     labelStyle={hintTextStyle}
                    //   />
                    // }
                    floatingLabelText={
                      <Label
                        key={0}
                        label="EVENTS_END_DATE_LABEL"
                        color="rgba(0,0,0,0.60)"
                        fontSize="12px"
                      />
                    }
                    onChange={(e, value) => this.onEndDateChnage(e)}
                    underlineStyle={{ bottom: 7 }}
                    underlineFocusStyle={{ bottom: 7 }}
                    hintStyle={{ width: "100%" }}
                  />
                </div>
                <div className="col-sm-4 col-xs-12" style={{ paddingLeft: 8 }}>
                <AutoSuggestDropdown
                className="fix-for-layout-break"
                fullWidth={true}
                onChange={(chosendepartment, index) => {

                  let filterCategory = categories.filter ( cat => cat.dept === chosendepartment.value);
                  console.log("categoris\es",filterCategory)
                  this.setState({categoriesArr : filterCategory , deptname:chosendepartment.label})
               //   prepareFinalObject("AutoroutingEscalationMap.category", chosenCity.label);
                }}
               // {...this.department}
               hintText={
                <Label
                  label="Select Department"
                  color="rgba(0, 0, 0, 0.3799999952316284)"
                  fontSize={16}
                  labelStyle={hintTextStyle}
                />
              }
                floatingLabelText={
                  <Label
                    key={0}
                    label="Department"
                    color="rgba(0,0,0,0.60)"
                    fontSize={16}
                  />
                }
                dataSource={departmentName}
                value = {deptname}
                />

                  </div>
                <div className="col-sm-4 col-xs-12" style={{ paddingLeft: 8 }}>
                  <TextField
                    id="complaint-no"
                    name="complaint-no"
                    value={complaintNo}
                    hintText={
                      <Label
                        label="ES_MYCOMPLAINTS_COMPLAINT_NO"
                        color="rgba(0, 0, 0, 0.3799999952316284)"
                        fontSize={16}
                        labelStyle={hintTextStyle}
                      />
                    }
                    errorText={<Label label={errorText} color="red" />}
                    floatingLabelText={
                      <Label
                        key={1}
                        label="CS_COMPLAINT_SUBMITTED_COMPLAINT_NO"
                        color="rgba(0,0,0,0.60)"
                        fontSize="12px"
                      />
                    }
                    onChange={(e, value) => this.onComplaintChange(e)}
                    underlineStyle={{
                      bottom: 7,
                      borderBottom: "1px solid #e0e0e0"
                    }}
                    underlineFocusStyle={{
                      bottom: 7,
                      borderBottom: "1px solid #e0e0e0"
                    }}
                    hintStyle={{ width: "100%" }}
                  />
                </div>
                <div className="col-sm-4 col-xs-12" style={{ paddingLeft: 8 }}>
                <AutoSuggestDropdown
                className="fix-for-layout-break"
                fullWidth={true}
                onChange={(chosendepartment, index) => {

                 // let filterCategory = statusName.filter ( cat => cat.value === chosendepartment.value);
                  
                    this.setState({ statusname:chosendepartment.value})
               //   prepareFinalObject("AutoroutingEscalationMap.category", chosenCity.label);
                }}
               // {...this.department}
               hintText={
                <Label
                  label="Select Status"
                  color="rgba(0, 0, 0, 0.3799999952316284)"
                  fontSize={16}
                  labelStyle={hintTextStyle}
                />
              }
                floatingLabelText={
                  <Label
                    key={0}
                    label="Status"
                    color="rgba(0,0,0,0.60)"
                    fontSize={16}
                  />
                }
                dataSource={statusName}
                value = {statusname}
                />

                  </div>
                <div
                  className="col-sm-12 col-xs-12 csr-action-buttons"
                  style={{ marginTop: 10, paddingRight: 8 , textAlign: "center"}}
                >
                  <Button
                    label={
                      <Label
                        buttonLabel={true}
                        label="ES_MYCOMPLAINTS_SEARCH_BUTTON"
                      />
                    }
                    style={{ marginRight: 28, width: "36%" }}
                    backgroundColor="#fe7a51"
                    labelStyle={{
                      letterSpacing: 0.7,
                      padding: 0,
                      color: "#fff"
                    }}
                    buttonStyle={{ border: 0 }}
                    onClick={() => this.onSearch()}
                  />
                  <Button
                    label={
                      <Label
                        buttonLabel={true}
                        color="#fe7a51"
                        label="ES_MYCOMPLAINTS_CLEAR_SEARCH_BUTTON"
                      />
                    }
                    labelStyle={{
                      letterSpacing: 0.7,
                      padding: 0,
                      color: "#fe7a51"
                    }}
                    buttonStyle={{ border: "1px solid #fe7a51" }}
                    style={{ width: "36%" }}
                    onClick={() => this.clearSearch()}
                  />
                </div>
              </div>
            }
          />
        </div>
        
        <div >
          
          <Complaints
            noComplaintMessage={"COMMON_NO_COMPLAINTS_MESSAGE"}
            onComplaintClick={onComplaintClick}
           complaints={closedComplaints}
            //complaints={CloseComplaints}
            role={role}
            complaintLocation={true}
          />
          {/* {
            CloseComplaints&& CloseComplaints.map((complaint, complaintIndex) => {
              const { houseNoAndStreetName, landmark, mohalla, city, locality } = complaint.addressDetail || "";
              const complaintHeader = complaint.header && "SERVICEDEFS." + complaint.header.toUpperCase();
              return (
                <div id={"complaint-" + complaintIndex} className="complaints-card-main-cont" key={`complaint-${complaintIndex}`}>
                  <Card
                    // onClick={(e) => {
                    //   onComplaintClick(encodeURIComponent(complaint.complaintNo));
                    // }}
                    className="complaint-card"
                    textChildren={
                      <div className="complaint-card-wrapper">
                        <div className="complaint-header-cont">
                          <Label
                            className="complaint-header text-bold dark-color"
                            fontSize="16px"
                            dark={true}
                            bold={true}
                            label={complaintHeader ? complaintHeader : "Default"}
                            containerStyle={{ maxWidth: "60%" }}
                            labelStyle={{ letterSpacing: 0.7, wordWrap: "break-word", width: "100%" }}
                          />
        
                          <div
                            style={
                              role === "citizen"
                                ? {
                                    justifyContent: "center",
                                    display: "flex",
                                    borderRadius: 12,
                                    width: "25%",
                                    height: "24px",
                                    alignItems: "center",
                                    ...getStatusAndChangeColor(complaint.status.status).containerStyle,
                                  }
                                : {}
                            }
                          >
                            <Label
                              className="complaint-status-text text-bold"
                              labelStyle={{
                                whiteSpace: "pre",
                                letterSpacing: 0.7,
                                wordBreak: "normal",
        
                                ...getStatusAndChangeColor(complaint.status.status).style,
                              }}
                              // containerStyle={
                              //   role === "citizen"
                              //     ? {
                              //         width: "20%",
                              //         justifyContent: "center",
                              //         display: "flex",
                              //         ...getStatusAndChangeColor(complaint.status.status).containerStyle,
                              //       }
                              //     : {}
                              // }
                              fontSize={role === "citizen" ? 12 : 14}
                              label={complaint.status.status}
                              dynamicArray={[Math.abs(complaint.SLA)]}
                              bold={true}
                            />
                          </div>
                        </div>
                        <div className="complaint-date-cont">
                          <Icon action="action" name="date-range" />
                          <span className="complaint-date">{getDateFromEpoch(complaint.date)}</span>
                        </div>
                        <div className="complaint-number-cont">
                          <div className="complaint-number complaint-date">
                            <Label fontSize="12px" label={"CS_COMMON_COMPLAINT_NO"} />
                            <Label fontSize="12px" label={" : "} />
                            <Label fontSize="12px" label={complaint.complaintNo} className="complaint-complaint-number" />
                          </div>
                        </div>
                        {complaintLocation && complaint.addressDetail && !isEmpty(complaint.addressDetail) && (
                          <div className="rainmaker-displayInline" style={{ paddingBottom: "10px" }}>
                            <Icon className="map-icon" action="maps" name="place" style={{ marginRight: 10 }} color={"#767676"} />
                            <div className="complaint-address-display">
                              <Label
                                label={houseNoAndStreetName}
                                className="status-result-color"
                                id="complaint-details-complaint-location"
                                labelStyle={{ color: "inherit" }}
                                fontSize="12px"
                              />
                              {houseNoAndStreetName && (
                                <Label
                                  label={","}
                                  className="comma-style"
                                  id="complaint-details-complaint-location"
                                  labelStyle={{ color: "inherit" }}
                                  fontSize="16px"
                                />
                              )}
                              <Label
                                label={mohalla}
                                className="status-result-color"
                                id="complaint-details-complaint-location"
                                labelStyle={{ color: "inherit" }}
                                fontSize="12px"
                              />
                              <Label
                                label={","}
                                className="comma-style"
                                id="complaint-details-complaint-location"
                                labelStyle={{ color: "inherit" }}
                                fontSize="16px"
                              />
                              <Label
                                label={`TENANT_TENANTS_${city.toUpperCase().replace(/[.]/g, "_")}`}
                                className="status-result-color"
                                id="complaint-details-complaint-location"
                                labelStyle={{ color: "inherit" }}
                                fontSize="12px"
                              />
                              {landmark && (
                                <Label
                                  label={","}
                                  className="comma-style"
                                  id="complaint-details-complaint-location"
                                  labelStyle={{ color: "inherit" }}
                                  fontSize="16px"
                                />
                              )}
                              <Label
                                label={landmark}
                                className="status-result-color"
                                id="complaint-details-complaint-location"
                                labelStyle={{ color: "inherit" }}
                                fontSize="12px"
                              />
                            </div>
                          </div>
                        )}
        
                        {complaintLocation && complaint.address && isEmpty(complaint.addressDetail) && (
                          <div className="complaint-address-cont">
                            <Icon className="map-icon" action="maps" name="place" style={{ marginRight: 10 }} color={"#767676"} />
                            <Label fontSize="12px" color="#484848" label={complaint.address} className="complaint-address" />
                          </div>
                        )}
                        {role === "citizen" && complaint && complaint.images && complaint.images.length > 0 && (
                          <div className="complaint-image-cont">
                            {complaint.images.map((image, index) => {
                              return (
                                image && (
                                  <div className="complaint-image-wrapper" key={index}>
                                    <Image style={imageStyles} size="medium" className="complaint-image" width="100%" height={46} source={image} />{" "}
                                  </div>
                                )
                              );
                            })}
                          </div>
                        )}
                        {role === "citizen" && (
                          <Label labelStyle={{ marginLeft: "3px" }} label={complaint.status.statusMessage} className="complaint-status-text dark-color" />
                        )}
                        {bottomInfoTemplate(complaint, role)}
                      </div>
                    }
                  />
                </div>
              );
            })
          } */}
        </div>
      </Screen>
    );
  }
}

const isAssigningOfficer = roles => {
  const roleCodes = roles.map((role, index) => {
    return role.code;
  });
  return roleCodes.indexOf("GRO" || "RO") > -1 ? true : false;
};

const displayStatus = (status = "", assignee) => {
  let statusObj = {};
  if (
    status.toLowerCase() == "rejected" ||
    status.toLowerCase() == "resolved"
  ) {
    statusObj.status = `CS_COMMON_${status.toUpperCase()}_UCASE`;
  } else {
    statusObj.status = status;
  }
  if (status.toLowerCase() == "open") {
    statusObj.statusMessage = `CS_COMMON_SUBMITTED`;
  } else {
    statusObj.statusMessage = `CS_COMMON_${status.toUpperCase()}`;
  }

  return statusObj;
};

const mapStateToProps = state => {
  const { complaints, common ,CloseComplaints} = state;
  const { localizationLabels } = state.app;
  //const form = state.form["complaint"];
  const form = state.form["closecomplaint"];
//  const categories = state.complaints.categoriesById;
  const { categoriesById,complaintDepartment } = complaints;
  const { userInfo } = state.auth;
  const { citizenById, employeeById } = common || {};
  const { fetchSuccess } = complaints;
  const loading = fetchSuccess ? false : true;
  const role = isAssigningOfficer(userInfo.roles) ? "ao" : "employee";
  const transformedComplaints = transformComplaintForComponent(
    complaints,
    role,
    employeeById,
    citizenById,
    categoriesById,
    displayStatus
  );
  const closedComplaints = orderby(
    transformedComplaints.filter(
      complaint => complaint.complaintStatus === "CLOSED"
    ),
    "latestActionTime",
    "desc"
  );
  const numClosedComplaints = closedComplaints.length;
  const departmentName = complaintDepartment && Object.values(complaintDepartment).map(dept => {
    let label = dept.name;
    let value = dept.code;
    return {
        label,
        value
    }})
    let statusName = [];
    //closed,resolved,rejected
    statusName.push({label:"All",value:"All"})
    statusName.push({label:"Closed",value:"closed"})
    statusName.push({label:"Resolved",value:"resolved"})
    statusName.push({label:"Rejected",value:"rejected"})
    
    let categories =[];
    let status =[];
if(categoriesById){
  Object.values(categoriesById).forEach(category => {
    let  dept = category.department;
    let value = category.menuPath;
    let label = category.menuPath;
    const cat = {
        dept ,
        value,
        label
    }
      if(!categories.some(item => item.value === cat.value))
           categories.push(cat)
  })
}
  return { userInfo, closedComplaints, role, loading,departmentName,statusName, numClosedComplaints,categories, localizationLabels,form,CloseComplaints };
};

const mapDispatchToProps = dispatch => {
  return {
     fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria,true,false)),
     fetchCloseComplaints: (criteria) => dispatch(fetchCloseComplaints(criteria,true,false)),
    
    handleFieldChange: (formKey, fieldKey, value) =>
      dispatch(handleFieldChange(formKey, fieldKey, value)),
      toggleSnackbarAndSetText: (open, message, error) =>
      dispatch(toggleSnackbarAndSetText(open, message, error)),
      prepareFinalObject: (jsonPath, value) =>
      dispatch(prepareFinalObject(jsonPath, value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClosedComplaints);
