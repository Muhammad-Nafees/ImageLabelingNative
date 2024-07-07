import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
// libraries imports
import {
  Camera,
  CameraDevice,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {horizontalScale} from '../../utils/metrics';
import {PropsImageLabelerComponent} from '../../utils/types';
// import {labelImage} from 'vision-camera-image-labeler';

const ImageLabalerVisionCamera = ({
  setShowCamera,
}: PropsImageLabelerComponent) => {
  const device = useCameraDevice('back');

  const [cameraPermission, setCameraPermission] =
    useState<SetStateAction<boolean>>(false);

  // const frameProcessor = useFrameProcessor(
  //   frame => {
  //     'worklet';
  //     const labels = labelImage(frame);
  //     console.log('Labels:', labels);
  //     const currentLabelText = labels[0]?.label;

  //     console.log('currentLabel:', currentLabel.value);
  //     currentLabel.value = labels[0]?.label;
  //   },
  //   [currentLabel],
  // );

  // <Label sharedValue={currentLabel} />

  const checkPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const cameraGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        setCameraPermission(
          cameraGranted === PermissionsAndroid.RESULTS.GRANTED,
        );
      } else if (Platform.OS === 'ios') {
        await Camera.requestCameraPermission();
        setCameraPermission(true);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet';
  //   const labels = labelImage(frame);
  //   console.log("🚀 ~ frameProcessor ~ labels:", labels)
  // }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`);
  }, []);

  useEffect(() => {
    // checkpermission()
    checkPermission();
  }, []);

  if (device == null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      {/* <View style={{flex: 1,backgroundColor:"green"}}> */}
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        // frameProcessor={frameProcessor}
      />

      <View style={{position: 'absolute', bottom: 80}}>
        <TouchableOpacity
          onPress={() => setShowCamera(false)}
          style={{
            width: horizontalScale(200),
            height: horizontalScale(60),
            backgroundColor: 'orange',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </>
  );
};

export default ImageLabalerVisionCamera;
