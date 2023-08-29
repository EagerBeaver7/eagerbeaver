# HIVE vs PIG

### HIVE

- 하둡 에코시스템 중 데이터를 모델링하고 프로세싱하는 경우 가장 많이 사용하는 데이터 웨어하우징용 솔루션
- SQL과 유사한 HiveQL로 데이터를 조회
- HDFS등에 있는 파일을 읽어들여 쿼리로 분석을 수행함. HiveQL을 작성하면 MapReduce로 변환되어 실행됨.
- Hive에서 만든 각 테이블의 정보는 Hive 메타 스토어라 불리는 특별한 DB에 저장됨.
- 데이터베이스 X
- 데이터 처리를 위한 배치 처리
- HDFS나 HBase와 같은 빅데이터 원본을 HQL 질의 언어를 이용하여 분석
- but, JOIN이 약하다.
- JAVA기반
- 편리성을 위하여 MapReduce 작업을 완전 대체하는 것

### PIG

- HIVE보다 성능이 더 좋다. (JOIN)
- 여러 개의 테이블을 섞어서 사용할 때는 PIG가 더 좋음.
- 시스템이 코드 실행을 자동으로 최적화함(옵티마이저)
- HDPS 파일만 가져올 수 있음.
- Filter, Foreach, Group, Join, Load, Store등 관계 연산을 지원
- 개별적으로 Control
