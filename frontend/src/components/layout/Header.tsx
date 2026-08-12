import { logout } from "../../store/reducerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userState = useSelector(
    (state: any) => state.auth.status
  );

  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Features",
      slug: "/features",
      active: true,
    },
    {
      name: "Docs",
      slug: "/docs",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !userState,
    },
    {
      name: "Register",
      slug: "/register",
      active: !userState,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header>
      <div>
        <Link to="/">CodeSentinel</Link>

        <nav>
          {navItem.map(
            (item) =>
              item.active && (
                <Link key={item.name} to={item.slug}>
                  {item.name}
                </Link>
              )
          )}

          {userState && (
            <button onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;