# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 프로젝트 개요

**백엔드 개발자 포트폴리오 웹사이트** - 4단계 로드맵으로 구성된 프로젝트
- Phase 1 (현재): 정적 프론트엔드 (HTML + Tailwind CSS + Vanilla JS)
- Phase 2: Node.js + Express API
- Phase 3: Spring Boot 마이그레이션 + AWS S3
- Phase 4: AI 자동화 관리자 페이지

**목표**: 다크 모던 테마의 포트폴리오 사이트를 빠르게 구축하고 점진적으로 확장

---

## 개발 환경 및 실행 방법

### 로컬 개발 서버 실행
```bash
# Node.js 사용
npx http-server . -p 8000

# 또는 Python 사용
python3 -m http.server 8000
```

### Tailwind CSS 빌드 (PostCSS 방식)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss -i ./css/input.css -o ./css/style.css --watch
```

### 배포
```bash
# GitHub Pages: gh-pages 브랜치에 푸시
# Vercel: vercel 명령어 또는 자동 연동
```

### 필수 환경
- Node.js 18+ (선택사항, http-server 또는 PostCSS 사용 시)
- 최신 브라우저 (ES6 지원)

---

## 프로젝트 구조

```
portfolio/
├── index.html              # 메인 페이지 (SPA)
├── css/
│   └── style.css          # Tailwind 유틸리티 + 커스텀 스타일
├── js/
│   ├── main.js            # 초기화 및 메인 로직
│   ├── animations.js      # 스크롤 애니메이션, Intersection Observer
│   └── utils.js           # debounce, throttle 등 헬퍼 함수
├── assets/
│   ├── images/            # 프로필 사진, 프로젝트 이미지
│   └── icons/             # 기술 스택 아이콘 (SVG)
├── ROADMAP.md             # 4단계 개발 로드맵
├── README.md              # 프로젝트 설명
└── CLAUDE.md              # 이 파일
```

---

## 아키텍처

### HTML 구조 (시맨틱 태그 기반)
```
<header>                          # 상단 네비게이션
<main>
  <section id="hero">             # 1. 히어로 섹션 (타이핑 애니메이션)
  <section id="about">            # 2. 자기소개
  <section id="skills">           # 3. 기술 스택 (5개 카드)
  <section id="experience">       # 4. 경력 타임라인
  <section id="projects">         # 5. 프로젝트 (4개)
  <section id="certifications">   # 6. 자격증 (4개)
  <section id="contact">          # 7. 연락처
<footer>                          # 하단 정보
```

### 스타일 레이어
- **Tailwind Utility Classes**: 기본 스타일링
- **Custom CSS**: 복잡한 애니메이션, 그라디언트 (필요시만)
- **다크 모드**: `bg-slate-950`, `text-slate-50` 기본값

### JavaScript 인터랙션
- **Scroll Events**: debounce를 활용한 성능 최적화
- **Intersection Observer**: 뷰포트 진입 시 애니메이션 트리거
- **애니메이션**: CSS 기반 (animate.css 또는 Tailwind animate)

---

## 코드 컨벤션

### 네이밍 규칙
```javascript
// 변수/함수: camelCase
const scrollPosition = window.scrollY;
const handleScroll = () => { };
const observeScrollAnimation = (selector) => { };

// 상수: UPPER_SNAKE_CASE
const MAX_SCROLL_OFFSET = 100;
const ANIMATION_DURATION = 600; // ms

// DOM 선택자: kebab-case
const heroSection = document.querySelector('#hero');
const projectCards = document.querySelectorAll('.project-card');
```

### CSS 클래스 네이밍 (Tailwind 우선)
```html
<!-- Tailwind 유틸리티로 충분한 경우 -->
<div class="bg-slate-900 text-white px-4 py-8 rounded-lg hover:shadow-lg transition-shadow duration-300">

<!-- 복잡한 스타일은 커스텀 클래스 -->
<div class="glass-morphism">  <!-- style.css에서 정의 -->
```

### 커스텀 CSS 스타일 (필요시만)
```css
/* 1. CSS 변수 (다크 모드 대비) */
:root {
  --color-primary: #00ff88;
  --color-secondary: #6366f1;
  --bg-dark: #0a0a0a;
}

/* 2. 애니메이션 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 3. Glassmorphism 효과 */
.glass-morphism {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### JavaScript 스타일
```javascript
// 1. 모듈화: 기능별 함수 분리
// animations.js - 스크롤 기반 애니메이션
const observeScrollAnimation = (selector, threshold = 0.1) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
      }
    });
  }, { threshold });
  
  document.querySelectorAll(selector).forEach(el => observer.observe(el));
};

// 2. 유틸리티 함수 - 재사용 가능하게 작성
const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// 3. 이벤트 위임
document.addEventListener('scroll', debounce(() => {
  const scrollY = window.scrollY;
  console.log('Scroll position:', scrollY);
}, 100));
```

### HTML 컨벤션
```html
<!-- 1. 시맨틱 태그 사용 -->
<header role="banner"></header>
<nav role="navigation"></nav>
<main role="main"></main>
<section id="unique-id"></section>
<footer role="contentinfo"></footer>

<!-- 2. 접근성 속성 -->
<img src="..." alt="설명적인 텍스트" />
<button aria-label="메뉴 열기"></button>
<a href="..." title="링크 설명"></a>

<!-- 3. 다크 모드 기본값 -->
<body class="bg-slate-950 text-slate-50">
```

---

## 프로필 데이터 구조

### JavaScript 데이터 객체 (Phase 2에서 API로 변경)
```javascript
const PROFILE = {
  name: "문지웅",
  title: "Spring Boot와 AWS 기반 아키텍처 경험을 갖춘 백엔드 개발자",
  bio: ["문제 해결 능력", "SOLID 원칙", "새로운 기술 학습"],
  email: "ans109905@naver.com",
  github: "https://github.com/aksenaksen",
  birth: "2000.08.17",
  location: "부산시 남구"
};

const SKILLS = [
  {
    name: "Java / Spring Boot",
    icon: "spring.png",
    items: ["Spring AOP", "Spring Security", "Spring Batch", "Spring Event"]
  },
  // ... 더 많은 기술
];

const PROJECTS = [
  {
    id: 1,
    title: "AI 활용한 식단관리 어플리케이션",
    period: "2024.08 ~ 2024.10",
    role: "팀 프로젝트 (기여도 50/100)",
    award: "BDIA 해커톤 3등",
    tech: ["Spring Boot", "Docker", "Redis", "AWS", "FastAPI"],
    link: "https://github.com/aksenaksen/caloriepay-back",
    features: [
      "자동 식단 관리",
      "권장 칼로리 제공",
      "티어 및 스코어 시스템"
    ]
  },
  // ... 더 많은 프로젝트
];

const CERTIFICATIONS = [
  {
    title: "AWS Certified Solutions Architect - Associate",
    date: "2025-09-10",
    issuer: "Amazon Web Services"
  },
  // ... 더 많은 자격증
];
```

---

## 개발 패턴 및 예시

### 신규 섹션 추가 패턴
```html
<!-- Step 1: HTML 구조 (index.html) -->
<section id="new-section" class="py-20 px-4 bg-slate-900">
  <div class="container mx-auto max-w-4xl">
    <h2 class="text-4xl font-bold text-white mb-12">섹션 제목</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 콘텐츠 -->
    </div>
  </div>
</section>
```

### 스크롤 애니메이션 추가 (animations.js)
```javascript
// Step 2: JavaScript - 애니메이션 트리거
const initNewSectionAnimation = () => {
  observeScrollAnimation('#new-section > h2');
  observeScrollAnimation('.new-item', 0.2);
};

// Step 3: 초기화 (main.js에서 호출)
document.addEventListener('DOMContentLoaded', () => {
  initNewSectionAnimation();
});
```

### 커스텀 스타일 추가 (필요시만)
```css
/* Step 4: CSS (style.css) - 복잡한 스타일만 */
#new-section .custom-gradient {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
}

#new-section .custom-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
  transition: all 300ms ease-out;
}
```

---

## 주의사항 및 안티패턴

### ❌ 피해야 할 패턴

1. **추가 라이브러리 없이 유지**
   - CSS-in-JS (Styled Components, Emotion)
   - UI 프레임워크 (Bootstrap, Material UI)
   - 무거운 애니메이션 라이브러리

2. **하드코딩된 색상값 사용**
   ```css
   /* ❌ 나쁜 예 */
   .card { color: #00ff88; }
   
   /* ✅ 좋은 예 */
   .card { color: var(--color-primary); }
   ```

3. **비효율적인 DOM 접근**
   ```javascript
   /* ❌ 루프 내 DOM 조회 */
   items.forEach(item => {
     document.querySelector('.container').appendChild(item);
   });
   
   /* ✅ Fragment 사용 */
   const fragment = document.createDocumentFragment();
   items.forEach(item => fragment.appendChild(item));
   document.querySelector('.container').appendChild(fragment);
   ```

4. **이벤트 리스너 최적화 부족**
   ```javascript
   /* ❌ 과도한 이벤트 트리거 */
   window.addEventListener('scroll', handleScroll); // 매 프레임 실행
   
   /* ✅ Debounce 적용 */
   window.addEventListener('scroll', debounce(handleScroll, 100));
   ```

---

## 협업 규칙

### 코드 작성 시 지켜야 할 원칙
1. **Tailwind 우선**: 유틸리티 클래스로 충분한지 먼저 확인
2. **반응형 우선**: `md:`, `lg:`, `xl:` 프리픽스 활용 (mobile-first)
3. **접근성 고려**: `aria-label`, `role`, `alt` 속성 포함
4. **성능 최적화**: debounce, throttle, lazy loading 활용

### 변경 이유 명확히 설명
```
변경: 프로젝트 카드 호버 효과 수정
이유: 기존 opacity 변화만으로는 상호작용성 부족
개선 내용:
  - 스케일(1.02) + 섀도우 조합으로 입체감 추가
  - 트랜지션 시간 통일 (300ms)
  - 다크 모드에서 보더 그라디언트 추가
테스트: 데스크톱(Chrome, Safari) + 모바일(iOS Safari) 확인
```

### 위험한 변경 사전 경고
```
⚠️ 경고: Tailwind 버전 업그레이드 제안
현재: Tailwind CSS 3.x
변경 사항: 새로운 utility 추가, 일부 클래스명 변경
영향 범위: 전체 CSS (모든 .html 파일)
권장사항: Phase 4 이후 고려 (테스트 시간 많이 소요)
```

---

## Phase 1 체크리스트

### 필수 구현 사항
- [ ] 프로젝트 폴더 구조 생성
- [ ] Tailwind CSS 설정 (CDN 또는 PostCSS)
- [ ] Hero 섹션 (타이핑 애니메이션)
- [ ] About 섹션
- [ ] Skills 섹션 (5개 카드: Java, MySQL, Redis, AWS, Docker)
- [ ] Experience 섹션 (교육 이력)
- [ ] Projects 섹션 (4개 프로젝트)
- [ ] Certifications 섹션 (4개 자격증)
- [ ] Contact 섹션
- [ ] 반응형 디자인 (모바일 우선)
- [ ] 스크롤 애니메이션
- [ ] GitHub Pages/Vercel 배포

### 성능 최적화 (선택)
- [ ] 이미지 lazy loading (loading="lazy")
- [ ] 폰트 최적화 (system fonts 또는 Google Fonts 선택)
- [ ] Lighthouse 점수 80+ 달성

### SEO 최적화 (선택)
- [ ] meta 태그 추가 (og, twitter)
- [ ] Schema.org Structured Data
- [ ] robots.txt, sitemap.xml

---

## Phase 2/3/4 주요 변경사항

### Phase 2 (Node.js)에서의 변화
- `portfolio.json` 파일로 데이터 분리
- Express API 엔드포인트 구축
- 연락 폼 → 이메일 전송

### Phase 3 (Spring Boot)에서의 변화
- `/api/contact` 구현
- S3 이미지 서빙으로 변경
- 데이터베이스 기반 동적 콘텐츠

### Phase 4 (AI 자동화)에서의 변화
- `/admin` 관리자 페이지 추가
- Claude API 연동
- 자동 콘텐츠 생성

---

## 추가 리소스

- ROADMAP.md: 4단계 개발 로드맵 상세 설명
- 디자인 참고: [다크 모던 포트폴리오 예제](https://example.com)
- Tailwind CSS: [공식 문서](https://tailwindcss.com)
- 웹 접근성: [WAI-ARIA 가이드](https://www.w3.org/WAI/ARIA/apg/)

---

## 마지막 주의사항

✅ **지켜야 할 것**:
- Tailwind utility classes 최우선 사용
- 모든 섹션에 scroll animation 적용
- 다크 모드 일관성 유지
- 반응형 디자인 테스트 (데스크톱, 태블릿, 모바일)

❌ **하면 안 되는 것**:
- 외부 UI 프레임워크 추가
- 인라인 스타일 사용
- 복잡한 JavaScript 라이브러리
- 한 파일에 1000줄 이상 코드

---

**마지막 업데이트**: 2026-05-10
**현재 Phase**: Phase 1 - Static Frontend
