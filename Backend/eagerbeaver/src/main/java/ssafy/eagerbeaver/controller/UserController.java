package ssafy.eagerbeaver.controller;

import java.util.Map;
<<<<<<< HEAD
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
=======

>>>>>>> 0da696d6cccc09d63f870e62ea48fbaf7f6c30ea
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
<<<<<<< HEAD
import ssafy.eagerbeaver.dto.UserDto;
=======

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.eagerbeaver.dto.UserInfoSetReq;
>>>>>>> 0da696d6cccc09d63f870e62ea48fbaf7f6c30ea
import ssafy.eagerbeaver.service.UserService;
import ssafy.eagerbeaver.util.JwtUtil;

@Slf4j
@RequiredArgsConstructor
@RestController
public class UserController {

	private final UserService userService;
	private final JwtUtil jwtUtil;

	@GetMapping("/auth/login")
	public ResponseEntity<?> login(@RequestParam String code) {
		String accessToken = userService.getKakaoAccessToken(code);
		String email = userService.getKakaoMemberInfo(accessToken);
		Map<String, Object> userInfo = userService.login(email);

<<<<<<< HEAD

        return new ResponseEntity<>(userInfo, HttpStatus.OK);

    }
=======
		return new ResponseEntity<>(userInfo, HttpStatus.OK);
	}
>>>>>>> 0da696d6cccc09d63f870e62ea48fbaf7f6c30ea

	/*
	닉네임 중복 검사 for debounce
	 */
	@GetMapping("/nickname/{nickname}")
	public ResponseEntity<?> checkNickname(@PathVariable String nickname) {
		boolean isDuplicate = userService.checkNickname(nickname);
		return new ResponseEntity<>(isDuplicate, HttpStatus.OK);
	}

<<<<<<< HEAD
=======
	/*
	닉네임 설정
	 */
	@PutMapping("/user")
	public ResponseEntity<?> setNickname(@RequestBody UserInfoSetReq req) {
		Short id = UserContextHolder.userIdHolder.get();
		int result = userService.setUserInfo(id, req.getNickname(), req.getImgNum());
		if (result == 0) {
			return new ResponseEntity<>("유저 정보를 등록할 수 없습니다.", HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>("유저 정보 등록 성공", HttpStatus.CREATED);
		}
	}
>>>>>>> 0da696d6cccc09d63f870e62ea48fbaf7f6c30ea
}
