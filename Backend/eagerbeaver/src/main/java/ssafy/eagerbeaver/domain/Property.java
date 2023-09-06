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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Entity
@Table(name = "property")
@Getter
@ToString
@AllArgsConstructor
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
}
