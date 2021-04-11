import react,{Component} from 'react';

class SubmitButton extends Component{
 
  render(){
              return (
              <div className="submitbutton">
              <button 
                    className='btn'
                    disabled={this.props.disabled}
                    onClick={ () => this.props.onClick() } 
              >
                 {this.props.text}
              </button>
              </div>
              );
          }
}

export default SubmitButton;
