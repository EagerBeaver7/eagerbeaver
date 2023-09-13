package ssafy.eagerbeaver.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

		@Value("${spring.redis.host}")
		private String redisHost;

		@Value("${spring.redis.port}")
		private int redisPort;

		@Value("${spring.redis.password}")
		private String redisPassword;

		@Bean
		public RedisConnectionFactory redisConnectionFactory() {
			RedisStandaloneConfiguration redisConfiguration = new RedisStandaloneConfiguration();
			redisConfiguration.setHostName(redisHost);
			redisConfiguration.setPort(redisPort);
			redisConfiguration.setPassword(redisPassword);
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

