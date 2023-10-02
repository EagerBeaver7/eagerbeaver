package ssafy.eagerbeaver.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -348715350L;

    public static final QUser user = new QUser("user");

    public final StringPath email = createString("email");

    public final NumberPath<Short> id = createNumber("id", Short.class);

    public final StringPath nickname = createString("nickname");

    public final NumberPath<Integer> profileImg = createNumber("profileImg", Integer.class);

    public final ListPath<Result, QResult> resultList = this.<Result, QResult>createList("resultList", Result.class, QResult.class, PathInits.DIRECT2);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

