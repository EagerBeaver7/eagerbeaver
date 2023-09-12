package ssafy.eagerbeaver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import ssafy.eagerbeaver.dto.WordDto;
import ssafy.eagerbeaver.service.WordService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/word")
public class WordController {

	private final WordService wordService;

	@GetMapping
	public ResponseEntity<WordDto[]> getAllRandomWords(){
		return new ResponseEntity<>(wordService.getRandomWord(), HttpStatus.OK);
	}
}
