import Header from "@/components/layout/Header";
import VideoCarousel from "@/components/VideoCarousel";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/pages/HomePage.module.scss";

export default async function MainPage() {
  return (
    <div className={styles.pageContainer}>
      <Header />

      <main>
        {/* 메인 히어로 섹션 */}
        <section className={styles.heroSection}>
          <video className={styles.heroVideo} autoPlay muted loop playsInline>
            <source
              src="https://recoverix.com/wp-content/uploads/2024/07/Final-231110-Recoverix-Awareness-Full-Ohne-Deutsche-Einblendung-smaller.mp4"
              type="video/mp4"
            />
          </video>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>새로운 시작을 해보세요</h1>
            <h2 className={`${styles.heroSubtitle} ${styles.noBreak}`}>
              뇌졸중 및 다발성 경화증에 대한 신경 재활
            </h2>
            <p className={styles.heroDescription}>
              recoveriX는 뇌가 스스로 재구성하여 잃어버린 운동 기능을 다시
              학습하도록 돕는 뇌-컴퓨터 인터페이스 기술입니다.
            </p>
          </div>
        </section>

        {/* 뉴스 미디어 로고 섹션 */}
        <section className={styles.mediaSection}>
          <div className={styles.mediaContainer}>
            <div className={styles.mediaLogos}>
              <div className={styles.mediaLogo}>
                <Image
                  src="https://recoverix.com/wp-content/uploads/2023/10/forbes-1.svg"
                  alt="Forbes"
                  width={240}
                  height={123}
                  priority
                />
              </div>
              <div className={styles.mediaLogo}>
                <Image
                  src="https://recoverix.com/wp-content/uploads/2023/10/newyorkweekly-1.svg"
                  alt="New York Weekly"
                  width={240}
                  height={123}
                  priority
                />
              </div>
              <div className={styles.mediaLogo}>
                <Image
                  src="https://recoverix.com/wp-content/uploads/2023/10/thesciencetimes-1.svg"
                  alt="The Science Times"
                  width={240}
                  height={123}
                  priority
                />
              </div>
              <div className={styles.mediaLogo}>
                <Image
                  src="https://recoverix.com/wp-content/uploads/2023/10/benzinga-1.svg"
                  alt="Benzinga"
                  width={240}
                  height={123}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* 독립성 극대화 섹션 */}
        <section className={styles.contentSection}>
          <div className={styles.contentContainer}>
            <div className={styles.contentGrid}>
              <div className={styles.contentText}>
                <h2 className={styles.contentTitle}>독립성을 극대화하세요</h2>
                <h3 className={styles.contentSubtitle}>기능적 능력 향상</h3>
                <p className={styles.contentDescription}>
                  뇌졸중, 다발성 경화증 또는 외상성 뇌 손상이 움직이는 능력에
                  영향을 미치더라도 반드시 상실되는 것은 아닙니다! 이러한 이유로
                  g.tec 의료 공학에서는 뇌가 스스로 재연결되도록 돕는 뇌-컴퓨터
                  인터페이스 기술을 기반으로 한 독특한 재활 접근 방식인
                  recoveriX 신경기술을 개발했습니다.
                </p>
                <p className={styles.contentDescription}>
                  recoveriX는 손이나 발의 움직임을 상상하는 작업을 제공하는
                  동시에 근육 자극과 시각적 시뮬레이션을 통해 실시간으로
                  피드백을 제공합니다. 이 과정은 뇌 내의 신경가소성을 유도하여
                  잃어버린 운동 기능을 다시 학습합니다.
                </p>
                <button className={styles.contentButton}>
                  다발성 경화증을 위한 recoveriX
                </button>
              </div>
              <div className={styles.contentImage}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={styles.contentVideo}
                >
                  <source
                    src="https://recoverix.com/wp-content/uploads/2024/04/web-Website-Video-1X1-Fuss.mp4?_=1"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* 새로운 시작 섹션 */}
        <section className={styles.contentSection}>
          <div className={styles.contentContainer}>
            <div className={`${styles.contentGrid} ${styles.reverse}`}>
              <div className={styles.contentImage}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={styles.contentVideo}
                >
                  <source
                    src="https://recoverix.com/wp-content/uploads/2024/04/web-Website-Video-1X1-Hand.mp4?_=2"
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className={`${styles.contentText} ${styles.textRight}`}>
                <h2 className={styles.contentTitle}>새로운 시작을 해보세요</h2>
                <h3 className={styles.contentSubtitle}>
                  재활에 늦은 때란 없습니다!
                </h3>
                <p className={styles.contentDescription}>
                  recoveriX는 뇌졸중 또는 다발성 경화증 환자가 통증, 경직 및
                  떨림을 감소시켜 운동 기능, 집중력, 수동적 관절 운동, 민감도,
                  방광 조절, 성기능, 균형, 보행 및 얼굴, 신체 또는 사지의
                  무감각을 더욱 개선하는 데 도움이 됩니다. 특히 환자가 피로를 덜
                  느끼고 발이 얼거나 발이 떨어지는 현상이 감소한다는 점은
                  놀랍습니다.
                </p>
                <p className={styles.contentDescription}>
                  recoveriX는 더 빠르고 성공적인 회복을 위한 기회로 물리 및 작업
                  치료를 보완합니다. 급성, 아급성, 만성 상태에서 사용할 수
                  있습니다. 심지어 다발성 경화증 진단이나 뇌졸중 후 10년, 20년,
                  30년 후에도 사용할 수 있습니다!
                </p>
                <button className={styles.contentButton}>
                  뇌졸증을 위한 recoveriX
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 전문의의 의견 섹션 */}
        <section className={styles.doctorSection}>
          <div className={styles.contentContainer}>
            <div className={styles.doctorGrid}>
              <div className={styles.doctorText}>
                <h2 className={styles.contentTitle}>
                  recoveriX에 대한 신경과 전문의의 의견
                </h2>
                <h3 className={styles.contentSubtitle}>
                  Tim von Oertzen 박사와의 인터뷰
                </h3>
                <p className={styles.contentDescription}>
                  최근 인터뷰에서 유명한 신경학자인 Tim von Oertzen 박사는
                  뇌졸중 및 다발성 경화증 환자를 위한 recoveriX 신경 재활의
                  이점을 강조했습니다. 그는 장애가 있는 사람들의 상지와 하지를
                  훈련할 수 있는 recoveriX의 잠재력을 강조하면서 직접 경험한
                  운동, 보행, 균형 및 움직임 제어의 상당한 개선을 언급했습니다.
                </p>
                <button className={styles.contentButton}>
                  뇌졸증을 위한 recoveriX
                </button>
              </div>
              <div className={styles.doctorImage}>
                <iframe
                  src="https://www.youtube.com/embed/SPruWQz968U"
                  title="Tim von Oertzen 박사 인터뷰"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* 전후결과 섹션 */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsContainer}>
            <h2 className={styles.resultsTitle}>recoveriX 전후 결과</h2>
            <p className={styles.resultsDescription}>
              이 다발성 경화증 환자는 시간 제한 25피트 걷기 테스트(T25FW)를
              실시했습니다. 이 검사는 환자가 25피트(즉, 7.62m)를 걷는 데 걸리는
              시간(초)을 측정하여 보행 속도를 평가합니다. 이 검사는 다발성
              경화증 환자를 평가하는 데 신뢰할 수 있고 권장되는 척도입니다.
            </p>
            <VideoCarousel />
          </div>
        </section>

        {/* CEO 말 섹션 */}
        <section className={styles.ceoSection}>
          <div className={styles.ceoContainer}>
            <div className={styles.ceoImage}>
              <Image
                src="https://recoverix.com/wp-content/uploads/2022/05/christoph-guger-monochrom.jpg"
                alt="Dr. Christoph Guger"
                width={200}
                height={200}
                className={styles.ceoPhoto}
              />
            </div>
            <div className={styles.ceoText}>
              <p className={styles.ceoQuote}>
                recoveriX 연구에서 우리는 recoveriX 치료법이 뇌졸중 후 10년,
                20년 또는 30년이 지나도 매우 효과적이 라는 것을 입증했습니다.
              </p>
              <p className={styles.ceoName}>
                Dr. Christoph Guger
                <br />
                g.tec medical engineering GmbH의 CEO 겸 창립자
              </p>
            </div>
          </div>
        </section>

        {/* 7가지 표준치료법 섹션 */}
        <section className={styles.therapySection}>
          <div className={styles.therapyContainer}>
            <div className={styles.therapyHeading}>
              <h2 className={styles.therapyTitle}>7가지 표준 치료법의 융합</h2>
              <p className={styles.therapyDescription}>
                신경 장애로 인해 움직이는 능력이 억제될 수도 있지만, 움직임을
                상상하는 능력은 그렇지 않을 수도 있습니다! 손이나 발의 움직임을
                상상해 보세요. 상상은 실제 손이나 발의 움직임과 거의 동일한 두뇌
                활동을 촉발합니다. 이것이 바로 recoveriX가 치료에 사용하는
                것입니다! 세 가지 종류의 뉴로피드백을 통해 recoveriX는 성공적인
                치료 가능성을 높여줍니다.
              </p>
            </div>
            <div className={styles.therapyListContainer}>
              <div className={styles.therapyList}>
                <div className={styles.therapyItem}>
                  <div className={styles.therapyIcon}>
                    <Image
                      src="https://recoverix.com/wp-content/uploads/2022/05/therapy1.png"
                      alt="Motor Imagery"
                      width={128}
                      height={128}
                    />
                  </div>
                  <h3 className={styles.therapyItemTitle}>모터 이미지(MI)</h3>
                  <p className={styles.therapyItemDescription}>
                    손이나 발의 움직임을 상상해 보세요. recoveriX는 운동
                    이미지를 반영하는 뇌파를 측정하고 분석하여 운동 이미지가
                    올바른지 판단합니다.
                  </p>
                  <p className={styles.therapyItemDescription}>
                    운동 이미지가 인식되면 가상 현실과 기능적 전기 자극이
                    활성화됩니다.
                  </p>
                  <h4 className={styles.therapyItemTitle}>긍정적인 영향</h4>
                  <p className={styles.therapyItemDescription}>
                    기존 물리치료와 달리 BCI는 사람들이 해당 동작을상상할 때만
                    실제 움직임이 발생함을 보장합니다.
                  </p>
                </div>
                <div className={styles.therapyItem}>
                  <div className={styles.therapyIcon}>
                    <Image
                      src="https://recoverix.com/wp-content/uploads/2022/05/therapy2.png"
                      alt="Virtual Reality"
                      width={128}
                      height={128}
                    />
                  </div>
                  <h3 className={styles.therapyItemTitle}>가상현실 (VR)</h3>
                  <p className={styles.therapyItemDescription}>
                    화면의 시뮬레이션을 통해 모터 이미지를 볼 수 있습니다.
                    환자들은 화면 앞에 앉아 아바타의 손과 발을 봅니다. 이는
                    환자에게 거울 앞에서 자신의 움직임을 지켜보는 듯한 느낌을
                    줍니다.
                  </p>
                  <h4 className={styles.therapyItemTitle}>긍정적인 영향</h4>
                  <p className={styles.therapyItemDescription}>
                    recoveriX가 움직임의 운동 이미지(예: 오른손 움직임)를
                    인식하면 아바타는 오른손을 움직입니다.
                  </p>
                </div>
                <div className={styles.therapyItem}>
                  <div className={styles.therapyIcon}>
                    <Image
                      src="https://recoverix.com/wp-content/uploads/2022/05/therapy3.png"
                      alt="Electrical Stimulation"
                      width={128}
                      height={128}
                    />
                  </div>
                  <h3 className={styles.therapyItemTitle}>전기 자극(FES)</h3>
                  <p className={styles.therapyItemDescription}>
                    이 자극을 위해 예를 들어 손목의 배측 굴곡근이나 다리에 두
                    개의 전극을 배치합니다. 시스템이 올바른 운동 이미지를
                    인식하면 근육이 전기적으로 자극되어 실제 움직임이
                    발생합니다.
                  </p>
                  <p className={styles.therapyItemDescription}>
                    이는 움직임을 시작하는 방법을 다시 배우는 데 도움이 되어
                    움직임을 다시 가능하게 만듭니다.
                  </p>
                  <h4 className={styles.therapyItemTitle}>긍정적인 영향</h4>
                  <p className={styles.therapyItemDescription}>
                    환자는 경험이 환자에게 원하는 목표, 즉 다시 움직일 수 있다는
                    것을 반복적으로 상기시키기 때문에 동기를 부여받습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 환자 후기 섹션 */}
        <section className={styles.testimonialSection}>
          <div className={styles.testimonialContainer}>
            <div className={styles.testimonialImage}>
              <Image
                src="https://recoverix.com/wp-content/uploads/2022/05/review-image.png"
                alt="Patient Testimonial"
                width={200}
                height={200}
                className={styles.testimonialPhoto}
              />
            </div>
            <div className={styles.testimonialText}>
              <p className={styles.testimonialQuote}>
                reoveriX는 내 하루를 다시 살 가치가 있게 만들어주었습니다. 치료
                이후 오른손의 운동 기능이 많이 좋아졌습니다. 나는 다시 손을
                움직이고 제어하는 법을 배웠고 심지어 미용사로서의 직업도
                되찾았습니다. 나는 이것이 가능할 것이라고 결코 상상하지
                못했습니다. 이제 내 팔과 손은 다시 내 몸에 속하게 되었습니다.
              </p>
              <p className={styles.testimonialName}>
                Astrid Brandstätter
                <br />
                이전 recoveriX 환자, 오스트리아
              </p>
            </div>
          </div>
        </section>

        {/* recoveriX at Home 섹션 */}
        <section className={styles.appSection}>
          <div className={styles.appContainer}>
            <div className={styles.appImage}>
              <Image
                src="https://recoverix.com/wp-content/uploads/2023/11/recoveriX-at-Home-Android-Screen-02.jpg"
                alt="recoveriX at Home 앱"
                width={400}
                height={600}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className={styles.appText}>
              <p className={styles.appLabel}>Android 및 iOS 기기용 모바일 앱</p>
              <h2 className={styles.appTitle}>recoveriX at Home</h2>
              <p className={styles.appDescription}>
                정기적인 운동 심상은 신경 경로를 재활성화하고, 신경 가소성을
                촉진하며, 뇌졸중, 다발성 경화증 또는 외상성 뇌 손상과 같은 부상
                후 회복 과정에 도움을 줄 수 있습니다.
              </p>
              <p className={styles.appDescription}>
                g.tec 메디컬 엔지니어링에서 개발한 새로운 앱 recoveriX at Home을
                만나보세요. 이 앱은 recoveriX 고객이 가정에서 운동 심상 훈련을
                수행하여 운동 기능을 향상할 수 있도록 설계되었습니다.
              </p>
              <p className={styles.appLinks}>
                이 앱은{" "}
                <a href="#" className={styles.appLink}>
                  Android
                </a>{" "}
                및{" "}
                <a href="#" className={styles.appLink}>
                  Apple
                </a>{" "}
                기기에서 이용할 수 있습니다!
              </p>
            </div>
          </div>
        </section>

        {/* 세계지도 섹션 */}
        <section className={styles.mapSection}>
          <div className={styles.mapContainer}>
            <Image
              src="https://recoverix.com/wp-content/uploads/2022/07/new-worldmap-2024-new.png"
              alt="recoveriX World Map"
              width={800}
              height={400}
              className={styles.mapImage}
            />
            <a href="#" className={styles.mapLink}>
              당신 근처의 recoveriX
            </a>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo} />
          <div className={styles.footerLinks}>
            <Link href="/news" className={styles.footerLink}>
              소식
            </Link>
            <Link href="/faq" className={styles.footerLink}>
              자주 묻는 질문
            </Link>
            <Link href="/results" className={styles.footerLink}>
              치료결과
            </Link>
            <Link href="/about" className={styles.footerLink}>
              회사소개
            </Link>
            <Link href="/contact" className={styles.footerLink}>
              문의
            </Link>
          </div>

          <div className={styles.footerSocial}>
            <a href="#" className={styles.socialIcon}>
              f
            </a>
            <a href="#" className={styles.socialIcon}>
              t
            </a>
            <a href="#" className={styles.socialIcon}>
              in
            </a>
            <a href="#" className={styles.socialIcon}>
              yt
            </a>
            <a href="#" className={styles.socialIcon}>
              ig
            </a>
          </div>

          <div className={styles.footerCopyright}>
            recoveriX는 g.tec medical engineering
            <br />
            GmbH의 제품입니다. 2025 © 판권 소유
          </div>
        </div>
      </footer>
    </div>
  );
}
