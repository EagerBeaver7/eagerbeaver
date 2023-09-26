package ssafy.eagerbeaver.service;

import java.util.Map;

import ssafy.eagerbeaver.domain.User;

public interface UserService {

	// kakao
	String getKakaoAccessToken(String code);

	String getKakaoMemberInfo(String token);

	Map<String, Object> login(String email);

	boolean checkNickname(String nickname);

	int setUserInfo(Short id, String nickname, int imgNum);

	User findUserById(short userId);
}