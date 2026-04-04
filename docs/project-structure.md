# Project Structure

Taskify Refactor는 `app` 라우팅과 `domains` 비즈니스 코드를 분리하는 구조를 기준으로 정리합니다.

## 기준

- `src/app`: Next.js 라우트 엔트리만 둡니다.
- `src/components`: 여러 도메인에서 재사용하는 공용 UI를 둡니다.
- `src/hooks`, `src/lib`, `src/assets`, `src/styles`: 전역 공용 자산을 둡니다.
- `src/domains/<domain>`: 특정 도메인 안에서만 사용하는 화면, 컴포넌트, 훅, 유틸을 둡니다.

## 현재 폴더 예시

```txt
src
├─ app
│  ├─ layout.tsx
│  └─ page.tsx
├─ assets
├─ components
│  ├─ dropdown
│  ├─ feedback
│  │  └─ toast
│  ├─ icons
│  └─ ui
├─ domains
│  ├─ dashboard
│  │  └─ components
│  │     ├─ chip
│  │     └─ navigation
│  ├─ home
│  │  └─ containers
│  └─ task
│     └─ components
│        ├─ chip
│        └─ searchDropdown
├─ hooks
├─ lib
└─ styles
```

## 언제 shared에 둘까

- 두 개 이상의 도메인에서 재사용할 가능성이 높을 때
- 비즈니스 의미보다 UI 역할이 더 강할 때
- 페이지가 바뀌어도 그대로 쓸 수 있는 범용 컴포넌트일 때

예시:

- `Button`, `Input`, `Modal`
- `toast`
- `PlusMark`
- 범용 `dropdown`

## 언제 domain에 둘까

- 특정 화면이나 기능의 문맥이 이름에 이미 들어 있을 때
- 다른 페이지에서 재사용하더라도 같은 도메인 안에서만 쓰일 때
- UI보다 비즈니스 의미가 더 강할 때

예시:

- `dashboard`의 `SideMenu`, `ColorChip`
- `task`의 `AssigneeCard`, `SearchDropdown`, 상태/카운트/태그 칩

## 작업 규칙

- 라우트 파일은 최대한 얇게 유지합니다.
- 페이지 로직은 `src/domains/<domain>/containers`로 이동합니다.
- 새 컴포넌트를 만들 때 먼저 shared인지 domain인지 결정한 뒤 생성합니다.
- 애매하면 처음에는 domain에 두고, 두 번째 사용처가 생기면 shared로 올립니다.
