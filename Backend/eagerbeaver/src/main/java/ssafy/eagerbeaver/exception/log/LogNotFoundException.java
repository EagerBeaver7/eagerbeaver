package ssafy.eagerbeaver.exception.log;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class LogNotFoundException extends RuntimeException {
    public LogNotFoundException(String msg) {
        super(msg);
    }
}
