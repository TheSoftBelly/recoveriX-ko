import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = () => {
  // 환경 변수가 있는 경우 사용, 없는 경우 기본값 사용
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (supabaseUrl && supabaseAnonKey) {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  }

  // 기본 auth-helpers 클라이언트 사용 (환경변수가 없는 경우)
  return createClientComponentClient();
};

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: "user" | "admin";
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          role?: "user" | "admin";
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: "user" | "admin";
          created_at?: string;
        };
      };
      qna_posts: {
        Row: {
          id: number;
          title: string;
          content: string;
          author_id: string;
          is_private: boolean;
          status: "pending" | "answered";
          views: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          content: string;
          author_id: string;
          is_private?: boolean;
          status?: "pending" | "answered";
          views?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          content?: string;
          author_id?: string;
          is_private?: boolean;
          status?: "pending" | "answered";
          views?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      qna_comments: {
        Row: {
          id: number;
          post_id: number;
          content: string;
          author_id: string;
          is_admin: boolean;
          created_at: string;
        };
        Insert: {
          post_id: number;
          content: string;
          author_id: string;
          is_admin?: boolean;
          created_at?: string;
        };
        Update: {
          id?: number;
          post_id?: number;
          content?: string;
          author_id?: string;
          is_admin?: boolean;
          created_at?: string;
        };
      };
      notices: {
        Row: {
          id: number;
          title: string;
          content: string;
          created_at: string;
        };
        Insert: {
          title: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          content?: string;
          created_at?: string;
        };
      };
    };
  };
};
