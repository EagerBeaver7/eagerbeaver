package ssafy.eagerbeaver.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.eagerbeaver.domain.NewsCategory;

@Builder
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class NewsDto {
	private String title;
	private String summary;
	private String publishedDt;
	private NewsCategory category;
}