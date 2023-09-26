package ssafy.eagerbeaver.repository;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import ssafy.eagerbeaver.domain.Property;
import ssafy.eagerbeaver.domain.Region;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class PropertyRepositoryTest {

	@Autowired
	private PropertyRepository propertyRepository;

	@Autowired
	private TestEntityManager entityManager;

	@Test
	public void saveProperty() {
		//given
		String region = "역삼";
		String city = "서울";
		Region yeoksam = new Region(region, city);

		int price = 100_000_000;
		String period = "202309";
		Property property = new Property(yeoksam, price, period);

		//when
		entityManager.persist(yeoksam);
		Property savedProperty = propertyRepository.save(property);

		//then
		assertEquals(price, savedProperty.getPrice());
		assertEquals(period, savedProperty.getPeriod());
		System.out.println(savedProperty);
	}

}