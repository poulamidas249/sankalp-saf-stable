import {
  getSelectField,
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getPattern,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const getPremiseNo = (action, state, dispatch) => {
  let premiseNo = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.premiseNo",
    ""
  );
  dispatch(prepareFinalObject("premiseNo", premiseNo));
};

const getNoticeNo = async (action, state, dispatch) => {
  let noticeNo = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.noticeNo",
    ""
  );
  dispatch(prepareFinalObject("noticeNo", noticeNo));
};

const getAssesseeNo = async (action, state, dispatch) => {
  let assesseeNo = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.assesseeNo",
    ""
  );
  dispatch(prepareFinalObject("assesseeNo", assesseeNo));
};

const getWardNo = async (action, state, dispatch) => {
  let wardNo = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.wardNo",
    ""
  );
  dispatch(prepareFinalObject("wardNo", wardNo));
};

const getExistingAV = async (action, state, dispatch) => {
  let existingAV = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.existingAV",
    ""
  );
  dispatch(prepareFinalObject("existingAV", existingAV));
};

const getexistingQTR = async (action, state, dispatch) => {
  let existingQTR = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.existingQTR",
    ""
  );
  dispatch(prepareFinalObject("existingQTR", existingQTR));
};

const getDivision = async (action, state, dispatch) => {
  let division = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.division",
    ""
  );
  dispatch(prepareFinalObject("division", division));
};

const getExistingCommAV = async (action, state, dispatch) => {
  let existingCommAV = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.existingCommAV",
    ""
  );
  dispatch(prepareFinalObject("existingCommAV", existingCommAV));
};

const getAppFlag = async (action, state, dispatch) => {
  let appFlag = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.appFlag",
    ""
  );
  dispatch(prepareFinalObject("appFlag", appFlag));
};

const getgrIR = async (action, state, dispatch) => {
  let grIR = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.grIR",
    ""
  );
  dispatch(prepareFinalObject("grIR", grIR));
};

const getProposedAV = async (action, state, dispatch) => {
  let proposedAV = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.proposedAV",
    ""
  );
  dispatch(prepareFinalObject("proposedAV", proposedAV));
};

const getHearingDate = async (action, state, dispatch) => {
  let hearingDate = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.hearingDate",
    ""
  );
  dispatch(prepareFinalObject("hearingDate", hearingDate));
};

const getHearingReason = async (action, state, dispatch) => {
  let hearingReason = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.hearingReason",
    ""
  );
  dispatch(prepareFinalObject("hearingReason", hearingReason));
};

const getStatus = async (action, state, dispatch) => {
  let status = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.status",
    ""
  );
  dispatch(prepareFinalObject("status", status));
};

const getNoticeSection = async (action, state, dispatch) => {
  let noticeSection = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.noticeSection",
    ""
  );
  dispatch(prepareFinalObject("noticeSection", noticeSection));
};

const getProposedCommAV = async (action, state, dispatch) => {
  let proposedCommAV = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.proposedCommAV",
    ""
  );
  dispatch(prepareFinalObject("proposedCommAV", proposedCommAV));
};

const gethearingTime = async (action, state, dispatch) => {
  let hearingTime = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.hearingTime",
    ""
  );
  dispatch(prepareFinalObject("hearingTime", hearingTime));
};

const getProposedQTR = async (action, state, dispatch) => {
  let proposedQTR = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.proposedQTR",
    ""
  );
  dispatch(prepareFinalObject("proposedQTR", proposedQTR));
};

const getHearingOffer = async (action, state, dispatch) => {
  let hearingOffer = get(
    state.screenConfiguration.preparedFinalObject,
    "rateCard.hearingOffer",
    ""
  );
  dispatch(prepareFinalObject("hearingOffer", hearingOffer));
};

const getAppertioned = async (action, state, dispatch) => {
  let appertioned = get(
    state.screenConfiguration.screenConfig["rateCardEntry"],
    "components.div.children.formwizardFirstStep.children.rateCard.children.cardContent.children.rateCardContainer.children.appertioned.props.value",
    ""
  );
  dispatch(prepareFinalObject("appertioned", appertioned));
};

const rateCard = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Rate Card Entry",
      labelKey: "Rate Card Entry",
    },
    {
      style: {
        marginBottom: 18,
      },
    }
  ),
  rateCardContainer: getCommonContainer({
    noticeNo: getTextField({
      label: {
        labelKey: "Notice No",
      },
      placeholder: {
        labelKey: "Notice No",
      },
      props: {
        disabled: true,
      },
      required: false,
      visible: true,
      jsonPath: "rateCard.noticeNo",
      afterFieldChange: (action, state, dispatch) => {
        getNoticeNo(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    assesseeNo: getTextField({
      label: {
        labelKey: "Assessee No",
      },
      placeholder: {
        labelKey: "Assessee No",
      },
      disabled: true,
      required: false,
      visible: true,
      jsonPath: "rateCard.assesseeNo",
      afterFieldChange: (action, state, dispatch) => {
        getAssesseeNo(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      gridDefination: {
        xs: 12,
        sm: 4,
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
      disabled: true,
      jsonPath: "rateCard.wardNo",
      afterFieldChange: (action, state, dispatch) => {
        getWardNo(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    // existingAV: getTextField({
    //   label: {
    //     labelKey: "Existing AV"
    //   },
    //   placeholder: {
    //     labelKey: "Existing AV"
    //   },
    //   required: false,
    //   visible: true,
    //   disabled: true,
    //   jsonPath: "rateCard.existingAV",
    //   afterFieldChange: (action, state, dispatch) => {
    //     getExistingAV(action, state, dispatch);
    //     },
    //   gridDefination: {
    //     xs: 12,
    //       sm: 4,
    //   },
    //   gridDefination: {
    //     xs: 12,
    //       sm: 4,
    //   },
    // }),
    // existingQTR: getTextField({
    //   label: {
    //     labelKey: "Existing QTR"
    //   },
    //   placeholder: {
    //     labelKey: "Existing QTR"
    //   },
    //   required: false,
    //   visible: true,
    //   disabled: true,
    //   jsonPath: "rateCard.existingQTR",
    //   afterFieldChange: (action, state, dispatch) => {
    //     getexistingQTR(action, state, dispatch);
    //     },
    //   gridDefination: {
    //     xs: 12,
    //       sm: 4,
    //   },
    //   gridDefination: {
    //     xs: 12,
    //       sm: 4,
    //   },
    // }),

    premiseNo: getTextField({
      label: {
        labelKey: "Premise No",
      },
      placeholder: {
        labelKey: "Premise No",
      },
      required: false,
      visible: true,
      disabled: true,
      jsonPath: "rateCard.premiseNo",
      afterFieldChange: (action, state, dispatch) => {
        getPremiseNo(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    division: getTextField({
      label: {
        labelKey: "Division",
      },
      placeholder: {
        labelKey: "Division",
      },
      required: false,
      visible: true,
      disabled: true,
      jsonPath: "rateCard.division",
      afterFieldChange: (action, state, dispatch) => {
        getDivision(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    appFlag: getSelectField({
      label: {
        labelName: "App Flag",
        labelKey: "App Flag",
      },
      required: false,
      visible: true,
      disabled: true,
      jsonPath: "rateCard.appFlag",
      afterFieldChange: (action, state, dispatch) => {
        getAppFlag(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      data: [
        { code: "Select", name: "Select" },
        { code: "Yes", name: "Yes" },
        { code: "No", name: "No" },
      ],
    }),

    grIR: getSelectField({
      label: {
        labelName: "GR/IR",
        labelKey: "GR/IR",
      },
      placeholder: {
        labelName: "GR/IR",
        labelKey: "GR/IR",
      },
      required: false,
      visible: true,
      disabled: true,
      jsonPath: "rateCard.grIR",
      afterFieldChange: (action, state, dispatch) => {
        getgrIR(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      data: [
        { code: "Select", name: "Select" },
        { code: "GR", name: "GR" },
        { code: "IR", name: "IR" },
      ],
    }),

    hearingDate: getTextField({
      label: {
        labelName: "Hearing Date",
        labelKey: "Hearing Date",
      },
      placeholder: {
        labelName: "Enter Hearing Date",
        labelKey: "Enter Hearing Date",
      },
      disabled: true,
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      required: false,
      pattern: getPattern("Date"),
      jsonPath: "rateCard.hearingDate",
      afterFieldChange: (action, state, dispatch) => {
        getHearingDate(action, state, dispatch);
      },
    }),

    hearingOfficer: {
      uiFramework: "custom-containers",
      componentPath: "AutosuggestContainer",
      jsonPath: "rateCard.hearingOfficer",

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
        sourceJsonPath: "mdmsDataForRateCard.hearingOfficer",
        labelsFromLocalisation: true,
        suggestions: [],
        fullwidth: true,
        disabled: true,
        required: false,
        isClearable: true,
        inputLabelProps: {
          shrink: true,
        },
      },
      afterFieldChange: (action, state, dispatch) => {
            const officerCode = get(
              state.screenConfiguration.preparedFinalObject,
              "rateCard.hearingOfficer",
              ""
            );
        const allOfficerCodeData = get(
                state.screenConfiguration.preparedFinalObject,
                "mdmsDataForRateCard.hearingOfficer",
                ""
              );
        let hearingOfficer= allOfficerCodeData && allOfficerCodeData.length>0 && allOfficerCodeData.filter((item)=>{
          return item.code== officerCode;
          })
        dispatch(prepareFinalObject("rateCard.hearingOfficer", hearingOfficer[0].value));
           
          },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    },

    hearingReason: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pt",
      componentPath: "AutosuggestContainer",
      jsonPath: "rateCard.hearingReason",
      props: {
        optionLabel: "name",
        localePrefix: {
          moduleName: "PropertyTax",
          masterName: "HEARING_REASON",
        },
        label: {
          labelName: "hearing Reason",
          labelKey: "Hearing Reason",
        },
        placeholder: {
          labelName: "hearingReason",
          labelKey: "Hearing Reason",
        },
        required: false,
        jsonPath: "rateCard.hearingReason",
        sourceJsonPath: "mdmsDataForRateCard.HEARING_REASON",
        afterFieldChange: (action, state, dispatch) => {
          const hearingReasonCode = get(
            state.screenConfiguration.preparedFinalObject,
            "rateCard.hearingReason",
            ""
          );
          const allhearingReasoneData = get(
            state.screenConfiguration.preparedFinalObject,
            "mdmsDataForRateCard.hearingReason",
            ""
          );
          let hearingReason =
            allhearingReasoneData &&
            allhearingReasoneData.length > 0 &&
            allhearingReasoneData.filter((item) => {
              return item.code == hearingReasonCode;
            });
          dispatch(
            prepareFinalObject("rateCard.hearingReason", hearingReason[0].value)
          );
        },
      },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 4,
      },
    },

    hearingStatus: getSelectField({
      label: {
        labelName: "Status",
        labelKey: "Status",
      },

      required: false,
      visible: true,
      jsonPath: "rateCard.hearingStatus",
      afterFieldChange: (action, state, dispatch) => {
        getStatus(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
  


      data: [
        { code: "Absent Adj", name: "Absent Adj" , Value: "ABSENT"},
        { code: "Present Adj", name: "Present Adj", value: "PRESENT"},
        { code: "Decided", name: "Decided" , value: "DECIDED"},
        { code: "Ex-Parte", name: "Ex-Parte", value: "EXPARTE" },
      ],
    }),

    noticeSection: getSelectField({
      label: {
        labelName: "Notice Section",
        labelKey: "Notice Section",
      },
      placeholder: {
        labelName: "Notice Section",
        labelKey: "Notice Section",
      },
      required: false,
      disabled: true,
      jsonPath: "rateCard.noticeSection",
      sourceJsonPath: "mdmsDataForRateCard.Notice",
      afterFieldChange: (action, state, dispatch) => {
        const hearingReasonCode = get(
          state.screenConfiguration.preparedFinalObject,
          "rateCard.noticeSection",
          ""
        );
        const allhearingNoticeData = get(
          state.screenConfiguration.preparedFinalObject,
          "mdmsDataForRateCard.hearingNotice",
          ""
        );
        let noticeSection =
          allhearingNoticeData &&
          allhearingNoticeData.length > 0 &&
          allhearingNoticeData.filter((item) => {
            return item.code == hearingReasonCode;
          });
        dispatch(
          prepareFinalObject("rateCard.noticeSection", noticeSection[0].value)
        );
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    hearingTime: getTextField({
      label: {
        labelName: "Hearing Time",
        labelKey: "Hearing Time",
      },
      props: {
        className: "tl-trade-type",
        jsonPath: "rateCard.hearingTime",
        afterFieldChange: (action, state, dispatch) => {
          getHearingTime(action, state, dispatch);
        },
        defaultValue: "00:00",
        style: { marginBottom: 10, paddingRight: 80 },
      },
      required: false,
      disabled: true,
      defaultValue: "00:00",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 4,
      },
    }),

    hearingReason: getTextField({
      label: {
        labelKey: "Hearing Reason",
      },
      placeholder: {
        labelKey: "Hearing Reason",
      },
      required: false,
      visible: true,
      disabled: true,
      jsonPath: "rateCard.hearingReason",
      afterFieldChange: (action, state, dispatch) => {
        getHearingReason(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    appertioned: getTextField({
      label: {
        labelKey: "Appertioned",
      },
      placeholder: {
        labelKey: "Appertioned",
      },
      required: false,
      visible: true,
      disabled: true,
      jsonPath: "rateCard.appertioned",
      afterFieldChange: (action, state, dispatch) => {
        getAppertioned(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),
  }),
});

export default rateCard;
