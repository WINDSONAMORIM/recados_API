import React, { Fragment } from 'react';
import { GlobalStyle } from './config';
import { AppRouutes } from './routes';

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <AppRouutes />
    </Fragment>
  );
}

export default App;