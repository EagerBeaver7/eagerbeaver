package ssafy.eagerbeaver.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ssafy.eagerbeaver.domain.GameLog;
import ssafy.eagerbeaver.repository.GameLogRepository;

@Service
@RequiredArgsConstructor
public class GameLogServiceImpl implements GameLogService {
	private final GameLogRepository gameLogRepository;

	@Override
	public void save(GameLog gameLog) {
		gameLogRepository.save(gameLog);
	}

	@Override
	public List<String> gameLog(short userId) {
		return gameLogRepository.getAll(userId);
	}

	@Override
	public void delete(short userId) {
		gameLogRepository.delete(userId);
	}
}
