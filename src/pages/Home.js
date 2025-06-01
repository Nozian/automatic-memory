import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Book Search Helper
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          本の検索を、もっと自由に。<br />
          Make book search more flexible.
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              onClick={() => navigate('/search')}
            >
              検索を始める / Start Searching
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              startIcon={<InfoIcon />}
              onClick={() => navigate('/about')}
            >
              詳細を見る / Learn More
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          主な機能 / Main Features
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              複数書店の検索 / Multiple Bookstore Search
            </Typography>
            <Typography>
              紀伊國屋、honto、TSUTAYAなど、主要な書店での検索を一度に行えます。
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              図書館検索 / Library Search
            </Typography>
            <Typography>
              カーリルを利用して、近隣の図書館での蔵書検索が可能です。
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              中古書店検索 / Used Book Search
            </Typography>
            <Typography>
              ブックオフ、メルカリなど、中古書店での検索も簡単に行えます。
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home; 