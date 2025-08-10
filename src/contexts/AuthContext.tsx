"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

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
  const supabase = createSupabaseClient();

  // 사용자 정보 가져오기
  const fetchUserData = async (authUser: User) => {
    try {
      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (error && error.code === "PGRST116") {
        // 사용자가 users 테이블에 없으면 생성
        const newUser = {
          id: authUser.id,
          email: authUser.email || "",
          name:
            authUser.user_metadata?.name || authUser.email?.split("@")[0] || "",
          role: "user" as const,
        };

        const { error: insertError } = await supabase
          .from("users")
          .insert(newUser);
        if (!insertError) {
          setUser(newUser);
        }
      } else if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // 초기 인증 상태 확인
  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          await fetchUserData(authUser);
        }
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        await fetchUserData(session.user);
        setLoading(false);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // 로그인 함수
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      return { error: "로그인 중 오류가 발생했습니다." };
    }
  };

  // 회원가입 함수
  const signUp = async (email: string, password: string, name: string) => {
    try {
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost:3000");

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
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // 사용자 정보 업데이트 함수
  const updateUser = async (updates: Partial<UserData>) => {
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
