const Error = ({ children, className, onClose, ...props }) => {
  return (
    <div
      className={`flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md first-line:mx-auto dark:bg-gray-800 ${
        className || ''
      }`}
      {...props}
    >
      <div className='flex w-12 items-center justify-center bg-red-500'>
        <svg
          className='h-6 w-6 fill-current text-white'
          viewBox='0 0 40 40'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z' />
        </svg>
      </div>

      <div className='-mx-3 px-4 py-2'>
        <div className='mx-3'>
          <span className='font-semibold text-red-500 dark:text-red-400'>
            Error
          </span>
          <p className='text-sm text-gray-600 dark:text-gray-200'>{children}</p>
        </div>
      </div>

      <button
        onClick={onClose}
        className='ml-auto mr-2 transform self-center rounded-md p-1 transition-colors duration-200 hover:bg-gray-600 hover:bg-opacity-25 focus:outline-none'
      >
        <svg
          className='h-5 w-5'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M6 18L18 6M6 6L18 18'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  );
};

export default Error;
