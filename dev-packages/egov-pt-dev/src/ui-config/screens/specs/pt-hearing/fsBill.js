import {
  getDateField,
  getSelectField,
  getTimeField,
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getCommonTitle,
  getLabel,
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
    "fsBill.premiseNo",
    ""
  );
  dispatch(prepareFinalObject("premiseNo", premiseNo));
};

const getNoticeNo = async (action, state, dispatch) => {
  let noticeNo = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.noticeNo",
    ""
  );
  dispatch(prepareFinalObject("noticeNo", noticeNo));
};

const getAssesseeNo = async (action, state, dispatch) => {
  let assesseeNo = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.assesseeNo",
    ""
  );
  dispatch(prepareFinalObject("assesseeNo", assesseeNo));
};

const getWardNo = async (action, state, dispatch) => {
  let wardNo = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.wardNo",
    ""
  );
  dispatch(prepareFinalObject("wardNo", wardNo));
};

const getExistingAV = async (action, state, dispatch) => {
  let existingAV = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.existingAV",
    ""
  );
  dispatch(prepareFinalObject("existingAV", existingAV));
};

const getexistingQTR = async (action, state, dispatch) => {
  let existingQTR = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.existingQTR",
    ""
  );
  dispatch(prepareFinalObject("existingQTR", existingQTR));
};

const getDivision = async (action, state, dispatch) => {
  let division = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.division",
    ""
  );
  dispatch(prepareFinalObject("division", division));
};

const getExistingCommAV = async (action, state, dispatch) => {
  let existingCommAV = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.existingCommAV",
    ""
  );
  dispatch(prepareFinalObject("existingCommAV", existingCommAV));
};

const getAppFlag = async (action, state, dispatch) => {
  let appFlag = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.appFlag",
    ""
  );
  dispatch(prepareFinalObject("appFlag", appFlag));
};

const getgrIR = async (action, state, dispatch) => {
  let grIR = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.grIR",
    ""
  );
  dispatch(prepareFinalObject("grIR", grIR));
};

const getProposedAV = async (action, state, dispatch) => {
  let proposedAV = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.proposedAV",
    ""
  );
  dispatch(prepareFinalObject("proposedAV", proposedAV));
};

const getHearingDate = async (action, state, dispatch) => {
  let hearingDate = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.hearingDate",
    ""
  );
  dispatch(prepareFinalObject("hearingDate", hearingDate));
};

const getHearingReason = async (action, state, dispatch) => {
  let hearingReason = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.hearingReason",
    ""
  );
  dispatch(prepareFinalObject("hearingReason", hearingReason));
};

const getStatus = async (action, state, dispatch) => {
  let status = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.status",
    ""
  );
  dispatch(prepareFinalObject("status", status));
};

const getNoticeSection = async (action, state, dispatch) => {
  let noticeSection = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.noticeSection",
    ""
  );
  dispatch(prepareFinalObject("noticeSection", noticeSection));
};

const getProposedCommAV = async (action, state, dispatch) => {
  let proposedCommAV = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.proposedCommAV",
    ""
  );
  dispatch(prepareFinalObject("proposedCommAV", proposedCommAV));
};

const gethearingTime = async (action, state, dispatch) => {
  let hearingTime = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.hearingTime",
    ""
  );
  dispatch(prepareFinalObject("hearingTime", hearingTime));
};

const getProposedQTR = async (action, state, dispatch) => {
  let proposedQTR = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.proposedQTR",
    ""
  );
  dispatch(prepareFinalObject("proposedQTR", proposedQTR));
};

const getHearingOffer = async (action, state, dispatch) => {
  let hearingOffer = get(
    state.screenConfiguration.preparedFinalObject,
    "fsBill.hearingOffer",
    ""
  );
  dispatch(prepareFinalObject("hearingOffer", hearingOffer));
};

const getAppertioned = async (action, state, dispatch) => {
  let appertioned = get(
    state.screenConfiguration.screenConfig["fsBillEntry"],
    "components.div.children.formwizardFirstStep.children.fsBill.children.cardContent.children.fsBillContainer.children.appertioned.props.value",
    ""
  );
  dispatch(prepareFinalObject("appertioned", appertioned));
};

const fsBill = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "FS Bill",
      labelKey: "FS Bill",
    },
    {
      style: {
        marginBottom: 18,
      },
    }
  ),
  fsBillContainer: getCommonContainer({
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
      jsonPath: "fsBill.noticeNo",
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
      jsonPath: "fsBill.assesseeNo",
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
      jsonPath: "fsBill.wardNo",
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
      jsonPath: "fsBill.premiseNo",
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
      jsonPath: "fsBill.division",
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

   
    grIR: getSelectField({
      label: {
        labelName: "GR/IR",
        labelKey: "GR/IR",
      },
     
      required: false,
      visible: true,
      disabled: true,
      jsonPath: "fsBill.grIR",
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
      jsonPath: "fsBill.hearingDate",
      afterFieldChange: (action, state, dispatch) => {
        getHearingDate(action, state, dispatch);
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
        required: false,
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

    hearingReason: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pt",
      componentPath: "AutosuggestContainer",
      jsonPath: "fsBill.hearingReason",
      props: {
        optionLabel: "name",
        localePrefix: {
          moduleName: "PropertyTax",
          masterName: "HEARING_REASON",
        },
        label: {
          labelName: "hearingReason",
          labelKey: "Hearing Reason",
        },
        placeholder: {
          labelName: "hearingReason",
          labelKey: "Hearing Reason",
        },
        required: false,
        jsonPath: "fsBill.hearingReason",
        sourceJsonPath: "createNoticeMdmsData.PropertyTax.HEARING_REASON",
        afterFieldChange: (action, state, dispatch) => {
              const hearingReasonCode = get(
                state.screenConfiguration.preparedFinalObject,
                "fsBill.hearingReason",
                ""
              );
          const allhearingReasoneData = get(
                  state.screenConfiguration.preparedFinalObject,
                  "mdmsDataForfsBill.hearingReason",
                  ""
                );
          let hearingReason= allhearingReasoneData && allhearingReasoneData.length>0 && allhearingReasoneData.filter((item)=>{
            return item.code== hearingReasonCode;
            })
          dispatch(prepareFinalObject("fsBill.hearingReason", hearingReason[0].value));
             
            },
      },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 4,
      },
    },

    status: getSelectField({
      label: {
        labelName: "Status",
        labelKey: "Status",
      },
      placeholder: {
        labelName: "Status",
        labelKey: "Status",
      },
      required: false,
      visible: true,
      disabled: true,
      jsonPath: "fsBill.status",
      afterFieldChange: (action, state, dispatch) => {
        getStatus(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      data: [
        { code: "ACTIVE", name: "ACTIVE" },
        { code: "INACTIVE", name: "INACTIVE" },
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
      jsonPath: "fsBill.noticeSection",
      sourceJsonPath: "mdmsDataForfsBill.Notice",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      afterFieldChange: (action, state, dispatch) => {
            const hearingReasonCode = get(
              state.screenConfiguration.preparedFinalObject,
              "fsBill.noticeSection",
              ""
            );
        const allhearingNoticeData = get(
                state.screenConfiguration.preparedFinalObject,
                "mdmsDataForfsBill.hearingNotice",
                ""
              );
        let noticeSection= allhearingNoticeData && allhearingNoticeData.length>0 && allhearingNoticeData.filter((item)=>{
          return item.description== hearingReasonCode;
          })
        dispatch(prepareFinalObject("fsBill.noticeSection", noticeSection.value));
           
          },
    }),

    // proposedCommAV: getTextField({
    //   label: {
    //     labelKey: "Proposed COMM AV"
    //   },
    //   placeholder: {
    //     labelKey: "Proposed COMM AV"
    //   },
    //   required: false,
    //   visible: true,
    //   disabled: true,
    //   jsonPath: "fsBill.proposedCommAV",
    //   afterFieldChange: (action, state, dispatch) => {
    //     getProposedCommAV(action, state, dispatch);
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

    hearingTime: getTextField({
      label: {
        labelName: "Hearing Time",
        labelKey: "Hearing Time",
      },
      props: {
        className: "tl-trade-type",
        jsonPath: "fsBill.hearingTime",
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
      jsonPath: "fsBill.hearingReason",
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

    // proposedQTR: getTextField({
    //   label: {
    //     labelKey: "Proposed QTR"
    //   },
    //   placeholder: {
    //     labelKey: "Proposed QTR"
    //   },
    //   required: false,
    //   visible: true,
    //   disabled: true,
    //   jsonPath: "fsBill.proposedQTR",
    //   afterFieldChange: (action, state, dispatch) => {
    //     getProposedQTR (action, state, dispatch);
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
      jsonPath: "fsBill.appertioned",
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

export default fsBill;
