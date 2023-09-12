package ssafy.eagerbeaver.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@Getter
// @NoArgsConstructor
@ToString
public class WordDto {
	private short id;
	private String content;
	private String meaning;
}
