import React from "react";
import { Card, TextFieldIcon, TextField,AutoSuggestDropdown,DatePicker } from "components";
import { Link } from "react-router-dom";
import DownArrow from "material-ui/svg-icons/navigation/arrow-drop-down";
import "./index.css";

const ComplaintTypeField = ({ toDate = {},startDate = {}, categories, handleFieldChange, localizationLabels,department=[], complaintType = {}, mohalla, ...rest }) => {
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

            {/* {complaintType && complaintType.disabled ?
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
        } */}
            <DatePicker
             className="fix-for-layout-break"
            id="addComplaint-startDate-details"
            {...startDate}
            onChange={(e, value) => handleFieldChange("startDate", value)}
            name="startDate-details"
           // style={style}
            multiLine={false}
          />
           <DatePicker
            className="fix-for-layout-break"
            id="addComplaint-toDate-details"
            {...toDate}
            onChange={(e, value) => handleFieldChange("toDate", value)}
            name="toDate-details"
            multiLine={false}
          />
          </div>
        }
      />
    </div>
  );
};

export default ComplaintTypeField;
