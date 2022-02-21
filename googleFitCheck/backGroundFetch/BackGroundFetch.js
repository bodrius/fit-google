import React, {useEffect} from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import {Alert} from 'react-native';

const BackGroundFetch = () => {
  useEffect(() => {
    initBackgroundTask();
  }, []);

  const initBackgroundTask = async () => {
    const onEvent = async taskId => {
      //YOUR LOGIC HERE

      try {
        await getUserWeight();

        BackgroundFetch.finish(taskId);
      } catch (error) {
        Alert.alert('BackgroundFetch status', `${error}`);
      }
    };

    const onTimeout = async taskId => {
      BackgroundFetch.finish(taskId);
    };

    let status = await BackgroundFetch.configure(
      {minimumFetchInterval: 15},
      onEvent,
      onTimeout,
    );
    Alert.alert('BackgroundFetch status', `${status}`);
  };

  const getUserWeight = async () => {
    const opt = {
      unit: 'kg', // required; default 'kg'
      startDate: '2022-01-01T00:00:17.971Z', // required
      endDate: new Date().toISOString(), // required
    };

    const res = await GoogleFit.getWeightSamples(opt);
    console.log('BackgroundFetch WORK==>>>');
    Alert.alert('BackgroundFetch WORK', `${res[0].value}`);
  };

  return <></>;
};

export default BackGroundFetch;
