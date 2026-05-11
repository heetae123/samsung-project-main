import Image from 'next/image';

import type { SolutionVisualKind } from '@/lib/system-landings';

type SolutionVisualProps = {
  kind: SolutionVisualKind;
  image: string;
  imageAlt: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
};

function WidePanelVisual({
  image,
  imageAlt,
  secondaryImage,
  secondaryImageAlt,
}: Omit<SolutionVisualProps, 'kind'>) {
  return (
    <div className="relative mx-auto aspect-[1.08/1] w-full max-w-[920px]">
      <svg viewBox="0 0 1200 1120" fill="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="panel-frame" x1="1098" y1="118" x2="112" y2="998" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F8FBFF" />
            <stop offset="0.28" stopColor="#B8C3D1" />
            <stop offset="1" stopColor="#20242D" />
          </linearGradient>
          <linearGradient id="panel-screen" x1="992" y1="192" x2="228" y2="930" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#ECF6FF" />
          </linearGradient>
          <radialGradient id="panel-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(930 236) rotate(123) scale(520)">
            <stop stopColor="#60A5FA" stopOpacity="0.34" />
            <stop offset="1" stopColor="#60A5FA" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="78" y="84" width="1044" height="912" rx="62" fill="url(#panel-frame)" />
        <rect x="120" y="126" width="960" height="828" rx="46" fill="url(#panel-screen)" />
        <rect x="120" y="126" width="960" height="828" rx="46" fill="url(#panel-glow)" />
        <rect x="500" y="1010" width="200" height="58" rx="29" fill="#111827" fillOpacity="0.88" />
        <rect x="346" y="1046" width="508" height="22" rx="11" fill="#111827" fillOpacity="0.12" />
      </svg>

      <div className="absolute inset-[11%] overflow-hidden rounded-[2.4rem]">
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 820px" className="object-contain p-6" priority />
      </div>

      {secondaryImage ? (
        <div className="absolute bottom-[7%] right-[10%] hidden w-[26%] overflow-hidden rounded-[1.6rem] border border-white/70 bg-white/82 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.18)] md:block">
          <div className="relative aspect-[1/1]">
            <Image
              src={secondaryImage}
              alt={secondaryImageAlt ?? imageAlt}
              fill
              sizes="240px"
              className="object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MonitorVisual({
  image,
  imageAlt,
  secondaryImage,
  secondaryImageAlt,
}: Omit<SolutionVisualProps, 'kind'>) {
  return (
    <div className="relative mx-auto aspect-[1.26/1] w-full max-w-[980px]">
      <svg viewBox="0 0 1280 1020" fill="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="monitor-body" x1="1184" y1="94" x2="98" y2="820" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2E3440" />
            <stop offset="1" stopColor="#090A0D" />
          </linearGradient>
          <linearGradient id="monitor-screen" x1="1110" y1="148" x2="170" y2="742" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#EDF6FF" />
          </linearGradient>
        </defs>

        <rect x="66" y="82" width="1148" height="694" rx="42" fill="url(#monitor-body)" />
        <rect x="114" y="130" width="1052" height="598" rx="28" fill="url(#monitor-screen)" />
        <rect x="548" y="780" width="184" height="122" rx="22" fill="#171A22" />
        <rect x="462" y="898" width="356" height="48" rx="24" fill="#0B0D12" />
        <rect x="380" y="942" width="520" height="22" rx="11" fill="#0B0D12" fillOpacity="0.18" />
      </svg>

      <div className="absolute left-[10%] right-[10%] top-[13%] bottom-[29%] overflow-hidden rounded-[1.7rem]">
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 900px" className="object-contain p-6" priority />
      </div>

      {secondaryImage ? (
        <div className="absolute left-[8%] top-[12%] hidden w-[22%] rounded-[1.35rem] border border-white/60 bg-[#0f172a]/92 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.24)] lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">Connected</p>
          <div className="relative mt-3 aspect-[1.15/1]">
            <Image
              src={secondaryImage}
              alt={secondaryImageAlt ?? imageAlt}
              fill
              sizes="220px"
              className="object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function LockVisual({ image, imageAlt }: Omit<SolutionVisualProps, 'kind' | 'secondaryImage' | 'secondaryImageAlt'>) {
  return (
    <div className="relative mx-auto aspect-[0.52/1] w-full max-w-[420px]">
      <svg viewBox="0 0 720 1380" fill="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="lock-shell" x1="608" y1="44" x2="132" y2="1288" gradientUnits="userSpaceOnUse">
            <stop stopColor="#363A43" />
            <stop offset="1" stopColor="#0A0B0E" />
          </linearGradient>
          <linearGradient id="lock-edge" x1="600" y1="132" x2="154" y2="1222" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D8ECFF" stopOpacity="0.25" />
            <stop offset="1" stopColor="#001830" stopOpacity="0.44" />
          </linearGradient>
        </defs>

        <rect x="138" y="38" width="444" height="1304" rx="86" fill="url(#lock-shell)" stroke="url(#lock-edge)" strokeWidth="4" />
        <rect x="174" y="76" width="372" height="1228" rx="60" fill="#101217" />
        <rect x="232" y="156" width="256" height="392" rx="38" fill="#F8FBFF" fillOpacity="0.96" />
        <rect x="256" y="584" width="208" height="252" rx="48" fill="#151821" stroke="url(#lock-edge)" strokeWidth="2" />
        <circle cx="360" cy="708" r="72" fill="#090A0D" stroke="#3D434F" strokeWidth="8" />
        <path d="M236 952C236 910 270 876 312 876H660C691 876 716 900 716 930C716 962 691 986 660 986H320C294 986 274 1006 274 1032V1060H236V952Z" fill="url(#lock-edge)" />
        <text x="258" y="1206" fill="#F8FBFF" fillOpacity="0.88" fontFamily="Arial, sans-serif" fontSize="44" fontWeight="700">HOTEL LOCK</text>
        <text x="258" y="1260" fill="#60A5FA" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="700">RF / QR / PIN</text>
      </svg>

      <div className="absolute left-[32%] right-[32%] top-[16%] bottom-[60%] overflow-hidden rounded-[1.7rem]">
        <Image src={image} alt={imageAlt} fill sizes="360px" className="object-contain p-4" priority />
      </div>
    </div>
  );
}

function KioskVisual({ image, imageAlt }: Omit<SolutionVisualProps, 'kind' | 'secondaryImage' | 'secondaryImageAlt'>) {
  return (
    <div className="relative mx-auto aspect-[0.56/1] w-full max-w-[460px]">
      <svg viewBox="0 0 760 1540" fill="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="kiosk-shell" x1="636" y1="48" x2="122" y2="1460" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2E3440" />
            <stop offset="1" stopColor="#090A0D" />
          </linearGradient>
          <linearGradient id="kiosk-screen" x1="534" y1="148" x2="216" y2="766" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#EDF7FF" />
          </linearGradient>
        </defs>

        <path d="M202 54H558C607 54 646 93 646 142V1098C646 1160 596 1210 534 1210H226C164 1210 114 1160 114 1098V142C114 93 153 54 202 54Z" fill="url(#kiosk-shell)" />
        <rect x="166" y="112" width="428" height="762" rx="34" fill="url(#kiosk-screen)" />
        <rect x="198" y="912" width="364" height="168" rx="28" fill="#101319" />
        <rect x="312" y="1240" width="136" height="170" rx="28" fill="#171A22" />
        <rect x="244" y="1402" width="272" height="54" rx="27" fill="#0B0D12" />
      </svg>

      <div className="absolute left-[23%] right-[23%] top-[10%] bottom-[45%] overflow-hidden rounded-[1.6rem]">
        <Image src={image} alt={imageAlt} fill sizes="420px" className="object-contain p-5" priority />
      </div>

      <div className="absolute left-[8%] top-[18%] rounded-full border border-blue-200/40 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
        Check-in
      </div>
      <div className="absolute right-[6%] top-[44%] rounded-full border border-blue-200/40 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
        Payment
      </div>
      <div className="absolute left-[10%] bottom-[16%] rounded-full border border-blue-200/40 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
        Key issue
      </div>
    </div>
  );
}

function MaterialsVisual({
  image,
  imageAlt,
}: Omit<SolutionVisualProps, 'kind' | 'secondaryImage' | 'secondaryImageAlt'>) {
  return (
    <div className="relative mx-auto aspect-[1.08/1] w-full max-w-[920px]">
      <svg viewBox="0 0 1180 1080" fill="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="materials-shell" x1="1080" y1="90" x2="110" y2="960" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F8FBFF" />
            <stop offset="1" stopColor="#E3EDF8" />
          </linearGradient>
        </defs>

        <rect x="92" y="92" width="996" height="860" rx="52" fill="url(#materials-shell)" />
        <rect x="146" y="146" width="416" height="318" rx="32" fill="white" />
        <rect x="620" y="146" width="416" height="318" rx="32" fill="white" />
        <rect x="146" y="520" width="890" height="378" rx="32" fill="white" />
      </svg>

      <div className="absolute left-[14%] right-[14%] top-[15%] bottom-[16%] overflow-hidden rounded-[2rem]">
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 820px" className="object-contain p-8" priority />
      </div>
    </div>
  );
}

export function SolutionVisual({
  kind,
  image,
  imageAlt,
  secondaryImage,
  secondaryImageAlt,
}: SolutionVisualProps) {
  if (kind === 'lock') {
    return <LockVisual image={image} imageAlt={imageAlt} />;
  }

  if (kind === 'kiosk') {
    return <KioskVisual image={image} imageAlt={imageAlt} />;
  }

  if (kind === 'operations' || kind === 'monitoring') {
    return (
      <MonitorVisual
        image={image}
        imageAlt={imageAlt}
        secondaryImage={secondaryImage}
        secondaryImageAlt={secondaryImageAlt}
      />
    );
  }

  if (kind === 'materials') {
    return <MaterialsVisual image={image} imageAlt={imageAlt} />;
  }

  return (
    <WidePanelVisual
      image={image}
      imageAlt={imageAlt}
      secondaryImage={secondaryImage}
      secondaryImageAlt={secondaryImageAlt}
    />
  );
}
