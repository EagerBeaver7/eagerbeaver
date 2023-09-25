package ssafy.eagerbeaver.controller;

import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import ssafy.eagerbeaver.domain.User;
import ssafy.eagerbeaver.dto.GameStartDto;
import ssafy.eagerbeaver.exception.game.GameErrorCode;
import ssafy.eagerbeaver.exception.game.GameResultArgumentException;
import ssafy.eagerbeaver.service.GameService;
import ssafy.eagerbeaver.service.UserService;
import ssafy.eagerbeaver.util.JwtUtil;
import ssafy.eagerbeaver.util.UserContextHolder;

@RestController
@RequiredArgsConstructor
@RequestMapping("/games")
public class GameController {

	private final UserService userService;
	private final GameService gameService;

	@GetMapping("/{turn}")
	public ResponseEntity<List<GameStartDto>> gameStart(@PathVariable int turn){
		List<GameStartDto> gameStartDtoList = gameService.gameStart(turn);
		return new ResponseEntity<>(gameStartDtoList, HttpStatus.OK);
	}

	@PostMapping("/gameover")
	public ResponseEntity<Void> gameOver(@RequestParam double rate, @RequestParam int turn){
		if (turn != 10 && turn != 15 && turn != 20) {
			throw new GameResultArgumentException(GameErrorCode.GAME_RESULT_ARGUMENT_ERROR.getMessage());
		}
		Short userId = UserContextHolder.userIdHolder.get();
		User findUser = userService.findUserById(userId);

		gameService.gameOver(findUser, turn, rate);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
