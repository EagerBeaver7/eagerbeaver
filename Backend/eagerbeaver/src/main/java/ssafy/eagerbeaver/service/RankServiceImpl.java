package ssafy.eagerbeaver.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ssafy.eagerbeaver.domain.Result;
import ssafy.eagerbeaver.dto.RankDto;
import ssafy.eagerbeaver.dto.ResultDto;
import ssafy.eagerbeaver.repository.ResultRepository;

@Service
@RequiredArgsConstructor
public class RankServiceImpl implements RankService{

	private final ResultRepository resultRepository;

	private static final int[] TURN_ARR = new int[] {10, 15, 20};

	@Override
	public List<ResultDto> getTop10ResultByTurn() {
		List<ResultDto> resultDtoList = new ArrayList<>();

		for (int turn : TURN_ARR) {
			List<RankDto> rankDtoList = resultRepository.findTop10ByTurnOrderByRateDesc(turn)
				.stream()
				.map(Result::convertToRankDto)
				.toList();
			resultDtoList.add(ResultDto.builder()
				.turn(turn).rankList(rankDtoList).build());
		}

		return resultDtoList;
	}
}
