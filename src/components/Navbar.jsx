import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">LearnMate</div>
      </div>

      <div className="navbar-center">
        <button onClick={() => changeLanguage('pl')}>PL</button>
        <button onClick={() => changeLanguage('en')}>EN</button>
      </div>

      <div className="navbar-right">
        <button onClick={handleLogout} className="navbar-logout">
          {t('login.logout') || 'Wyloguj'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
