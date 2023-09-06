package ssafy.eagerbeaver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ssafy.eagerbeaver.domain.Region;
import ssafy.eagerbeaver.domain.Result;

public interface ResultRepository extends JpaRepository<Result, Short> {
}
