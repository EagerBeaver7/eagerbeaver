package ssafy.eagerbeaver.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@RedisHash("logs")
@ToString
@Getter
@Setter
@NoArgsConstructor
public class GameLog {
	@Id
	private short id;
	@Indexed
	private short userId;
	private String cityName;
	private int price;
	private int num;
	private double rate;
	private int turn;

	@Builder
	public GameLog (short userId, String cityName, int price, int num, double rate, int turn){
		this.userId = userId;
		this.cityName = cityName;
		this.price = price;
		this.num = num;
		this.rate = rate;
		this.turn = turn;
	}
}
