import React from "react";
import { render, Box, Text } from "ink";
import { useBearStore } from "./state/BearState.tsx";
import { Component } from "./Component.tsx";

interface Props {
  name: string;
  children: React.ReactElement;
}

export const Page: React.RC<Props> = (props: Props): React.ReactElement => {
  const data = useBearStore((state) => state);

  React.useEffect(() => {
    data.increase(1);
    data.addPage(props.name);
  }, []);

  return (
    <Component name={props.name} componentType="page">
      {props.children}
    </Component>
  );
};
