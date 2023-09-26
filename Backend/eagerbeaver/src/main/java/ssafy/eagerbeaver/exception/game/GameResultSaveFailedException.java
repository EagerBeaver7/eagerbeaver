package ssafy.eagerbeaver.exception.game;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GameResultSaveFailedException extends RuntimeException {
	public GameResultSaveFailedException(String msg) {
		super(msg);
	}
}