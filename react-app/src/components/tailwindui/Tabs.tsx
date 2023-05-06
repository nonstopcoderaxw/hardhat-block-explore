import { useLocation } from 'react-router-dom';
import { classNames, getURLParam, URLParam } from "../../utils/utils";
import { useAppSelector } from '../../appContext/hooks'
import { selectAppState } from "../../appContext/appContextSlice"
import { useState } from "react";

export type UITab = {
  name: string
  current: boolean
}

export type UITabsInput = {
  tabs: UITab[],
  currentTabIndex: number,
  onClick: (index: number) => void
}

export default function Tabs({tabs, currentTabIndex, onClick}: UITabsInput) {
  let _appState = useAppSelector(selectAppState);
  if (!_appState) throw (new Error("NULL_APP_STATE"));
  const urlParam: URLParam = _appState.urlParam;

  tabs.map((item, i) => {
    if (i !== currentTabIndex) item.current = false;
  })
  tabs[currentTabIndex].current = true;
  
  const onClickHandler = (e) => {
    e.preventDefault();
    const tab = e.currentTarget.getAttribute("data-index");
    onClick(Number(tab));
    const bookmark = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${urlParam.nab}/${tab}/${urlParam.oType}/${urlParam.oId}`;
    window.history.pushState({ path: bookmark }, '', bookmark);
    //window.location.hash = `#${urlParam.nab}/${tab}/${urlParam.oType}/${urlParam.oId}`
  }
  
  return (
    <div>
      <div className="sm:block bg-white">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs" >
            {tabs.map((tab, i) => (
              <a
                data-index={i}
                key={tab.name}
                href="/#"
                onClick={onClickHandler}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

