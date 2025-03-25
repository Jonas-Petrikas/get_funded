import { Route, Routes } from 'react-router';
import './assets/style/App.scss';

import { DataProvider } from './Contexts/Data';
import { AuthProvider } from './Contexts/Auth';

import Header from './Components/Header';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import About from './Pages/About';
import Page404 from './Pages/Page404';
import Footer from './Components/Footer';
import Create from './Pages/Create';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Project from './Pages/Project';

function App() {

  return (
    <AuthProvider>
      <DataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:pid" element={<Project />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </DataProvider>
    </AuthProvider>

  )
}

export default App
