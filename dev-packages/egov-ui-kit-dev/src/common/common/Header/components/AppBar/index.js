import React from "react";
import { AppBar, Icon } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import UserSettings from "../UserSettings";
import Toolbar from "material-ui/Toolbar";
import Badge from "@material-ui/core/Badge";
import digitLogo from "egov-ui-kit/assets/images/Digit_logo.png";
import pbLogo from "egov-ui-kit/assets/images/pblogo.png";
import IconButton from "material-ui/IconButton";
import { onNotificationClick } from "egov-ui-kit/utils/commons";
import "./index.css";
import { connect } from "react-redux";
import get from "lodash/get";
import '../../../../../kmcAssets/css/admin.css'

const styles = {
  titleStyle: { fontSize: "20px", fontWeight: 500 },
};

const iconButtonStyle = {
  paddingLeft: 0,
  paddingRight: 0,
  width: 35,
};

// handle listners
const EgovAppBar = ({
  className,
  ulbName,
  defaultTitle,
  ulbLogo,
  title,
  titleAddon,
  isHomeScreen,
  role,
  fetchLocalizationLabel,
  userInfo = {},
  onToolBarIconClick,
  refreshButton,
  sortButton,
  searchButton,
  helpButton,
  notificationButton,
  sortDialogOpen,
  history,
  handleItemClick,
  hasLocalisation,
  notificationsCount,
  isUserSetting,
  logoImage,
  ...rest
}) => {
  return (
    <div>
           {/* title={
          <div className="search-wrapper" style={{ height : '100%'}}>
              <div className="input-group" style={{ marginTop : '12px'}}>
                <input type="text" className="form-control input-text" placeholder="Search products...." />
                <div className="input-group-append" style={{ marginTop : '-12px'}}>
                  <button className="btn btn-outline-warning btn-lg" type="button"><i className="bi bi-search"></i></button>
                </div>
              </div>
          </div>
        } */}
      <AppBar
        // className={isHomeScreen && role === "citizen" ? "home-screen-appbar" : className || "header-with-drawer"}
        className={className || "header-with-drawer"}
   
        titleStyle={styles.titleStyle}
        {...rest}
      >
        <Toolbar className="app-toolbar" style={{ padding: "0px", height: "64px", background: "#ffffff" }}>
          <UserSettings
            hasLocalisation={hasLocalisation}
            fetchLocalizationLabel={fetchLocalizationLabel}
            onIconClick={onToolBarIconClick}
            userInfo={userInfo}
            handleItemClick={handleItemClick}
            isUserSetting={isUserSetting}
          />
        </Toolbar>
        {notificationButton && role === "citizen" && (
          <div className="notification-icon-web notification-icon" onClick={(e) => onNotificationClick(history)}>
            {notificationsCount ? (
              <IconButton aria-label="4 pending messages">
                <Badge badgeContent={notificationsCount} color="primary">
                  <Icon action="social" name="notifications-none" color="#000000" fill="#000000" />
                </Badge>
              </IconButton>
            ) : (
              <Icon action="social" name="notifications-none" color="#000000" fill="#000000" />
            )}
          </div>
        )}

        {/* <div className="appbar-right-logo">
          <img src={logoImage?logoImage:digitLogo} />
        </div> */}
        <div className="icon-button">
          {refreshButton && (
            <IconButton style={iconButtonStyle} onClick={(e) => location.reload()}>
              <Icon action="navigation" name="refresh" color="#fff" />
            </IconButton>
          )}
          {sortButton && (
            <IconButton style={iconButtonStyle} onClick={sortDialogOpen}>
              <Icon action="action" name="swap-vert" color="#fff" />
            </IconButton>
          )}
          {searchButton && role === "ao" && (
            <IconButton style={iconButtonStyle} onClick={(e) => onSearchClick(history)}>
              <Icon action="action" name="search" color="#fff" />
            </IconButton>
          )}
          {helpButton && role === "citizen" && (
            <IconButton style={iconButtonStyle}>
              <Icon action="action" name="help" color="#fff" />
            </IconButton>
          )}
        </div>
        {notificationButton && role === "citizen" && (
          <div className="notification-icon-mobile notification-icon" onClick={(e) => onNotificationClick(history)}>
            {notificationsCount ? (
              <IconButton aria-label="4 pending messages">
                <Badge badgeContent={notificationsCount} color="primary">
                  <Icon action="social" name="notifications-none" color="#fff" />
                </Badge>
              </IconButton>
            ) : (
              <Icon action="social" name="notifications-none" color="#fff" />
            )}
          </div>
        )}
      </AppBar>
    </div>
  );
};

const onSearchClick = (history) => {
  history.push("search-complaint");
};

const mapStateToProps = ({ common }) => {
  const { stateInfoById } = common;
  let logoImage = get(stateInfoById, "0.logoUrl");
  return { logoImage };
};

export default connect(
  mapStateToProps,
  null
)(EgovAppBar);
