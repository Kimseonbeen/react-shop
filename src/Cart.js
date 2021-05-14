import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';  // connect import

// state를props화 함수에서 props로 만들었으니
// props 전송해서 state 사용
// redux 쓰는 이유
// 1. 깊은 하위컴포넌트들도 props 여러번 전송없이 state를 직접 갖다쓸 수 있음
// 2. state 데이터 관리 가능 (변경 버튼 state 수정 + - 예제)
// 2-1. redux에선 state 데이터의 수정방법을 미리 정의합니다 (index.js)
function Cart(props) {
    return (
        <div>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.state.map((a, i) => { // a = props.state[i]
                            return (
                                <tr key={i}>
                                    <td>{a.id}</td>
                                    <td>{a.name}</td>
                                    <td>{a.quan}</td>
                                    {/* 데이터 수정요청을 할 땐 props.dispatch() 
                                        props.dispatch({ type: ??? }) */}
                                    <td><button onClick={() => { props.dispatch({type : '수량증가', 데이터 : a.id })}}>
                                        +</button>
                                        <button onClick={() => { props.dispatch({type : '수량감소', 데이터 : a.id })}}>
                                        -</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            {  props.alert열렸니 === true
                ? <div className="my-alert2">
                    <p>지금 구매하시면 신규할인 20%</p>
                    <button onClick={() => {props.dispatch({type : '닫힘'}) }}>닫기</button>
                </div>
                : null
            }
        </div>
    )
}

// store(redux store)에 있는 데이터를 가져와서 props로 변환해주는 함수
// reducer가 두개이상이면 이것도 바뀜
function state를props화(state) {
    return {
        // store 데이터를 props로 등록하기
        // state라는 이름의 props로 바꿔주셈
        state: state.reducer,
        alert열렸니 : state.reducer2
    }

}
// 컴포넌트에서 store에 있는 state 쓰려면
// 1. function 만들기
// 2. export default connect()()
export default connect(state를props화)(Cart)

// export default Cart;