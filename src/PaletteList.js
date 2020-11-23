import React, { Component } from 'react';
import {Link} from "react-router-dom";
import MiniPalette from "./MiniPalette";
import {withStyles} from "@material-ui/styles";
import styles from "./styles/PaletteListStyles";


class PaletteList extends Component {
    goToPalette(id){
        this.props.history.push(`/palette/${id}`)
    }
    render() {
        const {palettes, classes, deletePalette } = this.props;
        //we send all props into MinPallet with {...palettes}}  

        return (
            <div className={ classes.root} >
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1> React colors</h1>
                        <Link to="/palette/new">Lag nye farger</Link>   
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette => (
                        <MiniPalette {...palette} 
                        handleClick={() => this.goToPalette(palette.id)}
                        handleDelete={deletePalette} 
                        key={palette.id}
                        id={palette.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles) (PaletteList);
