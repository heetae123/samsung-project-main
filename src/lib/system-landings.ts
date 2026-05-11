import { getProductBySlug } from '@/lib/site';

export type SolutionVisualKind =
  | 'room'
  | 'lock'
  | 'operations'
  | 'kiosk'
  | 'monitoring'
  | 'materials';

export type SolutionLandingChapter = {
  eyebrow: string;
  title: string;
  description: string;
};

export type SolutionLandingChild = {
  tag: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  points: string[];
};

export type SolutionLandingItem = {
  slug: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  keywords: string[];
  visualKind: SolutionVisualKind;
  primaryImage: string;
  primaryImageAlt: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  chapters: SolutionLandingChapter[];
  children: SolutionLandingChild[];
};

function requireProduct(slug: string) {
  const product = getProductBySlug(slug);

  if (!product) {
    throw new Error(`Missing product for slug: ${slug}`);
  }

  return product;
}

const roomDomestic = requireProduct('room-management-domestic');
const roomEuropean = requireProduct('room-management-european');
const lockDomestic = requireProduct('hotel-lock-domestic');
const lockEuropean = requireProduct('hotel-lock-european');
const lockQr = requireProduct('hotel-lock-qr-keyless');
const operations = requireProduct('operation-management-program');
const kiosk = requireProduct('kiosk-system');
const monitoring = requireProduct('remote-monitoring-service');
const materials = requireProduct('misc-materials');

export const systemLandings: SolutionLandingItem[] = [
  {
    slug: 'room-management',
    href: '/solutions/room-management',
    eyebrow: 'Room management system',
    title: '객실관리 시스템',
    description:
      '국내형과 유럽형 객실관리 시스템을 기준으로 객실 조명, 온도, 카드홀더, 청소/방해금지 흐름을 하나의 객실 운영 기준으로 연결합니다.',
    keywords: ['국내형', '유럽형', '객실 제어', '절전 연동'],
    visualKind: 'room',
    primaryImage: roomDomestic.image,
    primaryImageAlt: roomDomestic.imageAlt,
    secondaryImage: roomEuropean.image,
    secondaryImageAlt: roomEuropean.imageAlt,
    chapters: [
      {
        eyebrow: 'Guest room control',
        title: '객실의 첫 인상은 월패드와 스위치에서 시작됩니다',
        description:
          '객실 조명, 온도, 청소 요청, 방해금지 상태를 한 화면의 동선으로 정리해 프런트와 하우스키핑 운영까지 이어지게 구성합니다.',
      },
      {
        eyebrow: 'Domestic / European',
        title: '국내형과 유럽형 중 현장에 맞는 타입을 선택합니다',
        description:
          '국내형은 익숙한 배선과 운영 흐름에, 유럽형은 카드홀더와 씬 스위치 중심의 객실 경험에 맞춰 제안할 수 있습니다.',
      },
    ],
    children: [
      {
        tag: roomDomestic.tag,
        title: roomDomestic.title,
        description: roomDomestic.summary,
        image: roomDomestic.image,
        imageAlt: roomDomestic.imageAlt,
        href: `/products/${roomDomestic.slug}`,
        points: ['국내형 배선 환경 대응', '프런트/하우스키핑 상태 연동'],
      },
      {
        tag: roomEuropean.tag,
        title: roomEuropean.title,
        description: roomEuropean.summary,
        image: roomEuropean.image,
        imageAlt: roomEuropean.imageAlt,
        href: `/products/${roomEuropean.slug}`,
        points: ['카드홀더 기반 절전', '씬 스위치 중심 객실 경험'],
      },
    ],
  },
  {
    slug: 'hotel-lock',
    href: '/solutions/hotel-lock',
    eyebrow: 'Hotel lock system',
    title: '호텔락 시스템',
    description:
      '국내형, 유럽형, QR·키리스 호텔락을 객실 도어 구조와 운영 방식에 맞춰 선택할 수 있도록 출입 제어 흐름 중심으로 정리한 랜딩입니다.',
    keywords: ['국내형', '유럽형', 'QR·키리스', '출입 제어'],
    visualKind: 'lock',
    primaryImage: lockQr.image,
    primaryImageAlt: lockQr.imageAlt,
    secondaryImage: lockDomestic.image,
    secondaryImageAlt: lockDomestic.imageAlt,
    chapters: [
      {
        eyebrow: 'Access control',
        title: '카드키와 QR, PIN 입실을 하나의 출입 흐름으로 설계합니다',
        description:
          '객실 출입 권한 발급, 객실 상태 연결, 프런트 운영 동선을 따로 보지 않고 실제 현장에서 쓰는 출입 장면 중심으로 제안합니다.',
      },
      {
        eyebrow: 'Door type matching',
        title: '도어 환경과 무인 운영 비중에 따라 타입이 달라집니다',
        description:
          '국내형은 익숙한 카드키 운영에, 유럽형은 객실 마감 일체감에, QR·키리스는 프런트 대기 축소와 비대면 입실에 적합합니다.',
      },
    ],
    children: [
      {
        tag: lockDomestic.tag,
        title: lockDomestic.title,
        description: lockDomestic.summary,
        image: lockDomestic.image,
        imageAlt: lockDomestic.imageAlt,
        href: `/products/${lockDomestic.slug}`,
        points: ['국내형 주키 구조', 'RF 카드 권한 발급'],
      },
      {
        tag: lockEuropean.tag,
        title: lockEuropean.title,
        description: lockEuropean.summary,
        image: lockEuropean.image,
        imageAlt: lockEuropean.imageAlt,
        href: `/products/${lockEuropean.slug}`,
        points: ['슬림 전면 디자인', '유럽형 객실 마감 대응'],
      },
      {
        tag: lockQr.tag,
        title: lockQr.title,
        description: lockQr.summary,
        image: lockQr.image,
        imageAlt: lockQr.imageAlt,
        href: `/products/${lockQr.slug}`,
        points: ['QR 또는 PIN 입실', '무인 체크인 동선 대응'],
      },
    ],
  },
  {
    slug: 'operation-management',
    href: '/solutions/operation-management',
    eyebrow: 'Operation management',
    title: '운영관리 프로그램',
    description:
      '예약, 결제, 객실 현황, 출입 정보, 프런트 업무를 하나의 화면과 동선으로 정리하는 운영관리 프로그램 랜딩입니다.',
    keywords: ['프런트 화면', '예약 연동', '객실 현황', '운영 대시보드'],
    visualKind: 'operations',
    primaryImage: operations.image,
    primaryImageAlt: operations.imageAlt,
    chapters: [
      {
        eyebrow: 'Smart front',
        title: '프런트 화면을 예약과 객실 상태의 중심으로 둡니다',
        description:
          '체크인, 결제, 객실 배정, 출입 권한과 같은 운영 데이터를 분산하지 않고 한 화면에서 확인하도록 정리합니다.',
      },
      {
        eyebrow: 'Connected workflow',
        title: '호텔락과 키오스크 데이터를 운영 화면으로 다시 모읍니다',
        description:
          '장비마다 분리된 흐름을 프런트 기준의 업무 화면으로 묶어 실제 운영자가 이해하기 쉬운 방식으로 구성합니다.',
      },
    ],
    children: [
      {
        tag: '운영 화면',
        title: '프런트 대시보드',
        description: '객실 상태, 체크인 진행, 결제 현황을 한 화면에서 보는 운영 대시보드 구성입니다.',
        image: operations.image,
        imageAlt: operations.imageAlt,
        href: `/products/${operations.slug}`,
        points: ['객실 현황 보드', '프런트 업무 중심 화면'],
      },
      {
        tag: '연동 구성',
        title: '예약·결제 연동형',
        description: '예약 채널과 결제 흐름을 운영 화면으로 연결해 프런트 수기 입력 부담을 줄이는 구성입니다.',
        image: operations.image,
        imageAlt: operations.imageAlt,
        href: `/products/${operations.slug}`,
        points: ['예약 상태 연동', '결제 흐름 통합'],
      },
      {
        tag: '확장 구성',
        title: '객실·출입 통합형',
        description: '호텔락과 객실관리 데이터를 운영관리 프로그램에서 함께 확인하는 통합 구성입니다.',
        image: operations.image,
        imageAlt: operations.imageAlt,
        href: `/products/${operations.slug}`,
        points: ['출입 정보 확인', '객실 상태 연동'],
      },
    ],
  },
  {
    slug: 'kiosk',
    href: '/solutions/kiosk',
    eyebrow: 'Self check-in kiosk',
    title: '무인 키오스크 시스템',
    description:
      '체크인, 결제, 객실 배정, 키카드 또는 QR 출입권 발급까지 이어지는 로비 자동화 흐름을 무인 키오스크 중심으로 정리한 랜딩입니다.',
    keywords: ['셀프 체크인', '결제', '키 발급', '로비 자동화'],
    visualKind: 'kiosk',
    primaryImage: kiosk.image,
    primaryImageAlt: kiosk.imageAlt,
    chapters: [
      {
        eyebrow: 'Self check-in',
        title: '스크롤에 따라 키오스크가 앞으로 다가오듯 보이게 구성했습니다',
        description:
          '방문자가 체크인 장비를 실제 로비에서 마주하는 느낌을 주도록 입체감 있는 SVG 장비 프레임과 확대 애니메이션으로 연출합니다.',
      },
      {
        eyebrow: 'Kiosk lineup',
        title: '로비 규모와 운영 방식에 따라 키오스크 타입이 달라집니다',
        description:
          '공간이 넓은 로비는 분리형, 소형 업장은 일체형, 야간 무인 운영은 관제 연동형처럼 현장 조건에 맞춰 제안할 수 있습니다.',
      },
    ],
    children: [
      {
        tag: '키오스크 타입',
        title: '프리미엄 분리형',
        description: '본체와 결제·발권 모듈을 분리해 로비 존재감을 높이고 대기 동선을 넓게 설계하는 타입입니다.',
        image: kiosk.image,
        imageAlt: kiosk.imageAlt,
        href: `/products/${kiosk.slug}`,
        points: ['대형 로비 대응', '브랜드 존재감 강화'],
      },
      {
        tag: '키오스크 타입',
        title: '컴팩트 일체형',
        description: '좁은 로비나 중소형 업장에서 설치 공간을 줄이면서 체크인과 결제를 한 번에 처리하는 타입입니다.',
        image: kiosk.image,
        imageAlt: kiosk.imageAlt,
        href: `/products/${kiosk.slug}`,
        points: ['공간 효율 우선', '기본 체크인/결제 일체화'],
      },
      {
        tag: '키오스크 타입',
        title: '관제 연동형',
        description: '야간 무인 운영과 원격 응대를 염두에 두고 무인 관제 서비스와 함께 묶는 체크인 구성입니다.',
        image: kiosk.image,
        imageAlt: kiosk.imageAlt,
        href: `/products/${kiosk.slug}`,
        points: ['원격 응대 연계', '야간 무인 운영 대응'],
      },
    ],
  },
  {
    slug: 'remote-monitoring',
    href: '/solutions/remote-monitoring',
    eyebrow: 'Remote monitoring service',
    title: '무인 관제 서비스',
    description:
      '키오스크, 객실 운영, CCTV, 음성 응대를 원격으로 관리하는 무인 관제 서비스 랜딩입니다.',
    keywords: ['FOD', 'FOA', '원격 응대', 'CCTV 연동'],
    visualKind: 'monitoring',
    primaryImage: monitoring.image,
    primaryImageAlt: monitoring.imageAlt,
    secondaryImage: operations.image,
    secondaryImageAlt: operations.imageAlt,
    chapters: [
      {
        eyebrow: 'Remote desk',
        title: '현장 응대를 원격 프런트처럼 다루는 관제 구조입니다',
        description:
          '키오스크 상태 확인, CCTV 체크, 음성 응대, 미성년자 필터링을 한 흐름으로 묶어 야간 운영 공백을 줄입니다.',
      },
      {
        eyebrow: 'FOD / FOA',
        title: '본사 관제형과 직접 관제형 중 운영 방식에 맞춰 선택합니다',
        description:
          '본사에서 응대하는 FOD와 업주가 직접 제어하는 FOA를 기준으로 관제 강도와 인력 구조를 맞출 수 있습니다.',
      },
    ],
    children: [
      {
        tag: '관제 방식',
        title: 'FOD 본사 관제형',
        description: '본사 관제실이 프런트 대행, 원격 응대, 알람 확인을 담당하는 중앙 운영형 구성입니다.',
        image: monitoring.image,
        imageAlt: monitoring.imageAlt,
        href: `/products/${monitoring.slug}`,
        points: ['본사 응대 구조', '야간 프런트 공백 축소'],
      },
      {
        tag: '관제 방식',
        title: 'FOA 직접 관제형',
        description: '업주 또는 현장 담당자가 모바일과 화면을 통해 직접 키오스크와 CCTV를 확인하는 구성입니다.',
        image: monitoring.image,
        imageAlt: monitoring.imageAlt,
        href: `/products/${monitoring.slug}`,
        points: ['직접 제어 방식', '운영 정책 자율성 확보'],
      },
    ],
  },
  {
    slug: 'misc-materials',
    href: '/solutions/misc-materials',
    eyebrow: 'Misc materials',
    title: '기타 자재',
    description:
      '카드홀더, 센서, 릴레이, 네트워크 장비, 브라켓 등 현장 설치와 유지보수에 필요한 자재 묶음을 정리한 랜딩입니다.',
    keywords: ['센서', '카드홀더', '릴레이', '설치 자재'],
    visualKind: 'materials',
    primaryImage: materials.image,
    primaryImageAlt: materials.imageAlt,
    chapters: [
      {
        eyebrow: 'Installation materials',
        title: '장비보다 자재 구성이 먼저 중요한 현장이 있습니다',
        description:
          '주 장비만 보고 끝내지 않고 카드홀더, 센서, 릴레이, 브라켓 같은 설치 자재까지 함께 봐야 실제 견적과 일정이 맞아집니다.',
      },
      {
        eyebrow: 'Field bundle',
        title: '현장 구조에 따라 자재 묶음 구성이 달라집니다',
        description:
          '객실 수량, 배선 환경, 네트워크 구조에 따라 센서형, 제어형, 설치 보조형 자재 묶음으로 나눠 제안할 수 있습니다.',
      },
    ],
    children: [
      {
        tag: '자재 그룹',
        title: '센서·카드홀더 묶음',
        description: '객실 제어와 절전 흐름에 직접 연결되는 센서 및 카드홀더 중심 자재 구성입니다.',
        image: materials.image,
        imageAlt: materials.imageAlt,
        href: `/products/${materials.slug}`,
        points: ['절전 제어 핵심 부품', '객실 출입 동선 대응'],
      },
      {
        tag: '자재 그룹',
        title: '릴레이·모듈 묶음',
        description: '조명, 온도, 상태 표시를 제어하는 릴레이와 모듈 중심 자재 구성입니다.',
        image: materials.image,
        imageAlt: materials.imageAlt,
        href: `/products/${materials.slug}`,
        points: ['제어 회로 구성', '객실 상태 연동용 모듈'],
      },
      {
        tag: '자재 그룹',
        title: '브라켓·네트워크 자재',
        description: '현장 설치 마감과 통신 안정성을 위해 필요한 브라켓, 네트워크 장비, 부속 자재 구성입니다.',
        image: materials.image,
        imageAlt: materials.imageAlt,
        href: `/products/${materials.slug}`,
        points: ['현장 마감 보조', '네트워크 안정성 확보'],
      },
    ],
  },
];

export function getSystemLandingBySlug(slug: string) {
  return systemLandings.find((landing) => landing.slug === slug);
}
