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

let IconNightmode: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 170.666667c15.530667 0 30.805333 1.045333 45.781333 3.050666a206.72 206.72 0 0 0-70.165333 155.434667c0 114.453333 92.8 207.232 207.232 207.232a206.72 206.72 0 0 0 155.434667-70.165333c2.005333 14.976 3.050667 30.250667 3.050666 45.781333 0 188.522667-152.810667 341.333333-341.333333 341.333333S170.666667 700.522667 170.666667 512 323.477333 170.666667 512 170.666667z m-75.029333 74.261333l-6.229334 1.834667C317.226667 281.493333 234.666667 387.114667 234.666667 512c0 153.173333 124.16 277.333333 277.333333 277.333333 127.146667 0 234.346667-85.589333 267.072-202.304-26.773333 8.746667-55.125333 13.354667-84.224 13.354667-149.781333 0-271.232-121.450667-271.232-271.232 0-25.856 3.648-51.136 10.581333-75.242667l2.773334-8.96zM751.232 170.666667v77.696h77.717333v64h-77.717333v77.738666h-64v-77.738666h-77.717333v-64h77.717333V170.666667h64z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconNightmode.defaultProps = {
  size: 18,
};

IconNightmode = React.memo ? React.memo(IconNightmode) : IconNightmode;

export default IconNightmode;
