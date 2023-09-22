package ssafy.eagerbeaver.service;

import java.util.Map;

import ssafy.eagerbeaver.domain.User;

public interface UserService {

    // kakao
    public String getKakaoAccessToken(String code);
    public String getKakaoMemberInfo(String token);
    public Map<String, Object> login(String email);
	boolean checkNickname(String nickname);
	boolean setNickname(Short id, String nickname);

	//    void modifyNickname(String nickname);
}
