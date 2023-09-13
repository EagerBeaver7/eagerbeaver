package ssafy.eagerbeaver.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import ssafy.eagerbeaver.dto.GameStartDto;
import ssafy.eagerbeaver.dto.NewsDto;
import ssafy.eagerbeaver.dto.PropertyDto;

@Entity
@Table(name = "region")
@Getter
@ToString(exclude = {"newsList", "propertyList"})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Region {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "region_id", columnDefinition = "smallint")
	private short id;

	@Column(name = "region_city", columnDefinition = "varchar(20)")
	private String city;

	@Column(name = "region_name", columnDefinition = "varchar(20)")
	private String name;

	//fetch 타입 eager 로 수정
	@OneToMany(mappedBy = "region", fetch = FetchType.EAGER)
	private List<News> newsList = new ArrayList<>();


	//fetch 타입 eager 로 수정
	@OneToMany(mappedBy = "region", fetch = FetchType.EAGER)
	private List<Property> propertyList = new ArrayList<>();

	public Region(String name, String city) {
		this.name = name;
		this.city = city;
	}

	public GameStartDto convertToGameStartDto() {
		List<NewsDto> newsDtoStream = this.newsList.stream().map(News::convertToDto).toList();
		List<PropertyDto> propertyDtoStream = this.propertyList.stream().map(Property::convertToDto).toList();

		return GameStartDto.builder()
			.region(this.name)
			.city(this.city)
			.news(newsDtoStream)
			.property(propertyDtoStream)
			.build();
	}
}