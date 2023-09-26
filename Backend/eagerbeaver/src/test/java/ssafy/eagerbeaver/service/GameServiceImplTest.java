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

				for (GameStartDto dto : gameStartDtoList) {
					assertEquals(turn, dto.getProperty().size());
				}
			}
		}
	}
	@Test
	public void gameOverTest_게임결과_저장() {
	}
}