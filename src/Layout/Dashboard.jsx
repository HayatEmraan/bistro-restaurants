import { Link, Outlet } from "react-router-dom";
import { BsMenuButton, BsPeopleFill } from "react-icons/bs";
import { BiCartAdd, BiCategory } from "react-icons/bi";
import {
  FaCalendarAlt,
  FaComments,
  FaHome,
  FaShoppingCart,
  FaWallet,
} from "react-icons/fa";
import { BiMenuAltLeft, BiShoppingBag, BiSupport } from "react-icons/bi";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin, isLoading] = useAdmin();
  console.log(isAdmin);
  console.log(isLoading);
  const bistroLogo = (
    <div className="font-cinzel font-extrabold ms-3 mb-8">
      <h2 className="text-3xl">BISTRO BOSS</h2>
      <h2 className="-mt-2 text-2xl">Restaurant</h2>
    </div>
  );
  return (
    <>
      {!isLoading && (
        <div className="drawer drawer-mobile">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex justify-center">
            <Outlet />
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

            <ul className="menu p-4 w-80 bg-[#D1A054] h-full text-base-content font-cinzel font-semibold text-lg">
              <div>{bistroLogo}</div>
              {isAdmin ? (
                <>
                  {" "}
                  <li>
                    <Link to="/dashboard/admin">
                      <FaHome />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/add/items">
                      <BiCartAdd />
                      Add Items
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/manage/items">
                      <BiCategory />
                      Manage Items
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/manage/bookings">
                      <BsMenuButton />
                      Manage Bookings
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/users">
                      <BsPeopleFill />
                      All users
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li>
                    <Link to="/dashboard">
                      <FaHome />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/reservation">
                      <FaCalendarAlt />
                      Reservation
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/history">
                      <FaWallet />
                      Payment History
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/mycart">
                      <FaShoppingCart />
                      My Cart
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/reviews">
                      <FaComments />
                      Add Review
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/booking">
                      <FaShoppingCart />
                      My Booking
                    </Link>
                  </li>
                </>
              )}

              <div className="divider"></div>
              <li>
                <Link to="/">
                  <FaShoppingCart />
                  home
                </Link>
              </li>
              <li>
                <Link to="/menu">
                  <BiMenuAltLeft />
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/order/salad">
                  <BiShoppingBag />
                  shop
                </Link>
              </li>
              <li>
                <a>
                  <BiSupport />
                  contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
