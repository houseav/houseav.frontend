export default function StepperPreline() {
  return (
    <div>
      {/* Stepper */}
      <div className="relative">
        {/* Stepper Nav */}
        <ul className="flex flex-row gap-x-2">
          <li
            className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
            data-hs-stepper-nav-item='{"index": 1, "isCompleted": true}'
          >
            <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
              <span className="w-7 h-7 flex justify-center items-center bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600">
                <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                  1
                </span>
                <svg
                  className="hidden hs-stepper-success:block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span className="ml-2 text-sm font-medium text-gray-800">
                Step
              </span>
            </span>
            <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600"></div>
          </li>

          <li
            className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
            data-hs-stepper-nav-item='{"index": 2}'
          >
            <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
              <span className="w-7 h-7 flex justify-center items-center bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600">
                <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                  2
                </span>
                <svg
                  className="hidden hs-stepper-success:block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span className="ml-2 text-sm font-medium text-gray-800">
                Step
              </span>
            </span>
            <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600"></div>
          </li>

          <li
            className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
            data-hs-stepper-nav-item='{"index": 3}'
          >
            <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
              <span className="w-7 h-7 flex justify-center items-center bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600">
                <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                  3
                </span>
                <svg
                  className="hidden hs-stepper-success:block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span className="ml-2 text-sm font-medium text-gray-800">
                Step
              </span>
            </span>
            <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600"></div>
          </li>
          {/* End Item */}
        </ul>
        {/* End Stepper Nav */}

        {/* Stepper Content */}
        <div className="mt-5 sm:mt-8">
          {/* First Content */}
          <div
            className="success hidden"
            data-hs-stepper-content-item='{"index": 1, "isCompleted": true}'
          >
            <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
              <h3 className="text-gray-500">First content</h3>
            </div>
          </div>
          {/* End First Content */}

          {/* Second Content */}
          <div className="active" data-hs-stepper-content-item='{"index": 2}'>
            <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
              <h3 className="text-gray-500">Second content</h3>
            </div>
          </div>
          {/* End Second Content */}

          {/* Third Content */}
          <div className="hidden" data-hs-stepper-content-item='{"index": 3}'>
            <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
              <h3 className="text-gray-500">Third content</h3>
            </div>
          </div>
          {/* End Third Content */}

          {/* Final Content */}
          <div
            className="hidden"
            data-hs-stepper-content-item='{"isFinal": true}'
          >
            <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
              <h3 className="text-gray-500">Final content</h3>
            </div>
          </div>
          {/* End Final Content */}

          {/* Button Group */}
          <div className="mt-5 flex justify-between items-center gap-x-2">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-stepper-back-btn=""
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6"></path>
              </svg>
              Back
            </button>
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-stepper-next-btn=""
            >
              Next
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-stepper-finish-btn=""
              style={{ display: "none" }}
            >
              Finish
            </button>
            <button
              type="reset"
              className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-stepper-reset-btn=""
              style={{ display: "none" }}
            >
              Reset
            </button>
          </div>
          {/* End Button Group */}
        </div>
        {/* End Stepper Content */}
      </div>
      {/* End Stepper */}
    </div>
  );
}
