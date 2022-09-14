import useDetect from 'hooks/useDetect';
import useRequestAnimationFrame from 'hooks/useRequestAnimationFrame';
import Canvas from 'modules/Canvas';
import React, { useMemo, useRef } from 'react';

const Game = React.memo(({ layer }) => {
  const canvasRef = useRef();
  const { winWidth, winHeight } = useDetect();

  const centerPoint = useMemo(() => {
    const x = Math.ceil(Math.ceil(winWidth / 48) / 2) - 1;
    const y = Math.ceil(Math.ceil(winHeight / 48) / 2) - 1;
    return { x, y };
  }, [winWidth, winHeight]);

  useRequestAnimationFrame((time) => {
    if (Object.keys(layer).length === 0) return;
    const cameraPerson = layer.gameObjects.hero;

    canvasRef.current &&
      canvasRef.current.draw((ctx) => {
        layer.drawLowerImage(
          ctx,
          cameraPerson,
          centerPoint,
        );

        Object.values(layer.gameObjects)
          .sort((a, b) => a.y - b.y)
          .forEach((object) => {
            if (!object.isMounted) return;
            object.sprite.draw(
              ctx,
              cameraPerson,
              centerPoint,
            );
            if (object.bait) {
              object.bait.sprite.draw(
                ctx,
                cameraPerson,
                centerPoint,
              );
            }
          });

        layer.drawUpperImage(
          ctx,
          cameraPerson,
          centerPoint,
        );
      });
  });
  return (
    <Canvas
      height={winHeight}
      width={winWidth}
      ref={canvasRef}
    />
  );
});

export default Game;
