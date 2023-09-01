# 스파크란?


Spark는 Hadoop의 빅데이터 처리 방식은 맞지만, 속도가 느린 것을 해결하기위해 나왔다. Spark는 인메모리 방식의 연산처리를 지향하면서 MR의 연산 속도의 한계를 극복하기 위해 나왔다고 한다.그래서 Spark가 유명하고 많이 사용하는 것은 엄청나게 빠르기 때문이다. 그래서 스파크를 사용하면 빅데이터의 문제점을 어느정도 커버 할 수 있다. 즉 hadoop의 분산 처리 방식인 Map Reduce를 사용하지 않고 Spark를 사용하는 이유는 빅데이터를 연산처리 할 때 DISK I/O로 처리하는 것이 아니라 인메모리로 처리하기 때문에 실시간 스트리밍이 가능할 만큼 속도가 빠르기 때문이다.
<br>


# Apache Spark가 빠른 이유(처리 방식)
 

Spark cluster 
Driver Program : 우리가 작업하는 환경을 뜻한다 Script(java,python,scala)를 작성하는 것이라고 보면된다.
Cluster Manager : 위에 작업한 script 내용을 실행 시키면 cluster manager가 worker node에게 일을 분배하여 처리 하게 해준다.
(ex: Hadoop-yarn, aws-Eleatic MapReduce 등)
Worker Node : Worker Node는 1CPU 하나당 1Node가 배치되어 인메모리 연산을 진행한다.


spark는 Driver Program, Cluster Manager, Workder Node로 구성 되어 있다. 위와 같은 이유 때문에 인메모리 연산 분산 처리가 가능해져 속도가 빨라지게 되었다. 즉 Spark는 Cluster Manager가 Workder node를 알아서 CPU 로 할당하여 분산 처리를 하기 때문에 연산 속도가 빨라 졌다고 한다.
<br>
 


# Spark 구성 

Spark Core
Spark SQL
Spark Streaming
MLlib
GraphX

Spark는 SQL, Streaming, MLlib, GraphX등을 사용하여 처리하는 방식이 여러가지로 진화 왔다고 한다. 또한 그림에서 볼수 있겠지만, SQL, Streaming, MLlib, GraphX등을 사용하여 연산을 처리 할 수 있으며, 아래와 같이 다양한 툴들과 연동되어 확장성 까지 같추었다. 이로써 빅데이터 연산 처리를 위해서는 꼭 필요한 존재가 되었다고 한다.
<br>
