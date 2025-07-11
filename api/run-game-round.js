import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    console.log("5분 게임 라운드가 성공적으로 실행되었습니다!");
    return response.status(200).json({ message: 'Game round executed successfully.' });
  } catch (error) {
    console.error("게임 라운드 실행 중 에러 발생:", error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
