package ssafy.eagerbeaver.service;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import ssafy.eagerbeaver.domain.News;
import ssafy.eagerbeaver.domain.Property;
import ssafy.eagerbeaver.domain.QRegion;
import ssafy.eagerbeaver.domain.Region;
import ssafy.eagerbeaver.domain.Result;
import ssafy.eagerbeaver.domain.User;
import ssafy.eagerbeaver.dto.GameStartDto;
import ssafy.eagerbeaver.dto.NewsDto;
import ssafy.eagerbeaver.dto.PropertyDto;
import ssafy.eagerbeaver.repository.NewsRepository;
import ssafy.eagerbeaver.repository.PropertyRepository;
import ssafy.eagerbeaver.repository.RegionRepository;
import ssafy.eagerbeaver.repository.ResultRepository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final ResultRepository resultRepository;
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
        new BigDecimal(rate);
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
