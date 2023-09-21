package ssafy.eagerbeaver.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import ssafy.eagerbeaver.domain.User;
import ssafy.eagerbeaver.repository.UserRepository;
import ssafy.eagerbeaver.util.JwtUtil;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final String KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";

    private final String KAKAO_USERINFO_URL = "https://kapi.kakao.com/v2/user/me";

    @Value("${kakao.rest-api-key}")
    private String kakaoApiKey;

    @Value("${kakao.redirect-uri}")
    private String kakaoRedirectUri;

    private final UserRepository userRepository;

    @Override
    public String getKakaoAccessToken(String code) {
        System.out.println("kakaoApiKey:" + kakaoApiKey);
        System.out.println("kakaoRedirectUri: " + kakaoRedirectUri);

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoApiKey);
        params.add("redirect_uri", kakaoRedirectUri);
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
            KAKAO_TOKEN_URL,
            HttpMethod.POST,
            kakaoTokenRequest,
            Map.class
        );

        String accessToken = (String) response.getBody().get("access_token");
        return accessToken;
    }

    @Override
    public String getKakaoMemberInfo(String token) {
        WebClient webClient = WebClient.create(KAKAO_USERINFO_URL);
        String response = webClient.get()
            .uri(KAKAO_USERINFO_URL)
            .header("Authorization", "Bearer " + token)
            .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
            .retrieve()
            .bodyToMono(String.class)
            .block();

        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(response);

        JsonElement kakaoAccount = element.getAsJsonObject().get("kakao_account");
        String email = kakaoAccount.getAsJsonObject().get("email").getAsString();

        return email;
    }

    @Override
    public Map<String, Object> login(String email) {
        Map<String, Object> userInfo = new HashMap<>();
        JwtUtil jwtUtil = new JwtUtil();

        Optional<User> user = userRepository.findByEmail(email);
        System.out.println(user.toString());
        if (!user.isPresent()) {
            User newUser = new User(email, generateRandomNickname());
            userInfo.put("user", join(newUser));
            userInfo.put("isNew", true);
        } else {
            userInfo.put("user", user);
            userInfo.put("isNew", false);
        }
        userInfo.put("jwt", jwtUtil.generateJwt(email));

        return userInfo;
    }

    private User join(User user) {
        return userRepository.save(user);
    }

    private String generateRandomNickname() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(16);
        for (int i = 0; i < 16; i++) {
            sb.append(characters.charAt(random.nextInt(characters.length())));
        }
        return sb.toString();
    }
}
