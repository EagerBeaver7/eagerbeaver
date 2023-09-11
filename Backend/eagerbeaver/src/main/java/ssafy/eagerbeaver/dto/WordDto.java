package ssafy.eagerbeaver.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import ssafy.eagerbeaver.domain.Word;

@Builder
@Getter
@NoArgsConstructor
@ToString
public class WordDto {
	private short id;
	private String content;
	private String meaning;
}
