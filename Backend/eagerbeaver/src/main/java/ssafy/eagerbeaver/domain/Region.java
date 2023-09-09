package ssafy.eagerbeaver.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
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

	//fetch 타입 eager 로 수정
	@OneToMany(mappedBy = "region", fetch = FetchType.EAGER)
	private List<News> newsList;

	//fetch 타입 eager 로 수정
	@OneToMany(mappedBy = "region", fetch = FetchType.EAGER)
	private List<Property> propertyList;

	public Region(String name) {
		this.name = name;
	}
}
