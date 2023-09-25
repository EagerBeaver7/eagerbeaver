package ssafy.eagerbeaver.exception.user;

import lombok.Getter;

@Getter
public enum UserErrorCode {

    USER_NOT_FOUND("USER_NOT_FOUND", "유저 정보를 찾지 못했습니다.");

    private final String code;
    private final String message;

    UserErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}