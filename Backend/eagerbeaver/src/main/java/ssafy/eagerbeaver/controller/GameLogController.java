package ssafy.eagerbeaver.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import ssafy.eagerbeaver.domain.GameLog;
import ssafy.eagerbeaver.service.GameLogServiceImpl;

@RestController
@RequiredArgsConstructor
@RequestMapping("/gameLog")
public class GameLogController {

	private final GameLogServiceImpl gameLogService;

	@PostMapping
	public ResponseEntity<Void> save(@RequestBody GameLog gameLog) {
		gameLogService.save(gameLog);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/list")
	public ResponseEntity<List<GameLog>> getAll() {
		return new ResponseEntity<>(gameLogService.getList(), HttpStatus.OK);
	}

	@DeleteMapping
	public ResponseEntity<Void> delete() {
		gameLogService.delete();
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
