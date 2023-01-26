# Chatting Application

데스크톱 채팅 프로그램
* [윈도우 설치 파일 다운로드](https://drive.google.com/file/d/1FN2idF73xfBluhRnoGrwt33gSIHamBZK/view?usp=sharing)
* [맥 설치 파일 다운로드](https://drive.google.com/file/d/1RMj8YRb7lT2iRvwH7Gq-g5E2tbpcA4eS/view?usp=sharing)

### Contents
---
1. [Stack](#stack)
2. [How To Use](#how-to-use)
3. [Key Features](#key-features)
4. [Server](#server)
5. [Data Flow](#data-flow)
6. [Demo GIF](#demo-gif)

### Stack
----
#### Front End
* React, Typescript, Scss
* [Nextron](https://github.com/saltyshiomix/nextron) (electron + next.js)<br>웹 기술을 통해 크로스 플랫폼 데스크탑 앱 개발


#### Back End
* firebase (serverless)<br>
Authentication을 통해 로그인과 회원가입을, realtime database를 통해 채팅 기능 구현


### How To Use
---
> **Warning** : 이 레포지토리를 클론, 실행하기 위해서는 `git`, `Node.js` 그리고 `yarn`이 설치되어 있어야 합니다.

```
# clone this repository
$ git clone https://github.com/jeonhaekang/desktop_chat_app.git

# into the repository
$ cd desktop_chat_app

# install dependencies
$ npm install

# run development mode
$ yarn dev

# producetion build
yarn build

# build to mac
yarn build:mac

# build to win64
yarn build:win64
```

### Key Features
---
* 로그인과 회원가입
* 전체 사용자 명단 리스트
* 내가 참여중인 채팅방 목록
* 사용자 더블 클릭을 통한 1:1 채팅방 개설
* 개설된 채팅방에서 타 유저 초대 가능
* 미확인 메세지 표시

### Server
---
> **Note** : Firebase의 [Authentication](https://firebase.google.com/docs/auth/web/start?authuser=0&hl=ko), [Realtime Database](https://firebase.google.com/docs/database/web/start?authuser=0&hl=ko)를 사용하고 있습니다. <br/> 자세한 내용은 링크의 [문서](https://firebase.google.com/docs/web/setup?authuser=0&hl=ko#add-sdk-and-initialize)를 참조하세요.

서버 연결을 위해서는 아래 양식의 파일을 필요로 합니다.
```javascript
// config.ts
import { initializeApp } from 'firebase/app';

const config = {
  apiKey: 'YOUR FIREBASE API KEY',
  authDomain: 'YOUR FIREBASE AUTH DOMAIN',
  databaseURL: 'YOUR FIREBASE DATABASE URL',
  projectId: 'YOUR FIREBASE PROJECT ID',
  storageBucket: 'USER FIREBASE STORAGE BUCKET',
  messagingSenderId: 'YOUR FIREBASE MESSAGING SENDER ID',
  appId: 'YOUR FIREBASE APP ID',
};

const app = initializeApp(config);

export default app;
```
위 양식의 파일을 `renderer/firebase/config.ts`에 작성해 주세요.

### Data Flow
---
> **Note** : `Firebase Realtiem Database`의 data 설명 입니다.

#### 데이터 구조
- Users : 접속 이력이 있는 모든 사용자 (사용자 명단)<br/>
  `Users > 유저 아이디 목록 > 유저 상제 정보`

- UserRoom : 각 유저별 참여중인 채팅방 목록 (참여중 채팅방 목록)<br/>
  `UserRooms > 유저 아이디 > 참여중인 채팅방 아이디 목록`

- Rooms : 개설된 채팅방 목록<br/>
  `Rooms > 채팅방 아이디 목록 > 참여중인 유저 아이디 목록 > 유저 상세 정보`

- Messages : 전송된 메세지 목록<br/>
  `Messages > 채팅방 아이디 목록 > 메세지 아이디 목록 > 메세지 상제 정보`

#### 데이터 흐름
1. 채팅방 로비 진입 시 자신의 정보를 `Users`에 등록, 이 정보를 통해 유저 목록 표기

2. 유저 목록에서 더블클릭을 통해 본인과 상대방, 참여할 유저 리스트 정보를 담고 `Rooms`에 새로운 채팅방 생성

3. 생성된 채팅방에서 메세지 전송시 해당 RoomID를 기반으로 `Messages`에 메세지 저장

4. 메세지가 전송되면서 최신 정보를 담은 데이터를 참여 중인 유저들에게 알림 즉 `UserRooms`가 최신화됨

5. 채팅방이 목록에 없던 유저는 이 과정 (`UserRooms`에 등록) 에서 채팅방이 자신의 목록에 나타나게 됨

### Demo GIF
---

<details>
    <summary>로그인, 회원가입</summary>
<br/>

|<img src="https://user-images.githubusercontent.com/73621658/213863656-af093e3b-ff45-4991-9a54-08e750f68c51.gif" />|<img src='https://user-images.githubusercontent.com/73621658/213863650-870cc4b2-ad9b-4de0-bda6-094860d4a7ba.gif' />
|:---:|:---:|
|로그인|회원가입|
</details>

<details>
    <summary>채팅방</summary>
<br/>

|<img src="https://user-images.githubusercontent.com/73621658/213898784-4c8ef517-75c7-420f-a69f-2c0e931401a4.gif" />|
|:---:|
|채팅방 개설 및 채팅|
|<img src="https://user-images.githubusercontent.com/73621658/213898783-e5e586ae-cac4-479d-9745-154b56d4b45b.gif" />|
|채팅방 초대|


</details>





