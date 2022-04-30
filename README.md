# Hahow Frontend Engineer 徵才小專案


## 專案的架構、Web 的架構邏輯

```
├── public/             
├── src/               
│   ├── components/  
|       ├── Alert.js         # 點擊儲存按鈕後，顯示「儲存成功」的元件
│       ├── HeroCard.js      # 顯示個別 Hero 卡片的元件
│       └── Loading.js       # 顯示載入中的動畫元件
|   ├── context/        
│       └── hero_context.js  # 使用 useContext 進行狀態的全局管理，定義各種 dispatch action 的 type 及 payload
│   ├── pages/               
│       ├── HeroList.js      # 顯示所有 Hero 列表的元件
│       ├── HeroProfile.js   # 顯示個別 Hero 能力值的元件
|   ├── reducer/        
│       └── hero_reducer.js  # 使用 useReducer 進行狀態的全局管理，設定各種 action 會如何改變 state
|   ├── index.css/           # golbal 的 CSS styling
|   ├── index.js/            # 專案啟動時的進入點
├── package.json             
├── README.md                # 專案說明文件
```
