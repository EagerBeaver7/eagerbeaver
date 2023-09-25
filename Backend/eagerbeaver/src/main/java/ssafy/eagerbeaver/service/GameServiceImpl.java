package ssafy.eagerbeaver.service;

import lombok.RequiredArgsConstructor;

import ssafy.eagerbeaver.domain.News;
import ssafy.eagerbeaver.domain.Property;
import ssafy.eagerbeaver.domain.Region;
import ssafy.eagerbeaver.domain.Result;
import ssafy.eagerbeaver.domain.User;
import ssafy.eagerbeaver.dto.GameStartDto;
import ssafy.eagerbeaver.dto.NewsDto;
import ssafy.eagerbeaver.dto.PropertyDto;
import ssafy.eagerbeaver.exception.game.GameDataNotFoundException;
import ssafy.eagerbeaver.exception.game.GameErrorCode;
import ssafy.eagerbeaver.exception.game.GameResultSaveFailedException;
import ssafy.eagerbeaver.repository.RegionRepository;
import ssafy.eagerbeaver.repository.ResultRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private static final int START_DATE = 201003;
    private static final Map<Integer, Integer> lastDateMap = new HashMap<>() {{
        put(10,202103);
        put(15,201912);
        put(20, 201809);
    }};

    @Autowired
    private final ResultRepository resultRepository;

    @Autowired
    private final RegionRepository regionRepository;

    /**
     * 게임 시작시
     * 15개 지역의 부동산 정보와 뉴스를 DTO List 형태로 제공한다.
     */
    @Override
    public List<GameStartDto> gameStart(int turn) {
        List<Region> allRegions = regionRepository.findAll();

        Random random = new Random();
        List<Region> pickedRegionList = random.ints(0, allRegions.size())
            .distinct()
            .limit(15)
            .mapToObj(allRegions::get)
            .toList();

        //10턴인 경우 201003 - 202103
        //15턴인 경우 201003 - 201912
        //20턴인 경우 201003 - 201809
        int lastDate = lastDateMap.get(turn);
        int startDate = random.nextInt(START_DATE, lastDate);

        int fixedStartDate = startDate - (startDate % 100 % 3);
        if (!pickedRegionList.isEmpty()) {
            //뽑힌 지역 리스트로 특정 기간내의 뉴스, 매매 데이터만 가지고 GameStartDto 리스트 생성
            return pickedRegionList.stream()
                .map(region -> { //지역마다 순회하면서 실행
                    //NewsDto 리스트 생성
                    List<NewsDto> filteredNewsDtoList = region.getNewsList().stream()
                        .filter(news -> { //뉴스마다 순회하면서 기간을 벗어난 뉴스 필터링
                            int newsDate = Integer.parseInt(news.getPublishedDt().substring(0, 4));
                            return newsDate >= fixedStartDate && newsDate <= lastDate;
                        })
                        .map(News::convertToDto)
                        .toList();

                    //Property 리스트 생성
                    List<PropertyDto> filteredPropertiesDtoList = region.getPropertyList().stream()
                        .filter(property -> { //매매데이터마다 순회하면서 기간 벗어난 데이터 필터링
                            int propertyDate = Integer.parseInt(property.getPeriod());
                            return propertyDate >= fixedStartDate && propertyDate <= lastDate;
                        })
                        .map(Property::convertToDto)
                        .toList();

                    //GameStartDto 만들어서 반환
                    return GameStartDto.builder()
                        .city(region.getCity())
                        .region(region.getName())
                        .property(filteredPropertiesDtoList)
                        .news(filteredNewsDtoList)
                        .build();
                }).toList();
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
