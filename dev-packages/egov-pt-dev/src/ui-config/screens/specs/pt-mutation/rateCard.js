import { getDateField, getSelectField,getTimeField, getCommonCard, getCommonContainer, getCommonHeader, getCommonSubHeader, getCommonParagraph, getLabel, getPattern, getTextField } from "egov-ui-framework/ui-config/screens/specs/utils";

export const submitApplication = async (state, dispatch) => {

  const { history } = this.props;
  history.push('/pt-mutation/rateCard');
};



const screenConfig = {
  uiFramework: "material-ui",
  name: "rateCard",


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
          labelName: "Rate Cart Entry Screen",
          labelKey: "Rate Cart Entry Screen",
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
        jsonPath: "rateCard.noticeNo",
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
        jsonPath: "rateCard.assesseeNo",
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
        jsonPath: "rateCard.wardNo",
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
        jsonPath: "rateCard.existingAV",
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
        jsonPath: "rateCard.existingQTR",
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
        jsonPath: "rateCard.premiseNo",
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
        jsonPath: "rateCard.division",
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
        jsonPath: "rateCard.existingCommAV",
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
        jsonPath: "rateCard.appFlag",
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
        jsonPath: "rateCard.grTR",
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
        jsonPath: "rateCard.proposedAV",
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
        jsonPath: "rateCard.hearingDate"
      }),
   

    hearingReason: getSelectField({
      label: {
        labelName: "Hearing Reason",
        labelKey: "Hearing Reason",
      },
      placeholder: {
        labelName: "Hearing Reason",
        labelKey: "Hearing Reason",
      },
      required: false,
      visible: true,
      jsonPath: "rateCard.hearingReason",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      data: [
        { code: "A", name: "Hearing Reason 1" },
        { code: "B", name: "Hearing Reason 2" },
        { code: "C", name: "Hearing Reason 3" },
      ],
     
    }),

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
        jsonPath: "rateCard.status",
        gridDefination: {
          xs: 12,
          sm: 6,
        },
        data: [
          { code: "A", name: "Status 1" },
          { code: "B", name: "Status 2" },
          { code: "C", name: "Status 3" },
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
      jsonPath: "rateCard.noticeSection",
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
      jsonPath: "rateCard.proposedCommAV",
      gridDefination: {
        xs: 12,
          sm: 6,
      }, 
      gridDefination: {
        xs: 12,
          sm: 6,
      },          
    }),

    hearingTime: getTimeField({
      label: {
        labelName: "Hearing Time",
        labelKey: "Hearing Time"
      },
      props: {
        className: "tl-trade-type",
        jsonPath: "rateCard.hearingTime",
        defaultValue: "00:00",
        style: { marginBottom: 10, paddingRight: 80 },
      },
      required : true,
      defaultValue: "00:00",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }),

    hearingReason: getTextField({
      label: {
        labelKey: "Hearing Reason"
      },
      placeholder: {
        labelKey: "Hearing Reason"
      },
      required: false,
      visible: true,
      jsonPath: "rateCard.hearingReason",
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
      jsonPath: "rateCard.proposedQTR",
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
      jsonPath: "rateCard.hearingOffer",
      gridDefination: {
        xs: 12,
          sm: 6,
      }, 
      gridDefination: {
        xs: 12,
          sm: 6,
      },          
    }),

    appertioned: getTextField({
        label: {
          labelKey: "Appertioned"
        },
        placeholder: {
          labelKey: "Appertioned"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.appertioned",
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

  existing: getCommonCard({

    safFormCDetailHeaderC: getCommonParagraph({
        labelName: "Existing",
        labelKey: "Existing",
        gridDefination: {
          xs: 12,
          sm: 12,
        },        
      }),

    safFormCDetailitleSeparately1: getCommonContainer({ 
      
     quarter: getTextField({
        label: {
          labelKey: "Quarter"
        },
        placeholder: {
          labelKey: "Quarter"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.quarter",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      av: getTextField({
        label: {
          labelKey: "AV"
        },
        placeholder: {
          labelKey: "AV"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.av",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      commAV: getTextField({
        label: {
          labelKey: "Comm AV"
        },
        placeholder: {
          labelKey: "Comm AV"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.commAV",
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

 
  proposed: getCommonCard({

    safFormCDetailHeaderC: getCommonParagraph({
        labelName: "Proposed",
        labelKey: "Proposed",
        gridDefination: {
          xs: 12,
          sm: 12,
        },        
      }),
      
    safFormCDetailitleSeparately1: getCommonContainer({ 
             
      quarter: getTextField({
        label: {
          labelKey: "Quarter"
        },
        placeholder: {
          labelKey: "Quarter"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.quarter",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      av: getTextField({
        label: {
          labelKey: "AV"
        },
        placeholder: {
          labelKey: "AV"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.av",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      commAV: getTextField({
        label: {
          labelKey: "Comm AV"
        },
        placeholder: {
          labelKey: "Comm AV"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.commAV",
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


  objectionDetail: getCommonCard({

    safFormCDetailHeaderC: getCommonParagraph({
      labelName: "Absent/Adjurnment",
      labelKey: "Absent/Adjurnment",
      gridDefination: {
        xs: 12,
        sm: 12,
      },        
    }),
    
    safFormCDetailitleSeparately1: getCommonContainer({ 
    
      nextHearingDate: getDateField({
        label: {
          labelName: "Next Hearing Date",
          labelKey: "Next Hearing Date"
        },
        placeholder: {
          labelName: "Next Hearing Date",
          labelKey: "Next Hearing Date"
        },
        required: false,
        pattern: getPattern("Date"),
        jsonPath: "rateCard.nextHearingDate"
      }),

      nextHearingTime: getTimeField({
        label: {
          labelName: "Next Hearing Time",
          labelKey: "Next Hearing Time"
        },
        props: {
          className: "tl-trade-type",
          jsonPath: "hearingNotice.nextHearingTime",
          defaultValue: "00:00",
          style: { marginBottom: 10, paddingRight: 80 },
        },
        required : true,
        defaultValue: "00:00",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }), 

      hearingOfficer: getTextField({
        label: {
          labelKey: "Hearing Officer"
        },
        placeholder: {
          labelKey: "Hearing Officer"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.hearingOfficer",
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


  deceidedDetail: getCommonCard({

    safFormCDetailHeaderC: getCommonParagraph({
      labelName: "Decided/EX-Parte",
      labelKey: "Decided/EX-Parte",
      gridDefination: {
        xs: 12,
        sm: 12,
      },        
    }),
    safFormCDetailitleSeparately1: getCommonContainer({ 

      av1: getTextField({
        label: {
          labelKey: "AV"
        },
        placeholder: {
          labelKey: "AV"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.av",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      commAV1: getTextField({
        label: {
          labelKey: "Comm AV"
        },
        placeholder: {
          labelKey: "Comm AV"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.av1",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      qtrlyTax: getTextField({
        label: {
          labelKey: "Qtrly Tax(Including HBT)"
        },
        placeholder: {
          labelKey: "Qtrly Tax(Including HBT)"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.qtrlyTax",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      normalRate: getTextField({
        label: {
          labelKey: "Normal Rate"
        },
        placeholder: {
          labelKey: "Normal Rate"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.normalRate",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      commRate: getTextField({
        label: {
          labelKey: "Comm Rate"
        },
        placeholder: {
          labelKey: "Comm Rate"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.commRate",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      payableAmount: getTextField({
        label: {
          labelKey: "Payable Amount"
        },
        placeholder: {
          labelKey: "Payable Amount"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.payableAmount",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      quarterAmount: getTextField({
        label: {
          labelKey: "Quarter Amount"
        },
        placeholder: {
          labelKey: "Quarter Amount"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.quarterAmount",
        gridDefination: {
          xs: 12,
            sm: 6,
        }, 
        gridDefination: {
          xs: 12,
            sm: 6,
        },          
      }),

      surchargeAmount: getTextField({
        label: {
          labelKey: "Surcharge Amount"
        },
        placeholder: {
          labelKey: "Surcharg Amount"
        },
        required: false,
        visible: true,
        jsonPath: "rateCard.surchargeAmount",
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
            labelName: "Print rate Card",
            labelKey: "Print rate Card"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: submitApplication
        }
      },

      printHearingButton: {
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
            labelName: "Cancel",
            labelKey: "Cancel"
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