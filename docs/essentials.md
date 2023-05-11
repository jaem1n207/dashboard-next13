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

## 참고

- [React Essentials (Server Components)](https://nextjs.org/docs/getting-started/react-essentials#server-components)
- [custom cssinjs cache](https://github.com/vercel/next.js/pull/44015)
- [Next13 Nested layout](https://mycodings.fly.dev/blog/2022-11-14-nextjs-13-first-look-and-layout)
- [Next13 SSG, ISR 사용](https://mycodings.fly.dev/blog/2022-11-16-nextjs-13-how-to-ssg-isr-and-not-found)
- [Next13 Client Component](https://mycodings.fly.dev/blog/2022-11-17-nextjs-13-client-component)
