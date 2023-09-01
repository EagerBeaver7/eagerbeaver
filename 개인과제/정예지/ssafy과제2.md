# ssafy 과제2

### 일정 기준에 따라 리듀서를 다르게 주려면?

- Partitioner를 수정해야함!

### Map 함수가 호출됐을 때, 입력 파일의 맨 앞부터 몇 번째인지 알기 위해

<aside>
💡 import org.apache.hadoop.io.LongWritable;

</aside>

### File name을 추출하기 위해

<aside>
💡 import org.apache.hadoop.mapreduce.lib.input.FileSplit;

</aside>

# mapreduce 실행 시 디렉토리 삭제 방법

1. java 파일 내에서 디렉토리를 삭제

```java
FileSystem hdfs = FileSystem.get(conf);
Path output = new Path(otherArgs[1]);
if (hdfs.exists(output)){
	hdfs.delete(output, true);
}
```

1. Project 디렉토리에서 ant를 실행한 후 디렉토리 삭제

```bash
$ hdfs dfs -rm -r wordcount_test_out (디렉토리를 삭제)
```
