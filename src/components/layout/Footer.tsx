import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import styles from "@/styles/components/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* 회사 정보 */}
          <div className={styles.section}>
            <h3>뉴로솔루션즈</h3>
            <p>
              오스트리아 G.Tec Medical Engineering의 공식 파트너로서
              첨단 BCI 기반 재활 치료 솔루션 recoveriX를 제공합니다.
            </p>
          </div>

          {/* 빠른 링크 */}
          <div className={styles.section}>
            <h3>빠른 링크</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/about" className={styles.link}>
                  회사소개
                </Link>
              </li>
              <li>
                <Link href="/results" className={styles.link}>
                  치료결과
                </Link>
              </li>
              <li>
                <Link href="/faq" className={styles.link}>
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/qna" className={styles.link}>
                  QnA 게시판
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.link}>
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div className={styles.section}>
            <h3>연락처</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <MapPin size={18} />
                <span>서울특별시 강남구<br />테헤란로 123</span>
              </li>
              <li className={styles.contactItem}>
                <Phone size={18} />
                <a href="tel:+82-2-1234-5678">
                  02-1234-5678
                </a>
              </li>
              <li className={styles.contactItem}>
                <Mail size={18} />
                <a href="mailto:info@neurosolutions.co.kr">
                  info@neurosolutions.co.kr
                </a>
              </li>
            </ul>
          </div>

          {/* SNS */}
          <div className={styles.section}>
            <h3>소셜 미디어</h3>
            <div className={styles.socialLinks}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} 뉴로솔루션즈. All rights reserved.
          </p>
          <p className={styles.credit}>
            제작자 - <a href="mailto:nomadic.joon@gmail.com">nomadic.joon@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
