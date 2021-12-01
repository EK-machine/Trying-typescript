import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import routesData from "../routesData";
import ProductsDropDown from "../productsDropDown";
import SignInBtn from "../elements/signInBtn";
import SignUpBtn from "../elements/signUpBtn";
import SignOutBtn from "../elements/signOutBtn";
import UserName from "../elements/userName";
import { LoggedInConsumer, UserNameConsumer } from "../../contex/context";
import { HeaderProps } from "../../types/types";

const Header: React.FC<HeaderProps> = ({
  showSignInModal,
  showSignUpModal,
  logInFunc,
  logOutFunc,
  showSignInModalFunc,
  showSignUpModalFunc,
  closeModalFunc,
}) => (
  <header className="header__container">
    <div className="header__title-container">
      <h1 className="header__title">Best Games Market</h1>
    </div>
    <div className="header__btns-container">
      <NavLink
        key={routesData[0].text}
        exact
        to={routesData[0].path}
        className="header__btn"
        activeClassName="header__btn-active"
        role="button"
      >
        <p className="header__btn-title">{routesData[0].text}</p>
      </NavLink>

      <ProductsDropDown>
        <p>{routesData[1].text}</p>
      </ProductsDropDown>

      <NavLink
        key={routesData[2].text}
        exact
        to={routesData[2].path}
        className="header__btn"
        activeClassName="header__btn-active"
        role="button"
      >
        <p className="header__btn-title">{routesData[2].text}</p>
      </NavLink>
      <div className="header__btn-log_container">
        <LoggedInConsumer>
          {(contextLogInState) => {
            if (contextLogInState) {
              return (
                <>
                  <UserNameConsumer>{(contextUserName) => <UserName userName={contextUserName} />}</UserNameConsumer>
                  <SignOutBtn logOutFunc={logOutFunc} />
                </>
              );
            }
            return (
              <>
                <SignInBtn
                  logInFunc={logInFunc}
                  showSignInModalFunc={showSignInModalFunc}
                  closeModalFunc={closeModalFunc}
                  showSignInModal={showSignInModal}
                />
                <SignUpBtn
                  logInFunc={logInFunc}
                  showSignUpModalFunc={showSignUpModalFunc}
                  closeModalFunc={closeModalFunc}
                  showSignUpModal={showSignUpModal}
                />
              </>
            );
          }}
        </LoggedInConsumer>
      </div>
    </div>
  </header>
);
export default Header;