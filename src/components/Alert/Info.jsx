const Info = ({ children, className, onClose, ...props }) => {
  return (
    <div
      className={`mx-auto flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800 ${
        className || ''
      }`}
      {...props}
    >
      <div className='flex w-12 items-center justify-center bg-blue-500'>
        <svg
          className='h-6 w-6 fill-current text-white'
          viewBox='0 0 40 40'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z' />
        </svg>
      </div>

      <div className='-mx-3 px-4 py-2'>
        <div className='mx-3'>
          <span className='font-semibold text-blue-500 dark:text-blue-400'>
            Info
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

export default Info;
