## 로컬에 테스트용 db구축해서 작업
```
1. 설치하기
npm install -D json-server  프로젝트 폴더 내에만 설치하려면 -g 대신 -D를 사용하세요.

2. 데이터베이스 파일생성 (db.json)
프로젝트 루트 폴더에 db.json 파일을 만들고 관리하고 싶은 데이터를 넣습니다.

3. 서버 실행하기
json-server --watch db.json --port 3002
```