import style from './Hero.module.css';

const Hero = ({ className, children }) => {
  return (
    <div className={`${style.hero} ${className ?? ''}`}>
      {children}
    </div>
  );
};

export default Hero;
