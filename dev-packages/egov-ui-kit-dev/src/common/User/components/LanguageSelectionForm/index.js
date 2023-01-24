import React from "react";
import { ButtonGroup, Card, Image } from "components";
import { Button } from "egov-ui-framework/ui-atoms";
import Label from "egov-ui-kit/utils/translationNode";
import logo from "egov-ui-kit/assets/images/logo_black.png";
import "./index.css";
import logoNew from '../../../../kmcAssets/img/logo.png'

const selectedLabelStyle = {
  color: "#ffffff",
};

const selectedStyle = {
  backgroundColor: "#fe7a51",
  border: "1px solid #fe7a51",
};

const defaultStyle = {
  border: "1px solid #484848",
  borderRadius: "1px",
  marginRight: "4.65%",
  height: "44px",
  lineHeight: "44px",
  width: "28.48%",
  padding: "0 16px",
};

const defaultLabelStyle = {
  textTransform: "none",
  fontWeight: "500",
  color: "#484848",
  verticalAlign: "initial",
  padding: 0,
};

const LanguageSelectionForm = ({ items, onLanguageSelect, value, onClick, logoUrl }) => {
  return (
    <Card
      className="col-sm-offset-4 col-sm-4 user-screens-card language-selection-card"
      textChildren={
        <div>
          <div className="rainmaker-displayInline" style={{ justifyContent: "center", alignItems: "center", marginBottom: "24px" }}>
            <div style={{}}>
              {/* <Image className="mseva-logo" source={logoUrl?logoUrl:logo} /> */}
              <div className="sidebar-brand">
                <h2>
                  <a href="" className="logo align-items-center scrollto float-start">
                    <img style={{ width: '100%', marginBottom: '15px' , height : '45px' }} src={logoNew} alt="" />
                  </a>
                </h2>
              </div>
            </div >
            <div style={{ marginLeft: "7px" , marginTop : '16px' }}>
              <Label bold={true} fontSize="23px" label="|" />
            </div>
            <div style={{ marginLeft: "7px" , marginTop : '16px'}}>
              <Label bold={true} color="black" fontSize="24px" label="KMC" />
            </div>
          </div>
          <form>
            <div className="rainmaker-displayInline" style={{ justifyContent: "center" }}>
              {items &&
                items.map((item, index) => {
                  return (
                    <div>
                      <Label bold={true} label={`LANGUAGE_${item.value.toUpperCase()}`} className="language-label" />
                      {index !== items.length - 1 && <span>|</span>}
                    </div>
                  );
                })}
            </div>
            <div className="button-toggle-container">
              <ButtonGroup
                items={items}
                onClick={onClick}
                selected={value}
                defaultStyle={defaultStyle}
                defaultLabelStyle={defaultLabelStyle}
                selectedStyle={selectedStyle}
                selectedLabelStyle={selectedLabelStyle}
                multiple={false}
              />
            </div>
            <div className="button-container">
              <Button
                id="continue-action"
                className="lang-continue-button"
                style={{
                  height: "48px",
                  width: "100%"
                }}
                variant={"contained"}
                color={"primary"}
                onClick={onLanguageSelect}
              >
                <Label buttonLabel={true} labelStyle={{ fontWeight: 500 }} label="CORE_COMMON_CONTINUE" />
              </Button>
              {/* <Button
                id="continue-action"
                className="lang-continue-button"
              
                label={}
                fullWidth={true}
              /> */}
            </div>
          </form>
        </div>
      }
    />
  );
};

export default LanguageSelectionForm;
