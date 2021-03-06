declare var require: any;

import * as React from "react";
import * as ReactDOM from "react-dom";
import './styles/main.scss';
import {Root} from './containers/Root';
import './components/Header/style.scss';

import {configureStore} from './store/configureStore';
import {history} from './routes/history';
import {routes} from './routes';
const Router = require('universal-router');

const router = new Router(routes);
const storeState: any = (window as any).__CONTEXT__;
const store: { dispatch: Function } = configureStore(storeState);

function render(location: any) {
  router
    .resolve({path: location.pathname, dispatch: store.dispatch})
    .then((component) => {
      const ReactComp = (component as React.Component<any, any>);
      ReactDOM.render(<Root store={store} location={location} component={ReactComp}/>, document.getElementById("root"));
    });

}
history.listen(render);
render(window.location);
