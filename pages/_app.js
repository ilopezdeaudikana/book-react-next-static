import 'antd/dist/antd.css';
import '../styles/globals.scss';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import { MenuComponent } from '../components/menu/menu';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MenuComponent />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
