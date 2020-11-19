import Palette from "./Palette";
import {Route, Switch} from "react-router-dom";
import seedColors from "./seedColors";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import {generatePalette} from "./ColorHelpers";
import NewPaletteForm from "./NewPaletteForm";
import { Component } from "react";
import Pallet from "./Palette";

class App extends Component {
  constructor(props){
    super(props);
    this.state ={palettes: seedColors};
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }

  findPalette(id){
    return this.state.palettes.find(function(palette){
      return palette.id === id;
    });
  }

  //we concat the new palette inside the states of palettes
  savePalette (newPalette){
    this.setState({palettes: [...this.state.palettes, newPalette]});
  }
render() {  
  return (
    <Switch>
      <Route 
        exact
        path="/palette/new"
        //we pass in routeProps, so we can use it to redirect inside newpaletteform
        render= {(routeProps) => <NewPaletteForm savePalette={this.savePalette}
        {...routeProps}
        />} 
      />
      <Route 
      exact 
      path="/" 
      render={routeProps => ( 
      <PaletteList palettes={this.state.palettes} {...routeProps} />  
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
      render={routeProps => ( 
        <SingleColorPalette
        colorId={routeProps.match.params.colorId}
        palette={generatePalette(
          //we find the palette using the id from the url
          this.findPalette(routeProps.match.params.paletteId)
          )} 
          />
        )} 
      />
    </Switch>
    
   /*  <div >
      <Palette palette = {generatePalette(seedColors[4])}/>
    </div> */
  );
  }
}

export default App;
