/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconForm: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M789.333333 170.666667a64 64 0 0 1 64 64v554.666666a64 64 0 0 1-64 64H234.666667a64 64 0 0 1-64-64V234.666667a64 64 0 0 1 64-64h554.666666zM341.333333 693.333333h-106.666666V789.333333h106.666666v-96z m448 0H405.333333V789.333333h384v-96zM341.333333 533.333333h-106.666666v96h106.666666V533.333333z m448 0H405.333333v96h384V533.333333z m-554.666666-160V469.333333h106.666666v-96h-106.666666zM789.333333 234.666667H234.666667v74.666666h554.666666V234.666667zM405.333333 469.333333h384v-96H405.333333V469.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconForm.defaultProps = {
  size: 18,
};

IconForm = React.memo ? React.memo(IconForm) : IconForm;

export default IconForm;
