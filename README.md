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

