package ssafy.eagerbeaver.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ssafy.eagerbeaver.domain.GameLog;

@Repository
public interface GameLogRepository extends CrudRepository<GameLog, Short> {

}
