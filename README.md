# Hahow Frontend Engineer 徵才小專案

## 👉 執行專案

1. Clone the repo

```
git clone git@github.com:nancyliao0612/hahow-heroes.git
```

2. Install NPM packages

```
npm install
```

3. Execute the project

```
npm start
```

## 👉 專案的架構、Web 的架構邏輯

```
├── public/
├── src/
│   ├── components/
|       ├── Button.js        # 顯示 Hero 能力值與增減按鈕的元件
│       ├── HeroCard.js      # 顯示個別 Hero 卡片的元件
│       └── Loading.js       # 顯示載入中的動畫元件
|       ├── Message.js       # Ant Design 的組件，用於顯示「儲存成功」的提示
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

## 👉 使用到的第三方 library 的理解及其功能簡介

#### [Axios](https://axios-http.com/docs/intro)

用來執行 HTTP Request，使用 Axios 的好處是，它會自動轉換 JSON 格式資料。相較於使用 fetch API 進行請求，會需要先透過 JSON() 將 response 回傳的資料轉換成 JavaScript Object，但使用 Axios 的話會直接幫你轉換數據。若搭配使用 Async / Await，還可以減少 .then 的使用，增加程式碼的易讀性。

#### [Styled Components](https://styled-components.com/)

CSS-In-JS 的函式庫，讓開發者可以專注在單一 Component 的 CSS，易於維護與管理。此外，styled-components 會產生獨一無二的 className，省去每次苦惱想不出合適 className 的麻煩，也解決樣式命名的衝突。

#### [Ant Design](https://ant.design/components/overview/)

一套 UI Library，提供相當豐富的 UI Components（如：提示、按鈕、表單等），讓開發者不用從頭刻畫頁面樣式，能夠套用現成組件，並針對需要客製化的地方進行修改。

## 👉 你在程式碼中寫註解的原則，遇到什麼狀況會寫註解

遇到較不直觀或牽涉較複雜的邏輯時，會去註解為什麼有這行程式碼，以及在什麼樣的情況下會使用到，來幫助其他開發者快速理解該程式碼的運作方式，也增加程式的易讀性與可維護性。

## 👉 在這份專案中你遇到的困難、問題，以及解決的方法

**Ant Design 覆蓋掉專案中 index.css 內的樣式問題，如顏色、字體**

- 由於 CSS 引入的順序，造成 Ant Design 的樣式會覆蓋掉原本自己所寫的。例如在 index.css 檔案裡設定 body 樣式，包含頁面的基礎樣式（如字體、字體顏色）皆會被覆蓋掉。
  解決辦法是提升 body 的優先級，透過給 body 加入一個 id attribute，並選取該 id 來設定想要的字體、顏色等樣式，以此覆蓋 Ant Design 的 styling。

- 在使用 Ant Design 內 Spin 加載中的元件時，該加載圖示的顏色為 Ant Design 默認的主題色。最後透過直接選取該圖示的 class（.ant-spin-dot-item）進行顏色的調整。

**當點擊 Hero 能力值的增減按鈕時，要如何更新能力值到對應的能力上**

- 以增加能力值的按鈕為例，使用 data-\* 在 button element 上自訂一個 data-point 屬性，並將該屬性值設為 Hero 的「能力值」；同時，指定按鈕的 name 屬性為 Hero 的「能力」。
  因此，當使用者點擊增加能力值的按鈕，並觸發 onClick 事件時，就可以抓取到使用者想要更新的能力，並予以更新！

**若使用者更新了 Hero 的能力值，如何限制必須先點擊「儲存按鈕」才能前往其他 Hero Profile 頁面**

- 設置檢查能力值有無被改變的 boolean 值（isPointChanged），並把 default 值設為 false，只有當使用者點擊增減按鈕時，才會將該值改為 true。所以若是在按鈕有被點擊的情況下，就會給 Hero Card 新增 disabled 的 className，防止任何 pointer events 的發生。

- 也有另外在想說，較好的使用者體驗應該要先給予提示（如：跳出「請先儲存您的資料變更」的 Popup 訊息），後續可以針對該點進行優化。
