package ssafy.eagerbeaver.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import ssafy.eagerbeaver.domain.Result;
import ssafy.eagerbeaver.domain.User;
import ssafy.eagerbeaver.repository.ResultRepository;

@SpringBootTest
@Transactional
class RankServiceImplTest {

	@Autowired
	private RankService rankService;

	@Autowired
	private EntityManager entityManager;

	@Autowired
	private ResultRepository resultRepository;


	@Test
	public void findTop10ByTurn() {
		//given
		User user = new User("th@naver.com", "태희", "nothing.jpg");
		entityManager.persist(user);

		for(int i=0; i<100; i++) {
			for (int j = 10; j <= 20; j += 5) {
				Result result = new Result(user, i, j);
				entityManager.persist(result);
			}
		}

		//when
		List<Result> list10 = resultRepository.findTop10ByTurnOrderByRateDesc(10);
		List<Result> list15 = resultRepository.findTop10ByTurnOrderByRateDesc(15);
		List<Result> list20 = resultRepository.findTop10ByTurnOrderByRateDesc(20);

		//then
		assertEquals(10, list10.size());
		assertEquals(10, list10.get(0).getTurn());
		assertEquals(99.0, list10.get(0).getRate());

		assertEquals(10, list15.size());
		assertEquals(15, list15.get(0).getTurn());
		assertEquals(98.0, list15.get(1).getRate());

		assertEquals(10, list20.size());
		assertEquals(20, list20.get(0).getTurn());
		assertEquals(97.0, list20.get(2).getRate());
	}
}