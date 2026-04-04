# Taskify Refactor

기존 Taskify 프로젝트를
**설계·구조·디자인 시스템 관점에서 재구성한 리팩토링 프로젝트**입니다.

---

## Quick Start

```bash
git clone https://github.com/codeit17-part3-team5/taskify-fe.git
cd taskify-refactor
npm install
npm run dev
```

---

### Design System 사용법

### Typography

```tsx
<h1 className="typo-32-b">메인 타이틀</h1>
<p className="typo-14-r text-muted-tw">설명 텍스트</p>
```

### Colors

```tsx
<button className="bg-primary-tw text-white">확인</button>
```

---

### Development Rules

- 커밋 전 `npm run lint:fix` 실행 필수
- 전역 스타일은 `src/app/layout.tsx`에서만 import
- 디자인 값 수정은 `src/styles/variable.css`에서만 관리

---

## Structure

현재 프로젝트는 `app + shared + domains` 구조를 기준으로 정리합니다.

- `src/app`: Next.js 라우트 엔트리
- `src/components`: 공용 UI
- `src/hooks`, `src/lib`, `src/assets`, `src/styles`: 공용 자산
- `src/domains`: 도메인 전용 코드

자세한 기준과 예시는 [docs/project-structure.md](./docs/project-structure.md)에서 확인할 수 있습니다.
