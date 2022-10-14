import { Link } from "react-router-dom";
import "./nav.css";

function Nav2() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ height: "90px", marginBottom: "0px" }}>
        <div className="container-fluid" >
          {/* <a className="navbar-brand" href="#">Navbar</a> */}
          <Link to={"/"}>
            <img
              alt="?"
              src="assets/tempImg/logo2.PNG"
              style={{ height: "80px" }}
            /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav" >
            <ul className="navbar-nav">
              <li className="nav-item">
                {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                <Link
                  className="nav-link"
                  to="/perfume"
                  style={{
                    fontSize: "30px",
                    fontFamily: "EarlyFontDiary",
                    marginRight: "20px",
                  }}
                >
                  PERFUME
                </Link>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="#">Features</a> */}
                <Link
                  className="nav-link"
                  to="/commu"
                  style={{
                    fontSize: "30px",
                    fontFamily: "EarlyFontDiary",
                    marginRight: "20px",
                  }}
                >
                  COMMUNITY
                </Link>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="#">Pricing</a> */}
                <Link
                  className="nav-link"
                  to="/test"
                  style={{
                    fontSize: "30px",
                    fontFamily: "EarlyFontDiary",
                    marginRight: "20px",
                  }}
                >
                  TEST
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/login"

                >
                  <div className="nav-login" style={{
                    fontSize: "15px",
                    fontFamily: "EarlyFontDiary",
                    marginRight: "20px",
                    fontWeight: "bold",
                  }} >
                    LOGIN / REGIST
                  </div>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className="nav-link nav-login"
                  to="/profile"
                  style={{
                    fontSize: "15px",
                    fontFamily: "EarlyFontDiary",
                    marginRight: "20px",
                    fontWeight: "bold"
                  }}
                >
                  PROFILE
                </Link>
              </li> */}

              {/* <li className="nav-item">
                <a className="nav-link" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li> */}
            </ul>
            {/* <span className="navbar-text">
              Navbar text with an inline element
            </span> */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav2;
