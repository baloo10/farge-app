import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Link} from "react-router-dom";
import {withStyles, withTheme} from "@material-ui/styles";
import classNames from "classnames"
import styles from "./styles/ColorBoxStyles";




class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = {copied: false};
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    //when we click copytoclipboard, then this method will be called, then it will set copies to 
    //be true, and then 1500s later, it sets it back to be false
    changeCopyState(){
        this.setState({copied: true}, () =>{
            setTimeout(()=> this.setState({copied: false}), 1500);
        });
    }
    render() {
        //stop.Propagationn will stopp all code/events that that will be called after this// 
        const {name, background, paletteId, id,  showingFullPalette, classes} = this.props;
        const {copied} = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}> 
                <div style={{ background  }} className={classes.ColorBox}>
                    <div 
                    style={{background}}
                    //if copies is true, then we add the class show
                     //className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
                     //we want classescopyOverlay always, and then optional we want classes.showOeverlay
                     //classes.showOeverlay only when copied is true
                     //we add dynamics classes here
                     className={classNames(classes.copyOverlay, {
                         [classes.showOverlay]: copied
                        })}
                    />

                     
                     <div className={classNames(classes.copyMessage, {
                         [classes.showMessage]: copied
                        })}>
                         <h1>Kopiert</h1>
                         <p className={classes.copyText }>{background}</p>
                     </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Kopier</button>
                    </div>
                    {showingFullPalette && (
                    <Link to={`/palette/${paletteId}/${id}`} 
                    onClick={e => e.stopPropagation()}> 
                    <span className={classes.seeMore}>Mer</span>
                    </Link>
                    )}
                </div>
           </CopyToClipboard>

        );
    }
}

export default withStyles(styles)(ColorBox);
