package ssafy.eagerbeaver.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRegion is a Querydsl query type for Region
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRegion extends EntityPathBase<Region> {

    private static final long serialVersionUID = -206764525L;

    public static final QRegion region = new QRegion("region");

    public final StringPath city = createString("city");

    public final NumberPath<Short> id = createNumber("id", Short.class);

    public final StringPath name = createString("name");

    public final ListPath<News, QNews> newsList = this.<News, QNews>createList("newsList", News.class, QNews.class, PathInits.DIRECT2);

    public final ListPath<Property, QProperty> propertyList = this.<Property, QProperty>createList("propertyList", Property.class, QProperty.class, PathInits.DIRECT2);

    public QRegion(String variable) {
        super(Region.class, forVariable(variable));
    }

    public QRegion(Path<? extends Region> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRegion(PathMetadata metadata) {
        super(Region.class, metadata);
    }

}

