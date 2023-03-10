import React from "react";
import { Link } from "react-router-dom";

const Aside = () =>{
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="info">
              <Link to="/admin/dashboard" className="d-block">RAMANANA Thierry</Link>
            </div>
          </div>
    
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              
              {/* Dashboard */}
              <li className="nav-item has-treeview menu-open">
                <Link to="/admin/dashboard" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                    Dashboard
                </Link>
              </li>
              
              {/* Profile */}
              <li className="nav-item has-treeview">
                <Link to="/admin/profile" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                    Profile
                </Link>
              </li>
              
              {/* Category */}
              <li className="nav-item has-treeview">
                <Link to="/admin/category" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                   Category
                </Link>
              </li>
              
              {/* Product */}
              <li className="nav-item has-treeview">
                <Link to="/admin/product" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                   Product
                </Link>
              </li>
              
              {/* Users */}
              <li className="nav-item has-treeview">
                <Link to="/admin/users" className="nav-link">
                  <i className="nav-icon fas fa-folder"></i>
                   Users
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
}

export default Aside;