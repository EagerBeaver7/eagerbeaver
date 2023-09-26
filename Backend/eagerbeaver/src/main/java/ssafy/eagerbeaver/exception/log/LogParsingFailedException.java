package ssafy.eagerbeaver.exception.log;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class LogParsingFailedException extends RuntimeException {
    public LogParsingFailedException(String msg) {
        super(msg);
    }
}
