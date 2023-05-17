import type { AppProps } from 'next/app'
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import 'dayjs/locale/ko';
import '@/styles/globals.css'
import 'antd/dist/reset.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no" />
          <meta name="format-detection" content="telephone=no" /> 
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <RecoilRoot>
        <DndProvider backend={HTML5Backend}>
          <Component {...pageProps} />
        </DndProvider>
      </RecoilRoot>
    </>
)
}
