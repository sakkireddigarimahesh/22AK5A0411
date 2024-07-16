const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
let numberStorage = [];

const apiEndpoints = {
  p: 'http://20.244.56.144/test/primes',
  f: 'http://20.244.56.144/test/fibo',
  e: 'http://20.244.56.144/test/even',
  r: 'http://20.244.56.144/test/rand'
};

app.get('/numbers/:type', async (req, res) => {
  const type = req.params.type;

  if (!apiEndpoints[type]) {
    return res.status(400).json({ error: 'Invalid type' });
  }

  try {
    const response = await axios.get(apiEndpoints[type], { timeout: 500 });
    const numbers = response.data.numbers;
    
    const uniqueNumbers = numbers.filter(number => !numberStorage.includes(number));
    
    numberStorage.push(...uniqueNumbers);
    numberStorage = numberStorage.slice(-WINDOW_SIZE);

    const avg = (numberStorage.reduce((acc, num) => acc + num, 0) / numberStorage.length).toFixed(2);

    res.json({
      windowPrevState: numberStorage.slice(0, -uniqueNumbers.length),
      windowCurrState: numberStorage,
      numbers: uniqueNumbers,
      avg: parseFloat(avg)
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching numbers' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
