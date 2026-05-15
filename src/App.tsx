import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  Clipboard,
  Copy,
  ExternalLink,
  FileText,
  Layers,
  Mail,
  Target,
  X,
} from 'lucide-react';
import categoriesData from './data/categories.json';
import portfolioData from './data/portfolio.json';
import type { Category, LaunchTarget, PortfolioItem } from './types/portfolio';

const categories = (categoriesData as Category[]).slice().sort((a, b) => a.order - b.order);
const portfolio = (portfolioData as PortfolioItem[]).slice().sort((a, b) => a.order - b.order);
const maxVisiblePortfolioCards = 6;

const navItems = [
  { id: 'intro', label: '소개' },
  { id: 'portfolio', label: '포트폴리오' },
  { id: 'skills', label: '역량' },
  { id: 'contact', label: '연락' },
];

const skills = [
  {
    title: '시스템 설계',
    description: '전투, 성장, 보상 흐름을 규칙과 예외 케이스까지 문서화합니다.',
    icon: Layers,
  },
  {
    title: '콘텐츠 구조화',
    description: '목표, 반복 동기, 보상 단계를 분리해 운영 가능한 콘텐츠를 설계합니다.',
    icon: BookOpen,
  },
  {
    title: '라이브 서비스 분석',
    description: '지표 변화에서 문제 가설을 세우고 대응 우선순위를 정리합니다.',
    icon: Target,
  },
  {
    title: 'UX/UI 개선',
    description: '반복 사용 화면의 정보량, 터치 흐름, 피드백 상태를 개선합니다.',
    icon: Clipboard,
  },
  {
    title: '문서화 능력',
    description: '개발, 아트, 운영이 같은 기준으로 확인할 수 있는 기획서를 작성합니다.',
    icon: FileText,
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function App() {
  const [activeSection, setActiveSection] = useState(navItems[0].id);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isPortfolioExpanded, setIsPortfolioExpanded] = useState(false);
  const [launchTarget, setLaunchTarget] = useState<LaunchTarget | null>(null);
  const [copyState, setCopyState] = useState('복사');

  const stats = useMemo(
    () => ({
      documents: portfolio.filter((item) => item.pdfUrl).length,
      games: portfolio.filter((item) => item.categoryId === 'game').length,
      prototypes: portfolio.filter((item) => item.categoryId === 'prototype').length,
    }),
    [],
  );

  const filteredPortfolio = useMemo(() => {
    if (activeCategory === 'all') {
      return portfolio;
    }

    return portfolio.filter((item) => item.categoryId === activeCategory);
  }, [activeCategory]);

  const visiblePortfolio = useMemo(() => {
    if (isPortfolioExpanded) {
      return filteredPortfolio;
    }

    return filteredPortfolio.slice(0, maxVisiblePortfolioCards);
  }, [filteredPortfolio, isPortfolioExpanded]);

  const showPortfolioToggle = filteredPortfolio.length > maxVisiblePortfolioCards;

  const changeCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setIsPortfolioExpanded(false);
  };

  useEffect(() => {
    const syncActiveSection = () => {
      const headerHeight = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 0;
      const probeY = window.scrollY + headerHeight + 28;
      const current =
        navItems
          .map((item) => document.getElementById(item.id))
          .filter((section): section is HTMLElement => Boolean(section))
          .filter((section) => section.offsetTop <= probeY)
          .sort((a, b) => b.offsetTop - a.offsetTop)[0]?.id ?? navItems[0].id;

      setActiveSection(current);
    };

    syncActiveSection();
    window.addEventListener('scroll', syncActiveSection, { passive: true });
    window.addEventListener('resize', syncActiveSection);

    return () => {
      window.removeEventListener('scroll', syncActiveSection);
      window.removeEventListener('resize', syncActiveSection);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLaunchTarget(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText('rkalf00@gmail.com');
    setCopyState('완료');
    window.setTimeout(() => setCopyState('복사'), 1600);
  };

  return (
    <>
      <header className="site-header">
        <a
          className="brand"
          href="#intro"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection('intro');
          }}
        >
          <span className="brand-mark">GP</span>
          <span>포트폴리오</span>
        </a>
        <nav aria-label="주요 메뉴">
          {navItems.map((item) => (
            <button
              className={activeSection === item.id ? 'nav-link active' : 'nav-link'}
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero section" id="intro">
          <div className="hero-copy">
            <p className="eyebrow">Game System · UX · Prototype</p>
            <h1>플레이 흐름을 분석하고 실행 가능한 형태로 검증하는 게임 기획자</h1>
            <p className="hero-lead">
              잠금 시스템, 보상 제한, 콘텐츠 진입, 재화 소모 UX처럼 플레이어의 선택과 행동에 직접 닿는 구조를
              분석합니다. 기획서는 규칙과 예외, 의도와 리스크까지 문서화하고, HTML 프로토타입과 WebGL 게임으로
              화면 흐름과 조작 피드백을 직접 확인할 수 있게 만듭니다.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => scrollToSection('portfolio')} type="button">
                <FileText size={18} />
                포트폴리오 보기
              </button>
              <button className="secondary-button" onClick={() => scrollToSection('contact')} type="button">
                <Mail size={18} />
                연락하기
              </button>
            </div>
          </div>
          <div className="hero-panel" aria-label="포트폴리오 현황">
            <div>
              <span className="stat-number">{stats.documents}</span>
              <span className="stat-label">기획서</span>
            </div>
            <div>
              <span className="stat-number">{stats.games}</span>
              <span className="stat-label">실행형 게임</span>
            </div>
            <div>
              <span className="stat-number">{stats.prototypes}</span>
              <span className="stat-label">HTML 프로토타입</span>
            </div>
          </div>
        </section>

        <section className="section" id="portfolio">
          <div className="section-heading portfolio-heading">
            <div>
              <p className="eyebrow">Projects</p>
              <h2>포트폴리오</h2>
            </div>
          </div>

          <div className="tabs" role="tablist" aria-label="포트폴리오 카테고리">
            <button
              className={activeCategory === 'all' ? 'tab active' : 'tab'}
              onClick={() => changeCategory('all')}
              role="tab"
              type="button"
            >
              전체
            </button>
            {categories.map((category) => (
              <button
                className={activeCategory === category.id ? 'tab active' : 'tab'}
                key={category.id}
                onClick={() => changeCategory(category.id)}
                role="tab"
                type="button"
              >
                {category.name}
              </button>
            ))}
          </div>

          <motion.div className="portfolio-grid" layout>
            <AnimatePresence mode="popLayout">
              {visiblePortfolio.map((item) => (
                <PortfolioCard
                  item={item}
                  key={item.id}
                  onLaunch={(target) => setLaunchTarget(target)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {showPortfolioToggle && (
            <div className="portfolio-more">
              <button
                className="secondary-button"
                onClick={() => setIsPortfolioExpanded((current) => !current)}
                type="button"
              >
                {isPortfolioExpanded ? '접기' : '전체 보기'}
              </button>
            </div>
          )}
        </section>

        <section className="section" id="skills">
          <div className="section-heading">
            <p className="eyebrow">Capabilities</p>
            <h2>실무형 기획 역량</h2>
          </div>
          <div className="skill-grid">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.article
                  className="skill-card"
                  initial={{ opacity: 0, y: 14 }}
                  key={skill.title}
                  transition={{ delay: index * 0.04 }}
                  viewport={{ once: true, amount: 0.35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Icon aria-hidden="true" size={24} />
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="contact section" id="contact">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>게임 기획 포지션과 관련된 문의는 아래 이메일로 연락 부탁드립니다.</h2>
            <a className="email-link" href="mailto:rkalf00@gmail.com">
              rkalf00@gmail.com
            </a>
          </div>
          <div className="contact-actions">
            <button className="secondary-button" onClick={copyEmail} type="button">
              <Copy size={18} />
              이메일 {copyState}
            </button>
            <a className="primary-button" href="mailto:rkalf00@gmail.com">
              <Mail size={18} />
              메일 보내기
            </a>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {launchTarget && (
          <motion.div
            animate={{ opacity: 1 }}
            className="modal-backdrop"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${launchTarget.title} 실행 미리보기`}
          >
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              className="modal"
              exit={{ y: 16, opacity: 0 }}
              initial={{ y: 16, opacity: 0 }}
            >
              <div className="modal-bar">
                <div>
                  <span>{launchTarget.kind === 'webgl' ? 'Unity WebGL' : 'HTML Prototype'}</span>
                  <strong>{launchTarget.title}</strong>
                </div>
                <div className="modal-actions">
                  <a className="icon-button" href={launchTarget.url} target="_blank" rel="noreferrer" aria-label="새 탭 열기">
                    <ExternalLink size={20} />
                  </a>
                  <button className="icon-button" onClick={() => setLaunchTarget(null)} type="button" aria-label="닫기">
                    <X size={22} />
                  </button>
                </div>
              </div>
              <iframe src={launchTarget.url} title={launchTarget.title} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface PortfolioCardProps {
  item: PortfolioItem;
  onLaunch: (target: LaunchTarget) => void;
}

function PortfolioCard({ item, onLaunch }: PortfolioCardProps) {
  const openConnectedTarget = () => {
    if (item.webglUrl) {
      onLaunch({ title: item.title, url: item.webglUrl, kind: 'webgl' });
      return;
    }

    if (item.prototypeUrl) {
      onLaunch({ title: item.title, url: item.prototypeUrl, kind: 'prototype' });
      return;
    }

    if (item.pdfUrl) {
      window.open(item.pdfUrl, '_blank', 'noreferrer');
    }
  };

  return (
    <motion.article className="portfolio-card" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button className="card-main" onClick={openConnectedTarget} type="button">
        <img src={item.thumbnailUrl} alt="" loading="lazy" />
        <span className="card-category">{categories.find((category) => category.id === item.categoryId)?.name}</span>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
      </button>
      <div className="card-actions">
        {item.pdfUrl && (
          <a className="small-action" href={item.pdfUrl} target="_blank" rel="noreferrer">
            <FileText size={16} />
            PDF
          </a>
        )}
        {item.webglUrl && (
          <button
            className="small-action"
            onClick={() => onLaunch({ title: item.title, url: item.webglUrl!, kind: 'webgl' })}
            type="button"
          >
            <ArrowUpRight size={16} />
            WEBGL
          </button>
        )}
        {item.prototypeUrl && (
          <button
            className="small-action"
            onClick={() => onLaunch({ title: item.title, url: item.prototypeUrl!, kind: 'prototype' })}
            type="button"
          >
            <ArrowUpRight size={16} />
            실행
          </button>
        )}
      </div>
      <div className="card-detail">
        <div>
          <h4>기획 의도</h4>
          {item.intention.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default App;

