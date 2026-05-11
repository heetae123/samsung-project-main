import { products } from '@/lib/site';

export type ProductVideoItem = {
  id: string;
  title: string;
  description: string;
  posterImage: string;
  duration: string;
  visibilityNote: string;
  embedUrl?: string;
};

export type ProductCommerceItem = {
  generalPrice: number;
  memberPrice: number;
  unitLabel: string;
  priceNote: string;
  quoteLead: string;
  videos: ProductVideoItem[];
};

const productCommerceBySlug: Record<string, ProductCommerceItem> = {
  'room-management-domestic': {
    generalPrice: 4900000,
    memberPrice: 4350000,
    unitLabel: '기본 객실 패키지 기준',
    priceNote: '일반가는 공개 기준가이며, 현장 배선과 객실 수량에 따라 최종 견적이 달라집니다.',
    quoteLead: '기존 국내형 스위치 교체와 신규 객실 구축 모두 견적 요청으로 연결할 수 있습니다.',
    videos: [
      {
        id: 'domestic-overview',
        title: '국내형 객실관리 시스템 개요',
        description: '객실 제어 패널과 상태 표시 동선을 설명하는 공개 영상 자리입니다.',
        posterImage: '/room-management-domestic.png',
        duration: '03:20',
        visibilityNote: '영상 URL을 연결하면 모든 방문자에게 공개됩니다.',
      },
      {
        id: 'domestic-operation',
        title: '객실 상태 연동 사용 예시',
        description: '프런트, 하우스키핑, 객실 상태 흐름을 보여주는 운영 영상 자리입니다.',
        posterImage: '/room-management-domestic.png',
        duration: '04:10',
        visibilityNote: '현재는 영상 자리만 열어두었고, 추후 URL 연결 시 바로 재생됩니다.',
      },
    ],
  },
  'room-management-european': {
    generalPrice: 5600000,
    memberPrice: 4990000,
    unitLabel: '유럽형 객실 패키지 기준',
    priceNote: '카드홀더, 씬 스위치, 마감 옵션에 따라 단가가 달라질 수 있습니다.',
    quoteLead: '유럽형 인테리어 현장은 카드홀더와 씬 구성까지 함께 견적 요청할 수 있습니다.',
    videos: [
      {
        id: 'european-overview',
        title: '유럽형 카드홀더 구성 소개',
        description: '카드홀더와 씬 스위치 구조를 보여주는 공개 영상 자리입니다.',
        posterImage: '/room-management-european.png',
        duration: '02:50',
        visibilityNote: '모든 사용자가 볼 수 있는 공개 영상 섹션입니다.',
      },
      {
        id: 'european-energy',
        title: '절전 제어 운영 예시',
        description: '웰컴, 클린, 슬립, 나이트 씬 활용 영상을 배치할 수 있는 자리입니다.',
        posterImage: '/room-management-european.png',
        duration: '03:40',
        visibilityNote: '영상 업로드 전까지는 안내 카드로 유지됩니다.',
      },
    ],
  },
  'hotel-lock-domestic': {
    generalPrice: 3280000,
    memberPrice: 2940000,
    unitLabel: '20세트 스타터 구성 기준',
    priceNote: '도어 사양과 카드 발급 범위, 시공 범위에 따라 공급가가 달라질 수 있습니다.',
    quoteLead: '국내형 호텔락은 객실 수와 도어 타입 기준으로 빠르게 수량 견적을 낼 수 있습니다.',
    videos: [
      {
        id: 'lock-domestic-overview',
        title: '국내형 호텔락 기본 사용 흐름',
        description: '카드 발급과 객실 출입 흐름을 설명하는 공개 영상 자리입니다.',
        posterImage: '/hotel-lock-system.png',
        duration: '02:35',
        visibilityNote: '회원 여부와 관계없이 누구나 열람할 수 있습니다.',
      },
      {
        id: 'lock-domestic-maintenance',
        title: '국내형 호텔락 유지보수 포인트',
        description: '배터리 교체와 운영 점검 영상을 연결할 수 있는 자리입니다.',
        posterImage: '/hotel-lock-system.png',
        duration: '03:05',
        visibilityNote: '영상 링크 추가 시 자동으로 공개 재생됩니다.',
      },
    ],
  },
  'hotel-lock-european': {
    generalPrice: 3620000,
    memberPrice: 3260000,
    unitLabel: '20세트 유럽형 구성 기준',
    priceNote: '전면 마감, 손잡이 타입, 객실 등급에 따라 공급가가 달라질 수 있습니다.',
    quoteLead: '유럽형 호텔락은 객실 인테리어와 카드홀더 구성까지 함께 보고 견적 요청하는 방식이 적합합니다.',
    videos: [
      {
        id: 'lock-european-overview',
        title: '유럽형 호텔락 객실 적용 예시',
        description: '유럽형 객실 마감과 출입 흐름을 설명하는 공개 영상 자리입니다.',
        posterImage: '/hotel-lock-system.png',
        duration: '02:50',
        visibilityNote: '회원 여부와 관계없이 누구나 열람할 수 있습니다.',
      },
      {
        id: 'lock-european-detail',
        title: '유럽형 호텔락 운영 포인트',
        description: '카드홀더와 함께 쓰는 객실 운영 흐름 영상을 연결할 수 있는 자리입니다.',
        posterImage: '/hotel-lock-system.png',
        duration: '03:20',
        visibilityNote: '영상 URL 등록 후 자동으로 공개 재생할 수 있습니다.',
      },
    ],
  },
  'hotel-lock-qr-keyless': {
    generalPrice: 4180000,
    memberPrice: 3760000,
    unitLabel: '20세트 QR·키리스 구성 기준',
    priceNote: 'QR 발급 방식, PIN 병행 여부, OTA 연동 범위에 따라 가격이 달라질 수 있습니다.',
    quoteLead: 'QR·키리스 호텔락은 카드키 병행 여부와 무인 운영 범위를 기준으로 맞춤 견적 요청이 가능합니다.',
    videos: [
      {
        id: 'lock-qr-overview',
        title: 'QR·키리스 입실 흐름 소개',
        description: 'QR 발급부터 객실 입실까지 설명하는 공개 영상 자리입니다.',
        posterImage: '/hotel-lock-system.png',
        duration: '03:15',
        visibilityNote: '일반 방문자와 회원 모두 볼 수 있는 공개 영상 섹션입니다.',
      },
      {
        id: 'lock-qr-setup',
        title: 'QR 도어락 운영 설정 포인트',
        description: 'PIN 병행과 카드키 백업 운영 영상을 연결할 수 있는 자리입니다.',
        posterImage: '/hotel-lock-system.png',
        duration: '02:40',
        visibilityNote: '영상 링크 추가 시 자동으로 공개 재생됩니다.',
      },
    ],
  },
  'operation-management-program': {
    generalPrice: 2890000,
    memberPrice: 2490000,
    unitLabel: '기본 라이선스 기준',
    priceNote: '객실 수, 연동 채널, 운영 화면 범위에 따라 라이선스 단가와 구축비가 달라질 수 있습니다.',
    quoteLead: '운영관리 프로그램은 객실 수와 지점 수, 키오스크·도어락 연동 범위를 기준으로 견적 요청하는 방식이 적합합니다.',
    videos: [
      {
        id: 'ops-overview',
        title: '운영관리 프로그램 대시보드 개요',
        description: '객실 현황과 프런트 원격 관제 화면을 설명하는 공개 영상 자리입니다.',
        posterImage: '/dashboard.png',
        duration: '03:45',
        visibilityNote: '운영 화면 설명 영상은 모든 방문자가 볼 수 있도록 공개됩니다.',
      },
      {
        id: 'ops-workflow',
        title: '예약 연동과 프런트 업무 흐름',
        description: '예약, 결제, 객실 배정 흐름을 보여주는 영상 자리입니다.',
        posterImage: '/dashboard.png',
        duration: '04:10',
        visibilityNote: '현재는 포스터만 노출하며, 추후 영상 연결 시 자동 공개됩니다.',
      },
    ],
  },
  'kiosk-system': {
    generalPrice: 7600000,
    memberPrice: 6850000,
    unitLabel: '무인 키오스크 1대 기준',
    priceNote: '신분 확인 모듈, 결제 모듈, 출력 장치, 키카드 데크 구성 여부에 따라 견적이 달라집니다.',
    quoteLead: '무인 키오스크는 로비 동선과 객실 수, 관제 연동 범위를 기준으로 맞춤 견적 요청이 가능합니다.',
    videos: [
      {
        id: 'kiosk-checkin',
        title: '무인 체크인 사용 예시',
        description: '체크인부터 객실 접근 연동까지 설명하는 공개 영상 자리입니다.',
        posterImage: '/kiosk-system-blue.png',
        duration: '03:55',
        visibilityNote: '일반 방문자와 회원 모두 볼 수 있는 공개 영상 섹션입니다.',
      },
      {
        id: 'kiosk-checkout',
        title: '무인 체크아웃 운영 흐름',
        description: '체크아웃과 영수증 출력 흐름을 보여주는 영상 자리입니다.',
        posterImage: '/kiosk-system-blue.png',
        duration: '02:45',
        visibilityNote: '영상 URL 등록 후 바로 공개 재생할 수 있습니다.',
      },
    ],
  },
  'remote-monitoring-service': {
    generalPrice: 2400000,
    memberPrice: 2140000,
    unitLabel: '월 운영 패키지 기준',
    priceNote: 'FOD·FOA 운영 방식과 관제 시간대, 대상 지점 수에 따라 월 비용이 달라집니다.',
    quoteLead: '무인 관제 서비스는 현장 수와 운영 시간대, 직접 관제 또는 본사 관제 선택 기준으로 서비스 견적 요청이 가능합니다.',
    videos: [
      {
        id: 'monitoring-dashboard',
        title: '무인 관제 대시보드 화면 소개',
        description: '관제 포인트와 알람 화면을 설명하는 공개 영상 자리입니다.',
        posterImage: '/remote-monitoring-service.png',
        duration: '04:05',
        visibilityNote: '운영 화면 설명 영상은 모든 방문자가 볼 수 있도록 공개됩니다.',
      },
      {
        id: 'monitoring-response',
        title: 'FOD·FOA 대응 흐름 예시',
        description: '야간 대응과 원격 확인 흐름을 보여주는 영상 자리입니다.',
        posterImage: '/dashboard.png',
        duration: '03:10',
        visibilityNote: '현재는 포스터만 노출하며, 추후 영상 연결 시 자동 공개됩니다.',
      },
    ],
  },
  'misc-materials': {
    generalPrice: 1180000,
    memberPrice: 980000,
    unitLabel: '기본 자재 묶음 기준',
    priceNote: '부자재 수량과 현장 구조에 따라 자재 패키지 단가가 달라질 수 있습니다.',
    quoteLead: '기타 자재는 주 장비와 함께 묶어 견적 요청할 때 가장 정확한 산정이 가능합니다.',
    videos: [
      {
        id: 'materials-overview',
        title: '설치 자재 구성 설명',
        description: '센서, 카드홀더, 릴레이, 브라켓 구성을 설명하는 공개 영상 자리입니다.',
        posterImage: '/misc-materials.png',
        duration: '02:30',
        visibilityNote: '자재 설명 영상도 모든 사용자에게 공개할 수 있습니다.',
      },
      {
        id: 'materials-install',
        title: '현장 자재 설치 포인트',
        description: '실제 설치 순서를 정리한 영상 자리입니다.',
        posterImage: '/misc-materials.png',
        duration: '03:00',
        visibilityNote: '영상 파일 또는 YouTube 링크 연결 시 바로 노출됩니다.',
      },
    ],
  },
};

export function formatKrw(price: number) {
  return `${new Intl.NumberFormat('ko-KR').format(price)}원`;
}

export function getProductCommerce(slug: string) {
  return productCommerceBySlug[slug];
}

export function getProductsWithCommerce() {
  return products.map((product) => ({
    product,
    commerce: getProductCommerce(product.slug),
  }));
}
