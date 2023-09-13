package ssafy.eagerbeaver.service;

import java.util.List;

import ssafy.eagerbeaver.dto.GameLogDto;

public interface GameLogService {
	void save (GameLogDto gameLogDto);
	List<GameLogDto> gameLog (short userId);
	void delete (short userId);
}
