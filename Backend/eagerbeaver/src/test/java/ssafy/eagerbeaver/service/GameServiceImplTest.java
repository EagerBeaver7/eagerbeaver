package ssafy.eagerbeaver.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import ssafy.eagerbeaver.dto.GameStartDto;
import ssafy.eagerbeaver.repository.NewsRepository;
import ssafy.eagerbeaver.repository.PropertyRepository;
import ssafy.eagerbeaver.repository.RegionRepository;

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
	public void gameStartTest() {
		for(int i=0; i<100; i++) {
			for (int turn = 10; turn <= 20; turn += 5) {
				List<GameStartDto> gameStartDtoList = gameService.gameStart(turn);
				assertEquals(15, gameStartDtoList.size());

<<<<<<< HEAD
		//given
		for(int i=0; i<27; i++) {
			Region region = new Region("도시" + (i+1), "서울");
			Region savedRegion = regionRepository.save(region);

			for(int j=0; j<100; j++) {
				News news = new News(savedRegion, "제목", "요약", data[j % 4], NewsCategory.ETC);
				Property property = new Property(savedRegion, 1000 * j, data[j % 4]);

				newsRepository.save(news);
				propertyRepository.save(property);
=======
				for (GameStartDto dto : gameStartDtoList) {
					assertEquals(turn, dto.getProperty().size());
				}
>>>>>>> 0da696d6cccc09d63f870e62ea48fbaf7f6c30ea
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