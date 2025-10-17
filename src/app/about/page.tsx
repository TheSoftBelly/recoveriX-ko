import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/pages/AboutPage.module.scss";
import { Award, Globe, Users, TrendingUp, Heart, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회사소개 | recoveriX Korea - GTEC 재활기기 공식 파트너",
  description:
    "recoveriX를 개발한 g.tec medical engineering GmbH와 국내 공식 파트너 뉴로솔루션즈를 소개합니다. 25년 이상의 BCI 기술 전문성, 60개국 이상 보급, 700편 이상의 연구 논문으로 검증된 첨단 뇌재활 솔루션입니다.",
  keywords:
    "g.tec medical engineering, 뉴로솔루션즈, GTEC 재활기기, BCI 기술, 뇌컴퓨터인터페이스, 첨단 뇌재활 장비, 의료기기 인증, GMP 인증",
  openGraph: {
    title: "회사소개 | recoveriX Korea - GTEC 재활기기 공식 파트너",
    description:
      "recoveriX를 개발한 g.tec medical engineering GmbH와 국내 공식 파트너 뉴로솔루션즈를 소개합니다. 25년 이상의 BCI 기술 전문성.",
    url: "https://www.recoverix.co.kr/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <h1 className={styles.heroTitle}>회사소개</h1>
            <p className={styles.heroDescription}>
              recoveriX를 개발한 g.tec medical engineering GmbH와
              국내 공식 파트너 뉴로솔루션즈를 소개합니다.
            </p>
          </div>

          {/* 뉴로솔루션즈 인사말 섹션 - 최상단으로 이동 */}
          <section className={styles.introSection}>
            <h2 className={styles.sectionTitle}>뉴로솔루션즈 인사말</h2>
            <p>
              인사 말씀을 드립니다.
              <br />
              저희 뉴로솔루션즈는{" "}
              <strong>
                "재활의 기쁨과 건강한 몸과 마음, 그리고 가족의 행복한 삶에
                기여하는 기업"
              </strong>
              을 비전으로 삼고, 오스트리아 G.Tec Medical Engineering GmbH와의
              공식 파트너십을 통해 최첨단 비침습 뇌컴퓨터인터페이스(BCI)기반
              재활의료기 <strong>리커버리엑스(RecoveriX)</strong>를 제공해
              드리고 있습니다.
            </p>
            <p>
              G.Tec 社는 1999년 설립 이후 25년 이상 뇌신경 인터페이스 분야를
              선도해 온 세계적인 기업으로, 유럽, 북미, 아시아, 중남미 등 60여
              개국 이상에 기술과 제품을 보급하고 있으며, 700편 이상의 국제 학술
              논문 및 임상 연구를 통한 과학적 효과를 검증하였습니다.
            </p>
            <p>
              리커버리엑스 의료기는 단순한 물리치료 기기를 넘어, 뇌의 상상
              움직임을 해석하여 실제 근육을 자극하고, 시각 및 촉각 피드백을 통해
              뇌신경망을 다시 연결하는 혁신적인 BCI 치료 솔루션입니다.
            </p>
            <p>
              이미 독일, 오스트리아, 스위스, 미국, 캐나다 등 주요 국가의
              대학병원과 재활센터에서 뇌졸중, 외상성 뇌손상, 다발성 경화증
              환자분들 뿐만 아니라 파킨슨병 환자분들의 신경 기능 회복을 돕고
              있으며, 많은 분들께 다시 일상으로 복귀라는 기쁨을 선사하고
              있습니다.
            </p>
            <p>
              우리 뉴로솔루션즈는 이러한 세계적인 기술을 우리나라에 도입해 최신
              뇌신경과학과 재활의학의 융합을 통해, 더 빠르고 더 효과적인 회복
              솔루션을 제공하려고 합니다.
            </p>
            <p>앞으로도 저희는</p>
            <ul>
              <li>
                신뢰와 믿음 — 재활을 통해 건강한 몸과 마음을 회복하도록 확고한
                신뢰와 믿음을 전한다.
              </li>
              <li>
                혁신과 전문성 — BCI 기반 세계 최고 수준의 첨단 재활 치료
                솔루션을 지속적으로 제공한다.
              </li>
              <li>
                삶의 가치 향상 — 재활을 통해 건강과 행복이 공존하는 삶을
                실현하며 BCI 치료 문화를 선도한다.
              </li>
            </ul>

            <p>
              를 핵심 철학으로, 대한민국 뇌건강 회복의 새로운 표준을 세우고
              발전해 나가겠습니다.
            </p>
            <p>
              갑자기 찾아온 불행을 행복으로 전환하실 수 있게 환자분과 가족
              분들을 항상 응원하겠습니다.
            </p>
            <p>
              감사합니다.
              <br />
              뉴로솔루션즈 대표이사 드림
            </p>
          </section>

          {/* G.Tec 소개 섹션 */}
          <div className={styles.gtecSection}>
            <div className={styles.gtecGrid}>
              <div className={styles.gtecText}>
                <h2>g.tec medical engineering GmbH</h2>
                <p>
                  g.tec medical engineering GmbH는 오스트리아 그라츠에 본사를 둔
                  의료 공학 전문 기업입니다. 1999년 설립 이후, 뇌-컴퓨터
                  인터페이스(BCI) 기술 분야에서 세계적인 선두주자로 자리잡고
                  있습니다.
                </p>
                <p>
                  뇌졸중, 다발성 경화증, 외상성 뇌 손상, 파킨슨병 등 신경 장애로
                  고통받는 환자들을 위한 혁신적인 재활 솔루션을 개발하고
                  있습니다.
                </p>
              </div>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <Globe className={styles.statIcon} size={32} />
                  <div className={styles.statNumber}>60+</div>
                  <div className={styles.statLabel}>개국 보급</div>
                </div>
                <div className={styles.statCard}>
                  <Award className={styles.statIcon} size={32} />
                  <div className={styles.statNumber}>700+</div>
                  <div className={styles.statLabel}>연구 논문</div>
                </div>
                <div className={styles.statCard}>
                  <TrendingUp className={styles.statIcon} size={32} />
                  <div className={styles.statNumber}>25+</div>
                  <div className={styles.statLabel}>년 전문성</div>
                </div>
                <div className={styles.statCard}>
                  <Heart className={styles.statIcon} size={32} />
                  <div className={styles.statNumber}>1000+</div>
                  <div className={styles.statLabel}>환자 치료</div>
                </div>
              </div>
            </div>
          </div>

          {/* 제품별 섹션 */}
          <div className={styles.productSection}>
            <h2 className={styles.productTitle}>우리의 제품</h2>
            <div className={styles.productCard}>
              <div className={styles.productHeader}>
                <Zap className={styles.productIcon} size={32} />
                <div>
                  <h3>recoveriX</h3>
                  <p>
                    recoveriX는 뇌의 신경가소성을 활용하여 잃어버린 운동 기능을
                    회복시키는 획기적인 BCI 기반 재활 치료 시스템입니다.
                  </p>
                </div>
              </div>

              <div className={styles.featureGrid}>
                <div className={styles.featureItem}>
                  <h4>뇌파 감지 기술</h4>
                  <p>
                    환자의 상상 움직임을 실시간으로 감지하여 치료에 활용합니다.
                  </p>
                </div>
                <div className={styles.featureItem}>
                  <h4>전기 자극 치료</h4>
                  <p>
                    근육에 정확한 전기 자극을 제공하여 신경망을 재연결합니다.
                  </p>
                </div>
                <div className={styles.featureItem}>
                  <h4>시각/촉각 피드백</h4>
                  <p>
                    다중 감각 피드백으로 뇌의 학습 효과를 극대화합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 핵심 가치 */}
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

          {/* GMP 인증서 섹션 */}
          <div className={styles.certificateSection}>
            <h2 className={styles.sectionTitle}>인증서</h2>
            <div className={styles.certificateCard}>
              <h3>GMP 인증서</h3>
              <p>
                g.tec medical engineering GmbH의 GMP(Good Manufacturing Practice) 인증서를 확인하실 수 있습니다.
              </p>
              <a
                href="/certificates/GMP-certificate-KTR-BAAFA-24242.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.pdfButton}
              >
                PDF 다운로드
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
