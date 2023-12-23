import * as React from 'react';
import { render, Box, Text } from 'ink';

const App = () => {
  const data = {
    name: 'John Doe',
    age: 30,
    occupation: 'Software Developer'
  };

  return (
    <Box>
      <Text>
        {JSON.stringify(data, null, 2)}
      </Text>
    </Box>
  );
};

render(<App />);
