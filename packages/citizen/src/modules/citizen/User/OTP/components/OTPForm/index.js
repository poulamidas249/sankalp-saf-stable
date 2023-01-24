import React from "react";
import { TextField, Card, Image } from "components";
import { Button } from "egov-ui-framework/ui-atoms";
import Label from "egov-ui-kit/utils/translationNode";
import logo from "egov-ui-kit/assets/images/logo_black.png";
import { Icon } from "egov-ui-framework/ui-atoms";
import { CountdownTimer } from "egov-ui-framework/ui-atoms/index";
import "./index.css";
import { Link } from "react-router-dom";
import kmcLogo from "../../../../../../kmcAssets/img/logo-login.png"
import '../../../../../../kmcAssets/css/style-login.css'
import '../../../../../../kmcAssets/css/style.css'
import '../../../../../../kmcAssets/css/main.css'

const OTP = ({ handleFieldChange, form, phoneNumber, resendOTP, logoUrl, history, timerSwitch, completed, timeLeft, reset }) => {
  const fields = form.fields || {};
  const submit = form.submit;



  const tick = (leftTime) => {
  }


  return (
    <div>
      <div className="login-left">
        <div className="container">
          <div className="row">
            <div className="logo-ad col-lg-12"><img src={kmcLogo} /></div>
            <span className="border-b"></span>
          </div>
        </div>
      </div>


      <div className="login-right" style={{ height: '100vh' }}>

        <div className="ad-logo">
          <h2>Citizen Login in OTP </h2>
        </div>
        <div className="center login">
          <div className="login__field">
            <p> An OTP has been sent.</p>
            <br/>
              <p>Please check your message !</p><br/><br/>
                <TextField
                  errorStyle={{ bottom: "0px" }}
                  onChange={(e, value) => handleFieldChange("otp", value)}
                  id="otp"
                  {...fields.otp}
                  fullWidth={true}
                  type={"number"}
                />     {/* <input type="text" className="login__input" placeholder="Employee ID" /> */}
              </div>
                <div class="login__field">
                {timerSwitch ? (
               <div style={{ marginBottom: "24px",display:"flex",float:"right" }} className="text-right">
               <Label id="otp-trigger" className="otp-prompt" label="CORE_OTP_NOT_RECEIVE" />
               <span style={{ cursor: "pointer" }} onClick={() => {
                 resendOTP();
                 reset();
                 }}>
               <Label id="otp-resend" className="otp-resend" label="CORE_OTP_RESEND" />
               </span>
               </div>
            ) : (
              <div style={{ marginBottom: "24px" ,display:"flex",float:"right"}} className="text-right">
              <Label id="otp-resendt"className="otp-prompt" label="CORE_ANOTHER_OTP" />
              <CountdownTimer timeLeft={timeLeft} completeCallback={completed} tickCallback={tick} />
              <Label id="otp-resendt" label="CORE_OTP_SECONDS" />
              </div>
            )}
        </div>
              
                <div className="login__field">
                  <div className="form-group">
                    {/* <Link to="/user/login">
                      <span> User Login </span>
                    </Link> */}
                  </div>
                </div>
                <div className="login__field">
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary log-sign1" style={{ width: "100%" }} {...submit} >Continue</button>
                    {/* <a href="../dashboard.html" disabled="" className="btn btn-primary log-sign1" role="button" aria-disabled="true"> Login </a> */}
                  </div>
                </div>

              </div>
          </div>

        </div>
    // <Card
    //   className="col-sm-offset-4 col-sm-4  user-screens-card"
    //   textChildren={
    //     <div>
    //       <div className="rainmaker-displayInline" style={{ justifyContent: "center", alignItems: "center", marginBottom: "24px" }}>
    //         <div style={{}}>
    //           <Image className="mseva-logo" source={logoUrl ? logoUrl : `${logo}`} />
    //         </div >
    //       <div style={{ marginLeft: "7px" }}>
    //       <Label bold={true} fontSize="23px" label="|" />
    //       </div>
    //        <div style={{ marginLeft: "7px" }}>
    //           <Label bold={true} color="black" fontSize="24px" label="STATE_LABEL" />
    //        </div>
    //       </div>
    //       <Label className="otp-heading text-center" bold={true} dark={true} fontSize={16} label="CORE_OTP_HEADING" />
    //       <div className="citizen-otp-sent-message">
    //         <Label label="CORE_OTP_SENT_MESSAGE" />
    //         <Label labelClassName="otp-mobile-number" containerStyle={{ paddingLeft: "5px" }} label={phoneNumber} />
    //         <Icon
    //         style={{
    //           width: "22px",
    //           height: "22px",
    //           marginLeft: "4px"
    //         }}
    //         action="action"
    //         iconName={"edit"}
    //         onClick={() => { history.goBack() }}
    //       />
    //       </div>
    //       <Label label="CORE_COMMON_CHECK_MESSAGE" color={"#b3b3b3"} fontSize={"12px"} />
    // <TextField
    //   errorStyle={{ bottom: "0px" }}
    //   onChange={(e, value) => handleFieldChange("otp", value)}
    //   id="otp"
    //   {...fields.otp}
    //   fullWidth={true}
    //   type={"number"}
    // />


    //         {timerSwitch ? (
    //            <div style={{ marginBottom: "24px",display:"flex",float:"right" }} className="text-right">
    //            <Label id="otp-trigger" className="otp-prompt" label="CORE_OTP_NOT_RECEIVE" />
    //            <span style={{ cursor: "pointer" }} onClick={() => {
    //              resendOTP();
    //              reset();
    //              }}>
    //            <Label id="otp-resend" className="otp-resend" label="CORE_OTP_RESEND" />
    //            </span>
    //            </div>
    //         ) : (
    //           <div style={{ marginBottom: "24px" ,display:"flex",float:"right"}} className="text-right">
    //           <Label id="otp-resendt"className="otp-prompt" label="CORE_ANOTHER_OTP" />
    //           <CountdownTimer timeLeft={timeLeft} completeCallback={completed} tickCallback={tick} />
    //           <Label id="otp-resendt" label="CORE_OTP_SECONDS" />
    //           </div>
    //         )}         
    //        <Button
    //        {...submit}
    //         style={{
    //           height: "48px",     
    //           width:"100%"        
    //         }}
    //         variant={"contained"}
    //         color={"primary"}
    //       >
    //         <Label buttonLabel={true}   labelStyle={{fontWeight:500 }}  label="CORE_COMMON_CONTINUE" />
    //       </Button>
    //       {/* <Button {...submit} primary={true} fullWidth={true} /> */}
    //     </div>
    //   }
    // />
  );
};

          export default OTP;
