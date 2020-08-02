#!/bin/bash
path=`pwd`
docker run -tid --name cont_courses_v1 --rm -p 9210:80 -p 9220:9220 -v $path:/usr/share/projet_virtual_teacher  courses:v1
docker exec cont_courses_v1 service apache2 start
docker container exec -it  cont_courses_v1 service mysql start
docker attach cont_courses_v1
# docker exec cont_courses_v1 mvn compile -f /usr/share/projet_virtual_teacher/courses-virtual-teacher/pom.xml
# docker exec cont_courses_v1 mvn package -f /usr/share/projet_virtual_teacher/courses-virtual-teacher/pom.xml
# docker exec cont_courses_v1 java -jar /usr/share/projet_virtual_teacher/courses-virtual-teacher/courses-virtual-teacher-server-app/target/courses-virtual-teacher-server-app-0.0.1-SNAPSHOT.jar
