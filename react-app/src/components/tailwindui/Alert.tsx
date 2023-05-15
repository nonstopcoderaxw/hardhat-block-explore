import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { XCircleIcon } from '@heroicons/react/20/solid'


export type AlertInput = {
  type: string | null,
  message: string | null
}

export default function Alert({type, message}: AlertInput) {
  return (<>
    {type === "warn" ? (
      <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              {message}
            </p>
          </div>
        </div>
      </div>
    ): (
      <></>
    )}
    {type === "error" ? (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3 w-11/12">
            <h3 className="text-sm font-medium text-red-800">There were 2 errors with your submission</h3>
            <div className="mt-2 text-sm text-red-700">
              <ul className="list-disc space-y-1 pl-5 break-words">
                <li>{message}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ): (
      <></>
    )}
    </>
  )
}
