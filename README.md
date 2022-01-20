# Purple IO 백엔드 테스트 (Backend)

해당 백엔드 테스트는 [Nest](https://github.com/nestjs/nest) framework, Typescript작성되어 있습니다.

## How to run

해당 프로젝트의 프론트를 실행하기위해서, 해당 순서를 지켜주세요!

```bash
# description 현재 프로젝트의 package.json에 적힌 모든 패키지(packages)를설치하기 위해 terminal에 입력해주세요.
$ npm install
```


```bash
# description 브라우저에서 확인하기위해 프로젝트를 run 시켜주세요.
$ npm run start
```

 __※ Front를 run 하기 전, 해당 프로젝트를 먼저 실행시켜주세요!__
 
 ## Backend Server Q&A
 
 >Q1: Backend API endpoint를 설명해주세요.
 >> 백엔드 서버의 port번호는 3001번을 사용합니다. 또한 oEmbed Data를 가져오기 위한 url pattern은 '/data' 이며, query parameter로는 'url'을 사용합니다.
 >> ex) `http://localhost:3001/data?url=${urlScheme}` 
 <br/>
 
 >Q2: 코드 작성 시 유의했던 사항을 설명해주세요.
 >>  * spec에 맞추어 서버단에서 처리해 줄 수 있는 Error에 신경을 썼습니다.<br/> 
 >>  * 가독성의 부분이나 재사용을 쉽게하기위해 service layer메소드들을 분리하여 코드를 작성했고, 최대한 if else와 같은 분기를 적게 사용하려 노력했습니다.<br/>
 >>  * Front부분에서 처리할 수 없는 (Instagram Image URL SOP issue) 부분을 서버단에서 처리하여, 프론트단에서 차선책으로 client의 request에 응답할 수 있도록 했습니다. 
____
<h4 align='right'> written by kang min ju 2022/01/20</h4>
