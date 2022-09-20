import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import CreateEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createCache({ key: 'css' });
  const { extractCriticalToChunks } = CreateEmotionServer(cache);
  ctx.renderPage = () =>
    originalRenderPage({
      //eslint-disable-next-line react/display-name
      enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
    });
  const InitialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(InitialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join('')}`}
      key={style.key}
      //eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));
  return {
    ...InitialProps,
    styles: [
      ...React.Children.toArray(InitialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
