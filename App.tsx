import {
  BackHandler,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageLabalerVisionCamera from './src/Components/imageLabeler/ImageLabalerVisionCamera';
import {horizontalScale, moderateScale} from './src/utils/metrics';
import {
  Camera,
  CameraDevice,
  useCameraDevice,
} from 'react-native-vision-camera';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';

const App = () => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: moderateScale(26), marginTop: 100}}>
          Wellcome image Labeler
        </Text>
        {showCamera ? (
          <ImageLabalerVisionCamera setShowCamera={setShowCamera} />
        ) : (
          <TouchableOpacity
            onPress={() => setShowCamera(true)}
            style={{
              width: horizontalScale(200),
              height: horizontalScale(60),
              backgroundColor: 'orange',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              position: 'absolute',
              bottom: 320,
            }}>
            <Text style={{fontSize: moderateScale(20)}}>Open Camera</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default App;
