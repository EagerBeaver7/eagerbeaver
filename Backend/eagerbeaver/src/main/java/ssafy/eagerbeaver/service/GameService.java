package ssafy.eagerbeaver.service;

import java.util.List;

import ssafy.eagerbeaver.domain.User;
import ssafy.eagerbeaver.dto.GameStartDto;

public interface GameService {

	List<GameStartDto> gameStart(int turn);

	void gameOver(User user, int turn, double rate);
}
