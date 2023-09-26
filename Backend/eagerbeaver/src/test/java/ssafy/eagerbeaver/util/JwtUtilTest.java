// package ssafy.eagerbeaver.util;
//
// import org.assertj.core.api.Assertions;
// import org.junit.jupiter.api.Test;
//
// class JwtUtilTest {
//
// 	// base64-encoded secret key cannot be null or empty.
// 	@Test
// 	void JWT_생성_성공_테스트() {
// 		JwtUtil jwtUtil = new JwtUtil();
//
// 		// given
// 		String expectedJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJlYWdlcmJlYXZlckBrYWthby5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.L2zRfMlsYGaUIMrRD8U_PtISiP3U2C7XH4AlJyXAc-0";
//
// 		// when
// 		String actualJwt = jwtUtil.generateJwt("eagerbeaver@kakao.com");
//
// 		// then
// 		Assertions.assertThat(actualJwt).isEqualTo(expectedJwt);
// 	}
//
// 	@Test
// 	void getJwtFromHeader() {
// 	}
//
// 	@Test
// 	void validateJwt() {
// 	}
//
// 	@Test
// 	void getEmailFromJwt() {
// 	}
// }