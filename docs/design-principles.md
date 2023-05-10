# 10 Design Priciples

1. 근접성 (Proximity)
2. 정렬 (Alignment)
3. 대조 (Contrast)
4. 반복 (Repetition)
5. 직관적으로 만들어라 (Make it Direct)
6. 화면에 머물러라 (Stay on the Page)
7. 가볍게 유지하라 (Keep it Lightweight)
8. 가이드를 제공해라 (Provide an Invitation)
9. 트랜지션을 사용하라 (Use Transition)
10. 즉각적인 반응 (React Immediately)

예를 들어, `화면에 머물러라`라는 6번 원칙을 소개하면 이렇다.

> 새로운 페이지로 이동하지 말고 같은 페이지에서 해결해라. 페이지 갱신이나 이동은 사용자를 장님으로 만들고 의식의 흐름을 방해한다.

삭제 버튼이 있다고 가정. 링크를 클릭하면 한 번 더 사용자에게 확인하기 위해 다이얼로그를 띄운다.

보통은 브라우저 기본 확인창(`window.confirm()`)을 띄울지 모른다. 아니면 모달창을 중앙에 띄우기도 한다. 모달 외에는 어둡게 딤(Dim)처리를 할테고...

앤트 디자인의 `Popconfirm` 컴포넌트는 클릭한 링크 근처에 `Dialog`를 띄운다. 클릭 액션이 있는 곳에 다이얼로그를 띄워 유저가 **즉각** 응답할 수 있게끔 하는 것이다. 화면 상단에 띄우는 브라우저 `Alert`이나 `Modal`은 사용자 시선을 흐트릴 수 있기 때문에 이렇게 하는 것이라고 말한다.

위 10개의 디자인 원칙을 읽다보면 좋은 UX에 대한 그들의 생각이 무엇인지 감이 온다.

## 참고

- [앤트 디자인 원칙](https://jeonghwan-kim.github.io/2018/10/13/ant-design-101.html)
