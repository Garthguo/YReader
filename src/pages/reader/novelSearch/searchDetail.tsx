import {View, Text} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet, FlatList, Image} from 'react-native';
import useSearchNovel from 'src/hooks/useSearchNovel';
const SearchDetail: React.FC<{text: string}> = ({text}) => {
  console.log('SearchDetail', text);
  const DATA = useSearchNovel(text);
  const renderItem = ({item: {title, url, cover, author}}) => {
    return (
      <View style={style.item}>
        <Image
          style={style.cover}
          source={{
            uri: cover,
          }}
        />
        <View style={style.item_info}>
          <Text style={style.title}>{title}</Text>
          <Text style={style.author}>{author}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={style.warp}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.url}
      />
    </View>
  );
};
const style = StyleSheet.create({
  warp: {
    marginTop: 10,
    borderColor: '#efefef',
    borderTopWidth: 0.2,
  },
  item: {
    display: 'flex',
    // marginVertical: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    borderColor: '#efefef',
    borderBottomWidth: 0.5,
  },
  cover: {
    borderRadius: 2,
    width: 70,
    aspectRatio: 1 / 1.5,
    flexShrink: 2,
  },
  item_info: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 25,
    alignItems: 'flex-start',
    flexShrink: 5,
  },
  title: {
    color: '#222222',
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    color: '#9e9e9e',
  },
});
export default SearchDetail;
