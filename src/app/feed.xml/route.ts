import { NextResponse } from "next/server";

// RSS 피드 생성 함수
function generateRSS() {
  const baseUrl = "https://www.recoverix.co.kr";
  const currentDate = new Date().toUTCString();

  // 정적 페이지 목록
  const pages = [
    {
      title: "recoveriX Korea | 첨단 뇌재활 장비 · 뇌졸중 재활 전문",
      description:
        "GTEC 재활기기 공식 파트너. BCI 기술로 뇌졸중, 중풍, 편마비, 파킨슨 환자 뇌신경 회복 지원",
      url: baseUrl,
      date: currentDate,
    },
    {
      title: "회사소개 | recoveriX Korea - GTEC 재활기기 공식 파트너",
      description:
        "recoveriX를 개발한 g.tec medical engineering GmbH와 국내 공식 파트너 뉴로솔루션즈를 소개합니다. 25년 이상의 BCI 기술 전문성, 60개국 이상 보급, 700편 이상의 연구 논문으로 검증된 첨단 뇌재활 솔루션입니다.",
      url: `${baseUrl}/about`,
      date: currentDate,
    },
    {
      title: "치료결과 | recoveriX Korea - 실제 환자 치료 사례 및 임상 데이터",
      description:
        "recoveriX 치료를 받은 환자들의 실제 전후 비교 영상과 임상 데이터를 확인하세요. 85% 환자 만족도, 70% 운동 기능 개선률, 700편 이상의 국제 학술 논문으로 검증된 치료 효과입니다.",
      url: `${baseUrl}/results`,
      date: currentDate,
    },
    {
      title: "자주 묻는 질문 (FAQ) | recoveriX Korea - 뇌졸중 재활 치료 안내",
      description:
        "recoveriX 치료에 대해 자주 묻는 질문과 답변을 확인하세요. 치료 방법, 치료 기간, 치료 효과, 비용, 보험 적용, 대상 환자 등 recoveriX BCI 재활치료에 대한 모든 궁금증을 해결해드립니다.",
      url: `${baseUrl}/faq`,
      date: currentDate,
    },
  ];

  const rssItems = pages
    .map(
      (page) => `
    <item>
      <title><![CDATA[${page.title}]]></title>
      <description><![CDATA[${page.description}]]></description>
      <link>${page.url}</link>
      <guid isPermaLink="true">${page.url}</guid>
      <pubDate>${page.date}</pubDate>
    </item>`
    )
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>recoveriX Korea</title>
    <link>${baseUrl}</link>
    <description>GTEC 재활기기 공식 파트너. BCI 기술로 뇌졸중, 중풍, 편마비, 파킨슨 환자 뇌신경 회복 지원</description>
    <language>ko</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/recoveriX-logo.svg</url>
      <title>recoveriX Korea</title>
      <link>${baseUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return rssFeed;
}

// GET 요청 핸들러
export async function GET() {
  const rss = generateRSS();

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  });
}
