package ssafy.eagerbeaver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ssafy.eagerbeaver.domain.Property;

public interface PropertyRepository extends JpaRepository<Property, Short> {
}