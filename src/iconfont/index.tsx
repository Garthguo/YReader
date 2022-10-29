/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconReeorFill from './IconReeorFill';
import IconArrowRight from './IconArrowRight';
import IconArrowLeft from './IconArrowLeft';
import IconCategory from './IconCategory';
import IconConditions from './IconConditions';
import IconLeftarrow from './IconLeftarrow';
import IconRightarrow from './IconRightarrow';
import IconText from './IconText';
import IconDaytimemode from './IconDaytimemode';
import IconNightmode from './IconNightmode';
import IconExchangerate from './IconExchangerate';
import IconAdd from './IconAdd';
import IconAddSelect from './IconAddSelect';
import IconSearch from './IconSearch';
import IconFormFill from './IconFormFill';
import IconForm from './IconForm';
import IconAllFill from './IconAllFill';
import IconSetFill from './IconSetFill';
import IconAll from './IconAll';
import IconSet from './IconSet';
export { default as IconReeorFill } from './IconReeorFill';
export { default as IconArrowRight } from './IconArrowRight';
export { default as IconArrowLeft } from './IconArrowLeft';
export { default as IconCategory } from './IconCategory';
export { default as IconConditions } from './IconConditions';
export { default as IconLeftarrow } from './IconLeftarrow';
export { default as IconRightarrow } from './IconRightarrow';
export { default as IconText } from './IconText';
export { default as IconDaytimemode } from './IconDaytimemode';
export { default as IconNightmode } from './IconNightmode';
export { default as IconExchangerate } from './IconExchangerate';
export { default as IconAdd } from './IconAdd';
export { default as IconAddSelect } from './IconAddSelect';
export { default as IconSearch } from './IconSearch';
export { default as IconFormFill } from './IconFormFill';
export { default as IconForm } from './IconForm';
export { default as IconAllFill } from './IconAllFill';
export { default as IconSetFill } from './IconSetFill';
export { default as IconAll } from './IconAll';
export { default as IconSet } from './IconSet';

export type IconNames = 'reeor-fill' | 'arrow-right' | 'arrow-left' | 'category' | 'conditions' | 'leftarrow' | 'Rightarrow' | 'text' | 'Daytimemode' | 'nightmode' | 'exchangerate' | 'add' | 'add-select' | 'search' | 'form-fill' | 'form' | 'all-fill' | 'set-fill' | 'all' | 'set';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'reeor-fill':
      return <IconReeorFill key="1" {...rest} />;
    case 'arrow-right':
      return <IconArrowRight key="2" {...rest} />;
    case 'arrow-left':
      return <IconArrowLeft key="3" {...rest} />;
    case 'category':
      return <IconCategory key="4" {...rest} />;
    case 'conditions':
      return <IconConditions key="5" {...rest} />;
    case 'leftarrow':
      return <IconLeftarrow key="6" {...rest} />;
    case 'Rightarrow':
      return <IconRightarrow key="7" {...rest} />;
    case 'text':
      return <IconText key="8" {...rest} />;
    case 'Daytimemode':
      return <IconDaytimemode key="9" {...rest} />;
    case 'nightmode':
      return <IconNightmode key="10" {...rest} />;
    case 'exchangerate':
      return <IconExchangerate key="11" {...rest} />;
    case 'add':
      return <IconAdd key="12" {...rest} />;
    case 'add-select':
      return <IconAddSelect key="13" {...rest} />;
    case 'search':
      return <IconSearch key="14" {...rest} />;
    case 'form-fill':
      return <IconFormFill key="15" {...rest} />;
    case 'form':
      return <IconForm key="16" {...rest} />;
    case 'all-fill':
      return <IconAllFill key="17" {...rest} />;
    case 'set-fill':
      return <IconSetFill key="18" {...rest} />;
    case 'all':
      return <IconAll key="19" {...rest} />;
    case 'set':
      return <IconSet key="20" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
