import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

function App() {
  return (
      <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
      >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <React.Fragment>
                  <AppBar position="static">
                      <Toolbar variant="dense">
                          <IconButton color="inherit" onClick={() => zoomIn()}>
                              <ZoomInIcon />
                          </IconButton>
                          <IconButton color="inherit" onClick={() => zoomOut()}>
                              <ZoomOutIcon />
                          </IconButton>
                          <IconButton color="inherit" onClick={() => resetTransform()}>
                              <ZoomOutMapIcon />
                          </IconButton>
                      </Toolbar>
                  </AppBar>
                  <TransformComponent>
                      <div className="App">
                          <header className="App-header">
                              <img src={logo} className="App-logo" alt="logo" />
                              <p>
                                  Edit <code>src/App.tsx</code> and save to reload.
                              </p>
                              <a
                                  className="App-link"
                                  href="https://reactjs.org"
                                  target="_blank"
                                  rel="noopener noreferrer"
                              >
                                  Learn React
                              </a>
                          </header>
                      </div>
                  </TransformComponent>
              </React.Fragment>
          )}
      </TransformWrapper>
  );
}

export default App;
