
class App extends React.Component {
    constructor(props) {
      super(props);
        this.state = {objState: []}
        //.......
    };
  
    // Aqire a connection and mapp to application state             
    componentDidMount() {
      // ...... 
      connect((inp) => { // Mapp message to function
        // unwrap to Object
        let obj = JSON.parse(inp.data)
        
        if (obj.m_type === Message_Type.New_Object){ 
          if (this.hasObj(obj.name)) { // Fail if obj exists
            // Error handling ....
          } else { // ok New Obj
            // spread opperator: Coppy and append message object to state array
            this.setState(prevState => ({ objState: [...this.state.objState, obj] }))
          }
        }
        // More message handling .....
      });
      // This code works
      console.log("creating object list");
      const objects = this.state.objState.map(msg => 
        <Obj key={msg.name} content = {msg} />);
    }
  
    // more logic ....
  
    render() {
      return (
        <ObjHistory objState={this.state.objState} />
        <ObjInput 
            onHasObj={this.hasObj}
        />
      );
    }
}
  
function App () {
    const [objState, setObjState] = useState([]); // State obj storage
  
    // Aqire webSocket connection and mapp to application state
    useEffect( () => {
      // ..... 
      connect( (inp) => { // Mapp message to function
        // unwrap input message to Object
        let obj = JSON.parse(inp.data)
        
        if (obj.m_type === Message_Type.New_Object){ 
          if (hasObj(obj.name)) { // Fail if obj exists
            // Error handling ....
          } else { // ok New Obj
            // spread opperator: Coppy and append message object to state array
            setObjState(prevState => ({ objState: [...objState, obj] }))
          }
        }
        // More message handling .....
      });
      // This code works
      console.log("creating object list");
      const objects = objState.map(msg => 
        <Obj key={msg.name} content = {msg} />);
    }

    // more logic ....
  
    return (
        <ObjHistory 
          objState={objState} 
        /> 
        <ObjInput 
          onHasObj={hasObj}
        />
    );
};
  
//------------------------------------------------
  
function ObjHistory(props) {
    // Language support
    let locale = React.useContext(LocaleContext);
    
     // Map the objects in objState state ellement to a new array of Obj ellements for display
    const objects = props.objState.map(msg => 
      <Obj key={msg.name} content = {msg} />);
        
    return (
      <div className="ObjHistory">
        <h2>{locale.ObjList}</h2>
        {objects}
      </div>
   );
}; // End of component