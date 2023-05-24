import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {

  apiKey = process.env.REACT_APP_NEWS_API
  //This is coming from .env.local file

  state = {
    progress: 10
  }
  pageSize = 9;

  setProgress = (progress)=> {
    this.setState(({progress: progress}))
  }
  //We need to make it a arrow function, so that the 'this' will be available to use (this.setProgress)

  render() {
    return (
        <div>
          <Router>
            <Navbar/>
            <LoadingBar
              color='#f11946'
              progress={this.state.progress}
              height={3}
            />
            <Routes>
              <Route eaxct path="/" element={<News  apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} key="general" country="in" category="general"/>}></Route>
              <Route eaxct path="/business" element={<News  apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} key="business" country="in" category="business"/>}></Route>
              <Route eaxct path="/entertainment" element={<News  apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} key="entertainment" country="in" category="entertainment"/>}></Route>
              <Route eaxct path="/health" element={<News  apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} key="health" country="in" category="health"/>}></Route>
              <Route eaxct path="/science" element={<News  apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} key="science" country="in" category="science"/>}></Route>
              <Route eaxct path="/sports" element={<News  apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} key="sports" country="in" category="sports"/>}></Route>
              <Route eaxct path="/technology" element={<News  apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} key="technology" country="in" category="technology"/>}></Route>
              {/* Here we are suing "key" because - for example initially we load category="general", but when we try to click on 
                  another category, then react will think ki if the component is already mounted then why should I remount it again as 
                  component is already there. But we want that component remounted with the updated props (in our case, category). So we
                  need to give a 'unique key' prop to each component, which will force remount the component and we will get the updated
                  props in the component.*/}
            </Routes>
          </Router>
        </div>
    )
  }
}

