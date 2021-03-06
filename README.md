# Youtube API 사용해보기

## 프로젝트 목표

1. 공식문서를 직접 읽고, 문서를 기반으로 RESTful API를 사용해보기
2. Infinite Scroll 구현해보기

## 프로젝트 배포 링크
https://hayoung-youtube.netlify.app/

## 프로젝트 기본 기능

### 대한민국에서 가장 인기있는 동영상을 무한스크롤로 보여주기

![image](https://user-images.githubusercontent.com/59152882/141979626-40f05adc-053e-437a-abb7-f77d9d956b49.png)

> Youtube API에서 제공하는 Video List 중, chart parameter를 이용해 불러올 수 있는 'mostPopular' 데이터를 활용하였다.
> 한번에 24개의 동영상을 불러오며, 현재 보여주는 동영상을 모두 확인(스크롤이 브라우저 아래에 닿으면)하면 새로 24개의 동영상을 불러오도록 하였다.
> 로고를 클릭하면 인기 동영상을 다시 불러올 수 있다.
> 
> 현재는 하드코딩으로 regionCode를 한국으로 설정해두었는데, 나중에는 사용자가 접속한 지역에 맞는 데이터를 불러오도록 업데이트 하고 싶다.
> 브라우저의 기본 언어 설정을 ISO-3166-1 alpha-2 코드로 바꾸는 작업이 필요하다.

### 검색한 동영상을 무한스크롤로 보여주기

![image](https://user-images.githubusercontent.com/59152882/141991412-60f9bc06-8313-4505-b6d1-6cf850554450.png)

> Youtube API에서 제공하는 Search List를 이용해, 검색한 단어에 맞는 동영상을 불러오도록 하였다. 한번에 24개의 동영상을 불러오며, 현재 보여주는 동영상을 모두 확인하면 새로 24개의 동영상을 불러오도록 하였다.

> 무한스크롤을 적용하면서 가장 고민했던 부분이 Youtube API에서 보내주는 데이터가 영구적이지 않고, 실시간으로 업로드/삭제되는 동영상들을 모두 반영한다는 점이었다. Youtube API는 추가 데이터를 요청할 수 있도록 nextPageToken을 제공하고 있었는데, (내 추측이지만) 실시간으로 동영상 items의 순서가 바뀌다보니, 추가로 데이터를 요청했을 때 기존에 이미 받아왔던 동영상 정보를 다시 보내주는 경우가 있었다. 같은 동영상이 여러 번 노출되는 것이 사용자 관점에서 이상하기도 하고, 동영상 id를 component의 key 값으로 사용하고 있기 때문에 렌더링되는 과정에서 오류가 생긴다는 점도 큰 고민거리 중 하나였다. (다만 인기 동영상 같은 경우 15분에 한 번씩 바뀐다고 하는 것 같은데, 그래서인지 내가 테스트할 때는 해당 오류가 발생하지 않았다.)

> 해결책을 찾기 위해 직접 Youtube에서 인기 동영상도 찾아보고, 검색도 해보았는데, 우선 인기 동영상의 경우 애초에 무한스크롤이 아니었고, 검색의 경우 무한스크롤처럼 보이지만 사실 무한스크롤이 아닌 구조였다. 검색한 키워드에 맞는 동영상을 무한으로 보여주는 것이 아니라, 검색한 동영상 하위로 여러 카테고리의 관련 동영상(+ 더보기 버튼)을 제공하는 식이었다😂

> 그래도 기왕지사 무한스크롤에 도전했으니 끝까지 기능을 구현하고 싶어 생각해낸 꼼수(?)는, Youtube API에 특정 시점 이전에 생성된 동영상을 최근 생성 순서대로 보내달라고 요청한 뒤, 동영상을 요청하는 시점(ex: 검색하는 시점)의 값을 state에 저장하는 것이었다. 그 뒤 추가 로딩이 있을 때마다 해당 값을 재사용 해, 무한스크롤 시에도 최초로 동영상을 불러왔던 시점 이전에 생성된 동영상만 받아오게 하였다. 이렇게 되면 동영상의 순서가 바뀔 일이 없어, 동일한 동영상을 다시 받아오는 경우도 해결할 수 있었다. 다만 검색은 원래 관련도가 높을 수록 우선적으로 보여주는게 맞다고 생각해, 정렬 순서를 시간으로 고정해야하는 아쉬움이 있었던 것 같다.

> 사실 어차피 새로 추가되는 동영상은 없을테니까, 기존에 받아온 동영상과 새로 받아온 동영상에 중복이 있으면 제거하도록 할까도 생각해봤지만... 스크롤이 길어지면 길어질 수록 중복제거가 돌아가는데 어마어마한 부담이 될 거라고 생각해서 우선 단념하는걸로.

### 동영상 재생 화면

![image](https://user-images.githubusercontent.com/59152882/141983460-708e40db-c3db-4b3b-ab29-7794760db425.png)
![image](https://user-images.githubusercontent.com/59152882/141983583-599a2fd0-c394-4233-9f91-550c3f49fba7.png)

![image](https://user-images.githubusercontent.com/59152882/141983623-482e2e8d-fe1f-4cad-81be-4a3706681f90.png)
![image](https://user-images.githubusercontent.com/59152882/141983649-2d9be60a-1325-45be-b4a0-288af93260f4.png)

> 동영상 재생 화면의 경우, 동영상을 보여주는 플레이어와 동영상 설명을 보여주는 영역과, 기존에 보여주던 동영상 리스트 중 랜덤하게 6개를 골라 사이드에 보여주는 영역으로 구성하였다.
> 사실 다 보여줄 수도 있지만, 현재 만들어둔 프로젝트에서는 동영상 댓글을 보여주지 않아, 스크롤이 내려가게 되면 한 쪽은 빈 화면인 채로 동영상만 줄지어 내려가는게 보기 안 좋아서 잘라서 보여주기로 했다.
> 동영상은 기본적으로 화면 크기에 맞추어 사이즈가 변하도록 css를 설정해주었지만, 동영상이 지나치게 작아질 경우 시청에 어려움이 있을 것 같아 화면이 일정 이하로 작아지면 좌-우로 보여주던 두 영역을 위-아래로 보여지게했다.

> 나중에는 진짜 Youtube처럼 현재 시청 중인 동영상과 연관된 동영상이 나오도록 할 수 있나 알아볼 생각이다!

### 그 외

> 동영상 로딩 시 로딩 인디케이터가 보이도록 설정했다. (2021.11.17 추가: 기능에 이상이 있어 수정 중)

> 처음에는 아무 생각없이 Youtube API에서 친절하게 제공하는 try it!의 코드를 그대로 사용하다가, 일일 요청 회수를 초과하는 바람에 API key를 세 번이나 (ㅋㅋ) 다시 발급받는 참사가 있었다.
> Youtube API는 할당량을 단위제로 측정하고 있는데, 더 많은 데이터를 받아올 수록 더 많은 단위의 비용을 지불(?)하는 셈이 된다.
> 그래서 필요한 데이터만 골라서 요청하는 것이, 할당량의 측면에서도, 내가 받아온 데이터를 내가 원하는 구조로 가공해 사용하는데에도 편리했다.
