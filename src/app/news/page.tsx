import Header from "@/components/layout/Header";
import styles from "@/styles/pages/NewsPage.module.scss";

export default function NewsPage() {
  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>소식</h1>
          <p className={styles.description}>
            recoveriX의 최신 소식과 업데이트를 확인하세요.
          </p>

          <div className={styles.newsList}>
            <div className={styles.newsItem}>
              <h2 className={styles.newsTitle}>
                recoveriX 신경 재활 기술의 새로운 발전
              </h2>
              <p className={styles.newsDate}>2024년 12월 15일</p>
              <p className={styles.newsExcerpt}>
                뇌졸중 및 다발성 경화증 환자를 위한 recoveriX 신경 재활 기술의
                최신 연구 결과와 임상 적용 사례를 소개합니다.
              </p>
            </div>

            <div className={styles.newsItem}>
              <h2 className={styles.newsTitle}>가정용 recoveriX 앱 출시</h2>
              <p className={styles.newsDate}>2024년 11월 20일</p>
              <p className={styles.newsExcerpt}>
                환자들이 집에서도 recoveriX 치료를 받을 수 있도록 모바일 앱이
                출시되었습니다.
              </p>
            </div>

            <div className={styles.newsItem}>
              <h2 className={styles.newsTitle}>의료진 교육 프로그램 개설</h2>
              <p className={styles.newsDate}>2024년 10월 10일</p>
              <p className={styles.newsExcerpt}>
                recoveriX 치료법을 적용하는 의료진을 위한 전문 교육 프로그램이
                개설되었습니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
