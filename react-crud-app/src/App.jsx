import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/add" component={ItemForm} />
          <Route path="/edit/:id" component={ItemForm} />
          <Route path="/" component={ItemList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;