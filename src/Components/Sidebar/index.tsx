import React, { useEffect, useState } from "react";

export interface SideBarProps {
  children?: React.ReactNode;
}

const SideBar: React.FC<SideBarProps> = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const bodyHasSidebarCollapseClass =
      document.body.classList.contains("sidebar-collapse");
    console.log(bodyHasSidebarCollapseClass);
    setIsSidebarCollapsed(bodyHasSidebarCollapseClass);
  }, []);
  return (
    <div
      className="sidebar bg-white light shadow-md border-r border-r-gray-200 light:border-none fixed top-0 bottom-0 z-20 hidden lg:flex flex-col items-stretch shrink-0"
      data-drawer="true"
      data-drawer-class="drawer drawer-start top-0 bottom-0"
      data-drawer-enable="true|lg:false"
      id="sidebar"
    >
      <div
        className="sidebar-header hidden lg:flex items-center relative justify-center px-3 lg:px-1 shrink-0"
        id="sidebar_header"
      >
        <div
          data-toggle="body"
          data-toggle-class="sidebar-collapse"
          id="sidebar_toggle"
        >
          <a
            className={`${isSidebarCollapsed ? "hidden" : ""}`}
            href="html/demo1/index.html"
          >
            <img
              className="default-logo min-h-[22px] max-w-none"
              src="/media/logo-pgn.png"
              alt=""
            />
            <img
              className="small-logo min-h-[22px] max-w-none"
              src="/media/logo-pgn.png"
              alt=""
            />
          </a>
          <div className="hidden [html.light_&]:block">
            {/* <button
              title="Toggle sidebar"
              className="btn btn-icon btn-icon-md size-[30px] rounded-lg border border-gray-300 bg-light text-gray-500 hover:text-gray-700 toggle absolute left-full top-2/4 -translate-x-2/4 -translate-y-2/4"
            >
              <i className="ki-filled ki-black-left-line toggle-active:rotate-180 transition-all duration-300"></i>
            </button> */}
          </div>
          <div className="[html.light_&]:hidden light">
            <button
              title="btn"
              className="btn btn-icon btn-icon-md size-[30px] rounded-lg border border-gray-200 bg-light text-gray-500 hover:text-gray-700 toggle absolute left-full top-2/4 -translate-x-2/4 -translate-y-2/4"
            >
              <i className="ki-filled ki-black-left-line toggle-active:rotate-180 transition-all duration-300"></i>
            </button>
          </div>
        </div>
      </div>
      <div
        className="sidebar-content flex grow shrink-0 py-5 pr-2"
        id="sidebar_content"
      >
        <div
          className="scrollable-y-hover grow shrink-0 flex pl-2 lg:pl-5 pr-1 lg:pr-3"
          data-scrollable="true"
          data-scrollable-dependencies="#sidebar_header"
          data-scrollable-height="auto"
          data-scrollable-offset="0px"
          data-scrollable-wrappers="#sidebar_content"
          id="sidebar_scrollable"
        >
          {/* Sidebar Menu */}
          <div
            className="menu flex flex-col grow gap-0.5 mt-5"
            data-menu="true"
            data-menu-accordion-expand-all="false"
            id="sidebar_menu"
          >
            {/* <div
              className="menu-item here show"
              data-menu-item-toggle="accordion"
              data-menu-item-trigger="click"
            >
              <div
                className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                tabIndex={0}
              >
                <span className="menu-icon items-start text-gray-500 light:text-gray-400 w-[20px]">
                  <i className="ki-filled ki-element-11 text-lg"></i>
                </span>
                <span className="menu-title text-sm font-medium text-gray-800 menu-item-active:text-primary menu-link-hover:!text-primary">
                  Dashboards
                </span>
                <span className="menu-arrow text-gray-400 w-[20px] shrink-0 justify-end ml-1 mr-[-10px]">
                  <i className="ki-filled ki-plus text-2xs menu-item-show:hidden"></i>
                  <i className="ki-filled ki-minus text-2xs hidden menu-item-show:inline-flex"></i>
                </span>
              </div>
              <div className="menu-accordion gap-0.5 pl-[10px] relative before:absolute before:left-[20px] before:top-0 before:bottom-0 before:border-l before:border-gray-200">
                <div className="menu-item">
                  <a
                    className="menu-link border border-transparent items-center grow menu-item-active:bg-secondary-active light:menu-item-active:bg-coal-300 light:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active light:hover:bg-coal-300 light:hover:border-gray-100 hover:rounded-lg gap-[14px] pl-[10px] pr-[10px] py-[8px]"
                    href="html/demo1.html"
                    tabIndex={0}
                  >
                    <span className="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary"></span>
                    <span className="menu-title text-2sm font-normal text-gray-800 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                      Light Sidebar
                    </span>
                  </a>
                </div>
                <div className="menu-item active">
                  <a
                    className="menu-link border border-transparent items-center grow menu-item-active:bg-secondary-active light:menu-item-active:bg-coal-300 light:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active light:hover:bg-coal-300 light:hover:border-gray-100 hover:rounded-lg gap-[14px] pl-[10px] pr-[10px] py-[8px]"
                    href="html/demo1/dashboards/light-sidebar.html"
                    tabIndex={0}
                  >
                    <span className="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary"></span>
                    <span className="menu-title text-2sm font-normal text-gray-800 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                      light Sidebar
                    </span>
                  </a>
                </div>
              </div>
            </div> */}
            <div className="menu-item active shadow-sm">
              <a
                className="menu-link border border-transparent items-center grow menu-item-active:bg-secondary-active light:menu-item-active:bg-coal-300 light:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active light:hover:bg-coal-300 light:hover:border-gray-100 hover:rounded-lg gap-[5px] pl-[10px] pr-[10px] py-[8px]"
                // href="html/demo1/public-profile/profiles/default.html"
                tabIndex={0}
              >
                <span className="menu-icon items-start text-gray-500 light:text-gray-400 w-[20px]">
                  <i className="ki-filled ki-element-11 text-lg"></i>
                </span>
                {/* <span className="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary"></span> */}
                <span className="menu-title text-md font-normal text-gray-800 menu-item-active:text-[white] menu-item-active:font-semibold menu-link-hover:!text-[white] active:text-light">
                  LP Dashboard
                </span>
              </a>
            </div>
            <div className="menu-item shadow-sm">
              <a
                className="menu-link border border-transparent items-center grow menu-item-active:bg-secondary-active light:menu-item-active:bg-coal-300 light:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active light:hover:bg-coal-300 light:hover:border-gray-100 hover:rounded-lg gap-[5px] pl-[10px] pr-[10px] py-[8px]"
                // href="html/demo1/public-profile/profiles/default.html"
                tabIndex={0}
              >
                <span className="menu-icon items-start text-gray-500 light:text-gray-400 w-[20px]">
                  <i className="ki-filled ki-element-11 text-lg"></i>
                </span>
                {/* <span className="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary"></span> */}
                <span className="menu-title text-md font-normal text-gray-800 menu-item-active:text-[white] menu-item-active:font-semibold menu-link-hover:!text-[white] active:text-light">
                  LP Dashboard
                </span>
              </a>
            </div>
          </div>
          {/* End of Sidebar Menu */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
