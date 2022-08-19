import clsx from 'clsx';

const pxStyle = {
  sm: 'px-6',
  md: 'px-10',
  lg: 'px-14',
};

const pyStyle = {
  sm: 'py-6',
  md: 'py-10',
  lg: 'py-14',
};

const gapStyle = {
  16: ' flex flex-wrap gap-4',
};

const Card = ({ gap, py = 'sm', px = 'sm', children }) => {
  return (
    <div className='relative border-2 border-amber-600 bg-black bg-opacity-60 p-2 before:absolute before:top-2 before:left-2 before:h-3 before:w-3 before:border-2 before:border-amber-600 after:absolute after:right-2 after:top-2 after:h-3 after:w-3 after:border-2 after:border-amber-600'>
      <div
        className={clsx(
          'border-2 border-amber-600 p-6 text-white before:absolute before:bottom-2 before:left-2 before:h-3 before:w-3 before:border-2 before:border-amber-600 after:absolute after:right-2 after:bottom-2 after:h-3 after:w-3 after:border-2 after:border-amber-600',
          gapStyle[gap],
          pyStyle[py],
          pxStyle[px],
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
