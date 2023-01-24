import {
    getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";

export const safInitiationCard = getCommonCard(
    {
        header: getCommonTitle(
            {
                labelName: "Type Of Self Assessment Initiation",
                labelKey: "Type Of Self Assessment Initiation"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),

        asseseDetailsConatiner: getCommonContainer({


            isSuoMoto: {
                uiFramework: "custom-containers",
                componentPath: "RadioGroupContainer",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 12
                },
                jsonPath: "Saf[0].asseseDetail.isSuoMoto",
                props: {
                    label: {
                        name: "Type Of SAF Initiation",
                        key: "Type Of SAF Initiation"
                    },
                    buttons: [
                        {
                            labelName: "SUO-MOTO",
                            labelKey: "SUO-MOTO",
                            value: "Y"
                        },
                        {
                            label: "SELF",
                            labelKey: "SELF",
                            value: "N"
                        }
                    ],
                    jsonPath:
                        "Saf[0].asseseDetail.isSuoMoto",
                    required: true
                },
                required: true,
                type: "array",

            },
        },
        {
            style:   process.env.REACT_APP_NAME === "Citizen" ?   {"display" : "none"}:{ }
        }
        ),
        
    },
    {
        style:   process.env.REACT_APP_NAME === "Citizen" ?   {"display" : "none"} :{ }
    }
);
