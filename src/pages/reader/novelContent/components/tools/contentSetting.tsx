import React from 'react';
import {TouchableOpacity, useWindowDimensions, StyleSheet} from 'react-native';
// import {Slider, ActionSheet, View} from 'react-native-ui-lib/src/components/slider';
import {Slider, RadioButton, View, Text, Checkbox} from 'react-native-ui-lib';
import {useContentSetStore} from 'src/store/reader';
const ContentSetting = () => {
  const {
    fontSize,
    lineCount,
    addFontSize,
    subFontSize,
    addLineCount,
    subLineCount,
    changeBgColor,
    changeTextColor,
  } = useContentSetStore();
  const width = useWindowDimensions().width;
  return (
    <View style={[style.wrap, {width: width}]}>
      <View style={style.lightWrap}>
        <View style={style.toolLeft}>
          <Slider
            step={1}
            value={0}
            minimumValue={0}
            maximumValue={10}
            onValueChange={() => {}}
          />
        </View>
        <View style={style.toolRight}>
          <RadioButton size={20} value={null} label={'系统亮度'} />
        </View>
      </View>
      <View style={style.toolsWrap}>
        <View row spread centerV>
          <Text>字体大小</Text>
          <View row center>
            <MyText size={40} onPress={subFontSize}>
              -
            </MyText>
            <MyText size={15}>{fontSize}</MyText>
            <MyText size={30} onPress={addFontSize}>
              +
            </MyText>
          </View>
        </View>
        <View row spread centerV>
          <Text>行高</Text>
          <View row center>
            <MyText size={40} onPress={subLineCount}>
              -
            </MyText>
            <MyText size={15}>{lineCount.toString().substring(0, 3)}</MyText>
            <MyText size={30} onPress={addLineCount}>
              +
            </MyText>
          </View>
        </View>
        <View row spread centerV>
          <Text>颜色</Text>
          <View row center>
            {selectList.map(({bgColor, textColor}, index) => (
              <ColorSelect
                key={index}
                bgColor={bgColor}
                textColor={textColor}
                onPress={() => {
                  changeBgColor && changeBgColor(bgColor);
                  changeTextColor && changeTextColor(textColor);
                }}
              />
            ))}
          </View>
        </View>
        {/* <View row spread centerV>
          <Text>字体</Text>
          <View row center>
            {selectList.map(({bgColor, textColor}, index) => (
              <ColorSelect
                key={index}
                bgColor={bgColor}
                textColor={textColor}
              />
            ))}
          </View>
        </View> */}
      </View>
    </View>
  );
};
function ColorSelect({bgColor, textColor, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style.select, {backgroundColor: bgColor}]}>
      <View center style={style.selectText}>
        <Text text60 style={{color: textColor}}>
          A
        </Text>
      </View>
    </TouchableOpacity>
  );
}
function MyText({children, size, onPress}: any) {
  return (
    <Text onPress={onPress} marginL-30 style={{fontSize: size}}>
      {children}
    </Text>
  );
}

const selectList = [
  {
    bgColor: '#f6f5fa',
    textColor: '#09080a',
  },
  {
    bgColor: '#f5dfc7',
    textColor: '#522a02',
  },
  {
    bgColor: '#dae6e2',
    textColor: '#000000',
  },
  {
    bgColor: '#2a2833',
    textColor: '#d4d3d8',
  },
  {
    bgColor: '#000000',
    textColor: '#bcbcbe',
  },
] as const;
const style = StyleSheet.create({
  wrap: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  toolsWrap: {},
  lightWrap: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  toolLeft: {
    flexGrow: 5,
  },
  toolRight: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  select: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  selectText: {
    height: '100%',
    width: '100%',
  },
});
export default ContentSetting;
