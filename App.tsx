
import React, { useState, useEffect, useCallback } from 'react';
import { View, User, Consultant, MatchRequest, Role, Review } from './types';
import { CONSULTANTS, CATEGORIES } from './constants';
import { 
  Star, 
  MessageSquare, 
  User as UserIcon, 
  ChevronRight, 
  ArrowLeft, 
  Menu, 
  X, 
  LogOut,
  Settings,
  ShieldCheck,
  Send,
  Sparkles,
  Users,
  CheckCircle,
  Clock,
  Briefcase,
  Store,
  Award,
  FileText
} from 'lucide-react';

// --- 서브 컴포넌트 (Draftr 스타일) ---

const Button: React.FC<{ 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; 
  children: React.ReactNode; 
  className?: string; 
  icon?: React.ReactNode;
}> = ({ onClick, variant = 'primary', children, className = '', icon }) => {
  const base = "flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 text-sm active:scale-95";
  const variants = {
    primary: "bg-[#6366F1] text-white hover:bg-[#5558e3] shadow-lg shadow-indigo-200",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
  };
  
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {icon}
    </button>
  );
};

const Header: React.FC<{ 
  onMenuToggle: () => void; 
  goHome: () => void; 
  currentUser: User | null;
  onLogout: () => void;
  onMyInfo: () => void;
}> = ({ onMenuToggle, goHome, currentUser, onLogout, onMyInfo }) => (
  <header className="sticky top-0 z-50 glass-morphism py-4 px-6 md:px-12 flex justify-between items-center">
    <div className="flex items-center gap-2 cursor-pointer group" onClick={goHome}>
      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform">
        <Sparkles size={24} />
      </div>
      <div>
        <h1 className="text-xl font-bold tracking-tight">B.O 플랫폼</h1>
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-none">나도 사장이 처음이다..</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      {currentUser && (
        <button onClick={onMyInfo} className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 rounded-full transition-colors group">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <UserIcon size={16} />
          </div>
          <span className="hidden md:inline text-sm font-bold text-slate-700">
            {currentUser.name} 님
          </span>
        </button>
      )}
      <button onClick={onMenuToggle} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
        <Menu size={24} className="text-slate-700" />
      </button>
    </div>
  </header>
);

const SideMenu: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onFilter: (cat: string | null) => void;
  onLogout: () => void;
  onMyInfo: () => void;
  currentUser: User | null;
}> = ({ isOpen, onClose, onFilter, onLogout, onMyInfo, currentUser }) => (
  <>
    <div className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
    <aside className={`fixed top-0 right-0 h-full w-80 bg-white z-[70] shadow-2xl transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-bold text-slate-900">메뉴</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-all hover:rotate-90"><X size={24} /></button>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">카테고리</h3>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.name} 
                onClick={() => { onFilter(cat.name); onClose(); }} 
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 font-medium transition-all"
              >
                <span className="text-indigo-500">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">내 계정</h3>
            <button onClick={() => { onMyInfo(); onClose(); }} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors">
              <UserIcon size={18} className="text-slate-400" /> 내 정보 확인
            </button>
            {currentUser?.role === 'admin' && (
              <button onClick={() => { onFilter(null); onClose(); }} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors">
                <ShieldCheck size={18} className="text-indigo-500" /> 관리자 대시보드
              </button>
            )}
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors">
              <Settings size={18} className="text-slate-400" /> 설정
            </button>
            <button 
              onClick={() => { onLogout(); onClose(); }} 
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-600 font-medium transition-colors mt-4"
            >
              <LogOut size={18} /> 로그아웃
            </button>
          </div>
        </div>
      </div>
    </aside>
  </>
);

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-400 py-16 px-6 mt-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <Sparkles size={18} />
          </div>
          <span className="text-white font-bold text-xl">B.O</span>
        </div>
        <p className="text-sm leading-relaxed">
          소상공인과 전문가를 잇는 최적의 솔루션. 함께 성장하는 비즈니스 파트너십을 경험하세요.
        </p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">탐색하기</h4>
        <ul className="space-y-4 text-sm">
          <li>전문가 찾기</li>
          <li>전문가 등록하기</li>
          <li>성공 사례</li>
          <li>커뮤니티</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">회사 소개</h4>
        <ul className="space-y-4 text-sm">
          <li>회사소개</li>
          <li>채용</li>
          <li>개인정보처리방침</li>
          <li>이용약관</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">고객 지원</h4>
        <ul className="space-y-4 text-sm">
          <li>자주 묻는 질문</li>
          <li>문의하기</li>
          <li>공지사항</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-slate-800 mt-16 pt-8 text-xs text-center">
      © 2025 B.O Consulting Platform. All rights reserved. 나도 사장이 처음이다.
    </div>
  </footer>
);

// --- 메인 앱 컴포넌트 ---

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    { id: 'admin123', name: '마스터 관리자', role: 'admin' },
    { id: 'owner1', name: '백종원', role: 'owner', businessField: '음식' },
    { id: 'cons1', name: '김마케팅', role: 'consultant', specialty: '마케팅', intro: '10년 경력의 마케팅 전문가입니다.' }
  ]);
  const [requests, setRequests] = useState<MatchRequest[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [chatMessages, setChatMessages] = useState<{ sender: 'me' | 'other', text: string }[]>([
    { sender: 'other', text: '안녕하세요! 반갑습니다. 비즈니스의 어떤 고민을 도와드릴까요?' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const goHome = useCallback(() => {
    if (currentUser) {
      if (currentUser.role === 'admin') setView('admin');
      else setView('main');
    }
    else setView('landing');
  }, [currentUser]);

  const handleLogout = () => {
    setCurrentUser(null);
    setView('landing');
  };

  const processSignup = (name: string, id: string, role: Role, businessField?: string, specialty?: string, intro?: string) => {
    if (!name || !id) return alert("모든 필드를 입력해주세요.");
    
    const newUser: User = { 
        id, 
        name, 
        role, 
        businessField: role === 'owner' ? businessField : undefined,
        specialty: role === 'consultant' ? specialty : undefined,
        intro: role === 'consultant' ? intro : undefined
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    
    if (role === 'owner') setView('main');
    else if (role === 'admin') setView('admin');
    else {
      alert("컨설턴트 등록이 완료되었습니다!");
      setView('main');
    }
  };

  const handleApply = (consultant: Consultant) => {
    if (!currentUser) return;
    const newReq: MatchRequest = {
      id: Math.random().toString(36).substr(2, 9),
      ownerName: currentUser.name,
      consultantName: consultant.name,
      status: '대기중',
      timestamp: new Date()
    };
    setRequests(prev => [...prev, newReq]);
    alert(`${consultant.name} 전문가님께 구독 신청을 보냈습니다. 관리자 승인을 기다려주세요.`);
    setView('main');
  };

  const approveRequest = (id: string) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: '연결됨' } : req));
    alert("신청이 승인되었습니다. 컨설팅 룸이 생성되었습니다.");
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    setChatMessages(prev => [...prev, { sender: 'me', text: inputValue }]);
    setInputValue('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'other', text: '네, 좋은 질문입니다. 그 부분에 대해서는 시장 데이터 분석이 선행되어야 할 것 같습니다.' }]);
    }, 1000);
  };

  // --- 뷰 렌더링 ---

  const LandingView = () => (
    <div className="hero-gradient min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-8 border border-indigo-100 animate-bounce">
          <Sparkles size={14} /> New: AI 매칭 시스템 v2.0
        </div>
        <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
          클릭 몇 번으로 <br /><span className="text-[#6366F1]">비즈니스 고민을 해결하세요.</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mb-12 leading-relaxed">
          나도 사장이 처음이라 막막할 때, 디자인부터 재무까지 각 분야 최고 전문가와 연결되어 비즈니스를 한 단계 업그레이드 하세요.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-20">
          <Button onClick={() => setView('signup')}>지금 무료로 시작하기 <ChevronRight size={18} /></Button>
          <Button variant="secondary" onClick={() => { setCurrentUser({ id: 'admin123', name: '마스터 관리자', role: 'admin' }); setView('admin'); }}>
            <ShieldCheck size={18} /> 관리자 페이지 접속
          </Button>
        </div>

        <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white relative">
          <div className="absolute top-0 left-0 w-full h-12 bg-slate-50 flex items-center px-6 gap-2 border-b">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="ml-4 h-6 w-1/2 bg-slate-100 rounded-md" />
          </div>
          <div className="pt-16 pb-12 px-12 bg-slate-50 flex gap-8 h-96">
            <div className="w-1/4 h-full bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="w-full h-8 bg-indigo-50 rounded" />
              <div className="w-full h-8 bg-slate-50 rounded" />
              <div className="w-full h-8 bg-slate-50 rounded" />
              <div className="w-full h-8 bg-slate-50 rounded" />
            </div>
            <div className="flex-1 h-full bg-white rounded-xl shadow-sm border p-8">
              <div className="flex justify-between mb-8">
                <div className="w-1/3 h-10 bg-slate-100 rounded-lg" />
                <div className="w-24 h-10 bg-indigo-600 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200" />
                <div className="h-40 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SignupView = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [role, setRole] = useState<Role>('owner');
    const [businessField, setBusinessField] = useState('음식');
    const [specialty, setSpecialty] = useState('마케팅');
    const [intro, setIntro] = useState('');

    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-indigo-50/30">
        <div className="w-full max-w-md bg-white rounded-[3rem] p-10 shadow-xl shadow-indigo-100 border border-indigo-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-2 text-slate-900">계정 만들기</h2>
            <p className="text-slate-500">B.O 플랫폼에 오신 것을 환영합니다</p>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
              <button 
                onClick={() => setRole('owner')} 
                className={`py-3 rounded-xl text-sm font-bold transition-all ${role === 'owner' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                소상공인
              </button>
              <button 
                onClick={() => setRole('consultant')} 
                className={`py-3 rounded-xl text-sm font-bold transition-all ${role === 'consultant' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                컨설턴트
              </button>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">성함 또는 업체명</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-medium"
                placeholder="이름을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">아이디 (사용자 ID)</label>
              <input 
                type="text" 
                value={id}
                onChange={e => setId(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-medium"
                placeholder="아이디를 선택하세요"
              />
            </div>

            {role === 'owner' && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">운영중인 가게 분야</label>
                <select 
                  value={businessField}
                  onChange={e => setBusinessField(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-medium"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                  <option value="기타">기타</option>
                </select>
              </div>
            )}

            {role === 'consultant' && (
              <>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">전문 컨설팅 분야</label>
                  <select 
                    value={specialty}
                    onChange={e => setSpecialty(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-medium"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">전문가 소개 및 이력 (이력서)</label>
                  <textarea 
                    value={intro}
                    onChange={e => setIntro(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-medium h-24"
                    placeholder="경력과 강점을 간단히 적어주세요"
                  />
                </div>
              </>
            )}

            <Button className="w-full" onClick={() => processSignup(name, id, role, businessField, specialty, intro)}>계정 생성하기</Button>
            <button className="w-full text-center text-sm font-medium text-slate-400 hover:text-indigo-600 py-2 transition-colors" onClick={goHome}>취소</button>
          </div>
        </div>
      </div>
    );
  };

  const MainView = () => {
    const filtered = selectedCategory 
      ? CONSULTANTS.filter(c => c.category === selectedCategory) 
      : CONSULTANTS;

    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-2">파트너를 찾아보세요</h2>
            <p className="text-slate-500">성공적인 비즈니스를 위한 전문가 매칭</p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${!selectedCategory ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              전체 보기
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat.name ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(c => (
            <div 
              key={c.id} 
              onClick={() => { setSelectedConsultant(c); setView('detail'); }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 cursor-pointer p-3"
            >
              <div className="aspect-square rounded-[2rem] overflow-hidden relative mb-6">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-4 right-4 px-3 py-1.5 glass-morphism rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-700 border border-white/50">
                  {c.category}
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{c.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-extrabold">{c.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6 h-10 leading-relaxed font-medium">
                  {c.desc}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1">월 구독료</span>
                    <span className="text-lg font-extrabold text-slate-900">₩{c.price.toLocaleString()}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DetailView = () => {
    if (!selectedConsultant) return null;
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button onClick={() => setView('main')} className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} /> 전문가 목록으로 돌아가기
        </button>
        
        <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-12">
            <div className="w-48 h-48 rounded-[2rem] overflow-hidden shadow-2xl flex-shrink-0">
              <img src={selectedConsultant.image} alt={selectedConsultant.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left flex-1">
              <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-4 border border-indigo-100">
                {selectedConsultant.category}
              </span>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{selectedConsultant.name} 전문가</h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-slate-500">
                <div className="flex items-center gap-2">
                  <Star size={20} className="text-amber-500" fill="currentColor" />
                  <span className="font-extrabold text-slate-900 text-lg">{selectedConsultant.rating}</span>
                  <span className="text-sm font-medium">(후기 {selectedConsultant.reviews}개)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-indigo-500" />
                  <span className="text-sm font-bold text-slate-700">인증된 전문가</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">전문가 상세 소개</h3>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">
                {selectedConsultant.desc}
              </p>
              <div className="mt-8 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">구독 가격</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">프리미엄 서비스</span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-extrabold text-slate-900">₩{selectedConsultant.price.toLocaleString()}</span>
                  <span className="text-slate-500 font-bold mb-1 text-sm">/ 월</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                생생한 후기 <span className="text-sm text-slate-400 font-normal">({selectedConsultant.reviewList?.length || 0})</span>
              </h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                {selectedConsultant.reviewList?.map(rev => (
                  <div key={rev.id} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-slate-900">{rev.userName} 님</span>
                      <div className="flex text-amber-400">
                        {Array.from({length: rev.rating}).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium mb-2">{rev.comment}</p>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{rev.date}</span>
                  </div>
                ))}
                {!selectedConsultant.reviewList?.length && (
                  <p className="text-sm text-slate-400 py-8 text-center italic">작성된 후기가 아직 없습니다.</p>
                )}
              </div>
            </div>
          </div>

          <Button className="w-full py-5 text-lg shadow-indigo-100" onClick={() => handleApply(selectedConsultant)}>
            지금 전문가와 연결하기 <Sparkles size={20} />
          </Button>
        </div>
      </div>
    );
  };

  const MyInfoView = () => {
    if (!currentUser) return null;
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold mb-10 text-slate-900">내 정보 확인</h2>
        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-indigo-50 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -translate-y-12 translate-x-12 blur-3xl opacity-50" />
          <div className="flex items-center gap-8 mb-12">
            <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
              <UserIcon size={40} />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900">{currentUser.name}</h3>
              <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mt-2">
                {currentUser.role === 'owner' ? '소상공인' : currentUser.role === 'consultant' ? '컨설턴트' : '관리자'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">계정 ID</h4>
              <p className="text-lg font-bold text-slate-900">{currentUser.id}</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">계정 상태</h4>
              <p className="text-lg font-bold text-indigo-600 flex items-center gap-2">
                <CheckCircle size={20} /> 활동 중
              </p>
            </div>
            {currentUser.role === 'owner' && (
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">운영중인 분야</h4>
                    <p className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Store size={20} className="text-indigo-500" /> {currentUser.businessField}
                    </p>
                </div>
            )}
            {currentUser.role === 'consultant' && (
                <>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">전문 분야</h4>
                        <p className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Award size={20} className="text-indigo-500" /> {currentUser.specialty}
                        </p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 col-span-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">전문가 이력</h4>
                        <p className="text-md font-medium text-slate-700 whitespace-pre-wrap">{currentUser.intro}</p>
                    </div>
                </>
            )}
          </div>

          <div className="border-t border-slate-100 pt-8 flex gap-4">
            <Button variant="secondary" className="flex-1" onClick={() => setView('main')}>
              <ArrowLeft size={18} /> 대시보드로 돌아가기
            </Button>
            <Button variant="danger" className="px-10" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const AdminView = () => {
    const consultants = users.filter(u => u.role === 'consultant');
    const owners = users.filter(u => u.role === 'owner');

    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-extrabold text-slate-900">관리자 대시보드</h2>
          <div className="flex gap-3">
             <div className="px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center gap-2">
               <Users size={18} className="text-indigo-500" />
               <span className="text-sm font-bold">{users.length}명의 회원</span>
             </div>
             <div className="px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center gap-2">
               <Briefcase size={18} className="text-emerald-500" />
               <span className="text-sm font-bold">{requests.length}건의 매칭</span>
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 p-8">
              <h3 className="text-xl font-extrabold mb-6 flex items-center gap-2 text-slate-900">
                <Clock className="text-amber-500" /> 최근 컨설팅 신청 내역
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <th className="pb-4">신청자 (소상공인)</th>
                      <th className="pb-4">희망 전문가 (컨설턴트)</th>
                      <th className="pb-4">상태</th>
                      <th className="pb-4 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {requests.length === 0 ? (
                      <tr><td colSpan={4} className="py-12 text-center text-slate-400 font-bold uppercase tracking-widest opacity-50">현재 대기중인 신청이 없습니다.</td></tr>
                    ) : requests.map(req => (
                      <tr key={req.id} className="group transition-colors hover:bg-slate-50/50">
                        <td className="py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
                              {req.ownerName[0]}
                            </div>
                            <span className="font-bold text-slate-900">{req.ownerName}</span>
                          </div>
                        </td>
                        <td className="py-5 font-medium text-slate-600">{req.consultantName}</td>
                        <td className="py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${req.status === '대기중' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="py-5 text-right">
                          {req.status === '대기중' && (
                            <button 
                              onClick={() => { approveRequest(req.id); }} 
                              className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
                            >
                              승인하기
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 p-8">
              <h3 className="text-xl font-extrabold mb-6 flex items-center gap-2 text-slate-900">
                <Users className="text-indigo-500" /> 플랫폼 회원 통합 관리
              </h3>
              <div className="space-y-8">
                 <div>
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Store size={14} /> 소상공인 목록 (운영 정보)
                    </h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-slate-100">
                                <tr className="text-[10px] font-bold text-slate-400 uppercase">
                                    <th className="py-3">성함/업체명</th>
                                    <th className="py-3">운영 업종</th>
                                    <th className="py-3">계정 ID</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {owners.map(o => (
                                    <tr key={o.id}>
                                        <td className="py-3 font-bold text-slate-800">{o.name}</td>
                                        <td className="py-3">
                                            <span className="px-2 py-1 bg-slate-100 rounded-md text-[10px] font-bold text-slate-600">
                                                {o.businessField}
                                            </span>
                                        </td>
                                        <td className="py-3 text-slate-400 text-xs">{o.id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </div>

                 <div>
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Award size={14} /> 컨설턴트 목록 (전문가 이력 정보)
                    </h4>
                    <div className="space-y-4">
                       {consultants.map(c => (
                         <div key={c.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 transition-all hover:border-indigo-200">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h5 className="font-extrabold text-slate-900 text-lg">{c.name} 전문가</h5>
                                    <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[10px] font-bold uppercase mt-1">
                                        {c.specialty} 전문
                                    </span>
                                </div>
                                <span className="text-xs text-slate-400 font-medium">#{c.id}</span>
                            </div>
                            <div className="flex gap-3 bg-white p-4 rounded-xl border border-slate-100">
                                <FileText size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                                <div className="text-sm text-slate-600 leading-relaxed italic whitespace-pre-wrap">
                                    "{c.intro || '프로필 정보가 등록되지 않았습니다.'}"
                                </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-indigo-200 overflow-hidden relative">
              <Sparkles className="absolute top-0 right-0 w-24 h-24 text-white/10 -translate-y-8 translate-x-8" />
              <h3 className="text-xl font-bold mb-4">플랫폼 통계</h3>
              <div className="space-y-6 relative z-10">
                 <div>
                    <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest">활성 프로젝트</span>
                    <p className="text-3xl font-extrabold">{requests.filter(r => r.status === '연결됨').length}건 진행중</p>
                 </div>
                 <div>
                    <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest">신뢰 지수</span>
                    <p className="text-3xl font-extrabold">100% 안전</p>
                 </div>
              </div>
            </div>
            
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
              <h3 className="text-xl font-extrabold mb-6">실시간 활동 로그</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-slate-900 leading-snug">새로운 컨설턴트가 가입했습니다: 마케팅 분야</p>
                    <span className="font-bold text-slate-400 uppercase mt-1 block">방금 전</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-slate-900 leading-snug">소상공인 '백종원' 님이 전문가 목록을 조회했습니다.</p>
                    <span className="font-bold text-slate-400 uppercase mt-1 block">5분 전</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ChatView = () => (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col h-[80vh]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('main')} className="p-2 hover:bg-slate-100 rounded-full transition-all hover:-translate-x-1"><ArrowLeft size={24} /></button>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">컨설팅 세션</h2>
            <p className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest leading-none mt-1">전문가와 실시간 연결됨</p>
          </div>
        </div>
        <Button variant="secondary" onClick={() => setView('review')}>세션 종료하기</Button>
      </div>

      <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col">
        <div className="flex-1 p-8 overflow-y-auto space-y-4 bg-slate-50/50 scrollbar-hide">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-4 rounded-2xl text-sm font-medium shadow-sm leading-relaxed ${msg.sender === 'me' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-slate-900 rounded-bl-none border border-slate-100'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 bg-white border-t border-slate-50 flex gap-4 items-center">
          <input 
            type="text" 
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="전문가에게 고민을 말씀해주세요..." 
            className="flex-1 px-6 py-4 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all text-sm font-medium"
          />
          <button onClick={handleSendMessage} className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-90">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  const ReviewView = () => (
    <div className="min-h-screen flex items-center justify-center p-6 bg-indigo-50/30">
      <div className="w-full max-w-lg bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-indigo-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600" />
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
          <Sparkles size={40} />
        </div>
        <h2 className="text-3xl font-extrabold mb-4 text-slate-900">컨설팅 종료</h2>
        <p className="text-slate-500 mb-10 leading-relaxed font-medium">
          전문가와의 컨설팅은 어떠셨나요? <br />남겨주신 소중한 후기가 큰 힘이 됩니다.
        </p>
        <div className="space-y-6">
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star} className="text-amber-400 hover:scale-125 transition-transform">
                <Star size={36} fill={star <= 4 ? "currentColor" : "none"} />
              </button>
            ))}
          </div>
          <textarea 
            placeholder="성공 사례나 전문가님께 전하고 싶은 말씀을 적어주세요..." 
            className="w-full h-32 px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-400 transition-all text-sm font-medium resize-none mb-6"
          />
          <Button className="w-full py-4 text-lg" onClick={() => { alert("후기가 제출되었습니다. 감사합니다!"); goHome(); }}>후기 제출하기</Button>
          <button className="w-full text-center text-sm font-bold text-slate-400 hover:text-indigo-600 py-2 transition-colors" onClick={goHome}>다음에 하기</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/30 selection:bg-indigo-100 selection:text-indigo-900">
      {view !== 'landing' && view !== 'signup' && view !== 'review' && (
        <Header 
          onMenuToggle={() => setIsMenuOpen(true)} 
          goHome={goHome} 
          currentUser={currentUser}
          onLogout={handleLogout}
          onMyInfo={() => setView('myinfo')}
        />
      )}
      
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onFilter={(cat) => { setSelectedCategory(cat); setView('main'); }}
        onLogout={handleLogout}
        onMyInfo={() => setView('myinfo')}
        currentUser={currentUser}
      />

      <main className="animate-fade-in">
        {view === 'landing' && <LandingView />}
        {view === 'signup' && <SignupView />}
        {view === 'main' && <MainView />}
        {view === 'detail' && <DetailView />}
        {view === 'admin' && <AdminView />}
        {view === 'chat' && <ChatView />}
        {view === 'review' && <ReviewView />}
        {view === 'myinfo' && <MyInfoView />}
      </main>

      {view !== 'signup' && view !== 'review' && <Footer />}
    </div>
  );
};

export default App;
