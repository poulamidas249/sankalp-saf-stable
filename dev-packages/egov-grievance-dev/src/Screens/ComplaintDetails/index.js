import React, { Component } from "react";
import { connect } from "react-redux";
import { Details } from "modules/common";
import { ComplaintTimeLine } from "modules/common";
import get from "lodash/get"
import { Comments } from "modules/common";
import { Screen } from "modules/common";
import { resetFiles } from "egov-ui-kit/redux/form/actions";
import { fetchComplaints } from "egov-ui-kit/redux/complaints/actions";
import { getDateFromEpoch, mapCompIDToName, isImage, fetchImages, getPropertyFromObj } from "egov-ui-kit/utils/commons";

import "./index.css";

class ComplaintDetails extends Component {
  componentDidMount() {
    let { fetchComplaints, match, resetFiles } = this.props;

    fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
    if (this.props.form && this.props.form.complaint) {
      resetFiles("complaint");
    }
  }

  render() {
    let { complaint, timeLine } = this.props.transformedComplaint;
    let { history, reopenValidChecker } = this.props;
    let action;
    if (timeLine && timeLine[0]) {
      action = timeLine[0].action;
    }
    return (
      <Screen className="citizen-screen-bottom-padding-clear">
        {complaint && (
          <div className="form-without-button-cont-generic">
            <Details {...complaint} action={action} history={history} timeLine={timeLine} />
            <ComplaintTimeLine
              status={complaint.status}
              timeLine={timeLine}
              history={history}
              feedback={complaint ? complaint.feedback : ""}
              rating={complaint ? complaint.rating : ""}
              role={"citizen"}
              reopenValidChecker={reopenValidChecker}
            />
            <Comments role={"citizen"} />
          </div>
        )}
      </Screen>
    );
  }
}
let gro = "";
const mapStateToProps = (state, ownProps) => {
  const { complaints, common, form } = state;

  const { employeeById, departmentById, designationsById, cities } = common || {};
  let selectedComplaint = complaints["byId"][decodeURIComponent(ownProps.match.params.serviceRequestId)];
  const reopenValidChecker = get(state, "common.pgrContants.RAINMAKER-PGR.UIConstants[0].REOPENSLA", 4232000000)
  if (selectedComplaint) {
    let details = {
      status: selectedComplaint.status || "",
      complaint: mapCompIDToName(complaints.categoriesById, selectedComplaint.serviceCode),
      applicationNo: selectedComplaint.serviceRequestId,
      description: selectedComplaint.description,
      submittedDate: getDateFromEpoch(selectedComplaint.auditDetails.createdTime),
      landMark: selectedComplaint.landmark,
      address: selectedComplaint.address,
      addressDetail: selectedComplaint.addressDetail ? selectedComplaint.addressDetail : {},
      images: fetchImages(selectedComplaint.actions).filter((imageSource) => isImage(imageSource)),
      feedback: selectedComplaint.feedback,
      rating: selectedComplaint.rating,
    };
    let timeLine = [];
    timeLine = selectedComplaint && selectedComplaint.actions.filter((action) => action.status && action.status);
    timeLine.map((action) => {
      if (action && action.status && action.status === "assigned") {
        let assignee = action.assignee;
        gro = action.by.split(":")[0];
        const selectedEmployee = employeeById && assignee && employeeById[assignee];
        action.employeeName = assignee && getPropertyFromObj(employeeById, assignee, "name", "");
        let designationNull = selectedEmployee && selectedEmployee.assignments[0].designation ? selectedEmployee.assignments[0].designation : "";
        action.employeeDesignation =
          selectedEmployee && getPropertyFromObj(designationsById, designationNull, "name", "");
        action.employeeDepartment = selectedEmployee && getPropertyFromObj(departmentById, selectedEmployee.assignments[0].department, "name", "");
        action.employeeMobileNumber = assignee && getPropertyFromObj(employeeById, assignee, "mobileNumber", "");
      }
      else if (action && action.status && action.status === "resolved") {
        let assignee = action.assignee;
        const empId = action.by.split(":")[0];
        const selectedEmployee = employeeById && empId && employeeById[empId];
        let designationNull = selectedEmployee && selectedEmployee.assignments[0].designation ? selectedEmployee.assignments[0].designation : "";
        action.employeeDesignation =
        selectedEmployee && getPropertyFromObj(designationsById, designationNull, "name", "");
        action.employeeName = empId && getPropertyFromObj(employeeById, empId, "name", "");
      }
      if (action && action.status && (action.status === "reassignrequested" || action.action === "reopen")) {
        action.groName = gro && getPropertyFromObj(employeeById, gro, "name", "");
        action.groMobileNumber = gro && getPropertyFromObj(employeeById, gro, "mobileNumber", "");
      }
    });
    let transformedComplaint = {
      complaint: details,
      timeLine,
    };

    return { form, transformedComplaint, reopenValidChecker };
  } else {
    return { form, transformedComplaint: {}, reopenValidChecker };
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
    resetFiles: (formKey) => dispatch(resetFiles(formKey)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComplaintDetails);
