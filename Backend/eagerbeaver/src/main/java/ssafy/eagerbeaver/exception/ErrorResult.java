package ssafy.eagerbeaver.exception;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ErrorResult {
    private String code; //에러 코드
    private String msg; //에러 메시지
}
