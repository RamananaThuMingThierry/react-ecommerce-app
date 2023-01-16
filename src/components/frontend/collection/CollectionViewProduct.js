import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

const CollectionViewProduct = (props) =>{

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [categorys, setCategorys] = useState([]);

    const product_count = products.length;

    useEffect(() =>{
        let isMounted = true;

        const product_slug = props.match.params.slug;

        axios.get(`api/fetchproduct/${product_slug}`).then(res =>{
            if(isMounted){
                if(res.data.status === 200){
                    setProducts(res.data.product_data.products);
                    console.log(res.data.product_data.products);
                    setCategorys(res.data.product_data.categorys);
                    setLoading(false);
                }else if(res.data.status === 400){
                    swal("warning", res.data.message, "error");
                    history.push("/collection");
                }else if(res.data.status === 404){
                    swal("warning", res.data.message, "error");
                    history.push("/collection");
                }
            }
        })
        return () => {
            isMounted = false;
        }
    }, [props.match.params.slug, history]);

    if(loading){
        return (
            <h3>Collection Product</h3>
        )
    }else{
        var listeproduct = "";
        if(product_count){
            listeproduct = products.map((item, idx) => {
                return (
                    <div className="col-md-4" key={idx}>
                        <div className="card">
                            <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                <img src={`http://localhost:8000/${item.image}`} className="w-100" alt="image"/>
                            </Link>
                            <div className="card-body">
                                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                    <h5>{item.name}</h5>
                                </Link>
                            </div>
                        </div>
                    </div>  
                )
            });
        }else{
            listeproduct = 
            <div className="col-md-12">
                <h4>No Product Available for {categorys.name}</h4>
            </div>
        }
    }

    return (
        <section className="menu" style={{marginTop: "65px"}} id="menu">
            <h3 className="heading">Produits</h3>

            <div className="box-container">
                {listeproduct}
            </div>
        </section>       
    );
}

export default CollectionViewProduct;