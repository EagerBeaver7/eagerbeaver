package ssafy.eagerbeaver.aop;

import lombok.extern.slf4j.Slf4j;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LogAspect {

	@Pointcut("execution(* ssafy.eagerbeaver.controller.*.*(..)) || " +
			"execution(* ssafy.eagerbeaver.service.*.*(..)) || " +
			"execution(* ssafy.eagerbeaver.repository.*.*(..))")
	public void pointcut() {}

	@Before("pointcut()")
	public void logBefore(JoinPoint joinPoint) {
		Object[] args = joinPoint.getArgs();
		String methodName = joinPoint.getSignature().toShortString();
		log.info("\n[Before Log] {} args={}", methodName, args);
	}

	@After("pointcut()")
	public void logAfter(JoinPoint joinPoint) {
		String methodName = joinPoint.toLongString();
		log.info("\n[After Log] {}", methodName);
	}

	@AfterThrowing(pointcut = "pointcut()", throwing = "exception")
	public void logAfterThrowing(JoinPoint joinPoint, Exception exception) {
		String methodName = joinPoint.getSignature().toShortString();
		log.error("\n[Exception log] {} exception={}", methodName, exception.getMessage());
	}
}
