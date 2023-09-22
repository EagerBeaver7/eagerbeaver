package ssafy.eagerbeaver.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.eagerbeaver.domain.User;

@Builder
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private User user;
    private boolean isNew;

}
