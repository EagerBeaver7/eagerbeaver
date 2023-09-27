package ssafy.eagerbeaver.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import ssafy.eagerbeaver.interceptor.ValidTokenInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new ValidTokenInterceptor())
			.addPathPatterns("/**")
			.excludePathPatterns("/auth/**", "/nickname/**", "/word");
		//            .excludePathPatterns("/swagger-resources/**", "/swagger-ui/**", "/v3/api-docs", "/swagger-ui/index.html") // swagger 사용 미정
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOriginPatterns("*")
			.allowedMethods("GET", "POST", "PUT", "DELETE")
			.allowedHeaders("*")
			.allowCredentials(true)
			.maxAge(3600);
	}
}
