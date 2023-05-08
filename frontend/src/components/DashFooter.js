import { useNavigate, useLocation } from 'react-router-dom';
import { BsHouseFill } from 'react-icons/bs'

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  const onGoHomeClicked = () => navigate('/dash');

  let goHomeButton = null;
  if(pathname !== '/dash') {
    goHomeButton = (
        <button
        className='dash-footer__button icon-button'
        title='Home'
        onClick={onGoHomeClicked}
        >
          <BsHouseFill />
        </button>
    )
  }

  const content = (
    <footer className="dash-footer">
        {goHomeButton}
        <p>current user: </p>
        <p>status: </p>
    </footer>
  )
  return content
}

export default DashFooter