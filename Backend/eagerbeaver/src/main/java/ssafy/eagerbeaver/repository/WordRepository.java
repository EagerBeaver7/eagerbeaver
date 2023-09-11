package ssafy.eagerbeaver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ssafy.eagerbeaver.domain.Word;

public interface WordRepository extends JpaRepository<Word, Short> {
}
