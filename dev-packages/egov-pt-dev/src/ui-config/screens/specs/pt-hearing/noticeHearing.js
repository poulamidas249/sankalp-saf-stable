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

const getNoticeNo = async (action, state, dispatch) => {
  let noticeNo = get(
    state.screenConfiguration.preparedFinalObject,
    "noticeHearing.noticeNo",
    ""
  );
  dispatch(prepareFinalObject("noticeNo", noticeNo));
};

const noticeHearing = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Rate Card Entry",
      labelKey: "Rate Card Entry",
    },
    {
      style: {
        marginBottom: 18,
      },
    }
  ),
  noticeHearingContainer: getCommonContainer({
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
      jsonPath: "noticeHearing.noticeNo",
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
  }),
});

export default noticeHearing;
