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
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WordDto {
	private short id;
	private String content;
	private String meaning;

	public WordDto(Word entity){
		this.id = entity.getId();
		this.content = entity.getContent();
		this.meaning = entity.getMeaning();
	}

}
