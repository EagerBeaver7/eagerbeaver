# 4일차 개인학습

## Next.js 란 무엇인가?

- 리액트를 위해 만든 오픈소스 자바스크립트 웹 프레임워크
- 서버 사이드 렌더링, 정적 사이트 생성, 증분 정적 재생성과 같은 다양하고 풍부한 기능을 제공

## 기능

- hot reloading
  - 개발 중 저장되는 코드는 자동으로 새로고침됩니다.

<br/>
<br/>

- automatic routing
  - pages 폴더에 있는 파일은 해당 파일 이름으로 라우팅됩니다. (pages/page1.tsx -> localhost:3000/page1)

  - public 폴더도 pages의 폴더와 동일하게 라우팅 할수있습니다. 그러나 모든 사람이 페이지에 접근할 수 있으므로 지양하도록합니다.

<br/>
<br/>

- single file components
  - style jsx를 사용함으로 컴포넌트 내부에 해당 컴포넌트만 스코프를 가지는 css를 만들수 있습니다.

  - style jsx global 를 사용하면 글로벌로 스타일 정의 가능합니다.
```javascript
// styled-jsx

function Heading(props) {
  const variable = "red";
  return (
    <div className="title">
      <h1>{props.heading}</h1>
      <style jsx>
        {`
          h1 {
            color: ${variable};
          }
        `}
      </style>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      // red
      <Heading heading="heading" />
      // block
      <h1>ttt</h1>
    </div>
  );
}
 
```

<br/>
<br/>

- 글로벌 스타일 정의 가능
  - _app.tsx에만 정의 가능합니다. 다른 컴포넌트에 정의한 경우 다른 클래스와 겹쳐 오류를 발생할 수 있음으로 _app에서만 허용합니다. 다른 컴포넌트에 정의시 아래와 같은 오류를 냅니다.

<br/>
<br/>

- server landing
  - 서버렌더링을 합니다. 클라이언트 렌더링과 다르게 서버렌더링을 한 페이지의 페이지 소스보기를 클릭하면 내부에 소스가 있습니다.

<br/>
<br/>

- code splitting
  - dynamic import를 이용하면 손쉽게 코드 스플리팅이 가능합니다.

  - 코드 스플리팅은 내가 원하는 페이지에서 원하는 자바스크립트와 라이브러리를 렌더링 하는 것입니다. 모든 번들(chunk.js)이 하나로 묶이지 않고, 각각 나뉘어 좀 더 효율적으로 자바스크립트 로딩 시간을 개선할 수 있습니다.

<br/>
<br/>

- typescript
  - 타입스크립트 활용을 위해 웹팩을 만지거나 바벨을 만질 필요 없습니다. 타입스크립트를 설치하고 (yarn add typescript @types/node @types/react) 명령어 (yarn run dev)만 하면 자동으로 tsconfig, next-end.d.ts가 생성되어 타입스크립트로 코딩이 가능해집니다.
