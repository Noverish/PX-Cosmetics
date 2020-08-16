import React from 'react';
import {
  Switch, Route, HashRouter, Redirect,
} from 'react-router-dom';

import { HomePage, SectionPage } from 'src/pages';

const App = () => (
  <div>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/sections/:section" component={SectionPage} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </HashRouter>
  </div>
);

export default App;
