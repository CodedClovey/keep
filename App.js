import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';

import store from './src/state/store.js'
import { Provider } from 'react-redux'

import Main from './src/components/Main';

const App = () => {
  return (
    <>
    <Provider store={store}>
      <NativeRouter>
        <Main></Main>
      </NativeRouter>
      <StatusBar style="auto" />
    </Provider>
    </>
    
  );
}

export default App;