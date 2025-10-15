import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // 필수 필드 검증
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "올바른 이메일 형식이 아닙니다." },
        { status: 400 }
      );
    }

    // 문의 유형 매핑
    const subjectMap: { [key: string]: string } = {
      treatment: "치료 문의",
      appointment: "진료 예약",
      technical: "기술 문의",
      business: "사업 제휴",
      other: "기타",
    };

    const subjectText = subjectMap[subject] || subject;

    // Nodemailer 설정
    const nodemailer = require("nodemailer");

    // SMTP 설정 (환경변수에서 가져오기)
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.naver.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || process.env.SMTP_FROM,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 이메일 내용 구성
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "jjoon1024@naver.com",
      subject: `[recoveriX 문의] ${subjectText} - ${name}`,
      html: `
        <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1fb184; border-bottom: 2px solid #1fb184; padding-bottom: 10px;">recoveriX 웹사이트 문의</h2>

          <div style="margin: 20px 0;">
            <h3 style="color: #1a1a1a; font-size: 16px; margin-bottom: 10px;">문의자 정보</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px; background-color: #f8fafc; font-weight: bold; width: 120px;">이름</td>
                <td style="padding: 10px;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px; background-color: #f8fafc; font-weight: bold;">이메일</td>
                <td style="padding: 10px;">${email}</td>
              </tr>
              ${
                phone
                  ? `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px; background-color: #f8fafc; font-weight: bold;">전화번호</td>
                  <td style="padding: 10px;">${phone}</td>
                </tr>
              `
                  : ""
              }
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px; background-color: #f8fafc; font-weight: bold;">문의 유형</td>
                <td style="padding: 10px;">${subjectText}</td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #1a1a1a; font-size: 16px; margin-bottom: 10px;">문의 내용</h3>
            <div style="padding: 15px; background-color: #f8fafc; border-left: 4px solid #1fb184; border-radius: 4px; white-space: pre-wrap; line-height: 1.6;">
${message}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; text-align: center;">
            <p>이 이메일은 recoveriX 웹사이트(${
              process.env.NEXT_PUBLIC_SITE_URL || "https://recoverix.co.kr"
            })의 문의하기 폼에서 자동으로 전송되었습니다.</p>
            <p>문의자에게 직접 회신하시려면 위의 이메일 주소로 답장해주세요.</p>
          </div>
        </div>
      `,
      replyTo: email, // 답장 시 문의자 이메일로 자동 설정
    };

    // 이메일 전송
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "문의가 성공적으로 전송되었습니다." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("이메일 전송 오류:", error);

    // 에러 타입에 따라 다른 메시지 반환
    let errorMessage = "문의 전송 중 오류가 발생했습니다.";

    if (error.code === "EAUTH") {
      errorMessage = "이메일 인증에 실패했습니다. 관리자에게 문의해주세요.";
    } else if (error.code === "ECONNECTION") {
      errorMessage =
        "이메일 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.";
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
