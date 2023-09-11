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
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

	public GameStartDto convertToGameStartDto() {
		List<NewsDto> newsDtoStream = this.newsList.stream().map(News::convertToDto).toList();
		List<PropertyDto> propertyDtoStream = this.propertyList.stream().map(Property::convertToDto).toList();

		return GameStartDto.builder()
			.region(this.name)
			.news(newsDtoStream)
			.property(propertyDtoStream)
			.build();
	}

}
