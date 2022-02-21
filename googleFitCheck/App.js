import React, {useEffect} from 'react';
import {Platform, Button, View} from 'react-native';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import {request, PERMISSIONS} from 'react-native-permissions';

import BackGroundFetch from './backGroundFetch/BackGroundFetch';

const App = () => {
  useEffect(() => {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_BODY_WRITE,
      ],
    };
    Platform.OS === 'android' &&
      request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then(result => {
        if (result === 'granted') {
          GoogleFit.authorize(options)
            .then(authResult => {
              if (authResult.success) {
                console.log('success');
                GoogleFit.startRecording(callback);
              } else {
                console.log('fail', authResult);
              }
            })
            .catch(error => {
              console.log('error', error);
            });
        }
      });
  }, []);

  const callback = event => {
    console.log('event', event);
  };

  async function fetchData() {
    const opt = {
      unit: 'kg', // required; default 'kg'
      startDate: '2022-01-01T00:00:17.971Z', // required
      endDate: new Date().toISOString(), // required
    };

    const res = await GoogleFit.getWeightSamples(opt);
    console.log('VALUE===>>>', res);
  }

  const setWeight = () => {
    const opt = {
      value: 20,
      date: new Date().toISOString(),
      unit: 'kg',
    };

    GoogleFit.saveWeight(opt, (err, res) => {
      if (res) {
        console.log('rez==>>>', res);
      }
    });
  };

  const setSteps = () => {
    GoogleFit.getDailySteps(new Date())
      .then(res => console.log('res', res))
      .catch();
  };

  return (
    <View style={{marginTop: 100}}>
      <Button
        onPress={fetchData}
        title="Get Weight"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

      <Button
        onPress={setWeight}
        title="Set Weight"
        color="red"
        accessibilityLabel="Learn more about this purple button"
      />

      <Button
        onPress={setSteps}
        title="GET STEPS"
        color="green"
        accessibilityLabel="Learn more about this purple button"
      />

      <BackGroundFetch />
    </View>
  );
};

export default App;
