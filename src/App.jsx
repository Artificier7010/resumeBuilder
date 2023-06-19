import { useState } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import Homepage from './Pages/HomePage/Homepage';
import Formpage from './Pages/FormPage/Formpage';
import Preview from './Pages/PreviewPage/Preview';
import Previewindi from './Pages/PreviewIndi/Previewindi';
import Editform from './Pages/EditForm/Editform';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/build' element={<Formpage/>}></Route>
        <Route path='/preview' element={<Preview/>}></Route>
        <Route path='/user/preview/:id' element={<Previewindi/>}></Route>
        <Route path='/user/resume/edit/:id' element={<Editform/>}></Route>
      </Routes>
    </div>
  )
}

export default App
