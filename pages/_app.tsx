import 'antd/dist/antd.css';
import '../styles/globals.scss';

import App, { AppInitialProps, AppContext } from 'next/app';
import { Provider } from 'react-redux';
import { SagaStore, wrapper } from '../store/store';
import withReduxSaga from 'next-redux-saga';
import { MenuComponent } from '../components/menu/menu';
import { Fragment } from 'react';
import { END } from 'redux-saga';

/*declare module 'next/dist/next-server/lib/utils' {
  export interface NextPageContext {
      store: any; //Store<State>;
  }
}*/

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = wrapper.getInitialAppProps(store => async context => {
    // 1. Wait for all page actions to dispatch
    const pageProps = {
      // https://nextjs.org/docs/advanced-features/custom-app#caveats
      ...(await App.getInitialProps(context)).pageProps,
    };

    // 2. Stop the saga if on server
    if (context.ctx.req) {
      store.dispatch(END);
      // await (store as SagaStore).projectsTask.toPromise();
      // await (store as SagaStore).companiesTask.toPromise();
    }

    // 3. Return props
    return {pageProps};
  });

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

export default wrapper.withRedux(WrappedApp);
