package ssafy.eagerbeaver.service;

import lombok.RequiredArgsConstructor;

import ssafy.eagerbeaver.domain.Region;
import ssafy.eagerbeaver.domain.Result;
import ssafy.eagerbeaver.domain.User;
import ssafy.eagerbeaver.dto.GameStartDto;
import ssafy.eagerbeaver.exception.game.GameDataNotFoundException;
import ssafy.eagerbeaver.exception.game.GameErrorCode;
import ssafy.eagerbeaver.exception.game.GameResultSaveFailedException;
import ssafy.eagerbeaver.repository.RegionRepository;
import ssafy.eagerbeaver.repository.ResultRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    @Autowired
    private final ResultRepository resultRepository;

    @Autowired
    private final RegionRepository regionRepository;

    /**
     * 게임 시작시
     * 27개 지역의 부동산 정보와 뉴스를 DTO List 형태로 제공한다.
     */
    @Override
    public List<GameStartDto> gameStart() {
        List<GameStartDto> GameStartDtoList = regionRepository.findAll()
                .stream()
                .map(Region::convertToGameStartDto)
                .toList();

        if (!GameStartDtoList.isEmpty()) {
            return GameStartDtoList;
        }
        throw new GameDataNotFoundException(GameErrorCode.GAME_DATA_NOT_FOUND.getMessage());
    }

    /**
     * 게임 종료시
     * 해당 게임의 턴 정보와 수익률을 DB에 저장
     */
    @Override
    public void gameOver(User user, int turn, double rate) {
        try {
            resultRepository.save(new Result(user, rate, turn));
        } catch (Exception e) {
            throw new GameResultSaveFailedException(GameErrorCode.GAME_RESULT_SAVE_FAILED.getMessage());
        }
    }
}
