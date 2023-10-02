package ssafy.eagerbeaver.service;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;

import ssafy.eagerbeaver.domain.GameLog;

public interface GameLogService {
	GameLog save(GameLog gameLog) throws JsonProcessingException;

	int count();

	Object getOne(String key) throws JsonProcessingException;

	List<GameLog> getList() throws JsonProcessingException;

	void delete();
}
