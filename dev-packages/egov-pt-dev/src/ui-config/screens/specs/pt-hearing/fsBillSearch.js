import {
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getCommonSubHeader,
  getLabel,
  getBreak,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { fsBillSearchDetailsTable } from "./fsBillSearchDetails";
import get from "lodash/get";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { assesseeSearchfsBill } from "../pt-hearing/functions";

export const resetFields = (state, dispatch) => {
  if (process.env.REACT_APP_NAME == "Employee") {
    dispatch(
      handleField(
        "fsBillSearch",
        "components.div.children.searchNotice.children.cardContent.children.searchNoticeContainer.children.assesseeNo",
        "props.value",
        ""
      )
    );

    dispatch(prepareFinalObject("fsBillSearch.assesseeNo", ""));

    dispatch(
      handleField(
        "fsBillSearch",
        "components.div.children.searchNotice.children.cardContent.children.searchNoticeContainer.children.wardNo",
        "props.value",
        ""
      )
    );

    dispatch(prepareFinalObject("fsBillSearch.wardNo", ""));
    dispatch(
      handleField(
        "fsBillSearch",
        "components.div.children.fsBillSearchDetailsTable",
        "visible",
        false,
      )
    );
      }
  } 

const subheader = getCommonSubHeader({  
  labelName: "Please provide at least one non-mandatory field to search.",
});
export const fsBillSearchHandler = async (state, dispatch) => {
  let assesseeNo = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBillSearch.assesseeNo"
  );

  if (assesseeNo == "") {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill Assessee no.",
          labelKey: "Please fill Assessee no.",
        },
        "warning"
      )
    );
  } else {
    assesseeSearchfsBill(state, dispatch);
  }
};

// const showHideTable = (booleanHideOrShow, dispatch) => {
//   dispatch(
//     handleField(
//       "fsBillSearch",
//       "components.div.children.fsBillSearchDetailsTable",
//       "visible",
//       booleanHideOrShow
//     )
//   );
// };

const screenConfig = {
  uiFramework: "material-ui",
  name: "fsBillSearch",

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search",
      },
      children: {
        safFormCDetailHeaderC: getCommonHeader({
          labelName: "FS Bill Search",
          labelKey: "FS Bill Search",
          gridDefination: {
            xs: 12,
            sm: 12,
          },
        }),

        searchNotice: getCommonCard({
          subheader: subheader,
          break: getBreak(),
          searchNoticeContainer: getCommonContainer({
            assesseeNo: getTextField({
              label: {
                labelKey: "Assessee No",
              },
              placeholder: {
                labelKey: "Assessee No",
              },
              required: false,
              visible: true,
              jsonPath: "fsBillSearch.assesseeNo",
              gridDefination: {
                xs: 12,
                sm: 3,
              },
            }),

            wardNo: getTextField({
              label: {
                labelKey: "Ward No",
              },
              placeholder: {
                labelKey: "Ward No",
              },
              required: false,
              visible: true,
              jsonPath: "fsBillSearch.wardNo",

              gridDefination: {
                xs: 12,
                sm: 3,
              },
            }),
            
            searchButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 3,
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
                },
              },
              children: {
                buttonLabel: getLabel({
                  labelName: "Search",
                  labelKey: "Search",
                }),
              },
              onClickDefination: {
                action: "condition",
                callBack: fsBillSearchHandler,
              },
            },

            resetButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 3,
                // align: "center"
              },
              props: {
                variant: "outlined",
                style: {
                  color: "black",
                  borderColor: "black",
                  width: "220px",
                  height: "48px",
                  margin: "8px",
                  float: "left",
                },
              },
              children: {
                buttonLabel: getLabel({
                  labelName: "Reset",
                  labelKey: "Reset",
                }),
              },
              onClickDefination: {
                action: "condition",
                callBack: resetFields,
              },
            },
          }),
        }),
        break: getBreak(),
        fsBillSearchDetailsTable, 
      },
    },
  },
};

export default screenConfig;
