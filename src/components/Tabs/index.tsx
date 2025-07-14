import React, { ReactElement, useState } from 'react';
import { Box, FloatingIndicator, Text, UnstyledButton } from '@mantine/core';
import classes from './index.module.css';


type TabsProps = {
    tabs_name: Array<string>,
    tabs_component: Array<(({isActive}: {isActive: boolean}) => ReactElement)>
}

export function Tabs({
    props
}: Readonly<{props: TabsProps}>) {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = props.tabs_name.map((item, index) => (
    <UnstyledButton
      key={item}
      className={classes.control}
      ref={setControlRef(index)}
      onClick={() => setActive(index)}
      mod={{ active: active === index }}
    >
      {/* <span className={classes.controlLabel}>{item}</span> */}
      <Text fz="sm" fw="bold" className={classes.controlLabel}>{item}</Text>
    </UnstyledButton>
  ));

  return <>
    <div className={classes.root} ref={setRootRef}>
      {controls}
      <FloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={classes.indicator}
      />
    </div>

    {props.tabs_component.map((Component, index) => (
      <Box key={index} display={index == active ? 'block' : 'none'}>
        <Component isActive={index == active} />
      </Box>
    ))}
  </>;
}