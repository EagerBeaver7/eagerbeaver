package ssafy.eagerbeaver.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import ssafy.eagerbeaver.domain.GameLog;
import ssafy.eagerbeaver.exception.log.LogErrorCode;
import ssafy.eagerbeaver.exception.log.LogNotFoundException;
import ssafy.eagerbeaver.exception.log.LogParsingFailedException;
import ssafy.eagerbeaver.util.UserContextHolder;

@Service
@RequiredArgsConstructor
public class GameLogServiceImpl implements GameLogService {

	private final RedisTemplate<String, Object> redisTemplate;
	private final ObjectMapper objectMapper;

	private static String makeKey() {
		Short userId = UserContextHolder.userIdHolder.get();
		String uuid = UUID.randomUUID().toString();
		return userId + uuid;
	}

	@Override
	public GameLog save(GameLog gameLog) {
		gameLog.setId(makeKey());
		try {
			String gameLogJson = objectMapper.writeValueAsString(gameLog);
			redisTemplate.opsForValue().set(gameLog.getId(), gameLogJson);
			return gameLog;

		} catch (Exception e) {
			new Exception(e.getMessage());
		}
		return null;
	}

	@Override
	public int count() {
		String userId = UserContextHolder.userIdHolder.get().toString();
		Set<String> matchingKeys = redisTemplate.keys(userId + "*");
		return Objects.requireNonNull(matchingKeys).size();
	}

	@Override
	public Object getOne(String key) throws JsonProcessingException {
		String retrievedGameLogJson = (String)redisTemplate.opsForValue().get(key);
		return objectMapper.readValue(retrievedGameLogJson, GameLog.class);
	}

	@Override
	public List<GameLog> getList() {
		String userId = UserContextHolder.userIdHolder.get().toString();
		Set<String> matchingKeys = redisTemplate.keys(userId + "*");

		List<GameLog> gameLogList = new ArrayList<>();
		for (String key : Objects.requireNonNull(matchingKeys)) {
			String retrievedGameLogJson = (String)redisTemplate.opsForValue().get(key);
			try {
				GameLog gameLog = objectMapper.readValue(retrievedGameLogJson, GameLog.class);
				gameLogList.add(gameLog);
			} catch (Exception e) {
				throw new LogParsingFailedException(LogErrorCode.LOG_PARSING_FAILED.getMsg());
			}
		}
		if (!gameLogList.isEmpty()) {
			return gameLogList;
		}
		throw new LogNotFoundException(LogErrorCode.LOG_NOT_FOUND.getMsg());
	}

	@Override
	public void delete() {
		String userId = UserContextHolder.userIdHolder.get().toString();
		Set<String> matchingKeys = redisTemplate.keys(userId + "*");

		for (String key : Objects.requireNonNull(matchingKeys)) {
			redisTemplate.delete(key);
		}
	}
}
