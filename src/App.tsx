import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, PROVIDER_DEFAULT} from 'react-native-maps';

const isIos = Platform.OS === 'ios' ? true : false;

const App: React.VFC = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MapView
          provider={isIos ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 35.6582072,
            longitude: 139.7447333,
            latitudeDelta: 0.0514,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('screen').height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
