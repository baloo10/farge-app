import Palette from "./Palette";
import {Route, Switch} from "react-router-dom";
import seedColors from "./seedColors";
import {generatePalette} from "./ColorHelpers";
import { Component } from "react";

class App extends Component {
  render() {
    console.log(generatePalette(seedColors[4]));

  return (
    <Switch>
      <Route exact path="/" render={() => <h1>Pallet list goes here</h1>} />
      <Route 
      exact 
      path="/palette/:id"
      render={() => <h1>Individual palette</h1>}
      />
    </Switch>
    
   /*  <div >
      <Palette palette = {generatePalette(seedColors[4])}/>
    </div> */
  );
  }
}

export default App;
