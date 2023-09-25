package ssafy.eagerbeaver.service;

import ssafy.eagerbeaver.domain.User;
import ssafy.eagerbeaver.dto.GameStartDto;

import java.util.List;

public interface GameService {

    List<GameStartDto> gameStart(int turn);

    void gameOver(User user, int turn, double rate);
}
