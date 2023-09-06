package ssafy.eagerbeaver.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "region")
@Getter
@ToString
@AllArgsConstructor
public class Region {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "region_id", columnDefinition = "smallint")
	private short id;

	@Column(name = "region_name", columnDefinition = "varchar(20)")
	private String name;

	@OneToMany(mappedBy = "region")
	private List<News> newsList;

	@OneToMany(mappedBy = "region")
	private List<Property> propertyList;

	public Region(String name) {
		this.name = name;
	}
}
