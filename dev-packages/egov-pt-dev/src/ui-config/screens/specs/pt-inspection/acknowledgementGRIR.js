import {
  getCommonContainer,
  getCommonHeader,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg, setDocuments } from "egov-ui-framework/ui-utils/commons";
import { loadUlbLogo } from "egov-ui-kit/utils/pdfUtils/generatePDF";
import { generateTLAcknowledgement } from "egov-ui-kit/utils/pdfUtils/generateTLAcknowledgement";
import get from "lodash/get";
import set from "lodash/set";
import acknowledgementCard from "../pt-saf/acknowledgementResource/acknowledgementUtils";
import { gotoHomeFooter } from "../pt-saf/acknowledgementResource/gotoHomeFooter";
// import "./index.css";

const getAcknowledgementCard = (
  state,
  dispatch,
  purpose,
  labelName,
  childrenHeader,
  noticeNo,
  secondNumber,
  tenant
) => {
  return {
    header: getCommonHeader({
      labelName: labelName,
      labelKey: labelName,
    }),
    applicationSuccessCard: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        // style: {
        //   position: "absolute",
        //   width: "95%"
        // }
      },
      children: {
        card: acknowledgementCard({
          icon: "done",
          backgroundColor: "#39CB74",
          header: {
            labelName: childrenHeader,
            labelKey: childrenHeader,
          },
          body: {
            labelName: "A saf number is generated for given assessee.",
            labelKey: "A saf number is generated for given assessee.",
          },
          tailText: {
            labelName: "Acknowledgement No.",
            labelKey: "Acknowledgement No.",
          },
          number: noticeNo,
        }),
      },
    },
    iframeForPdf: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
    },
    gotoHomeFooter,
  };
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "acknowledgement",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css",
      },
    },
  },
  beforeInitScreen: (action, state, dispatch) => {
    const purpose = getQueryArg(window.location.href, "purpose");
    const status = getQueryArg(window.location.href, "status");
    const noticeNo = getQueryArg(window.location.href, "noticeNo");
    const secondNumber = getQueryArg(window.location.href, "secondNumber");
    const tenant = "km.kolkata";
    loadUlbLogo(tenant);

    let labelName = "Application";
    let childrenHeader = "GR/IR Inspection";
    const data = getAcknowledgementCard(
      state,
      dispatch,
      purpose,
      labelName,
      childrenHeader,
      noticeNo,
      secondNumber,
      tenant
    );
    set(action, "screenConfig.components.div.children", data);
    return action;
  },
};

export default screenConfig;
