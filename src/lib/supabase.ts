import { createBrowserClient } from "@supabase/ssr";

export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      flowType: "pkce",
      autoRefreshToken: true,
      detectSessionInUrl: true,
      persistSession: true,
    },
  });
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
