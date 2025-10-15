"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "@/styles/pages/TermsPage.module.scss";

export default function TermsPage() {
  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>이용약관</h1>
          <p className={styles.lastUpdated}>최종 수정일: 2025년 1월 16일</p>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제1조 (목적)</h2>
            <p className={styles.content}>
              본 약관은 recoveriX Korea(이하 "회사")가 제공하는 웹사이트 및 관련 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제2조 (정의)</h2>
            <div className={styles.content}>
              <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
              <ol>
                <li>"서비스"란 회사가 제공하는 recoveriX 관련 정보 제공, QnA 게시판, 문의하기 등의 온라인 서비스를 말합니다.</li>
                <li>"회원"이란 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</li>
                <li>"아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 이메일 주소를 말합니다.</li>
                <li>"비밀번호"란 회원이 부여받은 아이디와 일치되는 회원임을 확인하고 비밀보호를 위해 회원 자신이 정한 문자 또는 숫자의 조합을 말합니다.</li>
              </ol>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제3조 (약관의 효력 및 변경)</h2>
            <div className={styles.content}>
              <ol>
                <li>본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.</li>
                <li>회사는 합리적인 사유가 발생할 경우 관련 법령에 위배되지 않는 범위 안에서 본 약관을 변경할 수 있으며, 약관이 변경되는 경우 회사는 변경사항을 시행일자 7일 전부터 서비스 내 공지사항을 통해 공지합니다.</li>
                <li>회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴를 요청할 수 있으며, 변경된 약관의 효력 발생일 이후에도 서비스를 계속 이용할 경우 약관의 변경사항에 동의한 것으로 간주됩니다.</li>
              </ol>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제4조 (회원가입)</h2>
            <div className={styles.content}>
              <ol>
                <li>회원가입은 이용자가 본 약관 및 개인정보처리방침의 내용에 동의하고, 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 회원가입 신청을 완료함으로써 이루어집니다.</li>
                <li>회사는 다음 각 호에 해당하는 신청에 대해서는 승인을 하지 않거나 사후에 이용계약을 해지할 수 있습니다:
                  <ul>
                    <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                    <li>허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우</li>
                    <li>이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우</li>
                  </ul>
                </li>
              </ol>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제5조 (회원정보의 변경)</h2>
            <p className={styles.content}>
              회원은 개인정보관리화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 필요한 이메일(ID) 등은 수정이 불가능합니다.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제6조 (서비스의 제공 및 변경)</h2>
            <div className={styles.content}>
              <ol>
                <li>회사는 다음과 같은 서비스를 제공합니다:
                  <ul>
                    <li>recoveriX 제품 및 서비스 정보 제공</li>
                    <li>QnA 게시판 서비스</li>
                    <li>문의하기 서비스</li>
                    <li>기타 회사가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해 제공하는 일체의 서비스</li>
                  </ul>
                </li>
                <li>회사는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경할 수 있습니다.</li>
              </ol>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제7조 (서비스의 중단)</h2>
            <div className={styles.content}>
              <ol>
                <li>회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.</li>
                <li>회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상하지 않습니다. 단, 회사에 고의 또는 중대한 과실이 있는 경우에는 그러하지 아니합니다.</li>
              </ol>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제8조 (회원의 의무)</h2>
            <div className={styles.content}>
              <ol>
                <li>회원은 다음 행위를 하여서는 안 됩니다:
                  <ul>
                    <li>신청 또는 변경 시 허위내용의 등록</li>
                    <li>타인의 정보도용</li>
                    <li>회사가 게시한 정보의 변경</li>
                    <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                    <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                    <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                    <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
                  </ul>
                </li>
              </ol>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제9조 (저작권의 귀속 및 이용제한)</h2>
            <div className={styles.content}>
              <ol>
                <li>회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.</li>
                <li>이용자는 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.</li>
              </ol>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제10조 (분쟁해결)</h2>
            <div className={styles.content}>
              <ol>
                <li>회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치, 운영합니다.</li>
                <li>회사는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.</li>
              </ol>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제11조 (재판권 및 준거법)</h2>
            <p className={styles.content}>
              본 약관에 명시되지 않은 사항은 전기통신사업법 등 관계법령과 상관습에 따릅니다. 서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 대한민국 법원을 관할 법원으로 합니다.
            </p>
          </section>

          <div className={styles.contactInfo}>
            <h3>문의사항</h3>
            <p>본 이용약관에 대한 문의사항이 있으시면 아래로 연락주시기 바랍니다:</p>
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
