import * as React from "react";
import { render, Box, Text } from "ink";
import { writeJson } from "./utils.ts";

import { useBearStore } from "./state/BearState.tsx";
import { Page } from "./Page.tsx";
import { Component } from "./Component.tsx";

import * as mod from "https://deno.land/std@0.37.0/types/react/react_global.d.ts";

/**
 * add_signal_listener.ts
 */
Deno.addSignalListener("SIGINT", () => {
  console.log("\ninterrupted!");
  Deno.exit();
});

type RootProps = {
  children?: React.ReactNode;
};

function Root(props: RootProps) {
  const data = useBearStore((state) => state);

  React.useEffect(() => {
    writeJson<typeof data>("data.log", data);
  });

  return (
    <Box>
      {props.children}
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </Box>
  );
}

render(
  <Root>
    <Page name="HomePage">
      <Component name="Header" componentType="header">
        <Component name="Logo" componentType="logo" />
        <Component name="Menu" componentType="menu" />
      </Component>
    </Page>
    <Page name="ContactPage">
      <Component name="ContactBox" componentType="power" />
    </Page>
  </Root>
);
