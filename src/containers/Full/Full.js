import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

// import Breadcrumbs from 'react-breadcrumbs';

const Full = (props) => {
  return (
    <div className="Full">
      <div className="app">
        <Header {...props} />
        <div className="app-body">
          <Sidebar {...props}/>
          <main className="main">
            {/* <Breadcrumbs
              wrapperElement="ol"
              wrapperClass="breadcrumb"
              itemClass="breadcrumb-item"
              separator=""
              routes={props.routes}
              params={props.params}
            /> */}
            <div className="container-fluid">
              {props.children}
            </div>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    </div>
  );
}
Full.propTypes = {}

export default Full;
