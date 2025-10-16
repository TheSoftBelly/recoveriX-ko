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

  // 세션 초기화 - onAuthStateChange만 사용 (getSession 타임아웃 우회)
  useEffect(() => {
    console.log("[AuthContext] 세션 초기화 시작 (onAuthStateChange 방식)");

    // 초기 상태: localStorage에서 Supabase 토큰 확인
    let initialLoadComplete = false;
    let hasSession = false;

    try {
      // localStorage의 모든 키 출력 (디버깅용)
      const keys = Object.keys(localStorage);
      console.log("[AuthContext] localStorage 전체 키:", keys);

      const supabaseKeys = keys.filter(k => k.startsWith('sb-'));
      console.log("[AuthContext] sb- 키:", supabaseKeys);

      if (supabaseKeys.length > 0) {
        console.log("[AuthContext] Supabase 세션 키 발견:", supabaseKeys.length, "개");
        hasSession = true;
      } else {
        console.log("[AuthContext] Supabase 세션 키 없음");
      }
    } catch (e) {
      console.error("[AuthContext] localStorage 접근 실패:", e);
    }

    // 2초 후 강제로 로딩 완료 (onAuthStateChange가 발생하지 않으면)
    const loadingTimeout = setTimeout(() => {
      if (!initialLoadComplete) {
        console.warn("[AuthContext] 2초 타임아웃 - 강제 로딩 완료");
        setLoading(false);
        if (!hasSession) {
          setUser(null);
        }
      }
    }, 2000);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("[AuthContext] 인증 상태 변경:", event, session ? "세션 있음" : "세션 없음");
        clearTimeout(loadingTimeout);

        try {
          if (session?.user) {
            console.log("[AuthContext] 세션 사용자:", {
              id: session.user.id,
              email: session.user.email,
            });

            // public.users 테이블에서 role 가져오기
            console.log("[AuthContext] users 테이블 조회 시작...");
            const { data: userData, error: dbError } = await supabase
              .from("users")
              .select("*")
              .eq("id", session.user.id)
              .single();

            console.log("[AuthContext] users 테이블 조회 결과:", {
              error: dbError,
              data: userData,
            });

            if (dbError) {
              console.error("[AuthContext] users 테이블 조회 오류:", {
                message: dbError.message,
                code: dbError.code,
                details: dbError.details,
                hint: dbError.hint,
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
              console.warn("[AuthContext] users 테이블 레코드 없음 - fallback 사용");
              setUser({
                id: session.user.id,
                email: session.user.email ?? "",
                name: session.user.user_metadata?.name,
                role: session.user.user_metadata?.role ?? "user",
              });
            }
          } else {
            console.log("[AuthContext] 세션 없음 - 로그아웃");
            setUser(null);
          }
        } catch (error: unknown) {
          console.error("[AuthContext] 인증 상태 변경 처리 중 오류 (catch):", error);
          if (error instanceof Error) {
            console.error("[AuthContext] 오류 상세:", {
              name: error.name,
              message: error.message,
              stack: error.stack,
            });
          } else {
            console.error("[AuthContext] 오류 상세 (unknown):", String(error));
          }
          setUser(null);
        } finally {
          console.log("[AuthContext] finally 블록 - 로딩 완료");
          setLoading(false);
          initialLoadComplete = true;
        }
      }
    );

    return () => {
      clearTimeout(loadingTimeout);
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
