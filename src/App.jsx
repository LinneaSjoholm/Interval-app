import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes/routes';
import './frontend/App.css';
import './frontend/setTimer.css';
import './frontend/digitalTimer.css';
import './frontend/endView.css';
import './frontend/menu.css';
import './frontend/resetView.css';
import './frontend/startPage.css';

function App() {
  return (
    <Router>
      <div className="View">
        <div className="View__iphone">
          <div className="View__iphone-screen">
            <div className="View__iphone-top"></div>
            <RoutesComponent />
            <div className="View__iphone-bottom"></div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
