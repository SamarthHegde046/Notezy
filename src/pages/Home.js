import { useNavigate } from 'react-router-dom';
import './Home.css';
import OptionsDropdown from '../components/OptionsDropdown';

const Home = () => {
  const navigate = useNavigate();


  const handleSelect = (value) => {
    navigate(`/${value}`);
  };

  return (
    <div className="homepage">
      <h1>All Study Notes</h1>
      {/* ADD OPTIONS DROPDOWN HERE ✅ */}
      <OptionsDropdown onSelect={handleSelect} />
    </div>
  );
};

export default Home;
      