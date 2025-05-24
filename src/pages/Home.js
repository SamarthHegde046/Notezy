import { useNavigate } from 'react-router-dom';
import './Home.css';
import OptionsDropdown from '../components/OptionsDropdown';
import MarqueeBanner from '../components/MarqueeBanner';

const Home = () => {
  const navigate = useNavigate();


  const handleSelect = (value) => {
    navigate(`/${value}`);
  };

  return (
    <div className="homepage">
      <MarqueeBanner />
      <h1>All VTU Notes & Qp's</h1>
      {/* ADD OPTIONS DROPDOWN HERE ✅ */}
      <OptionsDropdown onSelect={handleSelect} />
    </div>
  );
};

export default Home;
      