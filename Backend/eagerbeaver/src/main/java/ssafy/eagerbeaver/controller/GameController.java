package ssafy.eagerbeaver.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import ssafy.eagerbeaver.domain.User;
import ssafy.eagerbeaver.dto.GameStartDto;
import ssafy.eagerbeaver.service.GameService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/games")
public class GameController {

	private final GameService gameService;

	@GetMapping
	public ResponseEntity<List<GameStartDto>> gameStart() throws Exception {
		List<GameStartDto> gameStartDtoList = gameService.gameStart();
		return new ResponseEntity<>(gameStartDtoList, HttpStatus.OK);
	}

	@PostMapping("/gameover")
	public ResponseEntity<Void> gameOver(@RequestParam double rate, @RequestParam int turn) throws Exception {
		User tmpUser = new User("이것은 임시 유저입니다.", "임시유저", "임시유저");
		gameService.gameOver(tmpUser, turn, rate);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
