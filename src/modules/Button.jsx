import clsx from 'clsx';

const widthStyle = {
  full: 'w-full',
};

const Button = ({
  width,
  type = 'button',
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'rounded bg-gradient-to-b from-stone-800 to-red-800 px-6 py-1 font-bold text-amber-600  shadow-sm hover:to-red-500 active:to-red-800 disabled:to-stone-600 disabled:text-gray-500',
        widthStyle[width],
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
