import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Player from './src/screen/musicPlayer/Player'
import { colorNew } from './src/modal/color'
import Navigation from './src/navigation/Navigation'
import { InterstitialAd, BannerAd, TestIds, BannerAdSize, AdEventType } from 'react-native-google-mobile-ads';

const App = () => {
  const adUnitId = __DEV__ ? 'ca-app-pub-5136668440114711/6398570319' :
    'ca-app-pub-5136668440114711/6398570319';

  const adUnitIdd = __DEV__ ? 'ca-app-pub-5136668440114711/2925943751' :
    'ca-app-pub-5136668440114711/2925943751'

  useEffect(() => {
    let interstitial = InterstitialAd.createForAdRequest(adUnitIdd, {
      requestNonPersonalizedAdsOnly: true,
      // keywords: ['fashion', 'clothing'],
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


// package com.GetMusicFiles.Methods;

// import android.content.ContentResolver;
// import android.database.Cursor;
// import android.provider.MediaStore;
// import android.util.Log;
// import android.util.Base64;

// import com.GetMusicFiles.C;
// import com.GetMusicFiles.Models.Options.GetAllOptions;
// import com.GetMusicFiles.Utils.FS;
// import com.GetMusicFiles.Utils.MetaDataExtractor;
// import com.facebook.react.bridge.WritableArray;
// import com.facebook.react.bridge.WritableMap;
// import com.facebook.react.bridge.WritableNativeArray;
// import com.facebook.react.bridge.WritableNativeMap;
// import static android.util.Base64.*;

// import java.util.Objects;

// import static com.GetMusicFiles.Utils.GeneralUtils.LOG;
// import static com.GetMusicFiles.Utils.OrderByGenerator.generateSortOrder;

// public class GetAll {

//     public static WritableMap getAllSongs(GetAllOptions options, ContentResolver contentResolver) throws Exception {

//         WritableArray jsonArray = new WritableNativeArray();
//         String[] projection = new String[]{MediaStore.Audio.Media.TITLE, MediaStore.Audio.Media.ARTIST,
//                 MediaStore.Audio.Media.ALBUM, MediaStore.Audio.Media.DURATION, MediaStore.Audio.Media.DATA,
//                 MediaStore.Audio.Media._ID};


//         String Selection = MediaStore.Audio.Media.IS_MUSIC + "!= 0";

//         if (options.minimumSongDuration > 0) {
//             Selection += " AND " + MediaStore.Audio.Media.DURATION + " >= " + options.minimumSongDuration;
//         }

//         String orderBy = null;

//         if (options.sortBy != null) {
//             orderBy = generateSortOrder(options.sortBy, options.sortOrder);
//         }

//         Cursor cursor = contentResolver.query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI,
//                 projection, Selection, null, orderBy);

//         int cursorCount = Objects.requireNonNull(cursor).getCount();


//         if (cursorCount > (options.batchSize * options.batchNumber)) {
//             cursor.moveToPosition(options.batchSize * options.batchNumber);
//             do {
//                 String path = cursor.getString(4);

//                 String CoverPath = options.coverFolder;

//                 WritableMap item = new WritableNativeMap();
//                 item.putString("title", cursor.getString(0));
//                 item.putString("artist", cursor.getString(1));
//                 item.putString("album", cursor.getString(2));
//                 item.putString("duration", cursor.getString(3));
//                 item.putString("path", cursor.getString(4));
//                 item.putString("id", cursor.getString(5));

//                 if (options.cover) {

//                     try {
//                         String base64 = Base64.encodeToString(MetaDataExtractor.getEmbededPicture(path), DEFAULT) ;
//                         Log.e(LOG, "File saved");
//                         item.putString("cover", base64);
//                     } catch (Exception e) {
//                         Log.e(LOG, String.valueOf(e));
//                         item.putString("cover", "");
//                     }
//                 }
//                 jsonArray.pushMap(item);
//             } while ((options.batchSize == 0 || cursor.getPosition() + 1 < options.batchSize * (options.batchNumber + 1)) & cursor.moveToNext());
//         } else {

//             cursor.close();
//             throw new Exception(C.ErrorEnum.EMPTY_CURSOR.toString());
//         }
//         cursor.close();
//         WritableMap results = new WritableNativeMap();
//         results.putInt("length", cursorCount);
//         results.putArray("results", jsonArray);
//         return results;
//     }

// }
