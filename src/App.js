/* eslint-disable */

import './App.css';
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import Data from './data.js';
import Detail from './Detail.js';
import axios from 'axios';

// Route를 만드러보자 (페이지를 나누자)
// yarn add react-router-dom
import { Link, Route, Switch, useHistory } from 'react-router-dom';

import Cart from './Cart.js';

// context 만들기
// 1. React.createContext()로 범위생성
// 2. 같은 값을 공유할 HTML을 범위로 싸매기
// 3. value={ 공유원하는값 }
let 재고context = React.createContext();

// yarn add styled-components

// yarn add redux react-redux
// redux 쓰는 이유
// 1. .props 없이 모든 컴포넌트가 state를 갖다쓰기 가능

function App() {

  let [shoes, shoes변경] = useState(Data);
  let [loding, loding변경] = useState(false);
  let [재고, 재고변경] = useState([10, 11, 12]);



  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* ml-auto 오른쪽으로 위치 */}
          <Nav className="mr-auto">

            {/* 페이지 이동하는 버튼 만들기
            - 일단 <Navbar>안의 버튼에 href 지우고
            - <Link to="경로">버튼</Link>
            React 문법 Link 경로 입력하면 이동 됨 */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Switch 안에 담았더니 Route 들이 하나씩만 보임
          하나만 매칭이 됨 중복 매칭을 허용하지 않겠다. */}
      <Switch>

        {/* Q. /detail 경로로 접속해도 /경로 내용이 보이는 이유?
      - 매칭이 되는 것들은 다 보여줘서, /이 포함되는 /detail은 "/" 까지도 보여지게됌
      - 그게 싫은경우 exact 속성 추가하면 경로가 정확히 일치할 떄만 보여줌 */}

        <Route exact path="/">
          <Jumbotron className="background">
            <h1>20% season OFF</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
        </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          {/* container : 좌우 여백을 이쁘게 잡아줌 */}
          <div className="container">
            {/* value={공유하고싶은데이터} */}
            <재고context.Provider value={재고}>

              <div className="row">
                {
                  loding == true
                    ? <Loding></Loding>
                    : null
                }

                {
                  shoes.map((a, i) => {
                    return (
                      // <컴포넌트>엔 onClick 부여 X
                      <Card shoes={shoes[i]} i={i} key={i}></Card>
                    )
                  })
                }

                {/* <Card shoes={shoes[0]}></Card>
          <Card shoes={shoes[1]}></Card>
          <Card shoes={shoes[2]}></Card> */}

                {/* <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg"
              width="100%" />
            <h4>{ shoes[0].title }</h4>
            <p>{ shoes[0].content } & { shoes[0].price }</p>
          </div>
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes2.jpg"
              width="100%" />
            <h4>상품명</h4>
            <p>상품설명 & 가격</p>
          </div>
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes3.jpg"
              width="100%" />
            <h4>상품명</h4>
            <p>상품설명 & 가격</p>
          </div> */}
              </div>
            </재고context.Provider>
            <button className="btn btn-primary" onClick={() => {

              // POST 요청 방식
              // axios.post('서버URL', { id : 'codingapple', pw : 1234 });

              // 로딩중이라는 UI 띄움
              loding변경(true);
              // 성공하면 .then()
              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {
                  // 서버에서 데이터를 받아오면
                  // 로딩중이라는 UI 안보이게 처리
                  loding변경(false);
                  shoes변경([...shoes, ...result.data]); //...연산자는 괄호를 벗겨줍니다.
                  //shoes변경([{},{},{}, {},{},{}]) ... 사용하여 괄호를 벗겨 이런 모양이됌
                })
                .catch(() => {
                  // 로딩중이라는 UI 안보이게 처리
                  console.log("실패했어요.");
                })

            }}>더보기</button>
          </div>
        </Route>

        {/* /detail/:id
        아무문자나 받겠다는 URL 작명법
        1. 콜론 뒤에 맘대로 작성
        2. 여러개 사용가능 */}
        <Route path="/detail/:id">
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
        </Route>

        <Route path="/cart">
          <Cart></Cart>
        </Route>

        <Route path="/:id">
          <div>아무거나 적을때 이거 보여주셈</div>
        </Route>


      </Switch>
    </div>
  );
}

// Onclick <Card>에 달지말고 Card 컴포넌트 안에 다세요. 
function Card(props) {

  // useContext 훅으로 공유된 값 사용하기
  // useContext(범위이름)로 공유된 값 사용하기
  // 간단한 데이터 전송은 props 사용하기
  let 재고 = useContext(재고context);
  let history = useHistory();
  console.log("props : ", props);
  return (
    <div className="col-md-4" onClick={() => { history.push('/detail/' + props.shoes.id) }}>
      {/* src="" 에다가 데이터 바인딩하려면?
    src={} 이렇게하면 변수명 함수명 넣기 가능 */}
      <img src={"https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"}
        width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
      {/* props 대신 context를 쓰자
      - 하위 컴포넌트들이 props 없이도 부모의 값을 사용가능 */}
      <Test></Test>

    </div>
  )

}

function Loding(props) {
  return (
    <h4>로딩중</h4>
  )
}

function Test() {
  let 재고 = useContext(재고context)
  return (
    <p> {재고[0]} </p>
  )
}

// function Item(props) {
//   props.map(function (shoes, i) {
//     return (
//       <div className="col-md-4">
//         <img src="https://codingapple1.github.io/shop/shoes1.jpg"
//           width="100%" />
//         <h4>{props.shoes[i].title}</h4>
//         <p>{props.shoes[i].content} & {props.shoes[i].price}</p>
//       </div>
//     )
//   })
// }

export default App;
