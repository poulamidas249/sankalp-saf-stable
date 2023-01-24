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
  showHideTable(false, dispatch);
  // let tenantId = get(
  //   state.screenConfiguration.preparedFinalObject,
  //   "searchScreen.tenantId"
  // );
  let queryObject = [{ key: "limit", value: "10" }];
  // object of input fields
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );

  if (
    Object.keys(searchScreenObject).length == 0 ||
    Object.values(searchScreenObject).every((x) => x === "")
  ) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field to start search",
          labelKey: "Please fill at least one field to start search",
        },
        "warning"
      )
    );
  } else {
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key] &&
        searchScreenObject[key].trim() !== ""
      ) {
        queryObject.push({ key: key, value: searchScreenObject[key].trim() });
      }
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key] == ""
      ) {
        delete searchScreenObject[key];
      }
    }

    // let serviceObject = get(
    //   state.screenConfiguration.preparedFinalObject,
    //   "searchScreenMdmsData.BillingService.BusinessService"
    // ).filter((item) => item.code === searchScreenObject.businesService);

    searchScreenObject.url = "viewAgency";

    // searchScreenObject.url =
    //   serviceObject && serviceObject[0] && serviceObject[0].billGineiURL;

    // const isAdvancePayment =
    //   serviceObject && serviceObject[0] && serviceObject[0].isAdvanceAllowed;

    // if (!searchScreenObject.url) {
    //   dispatch(
    //     toggleSnackbar(
    //       true,
    //       {
    //         labelName: "Selected Service Category is Not Available for Search",
    //         labelKey: "Selected Service Category is Not Available for Search",
    //       },
    //       "error"
    //     )
    //   );
    //   return;
    // }

    if (!searchScreenObject.url) {
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "Selected Service Category is Not Available for Search",
            labelKey: "Selected Service Category is Not Available for Search",
          },
          "error"
        )
      );
      return;
    }

    searchScreenObject.tenantId =
      process.env.REACT_APP_NAME === "Citizen" ? tenantId : getTenantId();

    console.log({ searchScreenObject });

    // TODO: api call
    // const responseFromAPI = await getAgencySearch(dispatch, searchScreenObject);
    // const agencyList = (responseFromAPI && responseFromAPI.Bills) || [];

    // TODO: set the api data
    // const agencyList = responseFromAPI || [];
    const agencyList = [
      {
        agencyId: 4,
        createdOn: "2022-09-01T13:34:48.692+00:00",
        agencyCode: "agency004",
        agencyName: "eKMCparking004",
        address: "Howrah",
        pincode: 111114,
        contactName: "Suvam",
        contactMobile: 9876543214,
        contactEmail: "eKMCparking004@pwc.com",
        blacklist: "No",
        regNum: "eKMCparking004reg",
        pan: "ABCDE1234I",
      },
    ];
    const agencyTableData = agencyList.map((item) => {
      return {
        agencyCode: get(item, "agencyCode"),
        agencyName: get(item, "agencyName"),
        regNum: get(item, "regNum"),
      };
    });

    dispatch(
      prepareFinalObject(
        "searchScreenMdmsData.agencySearchResponse",
        agencyList
      )
    );

    // const uiConfigs = get(
    //   state.screenConfiguration.preparedFinalObject,
    //   "searchScreenMdmsData.common-masters.uiCommonPay"
    // );
    // const configObject = uiConfigs.filter(
    //   (item) => item.code === searchScreenObject.businesService
    // );

    // try {
    let data = agencyTableData.map((item) => ({
      ["AGENCY_CODE"]: item.agencyCode || "-",
      ["AGENCY_NAME"]: item.agencyName || "-",
      ["REGISTRATION_NO"]: item.regNum || "-",
    }));

    console.log({ data });

    dispatch(
      handleField(
        "agencySearch",
        "components.div.children.searchResults",
        "props.data",
        data
      )
    );
    dispatch(
      handleField(
        "agencySearch",
        "components.div.children.searchResults",
        "props.tableData",
        agencyTableData
      )
    );
    dispatch(
      handleField(
        "agencySearch",
        "components.div.children.searchResults",
        "props.rows",
        agencyTableData.length
      )
    );

    showHideTable(true, dispatch);
    // }
    // catch (error) {
    //   dispatch(toggleSnackbar(true, error.message, "error"));
    // }
  }
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
