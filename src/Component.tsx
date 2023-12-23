import React, { Children } from "react";
import { useBearStore } from "./state/BearState.tsx";

interface Props {
  parent: string;
  name: string;
  componentType: string;
  children: React.ReactElement;
}

export const Component: React.RC<Props> = (props: Props) => {
  const bearStore = useBearStore();

  React.useEffect(() => {
    bearStore.increase(1);
    bearStore.addComponent({
      name: props.name,
      componentType: props.componentType,
      children:
        Children.map(
          props.children,
          (child: { props: Props }) => child.props.name
        ) ?? [],
    });
  }, []);

  return <>{props.children}</>;
};
