import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import { httpRequest } from "../../../../../ui-utils/api";
import {
    getQueryArg,
    getSelectedTabIndex
} from "egov-ui-framework/ui-utils/commons";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";

import { convertDateToEpoch, validateFields, getCommonApplyFooter } from "../../utils";
import {
    toggleSnackbar,
    toggleSpinner
} from "egov-ui-framework/ui-redux/screen-configuration/actions";


const callBackForEdit = async (state, dispatch) => {
    let safNumber = getQueryArg(window.location.href, "safNumber");
    let url = `/pt-saf/apply?safNo=${safNumber}&isEdit=true`
    dispatch(
        setRoute(
            url
        )
    );
  
};
export const footer = getCommonApplyFooter({

    edit: {
        componentPath: "Button",
        props: {
            variant: "contained",
            color: "primary",
            className: "framework-responsive-button"
        },
        children: {
            submitButtonLabel: getLabel({
                labelName: "Edit",
                labelKey: "Edit"
            })
        },
        onClickDefination: {
            action: "condition",
            callBack: callBackForEdit
        },
        visible: process.env.REACT_APP_NAME === "Citizen" ? false : true
    }
});