import { classNames, getURLParam, URLParam } from "../../utils/utils";

export type Tab = {
  name: string
  current: boolean
}

export type TabsInputs = {
  tabs: Tab[],
  currentTabIndex: number,
  onClick: (index: number) => void
}

export default function Tabs({tabs, currentTabIndex, onClick}: TabsInputs) {

  tabs.map((item, i) => {
    if (i !== currentTabIndex) item.current = false;
    return null;
  })
  tabs[currentTabIndex].current = true;
  
  const onClickHandler = (e) => {
    e.preventDefault();
    const tab = e.currentTarget.getAttribute("data-index");
    onClick(Number(tab));
    const urlParam: URLParam = getURLParam(window.location.hash);
    const bookmark = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${urlParam.nab}/${tab}/${urlParam.oType}/${urlParam.oId}`;
    window.history.pushState({ path: bookmark }, '', bookmark);
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

