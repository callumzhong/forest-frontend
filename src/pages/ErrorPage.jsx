import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const [time, setTime] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime((prevState) => prevState - 1);
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  useEffect(() => {
    if (time === 0) {
      navigate('/');
    }
  });

  return (
    <div className='absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-white'>
      <h2>Oh! 這裡是無人島</h2>
      <p>{time} 秒後回到首頁</p>
    </div>
  );
};

export default ErrorPage;
