import clsx from 'clsx';
import React, { useState } from 'react';
import uniqid from 'uniqid';

const basisStyle = {
  6: 'basis-[96px]',
  8: 'basis-[128px]',
};

const Input = React.forwardRef(
  (
    {
      basis,
      type,
      className,
      placeholder,
      error,
      label,
      ...props
    },
    ref,
  ) => {
    const id = useState(uniqid())[0];
    return (
      <div className='flex border-b border-l-2 border-r-2 border-t border-amber-600 text-left first-of-type:border-t-2 last-of-type:mb-6 last-of-type:border-b-2 '>
        <label
          className={clsx(
            'border-r-2 border-amber-600 py-2 px-4',
            basisStyle[basis],
          )}
          htmlFor={id}
        >
          {label}
        </label>
        <div className='flex-auto px-4 py-2'>
          <input
            id={id}
            ref={ref}
            className='w-full bg-transparent outline-none'
            type={type}
            {...props}
          />
          {error && (
            <p className='text-sm text-red-600'>{error}</p>
          )}
        </div>
      </div>
    );
  },
);

export default Input;
