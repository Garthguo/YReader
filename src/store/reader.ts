import create from 'zustand';
import {persist} from 'zustand/middleware';

import zustandStorage from './zustandStorage';
interface IContentSetting extends ConfigType {
  fontSize: number;
  // lineCount: number;
  color: string;
  bgColor: string;
  textColor: string;
  // padding: number;
  fontFamily: string;
}
export interface ConfigType {
  fontSize: number;
  lineHeight: number;
  linePadding: number;
  margin: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  getTextWidth?: (text: string) => number;
  getGlyphIDs?: (text: string) => number[];
}
const themeStore = persist<IContentSetting & MapToSetMethodsType>(
  (set, get) => ({
    fontSize: 20,
    lineHeight: 25,
    linePadding: 2,
    margin: {left: 15, right: 15, top: 15, bottom: 15},
    fontFamily: 'myFont',
    bgColor: '#f6f5fa',
    color: '#f6f5fa',
    textColor: '#09080a',
    addFontSize: () => set({fontSize: get().fontSize + 1}),
    subFontSize: () => set({fontSize: get().fontSize - 1}),
    changeBgColor: color => set({bgColor: color}),
    changeTextColor: color => set({textColor: color}),
    changeMargin: (key: keyof ConfigType['margin'], value: number) =>
      set(({margin}) => {
        margin[key] = value;
        return {margin: {...margin}};
      }),
  }),
  {
    name: 'contentSeting',
    getStorage: () => zustandStorage,
  },
);
const useContentSetStore = create(themeStore);
// const useProgresStore = create(pregresStore);
// export {useContentSetStore, useProgresStore};
export {useContentSetStore};
type ChangeToSetMethods<T extends {}, C extends string = 'set'> = {
  [K in keyof T as `${C}${Capitalize<K & string>}`]?: (arg: T[K]) => any;
};

type NeedAddAndSub = Pick<
  IContentSetting,
  'fontSize' | 'color' | 'fontFamily' | 'margin'
>;
type NeedChange = Pick<IContentSetting, 'bgColor' | 'textColor'>;
type MapToSetMethodsType = ChangeToSetMethods<NeedAddAndSub, 'add'> &
  ChangeToSetMethods<NeedAddAndSub, 'sub'> &
  ChangeToSetMethods<NeedChange, 'change'>;
