package ssafy.eagerbeaver.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.transaction.Transactional;
import ssafy.eagerbeaver.domain.News;
import ssafy.eagerbeaver.domain.NewsCategory;
import ssafy.eagerbeaver.domain.Property;
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

@SpringBootTest
@Transactional
class GameServiceImplTest {
	@Autowired
	private GameService gameService;
	@Autowired
	private EntityManager entityManager;
	@Autowired
	RegionRepository regionRepository;
	@Autowired
	NewsRepository newsRepository;
	@Autowired
	PropertyRepository propertyRepository;

	@Test
	public void gameStartTest_지역_뉴스_시세_조회() throws Exception {
		String[] data = new String[]{"201403","201406","201409","201412"};

		//given
		for(int i=0; i<27; i++) {
			Region region = new Region("도시" + (i+1), "서울");
			Region savedRegion = regionRepository.save(region);

			for(int j=0; j<100; j++) {
				News news = new News(savedRegion, "제목", "요약", data[j % 4], NewsCategory.ETC);
				Property property = new Property(savedRegion, 1000 * j, data[j % 4]);

				newsRepository.save(news);
				propertyRepository.save(property);
			}
		}
		entityManager.flush();
		entityManager.clear();

		//when
		List<GameStartDto> gameStartDtoList = gameService.gameStart();

		//then
		assertEquals(27, gameStartDtoList.size());

		for(GameStartDto dto : gameStartDtoList) {
			assertEquals(100, dto.getNews().size());
			assertEquals(100, dto.getProperty().size());
		}
	}
	
	@Test
	public void gameOverTest_게임결과_저장() {

	}
}