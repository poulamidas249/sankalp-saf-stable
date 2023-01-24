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
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const getNoticeNo = (action, state, dispatch) => {
  let noticeNo = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.noticeNo",
    ""
  );
  dispatch(prepareFinalObject("noticeNo", noticeNo));
};

const getStreet = (action, state, dispatch) => {
  let street = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.street",
    ""
  );
  dispatch(prepareFinalObject("street", street));
};

const getownerName = (action, state, dispatch) => {
  let ownerName = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.ownerName",
    ""
  );
  dispatch(prepareFinalObject("ownerName", ownerName));
};

const getAssesseeNo = (action, state, dispatch) => {
  let assesseeNo = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.assesseeNo",
    ""
  );
  dispatch(prepareFinalObject("assesseeNo", assesseeNo));
};

const getWardNo = (action, state, dispatch) => {
  let wardNo = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.wardNo",
    ""
  );
  dispatch(prepareFinalObject("wardNo", wardNo));
};

const getExistingAV = (action, state, dispatch) => {
  let existingAV = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.existingAV",
    ""
  );
  dispatch(prepareFinalObject("existingAV", existingAV));
};

const getExistingQTR = (action, state, dispatch) => {
  let existingQTR = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.existingQTR",
    ""
  );
  dispatch(prepareFinalObject("existingQTR", existingQTR));
};

const getPremiseNo = (action, state, dispatch) => {
  let premiseNo = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.premiseNo",
    ""
  );
  dispatch(prepareFinalObject("premiseNo", premiseNo));
};

const getDivision = (action, state, dispatch) => {
  let division = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.division",
    ""
  );
  dispatch(prepareFinalObject("division", division));
};

const getExistingCommAV = (action, state, dispatch) => {
  let existingCommAV = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.existingCommAV",
    ""
  );
  dispatch(prepareFinalObject("existingCommAV", existingCommAV));
};

const getAppFlag = (action, state, dispatch) => {
  let appFlag = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.appFlag",
    ""
  );
  dispatch(prepareFinalObject("appFlag", appFlag));
};

const getSinedie = (action, state, dispatch) => {
  let sinedie = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.sinedie",
    ""
  );
  dispatch(prepareFinalObject("sinedie", sinedie));
};

const getHearingDate = (action, state, dispatch) => {
  let hearingDate = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.hearingDate",
    ""
  );
  dispatch(prepareFinalObject("hearingDate", hearingDate));
};

const getReason = (action, state, dispatch) => {
  let reason = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.reason",
    ""
  );
  dispatch(prepareFinalObject("reason", reason));
};

const getNoticeSection = (action, state, dispatch) => {
  let noticeSection = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.noticeSection",
    ""
  );
  dispatch(prepareFinalObject("noticeSection", noticeSection));
};

const getProposedCommAV = (action, state, dispatch) => {
  let proposedCommAV = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.propCommAv",
    ""
  );
  dispatch(prepareFinalObject("propCommAv", proposedCommAV));
};

const getProposedAV = (action, state, dispatch) => {
  let proposedAV = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.propAv",
    ""
  );
  dispatch(prepareFinalObject("propAv", proposedAV));
};

const getgrIR = (action, state, dispatch) => {
  let grIR = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.grIR",
    ""
  );
  dispatch(prepareFinalObject("grIR", grIR));
};

const getHearingReason = (action, state, dispatch) => {
  let hearingReason = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.hearingReason",
    ""
  );
  dispatch(prepareFinalObject("hearingReason", hearingReason));
};

const getProposedQTR = (action, state, dispatch) => {
  let proposedQTR = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.proposedQTR",
    ""
  );
  dispatch(prepareFinalObject("proposedQTR", proposedQTR));
};

const getHearingTime = (action, state, dispatch) => {
  let hearingTime = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.hearingTime",
    ""
  );
  dispatch(prepareFinalObject("hearingTime", hearingTime));
};

const getHearingOffer = (action, state, dispatch) => {
  let hearingOffer = get(
    state.screenConfiguration.preparedFinalObject,
    "firstStepHearingNotice.hearingOffer",
    ""
  );
  dispatch(prepareFinalObject("hearingOffer", hearingOffer));
};

const firstStepHearingNotice = getCommonCard({
  firstStepHearingNoticeContainer: getCommonContainer({
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
      jsonPath: "firstStepHearingNotice.noticeNo",
      // afterFieldChange: (action, state, dispatch) => {
      //   getNoticeNo(action, state, dispatch);
      // },

      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    street: getTextField({
      label: {
        labelKey: "Street",
      },
      placeholder: {
        labelKey: "Enter Street",
      },
      props: {
        disabled: true,
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.street",
      // afterFieldChange: (action, state, dispatch) => {
      //   getStreet(action, state, dispatch);
      // },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    ownerName: getTextField({
      label: {
        labelKey: "Owner Name",
      },
      placeholder: {
        labelKey: "Owner Name",
      },
      props: {
        disabled: true,
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.ownerName",
      // afterFieldChange: (action, state, dispatch) => {
      //   getownerName(action, state, dispatch);
      // },
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
      props: {
        disabled: true,
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.assesseeNo",
      // afterFieldChange: (action, state, dispatch) => {
      //   getAssesseeNo(action, state, dispatch);
      // },
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
      props: {
        disabled: true,
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.wardNo",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    existingAV: getTextField({
      label: {
        labelKey: "Existing AV",
      },
      placeholder: {
        labelKey: "Existing AV",
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.existingAV",

      gridDefination: {
        xs: 12,
        sm: 4,
      },
      props: {
        disabled: true,
      },
    }),

    existingQTR: getTextField({
      label: {
        labelKey: "Existing Quarter",
      },
      placeholder: {
        labelKey: "Existing Quarter",
      },
      props: {
        disabled: true,
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.existingQTR",
      // afterFieldChange: (action, state, dispatch) => {
      //   getExistingQTR(action, state, dispatch);
      // },
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
      jsonPath: "firstStepHearingNotice.premiseNo",
      // afterFieldChange: (action, state, dispatch) => {
      //   getPremiseNo(action, state, dispatch);
      // },
      props: {
        disabled: true,
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
      props: {
        disabled: true,
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.division",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    existingCommAV: getTextField({
      label: {
        labelKey: "Existing Comm AV",
      },
      placeholder: {
        labelKey: "Existing Comm AV",
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.existingCommAV",
      // afterFieldChange: (action, state, dispatch) => {
      //   getExistingCommAV(action, state, dispatch);
      // },
      props: {
        disabled: true,
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    sinedie: getSelectField({
      label: {
        labelName: "Sinedie",
        labelKey: "Sinedie",
      },

      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.sinedie",
      // afterFieldChange: (action, state, dispatch) => {
      //   getSinedie(action, state, dispatch);
      // },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      data: [
        { code: "Yes", name: "Yes" },
        { code: "No", name: "No" },
      ],
    }),

    appFlag: getSelectField({
      label: {
        labelName: "App Flag",
        labelKey: "App Flag",
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.appFlag",
      // afterFieldChange: (action, state, dispatch) => {
      //   getAppFlag(action, state, dispatch);
      // },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      data: [
        { code: "Yes", name: "Yes", value: "Yes" },
        { code: "No", name: "No", value: "No" },
      ],
    }),

    grIR: getSelectField({
      label: {
        labelName: "GR/IR",
        labelKey: "GR/IR",
      },

      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.grIR",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      data: [
        { code: "GR", name: "GR", value: "GR" },
        { code: "IR", name: "IR", value: "IR" },
      ],
    }),

    propAv: getTextField({
      label: {
        labelKey: "Proposed AV",
      },
      placeholder: {
        labelKey: "Enter Proposed AV",
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.propAv",

      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    hearingDate: getDateField({
      label: {
        labelName: "Hearing Date",
        labelKey: "Hearing Date",
      },
      placeholder: {
        labelName: "Enter Hearing Date",
        labelKey: "Enter Hearing Date",
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      required: false,
      pattern: getPattern("Date"),
      jsonPath: "firstStepHearingNotice.hearingDate",
    }),

    hearingReason: getSelectField({
      label: {
        labelName: "Reason",
        labelKey: "Reason",
      },
      placeholder: {
        labelName: "Reason",
        labelKey: "Reason",
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.hearingReason",
      sourceJsonPath: "mdmsDataForHearing.hearingReason",
      afterFieldChange: (action, state, dispatch) => {
        const hearingReasonCode = get(
          state.screenConfiguration.preparedFinalObject,
          "firstStepHearingNotice.hearingReason",
          ""
        );
        const allhearingReasoneData = get(
          state.screenConfiguration.preparedFinalObject,
          "mdmsDataForHearing.hearingReason",
          ""
        );
        let hearingReason =
          allhearingReasoneData &&
          allhearingReasoneData.length > 0 &&
          allhearingReasoneData.filter((item) => {
            return item.code == hearingReasonCode;
          });
        dispatch(
          prepareFinalObject(
            "firstStepHearingNotice.hearingReason",
            hearingReason[0].value
          )
        );
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    hearingOfficer: {
      uiFramework: "custom-containers",
      componentPath: "AutosuggestContainer",
      jsonPath: "firstStepHearingNotice.hearingOfficer",

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
        sourceJsonPath: "mdmsDataForHearing.hearingOfficer",

        labelsFromLocalisation: true,
        suggestions: [],
        fullwidth: true,

        isClearable: true,
        inputLabelProps: {
          shrink: true,
        },
      },

      afterFieldChange: (action, state, dispatch) => {
        const officerCode = get(
          state.screenConfiguration.preparedFinalObject,
          "firstStepHearingNotice.hearingOfficer",
          ""
        );
        const allOfficerCodeData = get(
          state.screenConfiguration.preparedFinalObject,
          "mdmsDataForHearing.hearingOfficer",
          ""
        );
        let hearingOfficer =
          allOfficerCodeData &&
          allOfficerCodeData.length > 0 &&
          allOfficerCodeData.filter((item) => {
            return item.code == officerCode;
          });
        dispatch(
          prepareFinalObject(
            "firstStepHearingNotice.hearingOfficer",
            hearingOfficer[0].value
          )
        );
      },

      gridDefination: {
        xs: 12,
        sm: 4,
      },
    },

    reason: getTextField({
      label: {
        labelKey: "Hearing Reason",
      },
      placeholder: {
        labelKey: "Hearing Reason",
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.reason",
      // afterFieldChange: (action, state, dispatch) => {
      //   getHearingReason(action, state, dispatch);
      // },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    hearingSection: getSelectField({
      label: {
        labelName: "Notice Section",
        labelKey: "Notice Section",
      },
      placeholder: {
        labelName: "Notice Section",
        labelKey: "Notice Section",
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.hearingSection",
      sourceJsonPath: "mdmsDataForHearing.hearingNotice",
      afterFieldChange: (action, state, dispatch) => {
        const hearingReasonCode = get(
          state.screenConfiguration.preparedFinalObject,
          "firstStepHearingNotice.hearingSection",
          ""
        );
        const allhearingNoticeData = get(
          state.screenConfiguration.preparedFinalObject,
          "mdmsDataForHearing.hearingNotice",
          ""
        );
        let noticeSection =
          allhearingNoticeData &&
          allhearingNoticeData.length > 0 &&
          allhearingNoticeData.filter((item) => {
            return item.code == hearingReasonCode;
          });
        dispatch(
          prepareFinalObject(
            "firstStepHearingNotice.hearingSection",
            noticeSection[0].value
          )
        );
      },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    propCommAv: getTextField({
      label: {
        labelKey: "Proposed COMM AV",
      },
      placeholder: {
        labelKey: "Proposed COMM AV",
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.propCommAv",
      // afterFieldChange: (action, state, dispatch) => {
      //   getProposedCommAV(action, state, dispatch);
      // },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),

    // hearingTime: getTimeField({
    //   label: {
    //     labelName: "Hearing Time",
    //     labelKey: "Hearing Time",
    //   },
    //   props: {
    //     className: "tl-trade-type",
    //     jsonPath: "firstStepHearingNotice.hearingTime",
    //     // afterFieldChange: (action, state, dispatch) => {
    //     //   getHearingTime(action, state, dispatch);
    //     // },
    //     defaultValue: "00:00",
    //     style: { marginBottom: 10, paddingRight: 80 },
    //   },
    //   required: false,
    //   gridDefination: {
    //     xs: 12,
    //     sm: 4,
    //   },
    // }),

    // hearingTime: getTimeField({
    //   label: {
    //     labelName: "Hearing Time",
    //     labelKey: "Hearing Time",
    //   },
    //   pattern: getPattern("Time"),
    //   props: {
    //     className: "tl-trade-type",
    //     jsonPathUpdatePrefix: "firstStepHearingNotice.hearingTime",
    //     jsonPath: "firstStepHearingNotice.hearingTime",
    //     defaultValue: "00:00",
    //     style: { marginBottom: 10 },
    //   },
    //   defaultValue: "00:00",
    //   gridDefination: {
    //     xs: 12,
    //     sm: 4,
    //   },
    // }),

    hearingTime: getTimeField({
      label: {
        labelName: "Hearing Time",
        labelKey: "Hearing Time",
      },
      props: {
        className: "tl-trade-type",
        defaultValue: "00:00",
        style: { marginBottom: 10, paddingRight: 80 },
      },
      required: true,
      defaultValue: "00:00",
      jsonPath: "firstStepHearingNotice.hearingTime",
      afterFieldChange: (action, state, dispatch) => {
        getHearingTime(action, state, dispatch);
      },
      gridDefination: {
        xs: 12,
        sm: 4,
        md: 4,
      },
    }),

    // hearingTime: getTimeField({
    //   label: {
    //     labelName: "Hearing Time",
    //     labelKey: "Hearing Time"
    //   },
    //   props: {
    //     className: "tl-trade-type",
    //     defaultValue: "00:00",
    //     style: { marginBottom: 10, paddingRight: 80 },
    //   },
    //   required : true,
    //   defaultValue: "00:00",
    //   jsonPath: "firstStepHearingNotice.hearingTime",
    //   afterFieldChange: (action, state, dispatch) => {
    //     gethearingTime(action, state, dispatch);
    //   },
    //   gridDefination: {
    //     xs: 12,
    //     sm: 6,
    //     md: 4
    //   }
    // }),

    proposedQTR: getTextField({
      label: {
        labelKey: "Proposed QTR",
      },
      placeholder: {
        labelKey: "Proposed QTR",
      },
      required: false,
      visible: true,
      jsonPath: "firstStepHearingNotice.proposedQTR",
      // afterFieldChange: (action, state, dispatch) => {
      //   getProposedQTR(action, state, dispatch);
      // },
      gridDefination: {
        xs: 12,
        sm: 4,
      },
    }),
  }),
});

export default firstStepHearingNotice;
