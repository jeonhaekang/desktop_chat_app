# Chatting Application

데스크톱 채팅 프로그램


### Contents
---
1. [Stack](#stack)
2. [How To Use](#how-to-use)
3. [Key Features](#key-features)
4. [Data Flow](#data-flow)
5. [Demo GIF](#demo-gif)

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
> **warning** : 이 레포지토리를 클론, 실행하기 위해서는 `git`, `Node.js` 그리고 `yarn`이 설치되어 있어야 합니다.

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

|<img src="https://user-images.githubusercontent.com/73621658/213863657-6a736495-f403-4886-b851-c4ed615038e2.gif" />
|:---:|
|채팅방|

</details>





