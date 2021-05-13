import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

// redux 셋팅하기
// 1. import {Provider}
// 2. <Provider>로 <App> 감싸기
// 3. createStroe() 안에 state 저장

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';


// redux에서 state 만드는 법 : 
// 변수로 초기값을 만들고 reducer안에 넣기
let 초기값 = [
  { id: 0, name: '멋진신발', quan: 2 },
  { id: 1, name: '낡은신발', quan: 3 }
];

// 다른 종류의 state 저장하고 싶으면 reducer를 하나 더 만드는게 효율적
let alert초기값 = true;

function reducer2(state = alert초기값, 액션) {
  if( 액션.type === '닫힘') {
    return state = false; 
  } else {
    return state
  }
}


// state 데이터의 수정방법을 정의해놓다 : reducer
// 아무일 없으면 그냥 초기값 그대로 return 퉤 뱉는다.
// state = 기본state : default parameter 문법 ES6 신문법
// <의문점> redux 왜씀 ? 할게 ㅈㄴ 많고 불편한데
// 소규모 프로젝트시에는 딱히 필요가없다.
// 대규모 프로젝트시에 적합
// quan 데이터가 삐꾸가 나면 reducer만 찾으면됩니다 혹은 dispatch
// state 데이터 관리가 용이합니다 (일명 상태관리)
// reducer 넘 길면 다른 js파일로 export / import 해서 사용
function reducer(state = 초기값, 액션) {
  if( 액션.type === '항목추가') {
    console.log(액션);
    let copy = [...state];
    copy.push(액션.payload);
    return copy;

  } else if( 액션.type === '수량증가' ) {
    
    let copy = [...state];  // 복사본 만들고
    copy[0].quan++;
    return copy // 리턴
  
  } else if( 액션.type === '수량감소') {
    let copy = [...state];
    copy[0].quan--;
    return copy
  // 요청이 들어오지 않으면 기본값 리턴
  } else {
    return state
  }
  
}

// state 초기값
// store : state 보관함, 보관통
// combinReducers : 여러개의 reducer가 있을경우 함수 사용
let store = createStore(combineReducers({reducer, reducer2}));

// BrowserRouter vs HashRouter
// HashRouter : 라우팅 안전하게 할 수 있게 도와줌 /#/ 기호
// 사이트 주소 뒤에 #이 붙는데 #뒤에 적는 것은 서버로 전달 X
// 그래서 라우팅은 리액트가 알아서 잘 해줄 수있음

// BrowserRouter : 라우팅을 리액트가 아니라 서버에게 요청할 수도 있어서 위험
// 서버 : "어 그런페이지 없는데요? 할 수 있음"
// 서버에서 서버 라우팅 방지하는 API를 작성해줘야함

// (index.js) redux 셋팅하기
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Provider로 감싸진 애들은 props 없이도 state 공유가능 */}
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
