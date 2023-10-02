package ssafy.eagerbeaver.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.fasterxml.jackson.core.JsonProcessingException;

import jakarta.transaction.Transactional;
import ssafy.eagerbeaver.domain.GameLog;
import ssafy.eagerbeaver.util.UserContextHolder;

@SpringBootTest
@Transactional
class GameLogServiceImplTest {

	@Autowired
	private GameLogService gameLogService;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.openMocks(this);
		UserContextHolder.userIdHolder.set((short) 1004);
	}

	@Test
	public void save() throws JsonProcessingException {
		int maxCount = 1000;
		for(int i=0; i<maxCount; i++) {
			GameLog gameLog = new GameLog();
			gameLog.setRegion("New York");
			gameLog.setTradeNum(i);
			gameLog.setBuyPrice(i * 100);
			gameLog.setSellPrice(-1);
			gameLog.setTurn(10);

			GameLog savedLog = gameLogService.save(gameLog);
		}
		List<GameLog> gameLogList = gameLogService.getList();
		for (GameLog gameLog : gameLogList) {
			System.out.println(gameLog.toString());
		}

		assertEquals(maxCount, gameLogList.size());
		gameLogService.delete();
		assertEquals(0, gameLogService.count());
	}
}