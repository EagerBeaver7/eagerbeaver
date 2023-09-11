package ssafy.eagerbeaver.service;

import ssafy.eagerbeaver.domain.User;
import ssafy.eagerbeaver.dto.GameStartDto;

import java.util.List;

public interface GameService {

    List<GameStartDto> gameStart() throws Exception;
    void gameOver(User user, int turn, double rate) throws Exception;
}
