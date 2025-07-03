
DB RESET

```bash
./gradlew :database:flywayClean :database:flywayMigrate 

```

CLEAN BUILD
```bash
./gradlew clean build webpackBuild compileTestJava -x test -x detekt
```


OSTAP FUNDS
```bash
./gradlew bootRun --args='--spring.profiles.active=local'
```
