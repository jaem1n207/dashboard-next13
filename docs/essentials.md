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
에러를 표시하는 화면은 서버사이드로 처리할 필요가 없습니다. 대부분 클라이언트 쪽에 에러를 보여줘야 하기 때문이죠. 그래서 'use client' 지시문을 사용합니다.

## Middleware

'/'로 진입하면 '/projects/my'로 리디렉션시키도록 설정했습니다. `middleware.ts`는 root 경로로 설정해야 합니다.

## CSS-in_JS

아래에서 설명하는 styled-components 라이브러리를 사용할 때 구성하는 설명과 코드는 [Next 공식 문서](https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-components)에 작성되어 있는 것을 번역한 것입니다.

자바스크립트 런타임 중 적용되는 CSS-in-JS 라이브러리는 현재 Next13 버전의 Server Component에서 지원되지 않습니다.
따라서 자바스크립트 코드가 적용이 되지 않은 페이지가 미리 렌더링되기 때문에 CSS-in-JS로 스타일링을 하면 스타일이 적용되지 않은 HTML 코드가 **먼저 렌더링** 되는 문제가 발생하게 됩니다.

> 이 방법은 Server Components & Streaming과 같은 최신 React 기능과 함께 CSS-in-JS를 사용하려면 라이브러리 작성자가 concurrent rendering을 포함한 최신 버전의 React를 지원해야 합니다.

NextJS는 이에 대한 해결책을 제시합니다. HTML 파일에 CSS-in-JS 형식으로 작성된 스타일 요소들을 주입시켜 스타일이 뒤늦게 적용되는 문제를 해결할 수 있는거죠.

> Server Component의 스타일을 지정하려면 CSS 모듈 또는 PostCSS 또는 Tailwind CSS와 같은 CSS 파일을 출력하는 다른 솔루션을 사용하는 것이 좋습니다.

1. 먼저 `styled-components`API를 사용하여 렌더링 중에 생성된 모든 CSS 스타일 규칙을 수집하는 전역 레지스트리 컴포넌트와 이러한 규칙을 반환하는 함수를 만듭니다. 그런 다음 `useServerInsertedHTML` 훅을 사용해 레지스트리에 수집된 스타일을 루트 레이아웃의 `head` HTML 태그에 삽입합니다.

```tsx
// lib/styled-registry.tsx

'use client';

import React, { useState, type PropsWithChildren } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

const StyledComponentRegistry = ({ children }: PropsWithChildren) => {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();

    return <>{styles}</>;
  });

  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
  );
};

export default StyledComponentRegistry;
```

2. 루트 레이아웃의 `children`을 `StyledComponentRegistry` 컴포넌트로 감싸줍니다.

```tsx
// app/layout.tsx

import StyledComponentsRegistry from './lib/registry';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <StyledComponentRegistry>{children}</StyledComponentRegistry>
      </body>
    </html>
  );
}
```

알아두면 좋은 것:

- 서버 렌더링 중에 스타일이 전역 레지스트리로 추출되고 HTML의 `head`로 모두 주입됩니다. 이렇게 하면 스타일 규칙이 사용할 수 있는 콘텐츠보다 먼저 배치됩니다. 향후에는 다가올 React 기능을 사용하여 스타일을 주입할 위치를 결정할 수 있다고 합니다.
- streaming 중에, 각 청크의 스타일이 수집되어 기존 스타일에 추가됩니다. 클라이언트 측 `hydration`이 완료되면 `styled-components`가 평소처럼 대체되어 더 많은 동적 스타일을 주입합니다.
- 이러한 방식으로 CSS 규칙을 추출하는 것이 더 효율적이기 때문에 특히 스타일 레지스트리에 대해 트리의 최상위 수준에 있는 Client Component를 사용합니다. 이렇게 하면 후속 서버 렌더링 시 스타일이 다시 생성되지 않고 Server Component로 payload가 전송되는 것을 방지합니다.

위와 마찬가지로 `Antd`를 사용할 때도 몇 가지 작업을 수행해야 합니다. `@ant-design/cssinjs` 패키지를 활용해서 쉽게 할 수 있습니다.

1.

```tsx
// lib/ant-registry.tsx

'use client';

import { useState, type PropsWithChildren } from 'react';
import { ConfigProvider } from 'antd';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';

const AntdStyleRegistry = ({ children }: PropsWithChildren) => {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    );
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '...',
          colorBgContainer: '...',
        },
      }}>
      <StyleProvider hashPriority="high" cache={cache}>
        {children}
      </StyleProvider>
    </ConfigProvider>
  );
};

export default AntdStyleRegistry;
```

2. 루트 레이아웃의 `children`을 `AntdStyleRegistry` 컴포넌트로 감싸줍니다.

```tsx
import StyledComponentsRegistry from './lib/registry';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AntdStyleRegistry>{children}</AntdStyleRegistry>
      </body>
    </html>
  );
}
```

3. `Antd`의 컴포넌트를 사용하기 위해 'use client' 지시문을 사용하고 테스트 해봅니다.

```tsx
'use client';

import React from 'react';
import { Button } from 'antd';

export default function AntdButton() {
  return <Button type="primary">Ant Design Button</Button>;
}
```

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
- [Antd with Nextjs 13](https://github.com/ant-design/ant-design/issues/38555)
