import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    // 게임 결과를 저장할 테이블이 없으면 새로 생성합니다.
    await sql`
      CREATE TABLE IF NOT EXISTS GameResults (
        id SERIAL PRIMARY KEY,
        game_type VARCHAR(50) NOT NULL,
        result VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    // 성공 메시지를 응답으로 보냅니다.
    return response.status(200).json({ message: 'Database connection successful and table created.' });
  } catch (error) {
    // 에러가 발생하면 에러 메시지를 응답으로 보냅니다.
    return response.status(500).json({ error: error.message });
  }
}
