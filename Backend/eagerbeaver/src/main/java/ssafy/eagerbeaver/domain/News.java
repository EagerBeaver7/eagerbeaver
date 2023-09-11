package ssafy.eagerbeaver.domain;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
import ssafy.eagerbeaver.dto.NewsDto;
import ssafy.eagerbeaver.dto.PropertyDto;

@Entity
@Table(name = "news")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class News {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "news_id", columnDefinition = "smallint")
	private short id;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "region_id", columnDefinition = "smallint")
	private Region region;

	@Column(name = "news_title", columnDefinition = "text")
	private String title;

	@Column(name = "news_summary1", columnDefinition = "text")
	private String summary1;

	@Column(name = "news_summary2", columnDefinition = "text")
	private String summary2;

	@Column(name = "news_summary3", columnDefinition = "text")
	private String summary3;

	@Column(name = "published_dt", columnDefinition = "char(8)")
	private String publishedDt;

	@Enumerated(EnumType.STRING)
	@Column(name = "news_category", length = 20)
	private NewsCategory category;

	public News(Region region, String title, String summary1, String summary2, String summary3, String publishedDt,
		NewsCategory category) {
		this.region = region;
		this.title = title;
		this.summary1 = summary1;
		this.summary2 = summary2;
		this.summary3 = summary3;
		this.publishedDt = publishedDt;
		this.category = category;
	}

	public NewsDto convertToDto() {
		return NewsDto.builder()
			.title(this.title)
			.summary1(this.summary1)
			.summary2(this.summary2)
			.summary3(this.summary3)
			.publishedDt(this.publishedDt)
			.category(this.category)
			.build();
	}
}