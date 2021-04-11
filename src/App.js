import react,{Component} from 'react';
import './App.css';
import {observer} from 'mobx-react';
import UserStore from './store/UserStore';
import LoginForm from './LoginForm';
import SubmitButton from './SubmitButton';

class App extends Component{

  async componentDidMount(){

    try {
      let res = await fetch('/isLoggedIn',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json'
        }
      });
      let result = await res.json();

      if (result && result.success) {

            UserStore.loading =false;
            UserStore.isLogggedIn =true;
            UserStore.username = result.username;

      }
      else 
      {
        
        UserStore.loading =false;
        UserStore.isLogggedIn =false;

      }
    }
    catch (e){
        UserStore.loading =false;
        UserStore.isLogggedIn =false;

    }
  }
  async doLogout(){

    try {
      let res = await fetch('/logout',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type':'application/json'
        }
      });
      let result = await res.json();

      if (result && result.success) {

            UserStore.isLogggedIn =false;
            UserStore.username = '';

      }
   
    }
    catch (e){
      console.log(e);

    }
  }
 
  render(){
    if (UserStore.loading){
      return (
        <div className="app">
          <div className='container'>
            <h1> Loading Please wait....</h1> 
              </div>
        </div>

      );
    }

    else {
      if (UserStore.isLogggedIn) {
        return (
          <div className="app">
            <div className='container'>
              Welcome {UserStore.username}
              <SubmitButton
                  text ={'Log out'}
                  disable = {false}
                  onClick ={ ()=> this.doLogout() }
              />
                </div>
          </div>
  
        );
      }
              return (
              <div className="app">
                  <div className='container'>
                     <LoginForm />
                  </div>
              <h1> abc....</h1> 
              </div>
              );
          }
        }
}

export default observer(App);
