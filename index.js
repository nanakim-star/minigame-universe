// 1. 필요한 부품(라이브러리) 가져오기
const http = require('http');
const mysql = require('mysql2/promise');

// 2. 데이터베이스 연결 설정
// Railway는 자동으로 DB 접속 정보를 '환경 변수'로 넣어줍니다.
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 3. 서버를 생성하고 요청에 응답하는 함수
const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('프로젝트 유니버스 백엔드 서버가 실행 중입니다.');
});

// 4. 프로그램 시작 함수
async function startServer() {
  try {
    // 4-1. 데이터베이스 연결 시도
    const connection = await pool.getConnection();
    console.log('✅ 데이터베이스 연결 성공!');

    // 4-2. ForcedResults 테이블 생성 쿼리
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ForcedResults (
        id INT AUTO_INCREMENT PRIMARY KEY,
        game_type VARCHAR(50) NOT NULL,
        round_id VARCHAR(100),
        forced_result VARCHAR(100) NOT NULL,
        is_used BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await connection.query(createTableQuery);
    console.log('✅ ForcedResults 테이블 생성 완료 또는 이미 존재함.');

    // 4-3. 데이터베이스 연결 반환
    connection.release();

    // 4-4. 웹서버 실행
    // Railway가 지정해주는 PORT를 사용하거나, 없을 경우 8080 포트를 사용
    const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => {
      console.log(`✅ 서버가 ${PORT} 포트에서 실행 중입니다.`);
    });

  } catch (error) {
    console.error('❌ 서버 시작 중 오류 발생:', error);
  }
}

// 5. 프로그램 시작!
startServer();
