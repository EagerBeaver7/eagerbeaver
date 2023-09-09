package ssafy.eagerbeaver.service;

import ssafy.eagerbeaver.dto.GameStartDto;

import java.util.List;

public interface GameService {

    List<GameStartDto> gameStart() throws Exception;
    void gameOver() throws Exception;
}
