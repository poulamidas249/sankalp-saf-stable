import {
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import store from "ui-redux/store";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { validateFields } from "../utils/index";
import {
  parkingSummary,
  agencySummary,
} from "./parkingAreaAllocationResources/applicantSummary";
import { httpRequest } from "../../../../ui-utils";

const getName = () => {
  let state = store.getState();

  let heading = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm"
  );
  return heading;
};

const header = getCommonHeader({
  labelName: `Parking Area Allocation Master ${getName()} Record`,
  labelKey: `Parking Area Allocation Master ${getName()} Record`,
});

export const submitApplication = async (state, dispatch) => {
  let selectedParkingId;
  let selectedTenderId;

  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "areaAllocationForm",
    {}
  );

  let parkingData = get(
    state.screenConfiguration.preparedFinalObject.areaAllocationMasterMdmsData
      .areaAllocation,
    "parkingList",
    {}
  );

  let agencyData = get(
    state.screenConfiguration.preparedFinalObject.areaAllocationMasterMdmsData
      .areaAllocation,
    "agencyList",
    {}
  );

  let tenderData = get(
    state.screenConfiguration.preparedFinalObject.areaAllocationMasterMdmsData
      .areaAllocation,
    "tenderList",
    {}
  );

  if (parkingData.length > 0) {
    parkingData.forEach((parking) => {
      if (parking.code == searchScreenObject.parkingId) {
        selectedParkingId = parking.id;
      }
    });
  }

  if (tenderData.length > 0) {
    tenderData.forEach((tender) => {
      if (tender.code == searchScreenObject.tenderId) {
        selectedTenderId = tender.id;
      }
    });
  }

  if (Object.keys(searchScreenObject).length == 0) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields to save",
          labelKey: "Please fill valid fields to save",
        },
        "error"
      )
    );
    return;
  }

  let formValid = false;
  if (searchScreenObject.parkingId != "" && searchScreenObject.tenderId != "") {
    formValid = true;
  }

  if (!formValid) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields to save",
          labelKey: "ERR_PT_FILL_VALID_FIELDS",
        },
        "error"
      )
    );
    return;
  }

  const isParkingIdValid = validateFields(
    "components.div.children.areaContainer.children.cardContent.children.areaAllocationForm.children.parkingId",
    state,
    dispatch,
    "newParkingAreaAllocation"
  );

  const isContractIdValid = validateFields(
    "components.div.children.areaContainer.children.cardContent.children.areaAllocationForm.children.tenderId",
    state,
    dispatch,
    "newParkingAreaAllocation"
  );

  if (!(isParkingIdValid && isContractIdValid)) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please validate the form",
          labelKey: "Please validate the form",
        },
        "error"
      )
    );
    return;
  } else {
    formValid = true;
    let selectedId;
    let requestBody =
      state.screenConfiguration.preparedFinalObject.areaAllocationForm;

    let searchAllocationData =
      state.screenConfiguration.preparedFinalObject.agencySearchResult;

    searchAllocationData &&
      searchAllocationData.length > 0 &&
      searchAllocationData.map((allocation) => {
        if (
          allocation.parkingId == selectedParkingId &&
          allocation.tenderId == selectedTenderId
        ) {
          selectedId = allocation.id;
        }
      });

    let requestData = { ...requestBody };
    requestData.parkingId = selectedParkingId;

    requestData.tenderId = selectedTenderId;
    requestData.id = selectedId;

    let typeOfForm = state.screenConfiguration.preparedFinalObject.typeOfForm;

    if (typeOfForm == "New") {
      try {
        let payload = null;
        payload = await httpRequest(
          "post",
          "/parking-services/setParkingAllocation",
          "_search",
          [],
          requestData
        );

        let status = payload.status;

        if (status == "Successful") {
          dispatch(
            toggleSnackbar(
              true,
              {
                labelName: "Parking Area Allocation Record successfully saved!",
                labelKey: "Parking Area Allocation Record successfully saved!",
              },
              "success"
            )
          );
          dispatch(prepareFinalObject("newAreaAllocationForm", get(payload)));

          setRoute(`/parking-citizen/parkingAreaAllocation`);
        } else if (status == "Failed") {
          dispatch(
            toggleSnackbar(
              true,
              {
                labelName: payload.statusDescription,
                labelKey: payload.statusDescription,
              },
              "error"
            )
          );
        }
      } catch (e) {
        console.log(e);
      }
    } else if (typeOfForm == "Update") {
      try {
        let id =
          state.screenConfiguration.preparedFinalObject.editAreaAllocationForm
            .idParkingForUpdate;
        requestData.id = id;
        let payload = null;
        payload = await httpRequest(
          "post",
          "/parking-services/updateParkingAllocation",
          "_search",
          [],
          requestData
        );

        let status = payload.status;
        if (status == "Successful") {
          dispatch(
            toggleSnackbar(
              true,
              {
                labelName: "Parking Allocation Record successfully updated",
                labelKey: "Parking Allocation Record successfully updated",
              },
              "success"
            )
          );
          dispatch(prepareFinalObject("newAreaAllocationForm", get(payload)));

          dispatch(setRoute(`/parking-citizen/parkingAreaAllocation`));
        } else if (status == "Failed")
          dispatch(
            toggleSnackbar(
              true,
              {
                labelName: payload.statusDescription,
                labelKey: payload.statusDescription,
              },
              "error"
            )
          );
      } catch (e) {
        console.log(e);
      }
    }
  }
};

const setDisableField = () => {
  const state = store.getState();
  let service = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm"
  );

  if (service == "true") {
    return false;
  } else {
    return true;
  }
};

const getMDMSParkingAllocationData = async (action, state, dispatch) => {
  try {
    let payload = null;
    payload = await httpRequest(
      "get",
      "/parking-services/getParkingLotListForAllocation",
      "_search",
      [],
      {}
    );

    let types = [];
    if (payload) {
      types = payload.map((item) => {
        return {
          id: item.parkingId,
          code: item.parkingName,
        };
      });
    }

    dispatch(
      prepareFinalObject(
        "areaAllocationMasterMdmsData.areaAllocation.parkingAllocationList",
        types
      )
    );
  } catch (e) {
    console.log(e);
  }
};

const parkingDropdown = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "areaAllocationForm.parkingId",
  required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer",
    },
    label: {
      labelName: "Parking Name",
      labelKey: "Parking Name",
    },

    placeholder: {
      labelName: "Select Parking Name",
      labelKey: "Select Parking Name",
    },
    sourceJsonPath:
      "areaAllocationMasterMdmsData.areaAllocation.parkingAllocationList",
    labelsFromLocalisation: true,
    suggestions: [],
    fullwidth: true,
    required: true,
    isClearable: true,
    inputLabelProps: {
      shrink: true,
    },
  },
  afterFieldChange: (action, state, dispatch) => {
    const allParkingData = get(
      state.screenConfiguration.preparedFinalObject,
      "areaAllocationMasterMdmsData.allocationDropdownData",
      ""
    );

    const selectedParkingId = get(
      state.screenConfiguration.preparedFinalObject,
      "areaAllocationForm.parkingId",
      ""
    );

    if (allParkingData.length > 0) {
      allParkingData.forEach((item) => {
        if (item.parkingName == selectedParkingId) {
          dispatch(prepareFinalObject("selectedParkingInformation", item));
        }
      });
    }
  },

  gridDefination: {
    xs: 12,
    sm: 4,
  },
  disabled: setDisableField(),
};

const tenderDropdown = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "areaAllocationForm.tenderId",
  required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer",
    },
    label: {
      labelName: "Contract Name",
      labelKey: "Contract Name",
    },

    placeholder: {
      labelName: "Select Contract Name",
      labelKey: "Select Contract Name",
    },
    sourceJsonPath: "areaAllocationMasterMdmsData.areaAllocation.tenderList",
    labelsFromLocalisation: true,
    suggestions: [],
    fullwidth: true,
    required: true,
    isClearable: true,
    inputLabelProps: {
      shrink: true,
    },
  },
  afterFieldChange: async (action, state, dispatch) => {
    let tenderId;

    const allTenderData = get(
      state.screenConfiguration.preparedFinalObject,
      "areaAllocationMasterMdmsData.areaAllocation.tenderList",
      ""
    );

    const selectedTenderId = get(
      state.screenConfiguration.preparedFinalObject,
      "areaAllocationForm.tenderId",
      ""
    );

    if (allTenderData.length > 0) {
      allTenderData.forEach((item) => {
        if (item.code == selectedTenderId) {
          tenderId = item.id;
        }
      });
    }

    // call api for tender info
    let objectForPayload = { tenderId: tenderId };
    try {
      let payload = null;
      payload = await httpRequest(
        "post",
        "/parking-services/viewAgencyDetails",
        "",
        [],
        objectForPayload
      );
      // dispatch(
      //   handleField(
      //     "newParkingAreaAllocation",
      //     "components.div.children.detailsAreaContainer",
      //     "visible",
      //     true
      //   )
      // );
      dispatch(prepareFinalObject("selectedTenderInformation", payload));
    } catch (e) {
      console.log(e);
    }
  },
  gridDefination: {
    xs: 12,
    sm: 4,
  },
};

const getAreaAllocationData = async (action, state, dispatch) => {
  const clickedParkingCode = get(
    state.screenConfiguration.preparedFinalObject,
    "editAreaAllocationForm.clickedAllocationData.parkingId",
    ""
  );

  const clickedTenderCode = get(
    state.screenConfiguration.preparedFinalObject,
    "editAreaAllocationForm.clickedAllocationData.tenderId",
    ""
  );

  const typeOfForm = get(
    state.screenConfiguration.preparedFinalObject,
    "typeOfForm",
    ""
  );

  if (typeOfForm == "New") {
    dispatch(
      prepareFinalObject("areaAllocationForm", {
        parkingId: "",
        tenderId: "",
      })
    );
  } else {
    setTimeout(() => {
      let parkingValue = "";
      let contractValue = "";
      let parkingIdForUpdate = "";
      // let parkingIdForUpdate = "";

      // const parkingListFromApi = get(
      //   state.screenConfiguration.preparedFinalObject,
      //   "areaAllocationMasterMdmsData.allocationDropdownData",
      //   ""
      // );

      const parkingList = get(
        state.screenConfiguration.preparedFinalObject,
        "areaAllocationMasterMdmsData.areaAllocation.parkingList",
        ""
      );

      const contractList = get(
        state.screenConfiguration.preparedFinalObject,
        "areaAllocationMasterMdmsData.areaAllocation.tenderList",
        ""
      );
      const parkingTableData = get(
        state.screenConfiguration.preparedFinalObject,
        "areaAllocationTableData",
        ""
      );

      const clickedTenderName = get(
        state.screenConfiguration.preparedFinalObject,
        "editAreaAllocationForm.clickedAllocationData.tenderName",
        ""
      );
      const clickedParkingId = get(
        state.screenConfiguration.preparedFinalObject,
        "editAreaAllocationForm.clickedAllocationData.parkingId",
        ""
      );

      if (parkingTableData.length > 0) {
        parkingTableData.forEach((item) => {
          if (item.tenderName == clickedTenderName) {
            store.dispatch(
              prepareFinalObject(
                "editAreaAllocationForm.idParkingForUpdate",
                item.id
              )
            );
          }
        });
      }

      if (parkingList.length > 0) {
        parkingList.forEach((item) => {
          if (item.id == clickedParkingCode) {
            parkingValue = item.code;
          }
        });
      }

      if (contractList.length > 0) {
        contractList.forEach((item) => {
          if (item.id == clickedTenderCode) {
            contractValue = item.code;
          }
        });
      }

      dispatch(
        handleField(
          "newParkingAreaAllocation",
          "components.div.children.areaContainer.children.cardContent.children.areaAllocationForm.children.parkingId",
          "props.value",
          parkingValue
        )
      );
      dispatch(
        handleField(
          "newParkingAreaAllocation",
          "components.div.children.areaContainer.children.cardContent.children.areaAllocationForm.children.tenderId",
          "props.value",
          contractValue
        )
      );
    }, 500);
  }
};

const setHeader = (action, state, dispatch) => {
  setTimeout(() => {
    let state = store.getState();
    let heading = get(
      state.screenConfiguration.preparedFinalObject,
      "typeOfForm"
    );
    dispatch(
      handleField(
        "newParkingAreaAllocation",
        "components.div.children.headerDiv.children.header.children.key",
        "props.labelKey",
        `Parking Area Allocation Master ${heading} Record`
      )
    );
  }, 100);
};

const setFieldSet = (action, state, dispatch) => {
  setTimeout(() => {
    let state = store.getState();

    let heading = get(
      state.screenConfiguration.preparedFinalObject,
      "typeOfForm"
    );

    if (heading == "New") {
      dispatch(
        handleField(
          "newParkingAreaAllocation",
          "components.div.children.areaContainer.children.cardContent.children.areaAllocationForm.children.parkingId",
          "props.disabled",
          false
        )
      );
    } else if (heading == "Update") {
      dispatch(
        handleField(
          "newParkingAreaAllocation",
          "components.div.children.areaContainer.children.cardContent.children.areaAllocationForm.children.parkingId",
          "props.disabled",
          true
        )
      );
    }
  }, 100);
};

const getData = async (action, state, dispatch) => {
  await getAreaAllocationData(action, state, dispatch);
};

const newParkingAreaAllocation = {
  uiFramework: "material-ui",
  name: "newParkingAreaAllocation",

  beforeInitScreen: (action, state, dispatch) => {
    getMDMSParkingAllocationData(action, state, dispatch);
    setHeader(action, state, dispatch);
    setFieldSet(action, state, dispatch);
    getData(action, state, dispatch);
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: {
          margin: "0px 16px 88px 16px",
        },
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6,
              },
              ...header,
            },
          },
        },

        areaContainer: getCommonCard({
          areaAllocationForm: getCommonContainer({
            parkingId: parkingDropdown,
            tenderId: tenderDropdown,

            saveButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 12,
              },
              props: {
                variant: "contained",
                style: {
                  color: "white",
                  margin: "8px",
                  backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
                  borderRadius: "2px",
                  width: "220px",
                  height: "48px",
                  float: "right",
                },
              },
              children: {
                buttonLabel: getLabel({
                  labelName: "Save",
                  labelKey: "Save",
                }),
              },
              onClickDefination: {
                action: "condition",
                callBack: submitApplication,
              },
            },
          }),
        }),

        detailsAreaContainer: getCommonCard({
          parkingDetails: parkingSummary,
          agencySummary: agencySummary,
        }),
      },
    },
  },
};

export default newParkingAreaAllocation;
