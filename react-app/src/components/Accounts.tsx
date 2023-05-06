import { useLocation } from 'react-router-dom';
import { classNames, getURLParam, URLParam } from "../utils/utils";
import { useAppSelector } from '../appContext/hooks'
import { selectAppState } from "../appContext/appContextSlice"
import { AppState, updateURLParams } from "../appContext/appContextSlice"
import { useAppDispatch } from '../appContext/hooks';




type UIAccount = {
  address: string,
  balance: string
}

export type UIAccountsInput = {
  items: UIAccount[],
  onClick: (address) => void
}

export default function Accounts({items, onClick}: UIAccountsInput) {
  const dispatch = useAppDispatch();

  let _appState = useAppSelector(selectAppState);
  if (!_appState) throw (new Error("NULL_APP_STATE"));
  const urlParam: URLParam = _appState.urlParam;

  const nav = (e) => {
    e.preventDefault();
    const address = e.currentTarget.getAttribute("data-address")
    onClick(address);
    
    const bookmark = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${urlParam.nab}/${urlParam.oTab}/account/${address}`;
    window.history.pushState({ path: bookmark }, '', bookmark);
    // window.location.hash = `#${urlParam.nab}/${urlParam.oTab}/account/${address}`;

    // dispatch(updateURLParams({
    //     nab: urlParam.nab,
    //     oTab: urlParam.oTab,
    //     oId: address
    // }))

  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">EOAs</h1>
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
                      className="sticky top-54px z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="sticky top-54px z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={item.address}>
                      <td
                        className={classNames(
                          i !== items.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                        )}
                      >
                        <a href="/#" onClick={nav} className="hover:bg-gray-50" data-address={item.address}>
                          {item.address}
                        </a>
                      </td>
                      <td
                        className={classNames(
                          i !== items.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                        )}
                      >
                        {item.balance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
