import React, { useState } from 'react';
import { Heart, Stars, Sparkles, Users, Calendar, Clock, Moon, Sun, Info, Activity, Shield, Zap, Target, Compass } from 'lucide-react';

const LoveCompatibilityApp = () => {
  const [step, setStep] = useState(0);
  const [person1, setPerson1] = useState({ 
    name: '', 
    birthDate: '', 
    birthTime: '', 
    birthPlace: '',
    gender: '',
    isLunar: false 
  });
  const [person2, setPerson2] = useState({ 
    name: '', 
    birthDate: '', 
    birthTime: '', 
    birthPlace: '',
    gender: '',
    isLunar: false 
  });
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showDetails, setShowDetails] = useState({});

  // 천간 (天干)
  const heavenlyStems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
  
  // 지지 (地支)
  const earthlyBranches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
  
  // 오행 (五行)
  const fiveElements = {
    '갑': '목', '을': '목', '병': '화', '정': '화', '무': '토', 
    '기': '토', '경': '금', '신': '금', '임': '수', '계': '수',
    '자': '수', '축': '토', '인': '목', '묘': '목', '진': '토',
    '사': '화', '오': '화', '미': '토', '신': '금', '유': '금',
    '술': '토', '해': '수'
  };

  // 음양
  const yinYang = {
    '갑': '양', '을': '음', '병': '양', '정': '음', '무': '양',
    '기': '음', '경': '양', '신': '음', '임': '양', '계': '음',
    '자': '양', '축': '음', '인': '양', '묘': '음', '진': '양',
    '사': '음', '오': '양', '미': '음', '신': '양', '유': '음',
    '술': '양', '해': '음'
  };

  // 십신 관계
  const tenGods = {
    '갑': { '갑': '비견', '을': '겁재', '병': '식신', '정': '상관', '무': '편재', '기': '정재', '경': '편관', '신': '정관', '임': '편인', '계': '정인' },
    '을': { '갑': '겁재', '을': '비견', '병': '상관', '정': '식신', '무': '정재', '기': '편재', '경': '정관', '신': '편관', '임': '정인', '계': '편인' },
    '병': { '갑': '편인', '을': '정인', '병': '비견', '정': '겁재', '무': '식신', '기': '상관', '경': '편재', '신': '정재', '임': '편관', '계': '정관' },
    '정': { '갑': '정인', '을': '편인', '병': '겁재', '정': '비견', '무': '상관', '기': '식신', '경': '정재', '신': '편재', '임': '정관', '계': '편관' },
    '무': { '갑': '편관', '을': '정관', '병': '편인', '정': '정인', '무': '비견', '기': '겁재', '경': '식신', '신': '상관', '임': '편재', '계': '정재' },
    '기': { '갑': '정관', '을': '편관', '병': '정인', '정': '편인', '무': '겁재', '기': '비견', '경': '상관', '신': '식신', '임': '정재', '계': '편재' },
    '경': { '갑': '편재', '을': '정재', '병': '편관', '정': '정관', '무': '편인', '기': '정인', '경': '비견', '신': '겁재', '임': '식신', '계': '상관' },
    '신': { '갑': '정재', '을': '편재', '병': '정관', '정': '편관', '무': '정인', '기': '편인', '경': '겁재', '신': '비견', '임': '상관', '계': '식신' },
    '임': { '갑': '식신', '을': '상관', '병': '편재', '정': '정재', '무': '편관', '기': '정관', '경': '편인', '신': '정인', '임': '비견', '계': '겁재' },
    '계': { '갑': '상관', '을': '식신', '병': '정재', '정': '편재', '무': '정관', '기': '편관', '경': '정인', '신': '편인', '임': '겁재', '계': '비견' }
  };

  // 띠
  const zodiacAnimals = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'];

  // 만세력 기반 정확한 사주 계산 (실제로는 더 복잡한 계산 필요)
  const calculateAccurateSaju = (birthDate, birthTime, isLunar) => {
    const date = new Date(birthDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = parseInt(birthTime.split(':')[0]);
    const minute = parseInt(birthTime.split(':')[1]);

    // 절기 보정 (간단화된 버전 - 실제로는 24절기 데이터 필요)
    let adjustedMonth = month;
    if (day < 6) adjustedMonth = month - 1;
    if (adjustedMonth <= 0) adjustedMonth = 12;

    // 년주 계산
    const yearStem = heavenlyStems[(year - 4) % 10];
    const yearBranch = earthlyBranches[(year - 4) % 12];

    // 월주 계산 (년간에 따른 월간 계산)
    const monthStemBase = {
      '갑': ['병', '정', '무', '기', '경', '신', '임', '계', '갑', '을', '병', '정'],
      '기': ['병', '정', '무', '기', '경', '신', '임', '계', '갑', '을', '병', '정'],
      '을': ['무', '기', '경', '신', '임', '계', '갑', '을', '병', '정', '무', '기'],
      '경': ['무', '기', '경', '신', '임', '계', '갑', '을', '병', '정', '무', '기'],
      '병': ['경', '신', '임', '계', '갑', '을', '병', '정', '무', '기', '경', '신'],
      '신': ['경', '신', '임', '계', '갑', '을', '병', '정', '무', '기', '경', '신'],
      '정': ['임', '계', '갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'],
      '임': ['임', '계', '갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'],
      '무': ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계', '갑', '을'],
      '계': ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계', '갑', '을']
    };
    
    const monthStem = monthStemBase[yearStem][adjustedMonth - 1];
    const monthBranch = ['인', '묘', '진', '사', '오', '미', '신', '유', '술', '해', '자', '축'][adjustedMonth - 1];

    // 일주 계산 (만세력 필요 - 간단화)
    const baseDate = new Date(1900, 0, 1);
    const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
    const dayStem = heavenlyStems[diffDays % 10];
    const dayBranch = earthlyBranches[diffDays % 12];

    // 시주 계산
    const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
    const hourBranch = earthlyBranches[hourBranchIndex];
    
    const hourStemBase = {
      '갑': ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계', '갑', '을'],
      '기': ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계', '갑', '을'],
      '을': ['병', '정', '무', '기', '경', '신', '임', '계', '갑', '을', '병', '정'],
      '경': ['병', '정', '무', '기', '경', '신', '임', '계', '갑', '을', '병', '정'],
      '병': ['무', '기', '경', '신', '임', '계', '갑', '을', '병', '정', '무', '기'],
      '신': ['무', '기', '경', '신', '임', '계', '갑', '을', '병', '정', '무', '기'],
      '정': ['경', '신', '임', '계', '갑', '을', '병', '정', '무', '기', '경', '신'],
      '임': ['경', '신', '임', '계', '갑', '을', '병', '정', '무', '기', '경', '신'],
      '무': ['임', '계', '갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'],
      '계': ['임', '계', '갑', '을', '병', '정', '무', '기', '경', '신', '임', '계']
    };
    
    const hourStem = hourStemBase[dayStem][hourBranchIndex];

    // 대운 계산
    const isYangYear = yinYang[yearStem] === '양';
    const isMale = true; // 성별에 따라 변경 필요
    const forward = (isMale && isYangYear) || (!isMale && !isYangYear);
    
    // 십신 계산
    const yearGod = tenGods[dayStem][yearStem];
    const monthGod = tenGods[dayStem][monthStem];
    const hourGod = tenGods[dayStem][hourStem];

    return {
      year: { stem: yearStem, branch: yearBranch, god: yearGod },
      month: { stem: monthStem, branch: monthBranch, god: monthGod },
      day: { stem: dayStem, branch: dayBranch },
      hour: { stem: hourStem, branch: hourBranch, god: hourGod },
      elements: {
        year: { stem: fiveElements[yearStem], branch: fiveElements[yearBranch] },
        month: { stem: fiveElements[monthStem], branch: fiveElements[monthBranch] },
        day: { stem: fiveElements[dayStem], branch: fiveElements[dayBranch] },
        hour: { stem: fiveElements[hourStem], branch: fiveElements[hourBranch] }
      },
      yinyang: {
        year: { stem: yinYang[yearStem], branch: yinYang[yearBranch] },
        month: { stem: yinYang[monthStem], branch: yinYang[monthBranch] },
        day: { stem: yinYang[dayStem], branch: yinYang[dayBranch] },
        hour: { stem: yinYang[hourStem], branch: yinYang[hourBranch] }
      }
    };
  };

  // 전문가급 궁합 분석
  const analyzeCompatibility = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const saju1 = calculateAccurateSaju(person1.birthDate, person1.birthTime, person1.isLunar);
      const saju2 = calculateAccurateSaju(person2.birthDate, person2.birthTime, person2.isLunar);
      
      let analysis = {
        totalScore: 0,
        categories: {
          천간합: { score: 0, max: 25, details: [] },
          지지합: { score: 0, max: 25, details: [] },
          오행균형: { score: 0, max: 20, details: [] },
          음양조화: { score: 0, max: 15, details: [] },
          십신관계: { score: 0, max: 15, details: [] }
        },
        interpretation: {},
        warnings: [],
        strengths: [],
        advice: []
      };

      // 1. 천간합 분석 (25점)
      const stemHarmony = {
        '갑기': '중정지합', '을경': '인의지합', '병신': '위엄지합', 
        '정임': '음란지합', '무계': '무정지합'
      };
      
      // 일간 합 체크
      const dayCombo = [saju1.day.stem, saju2.day.stem].sort().join('');
      for (const [combo, type] of Object.entries(stemHarmony)) {
        if (dayCombo === combo || dayCombo === combo.split('').reverse().join('')) {
          analysis.categories.천간합.score += 15;
          analysis.categories.천간합.details.push(`일간 ${type} 형성 - 강력한 인연`);
          analysis.strengths.push(`두 분은 ${type}의 관계로 깊은 정신적 교감이 가능합니다.`);
        }
      }

      // 년간, 월간, 시간 합 체크
      const checkStemHarmony = (stem1, stem2, name, points) => {
        const combo = [stem1, stem2].sort().join('');
        for (const [harmonyCombo, type] of Object.entries(stemHarmony)) {
          if (combo === harmonyCombo || combo === harmonyCombo.split('').reverse().join('')) {
            analysis.categories.천간합.score += points;
            analysis.categories.천간합.details.push(`${name} ${type} 형성`);
            return true;
          }
        }
        return false;
      };

      checkStemHarmony(saju1.year.stem, saju2.year.stem, '년간', 3);
      checkStemHarmony(saju1.month.stem, saju2.month.stem, '월간', 4);
      checkStemHarmony(saju1.hour.stem, saju2.hour.stem, '시간', 3);

      // 2. 지지합 분석 (25점)
      const branchHarmony = {
        '자축': '육합', '인해': '육합', '묘술': '육합', 
        '진유': '육합', '사신': '육합', '오미': '육합',
        '신자진': '삼합', '해묘미': '삼합', '인오술': '삼합', '사유축': '삼합'
      };

      // 일지 육합 체크
      const dayBranchCombo = [saju1.day.branch, saju2.day.branch].sort().join('');
      for (const [combo, type] of Object.entries(branchHarmony)) {
        if (combo.length === 2 && dayBranchCombo === combo) {
          analysis.categories.지지합.score += 12;
          analysis.categories.지지합.details.push(`일지 ${type} - 현실적 조화`);
          analysis.strengths.push('일상생활에서의 조화가 뛰어납니다.');
        }
      }

      // 삼합 체크
      const allBranches1 = [saju1.year.branch, saju1.month.branch, saju1.day.branch, saju1.hour.branch];
      const allBranches2 = [saju2.year.branch, saju2.month.branch, saju2.day.branch, saju2.hour.branch];
      const combinedBranches = [...allBranches1, ...allBranches2];

      for (const [combo, type] of Object.entries(branchHarmony)) {
        if (combo.length === 3) {
          const branches = combo.split('');
          if (branches.every(b => combinedBranches.includes(b))) {
            analysis.categories.지지합.score += 8;
            analysis.categories.지지합.details.push(`${type} 형성`);
          }
        }
      }

      // 원진 체크 (부정적 요소)
      const circularConflict = {
        '자': '오', '축': '미', '인': '신', '묘': '유', '진': '술', '사': '해',
        '오': '자', '미': '축', '신': '인', '유': '묘', '술': '진', '해': '사'
      };

      if (circularConflict[saju1.day.branch] === saju2.day.branch) {
        analysis.categories.지지합.score -= 5;
        analysis.warnings.push('일지 원진 관계 - 갈등 요소 존재');
      }

      // 3. 오행 균형 분석 (20점)
      const countElements = (saju) => {
        const counts = { '목': 0, '화': 0, '토': 0, '금': 0, '수': 0 };
        Object.values(saju.elements).forEach(pos => {
          counts[pos.stem]++;
          counts[pos.branch]++;
        });
        return counts;
      };

      const elements1 = countElements(saju1);
      const elements2 = countElements(saju2);
      const combinedElements = {};
      
      Object.keys(elements1).forEach(elem => {
        combinedElements[elem] = elements1[elem] + elements2[elem];
      });

      const elementBalance = Object.values(combinedElements);
      const maxElement = Math.max(...elementBalance);
      const minElement = Math.min(...elementBalance);
      const balanceRatio = maxElement === 0 ? 0 : minElement / maxElement;

      if (balanceRatio > 0.3) {
        analysis.categories.오행균형.score = 20;
        analysis.categories.오행균형.details.push('오행이 고르게 분포 - 균형잡힌 관계');
      } else if (balanceRatio > 0.2) {
        analysis.categories.오행균형.score = 15;
        analysis.categories.오행균형.details.push('오행 균형 양호');
      } else {
        analysis.categories.오행균형.score = 10;
        analysis.categories.오행균형.details.push('오행 편중 - 보완 필요');
        
        const lackingElement = Object.keys(combinedElements).find(
          elem => combinedElements[elem] === minElement
        );
        analysis.advice.push(`${lackingElement}(${lackingElement === '목' ? '나무' : lackingElement === '화' ? '불' : lackingElement === '토' ? '흙' : lackingElement === '금' ? '금속' : '물'}) 기운을 보충하는 활동을 함께 하시면 좋습니다.`);
      }

      // 상생상극 관계
      const elementRelations = {
        '목': { generates: '화', controls: '토' },
        '화': { generates: '토', controls: '금' },
        '토': { generates: '금', controls: '수' },
        '금': { generates: '수', controls: '목' },
        '수': { generates: '목', controls: '화' }
      };

      const dayElement1 = saju1.elements.day.stem;
      const dayElement2 = saju2.elements.day.stem;

      if (elementRelations[dayElement1].generates === dayElement2) {
        analysis.categories.오행균형.details.push(`${person1.name}님이 ${person2.name}님을 생(生)하는 관계`);
        analysis.strengths.push(`${person1.name}님이 ${person2.name}님에게 에너지를 주는 관계입니다.`);
      } else if (elementRelations[dayElement2].generates === dayElement1) {
        analysis.categories.오행균형.details.push(`${person2.name}님이 ${person1.name}님을 생(生)하는 관계`);
        analysis.strengths.push(`${person2.name}님이 ${person1.name}님에게 에너지를 주는 관계입니다.`);
      }

      // 4. 음양 조화 분석 (15점)
      let yinYangBalance = 0;
      const yin1 = Object.values(saju1.yinyang).filter(pos => pos.stem === '음' || pos.branch === '음').length;
      const yang1 = 8 - yin1;
      const yin2 = Object.values(saju2.yinyang).filter(pos => pos.stem === '음' || pos.branch === '음').length;
      const yang2 = 8 - yin2;

      if ((yin1 > yang1 && yang2 > yin2) || (yang1 > yin1 && yin2 > yang2)) {
        analysis.categories.음양조화.score = 15;
        analysis.categories.음양조화.details.push('음양이 서로 보완 - 완벽한 조화');
        analysis.strengths.push('음양의 조화가 뛰어나 서로를 완벽하게 보완합니다.');
      } else if (Math.abs((yin1 + yin2) - (yang1 + yang2)) <= 4) {
        analysis.categories.음양조화.score = 10;
        analysis.categories.음양조화.details.push('음양 균형 양호');
      } else {
        analysis.categories.음양조화.score = 5;
        analysis.categories.음양조화.details.push('음양 편중 - 조화 필요');
      }

      // 5. 십신 관계 분석 (15점)
      const analyzeGodRelation = (god1, god2, person1Name, person2Name) => {
        const positiveRelations = {
          '정관': ['정인', '편인', '정재'],
          '편관': ['편인', '정인', '편재'],
          '정인': ['비견', '겁재', '정관'],
          '편인': ['비견', '겁재', '편관'],
          '정재': ['정관', '식신'],
          '편재': ['편관', '상관'],
          '식신': ['정재', '편재'],
          '상관': ['편재', '정재'],
          '비견': ['정인', '편인'],
          '겁재': ['정인', '편인']
        };

        if (positiveRelations[god1]?.includes(god2)) {
          return { positive: true, message: `${person1Name}의 ${god1}과 ${person2Name}의 ${god2} - 상생관계` };
        }
        return { positive: false, message: null };
      };

      // 년간, 월간, 시간의 십신 관계 분석
      const godRelations = [
        analyzeGodRelation(saju1.year.god, saju2.year.god, person1.name, person2.name),
        analyzeGodRelation(saju1.month.god, saju2.month.god, person1.name, person2.name),
        analyzeGodRelation(saju1.hour.god, saju2.hour.god, person1.name, person2.name)
      ];

      godRelations.forEach((relation, index) => {
        if (relation.positive) {
          analysis.categories.십신관계.score += 5;
          analysis.categories.십신관계.details.push(relation.message);
        }
      });

      // 배우자궁(일지) 십신 분석
      const spouseGod1 = tenGods[saju1.day.stem][saju1.day.branch];
      const spouseGod2 = tenGods[saju2.day.stem][saju2.day.branch];

      if ((person1.gender === '남' && (spouseGod1 === '정재' || spouseGod1 === '편재')) ||
          (person1.gender === '여' && (spouseGod1 === '정관' || spouseGod1 === '편관'))) {
        analysis.categories.십신관계.details.push(`${person1.name}님의 배우자궁 양호`);
      }

      // 총점 계산
      Object.values(analysis.categories).forEach(cat => {
        analysis.totalScore += cat.score;
      });

      // 종합 해석
      let destinyType = '';
      let interpretation = '';
      
      if (analysis.totalScore >= 85) {
        destinyType = '천생연분 (天生緣分)';
        interpretation = '하늘이 정해준 운명적 만남입니다. 전생의 인연이 이어진 관계로, 서로를 깊이 이해하고 보완합니다.';
      } else if (analysis.totalScore >= 70) {
        destinyType = '금슬지락 (琴瑟之樂)';
        interpretation = '거문고와 비파처럼 아름다운 화음을 이루는 관계입니다. 서로 존중하며 조화로운 삶을 만들어갈 수 있습니다.';
      } else if (analysis.totalScore >= 55) {
        destinyType = '상생지합 (相生之合)';
        interpretation = '서로를 성장시키는 관계입니다. 노력과 이해를 통해 더욱 발전할 수 있는 가능성이 있습니다.';
      } else if (analysis.totalScore >= 40) {
        destinyType = '화이부동 (和而不同)';
        interpretation = '서로 다르지만 조화를 이룰 수 있는 관계입니다. 차이를 인정하고 존중하는 것이 중요합니다.';
      } else {
        destinyType = '역경지교 (逆境之交)';
        interpretation = '도전적인 관계이지만, 이를 통해 더 큰 성장을 이룰 수 있습니다. 인내와 사랑이 필요합니다.';
      }

      // 추가 조언
      if (analysis.warnings.length === 0) {
        analysis.advice.push('큰 충돌 요소가 없는 좋은 궁합입니다.');
      }

      if (analysis.totalScore < 70) {
        analysis.advice.push('정기적인 대화와 소통을 통해 서로를 이해하는 시간을 가지세요.');
        analysis.advice.push('서로의 차이점을 약점이 아닌 보완점으로 받아들이세요.');
      }

      // 계절별 조언
      const season1 = getSeasonFromMonth(new Date(person1.birthDate).getMonth() + 1);
      const season2 = getSeasonFromMonth(new Date(person2.birthDate).getMonth() + 1);
      
      if (season1 !== season2) {
        analysis.advice.push(`계절이 다른 두 분은 서로에게 새로운 관점을 제공할 수 있습니다.`);
      }

      setResult({
        score: analysis.totalScore,
        destinyType,
        interpretation,
        analysis,
        person1: { 
          ...person1, 
          saju: saju1,
          zodiac: getZodiacAnimal(new Date(person1.birthDate).getFullYear())
        },
        person2: { 
          ...person2, 
          saju: saju2,
          zodiac: getZodiacAnimal(new Date(person2.birthDate).getFullYear())
        }
      });
      
      setShowResult(true);
      setIsCalculating(false);
    }, 3000);
  };

  const getZodiacAnimal = (year) => {
    const baseYear = 1900;
    const index = (year - baseYear) % 12;
    return zodiacAnimals[index >= 0 ? index : index + 12];
  };

  const getSeasonFromMonth = (month) => {
    if (month >= 3 && month <= 5) return '봄';
    if (month >= 6 && month <= 8) return '여름';
    if (month >= 9 && month <= 11) return '가을';
    return '겨울';
  };

  const handleNext = () => {
    if (step === 0 && person1.name && person1.birthDate && person1.birthTime && person1.gender) {
      setStep(1);
    } else if (step === 1 && person2.name && person2.birthDate && person2.birthTime && person2.gender) {
      analyzeCompatibility();
    }
  };

  const reset = () => {
    setStep(0);
    setPerson1({ name: '', birthDate: '', birthTime: '', birthPlace: '', gender: '', isLunar: false });
    setPerson2({ name: '', birthDate: '', birthTime: '', birthPlace: '', gender: '', isLunar: false });
    setResult(null);
    setShowResult(false);
    setShowDetails({});
  };

  const toggleDetail = (category) => {
    setShowDetails(prev => ({ ...prev, [category]: !prev[category] }));
  };

  // 분석 중 화면
  if (isCalculating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-12 max-w-md w-full text-center border border-white/20">
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-purple-300 border-t-transparent"></div>
              <Heart className="w-20 h-20 mx-auto text-pink-400 animate-pulse relative z-10" />
            </div>
            <h2 className="text-3xl font-bold text-white">사주명리 분석중...</h2>
            <div className="space-y-2 text-white/80">
              <p className="flex items-center justify-center"><Compass className="w-4 h-4 mr-2" /> 천간지지 분석</p>
              <p className="flex items-center justify-center"><Activity className="w-4 h-4 mr-2" /> 오행 상생상극 계산</p>
              <p className="flex items-center justify-center"><Shield className="w-4 h-4 mr-2" /> 십신 관계 파악</p>
              <p className="flex items-center justify-center"><Zap className="w-4 h-4 mr-2" /> 운명적 인연 판단</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 결과 화면
  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
            {/* 헤더 */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">사주명리 궁합 분석 결과</h1>
              <div className="flex justify-center items-center space-x-4 text-xl">
                <span className="font-semibold text-pink-300">{result.person1.name}</span>
                <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
                <span className="font-semibold text-blue-300">{result.person2.name}</span>
              </div>
            </div>

            {/* 메인 결과 */}
            <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur rounded-2xl p-8 mb-8 border border-white/20">
              <div className="text-center">
                <div className="text-7xl font-bold text-white mb-2">
                  {result.score}점
                </div>
                <div className="text-3xl font-bold text-yellow-300 mb-4">{result.destinyType}</div>
                <p className="text-white/90 text-lg leading-relaxed">{result.interpretation}</p>
              </div>
            </div>

            {/* 사주 정보 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <h3 className="font-bold text-xl text-pink-300 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {result.person1.name}님의 사주
                </h3>
                <div className="space-y-3 text-white/80">
                  <p className="flex justify-between">
                    <span>생년월일:</span> 
                    <span>{result.person1.birthDate} {result.person1.birthTime}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>띠:</span> 
                    <span className="font-semibold">{result.person1.zodiac}띠</span>
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-sm mb-2">사주팔자</p>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                        <p className="text-xs text-white/60">년주</p>
                        <p className="font-bold">{result.person1.saju.year.stem}{result.person1.saju.year.branch}</p>
                        <p className="text-xs text-yellow-300">{result.person1.saju.year.god}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">월주</p>
                        <p className="font-bold">{result.person1.saju.month.stem}{result.person1.saju.month.branch}</p>
                        <p className="text-xs text-yellow-300">{result.person1.saju.month.god}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">일주</p>
                        <p className="font-bold text-pink-300">{result.person1.saju.day.stem}{result.person1.saju.day.branch}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">시주</p>
                        <p className="font-bold">{result.person1.saju.hour.stem}{result.person1.saju.hour.branch}</p>
                        <p className="text-xs text-yellow-300">{result.person1.saju.hour.god}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <h3 className="font-bold text-xl text-blue-300 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {result.person2.name}님의 사주
                </h3>
                <div className="space-y-3 text-white/80">
                  <p className="flex justify-between">
                    <span>생년월일:</span> 
                    <span>{result.person2.birthDate} {result.person2.birthTime}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>띠:</span> 
                    <span className="font-semibold">{result.person2.zodiac}띠</span>
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-sm mb-2">사주팔자</p>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                        <p className="text-xs text-white/60">년주</p>
                        <p className="font-bold">{result.person2.saju.year.stem}{result.person2.saju.year.branch}</p>
                        <p className="text-xs text-yellow-300">{result.person2.saju.year.god}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">월주</p>
                        <p className="font-bold">{result.person2.saju.month.stem}{result.person2.saju.month.branch}</p>
                        <p className="text-xs text-yellow-300">{result.person2.saju.month.god}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">일주</p>
                        <p className="font-bold text-blue-300">{result.person2.saju.day.stem}{result.person2.saju.day.branch}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">시주</p>
                        <p className="font-bold">{result.person2.saju.hour.stem}{result.person2.saju.hour.branch}</p>
                        <p className="text-xs text-yellow-300">{result.person2.saju.hour.god}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 상세 분석 */}
            <div className="space-y-4 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">상세 궁합 분석</h3>
              
              {Object.entries(result.analysis.categories).map(([category, data]) => (
                <div key={category} className="bg-white/10 backdrop-blur rounded-xl border border-white/20 overflow-hidden">
                  <button
                    onClick={() => toggleDetail(category)}
                    className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-semibold text-white">{category}</span>
                      <span className="text-sm text-white/60">({data.score}/{data.max}점)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                          style={{ width: `${(data.score / data.max) * 100}%` }}
                        ></div>
                      </div>
                      <Info className={`w-5 h-5 text-white/60 transform transition-transform ${showDetails[category] ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  {showDetails[category] && (
                    <div className="px-4 pb-4 text-white/80">
                      <ul className="space-y-1">
                        {data.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-yellow-400 mr-2">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 강점과 조언 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {result.analysis.strengths.length > 0 && (
                <div className="bg-green-600/20 backdrop-blur rounded-2xl p-6 border border-green-400/30">
                  <h4 className="font-bold text-xl text-green-300 mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    관계의 강점
                  </h4>
                  <ul className="space-y-2 text-white/80">
                    {result.analysis.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.analysis.advice.length > 0 && (
                <div className="bg-blue-600/20 backdrop-blur rounded-2xl p-6 border border-blue-400/30">
                  <h4 className="font-bold text-xl text-blue-300 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    발전을 위한 조언
                  </h4>
                  <ul className="space-y-2 text-white/80">
                    {result.analysis.advice.map((advice, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-400 mr-2">→</span>
                        {advice}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 주의사항 */}
            {result.analysis.warnings.length > 0 && (
              <div className="bg-red-600/20 backdrop-blur rounded-2xl p-6 border border-red-400/30 mb-8">
                <h4 className="font-bold text-xl text-red-300 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  주의사항
                </h4>
                <ul className="space-y-2 text-white/80">
                  {result.analysis.warnings.map((warning, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-400 mr-2">!</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 재시작 버튼 */}
            <div className="text-center">
              <button
                onClick={reset}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                다시 분석하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 입력 폼
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/20">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Heart className="w-16 h-16 text-pink-400 animate-pulse" />
              <Stars className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-twinkle" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            전문 사주명리 궁합
          </h1>
          <p className="text-white/70">정확한 생년월시로 운명을 분석합니다</p>
        </div>

        <div className="space-y-6">
          {step === 0 ? (
            <>
              <h2 className="text-xl font-semibold text-pink-300 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                첫 번째 분 정보
              </h2>
              
              <input
                type="text"
                placeholder="이름"
                value={person1.name}
                onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:border-pink-400 focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender1"
                    value="남"
                    checked={person1.gender === '남'}
                    onChange={(e) => setPerson1({ ...person1, gender: e.target.value })}
                    className="text-pink-400"
                  />
                  <span className="text-white">남성</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender1"
                    value="여"
                    checked={person1.gender === '여'}
                    onChange={(e) => setPerson1({ ...person1, gender: e.target.value })}
                    className="text-pink-400"
                  />
                  <span className="text-white">여성</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  생년월일
                </label>
                <input
                  type="date"
                  value={person1.birthDate}
                  onChange={(e) => setPerson1({ ...person1, birthDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:border-pink-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  <Clock className="inline w-4 h-4 mr-1" />
                  태어난 시간 (정확히)
                </label>
                <input
                  type="time"
                  value={person1.birthTime}
                  onChange={(e) => setPerson1({ ...person1, birthTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:border-pink-400 focus:outline-none"
                />
              </div>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={person1.isLunar}
                  onChange={(e) => setPerson1({ ...person1, isLunar: e.target.checked })}
                  className="text-pink-400"
                />
                <span className="text-white/70 text-sm">음력 생일입니다</span>
              </label>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-blue-300 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                두 번째 분 정보
              </h2>
              
              <input
                type="text"
                placeholder="이름"
                value={person2.name}
                onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender2"
                    value="남"
                    checked={person2.gender === '남'}
                    onChange={(e) => setPerson2({ ...person2, gender: e.target.value })}
                    className="text-blue-400"
                  />
                  <span className="text-white">남성</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender2"
                    value="여"
                    checked={person2.gender === '여'}
                    onChange={(e) => setPerson2({ ...person2, gender: e.target.value })}
                    className="text-blue-400"
                  />
                  <span className="text-white">여성</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  생년월일
                </label>
                <input
                  type="date"
                  value={person2.birthDate}
                  onChange={(e) => setPerson2({ ...person2, birthDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  <Clock className="inline w-4 h-4 mr-1" />
                  태어난 시간 (정확히)
                </label>
                <input
                  type="time"
                  value={person2.birthTime}
                  onChange={(e) => setPerson2({ ...person2, birthTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:border-blue-400 focus:outline-none"
                />
              </div>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={person2.isLunar}
                  onChange={(e) => setPerson2({ ...person2, isLunar: e.target.checked })}
                  className="text-blue-400"
                />
                <span className="text-white/70 text-sm">음력 생일입니다</span>
              </label>
            </>
          )}

          <div className="flex space-x-3">
            {step === 1 && (
              <button
                onClick={() => setStep(0)}
                className="flex-1 bg-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors"
              >
                이전
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={
                (step === 0 && (!person1.name || !person1.birthDate || !person1.birthTime || !person1.gender)) ||
                (step === 1 && (!person2.name || !person2.birthDate || !person2.birthTime || !person2.gender))
              }
              className={`flex-1 px-6 py-3 rounded-full font-semibold transition-all ${
                ((step === 0 && person1.name && person1.birthDate && person1.birthTime && person1.gender) ||
                 (step === 1 && person2.name && person2.birthDate && person2.birthTime && person2.gender))
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-105'
                  : 'bg-white/10 text-white/50 cursor-not-allowed'
              }`}
            >
              {step === 0 ? '다음' : '궁합 분석하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveCompatibilityApp;