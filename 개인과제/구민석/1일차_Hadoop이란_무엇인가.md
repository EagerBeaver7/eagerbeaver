# 1일차 개인학습

## 하둡
- 고가용성 분산형 객체 지향적 플랫폼

## 하둡 에코시스템
- 코어 모듈 + 하위 모듈
- 코어 하둡 모듈 : HDFS, YARN, MapReduce
- 하위 모듈 : Apache Hive, Impala, Pig, Zookeeper, Flume 등


### HDFS
- 다양한 구조적 및 비구조적 데이터 노드에 걸쳐 대량의 데이터 세트를 관리합니다. 그와 동시에 메타데이터를 로그 파일의 형태로 보관합니다. HDFS의 보조 구성 요소는 NameNode, DataNode가 존재함
- #### NameNode
  - 마스터 노드, 메타데이터를 저장
  - 주로 파일과 디렉터리로 구성
  - 파일 이름 지정, 종료, 열기 등 파일 시스템 명령 실행
- #### DataNode
  - 읽기 및 쓰기 함수 실행
  - 실제 데이터 또는 블록 저장
  - 마스터의 명령에 따라 복제본 생성, 삭제 및 복제 담당
### MapReduce
  - Map단계와 Reduce 단계로 구성
  - Map : 키/값 쌍으로 나뉘는 데이터 세트로 변환
  - Reduce : 중간 데이터 출력을 요약, 집계하여 최종 결과를 산출

<hr />
<br />

### Apache Hive
- 하둡에서 실행되는 데이터 웨어하우스 소프트웨어로서 사용자가 HiveQL이라는 SQL 유사 쿼리 언어를 사용해 HDFS 데이터를 다루도록 지원합니다.
### Apache Impala
- Apache Hadoop에 적합한 오픈 소스, 네이티브 분석 데이터베이스입니다.
### Apache Pig
- 보통 MapReduce를 통한 추상화로서 하둡과 함께 쓰여 데이터의 흐름에 따라 표시되는 대규모 데이터 세트를 분석하는 데 쓰이는 툴입니다. Pig은 조인, 필터링, 정렬, 로드 등의 작업을 지원합니다.
### Apache Zookeeper
- 고도로 안정적인 분산형 처리를 지원하는 중앙 집중형 서비스입니다.
### Apache Sqoop
- Apache Hadoop과 구조적 데이터스토어(예: 관계형 데이터베이스) 사이에서 벌크 데이터를 효율적으로 전송하도록 고안한 도구입니다.
### Apache Oozie
- Apache Hadoop 작업을 관리하기 위한 워크플로 스케줄러 시스템입니다. Oozie 워크플로 작업은 DAG(Directed Acyclical Graph) 작업입니다.  