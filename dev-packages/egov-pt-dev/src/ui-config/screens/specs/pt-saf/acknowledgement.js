import { getCommonContainer, getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg, setDocuments } from "egov-ui-framework/ui-utils/commons";
import { loadUlbLogo } from "egov-ui-kit/utils/pdfUtils/generatePDF";
import { generateTLAcknowledgement } from "egov-ui-kit/utils/pdfUtils/generateTLAcknowledgement";
import get from "lodash/get";
import set from "lodash/set";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { gotoHomeFooter } from "./acknowledgementResource/gotoHomeFooter";
import "./index.css";

const getAcknowledgementCard = (
    state,
    dispatch,
    purpose,
    status,
    applicationNumber,
    secondNumber,
    tenant
) => {
    if (purpose === "apply" && status === "success") {
        return {
            header: getCommonHeader({
                labelName: `Application for Self Assessment`,
                labelKey: "Application for Self Assessment",
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
                            labelName: "SAF Submitted Successfully",
                            labelKey: "SAF Submitted Successfully"
                        },
                        body: {
                            labelName:
                                "A saf number is generated for given assessee.",
                            labelKey: "A saf number is generated for given assessee."
                        },
                        tailText: {
                            labelName: "Acknowledgement No.",
                            labelKey: "Acknowledgement No."
                        },
                        number: applicationNumber
                    })
                }
            },
            iframeForPdf: {
                uiFramework: "custom-atoms",
                componentPath: "Div"
            },
            gotoHomeFooter
        };

    }
};

const screenConfig = {
    uiFramework: "material-ui",
    name: "acknowledgement",
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            props: {
                className: "common-div-css"
            }
        }
    },
    beforeInitScreen: (action, state, dispatch) => {
        const purpose = getQueryArg(window.location.href, "purpose");
        const status = getQueryArg(window.location.href, "status");
        const applicationNumber = getQueryArg(
            window.location.href,
            "applicationNumber"
        );
        const secondNumber = getQueryArg(window.location.href, "secondNumber");
        const tenant = getQueryArg(window.location.href, "tenantId");
        loadUlbLogo(tenant);
        const data = getAcknowledgementCard(
            state,
            dispatch,
            purpose,
            status,
            applicationNumber,
            secondNumber,
            tenant
        );
        set(action, "screenConfig.components.div.children", data);
        return action;
    }
};

export default screenConfig;