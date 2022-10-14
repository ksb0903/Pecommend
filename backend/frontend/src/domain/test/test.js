import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./test.css";

function Test() {
  let navigate = useNavigate();
  const [test, setTest] = useState([
    {
      testId: 1,
      testTitle: "나와 어울리는 향수는 무엇일까?",
      testButton: "START!",
      testImg: "",
      q_count: 6,
    },
    {
      Qid: 1,
      QImg: "",
      QDialog:
        "당신은 과한 업무에 지쳐 여행을 떠났습니다. \n당신이 향하는 여행지는?",
      QB1Dialog: "사람이 북적북적한 축제",
      QB2Dialog: "한적하며 자연경관이 예쁜 장소",
      QB1Select: [1, 2, 3, 5, 6, 7, 8, 11, 12],
      QB2Select: [0, 4, 9, 10],
    },
    {
      Qid: 2,
      QImg: "",
      QDialog:
        "여행지에 도착해서 대중교통을 탄 당신! \n당신의 빈 옆자리를 못 보고 서 있는 이성을 발견했을 때 당신의 행동은?",
      QB1Dialog: "여기 앉으세요~!",
      QB2Dialog: "모른 척 휴대폰만 본다.",
      QB1Select: [0, 1, 3, 5, 6, 7, 10, 12],
      QB2Select: [2, 3, 4, 8, 9, 11],
    },
    {
      Qid: 3,
      QImg: "",
      QDialog:
        "숙소에 도착 후 본격적인 관광을 시작! \n두리번~ 두리번~ 무엇을 보고 있나요?",
      QB1Dialog: "같은 한국인이 얼마나 있는지 확인한다.",
      QB2Dialog: "새로운 장소가 있는지 본다.",
      QB1Select: [3, 5, 7, 8, 11, 12],
      QB2Select: [0, 1, 2, 6, 9, 10],
    },
    {
      Qid: 4,
      QImg: "",
      QDialog:
        "관광을 하는 중에 꿈에 그리던 이상형을 발견! \n쳐다보다가 눈이 마주치게 됐는데?!",
      QB1Dialog: "화들짝! 놀라며 고개를 돌린다.",
      QB2Dialog: "같이 쳐다본다.",
      QB1Select: [4, 7, 8, 9],
      QB2Select: [0, 1, 2, 3, 5, 6, 10, 11, 12],
    },
    {
      Qid: 5,
      QImg: "",
      QDialog:
        "관광이 끝나고 귀국하였습니다. \n다음날 우연히 여행지에서 봤던 이상형을 마주쳤다면?",
      QB1Dialog: "저기요... 하면서 말을 건다.",
      QB2Dialog: "차마 말을 걸지 못하고 몰래 쳐다본다.",
      QB1Select: [0, 5, 6, 11, 12],
      QB2Select: [1, 2, 3, 4, 7, 8, 9, 10],
    },
    {
      Qid: 6,
      QImg: "",
      QDialog: "이상형과 마주치고 집에 돌아가는 길에서 느낀 향기는?",
      QB1Dialog: "상큼하고 달콤한 향기",
      QB2Dialog: "비 온 뒤 자연에서 나는 향기",
      QB1Select: [1, 2, 3, 4, 7, 8, 9, 10, 11],
      QB2Select: [0, 5, 6, 12],
    },
    {
      result_count: 13,
      result_prev: "<h3>당신에게 어울리는 향수는</h3>",
      result: [
        "<h2 class='test-result-title-style style-color-0'>톰포드 오드우드</h2>",
        "<h2 class='test-result-title-style style-color-1'>조말론 피오니 앤 블러시 스웨이드</h2>",
        "<h2 class='test-result-title-style style-color-2'>조말론 잉글리쉬 페어 앤 프리지아</h2>",
        "<h2 class='test-result-title-style style-color-3'>조말론 블랙베리 앤 베이</h2>",
        "<h2 class='test-result-title-style style-color-4'>조말론 우드 세이지 앤 씨 솔트</h2>",
        "<h2 class='test-result-title-style style-color-5'>르라보 상탈 33</h2>",
        "<h2 class='test-result-title-style style-color-6'>르라보 리스 LYS 41</h2>",
        '<h2 class="test-result-title-style style-color-7">아쿠아 디 파르마 미르토 디 파나레아</h2>',
        "<h2 class='test-result-title-style style-color-8'>바이레도 블랑쉬</h2>",
        "<h2 class='test-result-title-style style-color-9'>바이레도 모하비고스트</h2>",
        "<h2 class='test-result-title-style style-color-10'>바이레도 라튤립</h2>",
        "<h2 class='test-result-title-style style-color-11'>바이레도 집시워터</h2>",
        "<h2 class='test-result-title-style style-color-12'>크리드 어벤투스</h2>",
      ],
      result_next: "</h2>",
      dialog_prev: "",
      result_dialog: [
        "<h4>#성숙한&nbsp&nbsp#샤프한&nbsp&nbsp#고급스러운&nbsp&nbsp#우디</h4>",
        "<h4>#달콤한&nbsp&nbsp#프루티&nbsp&nbsp#사과와_작약꽃&nbsp&nbsp#스웨이드</h4>",
        "<h4>#시원한&nbsp&nbsp#달콤한&nbsp&nbsp#배와_프리지아&nbsp&nbsp#머스크</h4>",
        "<h4>#블랙베리&nbsp&nbsp#깔끔한&nbsp&nbsp#달콤한&nbsp&nbsp#상큼한</h4>",
        "<h4>#모던한&nbsp&nbsp#세련된&nbsp&nbsp#잔잔한&nbsp&nbsp#해변가</h4>",
        "<h4>#고급스러운&nbsp&nbsp#포근한&nbsp&nbsp#부드러운&nbsp&nbsp#우디</h4>",
        "<h4>#바닐라&nbsp&nbsp#크리미&nbsp&nbsp#백합&nbsp&nbsp#화이트_플로럴</h4>",
        "<h4>#산토리니&nbsp&nbsp#청량한&nbsp&nbsp#살랑거리는&nbsp&nbsp#비누</h4>",
        "<h4>#런더리&nbsp&nbsp#상쾌함&nbsp&nbsp#깔끔한&nbsp&nbsp#비누</h4>",
        "<h4>#상큼한&nbsp&nbsp#은은한&nbsp&nbsp#모과와_바이올렛&nbsp&nbsp#머스크</h4>",
        "<h4>#은은한&nbsp&nbsp #화사한&nbsp&nbsp#새하얀_수건&nbsp&nbsp#튤립</h4>",
        "<h4>#아늑한&nbsp&nbsp#은은하게_달콤한&nbsp&nbsp#잔잔하게_묵직한&nbsp&nbsp#우디</h4>",
        "<h4>#묵직한&nbsp&nbsp#포근한&nbsp&nbsp#빨간_사과&nbsp&nbsp#우디&nbsp&nbsp#스모키</h4>",
      ],
      dialog_next: "",
      result_img: [
        "Tom_Ford_Oud_Wood_for_men",
        "Jo_Malone_London_Peony_&_Blush_Suede_Jo_Malone_for_women",
        "Jo_Malone_London_English_Pear_&_Freesia",
        "Jo_Malone_London_Blackberry_&_Bay_Jo_Malone_for_women",
        "Jo_Malone_London_Wood_Sage_&_Sea_Salt_Jo_Malone_for_women_and_men",
        "Le_Labo_Santal_33_Le_Labo_for_women_and_men",
        "Le_Labo_Lys_41_for_women",
        "Acqua_di_Parma_Mirto_di_Panarea_Acqua_di_Parma_for_women_and_men",
        "Byredo_Blanche_for_women",
        "Byredo_Mojave_Ghost_for_women_and_men",
        "Byredo_La_Tulipe_for_women",
        "Byredo_Gypsy_Water_for_women_and_men",
        "Creed_Aventus_Creed_for_men",
      ],
      result_link: [
        401, 349, 347, 338, 344, 110, 107, 265, 154, 152, 150, 156, 382,
      ],
    },
  ]);

  const testMessage =
    '[1,"  나와 어울리는 향수는 무엇일까?","START!","",2],[1,"","Q1","Q11",""Q12",[0,1,2,3],[4,5,6,7]],[2,"","Q2","Q21","Q22",[1,3,5,7],[0,2,4,6]],[8,"",["1","2","3","4","5","6","7","8"],"","",["1!","2!","3!","4!","5!","6!","7!","8!"],"",["","","","","","","",""],[0,0,0,0,0,0,0,0]]';
  const [page, setPage] = useState(0);
  const [point, setPoint] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [topResult, setResult] = useState([]);
  const [singlePoint, setSinglePoint] = useState(0);

  const [answer, setAnswer] = useState([
    7, 5, 7, 7, 11, 12, 3, 5, 1, 6, 1, 6, 1, 6, 1, 1, 11, 5, 8, 8, 11, 12, 3, 3,
    8, 6, 2, 9, 11, 6, 2, 2,

    7, 0, 7, 7, 5, 0, 10, 12, 9, 0, 10, 9, 10, 0, 10, 0, 4, 4, 8, 4, 11, 0, 3,
    3, 9, 0, 9, 9, 2, 0, 2, 10,
  ]);

  const clickB1 = () => {
    if (test[page].QB1Select.length > 0) {
      let temp = point;
      for (let i = 0; i < test[page].QB1Select.length; i++) {
        temp[test[page].QB1Select[i]] += 1;
      }
      setPoint(temp);
    }
    setTopValue();
    setPage(page + 1);
  };

  const clickB2 = () => {
    if (test[page].QB2Select.length > 0) {
      let temp = point;
      for (let i = 0; i < test[page].QB2Select.length; i++) {
        temp[test[page].QB2Select[i]] += 1;
      }
      setPoint(temp);
    }
    setSinglePoint(singlePoint + Math.pow(2, 6 - page));
    setTopValue();
    setPage(page + 1);
  };

  const setTopValue = () => {
    let maximum = 0;
    let answer = "";
    for (let i = 0; i < point.length; i++) {
      if (point[i] > maximum) {
        answer = `${i}`;
        maximum = point[i];
      } else if (point[i] == maximum) {
        answer = answer + "," + `${i}`;
      }
    }
    const mapping = answer.split(",");
    setResult(mapping);
  };

  const startTest = () => {
    setPage(page + 1);
  };

  const gotoPage = (perfumeId, e) => {
    navigate("/perfume/detail/" + perfumeId, { replace: true });
  };

  return (
    <div className="Test">
      <div className="test-top-bar">
        <div className="test-box">
          {0 < page ? (
            page < test[0].q_count + 1 ? (
              <>
                <img src="" />
                <h3>Q{page}.</h3>
                <div className="test-dialog-border">
                  <div className="test-dialog">{test[page].QDialog}</div>
                </div>
                <div className="test-button-box">
                  <button className="test-button-1" onClick={clickB1}>
                    {test[page].QB1Dialog}
                  </button>
                  <button className="test-button-2" onClick={clickB2}>
                    {test[page].QB2Dialog}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="test-result">
                  <div className="test-result-box">
                    <div
                      className="test-result-title"
                      dangerouslySetInnerHTML={{
                        __html: test[page].result_prev,
                      }}
                    ></div>
                  </div>
                  <div className="test-result-box canclick">
                    <div
                      className="test-result-title"
                      dangerouslySetInnerHTML={{
                        __html: test[page].result[answer[singlePoint]],
                      }}
                    ></div>
                    <div
                      className="test-result-dialog"
                      dangerouslySetInnerHTML={{
                        __html: test[page].result_dialog[answer[singlePoint]],
                      }}
                    ></div>
                    <img
                      src={`https://pecommend.com/api/v1/perfume/getimg.do/${
                        test[page].result_img[answer[singlePoint]]
                      }`}
                    />
                    <div
                      className="test-result-dialog"
                      dangerouslySetInnerHTML={{
                        __html: test[page].dialog_prev,
                      }}
                    ></div>
                    <div
                      className="test-result-dialog"
                      dangerouslySetInnerHTML={{
                        __html: test[page].dialog_next,
                      }}
                    ></div>
                  </div>
                  <div className="test-result-box">
                    <div
                      className="test-result-title"
                      dangerouslySetInnerHTML={{
                        __html: test[page].result_next,
                      }}
                    ></div>
                  </div>
                  <div className="test-result-button">
                    <button
                      className="test-share-button"
                      onClick={(e) => {
                        gotoPage(
                          test[page].result_link[answer[singlePoint]],
                          e,
                        );
                      }}
                    >
                      더 알아보기
                    </button>
                    <button
                      className="test-restart"
                      onClick={() => {
                        setPage(0);
                        setPoint([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                        setSinglePoint(0);
                      }}
                    >
                      다시하기
                    </button>
                  </div>
                </div>
              </>
            )
          ) : (
            <>
              <div className="test-main-background">
                <div className="test-main-content">
                  <div>
                    <img
                      src={`${test[0].testImg}`}
                      className="test-title-img"
                    />
                    <h4 className="test-title">
                      &nbsp;{test[0].testTitle}&nbsp;
                    </h4>
                  </div>
                  <div className="test-start-div">
                    <button className="test-start-button" onClick={startTest}>
                      {test[0].testButton}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="test-bottom-bar"></div>
    </div>
  );
}

export default Test;
