import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Player from './src/screen/musicPlayer/Player'
import { colorNew } from './src/modal/color'
import Navigation from './src/navigation/Navigation'
import { InterstitialAd, BannerAd, TestIds, BannerAdSize, AdEventType } from 'react-native-google-mobile-ads';

const App = () => {
  const adUnitId = __DEV__
    ? 'ca-app-pub-5136668440114711/9841925955'
    : 'ca-app-pub-5136668440114711/9841925955';

  const adUnitIdd = __DEV__ ? 'ca-app-pub-5136668440114711/7116562400' :
    'ca-app-pub-5136668440114711/7116562400'

  useEffect(() => {
    let interstitial = InterstitialAd.createForAdRequest(adUnitIdd, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show();
    });
    interstitial.load();
    return () => {
      interstitialListener = null;
    };
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: colorNew.theme }}>
      <Navigation />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});

// +    publishing {
// +        publications {
// +            maven(MavenPublication) {
// +                artifact androidSourcesJar
// +            }
//          }
//      }
// +
// +//    task installArchives(type: Upload) {
// +//        configuration = configurations.archives
// +//        repositories.mavenDeployer {
// +//            // Deploy to react-native-event-bridge/maven, ready to publish to npm
// +//            repository url: "file://${projectDir}/../android/maven"
// +//            configureReactNativePom pom
// +//        }
// +//    }
//  }