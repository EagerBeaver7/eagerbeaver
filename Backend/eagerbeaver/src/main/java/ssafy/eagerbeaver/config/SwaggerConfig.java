package ssafy.eagerbeaver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;


// @Configuration
// @EnableSwagger2
// public class SwaggerConfig {
// 	@Bean
// 	public Docket api() {
// 		return new Docket(DocumentationType.SWAGGER_2)
// 			.select()
// 			.apis(RequestHandlerSelectors.basePackage("ssafy.eagerbeaver.controller")) // API 컨트롤러 패키지 설정
// 			.paths(PathSelectors.any())
// 			.build()
// 			.apiInfo(new ApiInfoBuilder().version("1.0").title("API Documentation").description("API Documentation").build());
// 	}
// }

@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI OpenAPI() {
		return new OpenAPI()
			.info(new Info().title("eagerbeaver")
				.description("eagerbeaver description")
				.version("v0.0.1")
				.license(new License().name("Apache 2.0").url("http://springdoc.org")))
			.externalDocs(new ExternalDocumentation()
				.description("SpringShop Wiki Documentation")
				.url("https://springshop.wiki.github.org/docs"));
	}
}