당신은 시니어 프론트엔드 엔지니어이자 UX 중심 포트폴리오 웹사이트 아키텍트입니다.

아래 요구사항을 기반으로 React + GitHub 기반의 게임 기획자 포트폴리오 웹사이트를 구현하세요.

## 구현 상태 및 실행 방법

이 저장소는 Vite + React + TypeScript 기반 포트폴리오 사이트로 구성되어 있습니다.

```bash
npm install
npm run dev
npm run build
npm run lint
```

콘텐츠 관리는 아래 JSON 파일에서 수행합니다.

* 카테고리: `src/data/categories.json`
* 포트폴리오 항목: `src/data/portfolio.json`
* 썸네일: `public/assets/thumbnails/`
* PDF: `public/assets/pdfs/`
* HTML 프로토타입: `public/assets/prototypes/`
* WebGL: `public/assets/webgl/`

PDF 파일은 현재 샘플 자리표시자이며, 실제 기획서 PDF로 같은 경로에 교체하면 사이트 버튼에 즉시 반영됩니다.

# 프로젝트 목적

이 프로젝트는 신입 게임 기획자 취업용 포트폴리오 웹사이트입니다.

핵심 목표:

* 실무형 게임 기획 역량 강조
* 문서화 능력 + 프로토타이핑 능력 동시 증명
* HTML 프로토타입 및 Unity WebGL 실행 가능
* GitHub 저장소 기반으로 지속적인 포트폴리오 관리 가능

---

# 운영 방식

Firebase CMS나 관리자 페이지를 사용하지 않습니다.

포트폴리오 데이터와 자산은 GitHub 저장소에서 직접 관리합니다.

운영 흐름:

1. GitHub 저장소에서 데이터 파일 수정
2. 이미지/PDF/프로토타입/WebGL 관련 파일 또는 URL 추가
3. commit & push
4. 자동 배포
5. 웹사이트 반영

---

# 기술 스택

Frontend:

* React
* TypeScript 권장
* React Router
* Framer Motion

Content Management:

* GitHub Repository
* JSON 또는 Markdown/MDX 기반 데이터 관리

Deployment:

* GitHub Pages 또는 Vercel
* GitHub Actions 자동 배포 권장

---

# 추천 폴더 구조

```txt
src/
  components/
  sections/
  data/
    portfolio.json
    categories.json
  types/
  utils/

public/
  assets/
    thumbnails/
    pdfs/
    prototypes/
    webgl/
```

---

# 데이터 구조

PortfolioItem:

```ts
interface PortfolioItem {
  id: string;
  title: string;
  categoryId: string;
  summary: string;
  intention: string;
  thumbnailUrl: string;
  pdfUrl?: string;
  htmlPrototypeUrl?: string;
  webglUrl?: string;
  order: number;
}
```

Category:

```ts
interface Category {
  id: string;
  name: string;
  order: number;
}
```

---

# 카테고리 기본값

* 시스템 기획
* 콘텐츠 기획
* 라이브 서비스
* UX/UI 기획

카테고리는 `categories.json`에서 추가/수정/삭제 가능해야 합니다.

---

# 포트폴리오 관리 방식

포트폴리오 항목은 `portfolio.json`에서 관리합니다.

필드:

* 제목
* 카테고리
* 한 줄 요약
* 기획 의도
* 대표 이미지 경로
* PDF 경로
* HTML 프로토타입 URL
* WEBGL URL
* 정렬 순서(order)

정렬:

* `order` 값 기준 오름차순 정렬

---

# 브랜딩 방향

핵심 컨셉:

“깔끔하고 신뢰감 있는 문서 중심의 실무형 게임 기획 포트폴리오”

중요 방향:

* 과한 게임 UI 스타일 금지
* 문서 가독성 우선
* 구조적인 정보 전달
* 실행 가능한 결과물 강조
* 실무 적응 가능성 전달

톤:

* 모던 화이트 기반
* 회색 파스텔톤 포인트
* 차분하고 분석적인 느낌
* 깔끔한 인터페이스

금지:

* 과도한 네온 스타일
* SF HUD 스타일
* 무거운 인터랙션
* 복잡한 파티클 효과
* 과도한 3D 연출

---

# 사이트 구조

싱글 페이지 기반 구조.

상단 메뉴:

* 소개
* 역량
* 포트폴리오
* 연락

고정 헤더 사용.
현재 섹션 active 표시 필요.
부드러운 스크롤 이동 구현.

---

# GitHub Repository

Repository:

* https://github.com/rkalf00-ship-it/Portfolio

기본 브랜치:

* main

현재 상태:

* 초기 빈 저장소 상태
* React 프로젝트 신규 구축 예정

개발 방향:

* GitHub 기반 콘텐츠 운영
* JSON 데이터 기반 포트폴리오 관리
* GitHub Actions 자동 배포 고려

권장 배포:

* Vercel 우선 권장
* 대안으로 GitHub Pages 가능

---

# Git 운영 정책

구현 시:

* 유지보수 가능한 커밋 구조 사용
* 명확한 폴더 구조 유지
* README 정리
* .gitignore 구성
* 환경별 설정 분리

권장 커밋 예시:

```txt
feat: initialize portfolio project
feat: implement portfolio section
feat: add modal viewer for webgl
style: improve responsive layout
refactor: split portfolio card component
```

---

# 초기 프로젝트 구성 요구사항

프로젝트 초기화 시 아래 구성 포함:

* Vite 기반 React 프로젝트 권장
* TypeScript 사용
* ESLint 설정
* Prettier 설정
* 반응형 기본 세팅
* 공통 레이아웃 구조
* 기본 애니메이션 구조
* JSON 데이터 로더 구조

---

# 최종 목표

GitHub 저장소만 수정해도
포트폴리오 콘텐츠를 지속적으로 관리 가능한 구조를 구현할 것.

---

# Hero Section

포함 요소:

* 이름
* 게임 기획자 소개 문장
* 포트폴리오 이동 버튼
* 연락 버튼
* 실행 가능한 프로토타입 보유 강조

소개 문장 예시:

“시스템 기획서, 콘텐츠 설계, UX 개선안을 문서화하고 프로토타입으로 검증하는 신입 게임 기획자입니다.”

표시 정보:

* HTML 프로토타입 개수
* Unity WebGL 프로젝트 개수
* 기획 문서 개수

이 개수는 가능하면 `portfolio.json` 데이터를 기반으로 자동 계산합니다.

---

# Skills Section

카드 형태 UI.

포함 역량:

* 시스템 설계
* 콘텐츠 구조화
* 라이브 서비스 분석
* UX/UI 개선
* 문서화 능력

---

# Portfolio Section

## 카테고리 UI

상단 탭형 UI 사용.

기본 카테고리:

* 시스템 기획
* 콘텐츠 기획
* 라이브 서비스
* UX/UI 기획

카테고리는 `categories.json` 기반으로 렌더링합니다.

---

# Portfolio Card

스타일:

* 심플형 구성
* 액션 버튼 포함

포함 요소:

* 대표 이미지
* 프로젝트 제목
* 한 줄 요약
* PDF 버튼
* HTML 버튼
* WEBGL 버튼

레이아웃:

* PC: 3열
* Tablet: 2열
* Mobile: 1열

---

# 상세 표시 방식

카드 클릭 시:

* 페이지 내부 확장 방식 사용

상세 영역 포함 내용:

* 프로젝트 제목
* 한 줄 요약
* 기획 의도
* 액션 버튼

기획 의도:

* 150~400자
* 문단 1~2개
* 왜 만들었는가
* 어떤 플레이 경험을 목표로 했는가
* 어떤 문제를 해결하려 했는가

---

# PDF 처리

PDF 버튼:

* 새 탭 열기

PDF 파일 위치:

* `public/assets/pdfs/`

썸네일:

* 기획서 첫 페이지 캡처 이미지를 `public/assets/thumbnails/`에 저장하여 사용

자동 PDF 첫 페이지 추출은 필수 구현이 아닙니다.
GitHub 운영 방식에서는 썸네일 이미지를 직접 업로드하는 방식을 기본으로 합니다.

---

# HTML / WebGL 실행

실행 방식:

* 모달 기반

모달 스타일:

* 거의 전체 화면형
* 화면의 85~95% 사용

모달 구성:
상단:

* 프로젝트 제목
* 닫기 버튼
* 새 탭 열기 버튼

본문:

* iframe 실행

실행 대상:

* HTML 프로토타입
* Unity WebGL

HTML/WebGL은 URL 입력 방식으로 관리합니다.
외부 배포 URL 또는 `public/assets/prototypes/`, `public/assets/webgl/` 내부 경로를 사용할 수 있어야 합니다.

---

# 인터랙션

강도:

* 적당히 부드러운 수준

포함:

* 카드 hover
* 그림자 변화
* fade-in
* 모달 transition
* 탭 전환 애니메이션
* 부드러운 스크롤

---

# 모바일 최적화

필수.

정책:

* 카드 1열
* 상단 탭 가로 스크롤
* 큰 터치 영역
* 모바일 모달 최적화
* WebGL은 모바일에서 새 탭 실행 유도 가능

---

# Contact Section

포함 요소:

* 이메일만 사용

표시 내용:

“게임 기획 포지션과 관련된 문의는 아래 이메일로 연락 부탁드립니다.”

이메일:

* [rkalf00@gmail.com](mailto:rkalf00@gmail.com)

기능:

* 이메일 복사 버튼
* 메일 보내기 버튼

---

# 사용자 경험 목표

사용자 흐름:

1. 소개 확인
   → 어떤 기획자인가?

2. 역량 확인
   → 무엇을 잘하는가?

3. 프로젝트 탐색
   → 실제로 어떤 사고를 했는가?

4. PDF/프로토타입 실행
   → 실행 가능한 수준인가?

5. 연락
   → 면접 제안 가능 여부

---

# 구현 요구사항

반드시:

* 컴포넌트 기반 구조화
* 유지보수 가능한 폴더 구조
* 재사용 가능한 UI 설계
* JSON 데이터 기반 렌더링
* GitHub 기반 콘텐츠 운영 가능
* 반응형 UI 구현
* 깔끔한 코드 작성
* TypeScript 사용 권장

우선순위:

1. 정보 구조
2. UX
3. 가독성
4. 성능
5. 애니메이션

과한 시각 효과보다:
“신뢰감 있는 실무형 포트폴리오”
느낌을 최우선으로 구현할 것.
