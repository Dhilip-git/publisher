import React from 'react';
import Home from '../Screens/Home.js';
import {StateContextProvider} from '../Context/state-context.js';

export default function StateView() {
  return (
    <StateContextProvider>
      <Home />
    </StateContextProvider>
  );
}
