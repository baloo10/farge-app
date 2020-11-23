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

    //we check first if we have some saved palettes in local storage
    //if its not, then we use seedColors
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state ={palettes: savedPalettes || seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id){
    return this.state.palettes.find(function(palette){
      return palette.id === id;
    });
  }

  //st is the old statet
  //filter for each palett, where that palettid is not equal to the id that is been passed in
  //we will filter all the paletts that dont match the id, 
  // this will leav out the singel on, that has that id, and then set state with the rest
  //then we call localstorge, that will updated localstorage with the new version of paletts
  deletePalette (id){
    this.setState( 
      st => ({palettes: st.palettes.filter(palette => palette.id !== id)}),
      this.syncLocalStorage
    )
  }

  //we concat the new palette inside the states of palettes
  //we add a callback function, when state is updated, then we call syncLocalStorage
  
  savePalette (newPalette){
    this.setState({palettes: [...this.state.palettes, newPalette]}, 
      this.syncLocalStorage
      );
  }

  syncLocalStorage(){
    //save palettes to local storage
    // the key is palette
    //local storage wants string, so JSON.stringify
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }

render() {  
  return (
    <Switch>
      <Route 
        exact
        path="/palette/new"
        //we pass in routeProps, so we can use it to redirect inside newpaletteform
        render= {(routeProps) => <NewPaletteForm savePalette={this.savePalette}
        palettes={this.state.palettes}
        {...routeProps}
        />} 
      />
      <Route 
      exact 
      path="/" 
      render={routeProps => ( 
      <PaletteList 
        palettes={this.state.palettes}
        deletePalette={this.deletePalette}
        {...routeProps} />  
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
