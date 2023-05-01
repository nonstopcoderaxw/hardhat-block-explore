import { useLocation } from 'react-router-dom';
import { classNames, getURLParam, URLParam } from "../../utils/utils";

export default function Tabs({tabs, currentTabIndex}) {
  const urlParam: URLParam = getURLParam(useLocation().hash);

  tabs[currentTabIndex].current = true;
  const onClickHandler = (e) => {
    e.preventDefault();
    const tab = e.currentTarget.getAttribute("data-index");
    window.location.hash = `#${urlParam.nab}/${tab}/${urlParam.oType}/${urlParam.oId}`
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

