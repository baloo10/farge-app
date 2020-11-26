import React, { Component } from 'react';
import {withStyles} from "@material-ui/styles";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar"
import PaletteFooter from "./PaletteFooter";
import {Link} from "react-router-dom";
import styles from "./styles/PaletteStyles";




class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = { format: "hex"};
        this.changeFormat = this.changeFormat.bind(this);
    }

    gatherShades(palette, colorToFilterBy){
        //return all shades of given color
        let shades =[];
        let allColors = palette.colors;
        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        //we do not want this first one, so we will return from 1 on upp, not the 0 value
        //will gives us everthing from one 2, 3, osv
        return shades.slice(1);
    }

    //we pass this down to the navbar
    changeFormat(val){
        this.setState({format: val})
    }

    render() {
        const {format} = this.state
        const {paletteName, emoji, id} = this.props.palette;
        const {classes} = this.props;
        const colorBoxes = this._shades.map( color =>(
           <ColorBox 
            key={color.name}
            name={color.name} 
            background={color[format]}
            showingFullPalette={false}
            />  
        ));
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.changeFormat } showingAllColors ={false} />
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} >Tilbake</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        );
    }
}

export default withStyles(styles) (SingleColorPalette);