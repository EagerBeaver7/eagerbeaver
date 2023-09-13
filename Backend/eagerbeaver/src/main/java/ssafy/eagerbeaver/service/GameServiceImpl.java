package ssafy.eagerbeaver.service;

import lombok.RequiredArgsConstructor;

import ssafy.eagerbeaver.domain.Region;
import ssafy.eagerbeaver.domain.Result;
import ssafy.eagerbeaver.domain.User;
import ssafy.eagerbeaver.dto.GameStartDto;
import ssafy.eagerbeaver.repository.RegionRepository;
import ssafy.eagerbeaver.repository.ResultRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{

    @Autowired
    private final ResultRepository resultRepository;

    @Autowired
    private final RegionRepository regionRepository;

    /**
     *
     * 게임 시작시
     * 27개 지역의 부동산 정보와 뉴스를 DTO List 형태로 제공한다.
     *
     */
    @Override
    public List<GameStartDto> gameStart() throws Exception {
        List<GameStartDto> GameStartDtoList = regionRepository.findAll()
            .stream()
            .map(Region::convertToGameStartDto)
            .toList();

        if(!GameStartDtoList.isEmpty()) {
            return GameStartDtoList;
        }
        throw new Exception();
    }

    /**
     * 게임 종료시
     * 해당 게임의 턴 정보와 수익률을 DB에 저장
     */
    @Override
    public void gameOver(User user, int turn, double rate) throws Exception {
        if(isRightTurn(turn)) {
            resultRepository.save(new Result(user, rate, turn));
        }
        throw new Exception();
    }

    /**
     * 턴이 10,15,20 중 하나인지 확인하는 메서드
     */
    public boolean isRightTurn(int curTurn) {
        int[] turnArr = new int[] {10, 15, 20};
        for(int turn : turnArr) {
            if (turn == curTurn) {
                return true;
            }
        }
        return false;
    }
}
