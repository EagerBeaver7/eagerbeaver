package ssafy.eagerbeaver.interceptor;

import java.util.Objects;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import ssafy.eagerbeaver.util.JwtUtil;
import ssafy.eagerbeaver.util.UserContextHolder;

@Component
@Slf4j
public class ValidTokenInterceptor implements HandlerInterceptor {

	private JwtUtil jwtUtil = new JwtUtil();

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object Handler) throws Exception {
		log.info("interceptor 호출");

		if (isPreflightRequest(request)) {
			return true;
		}

		String jwt = jwtUtil.getJwtFromHeader(request);
		jwtUtil.validateToken(jwt);
		// short id = jwtUtil.getIdFromJwt(jwt);
		UserContextHolder.userIdHolder.set(jwtUtil.getIdFromJwt(jwt));
		return true;
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
		UserContextHolder.userIdHolder.remove();
	}

	private boolean isPreflightRequest(HttpServletRequest request) {
		return isOptions(request) && hasHeaders(request) && hasMethod(request) && hasOrigin(request);
	}

	private boolean isOptions(HttpServletRequest request) {
		return request.getMethod().equalsIgnoreCase(HttpMethod.OPTIONS.toString());
	}

	private boolean hasHeaders(HttpServletRequest request) {
		return Objects.nonNull(request.getHeader("Access-Control-Request-Headers"));
	}

	private boolean hasMethod(HttpServletRequest request) {
		return Objects.nonNull(request.getHeader("Access-Control-Request-Method"));
	}

	private boolean hasOrigin(HttpServletRequest request) {
		return Objects.nonNull(request.getHeader("Origin"));
	}

}
