/*
 This snippet is a simple example of React HOC.
 Here we are trying to proxy the props. 
 Prop - name is a property of Higher order component, and name is a property of Wrapped component. When HOC returns the wrapped component it will have both name and age as its own property
 Read - https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e
*/


// Higher order component
function ppHoc(WrappedComponent){
    return class extends React.Component {
      render() {
        let newProp = { name: 'sunil' }
        return (<WrappedComponent {...this.props} {...newProp}/>)
      }
}}


// Wrapped Component.
@ppHoc 
class Wrapped extends React.Component {
  render() {
   return ( <div>
       <div> name - {this.props.name} </div>
       <div> age - {this.props.age} </div>
    </div>)
  }
}
  
ReactDOM.render(
  <Wrapped  age={23}/>,
  document.getElementById('root')
)
