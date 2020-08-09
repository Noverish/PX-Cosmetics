import React from 'react';
import {
  Switch, Route, BrowserRouter, Redirect,
} from 'react-router-dom';

import { HomePage, SectionPage } from 'src/pages';

const App = () => (
  <div>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/sections/:section" component={SectionPage} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
