import { classNames, getURLParam, URLParam } from "../utils/utils";
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../appContext/hooks'
import { selectAppState } from "../appContext/appContextSlice"

type UITransaction = {
  hash: string,
  timestamp: number
}

export type UITransactionsInput = {
  items: UITransaction[],
  onClick: (hash) => void
}

export default function Transactions({items, onClick}: UITransactionsInput) {
  let _appState = useAppSelector(selectAppState);
  if (!_appState) throw (new Error("NULL_APP_STATE"));
  const urlParam: URLParam = _appState.urlParam;

  const nav = (e) => {
    e.preventDefault();
    const hash = e.currentTarget.getAttribute("data-hash")
    const bookmark = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${urlParam.nab}/${urlParam.oTab}/transaction/${hash}`;
    window.history.pushState({ path: bookmark }, '', bookmark);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Transactions</h1>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-500">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    Hash
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={item.hash}>
                    <td
                      className={classNames(
                        i !== items.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                      )}
                    >
                      <a href="/#" className="hover:bg-gray-50" data-hash={item.hash} onClick={nav}>
                        {item.hash}
                      </a>
                    </td>
                    <td
                      className={classNames(
                        i !== items.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                      )}
                    >
                      {item.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


