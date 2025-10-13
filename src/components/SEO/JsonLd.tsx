export default function JsonLd({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "뉴로솔루션즈",
  alternateName: "Neuro Solutions",
  url: "https://recoverix.kr",
  logo: "https://recoverix.com/wp-content/themes/recoverix/img/recoveriX-logo.svg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+82-2-1234-5678",
    contactType: "customer service",
    areaServed: "KR",
    availableLanguage: ["Korean", "English"],
  },
  sameAs: [
    "https://facebook.com/neurosolutions",
    "https://instagram.com/neurosolutions",
    "https://youtube.com/neurosolutions",
  ],
};

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "recoveriX",
  description:
    "뇌-컴퓨터 인터페이스(BCI) 기술 기반의 첨단 신경 재활 치료 시스템. 뇌졸중, 다발성 경화증, 외상성 뇌 손상, 파킨슨병 환자의 운동 기능 회복을 돕습니다.",
  brand: {
    "@type": "Brand",
    name: "g.tec medical engineering GmbH",
  },
  manufacturer: {
    "@type": "Organization",
    name: "g.tec medical engineering GmbH",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    price: "문의",
    priceCurrency: "KRW",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "150",
  },
};

export const medicalTherapySchema = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "recoveriX BCI 재활 치료",
  description:
    "뇌-컴퓨터 인터페이스를 활용한 신경 재활 치료. 뇌파 감지, 전기 자극, 시각 피드백을 통해 뇌의 신경가소성을 촉진하여 운동 기능을 회복합니다.",
  procedureType: "Therapeutic procedure",
  possibleComplication: [
    "경미한 피부 자극",
    "일시적인 근육 피로",
  ],
  contraindication: [
    "심장 박동기 착용자",
    "임신 중인 여성",
    "급성 심장 질환",
  ],
};

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
