package ssafy.eagerbeaver.aop;

import lombok.extern.slf4j.Slf4j;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

@Slf4j
@Aspect
public class LogAspect {

	@Before("@annotation(Log)")
	public void logBefore(JoinPoint joinPoint) {
		Object[] args = joinPoint.getArgs();
		String methodName = joinPoint.getSignature().toShortString();
		log.info("[Before Log] {} args={}", methodName, args);
	}

	@After("@annotation(Log)")
	public void logAfter(JoinPoint joinPoint) {
		String methodName = joinPoint.toLongString();
		log.info("[After Log] {}", methodName);
	}

	@AfterThrowing(pointcut = "@annotation(Log)", throwing = "exception")
	public void logAfterThrowing(JoinPoint joinPoint, Exception exception) {
		String methodName = joinPoint.getSignature().toShortString();
		log.error("[Exception log] {} exception={}", methodName, exception.getMessage());
	}
}
