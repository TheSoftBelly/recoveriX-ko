"use client";

import { useState } from "react";
import styles from "@/styles/pages/HomePage.module.scss";

interface VideoSlide {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

interface TherapyItem {
  id: string;
  title: string;
  description: string;
  positiveImpacts: string;
  imageUrl: string;
}

const videoSlides: VideoSlide[] = [
  {
    id: "1",
    title: "T25FW 테스트",
    description:
      "이 다발성 경화증 환자는 시간 제한 25피트 걷기 테스트(T25FW)를 실시했습니다. 이 검사는 보행 속도를 측정하여 평가하는 신뢰할 수 있는 척도입니다.",
    videoUrl: "https://www.youtube.com/embed/0ecDhEQFrx4?si=dcv6JyVi2F-O85Vx",
  },
  {
    id: "2",
    title: "9홀 페그 테스트",
    description:
      "이 환자는 9홀 페그 테스트를 실시했습니다. 이 테스트는 손의 민첩성을 측정하는 표준화된 평가 도구입니다.",
    videoUrl: "https://www.youtube.com/embed/eSjL39SItKI?si=koDQD8eILU_BHikT",
  },
  {
    id: "3",
    title: "Box and Block 테스트",
    description:
      "환자가 Box and Block 테스트를 수행하는 모습입니다. 이 테스트는 손의 민첩성과 거친 운동 기능을 평가합니다.",
    videoUrl: "https://www.youtube.com/embed/iFGJzgJVYSQ?si=yJtnkapSvZ8sWoww",
  },
  {
    id: "4",
    title: "9홀 페그 테스트 (2)",
    description:
      "이 환자는 9홀 페그 테스트를 실시했습니다. 이 테스트는 손의 민첩성을 측정하는 표준화된 평가 도구입니다.",
    videoUrl: "https://www.youtube.com/embed/Y6fyzVa2fCk?si=zW72jV4UaCT21Xl-",
  },
  {
    id: "5",
    title: "9홀 페그 테스트 (3)",
    description:
      "이 환자는 9홀 페그 테스트를 실시했습니다. 이 테스트는 손의 민첩성을 측정하는 표준화된 평가 도구입니다.",
    videoUrl: "https://www.youtube.com/embed/sVdTweGS1zQ?si=SulPT7JLiwgv4RYu",
  },
  {
    id: "6",
    title: "Box and Block 테스트 (2)",
    description:
      "환자가 Box and Block 테스트를 수행하는 모습입니다. 이 테스트는 손의 민첩성과 거친 운동 기능을 평가합니다.",
    videoUrl: "https://www.youtube.com/embed/Gw_aC1_Wre4?si=-4OqdOp0bqevl3s_",
  },
  {
    id: "7",
    title: "9홀 페그 테스트 (4)",
    description:
      "이 환자는 9홀 페그 테스트를 실시했습니다. 이 테스트는 손의 민첩성을 측정하는 표준화된 평가 도구입니다.",
    videoUrl: "https://www.youtube.com/embed/gbXyko8uCpo?si=px2yeOlLQr6cPknm",
  },
  {
    id: "8",
    title: "Timed Up and Go 테스트",
    description:
      "환자가 Timed Up and Go 테스트를 수행하는 모습입니다. 이 테스트는 이동성을 평가하며 균형과 협응을 필요로 합니다.",
    videoUrl: "https://www.youtube.com/embed/FGz0K_NO5nM?si=VH9sVjmEWf6zTTgN",
  },
  {
    id: "9",
    title: "Timed Up and Go 테스트 (2)",
    description:
      "환자가 Timed Up and Go 테스트를 수행하는 모습입니다. 이 테스트는 이동성을 평가하며 균형과 협응을 필요로 합니다.",
    videoUrl: "https://www.youtube.com/embed/-rbCKaMIIJw?si=qPdhi70y9b9mWMDj",
  },
  {
    id: "10",
    title: "recoveriX EEG 모니터링",
    description:
      "recoveriX가 환자의 손이나 발 움직임을 상상하는 동안 EEG 활동을 측정하는 모습입니다. 뇌졸중 환자의 손 움직임 개선을 볼 수 있습니다.",
    videoUrl: "https://www.youtube.com/embed/4JRGvO4t5WE?si=pxZzqMUMPFLOi_uz",
  },
  {
    id: "11",
    title: "10미터 보행 테스트",
    description:
      "이 환자는 10미터 보행 테스트를 실시했습니다. 이 평가는 짧은 거리에서 개인의 보행 속도를 측정하여 이동성과 기능적 능력을 평가합니다.",
    videoUrl: "https://www.youtube.com/embed/mhYYNZ1NOQ4?si=hYyiUZEh9ehzKyw2",
  },
  {
    id: "12",
    title: "다발성 경화증 Timed Up and Go",
    description:
      "다발성 경화증 환자가 Timed Up and Go 테스트를 수행하는 모습입니다. 이 테스트는 이동성을 평가하며 균형과 협응을 필요로 합니다.",
    videoUrl: "https://www.youtube.com/embed/q71ZvzJjvuY?si=ctsnJuhLY8axGIsY",
  },
  {
    id: "13",
    title: "다발성 경화증 T25FW 테스트",
    description:
      "이 다발성 경화증 환자는 시간 제한 25피트 걷기 테스트(T25FW)를 실시했습니다. 이 검사는 보행 속도를 측정하여 평가하는 신뢰할 수 있는 척도입니다.",
    videoUrl: "https://www.youtube.com/embed/lFxiP_5Id5Y?si=2jBIPxgctC8htDdc",
  },
];

const therapyItems: TherapyItem[] = [
  {
    id: "1",
    title: "Motor Imagery (MI)",
    description:
      "손이나 발 움직임을 상상해보세요. recoveriX는 뇌파를 측정하고 분석하여 운동 상상력을 반영하고 운동 상상이 올바른지 판단합니다. 운동 상상이 인식되면 가상현실과 기능적 전기자극이 활성화됩니다.",
    positiveImpacts:
      "기존의 물리치료와 달리 BCI는 사람들이 해당 움직임을 상상할 때만 실제 움직임이 발생하도록 보장합니다.",
    imageUrl: "https://recoverix.com/wp-content/uploads/2022/05/therapy1.png",
  },
  {
    id: "2",
    title: "Virtual Reality (VR)",
    description:
      "화면의 시뮬레이션이 운동 상상을 시각화합니다. 환자들은 화면 앞에 앉아서 아바타의 손과 발을 봅니다. 이는 환자들이 거울 앞에서 자신의 움직임을 보는 느낌을 줍니다.",
    positiveImpacts:
      "recoveriX가 움직임의 운동 상상(예: 오른손 움직임)을 인식하면 아바타가 오른손을 움직입니다.",
    imageUrl: "https://recoverix.com/wp-content/uploads/2022/05/therapy2.png",
  },
  {
    id: "3",
    title: "Electrical Stimulation (FES)",
    description:
      "이 자극을 위해 두 개의 전극이 배치됩니다(예: 손목의 배측굴근이나 다리에). 시스템이 올바른 운동 상상을 인식하면 근육이 전기적으로 자극되어 실제 움직임이 발생합니다. 이는 움직임을 시작하는 방법을 다시 배우는 데 도움이 되어 움직임을 다시 가능하게 해야 합니다.",
    positiveImpacts:
      "환자는 경험이 원하는 목표인 다시 움직일 수 있게 되는 것을 반복적으로 상기시켜주기 때문에 동기부여를 받습니다.",
    imageUrl: "https://recoverix.com/wp-content/uploads/2022/05/therapy3.png",
  },
  {
    id: "4",
    title: "Mirror Neuron training",
    description:
      "거울 뉴런은 한 사람이 다른 사람에게서 같은 행동을 관찰할 때 활성화됩니다.",
    positiveImpacts:
      "recoveriX가 환자의 EEG 신호에서 움직임의 정신적 상상을 인식하면, 예를 들어 오른손의 움직임, 화면의 가상 아바타가 실시간으로 해당 움직임을 시뮬레이션합니다. 이 시각적 피드백은 거울 뉴런 훈련과 유사합니다.",
    imageUrl: "https://recoverix.com/wp-content/uploads/2024/04/test4.png",
  },
  {
    id: "5",
    title: "Bilateral Training",
    description:
      "recoveriX는 환자가 신체 양쪽의 운동 상상을 연습하도록 권장합니다. 예를 들어 영향을 받은 오른발이나 왼손. 이 접근법은 뇌의 양쪽 반구의 활성화를 지원하도록 설계되었습니다.",
    positiveImpacts:
      "뇌의 양쪽 반구를 자극하면 움직임의 조정이 개선되고 손상된 쪽의 세밀한 운동 기능과 거친 운동 기능이 향상됩니다.",
    imageUrl: "https://recoverix.com/wp-content/uploads/2024/04/test3.png",
  },
  {
    id: "6",
    title: "Task-Based Training",
    description:
      "움직임을 상상함으로써 환자는 아바타를 제어하고 전기자극을 통해 실제 움직임을 유발할 수 있습니다. 올바르게 수행되면 손이나 발이 올라가고 환자는 작은 가상 공을 만질 수 있습니다.",
    positiveImpacts:
      "움직임의 반복적인 활성화는 뇌의 건강한 영역에서 새로운 신경 연결을 촉진하여 궁극적으로 근육 움직임을 올바르게 제어합니다.",
    imageUrl: "https://recoverix.com/wp-content/uploads/2024/04/test2.png",
  },
  {
    id: "7",
    title: "Constraint-induced movement training",
    description:
      "recoveriX 훈련 중에는 건강한 사지를 제한하여 손상된 사지를 자극합니다. 환자는 건강한 쪽과 손상된 쪽 모두의 움직임을 반복적으로 상상해야 합니다.",
    positiveImpacts:
      "이 방법은 두 반구 간의 조정을 촉진하고 경련을 줄이고 온도 조절을 정상화하는 데 도움이 될 수 있습니다.",
    imageUrl:
      "https://recoverix.com/wp-content/uploads/2024/04/all-icons-exportierfertig-1.png",
  },
];

export default function VideoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTherapySlide, setCurrentTherapySlide] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % videoSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + videoSlides.length) % videoSlides.length
    );
  };

  const goToTherapySlide = (index: number) => {
    setCurrentTherapySlide(index);
  };

  const nextTherapySlide = () => {
    setCurrentTherapySlide((prev) => (prev + 1) % therapyItems.length);
  };

  const prevTherapySlide = () => {
    setCurrentTherapySlide(
      (prev) => (prev - 1 + therapyItems.length) % therapyItems.length
    );
  };

  return (
    <>
      {/* 치료 섹션 */}
      <section
        className={styles.therapySection}
        style={{
          background: `url('https://recoverix.com/wp-content/uploads/2024/04/recoverix-therapy-dark-background-4-e1712907102214.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={styles.container}>
          <span className={styles.sectionTitle}>
            recoveriX is a unique combination of 7 trainings
          </span>
          <h2 className={styles.sectionName}>
            <span>A fusion of seven standard training approaches</span>
          </h2>
          <p className={styles.sectionDescription}>
            신경학적 장애는 움직임의 능력을 억제할 수 있지만, 움직임을 상상하는
            능력은 억제하지 않을 수 있습니다! 손이나 발 움직임을 상상해보세요 –
            상상은 실제 손이나 발 움직임과 거의 같은 뇌 활동을 유발합니다.
            이것이 바로 recoveriX가 훈련에 사용하는 것입니다! 세 가지 다른
            종류의 신경피드백으로 recoveriX는 성공적인 훈련의 기회를
            향상시킵니다.
          </p>

          <div className={styles.therapySlider}>
            <button
              className={styles.prevArrow}
              onClick={prevTherapySlide}
              aria-label="이전 치료 항목"
            >
              ❮
            </button>
            <button
              className={styles.nextArrow}
              onClick={nextTherapySlide}
              aria-label="다음 치료 항목"
            >
              ❯
            </button>

            {therapyItems.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.therapyItem} ${
                  index === currentTherapySlide ? styles.active : ""
                }`}
                style={{
                  display: index === currentTherapySlide ? "block" : "none",
                }}
              >
                <img src={item.imageUrl} alt={item.title} />
                <div className={styles.about}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <h3>The positive impacts</h3>
                  <p>{item.positiveImpacts}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.therapyControls}>
            <div className={styles.therapyDots}>
              {therapyItems.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${
                    index === currentTherapySlide ? styles.active : ""
                  }`}
                  onClick={() => goToTherapySlide(index)}
                  aria-label={`치료 항목 ${index + 1}로 이동`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 비디오 캐러셀 */}
      <div className={styles.resultsVideoCarousel}>
        <div className={styles.videoSlider}>
          <button
            className={styles.prevArrow}
            onClick={prevSlide}
            aria-label="이전 영상"
          >
            ❮
          </button>
          <button
            className={styles.nextArrow}
            onClick={nextSlide}
            aria-label="다음 영상"
          >
            ❯
          </button>
          {videoSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${styles.videoSlide} ${
                index === currentSlide ? styles.active : ""
              }`}
              style={{ display: index === currentSlide ? "block" : "none" }}
            >
              <p className={styles.videoDescription}>{slide.description}</p>
              <div className={styles.videoWrapper}>
                <iframe
                  src={slide.videoUrl}
                  title={slide.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.carouselControls}>
          <div className={styles.carouselDots}>
            {videoSlides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === currentSlide ? styles.active : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`슬라이드 ${index + 1}로 이동`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
