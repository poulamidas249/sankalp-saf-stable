import React from "react";
import { Button } from "components";

import ComplaintTypeCard from "../ComplaintType";

const CloseComplaintForm = ({ formKey, localizationLabels, handleFieldChange, form, categories }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <div className="add-complaint-main-cont form-without-button-cont-generic">
     
      <ComplaintTypeCard
        localizationLabels={localizationLabels}
        categories={categories}
        department = {fields.department}
       complaintType={fields.complaintType}
        handleFieldChange={handleFieldChange}
        startDate={fields.startDate}
        toDate={fields.toDate}
        mohalla={fields.mohalla}
      />
     
     
      <div className="responsive-action-button-cont ">
        <Button
          primary={true}
          label={"Submit"}
          fullWidth={true}
          style={{ boxShadow: "0 2px 5px 0 rgba(100, 100, 100, 0.5), 0 2px 10px 0 rgba(167, 167, 167, 0.5)" }}
          {...submit}
          className="responsive-action-button"
        />
      </div>
    </div>
  );
};

export default CloseComplaintForm;
