import Header from "@/components/layout/Header";
import Image from "next/image";
import styles from "@/styles/pages/AboutPage.module.scss";

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>회사소개</h1>
          <p className={styles.description}>
            recoveriX를 개발한 g.tec medical engineering GmbH에 대해 알아보세요.
          </p>

          <div className={styles.contentSection}>
            <div className={styles.contentGrid}>
              <div className={styles.contentText}>
                <h2 className={styles.sectionTitle}>
                  g.tec medical engineering GmbH
                </h2>
                <p className={styles.contentDescription}>
                  g.tec medical engineering GmbH는 오스트리아 그라츠에 본사를 둔
                  의료 공학 전문 기업입니다. 1999년 설립 이후, 뇌-컴퓨터
                  인터페이스(BCI) 기술 분야에서 세계적인 선두주자로 자리잡고
                  있습니다.
                </p>
                <p className={styles.contentDescription}>
                  우리는 뇌졸중, 다발성 경화증, 외상성 뇌 손상 등 신경 장애로
                  고통받는 환자들을 위한 혁신적인 재활 솔루션을 개발하고
                  있습니다. recoveriX는 이러한 노력의 결과물로, 뇌의
                  신경가소성을 활용하여 잃어버린 운동 기능을 회복시키는 획기적인
                  치료법입니다.
                </p>
              </div>
              <div className={styles.contentImage}>
                <Image
                  src="https://recoverix.com/wp-content/uploads/2022/05/christoph-guger-monochrom.jpg"
                  alt="Dr. Christoph Guger"
                  width={300}
                  height={300}
                  className={styles.ceoPhoto}
                />
              </div>
            </div>
          </div>

          <div className={styles.missionSection}>
            <h2 className={styles.sectionTitle}>우리의 미션</h2>
            <p className={styles.missionText}>
              신경 장애로 인해 일상생활에 어려움을 겪는 환자들에게 희망을
              제공하고, 최첨단 기술을 통해 삶의 질을 향상시키는 것입니다.
            </p>
          </div>

          <div className={styles.valuesSection}>
            <h2 className={styles.sectionTitle}>핵심 가치</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.valueItem}>
                <h3 className={styles.valueTitle}>혁신</h3>
                <p className={styles.valueDescription}>
                  최신 기술과 연구를 바탕으로 혁신적인 의료 솔루션을 개발합니다.
                </p>
              </div>
              <div className={styles.valueItem}>
                <h3 className={styles.valueTitle}>환자 중심</h3>
                <p className={styles.valueDescription}>
                  환자의 안전과 치료 효과를 최우선으로 생각합니다.
                </p>
              </div>
              <div className={styles.valueItem}>
                <h3 className={styles.valueTitle}>과학적 근거</h3>
                <p className={styles.valueDescription}>
                  모든 치료법은 엄격한 임상 연구를 통해 검증됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
