import React from "react";

const ViewSubmitAssignment = ({ modal, control, githubUrl, hostedUrl }) => {
  return (
    <div className={modal ? "block" : "hidden"}>
      <div className="absolute top-0 left-0 right-0 bottom-0 min-w-full min-h-screen bg-black/70"></div>
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        tabindex="-1"
        aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center mt-20"
      >
        <div class="relative p-4 w-full max-w-2xl h-full md:h-auto flex items-center justify-center mx-auto">
          {/* <!-- Modal content --> */}
          <div class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Submit Assignment Details
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
                onClick={control}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div class="p-6 space-y-6">
              <h3 className="font-semibold text-lg mb-2">Github Repository</h3>
              <a
                className="text-content-secondary"
                target="_blank"
                href={githubUrl}
                rel="noreferrer"
              >
                {githubUrl}
              </a>
              {hostedUrl && (
                <div className="mt-3">
                  <h3 className="font-semibold text-lg mb-2">Hosted Url</h3>
                  <a
                    className="text-content-secondary"
                    target="_blank"
                    href={hostedUrl}
                    rel="noreferrer"
                  >
                    {hostedUrl}
                  </a>
                </div>
              )}
            </div>
            {/* <!-- Modal footer --> */}
            <div class="flex items-center pt-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600 pb-5 pl-5">
              <button
                data-modal-toggle="defaultModal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={control}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSubmitAssignment;
