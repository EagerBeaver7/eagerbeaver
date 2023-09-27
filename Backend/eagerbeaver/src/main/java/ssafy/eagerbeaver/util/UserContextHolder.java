package ssafy.eagerbeaver.util;


public class UserContextHolder {
	public static final ThreadLocal<Short> userIdHolder = ThreadLocal.withInitial(() -> null);
}