package ssafy.eagerbeaver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import ssafy.eagerbeaver.util.JwtUtil;

@SpringBootApplication
@EnableJpaAuditing
@EnableAspectJAutoProxy
public class EagerBeaverApplication {
	public static void main(String[] args) {
		SpringApplication.run(EagerBeaverApplication.class, args);
	}

}
