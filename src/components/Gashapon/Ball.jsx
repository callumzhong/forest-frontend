import clsx from 'clsx';

const ballStyles = {
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  lime: 'bg-lime-500',
  indigo: 'bg-indigo-500',
};

const Ball = ({
  className,
  animation,
  color,
  style,
  onClick = () => {},
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'absolute h-8 w-8 overflow-hidden rounded-full shadow-inner',
        animation,
        className,
      )}
      style={style}
    >
      <div
        className={clsx(
          'absolute inset-x-0 bottom-0 h-1/2 opacity-90',
          ballStyles[color],
        )}
      ></div>
    </div>
  );
};

export default Ball;
