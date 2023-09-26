package ssafy.eagerbeaver.service;

import java.util.Map;

public interface UserService {

    // kakao
    public String getKakaoAccessToken(String code);
    public String getKakaoMemberInfo(String token);
    public Map<String, Object> login(String email);

	boolean checkNickname(String nickname);

	//    void modifyNickname(String nickname);
}
