"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase";
import type { User, SupabaseClient, Session } from "@supabase/supabase-js";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: string | null }>;
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ error: string | null; success?: string }>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<UserData>) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // 환경 변수 검증
  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log("환경 변수 확인:", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : "없음",
      key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : "없음",
    });

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase 환경 변수가 설정되지 않았습니다!");
      setLoading(false);
      return;
    }
  }, []);

  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  // Supabase 클라이언트 초기화
  useEffect(() => {
    try {
      const client = createSupabaseClient();
      setSupabase(client);
    } catch (error) {
      console.error("Supabase 클라이언트 초기화 실패:", error);
      setLoading(false);
    }
  }, []);

  // 사용자 정보 가져오기
  const fetchUserData = async (authUser: User) => {
    if (!supabase) {
      console.error("Supabase 클라이언트가 초기화되지 않았습니다.");
      setLoading(false);
      return;
    }

    try {
      console.log("사용자 정보 가져오기 시도:", authUser.id);
      setLoading(true);

      // 기본 사용자 정보 생성 (인증 정보에서 추출)
      const fallbackUser = {
        id: authUser.id,
        email: authUser.email || "",
        name:
          authUser.user_metadata?.name || authUser.email?.split("@")[0] || "",
        role: "user" as const,
      };

      // 데이터베이스 연결 문제로 인한 무한 로딩 방지를 위해 즉시 fallback 사용자 정보로 설정
      console.log("즉시 fallback 사용자 정보로 설정:", fallbackUser);
      setUser(fallbackUser);
      setLoading(false);

      // 백그라운드에서 데이터베이스 쿼리 시도 (선택사항, 에러 무시)
      console.log("백그라운드에서 데이터베이스 쿼리 시도...");
      try {
        const result = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .single();

        if (result.data) {
          console.log(
            "백그라운드에서 기존 사용자 정보 가져오기 성공:",
            result.data
          );
          setUser(result.data);
        } else if (result.error && result.error.code === "PGRST116") {
          console.log("백그라운드에서 새 사용자 생성 시도");
          await supabase.from("users").insert(fallbackUser);
          console.log("백그라운드에서 새 사용자 생성 완료");
        }
      } catch (backgroundError) {
        console.log(
          "백그라운드 데이터베이스 작업 실패 (무시됨):",
          backgroundError
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // 예외 발생 시에도 기본 사용자 정보로 설정
      const fallbackUser = {
        id: authUser.id,
        email: authUser.email || "",
        name:
          authUser.user_metadata?.name || authUser.email?.split("@")[0] || "",
        role: "user" as const,
      };
      setUser(fallbackUser);
    } finally {
      setLoading(false);
    }
  };

  // 초기 인증 상태 확인
  useEffect(() => {
    if (!supabase) return;

    const checkUser = async () => {
      try {
        console.log("초기 사용자 확인 시작");
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          console.log("인증된 사용자 발견:", authUser.id);
          await fetchUserData(authUser);
        } else {
          console.log("인증된 사용자 없음");
        }
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        console.log("초기 로딩 완료, loading을 false로 설정");
        setLoading(false);
      }
    };

    checkUser();

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event: string, session: Session | null) => {
        console.log("Auth state change:", event, session?.user?.id);

        if (event === "SIGNED_IN" && session?.user) {
          console.log("사용자 로그인됨:", session.user.id);
          await fetchUserData(session.user);
        } else if (event === "SIGNED_OUT") {
          console.log("사용자 로그아웃됨");
          setUser(null);
          setLoading(false);
        } else if (event === "TOKEN_REFRESHED") {
          console.log("토큰 갱신됨");
          setLoading(false);
        } else if (event === "INITIAL_SESSION") {
          console.log("초기 세션 확인됨");
          if (session?.user) {
            await fetchUserData(session.user);
          } else {
            setLoading(false);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  // 로그인 함수
  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { error: "Supabase 클라이언트가 초기화되지 않았습니다." };
    }

    try {
      console.log("로그인 시도:", email);
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("로그인 에러:", error);
        setLoading(false);
        return { error: error.message };
      }

      console.log("로그인 성공:", data.user);
      // 로그인 성공 시 사용자 정보 가져오기
      if (data.user) {
        await fetchUserData(data.user);
      } else {
        setLoading(false);
      }

      return { error: null };
    } catch (error) {
      console.error("로그인 예외:", error);
      setLoading(false);
      return { error: "로그인 중 오류가 발생했습니다." };
    }
  };

  // 회원가입 함수
  const signUp = async (email: string, password: string, name: string) => {
    if (!supabase) {
      return { error: "Supabase 클라이언트가 초기화되지 않았습니다." };
    }

    try {
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (typeof window !== "undefined"
          ? window.location.origin
          : "https://recoverix.vercel.app");

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: `${siteUrl}/login`,
        },
      });

      if (error) {
        return { error: error.message };
      }

      return {
        error: null,
        success:
          "회원가입이 완료되었습니다! 이메일을 확인하여 계정을 활성화해주세요.",
      };
    } catch (error) {
      return { error: "회원가입 중 오류가 발생했습니다." };
    }
  };

  // 로그아웃 함수
  const signOut = async () => {
    if (!supabase) {
      console.error("Supabase 클라이언트가 초기화되지 않았습니다.");
      return;
    }

    try {
      console.log("로그아웃 시작");
      // 즉시 사용자 상태 초기화 (UI 즉시 업데이트)
      setUser(null);
      setLoading(false);
      console.log("사용자 상태 즉시 초기화 완료");

      // Supabase 로그아웃 실행
      await supabase.auth.signOut();
      console.log("Supabase 로그아웃 완료");
    } catch (error) {
      console.error("Error signing out:", error);
      // 에러가 발생해도 사용자 상태는 이미 초기화됨
    }
  };

  // 사용자 정보 업데이트 함수
  const updateUser = async (updates: Partial<UserData>) => {
    if (!supabase) {
      return { error: "Supabase 클라이언트가 초기화되지 않았습니다." };
    }

    if (!user) {
      return { error: "사용자가 로그인되지 않았습니다." };
    }

    try {
      const { error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", user.id);

      if (error) {
        return { error: error.message };
      }

      setUser({ ...user, ...updates });
      return { error: null };
    } catch (error) {
      return { error: "사용자 정보 업데이트 중 오류가 발생했습니다." };
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
