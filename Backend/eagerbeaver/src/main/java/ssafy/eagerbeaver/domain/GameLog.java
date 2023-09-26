package ssafy.eagerbeaver.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@RedisHash("gameLogs")
@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameLog {
	@Id
	private String id;
	private String region; //지역
	private int tradeNum; //구매 개수
	private int buyPrice; //구매 가격
	private int sellPrice; //판매 가격
	private double rate; //수익률
	private int turn; //현재 턴
}
