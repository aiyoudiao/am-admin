// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import { ClickToComponent } from 'click-to-react-component';
import React from 'react';

const pathModifier = (path) => {
  return path.startsWith('E:\Code\work\shared\temp\front-end\am-admin\frontend\apps\frontend') ? path : 'E:\Code\work\shared\temp\front-end\am-admin\frontend\apps\frontend/' + path;
}

export function rootContainer(container, opts) {
  return React.createElement(
    (props) => {
      return (
        <>
          <ClickToComponent editor="vscode" pathModifier={pathModifier} />
          {props.children}
        </>
      );
    },
    opts,
    container,
  );
}
