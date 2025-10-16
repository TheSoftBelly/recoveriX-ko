"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase";

type User = {
  id: string;
  email: string;
  name?: string;
  role?: "user" | "admin";
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  refreshUserFromDB: () => Promise<void>; // ✅ 추가
  supabase: ReturnType<typeof createSupabaseClient>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Supabase 에러 메시지를 한국어로 변환하는 함수
const translateAuthError = (error: any): string => {
  if (!error?.message) {
    return "인증 중 오류가 발생했습니다.";
  }

  const message = error.message.toLowerCase();

  // 회원가입 관련 에러
  if (message.includes("user already registered") || message.includes("already registered")) {
    return "이미 가입된 이메일 주소입니다.";
  }

  // 로그인 관련 에러
  if (message.includes("invalid login credentials") || message.includes("invalid credentials")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }

  if (message.includes("email not confirmed")) {
    return "이메일 인증이 완료되지 않았습니다. 이메일을 확인해주세요.";
  }

  // 비밀번호 관련 에러
  if (message.includes("password") && message.includes("short")) {
    return "비밀번호는 최소 8자 이상이어야 합니다.";
  }

  if (message.includes("password") && (message.includes("weak") || message.includes("strength"))) {
    return "비밀번호가 너무 약합니다. 더 강력한 비밀번호를 사용해주세요.";
  }

  // 이메일 관련 에러
  if (message.includes("invalid email")) {
    return "올바른 이메일 형식이 아닙니다.";
  }

  if (message.includes("user not found") || message.includes("not found")) {
    return "등록되지 않은 사용자입니다.";
  }

  // Rate limit 에러
  if (message.includes("rate limit") || message.includes("too many requests")) {
    return "너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.";
  }

  // 네트워크 에러
  if (message.includes("network") || message.includes("fetch")) {
    return "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.";
  }

  // 기타 에러
  return "인증 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Supabase 클라이언트를 useMemo로 생성 (재생성 방지)
  const supabase = React.useMemo(() => {
    console.log("[AuthProvider] Supabase 클라이언트 생성");
    return createSupabaseClient();
  }, []);

  // 세션 초기화
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const getSession = async () => {
      try {
        console.log("[AuthContext] 세션 초기화 시작");

        // 15초 타임아웃 설정 (10초에서 증가)
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => {
            console.error("[AuthContext] getSession() 타임아웃 (15초 초과)");
            reject(new Error("Session timeout"));
          }, 15000);
        });

        console.log("[AuthContext] getSession() 호출 시작...");
        const sessionPromise = supabase.auth.getSession();

        const result = await Promise.race([sessionPromise, timeoutPromise]) as any;
        console.log("[AuthContext] getSession() 응답 받음:", result ? "데이터 있음" : "데이터 없음");

        clearTimeout(timeoutId);

        const {
          data: { session },
        } = result;

        if (session?.user) {
          console.log("[AuthContext] 세션 발견:", session.user.id);

          // public.users 테이블에서 role 가져오기
          const { data: userData, error: dbError } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (dbError) {
            console.error("[AuthContext] users 테이블 조회 오류:", {
              message: dbError.message,
              details: dbError.details,
              hint: dbError.hint,
              code: dbError.code,
            });
          }

          if (!dbError && userData) {
            console.log("[AuthContext] 사용자 정보 로드 성공:", {
              id: session.user.id,
              role: userData.role,
            });
            setUser({
              id: session.user.id,
              email: session.user.email ?? "",
              name: userData.name || session.user.user_metadata?.name,
              role: userData.role ?? "user",
            });
          } else {
            // DB에 레코드가 없으면 user_metadata 사용 (fallback)
            console.warn(
              "[AuthContext] users 테이블에 레코드가 없습니다. user_metadata 사용:",
              session.user.id
            );
            setUser({
              id: session.user.id,
              email: session.user.email ?? "",
              name: session.user.user_metadata?.name,
              role: session.user.user_metadata?.role ?? "user",
            });
          }
        } else {
          console.log("[AuthContext] 세션 없음");
          setUser(null);
        }
      } catch (error) {
        console.error("[AuthContext] 세션 초기화 중 예외 발생:", error);
        setUser(null);
      } finally {
        console.log("[AuthContext] 로딩 완료");
        setLoading(false);
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        try {
          if (session?.user) {
            // public.users 테이블에서 role 가져오기
            const { data: userData, error: dbError } = await supabase
              .from("users")
              .select("*")
              .eq("id", session.user.id)
              .single();

            if (dbError) {
              console.error("users 테이블 조회 오류 (onAuthStateChange):", {
                message: dbError.message,
                details: dbError.details,
                hint: dbError.hint,
                code: dbError.code,
              });
            }

            if (!dbError && userData) {
              console.log("인증 상태 변경 - 사용자 정보 로드:", {
                id: session.user.id,
                role: userData.role,
              });
              setUser({
                id: session.user.id,
                email: session.user.email ?? "",
                name: userData.name || session.user.user_metadata?.name,
                role: userData.role ?? "user",
              });
            } else {
              // DB에 레코드가 없으면 user_metadata 사용 (fallback)
              console.warn(
                "users 테이블에 레코드가 없습니다 (onAuthStateChange). user_metadata 사용:",
                session.user.id
              );
              setUser({
                id: session.user.id,
                email: session.user.email ?? "",
                name: session.user.user_metadata?.name,
                role: session.user.user_metadata?.role ?? "user",
              });
            }
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("인증 상태 변경 처리 중 예외 발생:", error);
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      // users 테이블에서 role 가져오기
      if (data.user) {
        const { data: userData, error: dbError } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (!dbError && userData) {
          setUser({
            id: data.user.id,
            email: data.user.email!,
            name: userData.name || data.user.user_metadata?.name,
            role: userData.role || "user",
          });
        }
      }
    } catch (error) {
      throw new Error(translateAuthError(error));
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, role: "user" },
        },
      });
      if (error) throw error;

      // users 테이블에 사용자 정보 저장
      if (data.user) {
        const { error: dbError } = await supabase.from("users").insert({
          id: data.user.id,
          email: data.user.email!,
          name: name || null,
          role: "user",
        });
        if (dbError) {
          console.error("users 테이블 삽입 오류:", dbError);
          throw new Error("회원 정보 저장 중 오류가 발생했습니다.");
        }
      }
    } catch (error) {
      throw new Error(translateAuthError(error));
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    const { error } = await supabase.auth.updateUser({
      data: updates,
    });
    if (error) throw error;
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  const refreshUserFromDB = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setUser((prev) => ({
        ...prev!,
        name: data.name,
        role: data.role ?? "user",
      }));
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUser,
    refreshUserFromDB, // ✅ 여기에 포함
    supabase,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
