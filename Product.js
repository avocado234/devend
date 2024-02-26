import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Product() {
    // Add Product Variables
    const myInputRef0 = React.createRef();
    const myInputRef1 = React.createRef();
    const myInputRef2 = React.createRef();
    const myInputRef3 = React.createRef();

    // Update Product Variables
    const myInputRef4 = React.createRef();
    const myInputRef5 = React.createRef();
    const myInputRef6 = React.createRef();

    const [product, setProduct] = useState([]);
    const [message,setMessage] = useState('');
    useEffect(() => {
        console.log("request to api");
        axios.get("http://127.0.0.1:5000/products")
            .then(response => setProduct(response.data))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [product]);

    const onDeleteProducts = (id) => {
        console.log("DELETE " + id);
        axios.delete(`http://127.0.0.1:5000/products/${id}`)
            .then((response) => setProduct(response.data))
            .catch(error => {
                console.error('Error', error);
                setMessage(error.response.data.message || 'An error occurred while deleting the product.');
            });        
    };
    
    const onOkClick = (id) => {
        console.log("UPDATE " + id);
        const data = {
            name: myInputRef4.current.value,
            price: myInputRef5.current.value,
            img: myInputRef6.current.value
        };
        axios.put(`http://127.0.0.1:5000/products/${id}`, data)
            .then((response) => {
                setProduct(response.data)
                setMessage('Update Successfuly!')
            })
            .catch(error => {
                console.error('Error', error);
                setMessage(error.response.data.message || 'An error occurred while updating the product.');
            });
    };
    
    const onAddProduct = () => {
        const data = {
            _id: parseInt(myInputRef0.current.value),
            name: myInputRef1.current.value,
            price: myInputRef2.current.value,
            img: myInputRef3.current.value
        };
        axios.post("http://127.0.0.1:5000/products", data)
            .then((response) => {
                setProduct(response.data)
                setMessage('Add Product Successfuly')
            })
            .catch(error => {
                console.error('Error', error);
                setMessage(error.response.data.message || 'An error occurred while adding the product.');
            });
    };

    if (!product) return null;

    let productList;
    if (Array.isArray(product)) {
        productList = product.map(p => (
            <li key={p._id}>
                ID :{p._id}
                <span> {p.name}</span>
                <img src={p.img}/> 
                {p.price}
                <button onClick={() => onDeleteProducts(p._id)}>Delete</button>
                <button onClick={() => onOkClick(p._id)}>ok</button>
            </li>
        ));
    } else {
        productList = []; 
    }

    return (
        <div style={{ display: 'grid' }}>
            <div style={{ margin: '50px', display: 'grid', justifyContent: 'center' }}>
                <h1 style={{ textAlign:'center'}}>Add Products</h1>
                <div>{message && <p>{message}</p>}</div>
                _id: <input type="number" name="product_id" ref={myInputRef0}/>
                Product Name: <input type="text" name="product_name" ref={myInputRef1}/>
                Price: <input type="text" name="product_price" ref={myInputRef2}/>
                img: <input type="text" name="product_img" ref={myInputRef3}/>
                <button onClick={onAddProduct}>Add Product</button>
            </div>
            <div style={{ margin: '50px', display: 'grid', justifyContent: 'center' }}>
                <h1 style={{ textAlign: 'center' }}>Update Products </h1>
                <h2>If Ok Click Button(OK) On Product</h2>
                Product Name: <input type="text" name="product_name" ref={myInputRef4}/>
                Price: <input type="text" name="product_price" ref={myInputRef5}/>
                img: <input type="text" name="product_img" ref={myInputRef6}/>
            </div>
            <h1 style={{ textAlign: 'center' }}>Product</h1>
            <ul>
                {productList}
            </ul>
        </div>
    );
}
