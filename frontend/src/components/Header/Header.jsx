/* React header component 
   Looks pretty
   Language support

   import React from "react";
   constructor(props) {
    super(props);
    this.ChangeToNorwegian = this.ChangeToNorwegian.bind(this)
    this.state = {Heading}
}
*/
import React, {useContext} from "react";
import "./Header.css";

import Nflag from "../Img/Flag_of_Norway.png"
import UKflag from "../Img/Flag_of_the_United_Kingdom.png"

// Import language ellements
//import { languages, LocalesContext } from "../../locales/Translation";
import { LocaleContext } from "../../locales/Translation";

function Header() { 
  const locale = useContext(LocaleContext) // Then use locale to extract a value from context
  //let locale = this.context;
    return (
          <div className = "header">
            <h2>{locale.Heading} </h2>
            <img id="Nflag" src={Nflag} alt="Norsk" ></img>
            <img id="UKflag" src={UKflag} alt="English" ></img>
          </div>
    );
  }  
// onClick={changeLocale}
//Header.contextType = LocalesContext;

export default Header;

/*
<LocaleContext.Consumer> 
        {({locale, changeLocale}) => (
)} </LocaleContext.Consumer>

constructor(props) {
    super(props);
    this.ChangeToNorwegian = this.ChangeToNorwegian.bind(this)
  }
  constructor(props){
    super(props);
    this.state = {Heading}
  }

handleNorChange(){
  ChangeToNorwegian()
  //App.forceUpdate()
  //document.getElementsByClassName("App").forceUpdate()
  //Header.setState(Heading)
  //this.forceUpdate()
  //this.forceUpdate()
}  

handleEngChange(){
  ChangeToEnglish()
}  

  render() {
    return (
      <div className = "header">
      <h2>{Heading} </h2>
      <img id="Nflag" src={Nflag} alt="Norsk" onClick={this.handleNorChange} ></img>
      <img id="UKflag" src={UKflag} alt="English" onClick={this.handleEngChange} ></img>
      <img id="Nflag" src={Nflag} alt="Norsk" onClick={ChangeToNorwegian} ></img>
      <img id="UKflag" src={UKflag} alt="English" onClick={ChangeToEnglish} ></img>
    </div>
    );
  }  
*/