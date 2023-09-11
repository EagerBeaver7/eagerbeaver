package ssafy.eagerbeaver.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import ssafy.eagerbeaver.dto.RankDto;
import ssafy.eagerbeaver.service.RankService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rank")
public class RankController {

	private final RankService rankService;
}
