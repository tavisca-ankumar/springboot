FROM java:8
EXPOSE 8080
COPY /build/libs/todo-0.0.1-SNAPSHOT.war var/
WORKDIR /var
CMD ["java","-jar","todo-0.0.1-SNAPSHOT.war"]