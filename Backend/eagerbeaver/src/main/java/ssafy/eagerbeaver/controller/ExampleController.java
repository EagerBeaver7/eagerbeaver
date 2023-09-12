package ssafy.eagerbeaver.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Tag(name = "Sample Controller", description = "Sample API operations")
public class ExampleController {

	@GetMapping("/hello")
	@Operation(description = "Get a greeting message")
	public String getGreeting() {
		return "Hello, Swagger!";
	}
}
