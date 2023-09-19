package ssafy.eagerbeaver.service;

import java.util.List;

import ssafy.eagerbeaver.dto.WordDto;

public interface WordService {

	// 용어 조회
	WordDto[] getRandomWord();
}
