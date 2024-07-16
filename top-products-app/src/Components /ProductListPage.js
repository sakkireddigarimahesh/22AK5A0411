// src/pages/ProductListPage.js

import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch top 10 products for initial display
    fetchProducts('AMZ', 'Laptop', 10, 1, 10000)
      .then(data => setProducts(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid item key={product.productName} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductListPage;
