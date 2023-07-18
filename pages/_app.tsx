import 'antd/dist/reset.css'
import '../styles/globals.scss'

import App, { AppInitialProps } from 'next/app'
import Script from 'next/script'
import { wrapper } from '../store/store'
import { MenuComponent } from '../components/menu/menu'
import { END } from 'redux-saga'

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = wrapper.getInitialAppProps(
    (store) => async (context) => {
      // 1. Wait for all page actions to dispatch
      const pageProps = {
        // https://nextjs.org/docs/advanced-features/custom-app#caveats
        ...(await App.getInitialProps(context)).pageProps
      }

      // 2. Stop the saga if on server
      if (context.ctx.req) {
        store.dispatch(END)
      }

      // 3. Return props
      return { pageProps }
    }
  )

  public render(): JSX.Element {
    const { Component, pageProps } = this.props
    return (   
      <>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-X7V7DGPMQW"/>
        <Script
          id='google-analytics'
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-X7V7DGPMQW', {
                page_path: window.location.pathname,
              });
            `,
            }}
        />
        <MenuComponent />
        <Component {...pageProps} />
      </>
    )
  }
}

if (
  process.env.NODE_ENV === 'production'
) {
  console.log = (...args) => {};
  console.info = (...args) => {};
  console.warn = (...args) => {};
}


export default wrapper.withRedux(WrappedApp)
