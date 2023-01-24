import {
  getCommonSubHeader,
  getCommonContainer,
  getCommonGrayCard,
  getLabelWithValue,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "./applyResource/fsBillFooter";

export const submitApplication = async (state, dispatch) => {};

const fsBillSummary = getCommonGrayCard({
  fsBillEntryContainer: getCommonContainer({
    // safFormCDetailHeaderC: getCommonSubHeader({
    //   labelName: "FS Bill Generation",
    //   labelKey: "FS Bill Generation",
    //   gridDefination: {
    //     xs: 12,
    //     sm: 10,
    //   },
    //   props: {
    //     style: { marginBottom: "10px" },
    //   },
    // }),
    // editSection: {
    //   componentPath: "Button",
    //   props: {
    //     color: "primary",
    //   },
    //   gridDefination: {
    //     xs: 12,
    //     sm: 2,
    //     align: "right",
    //   },
    //   visible: true,
    //   children: {
    //     editIcon: {
    //       uiFramework: "custom-atoms",
    //       componentPath: "Icon",
    //       props: {
    //         iconName: "edit",
    //       },
    //     },
    //     buttonLabel: getLabel({
    //       labelName: "Edit",
    //       labelKey: "Edit",
    //     }),
    //   },
    //   onClickDefination: {
    //     action: "condition",
    //     callBack: (state, dispatch) => {
    //       changeStep(state, dispatch, "", 0);
    //     },
    //   },
    // },
  }),

  safFormCDetailitleSeparately1: getCommonContainer({
    noticeNo: getLabelWithValue(
      {
        labelName: "Notice No",
        labelKey: "Notice No",
        value: "Notice No Value",
        props: {
          style: {
            marginBottom: "5px",
          },
        },
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "fsBill.noticeNo",
      }
    ),

    assesseeNo: getLabelWithValue(
      {
        labelName: "Assessee No",
        labelKey: "Assessee No",
        value: "Assessee No Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: {
            marginBottom: "5px",
          },
        },
      },
      {
        jsonPath: "fsBill.assesseeNo",
      }
    ),

    wardNo: getLabelWithValue(
      {
        labelName: "ward No",
        labelKey: "Ward No",
        value: "Ward No Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: {
            marginBottom: "5px",
          },
        },
      },
      {
        jsonPath: "fsBill.wardNo",
      }
    ),

    existingAV: getLabelWithValue(
      {
        labelName: "Existing AV",
        labelKey: "Existing AV",
        value: "Existing AV Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: {
            marginBottom: "5px",
          },
        },
      },
      {
        jsonPath: "fsBill.existingAV",
      }
    ),

    existingQTR: getLabelWithValue(
      {
        labelName: "Existing QTR",
        labelKey: "Existing QTR",
        value: "Existing QTR Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: {
            marginBottom: "5px",
          },
        },
      },
      {
        jsonPath: "fsBill.existingQTR",
      }
    ),

    premiseNo: getLabelWithValue(
      {
        labelName: "Premise No",
        labelKey: "Premise No",
        value: "Premise No Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: {
            marginBottom: "5px",
          },
        },
      },
      {
        jsonPath: "fsBill.premiseNo",
      }
    ),

    division: getLabelWithValue(
      {
        labelName: "Division",
        labelKey: "Division",
        value: "Division Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: {
            marginBottom: "5px",
          },
        },
      },
      {
        jsonPath: "fsBill.division",
      }
    ),

    existingCommAV: getLabelWithValue(
      {
        labelName: "Existing Comm AV",
        labelKey: "Existing Comm AV",
        value: "Existing Comm AV Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: {
            marginBottom: "5px",
          },
        },
      },
      {
        jsonPath: "fsBillExisting.existingCommAV",
      }
    ),

    grIR: getLabelWithValue(
      {
        labelName: "GR/IR",
        labelKey: "GR/IR",

        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: {
            marginBottom: "5px",
          },
        },
      },
      {
        value: "GR/IR Value",
      },
      {
        jsonPath: "fsBill.grIR",
      }
    ),

    proposedAV: getLabelWithValue(
      {
        labelName: "Proposed AV",
        labelKey: "Proposed AV",
        value: "Proposed AV Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: {
            marginBottom: "5px",
          },
        },
      },
      {
        jsonPath: "fsBill.proposedAV",
      }
    ),

    hearingDate: getLabelWithValue(
      {
        labelName: "Hearing Date",
        labelKey: "Hearing Date",
        value: "Hearing Date Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: {
            marginBottom: "5px",
          },
        },
      },
      {
        jsonPath: "fsBill.hearingDate",
      }
    ),

    hearingReason: getLabelWithValue(
      {
        labelName: "Hearing Reason",
        labelKey: "Hearing Reason",
        value: "Hearing Reason Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: {
            marginBottom: "5px",
          },
        },
      },
      {
        jsonPath: "fsBill.hearingReason",
      }
    ),

    status: getLabelWithValue(
      {
        labelName: "Status",
        labelKey: "Status",
        value: "Status Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: {
            marginBottom: "5px",
          },
        },
      },
      {
        jsonPath: "fsBill.status",
      }
    ),

    noticeSection: getLabelWithValue(
      {
        labelName: "Notice Section",
        labelKey: "Notice Section",
        value: "Notice Section Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
        props: {
          style: {
            marginBottom: "5px",
          },
        },
      },
      {
        jsonPath: "fsBill.noticeSection",
      }
    ),

    proposedCommAV: getLabelWithValue(
      {
        labelName: "Proposed CommAV",
        labelKey: "Proposed CommAV",
        value: "Proposed CommAV Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "fsBill.proposedCommAV",
      }
    ),

    hearingTime: getLabelWithValue(
      {
        labelName: "Hearing Time",
        labelKey: "Hearing Time",
        value: "Hearing Time Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "fsBill.hearingTime",
      }
    ),

    hearingReason: getLabelWithValue(
      {
        labelName: "Hearing Reason",
        labelKey: "Hearing Reason",
        value: "Hearing Reason Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "fsBill.hearingReason",
      }
    ),

    proposedQTR: getLabelWithValue(
      {
        labelName: "Proposed QTR",
        labelKey: "Proposed QTR",
        value: "Proposed QTR Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "fsBill.proposedQTR",
      }
    ),

    hearingOffer: getLabelWithValue(
      {
        labelName: "Hearing Offer",
        labelKey: "Hearing Offer",
        value: "Hearing Offer Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "fsBill.hearingOffer",
      }
    ),

    appertioned: getLabelWithValue(
      {
        labelName: "Appertioned",
        labelKey: "Appertioned",
        value: "Appertioned Value",
        gridDefination: {
          xs: 12,
          sm: 3,
        },
      },
      {
        jsonPath: "fsBill.appertioned",
      }
    ),
  }),
});

export default fsBillSummary;
