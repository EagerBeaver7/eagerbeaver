package ssafy.eagerbeaver.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "word")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Word {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "word_id", columnDefinition = "smallint")
	private short id;

	@Column(name = "word_content", columnDefinition = "varchar(45)")
	private String content;

	@Column(name = "word_meaning", columnDefinition = "text")
	private String meaning;

	public Word(String content, String meaning) {
		this.content = content;
		this.meaning = meaning;
	}
}
