// 파일을 쪼갤 때 활용하는 import / export
// 내보내기 : export default 변수명
// 가져오기 : import  변수명 from 경로

// 여러 변수 export 사용 시
// 내보내기 : export { 변수1, 변수2 }
// 가져오기 : import { 변수1, 변수2 } from 경로
// 일반적으로 여러 개를 export 만드는 경우는 없다

export default [
    {
        id: 0,
        title: "White and Black",
        content: "Born in France",
        price: 120000
    },

    {
        id: 1,
        title: "Red Knit",
        content: "Born in Seoul",
        price: 110000
    },

    {
        id: 2,
        title: "Grey Yordan",
        content: "Born in the States",
        price: 130000
    }
]