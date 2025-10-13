// Admin 권한 디버그 스크립트
// Node.js로 실행: node debug-auth.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// .env.local 파일 읽기
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase 환경 변수가 설정되지 않았습니다!');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl);
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '설정됨' : '없음');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugAuth() {
  console.log('🔍 Admin 권한 디버깅 시작...\n');

  const email = 'jjoon1024@naver.com';

  // 1. auth.users 확인
  console.log('1️⃣ auth.users 테이블 확인...');
  const { data: authUsers, error: authError } = await supabase
    .from('auth.users')
    .select('id, email, raw_user_meta_data')
    .eq('email', email);

  if (authError) {
    console.log('⚠️  auth.users 직접 조회 불가 (정상)');
    console.log('   RLS 정책으로 인해 직접 조회할 수 없습니다.');
  }

  // 2. public.users 확인
  console.log('\n2️⃣ public.users 테이블 확인...');
  const { data: publicUsers, error: publicError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);

  if (publicError) {
    console.error('❌ public.users 조회 실패:', publicError.message);
    console.log('\n해결 방법:');
    console.log('1. Supabase Dashboard에서 SQL Editor 열기');
    console.log('2. 다음 쿼리 실행:');
    console.log(`   SELECT * FROM users WHERE email = '${email}';`);
    console.log('3. 결과가 없으면 사용자가 DB에 없는 것입니다.');
  } else if (!publicUsers || publicUsers.length === 0) {
    console.error('❌ users 테이블에 사용자가 없습니다!');
    console.log('\n해결 방법:');
    console.log('1. 웹사이트에서 회원가입 진행');
    console.log('2. 또는 Supabase Dashboard에서 수동으로 사용자 추가');
  } else {
    const user = publicUsers[0];
    console.log('✅ 사용자 찾음:');
    console.log('   ID:', user.id);
    console.log('   Email:', user.email);
    console.log('   Name:', user.name);
    console.log('   Role:', user.role);

    if (user.role === 'admin') {
      console.log('\n✅ 사용자는 이미 admin 권한을 가지고 있습니다!');
      console.log('\n다음 단계:');
      console.log('1. 웹사이트에서 로그아웃');
      console.log('2. 재로그인');
      console.log('3. /admin 페이지 접속 시도');
      console.log('4. 여전히 안되면 브라우저 캐시 삭제 후 재시도');
    } else {
      console.log('\n⚠️  사용자의 role이 admin이 아닙니다!');
      console.log('   현재 role:', user.role);
      console.log('\n해결 방법:');
      console.log('   Supabase Dashboard > SQL Editor에서 실행:');
      console.log(`   UPDATE users SET role = 'admin' WHERE email = '${email}';`);
    }
  }

  // 3. RLS 정책 확인
  console.log('\n3️⃣ RLS 정책 확인...');
  const { data: policies, error: policiesError } = await supabase
    .rpc('get_policies', { table_name: 'users' });

  if (policiesError) {
    console.log('⚠️  RLS 정책 조회 함수 없음 (정상)');
  } else {
    console.log('RLS 정책:', policies);
  }

  console.log('\n' + '='.repeat(60));
  console.log('📋 다음 단계:');
  console.log('='.repeat(60));
  console.log('1. Supabase Dashboard (https://supabase.com/dashboard) 접속');
  console.log('2. SQL Editor에서 다음 실행:');
  console.log('');
  console.log('   UPDATE public.users');
  console.log(`   SET role = 'admin'`);
  console.log(`   WHERE email = '${email}';`);
  console.log('');
  console.log('3. 웹사이트에서 로그아웃 후 재로그인');
  console.log('4. /admin 페이지 접속 시도');
  console.log('='.repeat(60));
}

debugAuth().catch(console.error);
