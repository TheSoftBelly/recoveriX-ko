import { createBrowserClient } from "@supabase/ssr";

export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  const options = {
    auth: {
      flowType: "pkce",
      autoRefreshToken: true,
      detectSessionInUrl: true,
      persistSession: true,
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

  return createBrowserClient(supabaseUrl, supabaseAnonKey, options as any);
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
          is_answered: boolean;
          priority: "low" | "normal" | "high";
          assigned_admin: string | null;
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
          is_answered?: boolean;
          priority?: "low" | "normal" | "high";
          assigned_admin?: string | null;
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
          is_answered?: boolean;
          priority?: "low" | "normal" | "high";
          assigned_admin?: string | null;
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
          is_admin_reply: boolean;
          published_at: string | null;
          created_at: string;
        };
        Insert: {
          post_id: number;
          content: string;
          author_id: string;
          is_admin?: boolean;
          is_admin_reply?: boolean;
          published_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          post_id?: number;
          content?: string;
          author_id?: string;
          is_admin?: boolean;
          is_admin_reply?: boolean;
          published_at?: string | null;
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
      notifications: {
        Row: {
          id: number;
          type: string;
          payload: any;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          type: string;
          payload?: any;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: number;
          type?: string;
          payload?: any;
          is_read?: boolean;
          created_at?: string;
        };
      };
      audit_logs: {
        Row: {
          id: number;
          actor_id: string;
          action: string;
          target_table: string;
          target_id: string;
          meta: any;
          created_at: string;
        };
        Insert: {
          actor_id: string;
          action: string;
          target_table: string;
          target_id: string;
          meta?: any;
          created_at?: string;
        };
        Update: {
          id?: number;
          actor_id?: string;
          action?: string;
          target_table?: string;
          target_id?: string;
          meta?: any;
          created_at?: string;
        };
      };
    };
  };
};
