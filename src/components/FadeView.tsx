import React, {useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
type FadeViewpProps = {
  hide: true;
  children: any;
};
const FadeView: React.FC<FadeViewpProps> = ({children, hide}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(
      // 随时间变化而执行动画
      opacity, // 动画中的变量值
      {
        toValue: 1, // 透明度最终变为1，即完全不透明
        duration: 1000, // 让动画持续一段时间
        useNativeDriver: true,
      },
    ).start(); // 开始执行动画
  }, [opacity]);
  return (
    <>
      {hide && (
        <Animated.View style={[style.container, {opacity}]}>
          {children}
        </Animated.View>
      )}
    </>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default FadeView;
