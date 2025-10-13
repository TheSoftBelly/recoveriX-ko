"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "@/styles/pages/FaqPage.module.scss";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  popular: boolean;
}

const faqs: FAQ[] = [
  {
    id: 1,
    category: "치료 개요",
    question: "recoveriX는 어떤 치료법인가요?",
    answer:
      "recoveriX는 뇌-컴퓨터 인터페이스(BCI) 기술을 기반으로 한 신경 재활 치료법입니다. 뇌졸중, 다발성 경화증, 외상성 뇌 손상, 파킨슨병 환자들이 잃어버린 운동 기능을 다시 학습할 수 있도록 돕습니다. 환자의 뇌파를 실시간으로 감지하고, 이를 바탕으로 근육에 전기 자극을 제공하며, 시각 및 촉각 피드백을 통해 뇌의 신경가소성을 극대화합니다.",
    popular: true,
  },
  {
    id: 2,
    category: "치료 과정",
    question: "치료 기간은 얼마나 걸리나요?",
    answer:
      "개인마다 차이가 있지만, 일반적으로 3-6개월의 치료 기간이 필요합니다. 주 2-3회, 회당 1시간 정도의 치료를 받게 됩니다. 환자의 상태와 목표에 따라 치료 계획이 맞춤화됩니다.",
    popular: true,
  },
  {
    id: 3,
    category: "치료 효과",
    question: "치료 효과는 언제부터 나타나나요?",
    answer:
      "일부 환자들은 치료 시작 후 2-4주 내에 개선을 느끼기 시작합니다. 하지만 지속적인 개선을 위해서는 정기적인 치료가 필요합니다. 임상 연구에 따르면, 대부분의 환자들이 치료 후 상지와 하지의 운동 기능이 유의미하게 향상되었습니다.",
    popular: true,
  },
  {
    id: 4,
    category: "치료 방법",
    question: "가정에서도 치료를 받을 수 있나요?",
    answer:
      "네, recoveriX at Home 앱을 통해 가정에서도 치료를 받을 수 있습니다. 하지만 초기 진단과 치료 계획 수립은 전문 의료진과 상담이 필요합니다. 가정용 장비는 전문가의 지도 하에 사용하는 것이 안전합니다.",
    popular: false,
  },
  {
    id: 5,
    category: "비용 및 보험",
    question: "보험 적용이 가능한가요?",
    answer:
      "보험 적용 여부는 각 보험사와 보험 상품에 따라 다릅니다. 치료 시작 전에 보험사에 문의하시거나, 저희가 보험 적용을 도와드릴 수 있습니다. 일부 보험사에서는 혁신적인 재활 치료를 커버하고 있습니다.",
    popular: false,
  },
  {
    id: 6,
    category: "대상 환자",
    question: "누가 recoveriX 치료를 받을 수 있나요?",
    answer:
      "뇌졸중, 다발성 경화증, 외상성 뇌 손상, 파킨슨병 등 중추 신경계 손상으로 인한 운동 장애를 가진 환자분들이 치료 대상입니다. 단, 개인의 의료 상태에 따라 적합성을 판단해야 하므로, 전문의와 상담이 필요합니다.",
    popular: true,
  },
  {
    id: 7,
    category: "치료 효과",
    question: "임상적으로 검증된 치료인가요?",
    answer:
      "네, recoveriX는 700편 이상의 국제 학술 논문과 임상 연구를 통해 그 효과가 과학적으로 검증되었습니다. 유럽, 북미, 아시아 등 60개국 이상에서 사용되고 있으며, 수많은 환자들이 기능 회복을 경험했습니다.",
    popular: true,
  },
  {
    id: 8,
    category: "치료 과정",
    question: "치료 중 통증이 있나요?",
    answer:
      "대부분의 환자들은 치료 중 통증을 느끼지 않습니다. 전기 자극은 근육의 자연스러운 수축을 유도하는 수준으로 조절되며, 환자의 편안함을 최우선으로 합니다. 만약 불편함이 있다면 언제든지 치료사에게 말씀하시면 됩니다.",
    popular: false,
  },
  {
    id: 9,
    category: "비용 및 보험",
    question: "치료 비용은 어떻게 되나요?",
    answer:
      "치료 비용은 치료 기간, 빈도, 개인 맞춤 계획에 따라 달라집니다. 정확한 비용 견적은 초기 상담 후 제공됩니다. 문의 페이지를 통해 상담을 요청하시면 자세한 안내를 받으실 수 있습니다.",
    popular: false,
  },
  {
    id: 10,
    category: "대상 환자",
    question: "뇌졸중 발병 후 얼마나 지나야 치료를 시작할 수 있나요?",
    answer:
      "recoveriX 치료는 뇌졸중 발병 후 급성기가 지나면 시작할 수 있습니다. 일반적으로 발병 후 몇 주부터 수년이 지난 환자까지 모두 치료를 받을 수 있습니다. 조기 치료가 더 효과적이지만, 만성 환자도 개선을 경험할 수 있습니다.",
    popular: false,
  },
];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const categories = [
    "전체",
    ...Array.from(new Set(faqs.map((faq) => faq.category))),
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "전체" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFaqs = faqs.filter((faq) => faq.popular);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>자주 묻는 질문</h1>
            <p className={styles.description}>
              recoveriX에 대해 자주 묻는 질문들을 확인하세요.
            </p>
          </div>

          {/* Search Bar */}
          <div className={styles.searchBar}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="질문을 검색하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* Categories */}
          <div className={styles.categories}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${styles.categoryButton} ${
                  selectedCategory === category ? styles.active : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Popular FAQs */}
          {searchQuery === "" && selectedCategory === "전체" && (
            <div className={styles.popularSection}>
              <h2>
                <span>🔥</span>
                자주 묻는 질문
              </h2>
              <div className={styles.popularGrid}>
                {popularFaqs.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => {
                      setExpandedId(faq.id);
                      document
                        .getElementById(`faq-${faq.id}`)
                        ?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className={styles.popularItem}
                  >
                    <div className={styles.popularBadge}>{faq.category}</div>
                    <p className={styles.popularQuestion}>{faq.question}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FAQ List */}
          <div className={styles.faqList}>
            <h2>
              {selectedCategory === "전체" ? "전체 질문" : selectedCategory}
            </h2>
            {filteredFaqs.length === 0 ? (
              <div className={styles.emptyState}>검색 결과가 없습니다.</div>
            ) : (
              filteredFaqs.map((faq) => (
                <div key={faq.id} id={`faq-${faq.id}`} className={styles.faqItem}>
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className={`${styles.faqButton} ${
                      expandedId === faq.id ? styles.expanded : ""
                    }`}
                  >
                    <div>
                      <div className={styles.faqCategory}>{faq.category}</div>
                      <h3 className={styles.faqQuestion}>{faq.question}</h3>
                    </div>
                    {expandedId === faq.id ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>
                  {expandedId === faq.id && (
                    <div className={styles.faqAnswer}>{faq.answer}</div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* CTA */}
          <div className={styles.ctaSection}>
            <h2>더 궁금한 점이 있으신가요?</h2>
            <p>전문가와 상담하여 더 자세한 정보를 받아보세요.</p>
            <a href="/contact" className={styles.ctaButton}>
              문의하기
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
