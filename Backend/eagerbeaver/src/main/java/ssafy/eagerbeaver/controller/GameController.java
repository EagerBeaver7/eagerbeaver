package ssafy.eagerbeaver.controller;

import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpRequest;
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
import ssafy.eagerbeaver.exception.game.GameErrorCode;
import ssafy.eagerbeaver.exception.game.GameResultArgumentException;
import ssafy.eagerbeaver.service.GameService;
import ssafy.eagerbeaver.util.JwtUtil;

@RestController
@RequiredArgsConstructor
@RequestMapping("/games")
public class GameController {

	private final JwtUtil jwtUtil;
	private final GameService gameService;

	@GetMapping
	public ResponseEntity<List<GameStartDto>> gameStart(){
		List<GameStartDto> gameStartDtoList = gameService.gameStart();
		return new ResponseEntity<>(gameStartDtoList, HttpStatus.OK);
	}

	@PostMapping("/gameover")
	public ResponseEntity<Void> gameOver(@RequestParam double rate, @RequestParam int turn){
		if (turn != 10 && turn != 15 && turn != 20) {
			throw new GameResultArgumentException(GameErrorCode.GAME_RESULT_ARGUMENT_ERROR.getMessage());
		}
		User tmpUser = new User("이것은 임시 유저입니다.", "임시유저", 1);
		gameService.gameOver(tmpUser, turn, rate);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
