import React from 'react'
import '././Dashboard.css';
import { Link } from "react-router-dom";


function Header() {

    let logout = () => {
        localStorage.clear();
        window.location.href = '/login';
    }

    return (
        <>
            <div className="header">
                <div className="navbar navbar-light white">
                    <div className="row">

                        <div className="col-md-2">

                            <div className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent15"
                                aria-controls="navbarSupportedContent15" aria-expanded="true" aria-label="Main-menu">
                                <span className="navbar-toggler-icon"></span>
                            </div>

                            <div className="collapse" id="navbarSupportedContent15">

                                <ul className="navbar-nav nav navbar-right">
                                    <br></br>
                                    <Link to="/note">
                                        <li className="nav-item side-notes">
                                            <i className="fa fa-lightbulb-o"></i>
                                            Notes
                                        </li>
                                    </Link>

                                    <Link to="">
                                        <li className="nav-item side-notes">
                                            <i className="fa fa-bell-o"></i>
                                            Reminders
                                        </li>
                                    </Link>

                                    <Link to="">
                                        <li className="nav-item side-notes">
                                            <i className="fa fa-pencil"></i>
                                            EditLabels
                                        </li>
                                    </Link>

                                    <Link to="/archive">
                                        <li className="nav-item side-notes">
                                            <i className="fa fa-archive"></i>
                                            Archive
                                        </li>
                                    </Link>

                                    <Link to="/trash">
                                        <li className="nav-item side-notes">
                                            <i className="fa fa-trash-o"></i>
                                            Trash
                                        </li>
                                    </Link>

                                </ul>

                            </div>

                        </div>

                        <div className="col-md-2">
                            <img className="keep" src={require('../../images/keep.png')} alt="keep" />
                            <span className="keep-text">Fundoo</span>
                        </div>

                        <div className="col-md-4">
                            <form id="top-search" className="search-container">
                                <div className="input-group">
                                    <input type="text" placeholder="Search.." name="search" />
                                </div>
                            </form>
                        </div>

                        <div className="col-md-4">
                            <div className="logout">
                                <button type="button" className="btn btn-warning" onClick={logout}>LOGOUT</button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            {/* end of header */}

        </>
    )
}

export default Header