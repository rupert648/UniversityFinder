import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UniForm from './Components/UniForm';
import Contributors from './Components/Contributors';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page:window.location.pathname,
        }
    }

    updatePage(location) {
        this.setState({
            page: location
          });
    }
    
    render() {

        let homeLink = <Link to="/" class="navBarLink" onClick={() => this.updatePage("/")}>Home</Link>;
        let contributorsLink = <Link to="/Contributors" class="navBarLink" onClick={() => this.updatePage("/Contributors")}>Contributors</Link>;
        console.log(this.state.page)
        switch (this.state.page) {
            case '/': 
                homeLink = <Link to="/" class="navBarLink" onClick={() => this.updatePage("/")} id={"active"}>Home</Link>;
                break;
            case '/Contributors': 
                contributorsLink = <Link to="/Contributors" class="navBarLink" onClick={() => this.updatePage("/Contributors")} id={"active"}>Contributors</Link>;
                break;
        }
        return (
            <div>
                <Router>
                    <nav>
                        <ul>
                            <li key={"homeLink"}>
                                {homeLink}
                            </li>
                            <li key={"contributorsLink"}>
                                {contributorsLink}
                            </li>
                        </ul>
                    </nav>
                
                    <Switch>
                        <Route path="/Contributors">
                            <Contributors />
                        </Route>
                        <Route path="/">
                            <UniForm />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;