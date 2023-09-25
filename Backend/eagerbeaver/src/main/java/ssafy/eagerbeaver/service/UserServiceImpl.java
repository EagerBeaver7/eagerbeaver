package ssafy.eagerbeaver.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
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
import ssafy.eagerbeaver.exception.user.UserErrorCode;
import ssafy.eagerbeaver.exception.user.UserNotFoundException;
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
        
        //HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //HTTP Body 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoApiKey); //카카오에서 받은 REST API 키
        params.add("redirect_uri", kakaoRedirectUri); //카카오에 등록한 callback url
        params.add("code", code);

        //HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.exchange(
            KAKAO_TOKEN_URL,
            HttpMethod.POST,
            kakaoTokenRequest,
            Map.class
        );
        return Objects.requireNonNull(response.getBody()).get("access_token").toString();
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

        assert response != null;
        JsonElement element = JsonParser.parseString(response);
        JsonElement kakaoAccount = element.getAsJsonObject().get("kakao_account");
        return kakaoAccount.getAsJsonObject().get("email").getAsString();
    }

    @Override
    public Map<String, Object> login(String email) {
        User user = userRepository.findByEmail(email)
                .orElse(join(new User(email)));

        JwtUtil jwtUtil = new JwtUtil();
        Map<String, Object> userInfo = new HashMap<>();

        userInfo.put("user", user);
        userInfo.put("jwt", jwtUtil.generateJwt(email, user.getId()));
        userInfo.put("isNew", false);
        if(user.getNickname() == null || user.getProfileImg() == 0) {
            userInfo.put("isNew", true);
        }
        return userInfo;
    }

    @Override
    public boolean checkNickname(String nickname) {
        Optional<User> user = userRepository.findByNickname(nickname);
        return user.isPresent();
    }

    @Override
    public int setUserInfo(Short id, String nickname, int imgNum) {
        return userRepository.updateUserInfo(id, nickname, imgNum);
    }

    private User join(User user) {
        return userRepository.save(user);
    }

    private String generateRandomNickname() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(10);
        for (int i = 0; i < 10; i++) {
            sb.append(characters.charAt(random.nextInt(characters.length())));
        }
        return sb.toString();
    }

    public User findUserById(short userId) {
        return userRepository.findById(userId).orElseThrow(() ->
            new UserNotFoundException(UserErrorCode.USER_NOT_FOUND.getMsg()));
    }

}
