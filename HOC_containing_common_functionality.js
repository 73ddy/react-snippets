/*
This snippet is a an example of React HOC.
Here we are trying to encapsulate the common functionality in HOC.
The requirement was that we want our data fetching to be done at cwm in both the component. The fetching functions were different.
As both the component had similar requirement, we contained the logic in HOC ppRefs. To ppRefs we passed the wrapped component and the fetcher function. Note that we have kept that rendering logic in the wrapped components as the return type of fetcher functions were different.
Read - https://reactjs.org/docs/higher-order-components.html [example inspiration for this snippet]
For more details - https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e

Some extra learnings were - 
a) Setting state in the constructor and render is an Anti-pattern, react gives warning. Reason being setState will run every time render executes and setting of state will cause render to execute again. This will form a loop of renders. Grave performance impact.
b) Constructors are supposed to be pure functions. Try to update state in cwm method.  
*/

function fetchComment() {
  return   [ 'comment1', ' comment2' ] ;
}

function fetchBlogPost() {
  return 'this is the blog poffst.' 
}

// Higher order component
function ppRefs(WrappedComponent, fetcher){
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.handleFetch = this.handleFetch.bind(this); 
      }
      componentWillMount() {
        this.setState ({ data: 'No dta', });
      }
      componentDidMount() {
        this.handleFetch();
      }
      handleFetch() {
        this.setState({data : fetcher()});
      }
      render() {
        return (<WrappedComponent {...this.props} data={this.state.data}/>)
      }
}}


class CommentList extends React.Component {
  render() {
    /* (TODO) : try to render comments this way, its not working currently. Find the reason.  
       const comments = this.props.data.map((comment, idx) => { return (<div> comment {idx} - {comment}  </div>)})
    */
    return (
      <div>
        comments - {this.props.data}
      </div>
    )
  }
}

class BlogPost extends React.Component {
  render() {
    return (
      <div>
        Bloog - {this.props.data}
      </div>
    )
  }
} 

class Page extends React.Component {
  render() {
    return (
      <div>
        <CommentListWithSubscription />
        <BlogPostWithSubscription />
      </div> 
    )
  }
} 

// TODO : find a way to use decorator here.
/* Wrapped Component.*/
const CommentListWithSubscription = ppRefs(
  CommentList,
  () => fetchComment()
);

/* Wrapped Component.*/
const BlogPostWithSubscription = ppRefs(
  BlogPost,
  () => fetchBlogPost()
);  

ReactDOM.render(
  <Page />,
  document.getElementById('root')
)
