//Notice

import {View, StyleSheet, SafeAreaView} from 'react-native';
import React, {FC} from 'react';
import {NoticeHeight} from '@utils/Scaling';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import Svg, {Defs, G, Path, Use} from 'react-native-svg';
import {wavyData} from '@utils/dummyData';

const Notice: FC = () => {
  return (
    <View style={{height: NoticeHeight}}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView style={{padding: 0}}>
            <CustomText
              style={styles.heading}
              variant="h6"
              fontFamily={Fonts.SemiBold}>
              Its Raining near This Location
            </CustomText>

            <CustomText variant="h9" style={styles.textCenter}>
              It may took longer than ususal
            </CustomText>
          </SafeAreaView>
        </View>
      </View>

      <Svg
        width="100%"
        height="35"
        fill="#ccd5e4"
        viewBox="0 0 4000 2000"
        preserveAspectRatio="none"
        style={styles.wave}>
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavepath" y="491" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCD5E4',
  },
  noticeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCD5E4',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 8,
  },
  heading: {
    color: '#2d3875',
    marginBottom: 8,
  },
  wave: {
    width: '100%',
    transform: [{rotateX: '180deg'}],
  },
});

export default Notice;
