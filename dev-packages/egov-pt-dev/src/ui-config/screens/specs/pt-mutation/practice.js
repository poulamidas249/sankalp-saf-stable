import { getDateField,getSelectField,getCommonCard, getCommonContainer, getCommonHeader, getCommonSubHeader, getLabel, getPattern, getTextField } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";


export const submitApplication = async (state, dispatch) => {
  alert("Hey This is Aurobinda");
  try {
    const payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    dispatch(prepareFinalObject("searchScreenMdmsData", payload.MdmsRes));
  } catch (e) {
  }
};

const header = getCommonHeader(
    {
      labelName: "My practice (Aurobinda)",
    }
  );
const screenConfig = {
    uiFramework: "material-ui",
    name: "practice",
    beforeInitScreen: (action, state, dispatch) => {
      dispatch(prepareFinalObject("practice", {}));
      return action;
    },
    
      components: {
        div: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            header: { gridDefination: {
              xs: 12,
              sm: 10
            },header  }         
            
          }
        },
        practice: getCommonCard({
          subheader: getCommonSubHeader({
            labelKey:header
          }),
          name: getTextField({
            label: {
              labelKey: "Name"
            },
            placeholder: {
              labelKey: "Please Enter Name"
            },
            required: true,
            visible: true,
            jsonPath: "practice.name",          
          }),
          year: getSelectField({
            label: {
              labelName: "Year",
              labelKey: "Please Select Year"
            },
            placeholder: {
              labelName: "Select Year",
              labelKey: "Please Select Year"
            },
            required: true,
            visible: true,
            jsonPath: "practice.year",
            gridDefination: {
              xs: 12,
              sm: 4
            },
            data: [
              {
                code: "2018-19"
              },
              {
                code: "2019-20"
              }
            ]
          }),
          dob: getDateField({
            label: {
              labelName: "Date of Birth",
              labelKey: "Date of Birth"
            },
            placeholder: {
              labelName: "Select Date",
              labelKey: "Date of Birth"
            },
            required: true,
            pattern: getPattern("Date"),
            jsonPath: "searchScreen.dob"
          }),
          button: getCommonContainer({
            buttonContainer: getCommonContainer({
              resetButton: {
                componentPath: "Button",
                gridDefination: {
                  xs: 12,
                  sm: 6
                },
                props: {
                  variant: "outlined",
                  style: {
                    color: "black",
                    borderColor: "black",
                    width: "220px",
                    height: "48px",
                    margin: "8px",
                    float: "right"
                  }
                },
                children: {
                  buttonLabel: getLabel({
                    labelName: "Submit",
                    labelKey: "Submit"
                  })
                },
                onClickDefination: {
                  action: "condition",
                  callBack: submitApplication
                }
              },
              
            })
          })
        })
      }
      
    

}

export default screenConfig;