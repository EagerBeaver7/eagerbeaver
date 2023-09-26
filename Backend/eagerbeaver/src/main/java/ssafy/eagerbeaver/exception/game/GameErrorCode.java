package ssafy.eagerbeaver.exception.game;

import lombok.Getter;

@Getter
public enum GameErrorCode {

	GAME_DATA_NOT_FOUND("GAME_DATA_NOT_LOADED", "게임 데이터를 불러오는데 실패했습니다."),
    GAME_RESULT_ARGUMENT_ERROR("GAME_RESULT_ARGUMENT_ERROR", "게임 결과 데이터가 올바르지 않습니다."),
    GAME_RESULT_SAVE_FAILED("GAME_RESULT_SAVE_FAILED", "게임 결과 저장에 실패했습니다.");

	private final String code;
	private final String message;

	GameErrorCode(String code, String message) {
		this.code = code;
		this.message = message;
	}
}