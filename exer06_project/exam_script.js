const moduleSummaries = [
    "<strong>1. 웹 개요 및 Git 기초:</strong> 인터넷은 물리적인 네트워크 인프라이며, 웹(WWW)은 인터넷 상에서 동작하는 서비스 환경입니다. Git은 Commit, Branch, Merge를 통해 소스 코드 변경 이력을 관리합니다.",
    "<strong>2. HTML5 시맨틱 및 폼:</strong> 시맨틱 태그(header, nav, main, section, footer)는 웹 페이지의 구조를 명확하게 합니다. Form은 GET(URL에 데이터 노출) 또는 POST(HTTP 본문에 숨김) 방식을 사용합니다.",
    "<strong>3. CSS3 및 레이아웃:</strong> 박스 모델은 margin, border, padding, content로 구성됩니다. 자식 요소에 float를 사용할 때 부모 요소에 'overflow: hidden'을 설정하여 높이를 인식하게 합니다.",
    "<strong>4. JavaScript 및 DOM:</strong> script 태그에 'defer' 속성을 사용하면 HTML 파싱 완료 후 JS가 실행됩니다. 'document.querySelector()'로 DOM 요소를 선택하고 내용을 동적으로 변경합니다."
];

const examQuestions = [
    {
        question: "1. 강의 정의에 따르면 월드 와이드 웹(WWW)이란 무엇입니까?",
        options: [
            "컴퓨터를 연결하는 전 세계적인 물리적 네트워크 인프라",
            "인터넷을 통해 웹 페이지와 정보를 제공하고 이용하는 서비스 환경",
            "개인 기기에 설치되어 HTML/CSS를 해독하는 소프트웨어"
        ],
        answer: 1,
        explanation: "인터넷은 네트워크 인프라이며, 웹(WWW)은 인터넷 기반 위에서 동작하는 서비스 환경입니다."
    },
    {
        question: "2. Git에서 보조 브랜치(branch)의 변경 사항을 메인 브랜치로 통합할 때 사용하는 작업은?",
        options: [
            "Clone",
            "Merge",
            "Push"
        ],
        answer: 1,
        explanation: "Merge(병합)는 서로 다른 브랜치의 변경 이력을 하나로 통합하는 기능입니다."
    },
    {
        question: "3. 사용자 입력 데이터를 URL 주소창 뒤에 직접 연결하여 전송하는 HTML Form 전송 방식은?",
        options: [
            "GET 방식",
            "POST 방식",
            "PUT 방식"
        ],
        answer: 0,
        explanation: "GET 방식은 데이터를 URL에 쿼리 파라미터 형태로 노출하여 전송하고, POST 방식은 HTTP 본문 내부에 숨겨서 전송합니다."
    },
    {
        question: "4. 자식 요소에 'float' 속성을 적용했을 때 부모 요소가 자식 요소를 정상적으로 감싸도록 설정해야 하는 속성은?",
        options: [
            "display: inline",
            "position: absolute",
            "overflow: hidden"
        ],
        answer: 2,
        explanation: "자식 요소에 float를 사용하면 부모 요소가 높이를 잃기 때문에 부모에 'overflow: hidden'을 지정하여 영역을 감싸야 합니다."
    }
];

const summaryBox = document.querySelector('#module-summary');
const questionsList = document.querySelector('#questions-list');
const checkBtn = document.querySelector('#btn-check');
const retryBtn = document.querySelector('#btn-retry');
const scoreDisplay = document.querySelector('#score-display');
const statusBadge = document.querySelector('#status-badge');
const wrongExplanations = document.querySelector('#wrong-explanations');

function selectModule(index) {
    summaryBox.innerHTML = moduleSummaries[index];
}

function loadQuestions() {
    questionsList.innerHTML = '';

    for (let i = 0; i < examQuestions.length; i++) {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.id = 'q-card-' + i;

        let optionsHTML = '';
        for (let j = 0; j < examQuestions[i].options.length; j++) {
            optionsHTML += `
                <label class="option-label">
                    <input type="radio" name="q${i}" value="${j}">
                    <span>${examQuestions[i].options[j]}</span>
                </label>
            `;
        }

        card.innerHTML = `<p>${examQuestions[i].question}</p>` + optionsHTML;
        questionsList.appendChild(card);
    }
}

checkBtn.onclick = function() {
    let score = 0;
    wrongExplanations.innerHTML = '';

    for (let i = 0; i < examQuestions.length; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const card = document.querySelector('#q-card-' + i);

        if (selected && parseInt(selected.value) === examQuestions[i].answer) {
            score++;
            card.style.borderColor = 'green';
            card.style.backgroundColor = 'mintcream';
        } else {
            card.style.borderColor = 'red';
            card.style.backgroundColor = 'mistyrose';

            const wrongDiv = document.createElement('div');
            wrongDiv.className = 'wrong-item';
            const correctOptionText = examQuestions[i].options[examQuestions[i].answer];
            wrongDiv.innerHTML = `
                <strong>문항 ${i + 1} 오답 해설 (정답: ${correctOptionText})</strong>
                ${examQuestions[i].explanation}
            `;
            wrongExplanations.appendChild(wrongDiv);
        }
    }

    scoreDisplay.innerHTML = `점수: ${score} / ${examQuestions.length}`;

    if (score === examQuestions.length) {
        statusBadge.innerHTML = "<strong style='color: green;'>상태: 시험 준비 완료!</strong> 모든 문제를 정확히 맞혔습니다.";
    } else {
        statusBadge.innerHTML = `<strong style='color: red;'>상태: 복습 필요 (${examQuestions.length - score}문항 오답)</strong> 아래의 오답 해설을 확인하세요.`;
    }
};

retryBtn.onclick = function() {
    loadQuestions();
    scoreDisplay.innerHTML = `점수: 0 / ${examQuestions.length}`;
    statusBadge.innerHTML = "문제를 풀고 '정답 확인'을 클릭하면 결과와 오답 해설이 표시됩니다.";
    wrongExplanations.innerHTML = '';
};

loadQuestions();