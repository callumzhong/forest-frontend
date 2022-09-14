import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useImperativeHandle, useRef } from 'react';
const Canvas = React.forwardRef(
  ({ height, width, className }, ref) => {
    const canvasRef = useRef();
    useImperativeHandle(ref, () => ({
      draw: (draw) => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );
        draw(ctx);
      },
      width: canvasRef.current.width,
      height: canvasRef.current.height,
    }));

    return (
      <canvas
        className={clsx(
          'touch-none rendering-pixelated',
          className,
        )}
        height={height}
        width={width}
        ref={canvasRef}
      />
    );
  },
);

Canvas.propTypes = {
  props: PropTypes.exact({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
};
export default Canvas;
