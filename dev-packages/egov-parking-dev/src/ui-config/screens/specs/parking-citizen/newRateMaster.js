import {
  getSelectField,
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getLabel,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "../../../../ui-utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

const header = getCommonHeader({
  labelName: getQueryArg(window.location.href, "isNew")
    ? "Rate Master New Record"
    : "new",
});

export const submitApplication = async (state, dispatch) => {
  let requestBody = state.screenConfiguration.preparedFinalObject.rateForm;
  console.log({ requestBody });
  //   try {
  //     let payload = null;
  //     payload = await httpRequest(
  //       "post",
  //       "/parking-services/registerAgency",
  //       "_search",
  //       [],
  //       requestBody
  //     );
  //     dispatch(prepareFinalObject("newAgencyForm", get(payload)));
  //     history.pushState("/parking-citizen/agencyMaster");
  //   } catch (e) {
  //     console.log(e);
  //   }
};

const newRateForm = {
  uiFramework: "material-ui",
  name: "newRate",
  beforeInitScreen: (action, state, dispatch) => {
    dispatch(prepareFinalObject("rateForm", {}));
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        // className: "common-div-css",
        style: {
          margin: "0px 16px 88px 16px",
        },
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
        areaContainer: getCommonCard({
          rateForm: getCommonContainer({
            rateCode: getTextField({
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              label: {
                labelKey: "Rate Code",
              },
              placeholder: {
                labelKey: "Please Enter Rate Code",
              },
              required: true,
              visible: true,
              jsonPath: "rateForm.rateCode",
            }),

            area: getSelectField({
              label: {
                labelName: "Area List",
                labelKey: "Area List",
              },
              placeholder: {
                labelName: "Select Area List",
                labelKey: "Select Area List",
              },
              required: true,
              visible: true,
              jsonPath: "area.rateForm",
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              data: [
                { code: "CTC", name: "CTC" },
                { code: "BBSR", name: "BBSR" },
              ],
            }),

            saveButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 12,
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

export default newRateForm;
