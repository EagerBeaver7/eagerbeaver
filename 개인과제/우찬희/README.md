# Springboot

(cf. Spring Boot 프로젝트에서 Maven 또는 Gradle과 같은 빌드 도구를 사용하여 빌드를 실행하면, 기본적으로 실행 가능한 JAR 파일이 생성됩니다. 이 JAR 파일은 내장된 Tomcat, Jetty 등의 웹 서버와 함께 제공되므로, 별도의 외부 웹 서버 없이도 Spring Boot 애플리케이션을 실행할 수 있습니다.)

1. jar 파일 생성
    1. 방법1
        1. Gradle > Tasks > build > bootJar
        2. 프로젝트 폴더 > build > libs 에 jar 파일 생성된 것 확인
    2. 방법2
        1. ./gradlew build 명령어로 build 후 .jar 파일 생성 
            
            (cf. chmod +x gradlew 명령어는 권한 주기)
            
        2. 
2. Dockerfile 파일 생성
    1. jar 파일이 있는 곳에 **Dockerfile** 생성
        
        ```docker
        FROM openjdk:11
        ARG JAR_FILE=*.jar
        COPY ${JAR_FILE} app.jar
        ENTRYPOINT ["java","-jar","/app.jar"]
        ```