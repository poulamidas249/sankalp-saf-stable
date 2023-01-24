import { getDateField, getSelectField,getTimeField, getCommonCard, getCommonTitle, getCommonContainer, getCommonHeader, getCommonSubHeader, getCommonParagraph, getLabel, getPattern, getTextField } from "egov-ui-framework/ui-config/screens/specs/utils";

export const submitApplication = async (state, dispatch) => {

  const { history } = this.props;
  history.push('/pt-mutation/hearingNotice');
};



const screenConfig = {
  uiFramework: "material-ui",
  name: "hearingNotice",


  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search"
      },
      children: {

        safFormCDetailHeaderC: getCommonHeader({
          labelName: "Hearing Notice Entry Screen",
          labelKey: "Hearing Notice Entry Screen",
          gridDefination: {
            xs: 12,
            sm: 12,
          },        
        }),
       


  safFormCDetailC2: getCommonCard({
    safFormCDetailitleSeparately1: getCommonContainer({ 
      

      noticeNo: getTextField({
        label: {
          labelKey: "Notice No"
        },
        placeholder: {
          labelKey: "Notice No"
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.noticeNo",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      street: getTextField({
        label: {
          labelKey: "Street"
        },
        placeholder: {
          labelKey: "Street"
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.street",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      ownerNo: getTextField({
        label: {
          labelKey: "Owner No"
        },
        placeholder: {
          labelKey: "Owner No"
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.ownerNo",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),
      assesseeNo: getTextField({
        label: {
          labelKey: "Assessee No"
        },
        placeholder: {
          labelKey: "Assessee No"
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.assesseeNo",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      wardNo: getTextField({
        label: {
          labelKey: "Ward No"
        },
        placeholder: {
          labelKey: "Ward No"
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.wardNo",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      existingAV: getTextField({
        label: {
          labelKey: "Existing AV"
        },
        placeholder: {
          labelKey: "Existing AV"
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.existingAV",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),
      existingQTR: getTextField({
        label: {
          labelKey: "Existing QTR"
        },
        placeholder: {
          labelKey: "Existing QTR"
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.existingQTR",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),


      premiseNo: getTextField({
        label: {
          labelKey: "Premise No"
        },
        placeholder: {
          labelKey: "Premise No"
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.premiseNo",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      division: getTextField({
        label: {
          labelKey: "Division"
        },
        placeholder: {
          labelKey: "Division"
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.division",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      existingCommAV: getTextField({
        label: {
          labelKey: "Existing Comm AV"
        },
        placeholder: {
          labelKey: "Existing Comm AV"
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.existingCommAV",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      appFlag: getSelectField({
        label: {
          labelName: "App Flag",
          labelKey: "App Flag",
        },
        placeholder: {
          labelName: "App Flag",
          labelKey: "App Flag",
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.appFlag",
        gridDefination: {
          xs: 12,
          sm: 6,
        },
        data: [
          { code: "A", name: "App Flag 1" },
          { code: "B", name: "App Flag 2" },
          { code: "C", name: "App Flag 3" },
        ],
       
      }),

      grTR: getSelectField({
        label: {
          labelName: "GR/TR",
          labelKey: "GR/TR",
        },
        placeholder: {
          labelName: "GR/TR",
          labelKey: "GR/TR",
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.grTR",
        gridDefination: {
          xs: 12,
          sm: 6,
        },
        data: [
          { code: "A", name: "GR/TR 1" },
          { code: "B", name: "GR/TR 2" },
          { code: "C", name: "GR/TR 3" },
        ],
       
      }),

      proposedAV: getTextField({
        label: {
          labelKey: "Proposed AV"
        },
        placeholder: {
          labelKey: "Proposed AV"
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.proposedAV",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      hearingDate: getDateField({
        label: {
          labelName: "Hearing Date",
          labelKey: "Hearing Date"
        },
        placeholder: {
          labelName: "Enter Hearing Date",
          labelKey: "Enter Hearing Date"
        },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: false,
        pattern: getPattern("Date"),
        jsonPath: "hearingNotice.hearingDate"
      }),
   

    reason: getSelectField({
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
      jsonPath: "hearingNotice.reason",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      data: [
        { code: "A", name: "Reason 1" },
        { code: "B", name: "Reason 2" },
        { code: "C", name: "Reason 3" },
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
      visible: true,
      jsonPath: "hearingNotice.noticeSection",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      data: [
        { code: "A", name: "Notice Section 1" },
        { code: "B", name: "Notice Section 2" },
        { code: "C", name: "Notice Section 3" },
      ],
     
    }),

    proposedCommAV: getTextField({
      label: {
        labelKey: "Proposed COMM AV"
      },
      placeholder: {
        labelKey: "Proposed COMM AV"
      },
      required: false,
      visible: true,
      jsonPath: "hearingNotice.proposedCommAV",
      gridDefination: {
        xs: 12,
          sm: 6,
      }, 
      gridDefination: {
        xs: 12,
          sm: 6,
      },          
    }),

    // hearingTime: getTimeField({
    //   label: {
    //     labelName: "Hearing Time",
    //     labelKey: "Hearing Time"
    //   },
    //   props: {
    //     className: "tl-trade-type",
    //     jsonPath: "hearingNotice.hearingTime",
    //     defaultValue: "00:00",
    //     style: { marginBottom: 10, paddingRight: 80 },
    //   },
    //   required : true,
    //   defaultValue: "00:00",
    //   gridDefination: {
    //     xs: 12,
    //     sm: 12,
    //     md: 6
    //   }
    // }),

    hearingReason: getTextField({
      label: {
        labelKey: "Hearing Reason"
      },
      placeholder: {
        labelKey: "Hearing Reason"
      },
      required: false,
      visible: true,
      jsonPath: "hearingNotice.hearingReason",
      gridDefination: {
        xs: 12,
          sm: 6,
      }, 
      gridDefination: {
        xs: 12,
          sm: 6,
      },          
    }),

    proposedQTR: getTextField({
      label: {
        labelKey: "Proposed QTR"
      },
      placeholder: {
        labelKey: "Proposed QTR"
      },
      required: false,
      visible: true,
      jsonPath: "hearingNotice.proposedQTR",
      gridDefination: {
        xs: 12,
          sm: 6,
      }, 
      gridDefination: {
        xs: 12,
          sm: 6,
      },          
    }),



    hearingOffer: getTextField({
      label: {
        labelKey: "Hearing Offer"
      },
      placeholder: {
        labelKey: "Hearing Offer"
      },
      required: false,
      visible: true,
      jsonPath: "hearingNotice.hearingOffer",
      gridDefination: {
        xs: 12,
          sm: 6,
      }, 
      gridDefination: {
        xs: 12,
          sm: 6,
      },          
    }),
   
  }),

}),
  objectionDetail: getCommonCard({
    safFormCDetailitleSeparately1: getCommonContainer({ 
      

      objectionBy: getTextField({
        label: {
          labelKey: "Objection By"
        },
        placeholder: {
          labelKey: "Objection By"
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.objectionBy",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      objDate: getDateField({
        label: {
          labelName: "Objection Date",
          labelKey: "Objection Date"
        },
        placeholder: {
          labelName: "Objection Date",
          labelKey: "Objection Date"
        },
        required: false,
        pattern: getPattern("Date"),
        jsonPath: "hearingNotice.date"
      }),

      objectionMedium: getTextField({
        label: {
          labelKey: "Objection Medium"
        },
        placeholder: {
          labelKey: "Objection Medium"
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.objectionMedium",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      objectionReason: getTextField({
        label: {
          labelKey: "Objection Reason"
        },
        placeholder: {
          labelKey: "Objection reason"
        },
        required: false,
        visible: true,
        jsonPath: "hearingNotice.objectionReason",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),
    })
  }),

 




  btn: getCommonCard({
    btnContainer: getCommonContainer({ 
      saveButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 3,
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
            labelName: "Save",
            labelKey: "Save"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: submitApplication
        }
      },

      printButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 3,
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
            labelName: "Print Hearing Notice",
            labelKey: "Print Hearing Notice"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: submitApplication
        }
      },

      uaaPrintButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 3,
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
            labelName: "UAA Print Hearing Notice",
            labelKey: "UAA Print Hearing Notice"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: submitApplication
        }
      },


      printAppSlipButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 3,
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
            labelName: "Print App Slip",
            labelKey: "Print App Slip"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: submitApplication
        }
      },

      cancelButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 3,
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
            labelName: "Cancel Hearing hearing",
            labelKey: "Cancel Hearing hearing"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: submitApplication
        }
      },


      closeButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 3,
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
            labelName: "Close",
            labelKey: "Close"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: submitApplication
        }
      },

  }),

  }), 

}
}
}
      
    

}

export default screenConfig;