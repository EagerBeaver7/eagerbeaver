package ssafy.eagerbeaver.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.stereotype.Repository;

import ssafy.eagerbeaver.domain.GameLog;

@Repository
public class GameLogRepository {
	private final RedisTemplate<String, Object> redisTemplate;

	public GameLogRepository(
		RedisTemplate<String, Object> redisTemplate) {
		this.redisTemplate = redisTemplate;
	}

	public void save(GameLog gameLog){
		redisTemplate.opsForValue().set(String.valueOf(gameLog.getId()), gameLog);
	}

	public List<String> getAll (short userId){
		ScanOptions options = ScanOptions.scanOptions().match(String.valueOf(userId)).build();
		Cursor<String> cursor = redisTemplate.opsForList().getOperations()
			.scan(options);

		List<String> logs = new ArrayList<>();

		while (cursor.hasNext()) {
			String key = cursor.next();
			logs.add(key);
		}

		return logs;
	}

	public void delete(short userId){
		redisTemplate.delete(String.valueOf(userId));
	}
}
