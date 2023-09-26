package ssafy.eagerbeaver.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
<<<<<<< HEAD
	private List<News> newsList = new ArrayList<>();
=======
	private final List<News> newsList = new ArrayList<>();
>>>>>>> 0da696d6cccc09d63f870e62ea48fbaf7f6c30ea

	//fetch 타입 eager 로 수정
	@OneToMany(mappedBy = "region", fetch = FetchType.EAGER)
	private final List<Property> propertyList = new ArrayList<>();

<<<<<<< HEAD
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

=======
	public Region(String name, String city) {
		this.name = name;
		this.city = city;
	}

	public GameStartDto convertToGameStartDto() {
		List<NewsDto> newsDtoStream = this.newsList.stream().map(News::convertToDto).toList();
		List<PropertyDto> propertyDtoStream = this.propertyList.stream().map(Property::convertToDto).toList();

>>>>>>> 0da696d6cccc09d63f870e62ea48fbaf7f6c30ea
		return GameStartDto.builder()
			.region(this.name)
			.city(this.city)
			.news(newsDtoStream)
			.property(propertyDtoStream)
			.build();
	}
<<<<<<< HEAD
}
=======
}
>>>>>>> 0da696d6cccc09d63f870e62ea48fbaf7f6c30ea
