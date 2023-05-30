import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () =>{
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    }, []);

    const getProducts = async () =>{
        let result = await fetch("http://127.0.0.1:5000/products",{
            headers:{
                "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }
    
    const deleteProduct = async (id) =>{
        let result = await fetch(`http://127.0.0.1:5000/product/${id}`,{
            method:"DELETE",
            headers:{
                "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result){
            getProducts();
        }
    }

    const searchHandle = async(e) => {
        let q = e.target.value;
        if(q){    
            let result = await fetch(`http://127.0.0.1:5000/search/${q}`,{
                headers:{
                    "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            setProducts(result);
        }else{
            getProducts();
        }
    }

    return (
        <div>
            <h1>listing</h1>
            <input type="text" placeholder="Search" onChange={searchHandle} />
            <table style={{width:'100%'}}>
                <thead style={{borderBottom:1, borderBlockColor:'black'}}>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                    products.length > 0 ?
                    products.map((item,index)=>
                    <tr key={index}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.category}</td>
                        <td>{item.brand}</td>
                        <td>
                            <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/"+item._id}><button>Update</button></Link>
                        </td>
                    </tr>
                    )
                    :
                    <tr><td>No product found!</td></tr>
                }
                </tbody>
            </table>
        </div>
    )
}

export default ProductList;