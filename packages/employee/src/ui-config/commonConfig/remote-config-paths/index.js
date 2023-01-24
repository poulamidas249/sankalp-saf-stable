const remoteConfigPath = (path, screenKey) => {
  let config = {};
  switch (path) {
    case "tradelicence":
    case "tradelicense-citizen":
      config = require(`egov-tradelicence/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    case "pt-hearing":
    case "pt-mutation":
    case "pt-saf":
    case "pt-notice":
    case "pt-common-screens":
    case "pt-inspection":
      config = require(`egov-pt/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    case "hrms":
      config = require(`egov-hrms/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    case "parking":
    case "parking-citizen":
      config = require(`egov-parking/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;

    // case "grievance":
    // case "grievance-citizen":
    //   config = require(`egov-grievance/ui-config/screens/specs/${path}/${screenKey}`).default;
    //   break;

    case "advertising":
    case "advertising-citizen":
      config = require(`egov-advertising/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;

    case "uc":
      config = require(`egov-uc/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    case "bpastakeholder":
      config = require(`egov-bpa/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    case "egov-bpa":
    case "oc-bpa":
      config = require(`egov-bpa/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    case "fire-noc":
      config = require(`egov-firenoc/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    case "receipts":
    case "abg":
    case "bills":
      config = require(`egov-abg/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    case "bill-amend":
      config = require(`egov-billamend/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    case "egov-common":
      config = require(`egov-common/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    case "wns":
    case "wns-citizen":
      config = require(`egov-wns/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    case "noc":
      config = require(`egov-noc/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    case "bnd":
    case "birth-citizen":
    case "birth-employee":
    case "birth-common":
    case "death-citizen":
    case "death-employee":
    case "death-common":
    case "bnd-common":
      config = require(`egov-bnd/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    default:
      config = require(`ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
  }
  return config;
};

export default remoteConfigPath;
