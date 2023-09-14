package ssafy.eagerbeaver.service;

import java.util.List;

import ssafy.eagerbeaver.domain.GameLog;

public interface GameLogService {
	void save (GameLog gameLog);
	List<String> gameLog (short userId);
	void delete (short userId);
}
