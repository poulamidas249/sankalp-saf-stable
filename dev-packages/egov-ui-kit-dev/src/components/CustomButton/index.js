import React from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";
import { handleFieldChange, initForm, submitForm, deleteForm } from "egov-ui-kit/redux/form/actions";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";

//button component
const Button = ({ label, jsonPath, onClickFunc, state , dispatch ,  ...rest }) => {  
  return <RaisedButton label={label} onClick = { ()=>onClickFunc(state , dispatch)}    {...rest} />;
};

Button.propTypes = {
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  style: PropTypes.object,
};


const mapStateToProps = (state) => {
    return { state};
  };

  const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Button);
 
