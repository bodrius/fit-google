import React, {useEffect} from 'react';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import {Platform, Button, View} from 'react-native';

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
      GoogleFit.authorize(options)
        .then(authResult => {
          if (authResult.success) {
            console.log('success');
          } else {
            console.log('fail', authResult);
          }
        })
        .catch(error => {
          console.log('error', error);
        });
  }, []);

  async function fetchData() {
    console.log('enter');
    const opt = {
      unit: 'pound', // required; default 'kg'
      startDate: '2022-01-01T00:00:17.971Z', // required
      endDate: new Date().toISOString(), // required
    };

    const res = await GoogleFit.getWeightSamples(opt);
    console.log('VALUE===>>>', res);
  }

  const setWeight = () => {
    const opt = {
      value: 200,
      date: new Date().toISOString(),
      unit: 'pound',
    };

    GoogleFit.saveWeight(opt, (err, res) => {
      if (err) {
        console.log('err', err);
      }
      if (res) {
        console.log('rez', res);
      }
    });
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
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

export default App;
