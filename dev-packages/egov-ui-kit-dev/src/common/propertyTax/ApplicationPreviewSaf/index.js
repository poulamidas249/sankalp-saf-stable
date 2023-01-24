import { Card } from "components";
import commonConfig from "config/common.js";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import Screen from "egov-ui-kit/common/common/Screen";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, toggleSnackbar, toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";

import { toggleSnackbarAndSetText, fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { initLocalizationLabels } from "egov-ui-kit/redux/app/utils";
import { fetchGeneralMDMSData } from "egov-ui-kit/redux/common/actions";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import Label from "egov-ui-kit/utils/translationNode";
import store from "ui-redux/store";
import { FETCHASSESSMENTS, PROPERTY } from "egov-ui-kit/utils/endPoints";
import { getLocale, localStorageSet } from "egov-ui-kit/utils/localStorageUtils";
import { generatePdfFromDiv, getQueryValue } from "egov-ui-kit/utils/PTCommon";
import WorkFlowContainer from "egov-workflow/ui-containers-local/WorkFlowContainer";
import get from "lodash/get";
import { Button } from "components";
import React, { Component } from "react";
import { connect } from "react-redux";
import PTHeader from "../../common/PTHeader";
import PdfHeader from "../Property/components/PdfHeader";
import RegistrationDetailInfo from 'egov-ui-kit/common/propertyTax/Property/components/RegistrationDetailInfo';
import LandDetailsInfo from 'egov-ui-kit/common/propertyTax/Property/components/LandDetailsInfo';
import BuildingDetailsInfo from 'egov-ui-kit/common/propertyTax/Property/components/BuildingDetailsInfo';
import TaxCalculationDetialInfoForSearch from 'egov-ui-kit/common/propertyTax/Property/components/TaxCalculationDetialInfoForSearch';
import OwnerInfoForSearch from 'egov-ui-kit/common/propertyTax/Property/components/OwnerInfoForSearch';
import PropertyAddressInfo from 'egov-ui-kit/common/propertyTax/Property/components/PropertyAddressInfo';
import "./index.css";


const innerDivStyle = {
  padding: "0",
  // borderBottom: "1px solid #e0e0e0",
  marginLeft: 0,
};

const IconStyle = {
  margin: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  height: "inherit",
};

const listItemStyle = {
  padding: "0px 20px",
  borderWidth: "10px 10px 0px",
};


const appName = process.env.REACT_APP_NAME;

const locale = getLocale() || "en_IN";
const localizationLabelsData = initLocalizationLabels(locale);

class ApplicationPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pathName: null,
      dialogueOpen: false,
      urlToAppend: "",
      showAssessmentHistory: false,
      properties: {}
    };
  }

  componentDidMount = () => {


    this.fetchMasterApplication();
  };

  getSearchResults = async (queryObject, requestBody, searchURL = "/property-services/property/_search") => {
    // try {
    store.dispatch(toggleSpinner());
    const response = await httpRequest(
      "post",
      searchURL,
      "",
      queryObject,
      requestBody
    );
    store.dispatch(toggleSpinner());
    return response;
    // } catch (error) {
    //   store.dispatch(toggleSpinner());
    //   store.dispatch(
    //     toggleSnackbar(
    //       true,
    //       { labelName: error.message, labelKey: error.message },
    //       "error"
    //     )
    //   );
    //   throw error;
    // }
  };

  fetchMasterApplication = async () => {


    let query = { "tenantId": "km.kolkata", "searchType": "MASTER", "assesseeNo": getQueryArg(window.location.href, "applicationNumber") };
    console.log('query1234', query)
    let queryObject = [];
    Object.keys(query).map(key => {
      queryObject.push({
        key: key, value: query[key]
      })
    })
    const response = await this.getSearchResults(queryObject);
    console.log('responseNew1234', response)


    // let response = {
    //   "ResponseInfo": {
    //     "apiId": "Mihy",
    //     "ver": ".01",
    //     "ts": null,
    //     "resMsgId": "uief87324",
    //     "msgId": "20170310130900|en_IN",
    //     "status": "successful"
    //   },
    //   "Properties": [
    //     {
    //       "linkedUserId": null,
    //       "uaaConverted": null,
    //       "withHeldFlag": null,
    //       "legalCaseYn": null,
    //       "legalDesc": null,
    //       "excemptionApplied": null,
    //       "exemptionRate": null,
    //       "excemptionTill": null,
    //       "aapdFlag": null,
    //       "appdShare": null,
    //       "motherAssesseeNo": null,
    //       "motherPremiseNo": null,
    //       "id": "c7898d2d-7534-4c94-9444-377f495b4916",
    //       "assesseeNo": "110010900050",
    //       "tmpAssesseeNo": "PG-AC-2022-11-03-000092",
    //       "inspectionType": null,
    //       "surveyId": null,
    //       "linkedProperties": null,
    //       "tenantId": "km.kolkata",
    //       "accountId": "2743bf22-0101-5121-prpt-79e5d0ce0001",
    //       "oldPropertyId": null,
    //       "status": "ACTIVE",
    //       "address": null,
    //       "officeCode": "01",
    //       "premisesType": "11",
    //       "premisesNo": "4A",
    //       "ward": "001",
    //       "street": "09",
    //       "propertyType": null,
    //       "ownershipCategory": "Private Property",
    //       "personLiableTax": null,
    //       "ownershipType": null,
    //       "owners": [
    //         {
    //           "id": null,
    //           "uuid": null,
    //           "userName": "SANKALPA OJHA",
    //           "password": null,
    //           "salutation": null,
    //           "name": "SANKALPA",
    //           "gender": "Male",
    //           "mobileNumber": "8989446794",
    //           "emailId": "test@gmail.com",
    //           "altContactNumber": null,
    //           "pan": null,
    //           "aadhaarNumber": null,
    //           "permanentAddress": "test",
    //           "permanentCity": null,
    //           "permanentPinCode": null,
    //           "correspondenceCity": null,
    //           "correspondencePinCode": null,
    //           "correspondenceAddress": null,
    //           "active": null,
    //           "dob": null,
    //           "pwdExpiryDate": null,
    //           "locale": null,
    //           "type": null,
    //           "signature": null,
    //           "accountLocked": null,
    //           "roles": null,
    //           "fatherOrHusbandName": null,
    //           "bloodGroup": null,
    //           "identificationMark": null,
    //           "photo": null,
    //           "createdBy": null,
    //           "createdDate": null,
    //           "lastModifiedBy": null,
    //           "lastModifiedDate": null,
    //           "tenantId": "km.kolkata",
    //           "alternatemobilenumber": null,
    //           "ownerInfoUuid": "ebbfb3b3-09f7-4906-bbe6-e1ff8d04b62e",
    //           "isPrimaryOwner": null,
    //           "ownerShipPercentage": null,
    //           "ownerType": null,
    //           "institutionId": null,
    //           "status": "ACTIVE",
    //           "documents": null,
    //           "relationship": "FATHER",
    //           "postOffice": null,
    //           "policeStation": "SILPANCHALA THANA",
    //           "pincode": "484001",
    //           "address": "Januganj,balasore"
    //         }
    //       ],
    //       "acknowldgementNumber": null,
    //       "institution": null,
    //       "creationReason": "CREATE",
    //       "usageCategory": null,
    //       "noOfFloors": null,
    //       "landArea": null,
    //       "superBuiltUpArea": null,
    //       "source": "MUNICIPAL_RECORDS",
    //       "channel": "CFC_COUNTER",
    //       "documents": null,
    //       "units": null,
    //       "additionalDetails": null,
    //       "auditDetails": {
    //         "createdBy": "2743bf22-0101-5121-prpt-79e5d0ce0001",
    //         "lastModifiedBy": "2743bf22-0101-5121-prpt-79e5d0ce0001",
    //         "createdTime": 1667433600000,
    //         "lastModifiedTime": 1667433600000
    //       },
    //       "workflow": null,
    //       "AlternateUpdated": false,
    //       "registrationDetails": {
    //         "status": null,
    //         "id": null,
    //         "tenantId": null,
    //         "dag": "12",
    //         "khatian": "12",
    //         "mouza": "12",
    //         "queryNo": "212",
    //         "queryYear": "2021",
    //         "deedNo": "222",
    //         "deedYear": "2022",
    //         "location": "bhuabneswar",
    //         "ro": "1",
    //         "district": null,
    //         "book": "1"
    //       },
    //       "taxdetails": {
    //         "uaaConverted": null,
    //         "safNo": null,
    //         "cappingMethod": null,
    //         "uncappedTax": null,
    //         "uncappedHbt": null,
    //         "status": null,
    //         "id": null,
    //         "quarter": 0,
    //         "effectiveQtr": 20161,
    //         "proposedQtr": 2016,
    //         "av": 32400,
    //         "commAv": 0,
    //         "reasonableRent": 3000.00,
    //         "rate": 18.00,
    //         "commRate": 50.00,
    //         "hbtAmount": 40.50,
    //         "surcharge": 0.00,
    //         "grossAmount": null,
    //         "rebateAmount": 74.93,
    //         "quateryAmount": 1458.00,
    //         "paybleAmount": 1499.00,
    //         "netAmount": 1424.00,
    //         "premisesType": null,
    //         "appdFlag": null
    //       },
    //       "buildingdetails": {
    //         "status": null,
    //         "id": null,
    //         "planCaseNo": null,
    //         "buildingType": "Flat",
    //         "numberOfStories": "12",
    //         "flatNo": null,
    //         "occupancyStatus": "Full Commercial",
    //         "coveredArea": "200",
    //         "parkingArea": "500",
    //         "commonArea": "700",
    //         "plotArea": "200",
    //         "areaOfTheProperty": null,
    //         "pondId": null,
    //         "heritageId": null,
    //         "characterofPremises": "Constructed Building",
    //         "acre": "1200",
    //         "bigha": null,
    //         "cottah": null,
    //         "chatak": null,
    //         "satak": null,
    //         "sqMt": null,
    //         "sqFt": null
    //       }
    //     }
    //   ],
    //   "count": 1
    // }

    let propertyDetails = [{ owners: response.Properties[0].owners }]
    response.Properties[0] = { ...response.Properties[0], propertyDetails }
    console.log('first12341234', response.Properties[0])
    this.setState({ properties: response.Properties[0] })
  }




  getLogoUrl = (tenantId) => {
    const { cities } = this.props
    const filteredCity = cities && cities.length > 0 && cities.filter(item => item.code === tenantId);
    return filteredCity ? get(filteredCity[0], "logoId") : "";
  }

  render() {
    // const { location, documentsUploaded } = this.props;
    // const { search } = location;
    // const applicationNumber = getQueryValue(search, "applicationNumber");
    // const { generalMDMSDataById, properties, cities } = this.props;
    // const applicationType = this.getApplicationType();
    // const applicationDownloadObject = {
    //   label: { labelName: "PT Application", labelKey: "PT_APPLICATION" },
    //   link: () => {
    //     generatePdfFromDiv("download", applicationNumber, "#property-application-review-form")
    //   },
    //   leftIcon: "assignment"
    // };
    // const applicationPrintObject = {
    //   label: { labelName: "PT Application", labelKey: "PT_APPLICATION" },
    //   link: () => {
    //     generatePdfFromDiv("print", applicationNumber, "#property-application-review-form")

    //   },
    //   leftIcon: "assignment"
    // };
    // const downloadMenu = [applicationDownloadObject];
    // const printMenu = [applicationPrintObject];
    let header = 'Property Application';
    // if (applicationType.dataPath == 'Property') {
    //   header = 'PT_APPLICATION_TITLE';
    // } else {
    //   header = 'PT_ASSESS_APPLICATION_TITLE';
    // }
    let logoUrl = "";
    let corpCity = "";
    let ulbGrade = "";
    // if (get(this.state.properties, "tenantId")) {
    //  let tenantid = get(this.state.properties, "tenantId");
    // logoUrl = get(properties, "tenantId") ? this.getLogoUrl(get(properties, "tenantId")) : "";
    //logoUrl = window.location.origin + `/${commonConfig.tenantId}-egov-assets/${tenantid}/logo.png`;
    // corpCity = `TENANT_TENANTS_${get(this.state.properties, "tenantId").toUpperCase().replace(/[.:-\s\/]/g, "_")}`;
    // const selectedCityObject = cities && cities.length > 0 && cities.filter(item => item.code === get(this.state.properties, "tenantId"));
    // ulbGrade = selectedCityObject ? `ULBGRADE_${get(selectedCityObject[0], "city.ulbGrade")}` : "MUNICIPAL CORPORATION";
    // }
    const { generalMDMSDataById = {}, OldProperty } = this.props;
    return <div>
      <Screen className={""}>
        <PTHeader header={header} subHeaderTitle='PT_PROPERTY_APPLICATION_NO' subHeaderValue={this.state.properties.assesseeNo} />
        <div className="form-without-button-cont-generic" >
          <div>
            {/* <WorkFlowContainer dataPath={applicationType.dataPath}
              moduleName={applicationType.moduleName}
              updateUrl={applicationType.updateUrl}></WorkFlowContainer> */}
            <Card
              textChildren={
                <div className="col-sm-12 col-xs-12" id="property-application-review-form" style={{ alignItems: "center" }}>
                  <PdfHeader header={{
                    logoUrl: logoUrl, corpCity: corpCity, ulbGrade: ulbGrade,
                    label: "PT_PDF_SUBHEADER"
                  }}
                    subHeader={{
                      label: "PT_PROPERTY_ID",
                      value: `: ${get(this.state.properties, "propertyId")}`
                    }}>
                  </PdfHeader>
                  <PropertyAddressInfo OldProperty={OldProperty} generalMDMSDataById={generalMDMSDataById} properties={this.state.properties} editIcon={null}></PropertyAddressInfo>
                  <OwnerInfoForSearch OldProperty={OldProperty} generalMDMSDataById={generalMDMSDataById} properties={this.state.properties} editIcon={null}></OwnerInfoForSearch>
                  {/* <AssessmentInfo OldProperty={OldProperty} generalMDMSDataById={generalMDMSDataById} properties={this.state.properties} editIcon={formWizardConstants[purpose].isEditButton ? <EditIcon onIconClick={() => onEditButtonClick(1)} /> : null}></AssessmentInfo> */}

                  <LandDetailsInfo OldProperty={OldProperty} generalMDMSDataById={generalMDMSDataById} properties={this.state.properties} editIcon={null}></LandDetailsInfo>
                  <BuildingDetailsInfo OldProperty={OldProperty} generalMDMSDataById={generalMDMSDataById} properties={this.state.properties} editIcon={null}></BuildingDetailsInfo>
                  <RegistrationDetailInfo OldProperty={OldProperty} generalMDMSDataById={generalMDMSDataById} properties={this.state.properties} editIcon={null}></RegistrationDetailInfo>
                  <TaxCalculationDetialInfoForSearch OldProperty={OldProperty} generalMDMSDataById={generalMDMSDataById} properties={this.state.properties} editIcon={null}></TaxCalculationDetialInfoForSearch>
                </div>
              }
            />
          </div>
        </div>
        {getQueryArg(window.location.href, "isView") ? null : <div id="tax-wizard-buttons" className="wizard-footer col-sm-12" style={{ textAlign: "right" }}>
          <div className="button-container col-xs-4 property-info-access-btn" style={{ float: "right" }}>
            <Button
              onClick={() => {
                this.props.setRoute(`/pt-saf/apply?AssesseNo=${getQueryArg(window.location.href, "applicationNumber")}`);
              }}
              label={<Label buttonLabel={true} label='Apply SAF' fontSize="16px" />}
              primary={true}
              style={{ lineHeight: "auto", minWidth: "45%" }}
            />
          </div>
        </div>}
      </Screen>
    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  const { common = {}, screenConfiguration = {} } = state;
  const { generalMDMSDataById } = common || {};
  const { propertiesById, loading, } = state.properties || {};
  const { location } = ownProps;
  const { search } = location;

  const { preparedFinalObject = {} } = screenConfiguration;
  const { PTApplication = {} } = preparedFinalObject;
  const { propertyId = '' } = PTApplication;
  const { cities } = state.common || [];
  let { documentsUploadRedux, OldProperty } = preparedFinalObject;
  //documentsUploadRedux = convertToArray(documentsUploadRedux);


  const properties = propertiesById[propertyId] || {};
  const { documentsUploaded } = properties || [];
  return {
    ownProps,
    generalMDMSDataById, properties, documentsUploaded, propertyId, cities,
    OldProperty
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGeneralMDMSData: (requestBody, moduleName, masterName) => dispatch(fetchGeneralMDMSData(requestBody, moduleName, masterName)),
    fetchProperties: (queryObjectProperty) => dispatch(fetchProperties(queryObjectProperty)),
    toggleSnackbarAndSetText: (open, message, error) => dispatch(toggleSnackbarAndSetText(open, message, error)),
    prepareFinalObject: (jsonPath, value) => dispatch(prepareFinalObject(jsonPath, value)),
    fetchLocalizationLabel: (locale, moduleName, tenantId) => dispatch(fetchLocalizationLabel(locale, moduleName, tenantId)),
    setRoute: (route) => dispatch({ type: "SET_ROUTE", route }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationPreview);
