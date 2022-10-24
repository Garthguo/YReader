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

let IconCategory: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M256 734.101333v64H170.666667v-64h85.333333z m597.333333 0v64H298.666667v-64h554.666666zM256 493.184v64H170.666667v-64h85.333333z m597.333333 0v64H298.666667v-64h554.666666zM256 252.245333v64H170.666667v-64h85.333333z m597.333333 0v64H298.666667v-64h554.666666z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconCategory.defaultProps = {
  size: 18,
};

IconCategory = React.memo ? React.memo(IconCategory) : IconCategory;

export default IconCategory;
