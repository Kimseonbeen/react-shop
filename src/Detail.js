/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
// yarn add styled-components
import styled from 'styled-components';
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from 'react-bootstrap';
import './Detail.scss';

// 컴포넌트 등장 / 업데이트시 transition 쉽게 줄 수 있음
import { CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';  // connect import


// yarn add node-sass
// sass : CSS를 프로그래밍언어스럽게 작성가능한 Preprocessor
// CSS에서 변수, 연산자, 함수, extend, import, 이런걸 사용가능
// 브라우저는 SASS 문법을 몰라요
// SASS로 작성한 파일을 다시 CSS로 컴파일해야한다. (node-sass 설치하면 알아서 해줌)


// CSS를 미리 입혀놓은 컴포넌트 (ClassName 작명 필요없음)
let 박스 = styled.div`
    padding : 20px;
`;

let 제목 = styled.h4`
    font-size : 25px;
    // 색깔만 다른 제목이 여러개 필요하다면?
    color : ${props => props.색상}
`;

// Hook으로 컴포넌트의 인생 중간중간에 뭔가 명령을 줄수 있음 ✔
// e.g) <Detail> 퇴장 전에 이것좀 해주세요.

// 이전 문법
// Lifecycle Hook 몇개 (원래는 class 컴포넌트만 사용가능)
// class Detail2 extends React.Component {

//   // Detail2 컴포넌트가 Mount되었을 때 실행할 코드 ~
//   // 랜더링이 됐을때 실행 됌
//   componentDidMount() {
//     //Ajax 같은 것도 이런 곳에 자주 사용
//   }

//   // Detail2 컴포넌트가 unmount되기 직전에 실행될 코드
//   componentWillUnmount() {

//   }
// }


function Detail(props) {

  // useEffect 훅 1
  // 컴포넌트가 mount 되었을 때 (렌더링이 되었을 때 = 보일 때)
  // 컴포넌트가 update 될 때

  // useEffect 훅 2
  // 컴포넌트가 사라질 때 코드를 실행시킬 수도 있음
  // return () => { 실행할 코드 ~~}  // unmount가 될때 실행 됌

  // useEffect 훅 3
  // 여러개를 사용하고 싶다면

  // UI 만드는법
  // UI 보이고 / 안보이고 상태를 state로 저장
  let [alert, alert변경] = useState(true);

  let [inputData, inputData변경] = useState('');

  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);

  useEffect(() => {
    //2초 후에 저거 alert 창을 안보이게 해주셈
    let 타이머 = setTimeout(() => { alert변경(false) }, 2000);

    // setTimeout 이런거 쓸때 주의점
    // 타이머 해제 스킬
    // 오류 난 가능성이 많으니 return 을 사용하면 useEffect 종료 시
    // 타이머를 지운다.
    return () => { clearTimeout(타이머) }
  }, [alert]); // 실행조건을 넣을 수 있다.
  // alert를 넣을 시 alert의 state가 변경이 될때만 실행됌
  // [] 빈칸일시 _가 변경이 될때만 useEffect 실행되라
  // ✔ 팁 : [] 빈칸을 놔두게 되면 <Detail> 등장시 한 번 실행하고 끝남


  // 여러개 일때 차례대로 실행이 된다
  useEffect(() => {

  });

  // useParams 사용해서 파라미더 전달 가능
  let { id } = useParams();
  let history = useHistory();
  // let 찾은상품 = props.shoes.find(function(상품) {
  //     return 상품.id == id
  // })
  let 찾은상품 = props.shoes.find(x => x.id == id);

  console.log("찾은상품 : ", 찾은상품);

  return (
    <div className="container">
      <박스>
        {/* [props 문법]
            보낼이름 = { 변수명 }
            보낼이름 = "일반문자" */}
        <제목 className="red">Detail</제목>
      </박스>
      {inputData}
      {/* 입력 할 떄마다 재랜더링이 일어남
          위의 useEffect도 계속 실행되는 문제 ?! 
          useEffect에 []에 조건을 넣으면 useEffect가 실행되지 않음*/}
      <input onChange={(e) => { inputData변경(e.target.value) }} />
      {
        alert == true
          ? <div className="my-alert2">
            <p>재고가 얼마 남지 않았습니다.</p>
          </div>
          : null
      }

      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <Info 재고={props.재고} />
          <button className="btn btn-danger" onClick={() => {
            // 하위 컴포넌트가 상위 컴포넌트 state변경하려면 state 변경함수 씁니다.
            // 그게 상위 컴포넌트에 있으면 변경함수도 props로 전송해서 쓰셈
            props.재고변경([9, 11, 12]);
            props.dispatch({type : '항목추가', 데이터 : { id : 찾은상품.id, name : 찾은상품.title, quan : 1}});
            // 개발환경에서 페이지 이동시 강제새로고침 안되게 하려면 history.push
            history.push('/cart');
          }}>주문하기</button>
          &nbsp;
          <button className="btn btn-danger" onClick={() => {
            history.goBack();
            // history.push('/') : 특정 경로로 이동 시킬 때
          }}>뒤로가기</button>
        </div>
      </div>
      {/* mt-5 bootstrap이 제공하는 기본 class margin 5px */}
      <Nav className="mt-5" variant="tabs" defaultActiveKey="/link-0">
        <Nav.Item>
          {/* 버튼들 마다 유니크한 eventKey 부여하기 */}
          <Nav.Link eventKey="link-0" onClick={() => { 스위치변경(false); 누른탭변경(0)}}>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => { 스위치변경(false); 누른탭변경(1)}}>Option 2</Nav.Link>
        </Nav.Item>
      </Nav>
      
      {/* 1. <CSSTransition>으로 애니메이션 필요한 곳 감싸기 */}
      {/* in = 애니메이션 동작 스위치 true시 동작 / classNames = 작명 / timeout = 시간 */}
      <CSSTransition in={스위치} classNames="wow" timeout={ 500 }>
        <TabContent 누른탭={ 누른탭 } 스위치변경={스위치변경}/>
      </CSSTransition>

      <App></App>


    </div>
  )
}

function TabContent(props) {
  // 얘가 등장하거나 업데이트 될 때 스위치 true
  useEffect(() => {
    props.스위치변경(true);
  })

  if(props.누른탭 === 0 ) {
    return <div>0번쨰 내용입니다</div>
  } else if(props.누른탭 === 1) {
    return <div>1번쨰 내용입니다</div>
  } else if(props.누른탭 === 2) {
    return <div>2번쨰 내용입니다</div>
  }
}

function Info(props) {
  return (
    <p>재고 : { props.재고[0]}</p>
  )
}

// 다른곳에 dispatch 사용시 함수와 밑의 export default 필요
function state를props화(state) {

  return {
      // store 데이터를 props로 등록하기
      // state라는 이름의 props로 바꿔주셈
      state: state.reducer,
      alert열렸니 : state.reducer2
  }

}

function App(){
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);

  useEffect(() => {
    if (count != 0 && count< 3) {
      setAge(age + 1)
    }
  }, [count])

  return (
    <div>
      <div>안녕하십니까 전 {age}</div>
      <button onClick={() => {
        setCount(count + 1);
        console.log("count : ", count);
      }}>누르면한살먹기</button>
    </div>
  )

}
export default connect(state를props화)(Detail)


//export default Detail;