import React from 'react'
import { useContext, useRef, useEffect } from 'react'
//import "../../react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Left from '../images/icon-previous.svg'
import Right from '../images/icon-next.svg'
import Delete from '../images/icon-delete.svg'
import useWindowSize from './useWindowResize'
import Cart from '../images/icon-cart.svg'
import { DataContext } from '../context/Context'
import Checkout from './Checkout'
import Primary from './Primary'
import { Rings } from 'react-loader-spinner'
import CarouselBtn from './CarouselBtn'

function Main() {
    const { products, error, fetchStatus, reduce, increase, quantity, dataNum,
        cartOpen, resetCart, selectCarousel, previousImage, nextImage,
        netPrice, cartData, cost, toggleModal } = useContext(DataContext)

    const productList = products && products.filter((product, idx) => idx === parseInt(dataNum))
    //const sliderRef = useRef(null)
    const size = useWindowSize();

    useEffect(() => {

    }, [size.width])

    if (fetchStatus === 'idle' || fetchStatus === 'loading' || products === 'undefined' || products.length === 0) {
        return <div className='loading'>
            <Rings color="#00BFFF" height={160} width={160} />
        </div>
    }

    if (fetchStatus === error) {
        return <div className='loading loading-error'>
            <p className='loading-title loading-error-title'>Something went wrong!!</p>
        </div>
    }
    // size.width = slideRef.current.offsetWidth
    return (
        <main className='main'>
            <div className="main-container">
                <div className='carousel' tabIndex="-1">

                    <div className='carousel-track-container'>
                        <CarouselBtn leftDirection={true} onClick={previousImage} src={Left}
                            text="visit previous image" />

                        <CarouselBtn leftDirection={false} onClick={nextImage} src={Right}
                            text="view the next slide" />

                        <div className='carousel-track carousel-track-modal'>
                            {productList && productList.map(product => <div key={product._id}
                                data-id={product.id} data-cost={product.price}
                                className={`carousel-slide`}>
                                <button className='carousel-image-btn' onClick={toggleModal}>
                                    <img className='carousel-image' src={product.image}
                                        alt={`view product ${product.name}`} />
                                </button>
                            </div>
                            )}
                        </div>
                        {/*
                        <ul className='carousel-track' ref={sliderRef}>
                            {products && products.map((product, idx) => <li key={product._id}
                                data-id={product.id}
                                data-cost={product.price}
                                className={`carousel-slide  ${idx === 0 ? "current-slide" : ""}`}
                                style={{ left: `${idx * size.width}px` }}>
                                <button className='carousel-image-btn' onClick={toggleModal}>
                                    <img className='carousel-image' src={product.image}
                                        alt={`view product ${product.name}`} />
                                </button>
                            </li>)}
                        </ul>
                     */}
                    </div>

                    <ul className="carousel-nav carousel-nav-hide">
                        {products && products.map((product, idx) => <li key={product._id}>
                            <button className='carousel-indicator' data-id={product.id} onClick={selectCarousel}>
                                <img className='carousel-thumb' src={product.thubmnail} alt="" />
                                <span className="sr-only">Select product {product.name}</span>
                            </button>
                        </li>)}
                    </ul>

                </div>

                <Primary increase={increase} reduce={reduce} quantity={quantity} cart={Cart}
                    netprice={netPrice.toLocaleString('en-us', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}
                    cost={cost.toLocaleString('en-us', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}
                />

            </div>

            <Checkout cartOpen={cartOpen} src={products[cartData].thubmnail} clearCart={resetCart}
                cost={`${cost.toLocaleString('en-us', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}
                *   ${quantity} =
                ${(cost * quantity).toLocaleString('en-us', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}`}
                srcDelete={Delete} quantity={quantity} />

        </main>
    )
}

export default Main