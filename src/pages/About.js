import React from 'react';
import { Container, Typography, Box, Link, Paper } from '@mui/material';

function About() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          このサイトについて / About This Site
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            目的 / Purpose
          </Typography>
          <Typography paragraph>
            このウェブアプリケーションは、本の検索をより効率的に行うためのツールです。
            複数の書店や図書館、中古書店での検索を一度に行うことができます。
          </Typography>
          <Typography paragraph>
            This web application is a tool for more efficient book searching.
            You can search across multiple bookstores, libraries, and used book stores at once.
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            対応サービス / Supported Services
          </Typography>
          <Typography component="div">
            <ul>
              <li>紀伊國屋書店 / Kinokuniya</li>
              <li>honto (電子書籍/紙書籍) / honto (e-book/paper)</li>
              <li>TSUTAYAオンライン / TSUTAYA Online</li>
              <li>ヨドバシ.com / Yodobashi.com</li>
              <li>ブックオフオンライン / Bookoff Online</li>
              <li>バリューブックス / Value Books</li>
              <li>カーリル（図書館検索） / Calil (Library Search)</li>
              <li>メルカリ / Mercari</li>
              <li>Googleマップ（近くの書店/ブックオフ） / Google Maps (Nearby bookstores/Bookoff)</li>
            </ul>
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            お問い合わせ / Contact
          </Typography>
          <Typography paragraph>
            ご意見・ご要望がございましたら、以下のリンクからお知らせください。
          </Typography>
          <Typography paragraph>
            If you have any comments or requests, please let us know through the following link.
          </Typography>
          <Link
            href="https://github.com/yourusername/book-search-helper/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Issues
          </Link>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            サポート / Support
          </Typography>
          <Typography paragraph>
            このプロジェクトを気に入っていただけましたら、コーヒーを奢っていただけると嬉しいです。
          </Typography>
          <Typography paragraph>
            If you like this project, I would be happy if you could buy me a coffee.
          </Typography>
          <Link
            href="https://www.buymeacoffee.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Me a Coffee
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}

export default About; 