import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { ifUserRoleExists } from "../../utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import "./index.css";

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

const getRedirectionURL = () => {
  /* Mseva 2.0 changes */
  const redirectionURL = ifUserRoleExists("CITIZEN")
    ? // ? "/tradelicense-citizen/home"
    "/"
    : "/inbox";
  return redirectionURL;
};

export const gotoHomeFooter = getCommonApplyFooter({
  gotoSummary: {
    componentPath: "Button",

    props: {
      variant: "outlined",
      className: "home-footer",
      color: "primary",
      style: {
        //    minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: getLabel({
        labelName: "View Summary",
        labelKey: "View Summary"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: `/pt-saf/search-preview?safNumber=${getQueryArg(window.location.href, "applicationNumber")}`
    }
  },
  gotoHome: {
    componentPath: "Button",

    props: {
      variant: "outlined",
      className: "home-footer",
      color: "primary",
      style: {
        //    minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: getLabel({
        labelName: "GO TO HOME",
        labelKey: "GO TO HOME"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: `${getRedirectionURL()}`
    }
  }
});
