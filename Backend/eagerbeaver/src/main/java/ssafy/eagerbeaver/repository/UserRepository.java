package ssafy.eagerbeaver.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ssafy.eagerbeaver.domain.User;

public interface UserRepository extends JpaRepository<User, Short> {

    Optional<User> findByEmail(String email);
    Optional<User> findByNickname(String nickname);

	@Modifying
	@Query("update User u set u.nickname = :nickname, u.profileImg = :imgNum where u.id = :id")
	int updateUserInfo(@Param("id") Short id, @Param("nickname") String nickname, @Param("imgNum") int imgNum);
}
