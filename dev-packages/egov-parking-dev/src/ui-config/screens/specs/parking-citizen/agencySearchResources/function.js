import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import { getAgencySearch } from "../../../../../ui-utils/commons";
import { validateFields } from "../../utils";
import { convertEpochToDate } from "../../utils/index";

export const searchApiCall = async (state, dispatch) => {
  // showHideTable(false, dispatch);
  // let searchScreenObject =
  //   state.screenConfiguration.preparedFinalObject.agencySearch;
  // console.log({ searchScreenObject });

  // const responseFromAPI = await getAgencySearch(dispatch, searchScreenObject);
  // const agencyList = responseFromAPI || [];
  // console.log({ agencyList });

  // let tenantId = get(
  //   state?.screenConfiguration?.preparedFinalObject,
  //   "searchScreen.tenantId"
  // );

  // let queryObject = [
  //   {
  //     key: "tenantId",
  //     value: tenantId,
  //   },
  //   { key: "limit", value: "10" },
  // ];

  // if (
  //   Object.keys(searchScreenObject).length == 0 ||
  //   Object.values(searchScreenObject).every((x) => x === "")
  // ) {
  //   console.log("Inside if block");
  //   dispatch(
  //     toggleSnackbar(
  //       true,
  //       {
  //         labelName: "Please fill at least one field to start search",
  //         labelKey: "Please fill at least one field to start search",
  //       },
  //       "warning"
  //     )
  //   );
  // } else {
  //   console.log("Inside else block");

  //   searchScreenObject.url = "/parking-services/viewAgency";

  // TODO: api call
  // const responseFromAPI = await getAgencySearch(dispatch, searchScreenObject);
  // const agencyList = (responseFromAPI && responseFromAPI.Bills) || [];
  // console.log({ agencyList });

  // const agencyTableData = agencyList.map((item) => {
  //   return {
  //     agencyCode: get(item, "agencyCode"),
  //     agencyName: get(item, "agencyName"),
  //     regNum: get(item, "regNum"),
  //   };
  // });

  // dispatch(
  //   prepareFinalObject(
  //     "searchScreenMdmsData.agencySearchResponse",
  //     agencyList
  //   )
  // );

  // const uiConfigs = get(
  //   state.screenConfiguration.preparedFinalObject,
  //   "searchScreenMdmsData.common-masters.uiCommonPay"
  // );

  // const configObject = uiConfigs.filter(
  //   (item) => item.code === searchScreenObject.businesService
  // );

  // try {
  // let data = agencyTableData.map((item) => ({
  //   ["AGENCY_CODE"]: item.agencyCode || "-",
  //   ["AGENCY_NAME"]: item.agencyName || "-",
  //   ["REGISTRATION_NO"]: item.regNum || "-",
  // }));

  // dispatch(
  //   handleField(
  //     "agencySearch",
  //     "components.div.children.searchResults",
  //     "props.data",
  //     data
  //   )
  // );
  // dispatch(
  //   handleField(
  //     "agencySearch",
  //     "components.div.children.searchResults",
  //     "props.tableData",
  //     agencyTableData
  //   )
  // );
  // dispatch(
  //   handleField(
  //     "agencySearch",
  //     "components.div.children.searchResults",
  //     "props.rows",
  //     agencyTableData.length
  //   )
  // );

  //   showHideTable(true, dispatch);
  // } catch (error) {
  //   dispatch(toggleSnackbar(true, error.message, "error"));
  // }
  // }
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "agencySearch",
      "components.div.children.searchResults",
      "visible",
      true
    )
  );
};

const getActionItem = (status) => {
  switch (status) {
    case "ACTIVE":
      return "ABG_PAY";
    case "CANCELLED":
    case "EXPIRED":
      return "ABG_GENERATE_NEW_BILL";
    case "PAID":
      return "ABG_DOWNLOAD_RECEIPT";
    case "PARTIALLY_PAID":
      return "ABG_PARTIALLY_PAID";
  }
};
