import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    // 이 함수는 5분마다 Vercel에 의해 자동으로 실행됩니다.
    console.log("5분 게임 라운드가 성공적으로 실행되었습니다!");

    // 나중에는 여기에 실제 게임 결과 생성 로직이 들어갑니다.
    // 예: const result = "홀";
    // await sql`INSERT INTO GameResults (game_type, result) VALUES ('사다리', ${result});`;

    return response.status(200).json({ message: 'Game round executed successfully.' });
  } catch (error) {
    console.error("게임 라운드 실행 중 에러 발생:", error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
