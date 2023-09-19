package ssafy.eagerbeaver.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.eagerbeaver.dto.PropertyDto;

@Entity
@Table(name = "property")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Property {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "property_id", columnDefinition = "smallint")
	private short id;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "region_id", columnDefinition = "smallint")
	private Region region;

	@Column(name = "property_price", columnDefinition = "int")
	private int price;

	@Column(name = "property_period", columnDefinition = "char(6)")
	private String period;

	public Property(Region region, int price, String period) {
		this.region = region;
		this.price = price;
		this.period = period;
	}

	public PropertyDto convertToDto() {
		return PropertyDto.builder()
			.price(this.price)
			.period(this.period)
			.build();
	}
}
