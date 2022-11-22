/* React header component 
  Looks pretty
*/
import React from "react";
import "./Header.css";

import {Heading} from "../../locales/Translation";

const Header = () => (
  <div className = "header">
    <h2>{Heading} </h2>
    <img src="/../Img/Flag_of_Norway.png" alt="Norsk" ></img>
    <img src="/../Img/Flag_of_the_United_Kingdoms.png" alt="English" ></img>
  </div>
);

export default Header;