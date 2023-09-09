package ssafy.eagerbeaver.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import ssafy.eagerbeaver.dto.GameOverDto;
import ssafy.eagerbeaver.dto.GameStartDto;
import ssafy.eagerbeaver.service.GameService;
import ssafy.eagerbeaver.service.GameServiceImpl;

@RestController
@RequiredArgsConstructor
@RequestMapping("/games")
public class GameController {

	private final GameService gameService;

	@GetMapping
	public ResponseEntity<List<GameStartDto>> gameStart() {
		return null;
	}

	@PostMapping("/gameover")
	public ResponseEntity<GameOverDto> gameOver() {
		return null;
	}
}
