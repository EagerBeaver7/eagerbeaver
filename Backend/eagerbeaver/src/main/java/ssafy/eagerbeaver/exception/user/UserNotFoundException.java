package ssafy.eagerbeaver.exception.user;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        super();
    }

    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserNotFoundException(Throwable cause) {
        super(cause);
    }

    /**
     *
     * @param message 에러 메세지
     * @param cause 해당 예외를 발생시킨 예외 (예외 체인 가능)
     * @param enableSuppression 예외 무시 여부 (true 설정시 예외 무시 가능)
     * @param writableStackTrace 스택 트레이스 정보 생성 여부 (예외 발생 위치, 호출 스택 정보)
     */
    public UserNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
