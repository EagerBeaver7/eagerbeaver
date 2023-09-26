package ssafy.eagerbeaver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

<<<<<<< HEAD
import ssafy.eagerbeaver.domain.Region;
=======
>>>>>>> 0da696d6cccc09d63f870e62ea48fbaf7f6c30ea
import ssafy.eagerbeaver.domain.Result;

public interface ResultRepository extends JpaRepository<Result, Short> {
	List<Result> findTop10ByTurnOrderByRateDesc(int turn);
}
