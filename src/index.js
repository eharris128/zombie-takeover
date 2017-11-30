import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ZombieMap from './ZombieMap';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ZombieMap />, document.getElementById('root'));
registerServiceWorker();