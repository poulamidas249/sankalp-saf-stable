import {
    getCommonCard,
    getCommonContainer,
    getCommonHeader,
    getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
    getFileUrlFromAPI,
    getQueryArg,
    getTransformedLocale
} from "egov-ui-framework/ui-utils/commons";
import jp from "jsonpath";
import get from "lodash/get";
import set from "lodash/set";
import { applicantSummary } from "./propertyDetailResource/applicantSummary";
import { institutionSummary } from "./propertyDetailResource/applicantSummary";
import { documentsSummary } from "./summaryResource/documentsSummary";
import { estimateSummary } from "./summaryResource/estimateSummary";
import { footer } from "./propertyDetailResource/footer";

import { propertySummary } from "./propertyDetailResource/propertySummary";
import { assessmentSummary } from "./propertyDetailResource/assessmentSummary";

import { generateBill } from "../utils/index";

const header = getCommonContainer({
    header: getCommonHeader({
        labelName: "Property Information",
        labelKey: "PT_PROPERTY_INFO_HEADER"
    }),
    propertyId: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-pt",
        componentPath: "PropertyIdContainer",
        props: {
            number: getQueryArg(window.location.href, "propertyId")
        }
    },
});

const prepareDocumentsView = async (state, dispatch) => {
    let documentsPreview = [];
    let reduxDocuments = get(
        state,
        "screenConfiguration.preparedFinalObject.documentsUploadRedux",
        {}
    );
    jp.query(reduxDocuments, "$.*").forEach(doc => {
        if (doc.documents && doc.documents.length > 0) {
            documentsPreview.push({
                title: getTransformedLocale(doc.documentCode),
                name: doc.documents[0].fileName,
                fileStoreId: doc.documents[0].fileStoreId,
                linkText: "View"
            });
        }
    });
    let fileStoreIds = jp.query(documentsPreview, "$.*.fileStoreId");
    let fileUrls =
        fileStoreIds.length > 0 ? await getFileUrlFromAPI(fileStoreIds) : [];
    documentsPreview = documentsPreview.map(doc => {
        doc["link"] = fileUrls[doc.fileStoreId];
        return doc;
    });
    dispatch(prepareFinalObject("documentsPreview", documentsPreview));
};

const screenConfig = {
    uiFramework: "material-ui",
    name: "newPage",
    
    components: {
        testTT: getCommonCard({
            applicationsCard: {
                uiFramework: "custom-atoms-local",
                moduleName: "egov-pt",
                componentPath: "TestAtoms"
            }
        }),
        // testTTdsf: getCommonCard({
        //     applicationsCardsdaf: {
        //         uiFramework: "custom-atoms-local",
        //         moduleName: "egov-pt",
        //         componentPath: "Test"
        //     }
        // })
    
    }
}

export default screenConfig;

