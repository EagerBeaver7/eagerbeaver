package ssafy.eagerbeaver.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.eagerbeaver.dto.WordDto;
import ssafy.eagerbeaver.repository.WordRepository;

@Slf4j
@RequiredArgsConstructor // 생성자 주입
@Service
public class WordServiceImp implements WordService{

	// repo
	private final WordRepository wordRepository;

	// 랜덤 용어 담는 배열
	private WordDto[] result = new WordDto[3];

	// test
	private int wordId;


	// 랜덤으로 용어 3개 생성하기
	@Scheduled(fixedRate = 86400000) // 시연용으로 메소드 실행하고나서 하루씩 갱신
	public void choiceRandomWord(){

		// 먼저 용어 table의 전체 데이터 개수
		wordId = wordRepository.findAll().size()-1;

		// wordId 범위를 넘지 않는 선에서 random 숫자 만들기
		// 이때, 랜덤으로 나왔던 숫자가 또 나오면 안됨!
		// random 숫자 담고 있는 배열 만들자
		short[] randomId = new short[3];

		int idx1 = 0;
		while(idx1 < 3){
			// 그러고 보니, wordId는 1부터 시작인가 0부터 시작인가...?
			short tmpRandom = (short)((Math.random() * wordId) + 1); // Math.random를 short로 형변환!
			// 중복 확인
			// idx가 크지 않으니 그냥 이중for문 쓰자...
			boolean dup = false;
			for(int tmpIdx = 0; tmpIdx < idx1; tmpIdx++){

				if(tmpRandom == randomId[tmpIdx]){
					dup = true;
					break;
				}
			}

			if(dup){ // 중복이 확인되었으면? 돌아가!
				continue;
			}

			randomId[idx1] = tmpRandom; // 리스트에 하나씩 담아주기
			idx1++;
		}

		// 위까지는 랜덤 숫자 3개 뽑은 것!

		// 이제 남은 것은?
		// 해당되는 word.class를 wordDto에 넣어주고
		// 이제 남은 것은?
		// 해당되는 word.class를 wordDto에 넣어주고
		for(int idx2 = 0; idx2 < 3; idx2++){
			result[idx2] = new WordDto(wordRepository.findById(randomId[idx2]).get());
		}

	}

	@Override
	public WordDto[] getRandomWord() {
		return result;
	}
}
