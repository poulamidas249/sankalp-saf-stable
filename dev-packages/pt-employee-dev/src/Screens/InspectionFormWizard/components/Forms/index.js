import React from "react";
import formHoc from "egov-ui-kit/hocs/form";
import GenericForm from "egov-ui-kit/common/GenericForm";
import Field from "egov-ui-kit/utils/field";
import { RadioButton, Card, Icon, ToolTipUi } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import get from "lodash/get";
import "./index.css";

const options = [
  { value: "Male", label: <Label label="PT_FORM3_MALE" /> },
  { value: "Female", label: <Label label="PT_FORM3_FEMALE" /> },
  { value: "Others", label: <Label label="Others" /> },
];

// const guardianOptions = [{ value: "Husband", label: <Label label="Husband" /> }, { value: "Father ", label: <Label label="Father" /> }];

const styles = {
  labelStyle: {
    font: "12px",
    letterSpacing: 0.6,
    marginBottom: 5,
    marginTop: 14,
  },

  radioButtonItemStyle: {
    marginBottom: "18px",
    paddingLeft: "2px",
    height: "16px",
  },
  selectedLabelStyle: {
    color: "#00bbd3",
  },
  radioButtonLabelStyle: {
    lineHeight: 1,
    marginBottom: 8,
  },
  iconStyle: {
    width: 16,
    height: 27,
  },
};

const OwnerInformation = ({
  form,
  formKey,
  handleFieldChange,
  cardTitle,
  deleteBtn,
  handleChange,
  handleGuardianChange,
  handleRemoveOwner,
  formId,
  disabled,
}) => {
  const fields = form.fields || {};
  const genderSelected = get(fields, "ownerGender.value", "Male");
  const ifHidden = get(fields, "personLiableToPayTax.visible", true);
  return (
    <Card
      textChildren={
        <div className="pt-owner-info">
          <div>
            <div>{cardTitle}</div>
            {!disabled && deleteBtn && (
              <div
                className="pt-ownerinfo-deletebtn"
                onClick={() => {
                  handleRemoveOwner(formId, formKey);
                }}
              >
                <Icon action="content" name="clear" />
              </div>
            )}
          </div>
          {/* {ifHidden && <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field fieldKey="personLiableToPayTax" field={fields["personLiableToPayTax"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
          </div>} */}

          <div className={`${formKey} col-sm-12`}>
            {/* <div className="col-sm-6">
              <Field fieldKey="premisesType" field={fields["premisesType"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div> */}
            {/* <div className="col-sm-6">
              <Field fieldKey="noOfOwners" field={fields["noOfOwners"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div> */}

            <div className="col-sm-6">
              <Field
                fieldKey="ownerName"
                field={fields["ownerName"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
            <div className="col-sm-6">
              <Label
                label={"PT_FORM3_GENDER"}
                required
                fontSize={12}
                labelStyle={styles.labelStyle}
                bold={true}
              />
              <RadioButton
                id="gender-selection"
                name="gender-selection"
                options={options}
                handleChange={(e) => {
                  handleFieldChange("ownerGender", e.target.value);
                }}
                radioButtonItemStyle={styles.radioButtonItemStyle}
                labelStyle={styles.radioButtonLabelStyle}
                selectedLabelStyle={styles.selectedLabelStyle}
                className="owner-gender-selection"
                iconStyle={styles.iconStyle}
                valueSelected={genderSelected}
                disabled={disabled}
                //  radioButtonItemStyle={styles.childrenStyle}
              />
            </div>
            <div className="col-sm-6">
              <Field
                fieldKey="ownerMobile"
                field={fields["ownerMobile"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>

            <div className="col-sm-6">
              <Field
                fieldKey="ownerEmail"
                field={fields["ownerEmail"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>

            <div className="col-sm-6">
              <Field
                fieldKey="pincode"
                field={fields["pincode"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>

            <div className="col-sm-6">
              <Field
                fieldKey="policeStation"
                field={fields["policeStation"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
            <div className="col-sm-6">
              <Field
                fieldKey="postOffice"
                field={fields["postOffice"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>

            <div className="col-sm-6" style={{ paddingBottom: "8px" }}>
              <Field
                fieldKey="ownerAddress"
                field={fields["ownerAddress"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
              {/* <Field
                fieldKey="isSameAsPropertyAddress"
                field={fields.isSameAsPropertyAddress}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
                containerClassName="property-corr"
              /> */}
            </div>

            <div className="col-sm-6">
              <Field
                fieldKey="ownerRelationship"
                field={fields["ownerRelationship"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
            <div className="col-sm-6">
              <Field
                fieldKey="ownerGuardian"
                field={fields["ownerGuardian"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>

            {/* <div className="col-sm-6">
              <Field
                fieldKey="ownerCategory"
                field={fields["ownerCategory"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
                className="ownerCategory"
              />
            </div> */}
            {/* <div className="col-sm-6 ownerCategoryIdType" style={{  display: "flex", alignItems: "center" }}>
              <Field
                fieldKey="ownerCategoryIdType"
                field={fields["ownerCategoryIdType"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
                className="ownerCategoryIdType"
              />
              {fields["ownerCategoryIdType"] && fields["ownerCategoryIdType"].toolTip && !fields["ownerCategoryIdType"].hideField && (
                <ToolTipUi id={"form-wizard-tooltip"} title={fields["ownerCategoryIdType"].toolTipMessage} />
              )}
            </div>
            <div className="col-sm-6" style={{ display: "flex", alignItems: "center" }}>
              <Field fieldKey="ownerCategoryId" field={fields["ownerCategoryId"]} handleFieldChange={handleFieldChange} disabled={disabled} />
              {fields["ownerCategoryId"] && fields["ownerCategoryId"].toolTip && !fields["ownerCategoryId"].hideField && (
                <ToolTipUi id={"form-wizard-tooltip"} title={fields["ownerCategoryId"].toolTipMessage} />
              )}
            </div> */}

            <div></div>
          </div>
        </div>
      }
    />
  );
};

const LandInformation = ({
  form,
  formKey,
  handleFieldChange,
  cardTitle,
  deleteBtn,
  handleChange,
  handleGuardianChange,
  handleRemoveOwner,
  formId,
  disabled,
}) => {
  const fields = form.fields || {};
  const genderSelected = get(fields, "ownerGender.value", "Male");
  return (
    <Card
      textChildren={
        <div className="pt-owner-info">
          <div
            className="pt-ownerinfo-title"
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              marginBottom: "15px",
              fontSize: "17px",
            }}
          >
            <span>{cardTitle}</span>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field
                fieldKey="characterofPremises"
                field={fields["characterofPremises"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
            <div className="col-sm-6">
              <Field
                fieldKey="acre"
                field={fields["acre"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
            <div></div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field
                fieldKey="bigha"
                field={fields["bigha"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
            <div className="col-sm-6">
              <Field
                fieldKey="chatak"
                field={fields["chatak"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
            <div></div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field
                fieldKey="cotah"
                field={fields["cotah"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
            <div className="col-sm-6">
              <Field
                fieldKey="satak"
                field={fields["satak"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
            <div></div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field
                fieldKey="sqMt"
                field={fields["sqMt"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
            <div className="col-sm-6">
              <Field
                fieldKey="sqFt"
                field={fields["sqFt"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
            <div></div>
          </div>
        </div>
      }
    />
  );
};

const BuildingInformation = ({
  form,
  formKey,
  handleFieldChange,
  cardTitle,
  deleteBtn,
  handleChange,
  handleGuardianChange,
  handleRemoveOwner,
  formId,
  disabled,
}) => {
  const fields = form.fields || {};
  const genderSelected = get(fields, "ownerGender.value", "Male");
  return (
    <Card
      textChildren={
        <div className="pt-owner-info">
          <div
            className="pt-ownerinfo-title"
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              marginBottom: "15px",
              fontSize: "17px",
            }}
          >
            <span>{cardTitle}</span>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field
                fieldKey="buildingType"
                field={fields["buildingType"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
            <div className="col-sm-6">
              <Field
                fieldKey="occupancyStatus"
                field={fields["occupancyStatus"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field
                fieldKey="numberOfStories"
                field={fields["numberOfStories"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
            <div className="col-sm-6">
              <Field
                fieldKey="plotArea"
                field={fields["plotArea"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field
                fieldKey="coveredArea"
                field={fields["coveredArea"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
            <div className="col-sm-6">
              <Field
                fieldKey="parkingArea"
                field={fields["parkingArea"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field
                fieldKey="commonArea"
                field={fields["commonArea"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
          </div>
          <div></div>
        </div>
      }
    />
  );
};

// const OwnerInformation = ({
//   form,
//   formKey,
//   handleFieldChange,
//   cardTitle,
//   deleteBtn,
//   handleChange,
//   handleGuardianChange,
//   handleRemoveOwner,
//   formId,
//   disabled,
//   checkBox,
// }) => {
//   const fields = form.fields || {};
//   const genderSelected = get(fields, "ownerGender.value", "Male");
//   return (
//     <Card
//       textChildren={
//         <div className="pt-owner-info">
//           <div>
//             <div>{cardTitle}</div>
//             {!disabled && deleteBtn && (
//               <div
//                 className="pt-ownerinfo-deletebtn"
//                 onClick={() => {
//                   handleRemoveOwner(formId, formKey);
//                 }}
//               >
//                 <Icon action="content" name="clear" />
//               </div>
//             )}
//           </div>
//           <div className={`${formKey} col-sm-12`}>
//             <div className="col-sm-6">
//               <Field fieldKey="ownerName" field={fields["ownerName"]} handleFieldChange={handleFieldChange} disabled={disabled} />
//             </div>
//             <div className="col-sm-6">
//               <Label label={"PT_FORM3_GENDER"} required fontSize={12} labelStyle={styles.labelStyle} bold={true} />
//               <RadioButton
//                 id="gender-selection"
//                 name="gender-selection"
//                 options={options}
//                 handleChange={(e) => {
//                   handleFieldChange("ownerGender", e.target.value);
//                 }}
//                 labelStyle={styles.radioButtonLabelStyle}
//                 selectedLabelStyle={styles.selectedLabelStyle}
//                 className="owner-gender-selection"
//                 iconStyle={styles.iconStyle}
//                 valueSelected={genderSelected}
//                 disabled={disabled}
//                 radioButtonItemStyle={styles.childrenStyle}
//               />
//             </div>
//             <div className="col-sm-6">
//               <Field fieldKey="ownerMobile" field={fields["ownerMobile"]} handleFieldChange={handleFieldChange} disabled={disabled} />
//             </div>
//             <div className="col-sm-6">
//               <Field fieldKey="ownerAlterMobile" field={fields["ownerAlterMobile"]} handleFieldChange={handleFieldChange} disabled={disabled} />
//             </div>
//             <div style={{ padding: 0 }} className="col-sm-6">
//               <div className="col-sm-6">
//                 <Field fieldKey="ownerGuardian" field={fields["ownerGuardian"]} handleFieldChange={handleFieldChange} disabled={disabled} />
//               </div>
//               <div className="col-sm-6 owner-relationship">
//                 <Field fieldKey="ownerRelationship" field={fields["ownerRelationship"]} handleFieldChange={handleFieldChange} disabled={disabled} />
//               </div>
//             </div>
//             <div className="col-sm-6">
//               <Field
//                 fieldKey="ownerCategory"
//                 field={fields["ownerCategory"]}
//                 handleFieldChange={handleFieldChange}
//                 disabled={disabled}
//                 className="ownerCategory"
//               />
//             </div>
//             <div className="col-sm-6 ownerCategoryIdType" style={{ display: "flex", alignItems: "center" }}>
//               <Field
//                 fieldKey="ownerCategoryIdType"
//                 field={fields["ownerCategoryIdType"]}
//                 handleFieldChange={handleFieldChange}
//                 disabled={disabled}
//                 className="ownerCategoryIdType"
//               />
//               {fields["ownerCategoryIdType"] && fields["ownerCategoryIdType"].toolTip && !fields["ownerCategoryIdType"].hideField && (
//                 <ToolTipUi id={"form-wizard-tooltip"} title={fields["ownerCategoryIdType"].toolTipMessage} />
//               )}
//             </div>
//             <div className="col-sm-6" style={{ display: "flex", alignItems: "center" }}>
//               <Field fieldKey="ownerCategoryId" field={fields["ownerCategoryId"]} handleFieldChange={handleFieldChange} disabled={disabled} />
//               {fields["ownerCategoryId"] && fields["ownerCategoryId"].toolTip && !fields["ownerCategoryId"].hideField && (
//                 <ToolTipUi id={"form-wizard-tooltip"} title={fields["ownerCategoryId"].toolTipMessage} />
//               )}
//             </div>
//             <div className="col-sm-6" style={{ paddingBottom: "4px", paddingTop: "2px" }}>
//               <Field fieldKey="ownerEmail" field={fields["ownerEmail"]} handleFieldChange={handleFieldChange} disabled={disabled} />
//             </div>
//             <div className="col-sm-6" style={{ paddingBottom: "8px" }}>
//               <Field fieldKey="ownerAddress" field={fields["ownerAddress"]} handleFieldChange={handleFieldChange} disabled={disabled} />
//               {!checkBox && (
//               <div>
//                 <Field
//                   fieldKey="isSameAsPropertyAddress"
//                   field={fields.isSameAsPropertyAddress}
//                   handleFieldChange={handleFieldChange}
//                   disabled={disabled}
//                   containerClassName="property-corr"
//                 />
//               </div>
//             )}
//             </div>

//           </div>
//         </div>
//       }
//     />
//   );
// };

const InstitutionAuthority = ({
  form,
  formKey,
  handleFieldChange,
  cardTitle,
  formId,
  disabled,
}) => {
  const fields = form.fields || {};
  return (
    <Card
      textChildren={
        <div className="pt-institute-authority-info">
          <div className="pt-authority-title">
            <span>
              <Icon action="social" name="person" />
            </span>
            <span>{cardTitle}</span>
          </div>
          <div className="authority-details-form">
            <div className="name-address">
              <Field
                fieldKey="name"
                field={fields["name"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
              <Field
                fieldKey="mobile"
                field={fields["mobile"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
              <Field
                fieldKey="telephone"
                field={fields["telephone"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
              <Field
                fieldKey="address"
                field={fields["address"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
              <Field
                fieldKey="isSameAsPropertyAddress"
                field={fields.isSameAsPropertyAddress}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
                containerClassName="property-corr"
              />
            </div>
            <div className="address">
              <Field
                fieldKey="designation"
                field={fields["designation"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
              <Field
                fieldKey="alterMobile"
                field={fields["alterMobile"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
              <Field
                fieldKey="email"
                field={fields["email"]}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

const PropertyRegistrationDetails = formHoc({
  formKey: "propertyRegistrationDetails",
  path: "PropertyTaxPay",
  isCoreConfiguration: true,
})(GenericForm);


const UsageInformationHOC = formHoc({
  formKey: "basicInformation",
  path: "PropertyTaxPay",
  isCoreConfiguration: true,
})(GenericForm);

const PropertyAddressHOC = formHoc({
  formKey: "propertyAddress",
  path: "PropertyTaxPay",
  isCoreConfiguration: true,
})(GenericForm);

const BuildingDetailsHOC = formHoc({
  formKey: "buildingDetails",
  path: "PropertyTaxPay",
  isCoreConfiguration: true,
})(BuildingInformation);

const LandDetailsHOC = formHoc({
  formKey: "landDetails",
  path: "PropertyTaxPay",
  isCoreConfiguration: true,
})(LandInformation);

const TaxCalculationHOC = formHoc({
  formKey: "taxCalculation",
  path: "PropertyTaxPay",
  isCoreConfiguration: true,
})(GenericForm);

const OwnershipTypeHOC = formHoc({
  formKey: "ownershipType",
  path: "PropertyTaxPay",
  isCoreConfiguration: true,
})(GenericForm);

const OwnerInfoHOC = formHoc({
  formKey: "ownerInfo",
  path: "PropertyTaxPay",
  isCoreConfiguration: true,
})(OwnerInformation);

const ExemptionCategoryHOC = formHoc({
  formKey: "exemptionCategory",
  path: "PropertyTaxPay",
  isCoreConfiguration: true,
})(GenericForm);

const InstitutionHOC = formHoc({
  formKey: "institutionDetails",
  path: "PropertyTaxPay/OwnerInformation/Institution",
  isCoreConfiguration: true,
})(GenericForm);
const DynamicFormHoc = (formKey, Form) => {
  return formHoc({ formKey })(Form);
};
const InstitutionAuthorityHOC = formHoc({
  formKey: "institutionAuthority",
  path: "PropertyTaxPay/OwnerInformation/Institution",
  isCoreConfiguration: true,
})(InstitutionAuthority);

// for Captured proposed AV screen


const PropertyRegistrationDetailsAV = formHoc({
  formKey: "propertyRegistrationDetails",
  path: "PropertyTaxPayForInspection",
  isCoreConfiguration: true,
})(GenericForm);

const UsageInformationHOCAV = formHoc({
  formKey: "basicInformation",
  path: "PropertyTaxPayForInspection",
  isCoreConfiguration: true,
})(GenericForm);

const PropertyAddressHOCAV = formHoc({
  formKey: "propertyAddress",
  path: "PropertyTaxPayForInspection",
  isCoreConfiguration: true,
})(GenericForm);

const BuildingDetailsHOCAV = formHoc({
  formKey: "buildingDetails",
  path: "PropertyTaxPayForInspection",
  isCoreConfiguration: true,
})(BuildingInformation);

const LandDetailsHOCAV = formHoc({
  formKey: "landDetails",
  path: "PropertyTaxPayForInspection",
  isCoreConfiguration: true,
})(LandInformation);

const TaxCalculationHOCAV = formHoc({
  formKey: "taxCalculation",
  path: "PropertyTaxPayForInspection",
  isCoreConfiguration: true,
})(GenericForm);

const OwnershipTypeHOCAV = formHoc({
  formKey: "ownershipType",
  path: "PropertyTaxPayForInspection",
  isCoreConfiguration: true,
})(GenericForm);

const OwnerInfoHOCAV = formHoc({
  formKey: "ownerInfo",
  path: "PropertyTaxPayForInspection",
  isCoreConfiguration: true,
})(OwnerInformation);

const ExemptionCategoryHOCAV = formHoc({
  formKey: "exemptionCategory",
  path: "PropertyTaxPayForInspection",
  isCoreConfiguration: true,
})(GenericForm);

const InstitutionHOCAV = formHoc({
  formKey: "institutionDetails",
  path: "PropertyTaxPayForInspection/OwnerInformation/Institution",
  isCoreConfiguration: true,
})(GenericForm);

const DynamicFormHocAV = (formKey, Form) => {
  return formHoc({ formKey })(Form);
};
const InstitutionAuthorityHOCAV = formHoc({
  formKey: "institutionAuthority",
  path: "PropertyTaxPayForInspection/OwnerInformation/Institution",
  isCoreConfiguration: true,
})(InstitutionAuthority);

export {
  UsageInformationHOC,
  PropertyAddressHOC,
  BuildingDetailsHOC,
  OwnershipTypeHOC,
  LandDetailsHOC,
  OwnerInfoHOC,
  TaxCalculationHOC,
  ExemptionCategoryHOC,
  DynamicFormHoc,
  PropertyRegistrationDetails,
  OwnerInformation,
  InstitutionHOC,
  InstitutionAuthorityHOC,
  InstitutionAuthorityHOCAV,
  DynamicFormHocAV,
  InstitutionHOCAV,
  ExemptionCategoryHOCAV,
  OwnerInfoHOCAV,
  TaxCalculationHOCAV,
  OwnershipTypeHOCAV,
  LandDetailsHOCAV,
  BuildingDetailsHOCAV,
  PropertyAddressHOCAV,
  UsageInformationHOCAV,
  PropertyRegistrationDetailsAV,
};
