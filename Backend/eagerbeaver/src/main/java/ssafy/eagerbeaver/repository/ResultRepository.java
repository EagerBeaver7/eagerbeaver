package ssafy.eagerbeaver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ssafy.eagerbeaver.domain.Result;

public interface ResultRepository extends JpaRepository<Result, Short> {
	List<Result> findTop5ByTurnOrderByRateDesc(int turn);
}
