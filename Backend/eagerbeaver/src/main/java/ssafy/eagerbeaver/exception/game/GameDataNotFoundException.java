package ssafy.eagerbeaver.exception.game;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GameDataNotFoundException extends RuntimeException {
	public GameDataNotFoundException(String msg) {
		super(msg);
	}
}