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

	@Column(name = "news_summary", columnDefinition = "text")
	private String summary;

	@Column(name = "published_dt", columnDefinition = "char(8)")
	private String publishedDt;

	public News(Region region, String title, String summary, String publishedDt, NewsCategory category) {
		this.region = region;
		this.title = title;
		this.summary = summary;
		this.publishedDt = publishedDt;
	}

	public NewsDto convertToDto() {
		return NewsDto.builder()
			.title(this.title)
			.summary(this.summary)
			.publishedDt(this.publishedDt)
			.build();
	}
}