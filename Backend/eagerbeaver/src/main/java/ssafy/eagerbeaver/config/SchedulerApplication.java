package ssafy.eagerbeaver.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class SchedulerApplication {
	// 하루마다 용어 바꿔줘야하니 JPA 스케쥴러 사용!

	public static void main(String[] args){
		SpringApplication.run(SchedulerApplication.class, args);
	}
}
