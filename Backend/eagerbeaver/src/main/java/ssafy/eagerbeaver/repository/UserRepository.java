package ssafy.eagerbeaver.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ssafy.eagerbeaver.domain.User;

public interface UserRepository extends JpaRepository<User, Short> {

<<<<<<< HEAD
    Optional<User> findByEmail(String email);
    Optional<User> findByNickname(String nickname);
=======
	Optional<User> findByEmail(String email);

	Optional<User> findByNickname(String nickname);

	@Modifying
	@Query("update User u set u.nickname = :nickname, u.profileImg = :imgNum where u.id = :id")
	int updateUserInfo(@Param("id") Short id, @Param("nickname") String nickname, @Param("imgNum") int imgNum);
>>>>>>> 0da696d6cccc09d63f870e62ea48fbaf7f6c30ea
}
