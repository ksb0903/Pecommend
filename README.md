# Pecommend - 향수 추천 커뮤니티


## :memo: 목차
[서비스 소개](#star-서비스-소개)  
[기술스택](#books-기술스택)  
[개발 기간](#calendar-개발-기간)  
[프로젝트 파일 구조](#file_folder-프로젝트-파일-구조)  
[결과물](#desktop_computer-결과물)  
[SWAGGER](#green_book-swagger)  
[테스트 목록](#keyboard-테스트-목록)  
[배포 후 수정사항](#wrench-배포-후-수정사항)  
[팀원 소개](#bust_in_silhouette-팀원-소개)  
[트러블 슈팅](#dizzy-트러블-슈팅) 
[UCC](#movie_camera-ucc)  


<!-- ----------------------------------------------------------------------------------------------------------- -->



## :star: 서비스 소개

![image](/uploads/7348808649e6e83f52355239c3aa8ae7/image.png)
Pecommend는 시향없이 향수를 구매하는데 도움을 주는 웹사이트입니다!

내가 좋아하거나 싫어하는 향수 리스트가 있다면 그 향수를 선호하는 유저들이 좋아하거나 싫어하는 향수 리스트와

그 향수를 비선호하는 유저들이 좋아하거나 싫어하는 향수 리스트를 제공합니다.

해당 향수를 선호하는 유저들이 좋아하는 향수들이 내가 좋아하는 향수와 맞다면 이 향수는 나에게 맞겠죠?

반대로 해당 향수를 선호하는 유저들이 싫어하는 향수에 내가 좋아하는 향수가 많이 있다면 이 향수는 나에게 맞지 않겠죠?

[페코멘드 서비스 바로가기](https://pecommend.com)

<br/>

<div align=right><a href="#memo-목차">목차로 이동</a></div>
<br/>

## :books: 기술스택

1. **이슈 관리** :&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=JiraSoftware&logoColor=white" height="24px">  

2. **형상 관리** :&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/GitLab-FC6D26?style=for-the-badge&logo=GitLab&logoColor=white" height="24px">  

3. **커뮤니케이션** :&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/Mattermost-0058CC?style=for-the-badge&logo=Mattermost&logoColor=white" height="24px"> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white" height="24px"> <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white" height="24px"> <img src="https://img.shields.io/badge/Webex-00BCEB?style=for-the-badge&logoColor=white" height="24px">  

4. **개발환경**
    + OS :&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/Windows 10-0078D6?style=for-the-badge&logo=Windows&logoColor=white" height="24px">
    + IDE :&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/Intellij-000000?style=for-the-badge&logo=IntelliJIDEA&logoColor=white" height="24px"> <img src="https://img.shields.io/badge/Vscode-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white" height="24px"> <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white" height="24px">  

5. **서버**:  
    + <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white" height="24px"> (1.18)
    + <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=AmazonEC2&logoColor=white" height="24px">
    + <img src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=white" height="24px"> (20.04.4 LTS) 

6. **데이터베이스**:&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/mariaDB-003545?style=for-the-badge&logo=mariaDB&logoColor=white" height="24px"> (10.3.34)
    <br/>

7. **백엔드**  
    + <img src="https://img.shields.io/badge/spring boot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white" height="24px"> (2.7.1)&nbsp;&nbsp;<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white" height="24px"> (1.8)&nbsp;&nbsp;<img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=Gradle&logoColor=white" height="24px">(7.5) 
    + 데이터 크롤링 :&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white" height="24px"> (3.10.5)


8. **프론트엔드**
    + <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" height="24px"> (5)
    + <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white" height="24px"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white" height="24px"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" height="24px"> (ES6)
    + <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" height="24px"> (18.2.0)&nbsp;&nbsp;<img src="https://img.shields.io/badge/react bootstrap-61DAFB?style=for-the-badge&logoColor=black" height="24px"> (18.2.0)&nbsp;&nbsp;<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=black" height="24px"> (4.2.0)
    + <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" height="24px"> (16.16.0)&nbsp;&nbsp;<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" height="24px"> (8.11.0)

<div align=right><a href="#memo-목차">목차로 이동</a></div>

<!-- ----------------------------------------------------------------------------------------------------------- -->

## :calendar: 개발 기간
##### 2022.07.11 ~ 2022.08.19 (총 29일)



<div align=right><a href="#memo-목차">목차로 이동</a></div>
<!-- ----------------------------------------------------------------------------------------------------------- -->

## :file_folder: 프로젝트 파일 구조



### ERD
![ERD](/uploads/c2288e62e798df318fd9b5d33a9892b6/erd.png)


### 아키텍처

![아키텍처](/uploads/1fd284b9902239b45643dee16bd52234/image.png)

<div align=right><a href="#memo-목차">목차로 이동</a></div>

<!-- ----------------------------------------------------------------------------------------------------------- -->



## :desktop_computer: 결과물
[사용 예시(Notion)](https://www.notion.so/98ad2045e4424564954e5969f1823d66)

<div align=right><a href="#memo-목차">목차로 이동</a></div>

<!-- ----------------------------------------------------------------------------------------------------------- -->

## :green_book: SWAGGER
[Swagger(Notion)](https://bouncy-freedom-637.notion.site/Swagger-0803536ccdfa44a7b0b671831808a28e)

<div align=right><a href="#memo-목차">목차로 이동</a></div>

<!-- ----------------------------------------------------------------------------------------------------------- -->

## :keyboard: 테스트 목록
[테스트 목록(Notion)](https://bouncy-freedom-637.notion.site/Git-1499c9a824d14abeb8fff6619992947e)

<div align=right><a href="#memo-목차">목차로 이동</a></div>

<!-- ----------------------------------------------------------------------------------------------------------- -->


## :wrench: 배포 후 수정사항

### ver 1.1
[배포 후 수정사항 ver 1.1(Notion)](https://bouncy-freedom-637.notion.site/ver-1-1-8a6d6fd61657409faf7c276d2526b37e)

### ver 1.2
[배포 후 수정사항 ver 1.2(Notion)](https://bouncy-freedom-637.notion.site/ver-1-2-81a182628f2a4ac5bfd7d4fb46352c03)

<div align=right><a href="#memo-목차">목차로 이동</a></div>

<!-- ----------------------------------------------------------------------------------------------------------- -->


## :bust_in_silhouette: 팀원 소개

| 팀원   | 역할                              | GitHub                              |
| ------ | --------------------------------- | --------------------------------- |
| 안세영 | Back-end, 커뮤니티 파트 담당, 배포 담당, 팀장 | [MelRang](https://github.com/melrang)  |
| 박지하 | Front-end, 커뮤니티 파트 담당 | [bgpjh97](https://github.com/bgpjh) |
| 금동운 | Front-end, 회원 파트 담당 | [Dongwoon0820](https://github.com/Dongwoon0820) |
| 김성빈 | Back-end, 회원 파트 담당 | [ksb0903](https://github.com/ksb0903) |
| 박유주 | Front-end, 향수 파트 담당, UI 디자인 | [9Yuju](https://github.com/9Yuju)   |
| 박주연 | Back-end, 향수 파트 담당, 데이터 크롤링 | [juyeoon](https://github.com/juyeoon)  |


<div align=right><a href="#memo-목차">목차로 이동</a></div>

<!-- ----------------------------------------------------------------------------------------------------------- -->

## :dizzy: 트러블 슈팅


<div align=right><a href="#memo-목차">목차로 이동</a></div>

<!-- ----------------------------------------------------------------------------------------------------------- -->


## :movie_camera: UCC

[Youtube](https://youtu.be/YY50tJs5ocI)


<div align=right><a href="#memo-목차">목차로 이동</a></div>
