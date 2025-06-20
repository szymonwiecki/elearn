
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import Login from './pages/Login';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';

function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (loadingAuth) return <p>Ładowanie...</p>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        

        <Route
          path="/courses"
          element={user ? <Courses /> : <Navigate to="/" />}
        />
        <Route
          path="/courses/:id"
          element={user ? <CourseDetails /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
