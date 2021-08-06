import 'antd/dist/antd.css';
import '../styles/globals.scss';

import App, { AppInitialProps, AppContext } from 'next/app';
import { SagaStore, wrapper } from '../store/store';
import withReduxSaga, { END } from 'next-redux-saga';
import { MenuComponent } from '../components/menu/menu';
import { Fragment } from 'react';

/*declare module 'next/dist/next-server/lib/utils' {
  export interface NextPageContext {
      store: any; //Store<State>;
  }
}*/

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps: any =
    (store) =>
    async ({ Component, ctx }: AppContext) => {
      const pageProps = {
        ...(Component.getInitialProps
          ? await Component.getInitialProps({ ...ctx, store })
          : {}),
      };

      return {
        pageProps,
      };
    };

  public render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <Fragment>
        <MenuComponent />
        <Component {...pageProps} />
      </Fragment>
    );
  }
}

export default wrapper.withRedux(withReduxSaga(WrappedApp));
