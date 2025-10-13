import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VideoCarousel from "@/components/VideoCarousel";
import styles from "@/styles/pages/ResultsPage.module.scss";
import { TrendingUp, Award, Users, Clock, Check } from "lucide-react";

export default function ResultsPage() {
  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <h1 className={styles.title}>치료결과</h1>
            <p className={styles.description}>
              recoveriX 치료를 받은 환자들의 실제 치료 결과와 임상 데이터를 확인하세요.
            </p>
          </div>

          {/* Video Results Section */}
          <div className={styles.resultsSection}>
            <div className={styles.sectionHeader}>
              <TrendingUp size={32} className={styles.sectionIcon} />
              <h2 className={styles.sectionTitle}>recoveriX 전후 비교</h2>
            </div>
            <p className={styles.sectionDescription}>
              이 다발성 경화증 환자는 시간 제한 25피트 걷기 테스트(T25FW)를
              실시했습니다. 이 검사는 환자가 25피트(즉, 7.62m)를 걷는 데 걸리는
              시간(초)을 측정하여 보행 속도를 평가합니다. 이 검사는 다발성
              경화증 환자를 평가하는 데 신뢰할 수 있고 권장되는 척도입니다.
            </p>
            <VideoCarousel />
          </div>

          {/* Stats Section */}
          <div className={styles.statsSection}>
            <div className={styles.sectionHeader}>
              <Award size={32} className={styles.sectionIcon} />
              <h2 className={styles.sectionTitle}>임상 데이터</h2>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Users size={32} />
                </div>
                <div className={styles.statNumber}>85%</div>
                <div className={styles.statLabel}>환자 만족도</div>
                <p className={styles.statDescription}>
                  치료를 받은 환자 중 85%가 높은 만족도를 표현했습니다.
                </p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Clock size={32} />
                </div>
                <div className={styles.statNumber}>3-6개월</div>
                <div className={styles.statLabel}>평균 치료 기간</div>
                <p className={styles.statDescription}>
                  대부분의 환자가 3-6개월 내 유의미한 개선을 경험합니다.
                </p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <TrendingUp size={32} />
                </div>
                <div className={styles.statNumber}>70%</div>
                <div className={styles.statLabel}>운동 기능 개선률</div>
                <p className={styles.statDescription}>
                  상지와 하지 운동 기능이 평균 70% 향상되었습니다.
                </p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Users size={32} />
                </div>
                <div className={styles.statNumber}>1000+</div>
                <div className={styles.statLabel}>치료 완료 환자</div>
                <p className={styles.statDescription}>
                  전 세계 1000명 이상의 환자가 성공적으로 치료를 완료했습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Clinical Evidence Section */}
          <div className={styles.evidenceSection}>
            <h2 className={styles.sectionTitle}>과학적 근거</h2>
            <div className={styles.evidenceGrid}>
              <div className={styles.evidenceCard}>
                <div className={styles.evidenceNumber}>700+</div>
                <p className={styles.evidenceText}>국제 학술 논문 발표</p>
              </div>
              <div className={styles.evidenceCard}>
                <div className={styles.evidenceNumber}>60+</div>
                <p className={styles.evidenceText}>국가에서 사용 중</p>
              </div>
              <div className={styles.evidenceCard}>
                <div className={styles.evidenceNumber}>15+</div>
                <p className={styles.evidenceText}>년간의 임상 연구</p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className={styles.benefitsSection}>
            <h2 className={styles.sectionTitle}>치료 효과</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <Check className={styles.benefitIcon} size={24} />
                <h3 className={styles.benefitTitle}>상지 운동 기능 회복</h3>
                <p className={styles.benefitText}>
                  손과 팔의 섬세한 움직임과 협응력이 향상됩니다.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <Check className={styles.benefitIcon} size={24} />
                <h3 className={styles.benefitTitle}>하지 운동 기능 회복</h3>
                <p className={styles.benefitText}>
                  보행 속도와 균형감각, 다리 근력이 개선됩니다.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <Check className={styles.benefitIcon} size={24} />
                <h3 className={styles.benefitTitle}>일상 생활 능력 향상</h3>
                <p className={styles.benefitText}>
                  식사, 착의, 이동 등 일상적인 활동이 더 쉬워집니다.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <Check className={styles.benefitIcon} size={24} />
                <h3 className={styles.benefitTitle}>삶의 질 개선</h3>
                <p className={styles.benefitText}>
                  독립성과 자신감이 향상되어 전반적인 삶의 질이 개선됩니다.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <Check className={styles.benefitIcon} size={24} />
                <h3 className={styles.benefitTitle}>통증 감소</h3>
                <p className={styles.benefitText}>
                  근육 경직과 통증이 완화되어 편안함이 증가합니다.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <Check className={styles.benefitIcon} size={24} />
                <h3 className={styles.benefitTitle}>뇌 신경가소성 증진</h3>
                <p className={styles.benefitText}>
                  뇌의 재조직화를 촉진하여 장기적인 회복을 지원합니다.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={styles.ctaSection}>
            <h2>recoveriX로 새로운 시작을 경험하세요</h2>
            <p>
              전문가와 상담하여 귀하에게 맞는 치료 계획을 수립하세요.
            </p>
            <a href="/contact" className={styles.ctaButton}>
              상담 신청하기
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
