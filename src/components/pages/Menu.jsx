import { useAuth } from '../../contexts/authContext'


function Menu() {
	const { signUpWithGoogle } = useAuth();
  return (
    <div>
      <button onClick={ signUpWithGoogle }>Signup</button>
    </div>
  );
}

export default Menu;
