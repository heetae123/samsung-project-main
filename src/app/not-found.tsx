import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">404</p>
      <h1 className="font-display mt-5 text-5xl font-bold tracking-[-0.08em] text-slate-950 sm:text-6xl">
        요청한 페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
        주소가 변경되었거나 더 이상 제공되지 않는 페이지입니다. 메인 랜딩이나 제품 목록으로
        다시 이동해 주세요.
      </p>
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 sm:text-base"
        >
          메인으로 돌아가기
        </Link>
      </div>
    </section>
  );
}
