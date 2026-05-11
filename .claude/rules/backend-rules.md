---
globs: backend/**/*.java
---

# Project Overview
이 프로젝트는 Spring Boot 기반 백엔드 프로젝트입니다.

## Tech Stack
- Java 21
- Spring Boot
- Spring Data JPA
- MySQL
- Gradle

## Coding Style
- 객체지향적인 설계를 우선한다.
- 의미 없는 util 클래스 사용을 지양한다.
- 서비스는 orchestration 역할에 집중한다.
- DTO는 단순 데이터 전달 역할만 수행한다.
- 불변 타입 객체는 record 클래스를 사용한다.
- Setter 사용을 지양한다.
- 의미 없는 Getter 남발을 지양한다.
- Validation은 최대한 객체 생성 시점에 수행한다.
- 무조건적인 디자인 패턴 적용을 지양한다.
- 실무적인 설계를 우선한다.
- 과도한 추상화를 피한다.
- 유지보수성을 우선 고려한다.

## Object Creation Rules
- 객체 생성 파라미터가 1~2개인 경우 new 사용을 허용한다.
- 객체 생성 파라미터가 3개 이상이면 정적 팩토리 메서드 사용을 우선 고려한다.
- VO는 정적 팩토리 메서드(of)를 우선 사용한다.
- 생성 시점에 항상 유효한 상태를 보장한다.

## DDD Rules
- DDD 스타일을 지향한다.
- Aggregate Root를 통해서만 내부 객체를 수정한다.
- Aggregate 간 직접 참조보다 ID 참조를 우선한다.
- Repository는 Aggregate Root 기준으로만 생성한다.
- 비즈니스 로직은 Entity 또는 Domain Service에 위치시킨다.
- Controller → Service → Domain → Repository 흐름을 따른다.
- 컨트롤러는 최대한 얇게 유지한다.
- 한 트랜잭션은 하나의 Aggregate 변경을 우선 고려한다.
- 도메인 용어(Ubiquitous Language)를 클래스명과 메서드명에 반영한다.
- 단순 CRUD라도 도메인 의미가 있다면 메서드 이름에 의미를 드러낸다.
- update() 같은 포괄적 메서드보다 changePassword(), completeOrder() 같은 명시적 행위를 선호한다.

## JPA Rules
- OneToMany 사용을 지양한다.
- ManyToOne 기반으로 설계한다.
- FetchType.LAZY를 기본으로 사용한다.
- Cascade 남용을 지양한다.
- 양방향 연관관계는 꼭 필요한 경우에만 사용한다.
- 기본 생성자는 protected로 제한한다.
- 엔티티 컬렉션은 외부에 직접 노출하지 않는다.
- equals/hashCode는 식별자 기준으로 신중하게 구현한다.

## Naming Convention
- Entity: 명사
- Service: ~Service
- Repository: ~Repository
- Request DTO: ~Request
- Response DTO: ~Response

## Testing
- 테스트 가능한 구조를 우선한다.
- Mock 남용보다 실제 흐름 테스트를 선호한다.

## Response Style
- 코드 생성 시 이유를 함께 설명한다.
- 리팩토링 포인트가 있다면 제안한다.
- DDD 관점에서 문제점이 있다면 지적한다.
- 더 나은 설계가 있다면 함께 제안한다.