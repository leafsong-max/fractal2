import { StepExplanation, NatureFractal, QuizQuestion, RouletteOption } from '../types';

export const STEP_EXPLANATIONS: StepExplanation[] = [
  {
    depth: 0,
    elementary: {
      title: '0단계: 커다란 색종이 삼각형',
      subTitle: '아직 아무것도 자르지 않은 온전한 정삼각형이에요!',
      description: '책상 위에 커다란 색종이 정삼각형 1장이 놓여 있어요. 아직 구멍이 하나도 뚫리지 않았죠.',
      countText: '남은 삼각형: 1개',
      triangleCountText: '1개',
      perimeterText: '처음 둘레 (1배)',
      areaText: '처음 넓이 (100% 전체)',
      analogy: '🍕 맛있는 피자 한 판이 그대로 있는 모습이에요.',
      badge: '시작!'
    },
    middle: {
      title: '0단계 (n = 0): 초기 정삼각형',
      subTitle: '기본 단위 도형 (초기 조건 설정)',
      description: '한 변의 길이가 1이고 넓이가 1인 기준 정삼각형 1개에서 시작합니다. 거듭제곱 지수 n = 0인 상태입니다.',
      triangleCountFormula: '3⁰ = 1개',
      triangleCountFormulaLatex: '3^0 = 1',
      triangleCountVal: 1,
      sideLengthFormula: '(1/2)⁰ = 1',
      sideLengthFormulaLatex: '\\left(\\frac{1}{2}\\right)^0 = 1',
      sideLengthVal: 1,
      areaFormula: '(3/4)⁰ = 1.000 (100%)',
      areaFormulaLatex: '\\left(\\frac{3}{4}\\right)^0 = 1',
      areaValPercent: '100%',
      perimeterFormula: '3 × (3/2)⁰ = 3.00',
      perimeterFormulaLatex: '3 \\times \\left(\\frac{3}{2}\\right)^0 = 3',
      perimeterVal: 3,
      mathInsight: '모든 수의 0제곱은 1입니다 (3⁰ = 1). 아직 어떤 분할도 일어나지 않은 상태입니다.'
    }
  },
  {
    depth: 1,
    elementary: {
      title: '1단계: 가운데 구멍 1개 뚫기',
      subTitle: '가운데 거꾸로 된 삼각형을 쏙 빼냈어요!',
      description: '삼각형 세 변의 정가운데(중점)를 이어서 가운데 생긴 역삼각형 1개를 빼냈어요! 주위에 작은 삼각형 3개가 남았네요.',
      countText: '남은 삼각형: 3개 (1개 × 3배)',
      triangleCountText: '3개 (1개 × 3배)',
      perimeterText: '1.5배 (1과 1/2배로 늘어남)',
      areaText: '4분의 3 (75% 남음)',
      analogy: '🪟 가운데에 삼각형 모양 창문을 하나 뚫은 셈이에요.',
      badge: '구멍 1개 뚫림'
    },
    middle: {
      title: '1단계 (n = 1): 1차 중점 연결 및 중앙 제거',
      subTitle: '변의 길이 1/2 축소, 개수 3배 증가',
      description: '정삼각형의 각 변의 중점을 연결하면 4개의 합동인 작은 정삼각형이 생깁니다. 이 중 가운데 역삼각형 1개를 제거하면 3개가 남습니다.',
      triangleCountFormula: '3¹ = 3개',
      triangleCountFormulaLatex: '3^1 = 3',
      triangleCountVal: 3,
      sideLengthFormula: '(1/2)¹ = 1/2 (0.50)',
      sideLengthFormulaLatex: '\\left(\\frac{1}{2}\\right)^1 = \\frac{1}{2}',
      sideLengthVal: 0.5,
      areaFormula: '(3/4)¹ = 3/4 = 0.75 (75%)',
      areaFormulaLatex: '\\left(\\frac{3}{4}\\right)^1 = \\frac{3}{4} = 0.75',
      areaValPercent: '75%',
      perimeterFormula: '3 × (3/2)¹ = 4.50',
      perimeterFormulaLatex: '3 \\times \\left(\\frac{3}{2}\\right)^1 = \\frac{9}{2} = 4.5',
      perimeterVal: 4.5,
      mathInsight: '전체 넓이의 1/4이 제거되어 3/4이 남았습니다. 반면 안쪽에 새로 생긴 둘레 때문에 전체 둘레는 1.5배(3/2)로 늘어납니다.'
    }
  },
  {
    depth: 2,
    elementary: {
      title: '2단계: 남은 3개에서 또 가운데 구멍 뚫기!',
      subTitle: '3개 각각에서 구멍을 뚫으니 3 × 3 = 9개가 되었어요!',
      description: '남아있던 3개의 삼각형마다 똑같이 가운데를 쏙 오려냈어요. 3개마다 각각 3개씩 남으니까 3 × 3 = 9개가 되었답니다!',
      countText: '남은 삼각형: 9개 (3개 × 3배)',
      triangleCountText: '9개 (3개 × 3배)',
      perimeterText: '2.25배 (2와 1/4배로 늘어남)',
      areaText: '16분의 9 (약 56% 남음)',
      analogy: '🌿 나뭇가지가 갈라지듯 3개씩 3배로 쑥쑥 번져가요.',
      badge: '삼각형 9개!'
    },
    middle: {
      title: '2단계 (n = 2): 2차 거듭제곱 분할',
      subTitle: '지수 법칙: 3 × 3 = 3² = 9개',
      description: '남은 3개의 정삼각형 각각에 동일한 규칙을 적용합니다. 각 삼각형마다 3개씩 분할되므로 3¹ × 3 = 3² = 9개가 됩니다.',
      triangleCountFormula: '3² = 9개',
      triangleCountFormulaLatex: '3^2 = 9',
      triangleCountVal: 9,
      sideLengthFormula: '(1/2)² = 1/4 (0.25)',
      sideLengthFormulaLatex: '\\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}',
      sideLengthVal: 0.25,
      areaFormula: '(3/4)² = 9/16 ≈ 0.563 (56.3%)',
      areaFormulaLatex: '\\left(\\frac{3}{4}\\right)^2 = \\frac{9}{16} \\approx 0.563',
      areaValPercent: '56.3%',
      perimeterFormula: '3 × (3/2)² = 6.75',
      perimeterFormulaLatex: '3 \\times \\left(\\frac{3}{2}\\right)^2 = \\frac{27}{4} = 6.75',
      perimeterVal: 6.75,
      mathInsight: '남은 개수는 거듭제곱으로 3²=9로 급증하지만, 각 삼각형의 면적은 (1/4)²으로 줄어 전체 면적은 (3/4)²가 됩니다.'
    }
  },
  {
    depth: 3,
    elementary: {
      title: '3단계: 9개에서 또 3배! 27개!',
      subTitle: '점점 더 촘촘하고 예쁜 레이스 무늬가 되어가요!',
      description: '남아있는 9개의 삼각형마다 또 가운데를 쏙쏙 오려냈어요. 9 × 3 = 27개! 무늬가 마치 예술 작품처럼 섬세해지고 있어요.',
      countText: '남은 삼각형: 27개 (9개 × 3배)',
      triangleCountText: '27개 (9개 × 3배)',
      perimeterText: '약 3.4배 (3배 넘게 길어짐)',
      areaText: '64분의 27 (약 42% 남음)',
      analogy: '❄️ 할머니가 뜨개질한 고운 레이스 식탁보 같아요.',
      badge: '삼각형 27개!'
    },
    middle: {
      title: '3단계 (n = 3): 3차 거듭제곱 전개',
      subTitle: '거듭제곱의 빠른 증가: 3³ = 27개',
      description: '남은 9개의 각 삼각형마다 1/4씩 면적이 빠져나가고 3개씩 생성됩니다. 개수는 3³ = 27개에 도달합니다.',
      triangleCountFormula: '3³ = 27개',
      triangleCountFormulaLatex: '3^3 = 27',
      triangleCountVal: 27,
      sideLengthFormula: '(1/2)³ = 1/8 (0.125)',
      sideLengthFormulaLatex: '\\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}',
      sideLengthVal: 0.125,
      areaFormula: '(3/4)³ = 27/64 ≈ 0.422 (42.2%)',
      areaFormulaLatex: '\\left(\\frac{3}{4}\\right)^3 = \\frac{27}{64} \\approx 0.422',
      areaValPercent: '42.2%',
      perimeterFormula: '3 × (3/2)³ = 10.125',
      perimeterFormulaLatex: '3 \\times \\left(\\frac{3}{2}\\right)^3 = \\frac{81}{8} = 10.125',
      perimeterVal: 10.125,
      mathInsight: '초기 둘레 3에서 이미 10.125로 3배 이상 길어졌습니다. 둘레는 매 단계마다 3/2배(1.5배)씩 계속 곱해져 거듭제곱으로 길어집니다.'
    }
  },
  {
    depth: 4,
    elementary: {
      title: '4단계: 27개가 3배! 무려 81개!',
      subTitle: '눈으로 다 세기 힘들 정도로 많아졌어요!',
      description: '27개 삼각형마다 가운데를 또 오려내니 27 × 3 = 81개! 어디를 확대해서 보아도 맨 처음 1단계 모양과 똑같은 모양이 숨어 있어요.',
      countText: '남은 삼각형: 81개 (27개 × 3배)',
      triangleCountText: '81개 (27개 × 3배)',
      perimeterText: '약 5.1배 (5배 넘게 길어짐)',
      areaText: '256분의 81 (약 32% 남음)',
      analogy: '🔍 돋보기로 일부분을 확대해도 전체 모습과 꼭 닮아있어요!',
      badge: '삼각형 81개!'
    },
    middle: {
      title: '4단계 (n = 4): 거듭제곱 n = 4 적용',
      subTitle: '3의 거듭제곱: 3⁴ = 81개',
      description: '삼각형 개수는 3⁴ = 81개로 폭발적으로 늘어납니다. 반면 한 변의 길이는 (1/2)⁴ = 1/16로 작아졌습니다.',
      triangleCountFormula: '3⁴ = 81개',
      triangleCountFormulaLatex: '3^4 = 81',
      triangleCountVal: 81,
      sideLengthFormula: '(1/2)⁴ = 1/16 (0.0625)',
      sideLengthFormulaLatex: '\\left(\\frac{1}{2}\\right)^4 = \\frac{1}{16}',
      sideLengthVal: 0.0625,
      areaFormula: '(3/4)⁴ = 81/256 ≈ 0.316 (31.6%)',
      areaFormulaLatex: '\\left(\\frac{3}{4}\\right)^4 = \\frac{81}{256} \\approx 0.316',
      areaValPercent: '31.6%',
      perimeterFormula: '3 × (3/2)⁴ = 15.188',
      perimeterFormulaLatex: '3 \\times \\left(\\frac{3}{2}\\right)^4 = \\frac{243}{16} \\approx 15.188',
      perimeterVal: 15.188,
      mathInsight: '남은 면적이 처음의 1/3 수준(31.6%)으로 줄어들었습니다. (3/4)과 같이 1보다 작은 분수를 거듭제곱할수록 값은 0에 가까워집니다.'
    }
  },
  {
    depth: 5,
    elementary: {
      title: '5단계: 81개 × 3 = 243개!',
      subTitle: '삼각형이 모여서 신비한 삼각형 그물이 되었어요.',
      description: '삼각형이 무려 243개! 점처럼 작아진 삼각형들이 서로 손을 잡고 커다란 삼각형 형태를 유지하고 있어요.',
      countText: '남은 삼각형: 243개 (81개 × 3배)',
      triangleCountText: '243개 (81개 × 3배)',
      perimeterText: '약 7.6배 (7배 넘게 길어짐)',
      areaText: '1024분의 243 (약 24% 남음)',
      analogy: '🕸️ 가볍고 튼튼한 거미줄 다리 건축물 같아요.',
      badge: '삼각형 243개!'
    },
    middle: {
      title: '5단계 (n = 5): 거듭제곱 지수 n = 5 적용',
      subTitle: '면적 감소와 둘레 증가의 뚜렷한 대비',
      description: '삼각형 개수 3⁵ = 243개. 한 변 길이는 (1/2)⁵ = 1/32. 둘레는 3 × (3/2)⁵ ≈ 22.78에 이릅니다.',
      triangleCountFormula: '3⁵ = 243개',
      triangleCountFormulaLatex: '3^5 = 243',
      triangleCountVal: 243,
      sideLengthFormula: '(1/2)⁵ = 1/32 (0.03125)',
      sideLengthFormulaLatex: '\\left(\\frac{1}{2}\\right)^5 = \\frac{1}{32}',
      sideLengthVal: 0.03125,
      areaFormula: '(3/4)⁵ ≈ 0.237 (23.7%)',
      areaFormulaLatex: '\\left(\\frac{3}{4}\\right)^5 = \\frac{243}{1024} \\approx 0.237',
      areaValPercent: '23.7%',
      perimeterFormula: '3 × (3/2)⁵ ≈ 22.781',
      perimeterFormulaLatex: '3 \\times \\left(\\frac{3}{2}\\right)^5 \\approx 22.781',
      perimeterVal: 22.781,
      mathInsight: '(3/4)의 거듭제곱은 단계가 올라갈수록 0에 가까워지고, (3/2)의 거듭제곱은 단계가 올라갈수록 엄청나게 커지는 규칙을 뚜렷이 관찰할 수 있습니다.'
    }
  },
  {
    depth: 6,
    elementary: {
      title: '6단계: 243개 × 3 = 729개!',
      subTitle: '마법처럼 환상적인 최종 프랙탈 예술!',
      description: '작은 삼각형 729개가 촘촘히 빛나요. 끝없이 자르고 잘라도 자기 자신과 똑같은 모양이 영원히 반복됩니다!',
      countText: '남은 삼각형: 729개 (243개 × 3배)',
      triangleCountText: '729개 (243개 × 3배)',
      perimeterText: '약 11.4배 (11배 넘게 길어짐)',
      areaText: '4096분의 729 (약 18% 남음, 0에 가까워짐)',
      analogy: '✨ 우주에서 가장 정교한 수학 보석 목걸이 같아요!',
      badge: '마스터 완성!'
    },
    middle: {
      title: '6단계 (n = 6): 거듭제곱으로 완성하는 프랙탈',
      subTitle: '삼각형 개수 3⁶ = 729개',
      description: '삼각형 개수 3⁶ = 729개, 면적 (3/4)⁶ ≈ 17.8%, 둘레 3 × (3/2)⁶ ≈ 34.17. 단계를 계속 반복할수록 넓이는 점점 0에 가까워지고 둘레는 끝없이 길어집니다!',
      triangleCountFormula: '3⁶ = 729개',
      triangleCountFormulaLatex: '3^6 = 729',
      triangleCountVal: 729,
      sideLengthFormula: '(1/2)⁶ = 1/64 (0.0156)',
      sideLengthFormulaLatex: '\\left(\\frac{1}{2}\\right)^6 = \\frac{1}{64}',
      sideLengthVal: 0.0156,
      areaFormula: '(3/4)⁶ ≈ 0.178 (17.8%)',
      areaFormulaLatex: '\\left(\\frac{3}{4}\\right)^6 = \\frac{729}{4096} \\approx 0.178',
      areaValPercent: '17.8%',
      perimeterFormula: '3 × (3/2)⁶ ≈ 34.172',
      perimeterFormulaLatex: '3 \\times \\left(\\frac{3}{2}\\right)^6 \\approx 34.172',
      perimeterVal: 34.172,
      mathInsight: '넓이는 계속 줄어들어 점점 0에 가까워지는데 둘레는 끝없이 길어지는 신기한 도형! 1차원 선(둘레)보다는 크고 2차원 면(넓이)보다는 작아서 차원이 약 1.585차원인 프랙탈이 됩니다.'
    }
  }
];

export const NATURE_FRACTALS: NatureFractal[] = [
  {
    id: 'romanesco',
    name: 'Romanesco Broccoli',
    koreanName: '로마네스코 브로콜리',
    descriptionElementary: '작은 봉우리 하나를 떼어내도 전체 브로콜리와 완전히 똑같은 원뿔 나선 모양이에요!',
    descriptionMiddle: '자연에서 관찰되는 가장 완벽한 3차원 프랙탈. 피보나치 수열 나선과 자기닮음이 결합되어 있습니다.',
    iconName: 'Sparkles',
    accentColor: 'from-emerald-500 to-green-600',
    fact: '작은 꽃봉오리 하나가 전체 브로콜리의 완벽한 축소판(미니어처)이에요!',
    imageUrl: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=800&q=80',
    imageSource: '사진 출처: Unsplash / Wikimedia Commons (Public Domain)',
    propertyTitle: '대표 성질: 자기닮음성 (Self-Similarity)',
    propertyDesc: '어떤 부분을 확대해 보아도 전체 모양과 꼭 닮은 형태가 끝없이 반복되는 프랙탈의 가장 핵심적인 성질입니다.'
  },
  {
    id: 'fern',
    name: 'Fern Leaf (Barnsley Fern)',
    koreanName: '고사리 잎 (양치식물)',
    descriptionElementary: '큰 고사리 잎 하나를 자세히 보면 작은 고사리 잎들이 줄지어 똑같은 모양으로 붙어있어요!',
    descriptionMiddle: '반스레이 펀(Barnsley Fern): 아핀 변환 수식 4개만으로 컴퓨터가 실제 고사리 잎과 똑같이 그려냅니다.',
    iconName: 'Leaf',
    accentColor: 'from-teal-500 to-emerald-600',
    fact: '줄기 전체의 각도와 작은 잎사귀가 뻗어 나오는 각도가 수학적으로 완벽히 일치해요.',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    imageSource: '사진 출처: Unsplash / Wikimedia Commons (CC BY-SA)',
    propertyTitle: '대표 성질: 규칙적 가지치기와 반복 (Recursion)',
    propertyDesc: '하나의 단순한 가지치기 규칙이 무한히 되풀이되면서 자연계의 놀랍도록 정교한 잎사귀와 나뭇가지를 만듭니다.'
  },
  {
    id: 'snowflake',
    name: 'Snowflake (Koch Snowflake)',
    koreanName: '눈송이 결정 (코흐 눈송이)',
    descriptionElementary: '눈꽃의 6갈래 뾰족한 가지마다 똑같은 작은 가시들이 줄줄이 대칭으로 돋아나 있어요!',
    descriptionMiddle: '삼각형 변에 계속해서 1/3 크기의 삼각형을 덧붙여 만든 프랙탈. 유한한 면적에 무한한 둘레를 갖습니다.',
    iconName: 'Snowflake',
    accentColor: 'from-sky-500 to-blue-600',
    fact: '손바닥만 한 작은 면적 속에 무한히 긴 둘레 테두리가 숨어있어요!',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    imageSource: '사진 출처: Unsplash / Wilson Bentley Collection (Public Domain)',
    propertyTitle: '대표 성질: 유한한 면적 속 무한한 둘레 (Infinite Perimeter)',
    propertyDesc: '공간은 일정하지만 테두리 둘레가 쉼 없이 꺾이고 늘어나면서 열과 에너지를 효율적으로 교환할 수 있습니다.'
  }
];

// Requirement 7: Exactly 1 Fractal Question + 1 Sierpinski Question per level!
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Elementary Questions (2 total)
  {
    id: 1,
    level: 'elementary',
    category: 'fractal',
    question: 'Q1 [프랙탈 개념]. 작은 조각을 돋보기로 아무리 확대해도 전체와 똑같은 모양이 끝없이 반복되는 성질을 무엇이라고 부를까요?',
    options: [
      '거울 뒤집기',
      '자기닮음 (Self-Similarity)',
      '뒤죽박죽 섞기',
      '네모난 바둑판'
    ],
    correctIndex: 1,
    explanation: '정답입니다! 작은 일부분이 스스로(자기)와 전체를 꼭 닮았다고 해서 "자기닮음(Self-Similarity)"이라고 불러요. 이것이 바로 신비한 프랙탈의 가장 중요한 비밀이랍니다!',
    hint: '"스스로(자기)의 모습을 쏙 빼닮았다"는 단어를 골라보세요!'
  },
  {
    id: 2,
    level: 'elementary',
    category: 'sierpinski',
    question: 'Q2 [시어핀스키 삼각형]. 시어핀스키 삼각형을 만들 때, 한 단계 진행할 때마다 남아있는 작은 삼각형의 개수는 몇 배씩 늘어날까요?',
    options: [
      '2배씩 늘어나요',
      '3배씩 늘어나요 (1개 ➔ 3개 ➔ 9개 ➔ 27개)',
      '4배씩 늘어나요',
      '늘어나지 않고 그대로예요'
    ],
    correctIndex: 1,
    explanation: '정답이에요! 남은 삼각형마다 가운데 역삼각형 구멍을 뚫으면 작은 삼각형 3개가 남기 때문에, 1개 ➔ 3개 ➔ 9개 ➔ 27개처럼 항상 3배씩 늘어나요!',
    hint: '0단계에 1개, 1단계에 3개, 2단계에 9개가 되었어요. 3을 곱해보세요!'
  },

  // Middle School Questions (2 total)
  {
    id: 3,
    level: 'middle',
    category: 'fractal',
    question: 'Q1 [프랙탈 개념]. 자연과 수학에서 관찰되는 프랙탈(Fractal)의 본질적인 특성으로 가장 알맞은 것은 무엇일까요?',
    options: [
      '어느 부분을 확대해도 매끄러운 원으로 단순화되는 성질',
      '부분의 모양을 확대해도 전체의 모습과 똑같이 닮아있는 자기닮음(Self-Similarity)',
      '면적과 둘레의 비가 항상 일정하게 정수비로 결정되는 성질',
      '반복할수록 구조가 단순해져서 결국 1차원 직선이 되는 성질'
    ],
    correctIndex: 1,
    explanation: '정답입니다! 프랙탈은 임의의 배율로 세부를 확대해도 자기 자신과 유사한 기하학적 패턴이 끝없이 반복되는 "자기닮음(Self-Similarity)"을 가장 큰 특징으로 갖습니다.',
    hint: '"스스로(자기)의 모습을 쏙 빼닮았다"는 자기닮음(Self-Similarity)을 생각해보세요.'
  },
  {
    id: 4,
    level: 'middle',
    category: 'sierpinski',
    question: 'Q2 [도전문제]. 처음 삼각형의 넓이가 81이라고 했을 때, 5단계의 남아있는 삼각형의 넓이는?',
    options: [
      '$81 \\times \\left(\\frac{3}{4}\\right)^5 = \\frac{19683}{1024}$ (약 19.22)',
      '$81 \\times \\left(\\frac{1}{4}\\right)^5 = \\frac{81}{1024}$ (약 0.08)',
      '$81 \\times \\left(\\frac{1}{2}\\right)^5 = \\frac{81}{32}$ (약 2.53)',
      '$81 \\times \\left(\\frac{2}{3}\\right)^5 = \\frac{32}{3}$ (약 10.67)'
    ],
    correctIndex: 0,
    explanation: '정답입니다! 매 단계마다 정삼각형을 4등분한 뒤 가운데 1개를 잘라내므로, 남은 삼각형들의 넓이는 이전 단계의 3/4이 됩니다. 따라서 5단계 후 남아있는 삼각형들의 총 넓이는 처음 넓이 81에 3/4을 5번 거듭제곱하여 곱한 $81 \\times \\left(\\frac{3}{4}\\right)^5 = 3^4 \\times \\frac{3^5}{4^5} = \\frac{3^9}{4^5} = \\frac{19683}{1024}$ (약 19.22)가 됩니다!',
    hint: '1단계를 거치면 4개 중 1개를 빼내므로 남은 넓이는 3/4이 됩니다. 5단계를 거치면 3/4을 5번 곱해야 해요! ($81 \\times (3/4)^5$)'
  }
];

// Requirement 8: Probability distribution for Roulette rewards
// Elementary: 3장 도움: 5%, 4장 도움: 10%, 5장 도움: 50%, 6장 도움: 35%
// Middle: 3장 도움: 20%, 4장 도움: 30%, 5장 도움: 30%, 6장 도움: 20%
export const ROULETTE_OPTIONS: RouletteOption[] = [
  {
    id: '3장 도움',
    label: '3장 도움',
    elementaryProb: 0.05,
    middleProb: 0.20,
    color: '#3b82f6',      // Blue
    textColor: '#ffffff',
    accentBg: 'bg-blue-50 border-blue-200 text-blue-900',
    description: '프랙탈 피라미드 8장 중 3장 도움'
  },
  {
    id: '4장 도움',
    label: '4장 도움',
    elementaryProb: 0.10,
    middleProb: 0.30,
    color: '#10b981',      // Emerald
    textColor: '#ffffff',
    accentBg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    description: '프랙탈 피라미드 8장 중 4장 도움'
  },
  {
    id: '5장 도움',
    label: '5장 도움',
    elementaryProb: 0.50,
    middleProb: 0.30,
    color: '#f59e0b',      // Amber
    textColor: '#0f172a',
    accentBg: 'bg-amber-50 border-amber-200 text-amber-950',
    description: '프랙탈 피라미드 8장 중 5장 도움'
  },
  {
    id: '6장 도움',
    label: '6장 도움',
    elementaryProb: 0.35,
    middleProb: 0.20,
    color: '#8b5cf6',      // Purple
    textColor: '#ffffff',
    accentBg: 'bg-purple-50 border-purple-200 text-purple-900',
    description: '프랙탈 피라미드 8장 중 6장 도움'
  }
];

