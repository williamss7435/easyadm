import {ToastContainer} from 'react-toastify';

import Router from './router/rootRouter';

import GlobalStyles from './styles/globalstyles';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router/>
      <GlobalStyles/>
      <ToastContainer/>
    </>
  );
}

export default App;
