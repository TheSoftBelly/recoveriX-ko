"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "@/styles/pages/TermsPage.module.scss";

export default function PrivacyPage() {
  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>개인정보처리방침</h1>
          <p className={styles.lastUpdated}>최종 수정일: 2025년 1월 16일</p>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제1조 (개인정보의 처리 목적)</h2>
            <div className={styles.content}>
              <p>recoveriX Korea(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
              <ol>
                <li>회원 가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지</li>
                <li>재화 또는 서비스 제공: 서비스 제공, 콘텐츠 제공, 맞춤서비스 제공</li>
                <li>고충처리: 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보</li>
                <li>마케팅 및 광고에의 활용: 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공</li>
              </ol>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제2조 (개인정보의 처리 및 보유 기간)</h2>
            <div className={styles.content}>
              <ol>
                <li>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</li>
                <li>각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:
                  <ul>
                    <li>회원가입 정보: 회원 탈퇴 시까지</li>
                    <li>QnA 게시글 및 댓글: 회원 탈퇴 또는 삭제 요청 시까지</li>
                    <li>문의내역: 문의 처리 완료 후 1년</li>
                    <li>부정이용 방지 정보: 1년</li>
                  </ul>
                </li>
              </ol>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제3조 (처리하는 개인정보의 항목)</h2>
            <div className={styles.content}>
              <p>회사는 다음의 개인정보 항목을 처리하고 있습니다:</p>
              <ol>
                <li>회원가입 시 수집항목
                  <ul>
                    <li>필수항목: 이메일 주소, 비밀번호, 닉네임</li>
                    <li>선택항목: 없음</li>
                  </ul>
                </li>
                <li>서비스 이용 과정에서 자동 수집되는 정보
                  <ul>
                    <li>IP 주소, 쿠키, 서비스 이용 기록, 접속 로그</li>
                  </ul>
                </li>
              </ol>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제4조 (개인정보의 제3자 제공)</h2>
            <p className={styles.content}>
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제5조 (개인정보처리의 위탁)</h2>
            <div className={styles.content}>
              <p>회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:</p>
              <ol>
                <li>Supabase (데이터베이스 호스팅 및 인증 서비스)</li>
                <li>Vercel (웹사이트 호스팅)</li>
              </ol>
              <p>회사는 위탁계약 체결 시 개인정보 보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.</p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제6조 (정보주체의 권리·의무 및 행사방법)</h2>
            <div className={styles.content}>
              <ol>
                <li>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
                  <ul>
                    <li>개인정보 열람 요구</li>
                    <li>오류 등이 있을 경우 정정 요구</li>
                    <li>삭제 요구</li>
                    <li>처리정지 요구</li>
                  </ul>
                </li>
                <li>제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.</li>
                <li>정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.</li>
              </ol>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제7조 (개인정보의 파기)</h2>
            <div className={styles.content}>
              <ol>
                <li>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</li>
                <li>개인정보 파기의 절차 및 방법은 다음과 같습니다:
                  <ul>
                    <li>파기절차: 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</li>
                    <li>파기방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
                  </ul>
                </li>
              </ol>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제8조 (개인정보의 안전성 확보조치)</h2>
            <div className={styles.content}>
              <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
              <ol>
                <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
                <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>
                <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
              </ol>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제9조 (개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)</h2>
            <div className={styles.content}>
              <ol>
                <li>회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.</li>
                <li>쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.</li>
                <li>쿠키의 설치·운영 및 거부:
                  <ul>
                    <li>웹브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.</li>
                    <li>쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</li>
                  </ul>
                </li>
              </ol>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제10조 (개인정보 보호책임자)</h2>
            <div className={styles.content}>
              <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다:</p>
              <ul>
                <li>개인정보 보호책임자: recoveriX Korea 담당자</li>
                <li>이메일: info@recoverix.co.kr</li>
                <li>전화번호: 02-1234-5678</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제11조 (개인정보 처리방침 변경)</h2>
            <p className={styles.content}>
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
          </section>

          <div className={styles.contactInfo}>
            <h3>문의사항</h3>
            <p>본 개인정보처리방침에 대한 문의사항이 있으시면 아래로 연락주시기 바랍니다:</p>
            <ul>
              <li>이메일: info@recoverix.co.kr</li>
              <li>전화: 02-1234-5678</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
