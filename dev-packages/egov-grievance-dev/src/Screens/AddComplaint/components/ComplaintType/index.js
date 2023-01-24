import React from "react";
import { Card, TextFieldIcon, TextField,AutoSuggestDropdown } from "components";
import { Link } from "react-router-dom";
import DownArrow from "material-ui/svg-icons/navigation/arrow-drop-down";
import "./index.css";

const ComplaintTypeField = ({ additionalDetails = {}, categories, handleFieldChange, localizationLabels,department=[], complaintType = {}, mohalla, ...rest }) => {

  if(complaintType && complaintType.value)
  {
   // alert('1');
   if(complaintType.value ==='DEP03_Horticulture_14' || complaintType.value ==='DEP03_Horticulture_13')
   {
    let callbackUrl = `${
      process.env.NODE_ENV === "production"
        ? `${window.origin}/citizen`
        : window.origin
    }/egov-hc/servicerequest`;
     window.location = callbackUrl;
   }
   
  }
  const complainTypeMessage =
    (complaintType && complaintType.value && (localizationLabels["SERVICEDEFS." + (complaintType.value || "").toUpperCase()] || {}).message) || "";

  return (
    <div className="complaint-type-main-cont">
      <Card
        className="complaint-type-card common-padding-for-new-complaint-card"
        textChildren={
          <div>
              <AutoSuggestDropdown
              className="fix-for-layout-break"
              fullWidth={true}
              dataSource={department && department.dropDownData}
              onChange={(chosenCity, index) => {
                handleFieldChange("department", chosenCity.value);
              }}
              //onChange={(e, value, selectedValue) => handleFieldChange("city", selectedValue)}
              {...department}
            />
            <AutoSuggestDropdown
              className="fix-for-layout-break"
              fullWidth={true}
              dataSource={mohalla && mohalla.dropDownData}
              onChange={(chosenRequest, index) => {
                handleFieldChange("mohalla", chosenRequest.value);
              }}
              floatingLabelText={mohalla && mohalla.floatingLabelText}
              {...mohalla}
            />
            

            {complaintType && complaintType.disabled ?
            <Link to="/complaint-type" onClick={ (event) => event.preventDefault()}>
              <TextFieldIcon
                {...{ ...complaintType, value: complainTypeMessage }}
                iconPosition="after"
                fullWidth={true}
                Icon={DownArrow}
                iconStyle={{ marginTop: "9px" }}
                name="complaint-type"
             //   disabled={false}
                {...rest}
              />
            </Link>
            :
            <Link to="/complaint-type" >
            <TextFieldIcon
              {...{ ...complaintType, value: complainTypeMessage }}
              iconPosition="after"
              fullWidth={true}
              Icon={DownArrow}
              iconStyle={{ marginTop: "9px" }}
              name="complaint-type"
             disabled={false}
              {...rest}
            />
             </Link>
        }
            <TextField
              id="addComplaint-additional-details"
              {...additionalDetails}
              onChange={(e, value) => handleFieldChange("additionalDetails", value)}
              name="additional-details"
              multiLine={true}
            />
          </div>
        }
      />
    </div>
  );
};

export default ComplaintTypeField;
