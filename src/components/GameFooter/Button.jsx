const Button = ({ children, onClick }) => {
  return (
    <button
      className='block rounded-full border p-3 leading-[2] shadow-inner outline-none disabled:text-gray-400 disabled:shadow-gray-500'
      type='button'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
