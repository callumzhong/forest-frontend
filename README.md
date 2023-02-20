## Project Name

FOREST RPG
遊戲以釣魚、伐木、採石等，採集資源的方式培養生活習慣。

特色
* 每 5 分鐘會扣飽食度、情緒值，角色有死亡機制
* 全體聊天室讓你不孤單暢聊一整晚
* 角色動作皆有音效提升精神
* 配有外出劵、奢侈劵獎勵機制

## Technologies

- React
- React Router
- React Hook From
- Tailwind CSS
- Canvas
- Mitt
- Howler
- Day

## Project Screen Shot(s)

### 操作展示


https://user-images.githubusercontent.com/103582829/220014802-604a6cde-5538-4e55-a477-d838fedb8e80.mp4

### 聊天室


https://user-images.githubusercontent.com/103582829/220030205-8d894447-a0ef-4f20-a4f2-722595501901.mp4



### 釣魚  
![image](https://i.imgur.com/tiIjUqI.gif)  
操作:  
使用 WSAD or 方向鍵移動到河邊點擊 "動作" 即可

### 採石
![image](https://i.imgur.com/bLF8uIw.gif)  
操作:  
使用 WSAD or 方向鍵移動到石頭旁點擊 "動作" 即可

### 伐木
![image](https://i.imgur.com/pV007CD.gif)    
操作:  
使用 WSAD or 方向鍵移動到樹木旁點擊 "動作" 即可

### 扭蛋
![image](https://i.imgur.com/5VDxFlt.gif)    
操作:  
前往小屋內與 NPC 對話，啟動轉蛋機
需消耗魚肉、石頭、木頭各 50 才可以領取轉蛋

## Installation and Setup Instructions

下載專案前，請先安裝 `node` 與 `yarn`

```
git clone https://github.com/callumzhong/forest-rpg-frontend.git
```

設置 .env.local 用於串接 Firebase 民宿資料

```
REACT_APP_API_SERVER="你的 API SERVER"
REACT_APP_WEBSOCKET_SERVER="你的 WebSocket SERVER"
```

安裝:

`yarn install`

啟動伺服器:

`yarn dev`

訪問應用程式:

`localhost:5173`

## Reflection

該專案是 Canas Game 為核心方向所製作的，算是我目前遇到較多困難點的專案。

設計方面我從 itch.io 找尋符合我構思的資產後，使用 Aseprite 編輯組合出地圖這點就花了我不少時間，性質屬於設計方面我就不多贅述，拼拼湊湊後得到一張匯出的 jpg 圖片，後續使用 `CanvasRenderingContext2D.drawImage()` API 繪出 jpg 的畫面即可這點後面會再提到，總之得到一張圖片及後面如何繪出在畫面上也想好惹。

進入實際開發階段第一點我用 Tailwind CSS 撰寫操控按鈕、左上角面板、右上角面板、背包、設定，在此期間邊寫邊想遊戲設計流程怎麼走，起初我的方向不是採集遊戲而是戰鬥打怪遊戲，廢棄的原因是怪物 AI 戰鬥系統與自動追擊玩家仇恨值系統，我實在遇到太多太多困難以 React 及 Canvas 我實在不會寫，沒有遊戲引擎的情況下我舉旗投降因為也花太多時程..

所以我改成生活採集 RPG 遊戲，你可以拿物資去轉蛋獲得現實獎勵 "外出卷看電影" 等等，讓我們回到開發上的話題，當使用 `CanvasRenderingContext2D.drawImage()` 成功繪製圖層後，第二點就是人物要顯示出來但是要畫面置中，等於會有個攝影機在你的圖片上不斷地移動，攝影機可以是 RWD 縮小的但我只支援到寬度 996 px 後不顯示給玩家遊玩。

這裡附上一個簡易版的範例，改用 useRef 儲存 Game 相關的配置變數，希望改用純函式的寫法

```jsx
import { useCallback, useRef } from "react";
import Canvas from "./components/Canvas";
import useKeyPressDirectionListener from "./hooks/useKeyPressDirectionListener";
import useLoadImage from "./hooks/useLoadImage";
import useRequestAnimationFrame from "./hooks/useRequestAnimationFrame";

// 網格
const withGrid = (pos) => pos * 32;

// 方向計算值
const directionUpdate = {
  up: ["y", -4],
  down: ["y", 4],
  left: ["x", -4],
  right: ["x", 4]
};

const Game = () => {
  const mapImage = useLoadImage({
    url: "./map.png"
  });
  const characterImage = useLoadImage({
    url: "./character.png"
  });
  const characterObject = useRef({
    x: withGrid(3),
    y: withGrid(7),
    movingProgressRemaining: 0
  });

  // 監聽按鈕 W,A,S,D 與方向鍵
  const directions = useKeyPressDirectionListener();
  const direction = useRef("up");

  const updatePositionHandler = useCallback(() => {
    const { current: hero } = characterObject;
    if (hero.movingProgressRemaining > 0) {
      const [position, changeValue] = directionUpdate[direction.current];
      hero[position] += changeValue;
      hero.movingProgressRemaining -= 1;
    }
    if (hero.movingProgressRemaining === 0 && directions.current[0]) {
      // movingProgressRemaining 設定偵數 8 * 每次移動 +- 4
      characterObject.current.movingProgressRemaining = 8;
      direction.current = directions.current[0];
    }
  }, [directions]);
  
  useRequestAnimationFrame(() => {
    updatePosition();
  });

  const canvasRef = useRef();
  useRequestAnimationFrame(() => {
    const { x: heroX, y: heroY } = characterObject.current;
    const centerPoint = withGrid(6);
    canvasRef.current.draw((ctx) => {
      // 480 x 480 原圖
      // 渲染 32(網格) * 6(第7格) - 32 (網格) * 3 (角色第4格)
      mapImage.isloaded &&
        ctx.drawImage(mapImage.image, centerPoint - heroX, centerPoint - heroY);

      characterImage.isloaded &&
        ctx.drawImage(
          characterImage.image,
          0,
          0,
          32,
          32,
          centerPoint + 1,
          centerPoint,
          32,
          32
        );
    });
  });

  return <Canvas ref={canvasRef} height={480} width={480} />;
};

export default function App() {
  return <Game />;
}

```

> 附上 [codesandbox](https://codesandbox.io/s/rpg-jiao-se-yi-dong-di-tu-zhi-zhong-zhan-shi-usr1b9?file=/src/App.js:0-2184)



接下來是互動的問題角色需要移動 (防撞 "不可走的區塊" )、對話、採集、過場、切換地圖，本來我想透過後端傳遞初始設定後，由後台儀表板改設定值就好。不過秉持著先有再好的概念這個擺在後續疊代開發再去做需求討論。以下展示一下設置


```js
const layers = {
  home: {
    map: 'home',
    row: 30,
    column: 40,
    lowerSrc:
      'https://res.cloudinary.com/callumzhong/image/upload/v1661574655/lower_lmaezy.png',
    walls: {
      ...HOME_WALLS,
    },
    cutsceneSpaces: {
      [asGridCoord(15, 6)]: [
        {
          events: [{ type: 'changeMap', map: 'chalet' }],
        },
      ],
    },
    actionSpaces: {
      [asGridCoord(23, 8)]: 'fish',
      [asGridCoord(23, 9)]: 'fish',
      [asGridCoord(23, 10)]: 'fish',
      [asGridCoord(21, 11)]: 'fish',
      ...
    },
  },
  chalet: {
    map: 'chalet',
    row: 13,
    column: 17,
    lowerSrc:
      'https://res.cloudinary.com/callumzhong/image/upload/v1664225714/chalet_lower_t6pg6a.png',
    walls: { ...CHALET_WALLS },
    cutsceneSpaces: {
      [asGridCoord(8, 12)]: [
        {
          events: [{ type: 'changeMap', map: 'home' }],
        },
      ],
    },
  },
};

const gameObjects = {
  home: {
    hero: {
      isPlayerControlled: true,
      x: withGrid(15),
      y: withGrid(8),
      src: 'https://res.cloudinary.com/callumzhong/image/upload/v1660942761/character_rojwo3.png',
      zoom: 2,
      transformY: -24,
      transformX: 6,
      bait: {
        x: withGrid(9999),
        y: withGrid(9999),
        height: 16,
        width: 16,
        src: 'https://res.cloudinary.com/callumzhong/image/upload/v1661368307/bait_lximgo.png',
        zoom: 2,
        animations: {
          'idle-down': [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
            [5, 0],
          ],
        },
      },
    },
    npc1: {
      x: withGrid(13),
      y: withGrid(11),
      src: 'https://res.cloudinary.com/callumzhong/image/upload/v1663101763/npc_1_zz1qil.png',
      zoom: 2,
      width: 16,
      height: 20,
      transformY: -6,
      transformX: 6,
      direction: 'right',
      animations: {
        'idle-left': [[1, 1]],
        'idle-down': [[1, 0]],
        'idle-right': [[1, 2]],
        'idle-up': [[1, 3]],
      },
      talking: [
        {
          events: [
            {
              type: 'textMessage',
              mode: 'message',
              title:
                '歡迎來到 FOREST 世界，以下向你說明操作：',
              content: `使用 [ WSAD or 方向鍵 ] 移動到湖邊、樹、石頭邊，點擊或使用 [ Space ] 進行採集。獲得的物品可以進入木屋內找尋 NPC 進行扭蛋抽獎。`,
              faceHero: 'npc1',
            },
          ],
        },
      ],
    },
    npc4: {
      x: withGrid(22),
      y: withGrid(8),
      src: 'https://res.cloudinary.com/callumzhong/image/upload/v1660942761/character_rojwo3.png',
      zoom: 2,
      width: 32,
      transformY: -24,
      transformX: 6,
      animations: {
        'idle-down': [
          [0, 4],
          [1, 4],
          [2, 4],
          [3, 4],
          [4, 4],
          [4, 4],
          [6, 4],
          [7, 4],
        ],
      },
      bait: {
        x: withGrid(27),
        y: withGrid(9),
        height: 16,
        width: 16,
        src: 'https://res.cloudinary.com/callumzhong/image/upload/v1661368307/bait_lximgo.png',
        zoom: 2,
        animations: {
          'idle-down': [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
            [5, 0],
          ],
        },
      },
    },
    npc5: {
      x: withGrid(9),
      y: withGrid(16),
      src: 'https://res.cloudinary.com/callumzhong/image/upload/v1660942761/character_rojwo3.png',
      zoom: 2,
      width: 32,
      transformY: -24,
      transformX: -48,
      animations: {
        'idle-down': [
          [12, 5],
          [11, 5],
          [10, 5],
          [9, 5],
          [8, 5],
          [7, 5],
          [6, 5],
          [5, 5],
          [4, 5],
          [3, 5],
          [2, 5],
          [1, 5],
          [0, 5],
        ],
      },
    },
    npc6: {
      x: withGrid(8),
      y: withGrid(12),
      src: 'https://res.cloudinary.com/callumzhong/image/upload/v1660942761/character_rojwo3.png',
      zoom: 2,
      width: 32,
      transformY: -24,
      transformX: 32,
      animations: {
        'idle-down': [
          [0, 2],
          [1, 2],
          [2, 2],
          [3, 2],
          [4, 2],
          [5, 2],
          [6, 2],
          [7, 2],
          [8, 2],
          [9, 2],
          [10, 2],
          [11, 2],
          [12, 2],
        ],
      },
    },
    npc7: {
      x: withGrid(8),
      y: withGrid(6),
      src: 'https://res.cloudinary.com/callumzhong/image/upload/v1660942761/character_rojwo3.png',
      zoom: 2,
      width: 32,
      transformY: -24,
      transformX: 6,
      animations: {
        'idle-down': [
          [0, 3],
          [1, 3],
          [2, 3],
          [3, 3],
          [4, 3],
          [5, 3],
          [6, 3],
          [7, 3],
          [8, 3],
        ],
      },
    },
    npc8: {
      x: withGrid(18),
      y: withGrid(16),
      src: 'https://res.cloudinary.com/callumzhong/image/upload/v1660942761/character_rojwo3.png',
      zoom: 2,
      width: 32,
      transformY: -24,
      transformX: -24,
      animations: {
        'idle-down': [
          [12, 6],
          [11, 6],
          [10, 6],
          [9, 6],
          [8, 6],
          [7, 6],
          [6, 6],
          [5, 6],
          [4, 6],
        ],
      },
    },
  },
  chalet: {
    hero: {
      isPlayerControlled: true,
      x: withGrid(8),
      y: withGrid(12),
      src: 'https://res.cloudinary.com/callumzhong/image/upload/v1660942761/character_rojwo3.png',
      zoom: 2,
      transformY: -24,
      transformX: 6,
    },
  },
};
```

我沒有全部貼上，有興趣的可以去 src/data/config.js 瀏覽，這些設計會傳入到 scripts 資料夾內的 file 是以物件導向撰寫去執行遊戲各個動作。這邊就有一個問題當角色採集完成後我需要把某些值往外傳遞到 React State 去渲染到面板上，你沒辦法透過 Context 訂閱把數值傳遞到 Store，我這邊使用的是 Mitt 套件做事件發射與訂閱。你可以透過 `useEffect` 訂閱 Mitt 的事件，順利把值往外傳遞這項功能做完。

接下來就是聲音、webstocket聊天室的撰寫，這點就是老步驟串接套件或者 webstocket 的教程寫法。後端我則是用 Node.js Express 框架撰寫，放到另一個私人儲存庫因為有點雜亂沒有去整理，屬於快速寫完就不開放出來惹。


