package ssafy.eagerbeaver.domain;

import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.eagerbeaver.dto.RankDto;

@Entity
@Table(name = "result")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Result {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "result_id", columnDefinition = "smallint")
	private short id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", columnDefinition = "smallint")
	private User user;

	@Column(name = "result_rate", columnDefinition = "decimal(10,2)")
	private double rate;

	@Column(name = "result_turn", columnDefinition = "char(2)")
	private int turn;

	@CreatedDate
	@Column(name = "result_dt", columnDefinition = "datetime")
	private LocalDate date;

	public Result(User user, double rate, int turn) {
		this.user = user;
		this.rate = rate;
		this.turn = turn;
	}

	public RankDto convertToRankDto() {
		return RankDto.builder()
			.userName(user.getNickname())
			.rate(this.rate)
			.build();
	}
}
