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

let IconText: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M725.333333 224V341.333333h-64v-53.333333h-181.333333V768H554.666667v64H341.333333v-64h74.666667V288h-192V341.333333h-64v-117.333333H725.333333zM853.333333 768v64H597.333333v-64h256z m0-128v64H597.333333v-64h256z m0-128v64H597.333333v-64h256z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconText.defaultProps = {
  size: 18,
};

IconText = React.memo ? React.memo(IconText) : IconText;

export default IconText;
