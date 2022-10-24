import create from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface IContentSetting {
  fontSize: number;
  lineCount: number;
  //   color: string;
  bgColor: string;
  textColor: string;
  padding: number;
  fontFamily: string;
}
// const LINE_COUNT_MIN = 1.2;
// const LINE_COUNT_MAX = 3;
const store = persist<IContentSetting & MapToSetMethodsType>(
  (set, get) => ({
    fontSize: 20,
    lineCount: 1.8,
    padding: 20,
    fontFamily: 'myFont',
    bgColor: '#f6f5fa',
    textColor: '#09080a',
    addFontSize: () => set({fontSize: get().fontSize + 1}),
    subFontSize: () => set({fontSize: get().fontSize - 1}),
    addLineCount: () => {
      set({lineCount: get().lineCount + 0.1});
    },
    subLineCount: () => set({lineCount: get().lineCount - 0.1}),
    changeBgColor: color => set({bgColor: color}),
    changeTextColor: color => set({textColor: color}),
  }),
  {
    name: 'contentSeting',
    getStorage: () => AsyncStorage,
  },
);
const useContentSetStore = create(store);
export {useContentSetStore};
type ChangeToSetMethods<T extends {}, C extends string = 'set'> = {
  [K in keyof T as `${C}${Capitalize<K & string>}`]?: (arg: T[K]) => any;
};

type NeedAddAndSub = Pick<
  IContentSetting,
  'fontSize' | 'color' | 'padding' | 'fontFamily' | 'lineCount'
>;
type NeedChange = Pick<IContentSetting, 'bgColor' | 'textColor'>;
type MapToSetMethodsType = ChangeToSetMethods<NeedAddAndSub, 'add'> &
  ChangeToSetMethods<NeedAddAndSub, 'sub'> &
  ChangeToSetMethods<NeedChange, 'change'>;
