package ssafy.eagerbeaver.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Entity
@Table(name = "result")
@Getter
@ToString
@AllArgsConstructor
public class Result {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "result_id", columnDefinition = "smallint")
	private short id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", columnDefinition = "smallint")
	private User user;

	@Column(name = "result_rate", columnDefinition = "decimal(10,2)")
	private BigDecimal rate;

	@Column(name = "result_turn", columnDefinition = "char(2)")
	private String turn;

	@Column(name = "result_dt", columnDefinition = "datetime")
	private LocalDate date;
}
