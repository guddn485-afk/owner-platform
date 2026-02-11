
import React from 'react';
import { Consultant } from './types';
import { Layout, LineChart, Palette, Code, Utensils, Home } from 'lucide-react';

const MOCK_REVIEWS = [
  { id: '1', userName: '박사장', rating: 5, comment: '정말 많은 도움이 되었습니다. 매출이 실제로 150% 올랐어요!', date: '2025-01-15' },
  { id: '2', userName: '최대표', rating: 4, comment: '전문적인 조언 덕분에 막혔던 부분이 시원하게 해결됐습니다.', date: '2024-12-20' },
  { id: '3', userName: '이창업', rating: 5, comment: '초보 사장님들에게 강력 추천합니다.', date: '2025-02-01' }
];

export const CONSULTANTS: Consultant[] = [
  { 
    id: 1, 
    name: "김마케팅", 
    category: "마케팅", 
    price: 300000, 
    desc: "10년 경력의 퍼포먼스 마케팅 전문가. 당신의 매출을 200% 성장시켜 드립니다.", 
    rating: 4.5, 
    reviews: 124,
    image: "https://picsum.photos/seed/mkt/400/400",
    reviewList: [...MOCK_REVIEWS]
  },
  { 
    id: 2, 
    name: "이재무", 
    category: "재무관리", 
    price: 500000, 
    desc: "스타트업 전문 세무/회계 파트너. 복잡한 장부 관리를 명쾌하게 해결합니다.", 
    rating: 4.8, 
    reviews: 89,
    image: "https://picsum.photos/seed/fin/400/400",
    reviewList: [...MOCK_REVIEWS]
  },
  { 
    id: 3, 
    name: "박디자인", 
    category: "홍보/디자인", 
    price: 250000, 
    desc: "브랜드의 가치를 시각적으로 완성합니다. 로고부터 상세페이지까지 완벽하게.", 
    rating: 4.2, 
    reviews: 56,
    image: "https://picsum.photos/seed/dsgn/400/400",
    reviewList: [...MOCK_REVIEWS]
  },
  { 
    id: 4, 
    name: "최셰프", 
    category: "음식", 
    price: 400000, 
    desc: "주방 시스템 개선 및 메뉴 개발 전문가. 성공하는 식당의 비밀을 전수합니다.", 
    rating: 4.9, 
    reviews: 210,
    image: "https://picsum.photos/seed/chef/400/400",
    reviewList: [...MOCK_REVIEWS]
  },
  { 
    id: 5, 
    name: "정개발", 
    category: "웹사이트/어플 제작", 
    price: 600000, 
    desc: "모바일에 최적화된 비즈니스 솔루션을 구축합니다.", 
    rating: 4.7, 
    reviews: 42,
    image: "https://picsum.photos/seed/dev/400/400",
    reviewList: [...MOCK_REVIEWS]
  },
  { 
    id: 6, 
    name: "한공간", 
    category: "공간 디자인", 
    price: 450000, 
    desc: "매장을 방문하고 싶게 만드는 공간의 마법을 부려드립니다.", 
    rating: 4.6, 
    reviews: 33,
    image: "https://picsum.photos/seed/space/400/400",
    reviewList: [...MOCK_REVIEWS]
  }
];

export const CATEGORIES = [
  { name: '마케팅', icon: <LineChart size={18} /> },
  { name: '재무관리', icon: <Layout size={18} /> },
  { name: '홍보/디자인', icon: <Palette size={18} /> },
  { name: '웹사이트/어플 제작', icon: <Code size={18} /> },
  { name: '음식', icon: <Utensils size={18} /> },
  { name: '공간 디자인', icon: <Home size={18} /> }
];
