package ssafy.eagerbeaver.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class GameStartDto {
	private String region;
	private List<NewsDto> news;
	private List<PropertyDto> property;
}
