package ssafy.eagerbeaver.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import ssafy.eagerbeaver.util.JwtUtil;

@Component
@Slf4j
public class ValidTokenInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object Handler) throws Exception {
        log.info("interceptor 호출");

        String jwt = jwtUtil.getJwtFromHeader(request);
        jwtUtil.validateJwt(jwt);
        return true;
    }
}
