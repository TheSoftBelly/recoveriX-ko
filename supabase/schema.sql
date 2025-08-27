-- 사용자 테이블 확장
create table if not exists public.users (
  id uuid references auth.users on delete cascade not null primary key,
  name text not null,
  email text not null,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- QnA 게시글 테이블
create table if not exists public.qna_posts (
  id bigserial primary key,
  title text not null,
  content text not null,
  author_id uuid references public.users(id) on delete cascade not null,
  is_private boolean default false,
  status text default 'pending' check (status in ('pending', 'answered')),
  views bigint default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- QnA 댓글 테이블
create table if not exists public.qna_comments (
  id bigserial primary key,
  post_id bigint references public.qna_posts(id) on delete cascade not null,
  content text not null,
  author_id uuid references public.users(id) on delete cascade not null,
  is_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 공지사항 테이블
create table if not exists public.notices (
  id bigserial primary key,
  title text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) 정책 설정

-- users 테이블 RLS
alter table public.users enable row level security;

create policy "Users can view their own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.users
  for update using (auth.uid() = id);

create policy "Admins can view all users" on public.users
  for all using (
    exists (
      select 1 from public.users
      where id = auth.uid() and role = 'admin'
    )
  );

-- qna_posts 테이블 RLS
alter table public.qna_posts enable row level security;

create policy "Everyone can view public posts" on public.qna_posts
  for select using (is_private = false);

create policy "Authors can view their own posts" on public.qna_posts
  for select using (author_id = auth.uid());

create policy "Admins can view all posts" on public.qna_posts
  for select using (
    exists (
      select 1 from public.users
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Authenticated users can create posts" on public.qna_posts
  for insert with check (auth.uid() = author_id);

create policy "Authors can update their own posts" on public.qna_posts
  for update using (author_id = auth.uid());

create policy "Admins can update all posts" on public.qna_posts
  for update using (
    exists (
      select 1 from public.users
      where id = auth.uid() and role = 'admin'
    )
  );

-- qna_comments 테이블 RLS
alter table public.qna_comments enable row level security;

create policy "Everyone can view comments on public posts" on public.qna_comments
  for select using (
    exists (
      select 1 from public.qna_posts
      where id = post_id and (is_private = false or author_id = auth.uid())
    )
  );

create policy "Admins can view all comments" on public.qna_comments
  for select using (
    exists (
      select 1 from public.users
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Authenticated users can create comments" on public.qna_comments
  for insert with check (auth.uid() = author_id);

create policy "Authors can update their own comments" on public.qna_comments
  for update using (author_id = auth.uid());

create policy "Admins can update all comments" on public.qna_comments
  for update using (
    exists (
      select 1 from public.users
      where id = auth.uid() and role = 'admin'
    )
  );

-- notices 테이블 RLS
alter table public.notices enable row level security;

create policy "Everyone can view notices" on public.notices
  for select using (true);

create policy "Only admins can create notices" on public.notices
  for insert with check (
    exists (
      select 1 from public.users
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Only admins can update notices" on public.notices
  for update using (
    exists (
      select 1 from public.users
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Only admins can delete notices" on public.notices
  for delete using (
    exists (
      select 1 from public.users
      where id = auth.uid() and role = 'admin'
    )
  );

-- 트리거 함수: updated_at 자동 업데이트
create or replace function public.handle_updated_at()
returns trigger as $
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$ language plpgsql;

-- qna_posts updated_at 트리거
create trigger handle_updated_at_qna_posts
  before update on public.qna_posts
  for each row execute procedure public.handle_updated_at();

-- 트리거 함수: 사용자 자동 생성
create or replace function public.handle_new_user()
returns trigger as $
begin
  insert into public.users (id, name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', new.email), new.email);
  return new;
end;
$ language plpgsql security definer;

-- auth.users에서 사용자 생성 시 public.users에 자동 추가
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 인덱스 생성
create index if not exists idx_qna_posts_author_id on public.qna_posts(author_id);
create index if not exists idx_qna_posts_created_at on public.qna_posts(created_at desc);
create index if not exists idx_qna_posts_status on public.qna_posts(status);
create index if not exists idx_qna_comments_post_id on public.qna_comments(post_id);
create index if not exists idx_qna_comments_author_id on public.qna_comments(author_id);

-- 조회수 증가 함수
create or replace function public.increment_views(post_id bigint)
returns void as $
  update public.qna_posts
  set views = views + 1
  where id = post_id;
$ language sql;
