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

let IconConditions: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M381.482667 673.877333a90.389333 90.389333 0 0 1 85.226666 60.245334H853.333333v64H465.28a90.389333 90.389333 0 0 1-167.573333 0H170.666667v-64h125.610666a90.389333 90.389333 0 0 1 85.205334-60.245334z m0 64a26.346667 26.346667 0 1 0 0 52.693334 26.346667 26.346667 0 0 0 0-52.693334z m261.034666-304.938666a90.389333 90.389333 0 0 1 85.205334 60.245333H853.333333v64h-127.04a90.389333 90.389333 0 0 1-167.573333 0H170.666667v-64h386.624a90.389333 90.389333 0 0 1 85.226666-60.245333z m0 64a26.346667 26.346667 0 1 0 0 52.693333 26.346667 26.346667 0 0 0 0-52.693333zM381.482667 192a90.389333 90.389333 0 0 1 85.226666 60.224H853.333333v64H465.28a90.389333 90.389333 0 0 1-167.573333 0H170.666667v-64h125.610666A90.389333 90.389333 0 0 1 381.482667 192z m0 64a26.346667 26.346667 0 1 0 0 52.693333 26.346667 26.346667 0 0 0 0-52.693333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconConditions.defaultProps = {
  size: 18,
};

IconConditions = React.memo ? React.memo(IconConditions) : IconConditions;

export default IconConditions;
