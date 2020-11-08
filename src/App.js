import Palette from "./Palette";
import {Route, Switch} from "react-router-dom";
import seedColors from "./seedColors";
import PaletteList from "./PaletteList"
import {generatePalette} from "./ColorHelpers";
import { Component } from "react";
import Pallet from "./Palette";

class App extends Component {

  findPalette(id){
    return seedColors.find(function(palette){
      return palette.id === id;
    });
  }

render() {  
  return (
    <Switch>
      <Route 
      exact 
      path="/" 
      render={routeProps => ( 
      <PaletteList palettes={seedColors} {...routeProps} />  
        )} 
      />
      <Route 
      exact 
      path="/palette/:id"
      render={routeProps => ( 
      <Palette
      palette={generatePalette(
        //we find the palette using the id from the url
        this.findPalette(routeProps.match.params.id)
        )} 
        />
      )}
      />
      <Route 
      exact
      path="/palette/:paletteId/:colorId" 
      render={() => <h1>Single color page</h1>} 
      />
    </Switch>
    
   /*  <div >
      <Palette palette = {generatePalette(seedColors[4])}/>
    </div> */
  );
  }
}

export default App;
