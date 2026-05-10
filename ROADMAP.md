# 백엔드 개발자 포트폴리오 웹사이트 로드맵

## 프로젝트 개요
Spring Boot와 AWS 기반 아키텍처 경험을 갖춘 백엔드 개발자 문지웅의 포트폴리오 사이트를 빠르게 구축하고, 이후 점진적으로 확장하는 프로젝트입니다.

**현재 노션에 프로필 내용**이 있으며, 이를 웹사이트로 이전합니다.
- 다크 모던 테마
- 진행순서: HTML/TailwindCSS/JS → Node.js → Spring Boot → AI 자동화

---

## 전체 아키텍처 로드맵 (4단계)

```
Phase 1: Static Frontend  →  Phase 2: Node.js API  →  Phase 3: Spring Boot + S3  →  Phase 4: AI Admin
    (1~2주)                      (1~2주)                    (2~4주)                     (4~8주)
```

---

## Phase 1: 정적 프론트엔드 (현재 단계)

### 목표
노션 내용을 바탕으로 다크 모던 포트폴리오 페이지 완성

### 기술 스택
- HTML5
- Tailwind CSS (CDN 또는 PostCSS)
- Vanilla JS (애니메이션, 스크롤 이벤트)
- Font Awesome / Lucide Icons

### 페이지 구성
```
/
├── index.html          # 메인 (SPA 방식)
├── css/
│   └── style.css       # Tailwind 커스텀 + 추가 스타일
├── js/
│   └── main.js         # 스크롤 애니메이션, 타이핑 효과 등
└── assets/
    └── images/         # 임시 로컬 이미지 (Phase 3에서 S3로 이전)
```

### 섹션 구성
1. **Hero** - 이름, 직함, 간단 소개 + 타이핑 애니메이션
2. **About** - 자기소개, 가치관
3. **Tech Stack** - 기술 스택 카드 (Backend/DevOps 분류)
4. **Experience** - 경력 타임라인
5. **Projects** - 프로젝트 카드 (GitHub 링크, 설명, 기술 태그)
6. **Contact** - 이메일, GitHub, LinkedIn 링크

### 디자인 방향
- **배경**: `#0a0a0a` ~ `#111111` (딥 블랙)
- **포인트 컬러**: `#00ff88` (네온 그린) 또는 `#6366f1` (인디고)
- **폰트**: Inter / JetBrains Mono (코드 강조)
- **효과**: glassmorphism 카드, 그라디언트 테두리, 스크롤 reveal 애니메이션

### 프로필 데이터
- **이름**: 문지웅
- **생년월일**: 2000.08.17
- **위치**: 부산시 남구 대연동
- **이메일**: ans109905@naver.com
- **GitHub**: https://github.com/aksenaksen
- **직함**: Spring Boot와 AWS 기반 아키텍처 경험을 갖춘 백엔드 개발자

### Phase 1 체크리스트
- [ ] 프로젝트 디렉토리 구조 생성
- [ ] Tailwind CSS 설정 (CDN 또는 PostCSS)
- [ ] 다크 테마 기본 레이아웃 및 네비게이션
- [ ] Hero 섹션 (타이핑 애니메이션 포함)
- [ ] About 섹션
- [ ] Tech Stack 섹션 (5개 기술 카드)
- [ ] Experience 섹션
- [ ] Projects 섹션 (4개 프로젝트)
- [ ] Certifications 섹션 (4개)
- [ ] Contact 섹션
- [ ] 반응형 디자인 (모바일 우선)
- [ ] 스크롤 애니메이션 및 상호작용
- [ ] GitHub Pages/Vercel 배포

---

## Phase 2: Node.js 백엔드 추가

### 목표
정적 데이터를 API로 분리, 연락 폼 구현

### 기술 스택
- Node.js + Express
- JSON 파일 또는 SQLite (경량 DB)
- nodemailer (연락 폼 이메일 발송)

### 디렉토리 구조
```
/
├── server/
│   ├── index.js            # Express 진입점
│   ├── routes/
│   │   ├── portfolio.js    # GET /api/projects, /api/skills, /api/experience
│   │   └── contact.js      # POST /api/contact
│   └── data/
│       └── portfolio.json  # 포트폴리오 데이터 소스
├── public/                 # Phase 1 정적 파일들
└── package.json
```

### API 설계
```
GET  /api/portfolio     → 전체 프로필 데이터
GET  /api/projects      → 프로젝트 목록
GET  /api/skills        → 기술 스택
GET  /api/experience    → 경력 목록
POST /api/contact       → 연락 폼 전송
```

### Phase 2 체크리스트
- [ ] Node.js + Express 프로젝트 초기화
- [ ] 포트폴리오 데이터 JSON 설계
- [ ] REST API 구현
- [ ] 프론트엔드 API 연동
- [ ] 연락 폼 이메일 기능

---

## Phase 3: Spring Boot 마이그레이션 + S3

### 목표
Node.js → Spring Boot로 백엔드 교체, 이미지를 AWS S3로 서빙

### 기술 스택
- Spring Boot 3.x (Java 21)
- Spring Data JPA + MySQL/PostgreSQL (RDS)
- AWS S3 (이미지, 파일 서빙)
- AWS CloudFront (CDN - 선택사항)

### 마이그레이션 포인트
| Phase 2 (Node.js) | Phase 3 (Spring Boot) |
|---|---|
| Express routes | @RestController |
| JSON 파일 | JPA Entity + DB |
| 로컬 이미지 | S3 presigned URL |
| nodemailer | Spring Mail (JavaMailSender) |

### S3 이미지 서빙 설계
```
업로드: Admin → Spring Boot API → S3 버킷
서빙:   Frontend → CloudFront(CDN) → S3
URL 형식: https://cdn.yourdomain.com/profile/avatar.jpg
```

### 인프라 구성
```
Frontend (Vercel/Netlify)  →  Spring Boot (EC2/ECS)  →  RDS (MySQL)
                                      ↓
                               S3 (이미지 저장소)
                                      ↓
                             CloudFront (CDN 서빙)
```

### Phase 3 체크리스트
- [ ] Spring Boot 프로젝트 생성
- [ ] DB 스키마 설계 및 JPA 엔티티
- [ ] Node API → Spring Boot API 포팅
- [ ] S3 버킷 생성 및 이미지 마이그레이션
- [ ] CloudFront 배포 설정 (선택)
- [ ] 프론트엔드 API URL 전환

---

## Phase 4: AI 자동화 관리자 페이지

### 목표
관리자가 경력/프로젝트 정보를 입력하면 AI가 포트폴리오 콘텐츠를 자동 생성하고 웹에 반영

### 기술 스택
- Spring Boot (기존)
- Anthropic Claude API 또는 OpenAI API
- Spring Security (관리자 인증)
- WebSocket 또는 SSE (실시간 미리보기)

### 관리자 페이지 기능
```
/admin
├── /login              # JWT 기반 인증
├── /dashboard          # 전체 현황
├── /experience/new     # 경력 입력 → AI 설명 자동 생성
├── /project/new        # 프로젝트 입력 → AI 소개글 생성
├── /skills             # 기술 스택 관리
└── /preview            # 실시간 미리보기
```

### AI 자동화 플로우
```
1. 관리자 입력: 회사명, 기간, 담당업무 키워드
          ↓
2. Spring Boot → Claude/GPT API 호출
          ↓
3. AI 생성: 전문적인 경력 설명, 성과 서술, 기술 태그 추출
          ↓
4. 관리자 검토 및 수정
          ↓
5. DB 저장 → 포트폴리오 사이트 자동 반영
```

### AI 프롬프트 예시
```
입력: "카카오, 2023.01~2024.06, 결제 시스템 개발, Java, Spring, 트래픽 최적화"
출력: "카카오 Pay 결제 시스템 백엔드 개발에 참여하여 Java/Spring 기반 
      고가용성 결제 파이프라인을 구축. 트래픽 최적화를 통해 처리량 40% 향상..."
```

### Phase 4 체크리스트
- [ ] Spring Security 관리자 인증 구현
- [ ] AI API 연동 (Claude 또는 OpenAI)
- [ ] 프롬프트 엔지니어링 및 테스트
- [ ] 관리자 UI 개발
- [ ] DB → 포트폴리오 자동 반영 확인

---

## 기술 선택 근거

| 선택 | 이유 |
|---|---|
| **Tailwind CSS** | 빠른 다크 테마 구현, 유틸리티 클래스로 일관성 유지 |
| **Node.js 먼저** | Spring Boot 전에 빠른 프로토타이핑 |
| **S3 + CloudFront** | 이미지 서빙 비용 최적화, CDN 캐싱 |
| **Claude API** | 한국어 경력 설명 생성 품질 우수 |

---

## 즉시 시작 순서

1. Phase 1 정적 사이트 구현 (가장 빠른 결과물)
2. GitHub Pages/Vercel로 무료 배포
3. Phase 2 Node.js 백엔드 추가
4. Phase 3 Spring Boot 마이그레이션
5. Phase 4 AI 자동화 구현
