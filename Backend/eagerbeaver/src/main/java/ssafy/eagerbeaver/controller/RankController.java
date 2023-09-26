package ssafy.eagerbeaver.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import ssafy.eagerbeaver.dto.ResultDto;
import ssafy.eagerbeaver.service.RankService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rank")
public class RankController {

	private final RankService rankService;

	@GetMapping
	public ResponseEntity<List<ResultDto>> getRank() {
		return new ResponseEntity<>(rankService.getTop10ResultByTurn(), HttpStatus.OK);
	}
}
