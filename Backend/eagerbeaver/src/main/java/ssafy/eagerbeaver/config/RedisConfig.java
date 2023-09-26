package ssafy.eagerbeaver.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
<<<<<<< HEAD
import org.springframework.data.redis.serializer.GenericToStringSerializer;
=======
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
>>>>>>> 0da696d6cccc09d63f870e62ea48fbaf7f6c30ea
import org.springframework.data.redis.serializer.StringRedisSerializer;

import ssafy.eagerbeaver.domain.GameLog;

@Configuration
public class RedisConfig {

	@Value("${spring.redis.host}")
	private String redisHost;

	@Value("${spring.redis.port}")
	private int redisPort;

	@Bean
	public RedisConnectionFactory redisConnectionFactory() {
		return new LettuceConnectionFactory(redisHost, redisPort);
	}

<<<<<<< HEAD
		@Bean
		public RedisConnectionFactory redisConnectionFactory() {
			RedisStandaloneConfiguration redisConfiguration = new RedisStandaloneConfiguration();
			redisConfiguration.setHostName(host);
			redisConfiguration.setPort(port);
			redisConfiguration.setPassword(password);
			LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory(redisConfiguration);
			return lettuceConnectionFactory;
		}

		@Bean
		public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
			RedisTemplate<String, Object> template = new RedisTemplate<>();
			template.setConnectionFactory(redisConnectionFactory);
			template.setKeySerializer(new StringRedisSerializer());
			template.setValueSerializer(new StringRedisSerializer());
			template.setHashKeySerializer(new StringRedisSerializer());
			template.setHashValueSerializer(new StringRedisSerializer());
			template.setEnableDefaultSerializer(false);
			template.setEnableTransactionSupport(true);

			return template;
		}

}

=======
	@Bean
	public RedisTemplate<String, Object> redisTemplate() {
		RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
		redisTemplate.setConnectionFactory(redisConnectionFactory());
		redisTemplate.setKeySerializer(new StringRedisSerializer());
		redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(Object.class));
		return redisTemplate;
	}
}
>>>>>>> 0da696d6cccc09d63f870e62ea48fbaf7f6c30ea
