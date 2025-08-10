import Header from "@/components/layout/Header";
import VideoCarousel from "@/components/VideoCarousel";
import styles from "@/styles/pages/ResultsPage.module.scss";

export default function ResultsPage() {
  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>치료결과</h1>
          <p className={styles.description}>
            recoveriX 치료를 받은 환자들의 실제 치료 결과를 확인하세요.
          </p>

          <div className={styles.resultsSection}>
            <h2 className={styles.sectionTitle}>recoveriX 전후 결과</h2>
            <p className={styles.sectionDescription}>
              이 다발성 경화증 환자는 시간 제한 25피트 걷기 테스트(T25FW)를
              실시했습니다. 이 검사는 환자가 25피트(즉, 7.62m)를 걷는 데 걸리는
              시간(초)을 측정하여 보행 속도를 평가합니다. 이 검사는 다발성
              경화증 환자를 평가하는 데 신뢰할 수 있고 권장되는 척도입니다.
            </p>
            <VideoCarousel />
          </div>

          <div className={styles.statsSection}>
            <h2 className={styles.sectionTitle}>치료 통계</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>85%</div>
                <div className={styles.statLabel}>환자 만족도</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>3-6개월</div>
                <div className={styles.statLabel}>평균 치료 기간</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>70%</div>
                <div className={styles.statLabel}>운동 기능 개선률</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>1000+</div>
                <div className={styles.statLabel}>치료 완료 환자</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
