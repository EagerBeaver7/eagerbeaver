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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Entity
@Table(name = "users")
@Getter
@ToString
@AllArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id", columnDefinition = "smallint")
	private short id;

	@Column(name = "user_email", columnDefinition = "varchar(45)")
	private String email;

	@Column(name = "user_nickname", columnDefinition = "varchar(45)")
	private String nickname;

	@Column(name = "user_profile_img", columnDefinition = "varchar(255)")
	private String profileImg;

	@OneToMany(mappedBy = "user")
	private ArrayList<Result> resultList;
}