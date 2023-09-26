package ssafy.eagerbeaver.exception.user;

import lombok.Getter;

@Getter
public enum UserErrorCode {

	USER_NOT_FOUND("USER_NOT_FOUND", "유저를 찾을 수 없습니다.");

	private final String code;
	private final String msg;

	UserErrorCode(String code, String msg) {
		this.code = code;
		this.msg = msg;
	}
}