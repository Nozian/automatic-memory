import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Grid, Paper } from '@mui/material';
import searchServices from '../data/searchServices';

const Search = () => {
  const [title, setTitle] = useState('');

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSearch = (service) => {
    if (!title) return;
    let url = '';
    const encodedTitle = encodeURIComponent(title);
    if (service.queryParamOrPath && service.queryParamOrPath.includes('【検索語句】')) {
      url = service.baseUrl + service.queryParamOrPath.replace('【検索語句】', encodedTitle);
    } else if (service.queryParam) {
      try {
        const u = new URL(service.baseUrl);
        u.searchParams.set(service.queryParam, title);
        url = u.toString();
      } catch {
        url = `${service.baseUrl}?${service.queryParam}=${encodedTitle}`;
      }
    }
    window.open(url, '_blank');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          書籍タイトルで検索 / Search by Book Title
        </Typography>
        <TextField
          fullWidth
          label="タイトルを入力 / Enter book title"
          value={title}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ mb: 3 }}
        />
        <Grid container spacing={2}>
          {searchServices.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.name}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleSearch(service)}
                sx={{ mb: 1 }}
              >
                {service.name}
              </Button>
              <Typography variant="caption" display="block" sx={{ color: '#666' }}>
                {service.note}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Search; 