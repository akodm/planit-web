import { NextResponse } from 'next/server';

export async function POST() {
  try {
    return NextResponse.next();
  } catch (err) {
    console.log(err);

    return NextResponse.json({ message: '문제가 발생했습니다. 잠시 후 다시 시도해주세요.' }, { status: 500 });
  }
}

/**
 * TODO: 
 * 1. jose 로 발급, 검증 함수 작성
 * 2. 미들웨어에 전체 URL 에 대해 추가 검증 처리하되, 예외 URL 만 추가
 * 3. jose 를 이용해 액세스 검증 과정 추가
 * 4. jose 를 이용해 리프레시 검증 API 작성
 * 5. 액세스, 리프레시 만료 특정 시간 혹은 일 전에 재발급 하기위한 기능 추가
 * 6. 기존 API 보완
 *  1. 로그인
 *  2. 로그아웃
 *  3. 회원가입
 */

/**
 * 토큰 절차:
 * 1. 클라이언트 로그인 시도 (헤더에 액세스 토큰)
 * 2. 서버 검증, 실패 시 401 반환
 *  2-1. 서버 검증, 성공 시 API 결과 맟 필요 시 토큰 재생성 후 전달 (액세스만)
 * 3. 클라이언트는 리프레시 토큰 검증 API 요청 (헤더에 리프레시 토큰)
 *  3-1. 서버 검증, 성공 시 액세스 토큰 반환
 *    3-1-1. 만약, 리프레시 토큰이 만료가 얼마 안남았다면 자동 재발급
 *    3-1-2. 클라이언트는 재발급 받은 토큰을 저장
 *  3-2. 클라이언트는 이전 API 재요청
 * 4. 서버 검증, 실패 시 401 반환
 * 5. 클라이언트는 재로그인 화면으로 이동
 * 
 * 토큰 저장 방법:
 * 1. 모바일
 * - 액세스 토큰: 전역 변수로 활용하거나 fetch API 헤더에 저장하여 재사용
 * - 리프레시 토큰: 어싱크 스토리지
 * 2. 웹
 * - 액세스 토큰: 전역 변수 혹은 +세션 스토리지와 연계하여 저장 및 사용
 * - 리프레시 토큰: 쿠키 (httpOnly, Samesite 필수)
 */