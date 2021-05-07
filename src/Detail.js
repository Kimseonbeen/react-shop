import { useHistory,useParams } from "react-router";
// yarn add styled-components
import styled from 'styled-components';
import './Detail.scss';

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
    color : ${ props => props.색상 }
`;

function Detail(props) {

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
            <div className="my-alert2">
                <p>재고가 얼마 남지 않았습니다.</p>
            </div>
            <div className="row">
              <div className="col-md-6">
                <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
              </div>
              <div className="col-md-6 mt-4">
                <h4 className="pt-5">{찾은상품.title}</h4>
                <p>{찾은상품.content}</p>
                <p>{찾은상품.price}원</p>
                <button className="btn btn-danger">주문하기</button>
                <button className="btn btn-danger" onClick={() => {
                    history.goBack();
                    // history.push('/') : 특정 경로로 이동 시킬 때
                }}>뒤로가기</button>
              </div>
            </div>
          </div>
    )
  }


export default Detail;