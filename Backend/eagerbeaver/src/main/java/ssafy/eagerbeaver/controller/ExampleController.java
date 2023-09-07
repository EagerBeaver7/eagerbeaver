package ssafy.eagerbeaver.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = "Sample Controller", description = "Sample API operations")
public class ExampleController {

	@GetMapping("/hello")
	@ApiOperation("Get a greeting message")
	public String getGreeting() {
		return "Hello, Swagger!";
	}
}
