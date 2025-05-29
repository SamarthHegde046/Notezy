import { useNavigate } from 'react-router-dom';
import './Home.css';
import OptionsDropdown from '../components/OptionsDropdown';
import MarqueeBanner from '../components/MarqueeBanner';
import NotesChatbot from '../components/NotesChatbot';

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
      <NotesChatbot/>
    </div>
  );
};

export default Home;
      