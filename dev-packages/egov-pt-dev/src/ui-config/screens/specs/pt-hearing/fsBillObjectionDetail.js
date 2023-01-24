import {
  getDateField,
  getTimeField,
  getCommonCard,
  getCommonContainer,
  getPattern,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const getNextHearingDate = async (action, state, dispatch) => {
  let nextHearingDate = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBillObjectionDetail.nextHearingDate",
    ""
  );
  dispatch(prepareFinalObject("nextHearingDate", nextHearingDate));
};

const getNextHearingOfficer = async (action, state, dispatch) => {
  let hearingOfficer = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBillObjectionDetail.hearingOfficer",
    ""
  );
  dispatch(prepareFinalObject("hearingOfficer", hearingOfficer));
};

const getNextHearingTime = async (action, state, dispatch) => {
  let nextHearingTime = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBillObjectionDetail.nextHearingTime",
    ""
  );
  dispatch(prepareFinalObject("nextHearingTime", nextHearingTime));
};

const objectionDetail = getCommonCard({
  safFormCDetailitleSeparately1: getCommonContainer({
    nextHearingDate: getDateField({
      label: {
        labelName: "Next Hearing Date",
        labelKey: "Next Hearing Date",
      },
      placeholder: {
        labelName: "Next Hearing Date",
        labelKey: "Next Hearing Date",
      },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6,
      },
      disabled: true,
      pattern: getPattern("Date"),
      jsonPath: "fsBillObjectionDetail.nextHearingDate",
      afterFieldChange: (action, state, dispatch) => {
        getNextHearingDate(action, state, dispatch);
      },
    }),
    hearingOfficer: {
      uiFramework: "custom-containers",
      componentPath: "AutosuggestContainer",
      jsonPath: "fsBill.hearingOfficer",

      props: {
        style: {
          width: "100%",
          cursor: "pointer",
        },
        label: {
          labelName: "Hearing Officer",
          labelKey: "Hearing Officer",
        },

        placeholder: {
          labelName: "Select Hearing Officer",
          labelKey: "Select Hearing Officer",
        },
        sourceJsonPath: "mdmsDataForfsBill.hearingOfficer",
        labelsFromLocalisation: true,
        suggestions: [],
        fullwidth: true,
       
        isClearable: true,
       
      },
      afterFieldChange: (action, state, dispatch) => {
            const officerCode = get(
              state.screenConfiguration.preparedFinalObject,
              "fsBill.hearingOfficer",
              ""
            );
        const allOfficerCodeData = get(
                state.screenConfiguration.preparedFinalObject,
                "mdmsDataForfsBill.hearingOfficer",
                ""
              );
        let hearingOfficer= allOfficerCodeData && allOfficerCodeData.length>0 && allOfficerCodeData.filter((item)=>{
          return item.code== officerCode;
          })
        dispatch(prepareFinalObject("fsBill.hearingOfficer", hearingOfficer[0].value));
           
          },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    },

    nextHearingTime: getTimeField({
      label: {
        labelName: "Next Hearing Time",
        labelKey: "Next Hearing Time",
      },
      props: {
        className: "tl-trade-type",
        defaultValue: "00:00",
        style: { marginBottom: 10, paddingRight: 80 },
      },
      defaultValue: "00:00",
      jsonPath: "fsBillObjectionDetail.nextHearingTime",
      afterFieldChange: (action, state, dispatch) => {
        getNextHearingTime(action, state, dispatch);
      },
      disabled: true,
      gridDefination: {
        xs: 12,
        sm: 6,
        md: 6,
      },
    }),
  }),
});

export default objectionDetail;
//export default {objectionDetail,deceidedDetail};
