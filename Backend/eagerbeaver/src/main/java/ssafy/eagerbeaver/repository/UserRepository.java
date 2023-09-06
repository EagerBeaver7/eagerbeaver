package ssafy.eagerbeaver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ssafy.eagerbeaver.domain.Result;
import ssafy.eagerbeaver.domain.User;

public interface UserRepository extends JpaRepository<User, Short> {
}
