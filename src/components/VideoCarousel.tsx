"use client";

import { useState } from "react";
import styles from "@/styles/pages/HomePage.module.scss";

interface VideoSlide {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
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

export default function VideoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
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
  );
}
