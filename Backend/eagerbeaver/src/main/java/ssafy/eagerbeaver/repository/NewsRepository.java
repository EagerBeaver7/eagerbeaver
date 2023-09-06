package ssafy.eagerbeaver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ssafy.eagerbeaver.domain.News;

public interface NewsRepository extends JpaRepository<News, Short> {
}
