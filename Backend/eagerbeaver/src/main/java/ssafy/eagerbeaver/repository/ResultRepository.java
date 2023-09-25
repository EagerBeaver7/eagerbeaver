package ssafy.eagerbeaver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ssafy.eagerbeaver.domain.Region;
import ssafy.eagerbeaver.domain.Result;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Short> {
    List<Result> findTop10ByTurnOrderByRateDesc(int turn);
}
