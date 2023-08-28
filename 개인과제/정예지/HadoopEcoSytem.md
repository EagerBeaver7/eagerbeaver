# hadoop ecoSystem

## 빅데이터 처리 과정

[https://wikidocs.net/80747](https://wikidocs.net/80747)

[https://pearlluck.tistory.com/384](https://pearlluck.tistory.com/384)

### 수집 → 저장 → 처리 → 분석 → 시각화

1. 수집 기술
    1. 웹 데이터
        - Java
            - WebCrawler - 셀레니움, beautifulsoup
    2. 텍스트 데이터
        - OpenAPI

1. 저장
    - 정형/비정형/반정형 데이터에 따라 적절한 방법으로 빅데이터시스템에 저장하는 단계
    - NoSQL, HDFS, 클라우드스토리지
2. 처리
    - 필요없는 데이터, 깨진 데이터 정리
    - 원하는 부분만 추출, 데이터 재배치(for 분석)
    - 맵리듀스, 프로세

# Hadoop

[https://spidyweb.tistory.com/239](https://spidyweb.tistory.com/239)

![Untitled](hadoop%20ecoSystem%200e0c959554614f16b5769b6f8ff74144/Untitled.png)

## 하둡의 코어 프로젝트

1. 데이터 저장의 분산 파일 시스템: HDFS
2. 데이터 처리의 분산 데이터 처리: MapReduce
3. 자원 관리: YARN

**그러나, 이들의 역할을 수행해내는 다양한 서브 프로젝트가 있다. (대체 가능)**

1. HDFS
    - Amazon S3(클라우드)
        - 버킷을 만들고 객체를 저장하는 스토리지
    - cassandra, NoSQL
        - 분산 데이터베이스
2. MapReduce (from 디스크)
    - Spark (from 메모리)
        - Presto 인 메모리 형의 고속 데이터 처리
        - 실시간 처리 가능
        - 그러나, 메모리 용량보다 큰 데이터를 처리할 때는 부적합
        - 반복 작업이 많을 수록 적합
        
        **하둡의 YARN 위에 스파크를 얹고, 실시간성이 필요한 데이터는 스카프로 처리하는 방식이 요즘 흐름**
        
