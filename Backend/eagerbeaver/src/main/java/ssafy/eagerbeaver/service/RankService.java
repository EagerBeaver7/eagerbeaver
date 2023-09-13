package ssafy.eagerbeaver.service;

import java.util.List;

import ssafy.eagerbeaver.dto.ResultDto;

public interface RankService {
	List<ResultDto> getTop10ResultByTurn();
}
