import { Link } from "react-router-dom";

function nav() {
  return (
    <header className="header-area clearfix">
      <div className="header-top-area header-padding-2">
        <div className="container-fluid"></div>
      </div>
      <div className="header-bottom sticky-bar header-res-padding header-padding-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-2 col-lg-2 d-none d-lg-block"></div>
            <div className="col-xl-3 col-lg-3 d-none d-lg-block">
              <div className="main-menu">
                <nav>
                  <ul
                    style={{
                      textAlign: "right",
                      marginBottom: "0px",
                      marginTop: "0px",
                    }}
                  >
                    <li>
                      {/* <a
                        href="about.html"
                        style={{
                          fontSize: "35px",
                          fontFamily: "EarlyFontDiary",
                          marginRight: "20px",
                        }}
                      >
                        {" "}
                        PERFUME
                      </a> */}
                      <Link
                        to="/perfume"
                        style={{
                          fontSize: "35px",
                          fontFamily: "EarlyFontDiary",
                          marginRight: "20px",
                        }}
                      >
                        PERFUME
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-4">
              <div
                className="logo"
                style={{ textAlign: "center", marginTop: "0" }}
              >
                <a
                  href="/"
                  // style={{
                  //   textAlign: "center",
                  //   fontFamily: "GmarketSansBold",
                  //   fontSize: "40px",
                  // }}
                >
                  {/* <img alt="" src="assets/img/logo/logo.png" /> */}
                  <img
                    alt="?"
                    src="assets/tempImg/logo2.PNG"
                    style={{ height: "94px" }}
                  />
                </a>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 d-none d-lg-block">
              <div className="main-menu">
                <nav>
                  <ul
                    style={{
                      textAlign: "left",
                      marginBottom: "0px",
                      marginTop: "0px",
                    }}
                  >
                    <li>
                      {/* <a
                        href="contact.html"
                        style={{
                          fontSize: "35px",
                          fontFamily: "EarlyFontDiary",
                        }}
                      >
                        {" "}
                        COMMUNITY
                      </a> */}
                      <Link
                        to="/commu"
                        style={{
                          fontSize: "35px",
                          fontFamily: "EarlyFontDiary",
                          marginRight: "20px",
                        }}
                      >
                        COMMUNITY
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-8">
              <div className="header-right-wrap">
                <div className="same-style header-search">
                  <a className="search-active" href="#">
                    <i className="pe-7s-search"></i>
                  </a>
                  <div className="search-content">
                    <form action="#">
                      <input type="text" placeholder="Search" />
                      <button className="button-search">
                        <i className="pe-7s-search"></i>
                      </button>
                    </form>
                  </div>
                </div>
                <div className="same-style account-satting">
                  <a className="account-satting-active" href="#">
                    <i className="pe-7s-user-female"></i>
                  </a>
                  <div className="account-dropdown">
                    <ul>
                      <li>
                        <a href="login-register.html">Login</a>
                      </li>
                      <li>
                        <a href="login-register.html">Register</a>
                      </li>
                      {/* <li>
                        <a href="wishlist.html">Wishlist </a>
                      </li> */}
                      <li>
                        <a href="my-account.html">my account</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="same-style header-wishlist">
                  <a href="wishlist.html">
                    <i className="pe-7s-like"></i>
                  </a>
                </div>
                {/* <div className="same-style cart-wrap">
                  <button className="icon-cart">
                    <i className="pe-7s-shopbag"></i>
                    <span className="count-style">02</span>
                  </button>
                  <div className="shopping-cart-content">
                    <ul>
                      <li className="single-shopping-cart">
                        <div className="shopping-cart-img">
                          <a href="#">
                            <img alt="" src="assets/img/cart/cart-1.png" />
                          </a>
                        </div>
                        <div className="shopping-cart-title">
                          <h4>
                            <a href="#">T- Shart & Jeans </a>
                          </h4>
                          <h6>Qty: 02</h6>
                          <span>$260.00</span>
                        </div>
                        <div className="shopping-cart-delete">
                          <a href="#">
                            <i className="fa fa-times-circle"></i>
                          </a>
                        </div>
                      </li>
                      <li className="single-shopping-cart">
                        <div className="shopping-cart-img">
                          <a href="#">
                            <img alt="" src="assets/img/cart/cart-2.png" />
                          </a>
                        </div>
                        <div className="shopping-cart-title">
                          <h4>
                            <a href="#">T- Shart & Jeans </a>
                          </h4>
                          <h6>Qty: 02</h6>
                          <span>$260.00</span>
                        </div>
                        <div className="shopping-cart-delete">
                          <a href="#">
                            <i className="fa fa-times-circle"></i>
                          </a>
                        </div>
                      </li>
                    </ul>
                    <div className="shopping-cart-total">
                      <h4>
                        Shipping : <span>$20.00</span>
                      </h4>
                      <h4>
                        Total : <span className="shop-total">$260.00</span>
                      </h4>
                    </div>
                    <div className="shopping-cart-btn btn-hover text-center">
                      <a className="default-btn" href="cart-page.html">
                        view cart
                      </a>
                      <a className="default-btn" href="checkout.html">
                        checkout
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="mobile-menu-area">
            <div className="mobile-menu">
              <nav id="mobile-menu-active">
                <ul className="menu-overflow">
                  <li>
                    <a href="about.html">About us</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default nav;
