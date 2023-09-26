package ssafy.eagerbeaver.repository;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import ssafy.eagerbeaver.domain.News;
import ssafy.eagerbeaver.domain.NewsCategory;
import ssafy.eagerbeaver.domain.Region;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class NewsRepositoryTest {

	@Autowired
	private NewsRepository newsRepository;

	@Autowired
	private TestEntityManager entityManager;

	// 사용자 저장 및 확인 테스트
	@Test
	public void testSaveNews() {
		// Given
		String region = "역삼";
		String city = "서울";

		Region yeoksam = new Region(region, city);

		String title = "싸피 건물 증발";
		String summary = "쌤쏭에서 운영하는 멀티캠퍼스 역삼점이 증발했다고 알려져 화제이다.";
		String publishedDt = "20230906";
		NewsCategory category = NewsCategory.ETC;

		News news = new News(yeoksam, title, summary, publishedDt, category);

		// When
		entityManager.persist(yeoksam);
		News savedNews = newsRepository.save(news);

		// Then
		assertEquals(news.getTitle(), savedNews.getTitle());
		assertEquals(news.getPublishedDt(), savedNews.getPublishedDt());
	}
}