package ssafy.eagerbeaver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class EagerBeaverApplication {

	public static void main(String[] args) {
		SpringApplication.run(EagerBeaverApplication.class, args);
	}

}
