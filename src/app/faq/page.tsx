import Header from "@/components/layout/Header";
import styles from "@/styles/pages/FaqPage.module.scss";

export default function FaqPage() {
  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>자주 묻는 질문</h1>
          <p className={styles.description}>
            recoveriX에 대해 자주 묻는 질문들을 확인하세요.
          </p>

          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <h2 className={styles.faqQuestion}>
                recoveriX는 어떤 치료법인가요?
              </h2>
              <p className={styles.faqAnswer}>
                recoveriX는 뇌-컴퓨터 인터페이스 기술을 기반으로 한 신경 재활
                치료법입니다. 뇌졸중, 다발성 경화증, 외상성 뇌 손상 환자들이
                잃어버린 운동 기능을 다시 학습할 수 있도록 돕습니다.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h2 className={styles.faqQuestion}>
                치료 기간은 얼마나 걸리나요?
              </h2>
              <p className={styles.faqAnswer}>
                개인마다 차이가 있지만, 일반적으로 3-6개월의 치료 기간이
                필요합니다. 주 2-3회, 회당 1시간 정도의 치료를 받게 됩니다.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h2 className={styles.faqQuestion}>
                치료 효과는 언제부터 나타나나요?
              </h2>
              <p className={styles.faqAnswer}>
                일부 환자들은 치료 시작 후 2-4주 내에 개선을 느끼기 시작합니다.
                하지만 지속적인 개선을 위해서는 정기적인 치료가 필요합니다.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h2 className={styles.faqQuestion}>
                가정에서도 치료를 받을 수 있나요?
              </h2>
              <p className={styles.faqAnswer}>
                네, recoveriX at Home 앱을 통해 가정에서도 치료를 받을 수
                있습니다. 하지만 초기 진단과 치료 계획 수립은 전문 의료진과
                상담이 필요합니다.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h2 className={styles.faqQuestion}>보험 적용이 가능한가요?</h2>
              <p className={styles.faqAnswer}>
                보험 적용 여부는 각 보험사와 보험 상품에 따라 다릅니다. 치료
                시작 전에 보험사에 문의하시거나, 저희가 보험 적용을 도와드릴 수
                있습니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
