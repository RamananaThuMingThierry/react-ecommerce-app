import React from "react";
import { Link } from "react-router-dom";

const Home = () =>{
    return (
        <>
      <section className="home" id="home">

      <div className="swiper-container home-slider">
  
          <div className="swiper-wrapper wrapper">
  
              <div className="swiper-slide slide">
                  <div className="content">
                      <span>our special dish</span>
                      <h3>spicy noodles</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque?</p>
                      <a href="#" className="btn">order now</a>
                  </div>
                  <div className="image">
                      <img src="images/home-img-1.png" alt=""/>
                  </div>
              </div>
  
              <div className="swiper-slide slide">
                  <div className="content">
                      <span>our special dish</span>
                      <h3>fried chicken</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque?</p>
                      <a href="#" className="btn">order now</a>
                  </div>
                  <div className="image">
                      <img src="images/home-img-2.png" alt=""/>
                  </div>
              </div>
  
              <div className="swiper-slide slide">
                  <div className="content">
                      <span>our special dish</span>
                      <h3>hot pizza</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque?</p>
                      <a href="#" className="btn">order now</a>
                  </div>
                  <div className="image">
                      <img src="images/home-img-3.png" alt=""/>
                  </div>
              </div>
  
          </div>
  
          <div className="swiper-pagination"></div>
  
      </div>
  
  </section>
  
<section className="about" id="about">

<h3 className="sub-heading"> about us </h3>
<h1 className="heading"> why choose us? </h1>

<div className="row">

    <div className="image">
        <img src="images/about-img.png" alt=""/>
    </div>

    <div className="content">
        <h3>best food in the country</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, sequi corrupti corporis quaerat voluptatem ipsam neque labore modi autem, saepe numquam quod reprehenderit rem? Tempora aut soluta odio corporis nihil!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, nemo. Sit porro illo eos cumque deleniti iste alias, eum natus.</p>
        <div className="icons-container">
            <div className="icons">
                <i className="fas fa-shipping-fast"></i>
                <span>free delivery</span>
            </div>
            <div className="icons">
                <i className="fas fa-dollar-sign"></i>
                <span>easy payments</span>
            </div>
            <div className="icons">
                <i className="fas fa-headset"></i>
                <span>24/7 service</span>
            </div>
        </div>
        <a href="#" className="btn">learn more</a>
    </div>

</div>

</section>
</>
    );
}

export default Home;