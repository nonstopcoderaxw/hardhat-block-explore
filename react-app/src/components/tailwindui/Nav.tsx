import { classNames } from "../../utils/utils"

export default function Nav({navs, RightItem, LogoImg}) {
	return (
	    <header className="sticky top-0 z-20 shrink-0 bg-gray-900">
          <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <LogoImg />
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navs.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-x-8">
              <dl className="override-combobox-width">
                  <RightItem />
              </dl>
            </div>
          </div>
      </header>
	)
}
