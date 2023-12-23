import * as React from "react";
import { render, Box, Text } from "ink";

/**
 * add_signal_listener.ts
 */
console.log("Press Ctrl-C to trigger a SIGINT signal");

Deno.addSignalListener("SIGINT", () => {
  console.log("interrupted!");
  Deno.exit();
});

// Add a timeout to prevent process exiting immediately.
setTimeout(() => {}, 5000);

const Meta = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount((previousCount) => previousCount + 1);
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <Text color="green">{count} tests passed</Text>;
};

const App = () => {
  const data = {
    name: "John Doe",
    age: 30,
    occupation: "Software Developer",
  };

  return (
    <Box flexDirection="column">
      <Meta />
      <Text>Hello, world!</Text>
      <Text>This is a demo of Ink.</Text>
      <Box>
        <Text>{JSON.stringify(data, null, 2)}</Text>
      </Box>
    </Box>
  );
};

render(<App />);
