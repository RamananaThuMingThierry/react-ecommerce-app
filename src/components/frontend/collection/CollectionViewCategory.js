import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const CollectionVeiwCategory = () =>{

    const [Category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const category_count = Category.length;

    useEffect(() =>{
        
        let isMountered = true;

        axios.get(`api/all-category`).then(res =>{
            if(isMountered){
                if(res.data.status === 200){
                    setCategory(res.data.category);
                }  
            }
            setLoading(false);
        });

        return () => {
            isMountered = false;
        }
        
    },[]);

    if(loading){
        return (
            <h1>Collection ...</h1>
        );
    }else{
        var listcategory = "";
        if(category_count){
            listcategory = Category.map((item, idx) => {
                return ( 
                    <div className="box" key={idx}>
                       <div className="image">
                           <img src="" alt=""/>
                           <Link to={`collections/${item.slug}`} className="fas fa-heart"></Link>
                       </div>
                       <div className="content">
                           <div className="stars">
                               <i className="fas fa-star"></i>
                               <i className="fas fa-star"></i>
                               <i className="fas fa-star"></i>
                               <i className="fas fa-star"></i>
                               <i className="fas fa-star-half-alt"></i>
                           </div>
                           <h3>{item.name}</h3>
                           <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
                           <Link to={`collections/${item.slug}`} class="btn">Voir</Link>
                       </div>
                   </div>
                )
            })
        }else{
            listcategory = 
            <div className="col-md-12">
                <h4>No category</h4>
            </div>
        }
    }

    return (
        <section className="menu" style={{marginTop: "65px"}} id="menu">
            <h3 className="heading">Catégories</h3>

            <div className="box-container">
                {listcategory}
            </div>
        </section>
    );
}

export default CollectionVeiwCategory;
