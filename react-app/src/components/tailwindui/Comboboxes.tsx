import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { classNames, State } from "../../utils/utils"
import { useState } from "react"

export type ComboboxesInputs = {
    items: string[],
    defaultItem: string,
    onChange: (address: string) => void,
    exportState?: (state: ComboboxesState) => void
}

export type ComboboxesState = {
    query: State<string>,
    selected: State<string>
}

export default function Comboboxes({items, defaultItem, onChange, exportState}: ComboboxesInputs) {
  const [ query, setQuery ] = useState<string>("");
  const [ selected, setSelected ] = useState<string>(defaultItem);

  const state: ComboboxesState = {
    query: [ query, setQuery ],
    selected: [ selected, setSelected ]
  }

  if (exportState) exportState(state);

  const filtered =
    (query === '')
      ? items
      : items.filter((item) => {
          return item.includes(query)
        })

  const onChangeHandlder = (item) => {
    onChange(item);
    setSelected(item);
  }
  const displayValueHandler = (item) => { return item; }
  const buttonOnClickHandler = (e) => setQuery("");
  const inputOnChangeHandler = (event) => {
    setQuery(event.target.value)
  }
  const inputOnBlur = (event) => { 
    setSelected(event.target.value) 
  };

  return (
    <Combobox as="div" value={selected} onChange={onChangeHandlder}>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={inputOnChangeHandler} 
          displayValue={displayValueHandler}
          onBlur={inputOnBlur}
        />
        <Combobox.Button onClick={buttonOnClickHandler} className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filtered.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filtered.map((item, i) => (
              <Combobox.Option
                key={i}
                value={item}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{item}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
