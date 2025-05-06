interface Props {
  header: string;
  body: string;
  show?: boolean;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Modal({ header, body, show, onConfirm, onCancel }: Props): JSX.Element {
  return (
    <div
      aria-labelledby="modal-title"
      aria-modal="true"
      className={`${!show && 'hidden'} fixed inset-0 z-50 overflow-y-auto`}
      role="dialog"
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          aria-hidden="true"
          className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm"
        ></div>

        <div className="relative inline-block transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg aria-hidden="true" className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  className="text-2xl font-semibold leading-6 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
                  id="modal-title"
                >
                  {header}
                </h3>
                <div className="mt-4">
                  <p className="text-base text-gray-600">
                    {body}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
            <button
              className="inline-flex w-full justify-center rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-red-800 sm:w-auto transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              type="button"
              onClick={onConfirm}
            >
              Підтвердити
            </button>
            <button
              className="mt-3 inline-flex w-full justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              type="button"
              onClick={onCancel}
            >
              Скасувати
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
