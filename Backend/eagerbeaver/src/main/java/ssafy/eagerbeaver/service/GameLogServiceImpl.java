package ssafy.eagerbeaver.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ssafy.eagerbeaver.dto.GameLogDto;
import ssafy.eagerbeaver.repository.GameLogRepository;

@Service
@RequiredArgsConstructor
public class GameLogServiceImpl implements GameLogService {
	private final GameLogRepository gameLogRepository;

	@Override
	public void save(GameLogDto gameLogDto) {
		return gameLogRepository.save(g
	}

	@Override
	public List<GameLogDto> gameLog(short userId) {
		return null;
	}

	@Override
	public void delete(short userId) {

	}
}
