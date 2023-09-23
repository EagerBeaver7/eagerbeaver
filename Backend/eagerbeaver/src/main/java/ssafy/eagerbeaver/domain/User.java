package ssafy.eagerbeaver.domain;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

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
import lombok.ToString;

@Entity
@Table(name = "users")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id", columnDefinition = "smallint")
	private short id;

	@Column(name = "user_email", columnDefinition = "varchar(45)")
	private String email;

	@Column(name = "user_nickname", columnDefinition = "varchar(45)")
	private String nickname;

	@Column(name = "user_profile_img", columnDefinition = "int")
	private int profileImg;

	@OneToMany(mappedBy = "user")
	private List<Result> resultList = new ArrayList<>();

	public User(String email, String nickname) {
		this.email = email;
		this.nickname = nickname;
	}

	public User(String email, String nickname, int profileImg) {
		this.email = email;
		this.nickname = nickname;
		this.profileImg = profileImg;
	}
}