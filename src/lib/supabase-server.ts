import { createServerClient } from "@supabase/ssr";
import type { Database } from "./supabase";

export const createSupabaseServerClient = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  const options = {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {
        // Server-side cookie handling is not available in this version
      },
    },
    ...(process.env.NODE_ENV === 'production' && {
      cookieOptions: {
        domain: '.recoverix.co.kr',
        path: '/',
        sameSite: 'lax',
        secure: true
      },
    }),
  };

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, options as any);
};

// 추가적인 유틸리티 함수들
export const getSupabaseServerClient = () => {
  return createSupabaseServerClient();
};

export const validateSupabaseConfig = () => {
  const requiredEnvVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }

  return true;
};
