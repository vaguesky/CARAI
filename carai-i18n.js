/* CARAI bilingual (EN/KO) engine — text-match based.
   UI strings are translated; unknown text (paper titles, names) stays as-is.
   Language choice persists in localStorage and applies across all pages. */
(function () {
  'use strict';

  // English source  ->  Korean
  var DICT = {
    // ---- utility bar / chrome ----
    'Institute for Security Convergence': '안보융합원',
    'School of Computing': '전산학부',
    'Daejeon, KR': '대전, 대한민국',
    'Publications →': '연구성과 →',
    'Publications →': '연구성과 →',

    // ---- nav ----
    'About': '소개',
    'Research': '연구',
    'Groups': '연구그룹',
    'Publications': '연구성과',
    'Contact': '연락처',
    'People': '구성원',
    'Our Initiative': '설립 취지',
    'Media Coverage': '언론 보도',
    'Faculty & researchers': '교수진 및 연구원',
    'Faculty & researchers': '교수진 및 연구원',
    'Mission & roadmap': '미션 및 로드맵',
    'Mission & roadmap': '미션 및 로드맵',
    'In the press': '언론 속 CARAI',

    // ---- home hero ----
    'Center for Applied Research in Artificial Intelligence': '설명가능 인공지능 연구센터',
    'Explainable AI for reliable human–AI decisions.': '신뢰할 수 있는 인간-AI 의사결정을 위한 설명가능 인공지능.',
    'Explainable AI for reliable human–AI decisions.': '신뢰할 수 있는 인간-AI 의사결정을 위한 설명가능 인공지능.',
    'Building robust and trustworthy AI — developing the fundamentals of the technology while pursuing its advanced, wide-reaching applications.': '견고하고 신뢰할 수 있는 AI 구축 — 기술의 기초를 발전시키는 동시에 광범위한 응용을 추구합니다.',
    'Explore research': '연구 살펴보기',
    'Four research groups': '4개 연구그룹',

    // ---- common CTAs / links ----
    'Learn more': '자세히 보기',
    'Read the report': '보고서 읽기',
    'Read the article': '기사 읽기',
    'Read': '보기',
    'More on research': '연구 더 보기',
    'About the center': '센터 소개',
    'Browse all publications': '전체 연구성과 보기',
    'Get in touch': '문의하기',
    'Homepage': '홈페이지',
    'Join the team': '함께하기',
    'All news': '전체 소식',
    'All coverage': '전체 보도',

    // ---- section eyebrows / titles ----
    'Research Groups': '연구그룹',
    'Research Output': '연구 성과',
    'Our mission': '우리의 미션',
    'Mission': '미션',
    'Leadership': '리더십',
    'Principal Investigators': '실장책임연구원',
    'Investigators': '참여연구원',
    // ---- People: names ----
    'Yong Man Ro': '노용만', 'Junmo Kim': '김준모', 'Hoirin Kim': '김회린', 'Seong-Whan Lee': '이성환', 'Se-young Yun': '윤세영',
    'Seon Joo Kim': '김선주', 'Minsu Cho': '조민수', 'Chang Dong Yoo': '유창동', 'Jinwoo Shin': '신진우', 'Bohyung Han': '한보형',
    'In So Kweon': '권인소', 'Eunho Yang': '양은호', 'Seong-Ju Hwang': '황성주', 'Jaesik Choi': '최재식', 'Jung-Woo Choi': '최정우',
    'Hong Kook Kim': '김홍국', 'HyunWook Park': '박현욱', 'Jong Beom Ra': '나종범', 'Yong-Gu Lee': '이용구', 'Sungho Kim': '김성호',
    'Changick Kim': '김창익', 'Munchurl Kim': '김문철', 'Hak Gu Kim': '김학구', 'Sanghoon Sull': '설상훈', 'Chang Soo Kim': '김창수',
    'Youngchul Sung': '성영철', 'Jaekyun Moon': '문재균', 'Dong Eui Chang': '장동의', 'Gunhee Kim': '김건희', 'Byoung-Tak Zhang': '장병탁',
    'Jungwoo Lee': '이정우', 'Sungroh Yoon': '윤성로', 'Ho-Young Jung': '정호영', 'DoHyeun Kim': '김도현', 'Jonghyun Choi': '최종현',
    'Song Chong': '정송', 'Jung Uk Kim': '김정욱', 'Seong Tae Kim': '김성태',
    // ---- People: affiliations ----
    'SNU': '서울대학교', 'Korea Univ.': '고려대학교', 'KHU': '경희대학교', 'CAU': '중앙대학교', 'KNU': '경북대학교',
    'JNU': '제주대학교', 'Yonsei Univ.': '연세대학교', 'Yeungnam Univ.': '영남대학교', 'POSTECH': '포스텍', 'GIST': '광주과학기술원', 'KAIST': '한국과학기술원',
    // ---- People: roles / paragraphs ----
    'Director, CARAI · KAIST': 'CARAI KAIST 센터장',
    'Director, CARAI · Professor, KAIST': 'CARAI 센터장 · KAIST 교수',
    'A cross-disciplinary team of faculty and researchers building the theory and practice of explainable, trustworthy AI.': '설명가능하고 신뢰할 수 있는 AI의 이론과 실제를 함께 구축하는 여러 분야의 교수진과 연구원으로 이루어진 팀입니다.',
    'Research in Human-Centered Multimodal Signal Processing — building AI that perceives, reasons over, and explains multimodal signals in partnership with people.': '인간 중심 멀티모달 신호처리 연구 — 사람과 협력하여 멀티모달 신호를 인지하고 추론하며 설명하는 AI를 구축합니다.',
    'We welcome postdocs, and visiting researchers passionate about trustworthy AI.': '신뢰할 수 있는 AI에 열정을 가진 박사후연구원과 방문연구원을 환영합니다.',
    'We welcome graduate students, postdocs, and visiting researchers passionate about trustworthy AI.': '신뢰할 수 있는 AI에 열정을 가진 대학원생, 박사후연구원, 방문연구원을 환영합니다.',
    'Four groups, one mission': '4개 그룹, 하나의 미션',
    'How the groups connect': '그룹 간 연계',
    'Core research thrusts': '핵심 연구 과제',
    'Reliable decision assistance for people': '사람을 위한 신뢰할 수 있는 의사결정 지원',
    'Explainable AI provides reliable decision assistance for humans in human–AI interaction. Developing robust and trustworthy AI models is now essential for leading-edge AI technology R&D.': '설명가능 인공지능은 인간-AI 상호작용에서 사람에게 신뢰할 수 있는 의사결정 지원을 제공합니다. 견고하고 신뢰할 수 있는 AI 모델 개발은 이제 최첨단 AI 기술 R&D의 핵심입니다.',
    'Explainable AI provides reliable decision assistance for humans in human–AI interaction. Developing robust and trustworthy AI models is now essential for leading-edge AI technology R&D.': '설명가능 인공지능은 인간-AI 상호작용에서 사람에게 신뢰할 수 있는 의사결정 지원을 제공합니다. 견고하고 신뢰할 수 있는 AI 모델 개발은 이제 최첨단 AI 기술 R&D의 핵심입니다.',
    'CARAI pursues the future of AI by developing its fundamentals while seeking advanced and wide-reaching applications across four coordinated research groups.': 'CARAI는 4개 연구그룹의 유기적 협력을 통해 AI의 기초를 발전시키는 동시에 광범위한 응용을 추구하며 AI의 미래를 열어갑니다.',
    'Explainable AI for the industries of the future': '미래 산업을 위한 설명가능 인공지능',
    'The people behind CARAI': 'CARAI를 만드는 사람들',
    'Let’s talk': '함께 이야기해요',
    "Let's talk": '함께 이야기해요',
    'CARAI in the press': '언론 속 CARAI',
    'Featured': '주요 보도',
    'Latest at CARAI': 'CARAI 소식',

    // ---- group labels ----
    'Group 01 · Theory': '그룹 01 · 이론',
    'Group 02 · Multimodality': '그룹 02 · 멀티모달',
    'Group 03 · In-context Learning': '그룹 03 · 인컨텍스트 학습',
    'Group 04 · Decision Support': '그룹 04 · 의사결정 지원',
    'Explainable AI Theory': '설명가능 AI 이론',
    'Multimodal Learning & Detection': '멀티모달 학습 및 탐지',
    'Multimodal Learning & Detection': '멀티모달 학습 및 탐지',
    'Few-shot Learning in the Wild': '실환경 소량학습',
    'Decision Making & Recommendation': '의사결정 및 추천',
    'Decision Making & Recommendation': '의사결정 및 추천',

    // ---- home teasers / groups slider / quote / pubs / contact ----
    'Theoretical research on explainable AI (XAI)': '설명가능 인공지능(XAI) 이론 연구',
    'Multimodal learning and detection': '멀티모달 학습 및 탐지',
    'Learning with few data in the wild': '실환경 소량 데이터 학습',
    'AI for decision making & recommendation': 'AI 기반 의사결정 및 추천',
    'AI for decision making & recommendation': 'AI 기반 의사결정 및 추천',
    'Research groups': '연구그룹',
    'Four groups advancing the theory and application of explainable, trustworthy AI.': '설명가능하고 신뢰할 수 있는 AI의 이론과 응용을 발전시키는 4개 연구그룹.',
    'Foundational, theoretical research into what makes AI decisions interpretable and trustworthy.': 'AI의 의사결정을 해석 가능하고 신뢰할 수 있게 만드는 원리를 탐구하는 기초·이론 연구.',
    'Learning across modalities — vision, language, and signals — for robust detection and understanding.': '시각·언어·신호 등 다양한 모달리티를 아우르는 학습으로 견고한 탐지와 이해를 실현합니다.',
    'Learning from few examples in open, unconstrained real-world environments.': '개방적이고 제약 없는 실환경에서 소량의 예시만으로 학습합니다.',
    'Applying explainable AI to real decision-making and recommendation systems.': '설명가능 AI를 실제 의사결정 및 추천 시스템에 적용합니다.',
    '"Researchers of CARAI pursue the future of AI by developing the fundamentals of AI technology while seeking advanced and wide-reaching applications of AI."': '"CARAI의 연구진은 AI 기술의 기초를 발전시키는 동시에 광범위한 응용을 추구하며 AI의 미래를 열어갑니다."',
    'Globally competitive research excellence from across CARAI Center’s four groups, spanning both the theory and applications of explainable and trustworthy AI, demonstrated through publications in Top-tier AI conferences recognized by researchers worldwide, including CVPR, ICML, ICLR, AAAI, ICCV, NeurIPS, and so on.': 'CARAI 센터 4개 연구그룹의 세계적 수준의 연구 역량으로, 설명가능하고 신뢰할 수 있는 AI의 이론과 응용을 아우르며 CVPR, ICML, ICLR, AAAI, ICCV, NeurIPS 등 전 세계 연구자들이 인정하는 최상위 AI 학회 논문으로 입증됩니다.',
    'Explainable AI': '설명가능 AI',
    'Multimodal Learning': '멀티모달 학습',
    'Few-shot Learning': '소량학습(Few-shot)',
    'Recommendation': '추천',
    '335 Gwahak-ro (373-1 Guseong-dong)': '335 과학로 (373-1 구성동)',
    'Yuseong-gu, Daejeon': '대전광역시 유성구',
    'Yuseong-gu, Daejeon 34141': '대전광역시 유성구 34141',
    'Republic of Korea': '대한민국',

    // ---- contact ----
    'Address': '주소',
    'Phone': '전화',
    'Email': '이메일',
    'Send a message': '메시지 보내기',
    'Start a conversation': '대화 시작하기',
    'Name': '이름',
    'Subject': '제목',
    'Message': '메시지',
    'Send message': '메시지 전송',

    // ---- initiative ----
    'AI you can understand, and therefore trust': '이해할 수 있기에 신뢰할 수 있는 AI',
    'CARAI exists to make artificial intelligence explainable by design — advancing the fundamentals while pursuing wide-reaching, human-centered applications.': 'CARAI는 설계 단계부터 설명가능한 인공지능을 만들기 위해 존재합니다 — 기초를 발전시키는 동시에 광범위한 인간 중심 응용을 추구합니다.',
    'Explainable AI provides reliable decision assistance for humans — pursuing the future of AI by developing its fundamentals while seeking advanced, wide-reaching applications.': '설명가능 인공지능은 사람에게 신뢰할 수 있는 의사결정 지원을 제공합니다 — 기초를 발전시키는 동시에 진보적이고 광범위한 응용을 추구하며 AI의 미래를 열어갑니다.',
    'What we stand for': '우리의 지향점',
    'Transparency': '투명성',
    'Every prediction should come with a faithful, human-readable account of why.': '모든 예측에는 그 이유에 대한 충실하고 사람이 이해할 수 있는 설명이 함께해야 합니다.',
    'Trustworthiness': '신뢰성',
    'Robust, calibrated models that behave reliably under real-world shift.': '실제 환경 변화에서도 안정적으로 동작하는 견고하고 보정된 모델.',
    'Human-centered': '인간 중심',
    'AI measured by the good it does for the people who rely on it.': 'AI를 신뢰하는 사람들에게 주는 이로움으로 평가되는 AI.',
    'Impact': '임팩트',
    'Foundational theory translated into deployable, wide-reaching applications.': '기초 이론을 실제 배포 가능한 광범위한 응용으로 구현합니다.',
    'Papers': '논문',
    'AI Researchers': 'AI 연구자',
    'Founded': '설립',
    'Globally competitive research from CARAI\'s four groups — spanning the theory and applications of explainable, trustworthy AI, published at the field\'s leading venues.': 'CARAI 4개 연구그룹의 세계적 수준의 연구로, 설명가능하고 신뢰할 수 있는 AI의 이론과 응용을 아우르며 해당 분야 최상위 학회·저널에 게재되었습니다.',
    // ---- contact page ----
    'Contact Us': '문의하기',
    'Questions about our research, collaboration, or joining the team? Reach out — we’d love to hear from you.': '우리 연구, 협력, 또는 합류에 대해 궁금하신가요? 언제든 연락 주세요 — 여러분의 이야기를 기다립니다.',
    'Questions about our research, collaboration, or joining the team? Reach out — we\'d love to hear from you.': '우리 연구, 협력, 또는 합류에 대해 궁금하신가요? 언제든 연락 주세요 — 여러분의 이야기를 기다립니다.',
    'Tell us a little about your inquiry and we’ll get back to you.': '문의 내용을 조금만 알려주시면 곧 답변드리겠습니다.',
    'Tell us a little about your inquiry and we\'ll get back to you.': '문의 내용을 조금만 알려주시면 곧 답변드리겠습니다.',
    // ---- media ----
    '민들레 · Mindle News · May 2026': '민들레 · Mindle News · 2026년 5월',
    'Dec 2019': '2019년 12월',
    'Nov 2020': '2020년 11월',
    'Jun 2021': '2021년 6월',
    'Jan 2022': '2022년 1월',
    'Jul 2022': '2022년 7월',
    'Nov 2022': '2022년 11월',
    'Nov 2023': '2023년 11월',
    'Jun 2024': '2024년 6월',
    'Jul 2025': '2025년 7월',
    'Nov 2025': '2025년 11월',
    'May 2026': '2026년 5월',
    'Feb 2026': '2026년 2월',
    'Mar 2026': '2026년 3월',
    'Jan 2026': '2026년 1월',
    'Apr 2026': '2026년 4월',
    'Coverage of our research, people, and events across science and technology media.': '과학기술 매체 전반에 걸친 우리의 연구·구성원·행사에 대한 보도.',
    // ---- research ----
    'We develop XAI that keeps results accurate while making them explainable — so human experts can understand, trust, and collaborate with AI as a partner.': '우리는 결과의 정확성을 유지하면서도 설명가능하게 만드는 XAI를 개발합니다 — 인간 전문가가 AI를 이해하고 신뢰하며 파트너로서 협업할 수 있도록.',
    'Why a specialized center': '전문 연구센터가 필요한 이유',
    'As advanced science and technology converge, AI is the engine of the Fourth Industrial Revolution — and industry needs models it can actually trust.': '첨단 과학기술이 융합되는 시대, AI는 4차 산업혁명의 엔진입니다 — 그리고 산업 현장은 실제로 신뢰할 수 있는 모델을 필요로 합니다.',
    'Real-world deployment demands comprehensive analysis of diverse sensor data — audio, visual, and beyond. XAI keeps accuracy high while explaining the reasoning behind each result, enabling experts to understand, trust, and manage AI, and to work with it as a partner expert. Securing these foundational technologies is essential for Korea\'s future industries.': '실제 현장 적용에는 음향·영상 등 다양한 센서 데이터의 종합적 분석이 필요합니다. XAI는 높은 정확도를 유지하면서 각 결과의 근거를 설명하여, 전문가가 AI를 이해·신뢰·관리하고 파트너 전문가로서 협업할 수 있게 합니다. 이러한 원천기술 확보는 대한민국 미래 산업에 필수적입니다.',
    'Accurate & explainable': '정확하고 설명가능한',
    'High accuracy with detailed, faithful explanations of every result.': '모든 결과에 대한 상세하고 충실한 설명과 함께 높은 정확도를 제공합니다.',
    'Understand, trust, manage': '이해·신뢰·관리',
    'Support humans in interpreting and effectively governing AI outcomes.': '사람이 AI의 결과를 해석하고 효과적으로 관리하도록 지원합니다.',
    'AI as a partner expert': '파트너 전문가로서의 AI',
    'Collaboration between human experts and AI toward finalized judgments.': '최종 판단을 향한 인간 전문가와 AI의 협업.',
    '05 tasks': '5개 과제',
    'XAI Theory': 'XAI 이론',
    'Explainable AI (XAI) Theory': '설명가능 AI(XAI) 이론',
    'Foundational research on the learning, inference, and result-explanation of state-of-the-art deep neural networks for practical, real-world use.': '실제 활용을 위한 최첨단 심층신경망의 학습·추론·결과 설명에 관한 기초 연구.',
    'Multimodality': '멀티모달',
    'Fusion learning and recognition across the diverse sensor information — audio, visual, and more — commonly used across industrial fields.': '산업 전반에서 널리 쓰이는 음향·영상 등 다양한 센서 정보를 아우르는 융합 학습과 인식.',
    'In-context Learning': '인컨텍스트 학습',
    'Few-shot Learning in Wild': '실환경 소량학습',
    'Explainable learning where training data is scarce or absent in adverse, real-world industrial environments.': '열악한 실제 산업 환경에서 학습 데이터가 부족하거나 없는 상황의 설명가능 학습.',
    'Decision Support': '의사결정 지원',
    'Situation awareness, key-content extraction, report generation, complex decision-making, and expert interaction in complex scenarios.': '복잡한 상황에서의 상황 인식, 핵심 내용 추출, 리포트 생성, 복합 의사결정, 전문가 상호작용.',
    'Industrial Impact': '산업적 임팩트',
    'Industrial Utilization of AI Results': 'AI 성과의 산업적 활용',
    'Developing and transferring core AI technologies — XAI theory, multimodal fusion learning, few-shot learning, and decision support — to industry for practical application and national economic impact.': '핵심 AI 기술 — XAI 이론, 멀티모달 융합 학습, 소량학습, 의사결정 지원 — 을 개발하고 산업에 이전하여 실질적 활용과 국가 경제적 파급효과를 창출합니다.',
    // ---- groups ----
    'CARAI advances explainable, trustworthy AI through four coordinated research laboratories — from foundational theory to real-world decision support.': 'CARAI는 기초 이론부터 실환경 의사결정 지원까지, 유기적으로 협력하는 4개 연구실을 통해 설명가능하고 신뢰할 수 있는 AI를 발전시킵니다.',
    '01 · Theory': '01 · 이론',
    '02 · Multimodality': '02 · 멀티모달',
    '03 · In-context Learning': '03 · 인컨텍스트 학습',
    '04 · Decision Support': '04 · 의사결정 지원',
    'Objectives': '목표',
    'Understanding, certifying, and automating the reasoning of deep models.': '심층 모델의 추론을 이해하고 검증하며 자동화합니다.',
    'Recognition and detection across voice, vision, and diverse sensors.': '음성·영상 등 다양한 센서를 아우르는 인식과 탐지.',
    'Learning and adapting where labeled data is scarce or absent.': '라벨 데이터가 부족하거나 없는 환경에서의 학습과 적응.',
    'Explainable decisions and recommendations grounded in real situations.': '실제 상황에 기반한 설명가능한 의사결정과 추천.',
    'Generating visual explanations of images and inferring causality through temporal analysis of videos.': '이미지의 시각적 설명 생성과 영상의 시간적 분석을 통한 인과관계 추론.',
    'Measuring the reliability of deep learning algorithms, studying adversarial attack algorithms, and building robust explainable models resilient to those attacks.': '딥러닝 알고리즘의 신뢰성 측정, 적대적 공격 알고리즘 연구, 그리고 이에 강건한 설명가능 모델 구축.',
    'Video-based deep learning models for environmental adaptation and situation-change detection.': '환경 적응과 상황 변화 탐지를 위한 영상 기반 딥러닝 모델.',
    'Automated machine learning (AutoML) to design optimal architectures that maximize learning performance.': '학습 성능을 극대화하는 최적 구조를 설계하는 자동 기계학습(AutoML).',
    'Automated debugging techniques for deep learning.': '딥러닝을 위한 자동 디버깅 기법.',
    'Recognizing commands and speakers from a user’s voice input in adverse real-world environments.': '열악한 실제 환경에서 사용자 음성 입력으로부터 명령과 화자를 인식.',
    'Real-time deep-learning processing of varied sensor data — extracting targets, detection/identification, and tracking at scale.': '다양한 센서 데이터의 실시간 딥러닝 처리 — 대규모 표적 추출·탐지/식별·추적.',
    'Robust models resistant to adversarial information, deriving associations and causal relations among data to generate evidence for target detection.': '적대적 정보에 강건한 모델로, 데이터 간 연관성과 인과관계를 도출하여 표적 탐지의 근거를 생성.',
    'Individual- and group-level behavior recognition using multimodal sensor information.': '멀티모달 센서 정보를 활용한 개인 및 집단 수준의 행동 인식.',
    'Intelligent recognition designed for environments with limited training data.': '학습 데이터가 제한된 환경을 위한 지능형 인식.',
    'Active learning techniques for the efficient use of unclassified data.': '미분류 데이터의 효율적 활용을 위한 능동학습 기법.',
    'Situation awareness via reinforcement learning to detect anomaly signs by aggregating uncertain real-world information.': '불확실한 실환경 정보를 통합하여 이상 징후를 탐지하는 강화학습 기반 상황 인식.',
    'Generative adversarial networks to create, synthesize, and augment training data for object and environment recognition.': '객체·환경 인식을 위한 학습 데이터를 생성·합성·증강하는 생성적 적대 신경망(GAN).',
    'Automatically generating sentences that summarize and report object and action information from videos of unfolding situations.': '전개되는 상황의 영상에서 객체·행동 정보를 요약·보고하는 문장을 자동 생성.',
    'Decision-support AI that generates decision candidates and provides the reasons behind each recommendation.': '의사결정 후보를 생성하고 각 추천의 근거를 제시하는 의사결정 지원 AI.',
    'Explainable decision selection based on result prediction.': '결과 예측에 기반한 설명가능한 의사결정 선택.',
    'Reinforcement-learning algorithms that recommend optimal decisions and explain why.': '최적의 의사결정을 추천하고 그 이유를 설명하는 강화학습 알고리즘.',
    'Our four groups are not silos — they form a single, tightly-coupled research loop. Foundational theory from Group 1 hardens the models the other groups rely on, perception and learning advances flow between Groups 2 and 3, and every thread converges on Group 4 explainable decision-making. Each arrow below is a concrete hand-off of methods and results between labs.': '4개 연구그룹은 분리된 독립조직이 아니라 하나의 긴밀하게 연결된 연구 루프를 이룹니다. 그룹 1의 기초 이론이 다른 그룹이 의존하는 모델을 견고하게 하고, 인식과 학습의 성과가 그룹 2와 3 사이를 오가며, 모든 흐름이 그룹 4의 설명가능 의사결정으로 수렴합니다. 아래 각 화살표는 연구실 간 방법과 성과의 구체적인 전달을 나타냅니다.',
    'Group 1 → others': '그룹 1 → 타 그룹',
    'Trustworthy models, robust learning, and model-reliability guarantees underpin every group.': '신뢰가능 모델·강건 학습·모델 신뢰성 보장이 모든 그룹의 토대가 됩니다.',
    'Group 2 ↔ 3': '그룹 2 ↔ 3',
    'Multimodal detection, audio & action understanding, and domain-adaptive learning flow both ways.': '멀티모달 탐지, 오디오·행동 이해, 도메인 적응 학습이 양방향으로 흐릅니다.',
    'Group 3 → others': '그룹 3 → 타 그룹',
    'Few-shot data learning, detection, and data generation feed perception and decision-making.': '소량 데이터 학습·탐지·데이터 생성이 인식과 의사결정에 기여합니다.',
    'Group 4 · convergence': '그룹 4 · 수렴',
    'Scene understanding and anomaly detection converge into explainable decisions and recommendation.': '장면 이해와 이상 탐지가 설명가능한 의사결정과 추천으로 수렴합니다.',
    // ---- footer ----
    'Partnership': '협력기관',
    'Korea Advanced Institute of Science and Technology': '한국과학기술원',
    'Center': '센터',
    'Privacy': '개인정보처리방침',
    'Accessibility': '웹 접근성',
    'Terms': '이용약관'
  };

  var STORE = 'carai-lang';
  var origMap = new WeakMap(); // textNode -> original EN string
  var applied = false;

  function getLang() {
    try { return localStorage.getItem(STORE) === 'ko' ? 'ko' : 'en'; } catch (e) { return 'en'; }
  }
  function setLangStore(l) {
    try { localStorage.setItem(STORE, l); } catch (e) {}
  }

  function walkAndTranslate(toKo) {
    var body = document.body;
    if (!body) return;
    var walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        // skip script/style and explicitly skipped regions
        while (p && p !== body) {
          var tag = p.nodeName;
          if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
          if (p.hasAttribute && p.hasAttribute('data-i18n-skip')) return NodeFilter.FILTER_REJECT;
          p = p.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function (n) {
      if (toKo) {
        var raw = n.nodeValue;
        var key = raw.trim();
        if (DICT[key]) {
          if (!origMap.has(n)) origMap.set(n, raw);
          // preserve leading/trailing whitespace
          var lead = raw.match(/^\s*/)[0];
          var trail = raw.match(/\s*$/)[0];
          n.nodeValue = lead + DICT[key] + trail;
        }
      } else {
        if (origMap.has(n)) {
          n.nodeValue = origMap.get(n);
        }
      }
    });
  }

  function updateToggle(lang) {
    var btns = document.querySelectorAll('[data-lang]');
    btns.forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.style.opacity = on ? '1' : '.55';
      b.style.fontWeight = on ? '700' : '500';
      if (on) b.style.color = 'var(--brand,#3E9AD6)';
      else b.style.color = '';
    });
  }

  function apply(lang) {
    walkAndTranslate(lang === 'ko');
    document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
    document.documentElement.classList.toggle('lang-ko', lang === 'ko');
    updateToggle(lang);
  }

  function setLang(lang) {
    lang = lang === 'ko' ? 'ko' : 'en';
    apply(lang);
    setLangStore(lang);
  }

  function bind() {
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      if (b.__i18nBound) return;
      b.__i18nBound = true;
      b.style.cursor = 'pointer';
      b.addEventListener('click', function (e) {
        e.preventDefault();
        setLang(b.getAttribute('data-lang'));
      });
    });
  }

  function init() {
    bind();
    apply(getLang());
  }

  window.CARAI_setLang = setLang;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
