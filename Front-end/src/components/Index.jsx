import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChildListPage from "./ChildList";
import SessionPage from "./SessionPage";
import App from './App'
function Index(){
    return(
        <Router>
            <Routes>
                <Route path="/" element ={<App/>}/>
                <Route path="/sessions" element={<ChildListPage />} />
                <Route path="/sessions/:child" element={<SessionPage />} />
      </Routes>
    </Router>
    )
}
export default Index;
