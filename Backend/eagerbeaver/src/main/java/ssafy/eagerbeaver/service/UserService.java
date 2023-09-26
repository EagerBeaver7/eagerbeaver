package ssafy.eagerbeaver.service;

import java.util.Map;

public interface UserService {

<<<<<<< HEAD
    // kakao
    public String getKakaoAccessToken(String code);
    public String getKakaoMemberInfo(String token);
    public Map<String, Object> login(String email);

	boolean checkNickname(String nickname);
=======
	// kakao
	String getKakaoAccessToken(String code);
>>>>>>> 0da696d6cccc09d63f870e62ea48fbaf7f6c30ea

	String getKakaoMemberInfo(String token);

	Map<String, Object> login(String email);

	boolean checkNickname(String nickname);

	int setUserInfo(Short id, String nickname, int imgNum);

	User findUserById(short userId);
}