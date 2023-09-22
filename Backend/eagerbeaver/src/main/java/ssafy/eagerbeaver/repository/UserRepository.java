package ssafy.eagerbeaver.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import ssafy.eagerbeaver.domain.Result;
import ssafy.eagerbeaver.domain.User;

public interface UserRepository extends JpaRepository<User, Short> {

    Optional<User> findByEmail(String email);
    Optional<User> findByNickname(String nickname);

    @Modifying
    @Query("update User u set u.nickname = :nickname where u.id = :id")
    boolean updateNickname(Short id, String nickname);
}
