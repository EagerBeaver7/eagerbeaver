package ssafy.eagerbeaver.service;

import java.util.List;

import ssafy.eagerbeaver.domain.User;
import ssafy.eagerbeaver.dto.GameStartDto;

public interface GameService {

<<<<<<< HEAD
    List<GameStartDto> gameStart() throws Exception;

    void gameOver(User user, int turn, double rate) throws Exception;
=======
	List<GameStartDto> gameStart(int turn);

	void gameOver(User user, int turn, double rate);
>>>>>>> 0da696d6cccc09d63f870e62ea48fbaf7f6c30ea
}
