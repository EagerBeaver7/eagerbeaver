package ssafy.eagerbeaver.service;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.eagerbeaver.domain.Region;
import ssafy.eagerbeaver.dto.GameStartDto;
import ssafy.eagerbeaver.repository.NewsRepository;
import ssafy.eagerbeaver.repository.PropertyRepository;
import ssafy.eagerbeaver.repository.RegionRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final RegionRepository regionRepository;
    private final NewsRepository newsRepository;
    private final PropertyRepository propertyRepository;

    private final EntityManager entityManager;

    /**
     *
     * 게임 시작시
     * 임의의 지역 30군데를 선택하고
     * 해당 지역의 부동산 정보와 뉴스를 DTO List 형태로 제공한다.
     *
     */
    @Override
    public List<GameStartDto> gameStart() throws Exception {
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        QRegion qRegion = QRegion.region;

        OrderSpecifier<Double> randomOrder =
                com.querydsl.core.types.Expressions.numberTemplate(Double.class, "RAND()").asc();

        List<Region> regionList = jpaQueryFactory
                .selectFrom(qRegion)
                .orderBy(randomOrder) // 무작위로 정렬
                .limit(30)
                .fetch();

        //=============GameStartDto로 변환하는 코드=====================

        return null;
    }


    @Override
    public void gameOver() throws Exception {

    }
}
