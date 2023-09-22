package ssafy.eagerbeaver.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
}
