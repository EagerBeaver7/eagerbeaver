package ssafy.eagerbeaver.exception.game;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GameResultArgumentException extends RuntimeException {

    public GameResultArgumentException(String msg) {
        super(msg);
    }
}
