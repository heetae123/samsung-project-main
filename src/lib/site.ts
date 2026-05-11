export const siteConfig = {
  name: '삼성시스텍',
  domainLabel: 'HOTEL SYSTEMS',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://samsungsystec.kr',
  phone: '1644-0000',
  email: 'contact@samsungsystec.kr',
  description:
    '삼성시스텍의 호텔 자동화, TV/B2B가전, 설치사례, 고객지원, 회원몰을 소개하는 SEO 중심 사이트입니다. 객실관리 시스템 국내형·유럽형, 호텔락 시스템 국내형·유럽형·QR·키리스, 운영관리 프로그램, 무인 키오스크, 무인 관제 서비스, 기타 자재까지 한 번에 확인할 수 있습니다.',
};

export type NavItem = {
  label: string;
  href: string;
};

export type MetricItem = {
  label: string;
  value: string;
  detail: string;
};

export type CapabilityItem = {
  title: string;
  description: string;
  href: string;
};

export type ProductItem = {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  useCases: string[];
};

export type StepItem = {
  step: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ShowcaseLinkItem = {
  label: string;
  title: string;
  description: string;
  href: string;
};

export type ServicePackageItem = {
  title: string;
  description: string;
  href: string;
  items: string[];
};

export type TvB2bProductItem = {
  name: string;
  summary: string;
  highlights: string[];
};

export type TvB2bCategoryItem = {
  slug: string;
  label: string;
  title: string;
  description: string;
  href: string;
  items: string[];
  supportNote: string;
  products: TvB2bProductItem[];
};

export type InstallationCaseItem = {
  propertyType: string;
  title: string;
  location: string;
  summary: string;
  image: string;
  imageAlt: string;
  systems: string[];
  outcomes: string[];
};

export type CommunityEntryItem = {
  category: string;
  title: string;
  excerpt: string;
  href: string;
  ctaLabel: string;
};

export type SupportChannelItem = {
  title: string;
  description: string;
  href: string;
  details: string[];
};

export type MemberBenefitItem = {
  title: string;
  description: string;
};

export type MemberDealItem = {
  badge: string;
  title: string;
  regularPrice: string;
  memberPrice: string;
  note: string;
  items: string[];
};

export const navItems: NavItem[] = [
  { label: '제품·서비스', href: '/products' },
  { label: 'TV/B2B가전', href: '/tv-b2b' },
  { label: '설치사례', href: '/installations' },
  { label: '커뮤니티', href: '/community' },
  { label: '고객지원', href: '/support' },
  { label: '회원몰', href: '/member-mall' },
];

export const metrics: MetricItem[] = [
  {
    label: '객실관리 시스템',
    value: '국내형 / 유럽형',
    detail: '현장 설비 방식과 객실 인테리어 방향에 맞춰 두 타입으로 제안할 수 있습니다.',
  },
  {
    label: '운영 카테고리',
    value: '7',
    detail: '제품·서비스, TV/B2B가전, 설치사례, 커뮤니티, 고객지원, 회원몰, 회원가입 구조를 갖췄습니다.',
  },
  {
    label: '제품 라인업',
    value: '9',
    detail:
      '객실관리 2종, 호텔락 3종, 운영관리 프로그램, 무인 키오스크, 무인 관제 서비스, 기타 자재까지 세분화했습니다.',
  },
];

export const capabilities: CapabilityItem[] = [
  {
    title: '객실관리 시스템',
    description:
      '국내형과 유럽형 두 가지 타입으로 객실 조명, 온도, 카드홀더, 청소/방해금지 상태를 효율적으로 제어합니다.',
    href: '/solutions/room-management',
  },
  {
    title: '호텔락 시스템',
    description:
      '국내형·유럽형·QR·키리스 호텔락을 객실 도어 구조와 무인 운영 비중에 맞춰 선택할 수 있도록 정리합니다.',
    href: '/solutions/hotel-lock',
  },
  {
    title: '무인 키오스크 시스템',
    description:
      '체크인, 결제, 객실 배정, 키 발급 흐름을 로비 동선 기준으로 정리하고 관제 연동 구조까지 함께 볼 수 있습니다.',
    href: '/solutions/kiosk',
  },
];

export const showcaseLinks: ShowcaseLinkItem[] = [
  {
    label: 'Products',
    title: '제품·서비스',
    description:
      '객실관리 시스템, 호텔락 국내형·유럽형·QR·키리스, 운영관리 프로그램, 키오스크, 무인 관제, 기타 자재를 한 페이지에서 탐색할 수 있습니다.',
    href: '/products',
  },
  {
    label: 'B2B appliances',
    title: 'TV/B2B가전',
    description:
      '호텔 객실 TV, 공용부 디스플레이, 객실 가전과 운영용 B2B 번들을 함께 검토할 수 있습니다.',
    href: '/tv-b2b',
  },
  {
    label: 'Reference',
    title: '설치사례',
    description:
      '객실 규모와 현장 조건별 적용 사례를 통해 어떤 제품 조합이 맞는지 빠르게 비교할 수 있습니다.',
    href: '/installations',
  },
  {
    label: 'Community',
    title: '커뮤니티',
    description:
      '운영 가이드, 설치 노트, 시스템 선택 팁처럼 검색 유입에 유리한 콘텐츠 흐름을 별도 페이지로 구성했습니다.',
    href: '/community',
  },
  {
    label: 'Support',
    title: '고객지원',
    description:
      '도입 상담, 일정 협의, 유지보수, 부품 공급, 원격 지원 범위를 페이지 단위로 정리해 두었습니다.',
    href: '/support',
  },
  {
    label: 'Member mall',
    title: '회원몰',
    description:
      '회원가입 후 회원 전용가와 묶음 혜택을 확인할 수 있도록 회원몰 구조와 가입 페이지를 연결했습니다.',
    href: '/member-mall',
  },
];

export const products: ProductItem[] = [
  {
    slug: 'room-management-domestic',
    title: '객실관리 시스템 국내형',
    tag: '객실관리 시스템',
    summary:
      '국내 숙박업 환경에 맞춘 객실 제어 패널과 상태 연동 솔루션으로, 객실 운영 흐름을 익숙한 방식으로 정리합니다.',
    description:
      '객실 조명, 온도, 청소 요청, 방해금지, 객실 상태 표시를 국내형 배선 구조와 운영 방식에 맞춰 구성한 객실관리 시스템입니다. 프런트, 하우스키핑, 객실 출입 장치와의 연동까지 고려해 현장 적용성을 높였습니다.',
    image: '/room-management-domestic.png',
    imageAlt: '국내형 객실관리 시스템 패널이 설치된 호텔 객실 입구',
    highlights: [
      '객실 조명과 온도, 청소/방해금지 상태 통합 제어',
      '객실 상태 표시와 도어 연동 구성',
      '국내형 현장 배선과 운영 환경에 맞춘 설계',
      '프런트 및 하우스키핑 연동 확장 가능',
    ],
    useCases: [
      '국내 호텔과 모텔, 레지던스의 객실 제어 표준화',
      '기존 국내형 스위치 구성 업그레이드 현장',
      '객실 상태와 프런트 운영 화면을 연동하려는 시설',
    ],
  },
  {
    slug: 'room-management-european',
    title: '객실관리 시스템 유럽형',
    tag: '객실관리 시스템',
    summary:
      '카드홀더와 씬 스위치 중심의 유럽형 설계로 객실 분위기와 절전 제어를 동시에 고려한 라인업입니다.',
    description:
      '유럽형 객실관리 시스템은 카드홀더, 웰컴/클린/슬립/나이트 씬 스위치, 절전 제어를 중심으로 객실 경험을 세련되게 구성합니다. 고급 호텔과 리조트에 적합한 외관과 시나리오 제어가 강점입니다.',
    image: '/room-management-european.png',
    imageAlt: '유럽형 객실관리 시스템 카드홀더와 스위치 패널',
    highlights: [
      '카드홀더 기반 전원 제어와 절전 구성',
      '웰컴·슬립·클린·나이트 씬 스위치 지원',
      '객실 인테리어와 조화를 이루는 유럽형 디자인',
      '고급 객실 동선에 맞춘 상태 제어 확장',
    ],
    useCases: [
      '부티크 호텔과 리조트 객실 업그레이드',
      '유럽형 스위치 마감과 카드홀더 구조가 필요한 현장',
      '절전 제어와 객실 무드 연출을 함께 요구하는 시설',
    ],
  },
  {
    slug: 'hotel-lock-domestic',
    title: '호텔락 시스템 국내형',
    tag: '호텔락 시스템',
    summary:
      '국내 모텔·호텔 현장에 익숙한 주키 구조와 카드키 운영 방식을 기준으로 제안하는 국내형 호텔락 라인업입니다.',
    description:
      '국내형 호텔락 시스템은 등록형·발급형 운영에 맞춰 객실 출입 이력, 잠금 이벤트, 카드키 권한 발급 흐름을 정리하는 출입 제어 장비입니다. 객실관리 시스템 국내형과 함께 구성하거나 일반 카드키 운영을 안정적으로 유지하려는 현장에 적합합니다.',
    image: '/hotel-lock-system.png',
    imageAlt: '국내형 구조를 기준으로 설계된 호텔 객실용 스마트 호텔락 시스템',
    highlights: [
      '국내형 도어 환경과 주키 구조 대응',
      'RF 카드 기반 권한 발급과 출입 로그 관리',
      '프런트 운영 프로그램과 연동 가능한 구조',
      '객실관리 시스템 국내형과 묶음 구축 용이',
    ],
    useCases: [
      '기존 국내형 카드키 도어락을 교체하려는 호텔',
      '모텔·호텔의 단계적 출입 제어 표준화',
      '프런트 카드 발급 중심 운영을 유지하는 현장',
    ],
  },
  {
    slug: 'hotel-lock-european',
    title: '호텔락 시스템 유럽형',
    tag: '호텔락 시스템',
    summary:
      '유럽형 스위치와 카드홀더 마감에 맞춰 전면 디자인과 객실 경험을 통일하기 좋은 호텔락 라인업입니다.',
    description:
      '유럽형 호텔락 시스템은 얇은 전면 디자인과 고급 객실 마감 조화를 중시하는 현장에 적합한 출입 제어 장비입니다. 유럽형 객실관리 시스템, 카드홀더, 씬 스위치와 함께 적용하면 객실 동선과 외관을 일관되게 구성할 수 있습니다.',
    image: '/hotel-lock-system.png',
    imageAlt: '유럽형 객실 인테리어에 맞춘 스마트 호텔락 시스템',
    highlights: [
      '슬림한 전면 디자인과 프리미엄 객실 마감 조화',
      '유럽형 카드홀더·씬 스위치와 통일된 동선 구성',
      'RF 카드 기반 출입 권한과 객실 접근 기록 관리',
      '리조트·부티크 호텔에 적합한 객실 출입 제어 구조',
    ],
    useCases: [
      '리조트와 부티크 호텔 객실 리뉴얼',
      '유럽형 객실관리 시스템과 함께 묶어 적용하는 현장',
      '프리미엄 객실 디자인과 출입 제어를 동시에 정리하려는 시설',
    ],
  },
  {
    slug: 'hotel-lock-qr-keyless',
    title: '호텔락 시스템 QR·키리스',
    tag: 'QR·키리스 호텔락',
    summary:
      'QR 코드와 일회용 PIN 기반의 키리스 입실 흐름으로 프런트 대기와 카드키 제작 비용을 줄이는 호텔락 구조입니다.',
    description:
      'QR·키리스 호텔락은 아이크루 공개 QR 도어락 운영 구조를 참고해 구성한 라인업입니다. OTA 예약 후 전달된 QR 또는 일회용 PIN으로 객실에 입실하는 흐름을 설계할 수 있고, 기존 카드키 운영과 병행 적용도 가능합니다.',
    image: '/hotel-lock-system.png',
    imageAlt: 'QR 코드와 키리스 입실을 지원하는 호텔락 시스템',
    highlights: [
      'QR 코드 또는 1회용 PIN 기반 키리스 입실',
      '기존 카드키와 병행 운영 가능한 구조',
      'OTA 예약과 프런트·키오스크 동선 최소화',
      '카드키 제작 비용 절감을 고려한 운영 모델',
    ],
    useCases: [
      '무인 체크인 비중이 높은 숙박 시설',
      '모바일 또는 인쇄형 QR 입실을 검토하는 현장',
      '프런트 인력 부담과 카드키 발급 비용을 줄이려는 운영사',
    ],
  },
  {
    slug: 'operation-management-program',
    title: '운영관리 프로그램',
    tag: '운영관리 프로그램',
    summary:
      '프런트 원격 관제, 예약 연동, 객실 현황 관리를 하나로 묶는 클라우드 기반 운영관리 프로그램입니다.',
    description:
      '운영관리 프로그램은 아이크루 크루이글 기본형·프로 공개 구조를 참고해 객실 현황, 예약 연동, 결제 흐름, 프런트 운영을 하나의 화면에서 정리하는 소프트웨어 라인업입니다. 클라우드 기반 구조를 전제로 하며 원격 운영과 다지점 관리에 적합한 흐름을 제공합니다.',
    image: '/dashboard.png',
    imageAlt: '프런트 원격 관제와 예약 연동 화면을 보여주는 운영관리 프로그램 대시보드',
    highlights: [
      '프런트 원격 관제와 스마트 프런트 운영 지원',
      '객실 현황, 결제 흐름, 예약 상태 통합 확인',
      '클라우드 기반으로 별도 설치 부담을 줄인 구조',
      '온라인 예약 채널 및 다지점 운영 흐름 확장 가능',
    ],
    useCases: [
      '객실 상태와 예약 흐름을 한 화면에서 보고 싶은 운영사',
      '여러 지점의 프런트 업무를 표준화하려는 사업자',
      '키오스크와 호텔락, 객실관리 데이터를 함께 묶으려는 현장',
    ],
  },
  {
    slug: 'kiosk-system',
    title: '무인 키오스크 시스템',
    tag: '무인 키오스크',
    summary:
      '무인 체크인과 결제, 카드키 또는 출입권 전달까지 이어지는 로비 자동화 키오스크 라인업입니다.',
    description:
      '무인 키오스크 시스템은 아이크루 공개 키오스크 라인업을 참고해 분리형 프리미엄 타입과 일체형 컴팩트 타입 두 흐름으로 구성한 로비 자동화 장비입니다. 신분증 검사, CCTV, 현금·카드·간편결제, 객실 배정과 출입 연동을 로비 동선에 맞춰 설계할 수 있습니다.',
    image: '/kiosk-system-blue.png',
    imageAlt: '호텔 로비에 설치된 무인 체크인 키오스크 시스템',
    highlights: [
      '분리형 프리미엄 타입과 일체형 컴팩트 타입 구성',
      '신분증 검사와 CCTV 내장 구조 검토 가능',
      '현금·카드·간편결제와 객실 배정 흐름 지원',
      '호텔락 및 운영관리 프로그램과 연동 가능한 구조',
    ],
    useCases: [
      '프런트 대기 시간을 줄이고 싶은 호텔',
      '40객실 이하 또는 고회전 업장에 맞는 무인 체크인 도입',
      '운영관리 프로그램과 함께 로비 자동화를 구축하려는 현장',
    ],
  },
  {
    slug: 'remote-monitoring-service',
    title: '무인 관제 서비스',
    tag: '무인 관제 서비스',
    summary:
      '본사 관제형 또는 업주 직접 관제형으로 프런트 응대와 미성년자 필터링을 지원하는 무인 관제 서비스입니다.',
    description:
      '무인 관제 서비스는 아이크루의 FOD·FOA 공개 운영 구조를 참고한 서비스입니다. 키오스크와 CCTV, 원격 응대 흐름을 연결해 본사 관제실이 프런트 업무를 대신하거나, 업주가 직접 모바일로 운영 현황과 이벤트를 관리하는 구조를 설계할 수 있습니다.',
    image: '/remote-monitoring-service.png',
    imageAlt: '호텔 운영 모니터링과 원격 응대 흐름을 보여주는 무인 관제 서비스 화면',
    highlights: [
      '본사 프런트 대행형(FOD) 또는 직접 관제형(FOA) 선택',
      '원격 키오스크 제어와 실시간 CCTV 확인 흐름',
      '미성년자 필터링과 음성 응대 운영 지원',
      '알림, 메일링, 결제 현황 확인 기능 설계',
    ],
    useCases: [
      '야간 무인 운영 비중이 높은 숙박 시설',
      '여러 지점의 프런트 대응을 표준화하려는 운영사',
      '키오스크와 원격 응대를 함께 도입하려는 현장',
    ],
  },
  {
    slug: 'misc-materials',
    title: '기타 자재',
    tag: '기타 자재',
    summary:
      '센서, 카드홀더, 릴레이 모듈, 네트워크 장비, 브라켓 등 현장 설치와 유지보수에 필요한 구성품을 함께 제안합니다.',
    description:
      '기타 자재는 객실관리 시스템과 호텔락, 키오스크 구축에 필요한 센서, 카드홀더, 네트워크 모듈, 설치 브라켓, 배선 자재 등을 포함합니다. 현장 조건에 맞는 세부 구성 조정이 중요합니다.',
    image: '/misc-materials.png',
    imageAlt: '호텔 자동화 시스템 설치에 사용되는 각종 자재와 모듈',
    highlights: [
      '카드홀더와 센서, 릴레이 모듈 구성',
      '네트워크 컨트롤 유닛과 설치 자재 포함',
      '현장 조건에 맞는 부품 조합 제안',
      '유지보수와 확장 설치를 고려한 자재 공급',
    ],
    useCases: [
      '현장 맞춤 설치 자재를 함께 준비해야 하는 프로젝트',
      '객실관리와 호텔락 시공 범위를 동시에 잡는 현장',
      '유지보수용 예비 자재 구성을 검토하는 운영사',
    ],
  },
];

export const servicePackages: ServicePackageItem[] = [
  {
    title: '객실관리 시스템 패키지',
    description:
      '국내형과 유럽형 두 라인업 중 객실 구조와 인테리어 방향에 맞는 타입을 선택하고 현장 제어 범위를 함께 설계합니다.',
    href: '/products/room-management-domestic',
    items: [
      '국내형·유럽형 객실 제어 패널 선택',
      '객실 상태 표시와 하우스키핑 연동',
      '객실 배선 구조와 교체 일정 검토',
    ],
  },
  {
    title: '호텔락 시스템 패키지',
    description:
      '국내형, 유럽형, QR·키리스 호텔락 중 현장 운영 방식에 맞는 출입 제어 구조를 선택해 적용합니다.',
    href: '/products/hotel-lock-domestic',
    items: [
      '국내형·유럽형·QR·키리스 라인업 비교',
      '카드키 운영 또는 QR 입실 흐름 설계',
      '운영관리 프로그램과 권한 발급 체계 정리',
    ],
  },
  {
    title: '운영관리·키오스크·무인 관제 패키지',
    description:
      '프런트 운영 프로그램, 무인 키오스크, 원격 관제 흐름을 하나의 자동화 구조로 묶는 패키지입니다.',
    href: '/products/operation-management-program',
    items: [
      '운영관리 프로그램과 객실 현황 대시보드 구성',
      '셀프 체크인·체크아웃 키오스크 연동',
      'FOD 또는 FOA 기준 무인 관제 흐름 설계',
    ],
  },
  {
    title: '설치 자재·현장 구축 지원',
    description:
      '센서, 카드홀더, 릴레이, 네트워크 모듈, 브라켓 같은 부자재를 프로젝트 범위에 맞게 함께 제안합니다.',
    href: '/products/misc-materials',
    items: [
      '현장 맞춤 부품 조합 제안',
      '배선과 브라켓, 모듈 구성 조정',
      '추가 증설과 교체를 고려한 예비 자재 구성',
    ],
  },
];

export const tvB2bCategories: TvB2bCategoryItem[] = [
  {
    slug: 'guest-room-tv',
    label: '삼성 Hospitality TV',
    title: '객실 TV 패키지',
    description:
      '삼성시스텍이 호텔 객실 환경에 맞춰 제안하는 삼성 Hospitality TV 중심 카테고리입니다. 객실 등급과 운영 방식에 따라 HU8000F, HU7010F, HCU708 계열처럼 다른 제안을 정리할 수 있습니다.',
    href: '/tv-b2b/guest-room-tv',
    items: [
      '43형부터 85형까지 객실 TV 사이즈 검토',
      'Google Cast·Apple AirPlay·LYNK Cloud 고려',
      'IPTV·셋톱·브라켓·리모컨 운영 구성',
    ],
    supportNote:
      '삼성시스텍 기준으로 객실 TV는 단순 화면 크기보다 캐스팅, 관리 플랫폼, 객실 등급, 벽면 시공 조건까지 같이 보고 제안합니다.',
    products: [
      {
        name: '삼성 Hospitality TV HU8000F 시리즈',
        summary:
          '삼성시스텍이 프리미엄 객실과 최신 호텔 환경에서 우선 검토할 수 있는 2025년형 Hospitality TV 제안 라인입니다.',
        highlights: ['43"~85" 사이즈 구성', 'Google Cast 지원', '객실 관리 도구 확장 가능'],
      },
      {
        name: '삼성 Hospitality TV HU7010F 시리즈',
        summary:
          '표준 객실과 디럭스 객실에 폭넓게 적용하기 좋은 삼성 Hospitality TV 라인으로, 캐스팅과 클라우드 관리 요소를 함께 검토할 수 있습니다.',
        highlights: ['43"~75" 구성', 'Apple AirPlay 지원', 'LYNK Cloud 연계 검토'],
      },
      {
        name: '삼성 Hospitality TV HCU708 시리즈',
        summary:
          '객실 운영 안정성과 관리 편의성을 중심으로 검토하기 좋은 기본형 Hospitality TV 제안 라인입니다.',
        highlights: ['4K 업스케일링', 'PurColor 기반 화질', 'bLAN·CMS 운영 검토'],
      },
    ],
  },
  {
    slug: 'common-area-display',
    label: '삼성 Business Display',
    title: '로비·공용부 디스플레이',
    description:
      '삼성시스텍이 로비, 회의실, 체크인 존, 외부 안내 구간에 맞춰 제안하는 삼성 Business Display 중심 카테고리입니다.',
    href: '/tv-b2b/common-area-display',
    items: [
      '로비·연회장·회의실용 스마트 사이니지 구성',
      '초대형 디스플레이와 Pro TV 검토',
      '실내·실외 안내 화면과 콘텐츠 관리 방식 정리',
    ],
    supportNote:
      '삼성시스텍은 공용부 화면도 단순 설치가 아니라 시인성, 벽면 크기, 실내외 환경, 콘텐츠 운영 방식까지 포함해 제안하는 구조로 정리합니다.',
    products: [
      {
        name: '삼성 QHFX 115형 초대형 4K 디스플레이',
        summary:
          '대형 로비와 프리미엄 공용부에 적용할 수 있는 초대형 화면 제안 품목입니다.',
        highlights: ['115형 초대형 화면', '몰입형 로비 연출', '프리미엄 호텔 공용부 대응'],
      },
      {
        name: '삼성 OMDX 초슬림 스마트 사이니지',
        summary:
          '로비, 복도, 엘리베이터 홀처럼 공간 미관이 중요한 구간에 어울리는 초슬림 디스플레이 제안입니다.',
        highlights: ['초슬림 디자인', '실내 안내 화면 운영', '공간 인테리어 조화'],
      },
      {
        name: '삼성 OH55DX-S 실외용 디스플레이',
        summary:
          '출입구나 야외 연결 동선에서 쓰기 좋은 삼성 실외용 디스플레이 계열 제안 품목입니다.',
        highlights: ['실외 노출 환경 대응', 'Wi-Fi 기반 관리 검토', '입구 안내 화면 적용'],
      },
    ],
  },
  {
    slug: 'guest-room-appliances',
    label: '삼성 객실가전',
    title: '객실 B2B가전',
    description:
      '삼성시스텍이 객실 품질과 체류 편의성을 높이기 위해 함께 제안할 수 있는 삼성 계열 객실가전 중심 카테고리입니다.',
    href: '/tv-b2b/guest-room-appliances',
    items: [
      '객실용 냉장고와 보조가전 구성',
      '공기청정기·전자레인지·세탁존 가전 검토',
      '체류형 숙소와 레지던스형 객실 번들 구성',
    ],
    supportNote:
      '삼성시스텍 기준으로 객실가전은 숙박형보다 체류형 숙소에서 체감 효과가 더 크기 때문에 TV와 함께 묶음 제안하는 경우가 많습니다.',
    products: [
      {
        name: '삼성시스텍 제안 객실 냉장고 패키지',
        summary:
          '표준 객실과 비즈니스호텔에서 자주 묶이는 기본 객실 냉장고 구성입니다.',
        highlights: ['기본 객실 적용', '저소음 운용 고려', '객실 가구 배치 대응'],
      },
      {
        name: '삼성시스텍 제안 객실 공기청정기',
        summary:
          '쾌적한 실내 환경을 강조해야 하는 호텔과 스테이형 숙소에서 추가하는 보조가전 품목입니다.',
        highlights: ['쾌적도 향상', '중장기 투숙 대응', '객실 운영 품질 보강'],
      },
      {
        name: '삼성시스텍 제안 체류형 객실 편의가전 세트',
        summary:
          '레지던스와 장기투숙형 객실에서 자주 묶이는 전자레인지·보조가전 패키지입니다.',
        highlights: ['장기투숙 특화', '객실 편의성 강화', '레지던스형 객실 대응'],
      },
    ],
  },
  {
    slug: 'bundle-packages',
    label: '삼성시스텍 번들',
    title: '객실 자동화 연계 번들',
    description:
      '삼성시스텍이 객실관리 시스템, 호텔락, 삼성 Hospitality TV, 공용부 디스플레이, 객실가전을 프로젝트 단위로 묶어 제안하는 번들 카테고리입니다.',
    href: '/tv-b2b/bundle-packages',
    items: [
      '시스템과 TV·가전 동시 발주 상담',
      '회원몰 연계 번들 혜택 안내',
      '설치 일정에 맞춘 납기와 시공 협의',
    ],
    supportNote:
      '삼성시스텍 기준으로 번들 발주는 개별 품목보다 일정 관리와 단가 조정, 유지보수 계획까지 한 번에 보기 좋다는 장점이 있습니다.',
    products: [
      {
        name: '객실 자동화 + 삼성 Hospitality TV 번들',
        summary:
          '객실관리 시스템과 삼성 Hospitality TV를 한 번에 검토하는 삼성시스텍 기본 객실 번들입니다.',
        highlights: ['객실 단위 발주', '설치 일정 동기화', '회원가 연계 가능'],
      },
      {
        name: '로비 체크인 + 삼성 사이니지 번들',
        summary:
          '키오스크, 로비 디스플레이, 호텔락 연동 흐름을 삼성시스텍 기준으로 묶는 번들입니다.',
        highlights: ['로비 동선 통합', '키오스크 연계', '공용부 화면 포함'],
      },
      {
        name: '장기투숙형 삼성 객실가전 번들',
        summary:
          '레지던스와 스테이형 현장을 위한 삼성시스텍 객실가전 묶음 구성입니다.',
        highlights: ['장기투숙 객실 대응', '냉장고·보조가전 포함', '객실 단위 확장 용이'],
      },
    ],
  },
];

export const installationCases: InstallationCaseItem[] = [
  {
    propertyType: 'Business hotel',
    title: '120실 비즈니스호텔 객실관리 국내형 교체',
    location: '서울',
    summary:
      '기존 스위치 배선을 최대한 활용하면서 객실 상태 표시, 카드키 운영, 프런트 운영 화면까지 함께 정리한 국내형 객실관리 프로젝트입니다.',
    image: '/room-management-domestic.png',
    imageAlt: '비즈니스호텔 객실 출입부에 설치된 국내형 객실관리 시스템',
    systems: ['객실관리 시스템 국내형', '호텔락 시스템 국내형', '운영관리 프로그램'],
    outcomes: ['객실 상태 표시 일원화', '프런트 카드 발급과 객실 현황 연동', '층별 순차 시공으로 운영 차질 최소화'],
  },
  {
    propertyType: 'Resort',
    title: '리조트형 객실 유럽형 스위치 업그레이드',
    location: '강원',
    summary:
      '객실 인테리어 리뉴얼과 함께 유럽형 카드홀더와 씬 스위치를 적용해 고급 객실 경험을 강화한 사례입니다.',
    image: '/room-management-european.png',
    imageAlt: '리조트 객실에 설치된 유럽형 카드홀더와 씬 스위치',
    systems: ['객실관리 시스템 유럽형', '호텔락 시스템 유럽형'],
    outcomes: ['카드홀더 기반 절전 구조 적용', '객실 무드 시나리오 제어 강화', '고급형 객실 마감과 디자인 통일'],
  },
  {
    propertyType: 'Unmanned stay',
    title: '무인 체크인 중심 숙소 운영 패키지',
    location: '부산',
    summary:
      '무인 키오스크, QR·키리스 호텔락, 무인 관제 서비스를 결합해 프런트 인력 부담을 줄이려는 현장에 맞춘 구성입니다.',
    image: '/kiosk-system-blue.png',
    imageAlt: '무인 체크인 숙소 로비에 설치된 키오스크 시스템',
    systems: ['무인 키오스크 시스템', '호텔락 시스템 QR·키리스', '무인 관제 서비스'],
    outcomes: ['셀프 체크인 동선 정리', '야간 원격 대응 시나리오 확보', 'QR 입실과 이벤트 확인 체계 일원화'],
  },
];

export const communityEntries: CommunityEntryItem[] = [
  {
    category: '운영 가이드',
    title: '국내형과 유럽형 객실관리 시스템은 어떻게 고를까',
    excerpt:
      '객실 인테리어, 카드홀더 필요 여부, 절전 운영, 객실 규모를 기준으로 두 라인업을 비교하는 콘텐츠입니다.',
    href: '/products/room-management-domestic',
    ctaLabel: '관련 제품 보기',
  },
  {
    category: '설치 노트',
    title: '호텔락은 국내형·유럽형·QR·키리스 중 어떻게 고를까',
    excerpt:
      '도어 마감, 카드키 유지 여부, QR 입실 필요성, 무인 운영 비중을 기준으로 호텔락 구조를 구분하는 콘텐츠입니다.',
    href: '/products/hotel-lock-qr-keyless',
    ctaLabel: '호텔락 보기',
  },
  {
    category: '무인 운영',
    title: '운영관리 프로그램과 키오스크, 무인 관제를 왜 함께 봐야 하나',
    excerpt:
      '객실 현황 대시보드, 셀프 체크인, 원격 응대까지 하나의 흐름으로 설계할 때 운영 안정성이 어떻게 달라지는지 정리했습니다.',
    href: '/products/operation-management-program',
    ctaLabel: '운영 구조 보기',
  },
  {
    category: '회원 혜택',
    title: '회원몰에서 번들 발주 시 어떤 혜택을 받을 수 있나',
    excerpt:
      '회원 전용가, 묶음 발주 우대, 공동구매형 자재 혜택, 우선 견적 대응 구조를 소개하는 콘텐츠입니다.',
    href: '/member-mall',
    ctaLabel: '회원몰 보기',
  },
];

export const supportChannels: SupportChannelItem[] = [
  {
    title: '도입 상담',
    description:
      '객실 타입, 호텔락 구조, 운영관리 프로그램, TV/B2B가전 필요 품목을 같이 정리해 적합한 구성을 제안합니다.',
    href: '/contact',
    details: ['현장 조건별 제품 조합 제안', '예상 일정과 시공 범위 1차 정리', '회원몰 연계 가능 품목 안내'],
  },
  {
    title: '설치 일정 협의',
    description:
      '객실 점유율과 운영 일정을 고려해 층별, 구역별 순차 시공 플랜을 잡을 수 있도록 지원합니다.',
    href: '/installations',
    details: ['리모델링 공정과 병행 협의', '객실 공실 구간 중심 일정 구성', '장비 납기와 자재 공급 일정 동기화'],
  },
  {
    title: '운영 지원·A/S',
    description:
      '운영관리 프로그램, 키오스크, 무인 관제, 예비 부품 공급까지 운영 단계에서 필요한 항목을 분리해 관리합니다.',
    href: '/products/remote-monitoring-service',
    details: ['원격 관제 범위 설정', '고장 대응 우선순위 정리', '소모품과 부자재 재공급 협의'],
  },
  {
    title: '회원 전용 견적',
    description:
      '회원가입 후 회원몰 전용가와 번들 할인 기준으로 다시 산정한 견적 흐름을 확인할 수 있습니다.',
    href: '/member-signup',
    details: ['회원 전용 프로모션 적용', '반복 발주 현장 우대 조건 안내', '회원 전용 묶음가 비교 제공'],
  },
];

export const memberBenefits: MemberBenefitItem[] = [
  {
    title: '회원 전용가 적용',
    description: '회원몰 전용 프로모션 항목은 일반 문의가보다 낮은 기준으로 비교할 수 있게 구성했습니다.',
  },
  {
    title: '묶음 발주 혜택',
    description:
      '호텔락, 키오스크, TV/B2B가전, 자재를 함께 검토하는 프로젝트는 번들 할인 구조를 별도 안내합니다.',
  },
  {
    title: '우선 견적 대응',
    description: '회원 가입 후에는 회원 전용 견적 라인과 우선 상담 흐름으로 빠르게 요청을 남길 수 있습니다.',
  },
  {
    title: '설치사례·운영자료 열람',
    description: '회원몰과 커뮤니티를 연결해 설치사례와 운영 가이드 콘텐츠에 빠르게 접근할 수 있도록 구성했습니다.',
  },
];

export const memberDeals: MemberDealItem[] = [
  {
    badge: '객실관리 번들',
    title: '국내형 객실관리 기본 패키지',
    regularPrice: '일반 문의가 4,900,000원',
    memberPrice: '회원 전용가 4,450,000원',
    note: '객실관리 국내형, 기본 자재, 현장 협의 기준 예시입니다.',
    items: ['국내형 객실 패널 기준', '기본 자재 묶음 반영', '설치비는 현장 조건별 별도'],
  },
  {
    badge: '출입 제어 패키지',
    title: 'QR·키리스 호텔락 스타터 구성',
    regularPrice: '일반 문의가 4,180,000원',
    memberPrice: '회원 전용가 3,760,000원',
    note: 'QR·키리스 호텔락 공급가 예시이며 카드키 병행 범위와 문 타입에 따라 조정됩니다.',
    items: ['QR 또는 PIN 입실 구조 기준', '초기 발주용 부자재 포함', '회원 전용가 예시 반영'],
  },
  {
    badge: '프런트 자동화 번들',
    title: '운영관리 프로그램 + 키오스크 구성',
    regularPrice: '일반 문의가 10,490,000원',
    memberPrice: '회원 전용가 9,390,000원',
    note: '운영관리 프로그램과 무인 키오스크를 함께 도입하는 예시 구성입니다.',
    items: ['운영관리 프로그램 기본 라이선스', '무인 키오스크 1대 기준', '회원몰 번들 우대가 적용'],
  },
];

export const processSteps: StepItem[] = [
  {
    step: '01',
    title: '현장 진단',
    description: '객실 구조, 도어 환경, 배선 조건, 프런트 운영 동선을 먼저 확인합니다.',
  },
  {
    step: '02',
    title: '제품군 설계',
    description: '국내형·유럽형 객실관리, 호텔락 3종, 운영관리 프로그램, 키오스크, 관제 범위를 제품군별로 설계합니다.',
  },
  {
    step: '03',
    title: '설치 및 연동',
    description: '객실 장비와 출입 제어, 운영 흐름을 현장 조건에 맞춰 설치하고 연결합니다.',
  },
  {
    step: '04',
    title: '운영 지원',
    description: 'FOD·FOA 기반 무인 관제, 자재 공급, 유지보수 계획까지 포함해 운영 안정성을 높입니다.',
  },
];

export const memberSignupSteps: StepItem[] = [
  {
    step: '01',
    title: '회원가입',
    description: '이메일과 사업장 정보를 입력하면 누구나 바로 회원으로 가입할 수 있습니다.',
  },
  {
    step: '02',
    title: '자동 적용',
    description: '가입이 완료되면 별도 로그인 단계 없이 모든 상품의 회원 전용가가 자동으로 적용됩니다.',
  },
  {
    step: '03',
    title: '견적 요청',
    description: '회원가는 일반가보다 낮은 기준으로 노출되며, 해당 가격 기준으로 견적 요청을 보낼 수 있습니다.',
  },
];

export const faqItems: FaqItem[] = [
  {
    question: '객실관리 시스템 국내형과 유럽형의 차이는 무엇인가요?',
    answer:
      '국내형은 국내 숙박업소에서 익숙한 제어 방식과 배선 환경을 기준으로 설계되고, 유럽형은 카드홀더와 씬 스위치 중심의 세련된 객실 경험과 절전 구성을 강화한 타입입니다. 현장 인테리어와 운영 목적에 따라 선택합니다.',
  },
  {
    question: '호텔락은 국내형, 유럽형, QR·키리스 중 어떻게 구분되나요?',
    answer:
      '국내형은 일반 카드키 운영과 국내형 도어 환경에 맞춘 구조이고, 유럽형은 고급 객실 마감과 얇은 전면 디자인을 중시하는 현장에 적합합니다. QR·키리스는 카드키 제작 비용과 프런트 대기를 줄이기 위해 QR 또는 PIN 입실 흐름을 함께 설계하는 방식입니다.',
  },
  {
    question: '운영관리 프로그램은 어떤 역할을 하나요?',
    answer:
      '객실 현황, 예약 연동, 결제 흐름, 프런트 업무를 하나의 화면에서 확인하고 원격으로 관리하는 역할입니다. 키오스크, 호텔락, 객실관리 시스템과 함께 볼 때 운영 데이터가 더 정리됩니다.',
  },
  {
    question: '키오스크 시스템만 별도로 도입할 수도 있나요?',
    answer:
      '가능합니다. 다만 키오스크 단독 도입보다 운영관리 프로그램이나 호텔락과 함께 검토할 때 체크인 동선과 출입 제어 흐름을 더 안정적으로 설계할 수 있습니다.',
  },
  {
    question: '무인 관제 서비스는 어떤 내용을 지원하나요?',
    answer:
      '본사 관제형(FOD)은 관제실이 프런트 업무와 미성년자 필터링, 원격 키오스크 제어를 지원하는 구조이고, 직접 관제형(FOA)은 업주가 모바일과 CCTV를 통해 직접 프런트를 관리하는 방식입니다. 필요한 범위는 현장 운영 정책에 맞춰 조정합니다.',
  },
  {
    question: 'TV/B2B가전도 시스템과 함께 묶어서 상담할 수 있나요?',
    answer:
      '네. 객실 TV, 공용부 디스플레이, 객실용 B2B가전은 객실관리 시스템이나 운영관리·키오스크 프로젝트와 묶어서 상담할 수 있습니다. 회원몰 전용 번들 혜택은 별도 안내합니다.',
  },
  {
    question: '회원몰은 실제로 어떤 혜택이 있나요?',
    answer:
      '회원 전용 프로모션, 묶음 발주 우대, 반복 구매 현장 전용 견적, 설치사례와 운영 자료 열람 같은 혜택 구조를 적용할 수 있습니다. 실제 금액은 품목과 물량에 따라 달라집니다.',
  },
  {
    question: '기타 자재도 프로젝트와 함께 공급되나요?',
    answer:
      '네. 카드홀더, 센서, 릴레이, 네트워크 모듈, 설치 브라켓 같은 부자재도 프로젝트 범위에 맞춰 함께 제안할 수 있습니다. 시공 범위와 유지보수 계획에 따라 구성품은 달라집니다.',
  },
];

export const partnerNames = ['HOTEL', 'RESORT', 'MOTEL', 'RESIDENCE', 'STAY'];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getTvB2bCategoryBySlug(slug: string) {
  return tvB2bCategories.find((category) => category.slug === slug);
}
