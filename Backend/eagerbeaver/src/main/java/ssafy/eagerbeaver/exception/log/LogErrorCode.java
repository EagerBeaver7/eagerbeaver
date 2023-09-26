package ssafy.eagerbeaver.exception.log;

import lombok.Getter;

@Getter
public enum LogErrorCode {

    LOG_NOT_FOUND("LOG_NOT_FOUND", "게임 로그를 찾을 수 없습니다."),
    LOG_PARSING_FAILED("LOG_PARSING_FAILED", "게임 로그 데이터 파싱을 실패했습니다.");

    private final String code;
    private final String msg;

    LogErrorCode(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}