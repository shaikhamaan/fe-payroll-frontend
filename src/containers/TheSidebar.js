import React from "react";
import { useSelector, useDispatch } from "react-redux";
import BrandLogo from "src/assets/images/logo-brand.png";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";
import { useState } from "react";
import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";
import localStorageConstants from "src/constants/localstorageConstants";

const TheSidebar = () => {
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();
  const show = useSelector((state) => state.commonReducer.sidebarShow);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img src={BrandLogo} height={50} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation.filter((item) => item?.showto?.includes(role))}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
