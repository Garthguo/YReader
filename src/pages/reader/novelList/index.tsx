import * as React from 'react';
import {
  View,
  TextField,
  Text,
  Button,
  Card,
  ActionBar,
  ConnectionStatusBar,
  ListItem,
} from 'react-native-ui-lib';
import {
  FlatList,
  Image,
  Alert,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
} from 'react-native';

const BookItem = ({navigation, windowWidth}) => {
  // const windowHeight = useWindowDimensions().height;
  return (
    <ListItem
      // activeBackgroundColor={'#0f0f0f'}
      activeOpacity={0.3}
      height={125}
      style={{width: windowWidth}}
      onPress={() => navigation.navigate('NovelContent')}>
      <ListItem.Part left>
        <Image
          source={{uri: 'https://www.bqg99.com/bookimg/1115.jpg'}}
          style={styles.image}
        />
      </ListItem.Part>
      <ListItem.Part middle column>
        <View style={{paddingRight: 20, width: windowWidth - 76 - 20 * 2}}>
          <Text style={{fontWeight: 'bold'}} grey10 text70>
            道诡异仙
          </Text>
          <Text color={'#84888e'} text100>
            114章未读 · 第七十七章 娃，你着相了
          </Text>
        </View>
      </ListItem.Part>
    </ListItem>
  );
};
const NovelList = ({navigation}: any) => {
  const windowWidth = useWindowDimensions().width;
  console.log(windowWidth);
  return (
    <>
      <FlatList
        // numColumns={3}
        // horizontal={true}
        // onRefresh={() => {}}
        // refreshing={true}
        style={styles.contain}
        data={[1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]}
        renderItem={({item, index}) => (
          <BookItem navigation={navigation} windowWidth={windowWidth} />
        )}
        // keyExtractor={this.keyExtractor}
      />
    </>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 76,
    height: 114,
    borderRadius: 3,
    marginHorizontal: 20,
  },
  contain: {
    paddingRight: 20,
    // display: 'flex',
    // flexDirection: 'column',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: 'grey',
  },
});
export default NovelList;
