package ssafy.eagerbeaver.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import ssafy.eagerbeaver.domain.Word;
import ssafy.eagerbeaver.dto.WordDto;
import ssafy.eagerbeaver.repository.WordRepository;


@SpringBootTest
@Transactional
@DisplayName("word 관련 테스트 👩‍🎓")
class WordServiceImpTest {

    @Autowired
    WordServiceImp wordServiceImp;

    @Autowired
    WordRepository wordRepository;

    /*
    - 3개의 데이터 잘 오는지
    - scheduler 잘 동작하는지
    - 새로운 데이터 insert
     */

    // choiceRandomWord()는 자동 실행
    // getRandomWord() 테스트

    @Test
    void 단어는_3개만_가져와야_한다() {
        WordDto[] words = wordServiceImp.getRandomWord();
        assertEquals(3, words.length);
    }

    @DisplayName("단어 3개가 전부 다른지 테스트 ✅")
    @RepeatedTest(10)
    // 단어 3개의 중복체크 말고, n번째와 n+1번째 로드한 데이터에 중복이 있는지 확인할 때 쓰면 좋을 듯
    // 매일마다 중복되지 않는 다른 데이터를 뿌려주는 것이 더 효율적이라고 생각함.
    @Test
    void 단어_3개는_전부_달라야_한다() {
        WordDto[] words = wordServiceImp.getRandomWord();
        WordDto first = words[0];
        WordDto second = words[1];
        WordDto third = words[2];

        assertNotEquals(first, second);
        assertNotEquals(second, third);
        assertNotEquals(third, first);
    }

    @Disabled("스케줄러에 대해 더 학습하고 작성할 예정")
    @Test
    void 스케줄러가_잘_동작한다_즉_일정_시간이_지나면_데이터가_갱신된다() {

    }

    @Test
    void 새로운_데이터를_성공적으로_삽입할_수_있다() {

    }
}