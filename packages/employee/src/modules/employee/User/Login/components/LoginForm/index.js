import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, TextField, Image } from "components";
import { CityPicker } from "modules/common";
import Label from "egov-ui-kit/utils/translationNode";
import logo from './img/logo.png'
import kmcLogo from "../../../../../../kmcAssets/img/logo-login.png"
import '../../../../../../kmcAssets/css/style-login.css'
import '../../../../../../kmcAssets/css/style.css'
import '../../../../../../kmcAssets/css/main.css'
// import './css/style.css'

const LoginForm = ({ handleFieldChange, form, onForgotPasswdCLick, logoUrl }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <div>
      <div className="login-left">
        <div className="container">
          <div className="row">
            <div className="logo-ad col-lg-12"><img src={kmcLogo} /></div>
            <span className="border-b" style={{maxWidth : '853px'}}></span>
          </div>
        </div>
      </div>


      <div className="login-right" style={{ height : '100vh'}}>

        <div className="ad-logo">
          <h2>Employee login </h2>
          <span className="border-b" style={{maxWidth : '529px'}} ></span>
          <h3>Welcome back! Please login to your account .</h3>
        </div>
        <div className="center login">
          <div className="login__field">
          <TextField onChange={(e, value) => handleFieldChange("username", value)} {...fields.username} />
            {/* <input type="text" className="login__input" placeholder="Employee ID" /> */}
          </div>
          <div className="login__field">
          <TextField onChange={(e, value) => handleFieldChange("password", value)} {...fields.password} />
            {/* <input type="password" className="login__input" placeholder="Password" /> */}
          </div>

          <div className="login__field">
            <div className="form-group">
            <Link to="/forgot-password">
              <span> Forgot Password </span>
              </Link>
            </div>
          </div>
          <div className="login__field">
            <div className="form-group">
            <button type="submit" className="btn btn-primary log-sign1" style={{width : "100%"}} {...submit} >Login</button>
              {/* <a href="../dashboard.html" disabled="" className="btn btn-primary log-sign1" role="button" aria-disabled="true"> Login </a> */}
            </div>
          </div>

        </div>
      </div>

    </div>


    // <div className="">
    //   <div className="ad-screen" style={{ background: './img/BG-screen.png', left: 0, top: 0 }}>
    //     <div className="container">
    //       <div className="row">
    //         <div className="logo-add col-lg-4" style={{ 'display' : 'inline !important'}}><img src={logo} /></div>

    //         <div className="col-lg-8">
    //           <div className="ad-logo">
    //             <h2>Employee login </h2>
    //             <span>kolkata municipal corporation</span>
    //           </div>
    //           <div className="center login">
    //             <p>The fields marked with * are mandatory</p>
    //             <div className="">
    //               <i className="zmdi zmdi-account"></i>
 
    //               {/* <input type="text" className="login__input" placeholder="User name / Email"> */}
    //             </div>
    //             <div className="">
    //               <i className="zmdi zmdi-lock-open"></i>
  
    //               {/* <input type="password" className="login__input" placeholder="Password"> */}
    //             </div>
    //             <div className="col-lg-12 col-md-12 ">
    //               <div className="ad-submit">
    //                 <button type="submit" className="btn btn-primary" {...submit} >Submit</button>
    //               </div>
    //               {/* <Link to="/forgot-password">
    //                <div style={{'marginLeft' :'20px !important'}}> <div className="ad-reg"> <button className="btn btn-primary">Forgot Password</button>	</div></div>
    //               </Link> */}
    //             </div>

    //             <div className="col-lg-12 col-md-12 "><p>The fields marked with * are mandatory</p> 	<p></p></div>
    //           </div>
    //           <p className="text-sm text-center m-t-xs"> 2022 KMC </p>

    //         </div>
    //       </div>
    //     </div>

    //   </div>
    // </div>

    // <Card
    //   className="user-screens-card col-lg-offset-4 col-lg-4 col-md-offset-4 col-md-4 col-sm-offset-4 col-sm-4"
    //   textChildren={
    //     <div>
    //       <div className="rainmaker-displayInline" style={{ justifyContent: "center" }}>
    //         <div style={{ marginBottom: "24px" }}>
    //           <Image className="mseva-logo" source={`${logo}`} />
    //         </div >
    //       <div style={{marginLeft:"7px", marginBottom: "24px" }}>
    //       <Label bold={true}  fontSize= "23px" label="|" />
    //       </div>
    //        <div style={{marginLeft:"7px" }}>
    //           <Label bold={true} color="black" fontSize= "24px" label="STATE_LABEL" />
    //        </div>
    //       </div>
    //       <Label style={{ marginBottom: "12px" }} className="text-center" bold={true} dark={true} fontSize={16} label="CORE_COMMON_LOGIN" />
    //       <TextField onChange={(e, value) => handleFieldChange("username", value)} {...fields.username} />
    //       <TextField onChange={(e, value) => handleFieldChange("password", value)} {...fields.password}  />
    //       <CityPicker onChange={handleFieldChange} fieldKey="city" field={fields.city} />
    //       <Link to="/forgot-password">
    //         <div style={{ float: "right" }}>
    //           <Label
    //             containerStyle={{ cursor: "pointer", position: "relative", zIndex: 10 }}
    //             labelStyle={{ marginBottom: "12px" }}
    //             className="forgot-passwd"
    //             fontSize={14}
    //             label="CORE_COMMON_FORGOT_PASSWORD"
    //           />
    //         </div>
    //       </Link>
    //       <Button {...submit} fullWidth={true} primary={true} />
    //     </div>
    //   }
    // />
  );
};

export default LoginForm;
