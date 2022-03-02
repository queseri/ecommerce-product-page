import React from 'react'
import { useState, useEffect } from 'react';
import * as Realm from 'realm-web'
import Left from '../images/icon-previous.svg'
import Right from '../images/icon-next.svg'

function Main() {

    const [error, setError] = useState(null);
    const [fetchStatus, setFetchStatus] = useState('idle')
    const [products, setProducts] = useState([])

    const fetchData = async () => {
        setFetchStatus("loading")
        const REALM_APP_ID = "ecommerce-app-yxftv"
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();
        try {
            const user = await app.logIn(credentials);
            const allProducts = await user.functions.getAllProducts()
            setProducts(await allProducts)
            setFetchStatus("success")
            console.log(allProducts)
            console.log(products)
        } catch (err) {
            setError(err)
            setFetchStatus("error")
            console.error(err);
        }
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (fetchStatus === 'idle' || fetchStatus === 'loading') {
        return <div className='loading'>
            <h2 className='loading-title'>Loading...</h2>
        </div>
    }

    if (fetchStatus === error) {
        return <div className='loading-error'>
            <h2 className='loading-error-title'>Something went wrong!!</h2>
        </div>
    }

    return (
        <main className='main'>
            <div className='carousel'>

                <div className='carousel-track-container'>
                    <button className='carousel-button carousel-button-left'>
                        <img src={Left} alt="" />
                    </button>
                    <ul className='carousel-track'>
                        {products.map(product => <li key={product._id} className='carousel-slide'>                            
                            <img className='carousel-image' src={product.image} alt=""
                            />
                        </li>)}
                    </ul>
                    <button className='carousel-button carousel-button-right'>
                        <img src={Right} alt="" />
                    </button>
                </div>

                <div className="carousel-nav">
                    <button className="carousel-indicator"></button>
                    <button className="carousel-indicator"></button>
                    <button className="carousel-indicator"></button>
                </div>
            </div>
        </main>
    )
}

export default Main