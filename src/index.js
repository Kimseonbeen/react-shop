import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

// BrowserRouter vs HashRouter
// HashRouter : 라우팅 안전하게 할 수 있게 도와줌 /#/ 기호
// 사이트 주소 뒤에 #이 붙는데 #뒤에 적는 것은 서버로 전달 X
// 그래서 라우팅은 리액트가 알아서 잘 해줄 수있음

// BrowserRouter : 라우팅을 리액트가 아니라 서버에게 요청할 수도 있어서 위험
// 서버 : "어 그런페이지 없는데요? 할 수 있음"
// 서버에서 서버 라우팅 방지하는 API를 작성해줘야함

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
