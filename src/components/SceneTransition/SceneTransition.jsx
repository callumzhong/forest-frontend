import { CSSTransition } from 'react-transition-group';
import styles from './SceneTransition.module.css';

const SceneTransition = ({ isShow }) => {
  return (
    <CSSTransition
      in={isShow}
      timeout={2000}
      classNames={{ ...styles }}
      mountOnEnter
      unmountOnExit
    >
      <div className='absolute inset-0 z-50 bg-black'>
        <p className='absolute bottom-4 right-4 text-2xl text-white'>
          LOADING...
        </p>
      </div>
    </CSSTransition>
  );
};

export default SceneTransition;
