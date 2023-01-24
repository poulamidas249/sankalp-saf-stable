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
  { value: "TRANSGENDER", label: <Label label="PT_FORM3_TRANSGENDER" /> },
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
              <Field fieldKey="name" field={fields["name"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-6">
              <Label label={"PT_FORM3_GENDER"} required fontSize={12} labelStyle={styles.labelStyle} bold={true} />
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
              <Field fieldKey="mobileNumber" field={fields["mobileNumber"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            {/* <div className="col-sm-6">
              <Field fieldKey="ownerAlterMobile" field={fields["ownerAlterMobile"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div> */}

            <div className="col-sm-6">
              <Field fieldKey="fatherOrHusbandName" field={fields["fatherOrHusbandName"]} handleFieldChange={handleFieldChange} disabled={disabled} />
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

            <div className="col-sm-6" >
              <Field fieldKey="emailId" field={fields["emailId"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-6">
              <Field fieldKey="pincode" field={fields["pincode"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-6">
              <Field fieldKey="policeStation" field={fields["policeStation"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-6">
              <Field fieldKey="postOffice" field={fields["postOffice"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-6" style={{ paddingBottom: "8px" }}>
              <Field fieldKey="address" field={fields["address"]} handleFieldChange={handleFieldChange} disabled={disabled} />
              {/* <Field
                fieldKey="isSameAsPropertyAddress"
                field={fields.isSameAsPropertyAddress}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
                containerClassName="property-corr"
              /> */}
            </div>
            <div className="col-sm-6">
              <Field fieldKey="relationship" field={fields["relationship"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>


            <div>

            </div>
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
          <div className="pt-ownerinfo-title" style={{
            display: "flex",
            alignItems: "center",
            marginTop: '10px',
            marginBottom: '15px',
            fontSize: '17px'
          }}>
            <span>{cardTitle}</span>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field fieldKey="characterofPremises" field={fields["characterofPremises"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-6">
              <Field fieldKey="acre" field={fields["acre"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div>
            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field fieldKey="bigha" field={fields["bigha"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-6">
              <Field fieldKey="chatak" field={fields["chatak"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div>
            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field fieldKey="cottah" field={fields["cottah"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-6">
              <Field fieldKey="satak" field={fields["satak"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div>
            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field fieldKey="sqMt" field={fields["sqMt"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-6">
              <Field fieldKey="sqFt" field={fields["sqFt"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div>
            </div>
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
          <div className="pt-ownerinfo-title" style={{
            display: "flex",
            alignItems: "center",
            marginTop: '10px',
            marginBottom: '15px',
            fontSize: '17px'
          }}>
            <span>{cardTitle}</span>

          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field fieldKey="buildingType" field={fields["buildingType"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-6">
              <Field fieldKey="occupancyStatus" field={fields["occupancyStatus"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field fieldKey="numberOfStories" field={fields["numberOfStories"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
            <div className="col-sm-6">
              <Field fieldKey="plotArea" field={fields["plotArea"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field fieldKey="coveredArea" field={fields["coveredArea"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-6">
              <Field fieldKey="parkingArea" field={fields["parkingArea"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-6">
              <Field fieldKey="commonArea" field={fields["commonArea"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
          </div>
          <div>
          </div>
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

const InstitutionAuthority = ({ form, formKey, handleFieldChange, cardTitle, formId, disabled }) => {
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
              <Field fieldKey="name" field={fields["name"]} handleFieldChange={handleFieldChange} disabled={disabled} />
              <Field fieldKey="mobile" field={fields["mobile"]} handleFieldChange={handleFieldChange} disabled={disabled} />
              <Field fieldKey="telephone" field={fields["telephone"]} handleFieldChange={handleFieldChange} disabled={disabled} />
              <Field fieldKey="address" field={fields["address"]} handleFieldChange={handleFieldChange} disabled={disabled} />
              <Field
                fieldKey="isSameAsPropertyAddress"
                field={fields.isSameAsPropertyAddress}
                handleFieldChange={handleFieldChange}
                disabled={disabled}
                containerClassName="property-corr"
              />
            </div>
            <div className="address">
              <Field fieldKey="designation" field={fields["designation"]} handleFieldChange={handleFieldChange} disabled={disabled} />
              <Field fieldKey="alterMobile" field={fields["alterMobile"]} handleFieldChange={handleFieldChange} disabled={disabled} />
              <Field fieldKey="email" field={fields["email"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
          </div>
        </div>
      }
    />
  );
};

const PropertyDetailsInformation = ({
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
          <div className="pt-ownerinfo-title" style={{
            display: "flex",
            alignItems: "center",
            marginTop: '10px',
            marginBottom: '15px',
            fontSize: '17px'
          }}>
            <span>{cardTitle}</span>

          </div>
          <div className={`${formKey} col-sm-12`}>
          
            <div className="col-sm-4">
              <Field fieldKey="natureOfProperty" field={fields["natureOfProperty"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-4">
              <Field fieldKey="typeOfUse" field={fields["typeOfUse"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            
            <div className="col-sm-4">
              <Field fieldKey="buildingName" field={fields["buildingName"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>

            <div className="col-sm-4">
              <Field fieldKey="floorNo" field={fields["floorNo"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-4">
              <Field fieldKey="flatNo" field={fields["flatNo"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-4">
              <Field fieldKey="natureOfUse" field={fields["natureOfUse"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
          </div>

          <div className={`${formKey} col-sm-12`}>
            
            <div className="col-sm-4">
              <Field fieldKey="occupierStatus" field={fields["occupierStatus"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-4">
              <Field fieldKey="occupierName" field={fields["occupierName"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            
            <div className="col-sm-4">
              <Field fieldKey="pRent" field={fields["pRent"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
          </div>
     

        </div>

      }
    />
  );
};
const PropertyAreaDetailsInformation = ({
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
          <div className="pt-ownerinfo-title" style={{
            display: "flex",
            alignItems: "center",
            marginTop: '10px',
            marginBottom: '15px',
            fontSize: '17px'
          }}>
            <span>{cardTitle}</span>

          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-2" style={{
              minHeight: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontSize: "14px",
              paddingTop: "12px",
              fontWeight: "400",
            }}>
              Covered Space
            </div>
            <div className="col-sm-4">
              <Field fieldKey="coveredSpace" field={fields["coveredSpace"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-3">
              <Field fieldKey="coveredSpaceUnit" field={fields["coveredSpaceUnit"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
            <div className="col-sm-3">
              <Field fieldKey="coveredSpaceSize" field={fields["coveredSpaceSize"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-2" style={{
              minHeight: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontSize: "14px",
              paddingTop: "12px",
              fontWeight: "400",
            }}>
              Open Car Parking
            </div>
            <div className="col-sm-4">
              <Field fieldKey="openCarParking" field={fields["openCarParking"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-3">
              <Field fieldKey="openCarParkingUnit" field={fields["openCarParkingUnit"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
            <div className="col-sm-3">
              <Field fieldKey="openCarParkingSize" field={fields["openCarParkingSize"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-2" style={{
              minHeight: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontSize: "14px",
              paddingTop: "12px",
              fontWeight: "400",
            }}>
              Covered Car Parking
            </div>
            <div className="col-sm-4">
              <Field fieldKey="coveredCarParking" field={fields["coveredCarParking"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-3">
              <Field fieldKey="coveredCarParkingUnit" field={fields["coveredCarParkingUnit"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
            <div className="col-sm-3">
              <Field fieldKey="coveredCarParkingSize" field={fields["coveredCarParkingSize"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-2" style={{
              minHeight: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontSize: "14px",
              paddingTop: "12px",
              fontWeight: "400",
            }}>
              Open Terrace
            </div>
            <div className="col-sm-4">
              <Field fieldKey="openTerrace" field={fields["openTerrace"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-3">
              <Field fieldKey="openTerraceUnit" field={fields["openTerraceUnit"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
            <div className="col-sm-3">
              <Field fieldKey="openTerraceSize" field={fields["openTerraceSize"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-2" style={{
              minHeight: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontSize: "14px",
              paddingTop: "12px",
              fontWeight: "400",
            }}>
              Common Space
            </div>
            <div className="col-sm-4">
              <Field fieldKey="commonSpace" field={fields["commonSpace"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-3">
              <Field fieldKey="commonSpaceUnit" field={fields["commonSpaceUnit"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
            <div className="col-sm-3">
              <Field fieldKey="commonSpaceSize" field={fields["commonSpaceSize"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-2" style={{
              minHeight: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontSize: "14px",
              paddingTop: "12px",
              fontWeight: "400",
            }}>
              Roof
            </div>
            <div className="col-sm-4">
              <Field fieldKey="roof" field={fields["roof"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-3">
              <Field fieldKey="roofUnit" field={fields["roofUnit"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
            <div className="col-sm-3">
              <Field fieldKey="roofSize" field={fields["roofSize"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-2" style={{
              minHeight: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontSize: "14px",
              paddingTop: "12px",
              fontWeight: "400",
            }}>
              Swiming Pool
            </div>
            <div className="col-sm-4">
              <Field fieldKey="swimingpool" field={fields["swimingpool"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>
            <div className="col-sm-3">
              <Field fieldKey="swimingpoolUnit" field={fields["swimingpoolUnit"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
            <div className="col-sm-3">
              <Field fieldKey="swimingpoolSize" field={fields["swimingpoolSize"]} handleFieldChange={handleFieldChange} disabled={disabled} />

            </div>
          </div>
        </div>

      }
    />
  );
};
const RoomDetailsInformation = ({
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
          <div className="pt-ownerinfo-title" style={{
            display: "flex",
            alignItems: "center",
            marginTop: '10px',
            marginBottom: '15px',
            fontSize: '17px'
          }}>
            <span>{cardTitle}</span>

          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-4">
              <Field fieldKey="bedRoom" field={fields["bedRoom"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-4">
              <Field fieldKey="covered" field={fields["covered"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-4">
              <Field fieldKey="classRoom" field={fields["classRoom"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-4">
              <Field fieldKey="garrage" field={fields["garrage"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-4">
              <Field fieldKey="shed" field={fields["shed"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-4">
              <Field fieldKey="wallShop" field={fields["wallShop"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-4">
              <Field fieldKey="hall" field={fields["hall"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-4">
              <Field fieldKey="thakurGhar" field={fields["thakurGhar"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-4">
              <Field fieldKey="verandah" field={fields["verandah"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-4">
              <Field fieldKey="stairCase" field={fields["stairCase"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-4">
              <Field fieldKey="terrace" field={fields["terrace"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-4">
              <Field fieldKey="swimingPool" field={fields["swimingPool"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-4">
              <Field fieldKey="livingDining" field={fields["livingDining"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-4">
              <Field fieldKey="bathRoom" field={fields["bathRoom"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-4">
              <Field fieldKey="mezzanine" field={fields["mezzanine"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-4">
              <Field fieldKey="office" field={fields["office"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-4">
              <Field fieldKey="shop" field={fields["shop"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-4">
              <Field fieldKey="conference" field={fields["conference"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

          </div>
          <div className={`${formKey} col-sm-12`}>
            <div className="col-sm-4">
              <Field fieldKey="healthClub" field={fields["healthClub"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-4">
              <Field fieldKey="kitchen" field={fields["kitchen"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

            <div className="col-sm-4">
              <Field fieldKey="study" field={fields["study"]} handleFieldChange={handleFieldChange} disabled={disabled} />
            </div>

          </div>
  

        </div>

      }
    />
  );
};
const PropertyRegistrationDetails = formHoc({ formKey: "propertyRegistrationDetails", path: "PropertyTaxPay", isCoreConfiguration: true })(GenericForm);
const PropertyDetailsHOC = formHoc({ formKey: "propertyDetails", path: "PropertyTaxPay", isCoreConfiguration: true })(PropertyDetailsInformation);
const PropertyAreaDetailsHOC = formHoc({ formKey: "propertyAreaDetails", path: "PropertyTaxPay", isCoreConfiguration: true })(PropertyAreaDetailsInformation);
const RoomPropertyDetails = formHoc({ formKey: "roomPropertyDetails", path: "PropertyTaxPay", isCoreConfiguration: true })(RoomDetailsInformation);
const UsageInformationHOC = formHoc({ formKey: "basicInformation", path: "PropertyTaxPay", isCoreConfiguration: true })(GenericForm);
const PropertyAddressHOC = formHoc({ formKey: "propertyAddress", path: "PropertyTaxPay", isCoreConfiguration: true })(GenericForm);
const BuildingDetailsHOC = formHoc({ formKey: "buildingDetails", path: "PropertyTaxPay", isCoreConfiguration: true })(BuildingInformation);
const LandDetailsHOC = formHoc({ formKey: "landDetails", path: "PropertyTaxPay", isCoreConfiguration: true })(LandInformation);
const TaxCalculationHOC = formHoc({ formKey: "taxCalculation", path: "PropertyTaxPay", isCoreConfiguration: true })(GenericForm);
//const PlotInformationHOC = formHoc({ formKey: "plotInformation", path: "PropertyTaxPay",isCoreConfiguration:true})(GenericForm);
const OwnershipTypeHOC = formHoc({ formKey: "ownershipType", path: "PropertyTaxPay", isCoreConfiguration: true })(GenericForm);
const OwnerInfoHOC = formHoc({ formKey: "ownerInfo", path: "PropertyTaxPay", isCoreConfiguration: true })(OwnerInformation);
const ExemptionCategoryHOC = formHoc({ formKey: "exemptionCategory", path: "PropertyTaxPay", isCoreConfiguration: true })(GenericForm);
const InstitutionHOC = formHoc({ formKey: "institutionDetails", path: "PropertyTaxPay/OwnerInformation/Institution", isCoreConfiguration: true })(
  GenericForm
);
const DynamicFormHoc = (formKey, Form) => {
  return formHoc({ formKey })(Form);
};
const InstitutionAuthorityHOC = formHoc({
  formKey: "institutionAuthority",
  path: "PropertyTaxPay/OwnerInformation/Institution",
  isCoreConfiguration: true,
})(InstitutionAuthority);

export {PropertyDetailsHOC,
  PropertyAreaDetailsHOC ,
  RoomPropertyDetails ,
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
};
