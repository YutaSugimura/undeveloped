import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Region,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const isIos = Platform.OS === 'ios' ? true : false;

const App: React.VFC = () => {
  const [hasLocationPermission, setHasLocationPermission] =
    useState<boolean>(false);
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([
    0, 0,
  ]);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      const permission = await Geolocation.requestAuthorization('whenInUse');
      if (permission === 'granted' && isMounted) {
        setHasLocationPermission(true);
      }
    };

    if (isIos) {
      init();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let interval: any = null;

    if (hasLocationPermission) {
      interval = setInterval(() => {
        Geolocation.getCurrentPosition(
          position => {
            setCurrentPosition([
              position.coords.latitude,
              position.coords.longitude,
            ]);
            console.log(position);
          },
          error => console.log(error.code, error.message),
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [hasLocationPermission]);

  const onRegionChange = (region: Region) => {
    console.log(region);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MapView
          provider={isIos ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: currentPosition[0],
            longitude: currentPosition[1],
            latitudeDelta: 0.0514,
            longitudeDelta: 0.0121,
          }}
          onRegionChange={onRegionChange}
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
