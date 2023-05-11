# Next.js 13버전대 사용해 구현한 내용 정리

`Next.js`로 애플리케이션 구축하려면 `Server Components`와 같은 `React`의 최신 기능에 익숙해지는 것이 도움이 됩니다. 먼저 Serve Components와 Client Components의 차이점, 사용 시기 및 권장 패턴을 살펴봅니다.

## Server Components?

기본적으로 `Next.js`는 JSX가 **순수한 HTML**로 컴파일되어 브라우저로 전송되는 `Server Components`를 사용합니다. 이것은 [문서](https://nextjs.org/docs/getting-started/react-essentials#why-server-components)에서 읽을 수 있듯이 더 나은 성능을 위한 것입니다.

> `Server Components`를 통해 개발자는 서버 인프라를 보다 효과적으로 활용할 수 있습니다. 예를 들어, 이전에 클라이언트의 JavaScript 번들 크기에 영향을 주었던 대규모 종속성이 대신 서버에 남아 성능이 향상될 수 있습니다. React 앱을 작성하는 게 작성이 PHP 또는 Ruby on Rails와 유사하게 느껴지지만, UI를 템플릿화하기 위한 React의 강력함과 유연성이 있습니다.

또한 Server Components에는 `useState` 또는 `useEffect`와 같은 훅과 관련된 front-end 관련 코드가 포함되어서는 안 됩니다. 필요한 경우, 컴포넌트 또는 해당 컴포넌트의 상위 항목 중 하나가 Client Component로 만들기 위해 최상단에 `"use client"`를 작성해야 합니다. Client Component에는 metadata와 같은 서버 측 항목이 포함되지 않아야 합니다.

## Recommended Next.js 13

Next.js 13 버전은 클라이언트와 서버 컴포넌트를 효율적으로 섞어 사용하도록 권장합니다. 즉 Nested Layout 형태로 쓰는 게 가장 좋습니다.
예를 들어, 검색 화면을 만든다 가정한다면 `input`은 클라이언트 컴포넌트로 작성하고 결과가 나타나는 곳은 Nested 형태로 Layout을 가져가서 데이터를 스트리밍한다는 개념으로 접근하라는 것입니다.

## Error & Loading Handling

경로별 폴더 내 `error.tsx` 또는 `loading.tsx` 파일을 만들어 핸들링할 수 있습니다. Next.js에서는 `error`와 `loading` 등을 파일 이름으로 예약해두었기 때문이죠.
에러를 표시하는 화면은 서버사이드로 처리할 필요가 없습니다. 대부분 클라이언트 쪽에 에러를 보여줘야 하기 때문이죠. 그래서 'use client' 디렉티브를 지정합니다.

## Middleware

'/'로 진입하면 '/projects/my'로 리디렉션시키도록 설정했습니다. `middleware.ts`는 root 경로로 설정해야 합니다.

## custom cssinjs cache & extract styles (with.Antd)

Antd chacing

## 대시보드 UX 개선

Ant Design의 원칙 중 하나는 **Stay on the Page**입니다. 이를 해석하면 아래와 같습니다.

> 새로운 페이지로 이동하지 말고 같은 페이지에서 해결하는 게 좋습니다. 페이지 갱신이나 이동은 사용자의 흐름을 방해하기 때문입니다.

예를 들어, 삭제 버튼이 있다고 가정합니다. 현재 대시보드는 버튼을 클릭하면 한 번 더 사용자에게 확인하기 위해 모달창을 중앙에 띄웁니다. 모달 외에는 어둡게 딤(Dim)처리를 하고요.

`Antd` 의 `PopConfirm` 컴포넌트는 클릭한 요소 근처에 `Dialog` 를 띄웁니다. 클릭 액션이 있는 곳에 다이얼로그를 띄워 유저가 **즉각** 응답할 수 있게끔 하는 것입니다.

화면 상단에 띄우는 브라우저 `Alert` 나 `Modal` 은 사용자 시선을 흐트릴 수 있기 때문에 위 같은 상황에서는 좋은 UX가 될 수 없습니다.

`Antd` 의 디자인 원칙 10가지는 아래와 같습니다.

1. 근접성
2. 정렬
3. 대조
4. 반복
5. 직관적
6. 화면에 머물도록
7. 가볍게 유지
8. 가이드 제공
9. 트랜지션 사용
10. 즉각적인 반응

---

- 언어 설정 버튼 UX를 개선했습니다.
  - 버튼 아래에 다이얼로그 형태로 텍스트와 아이콘이 함께 표시됩니다.
- 아이콘만 표시되는 버튼 UX 개선
  - 아이콘에 마우스를 올리면 툴팁으로 어떤 액션을 하는 것인지 표시됩니다.

## 참고

- [React Essentials (Server Components)](https://nextjs.org/docs/getting-started/react-essentials#server-components)
- [custom cssinjs cache](https://github.com/vercel/next.js/pull/44015)
- [Next13 Nested layout](https://mycodings.fly.dev/blog/2022-11-14-nextjs-13-first-look-and-layout)
- [Next13 SSG, ISR 사용](https://mycodings.fly.dev/blog/2022-11-16-nextjs-13-how-to-ssg-isr-and-not-found)
- [Next13 Client Component](https://mycodings.fly.dev/blog/2022-11-17-nextjs-13-client-component)
