package ssafy.eagerbeaver.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import ssafy.eagerbeaver.domain.Result;
import ssafy.eagerbeaver.domain.User;

public interface UserRepository extends JpaRepository<User, Short> {

    Optional<User> findByEmail(String email);
    Optional<User> findByNickname(String nickname);
}
