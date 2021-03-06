import React from 'react'
import { useContext } from 'react'
//import { CSSTransition } from 'react-transition-group';
//import "../../react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Left from '../images/icon-previous.svg'
import Right from '../images/icon-next.svg'
import Delete from '../images/icon-delete.svg'

//import useWindowSize from './useWindowResize'
import Cart from '../images/icon-cart.svg'
import { DataContext } from '../context/Context'
import Checkout from './Checkout'
import Primary from './Primary'
import { Rings } from 'react-loader-spinner'
import CarouselBtn from './CarouselBtn'

function Main() {

    const { products, error, fetchStatus, quantity, dataNum, updateCart,
        increaseCurrentQuantity, reduceCurrentQuantity, currentQuantity,
        cartOpen, resetCart, selectCarousel, previousImage, nextImage,
        netPrice, cartData, cost, toggleModal, cartControl } = useContext(DataContext)

    const productList = products && products.filter((product, idx) => idx === parseInt(dataNum))

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

    return (
        <main className='main'>
            <div className="main-container">
                <div className='carousel' tabIndex="-1">

                    <div className='carousel-track-container'>
                        <CarouselBtn leftDirection={true} onClick={previousImage} src={Left}
                            text="visit previous image" />

                        <CarouselBtn leftDirection={false} onClick={nextImage} src={Right}
                            text="view the next slide" />

                        <div className='carousel-track'>
                            {productList && productList.map(product => <div key={product._id}
                                data-id={product.id} data-cost={product.price}
                                className={`carousel-slide`}>
                                <button className='carousel-image-btn' onClick={toggleModal}>
                                    <img className='carousel-image' src={product.image}
                                        width={1000} height={1000}
                                        aria-live="polite"
                                        alt={`view product ${product.name}`} />
                                </button>
                            </div>
                            )}

                        </div>

                    </div>

                    <ul className="carousel-nav carousel-nav-hide">
                        {products && products.map((product, idx) => <li key={product._id}>
                            <button className='carousel-indicator carousel-indicator-main' data-id={product.id} onClick={selectCarousel}>
                                <img className='carousel-thumb' src={product.thubmnail} alt="" />
                                <span className="sr-only">Select product {product.name}</span>
                            </button>
                        </li>)}
                    </ul>

                </div>

                <Primary increase={increaseCurrentQuantity} reduce={reduceCurrentQuantity} currentQuantity={currentQuantity} cart={Cart} updateCart={updateCart}
                    netprice={netPrice.toLocaleString('en-us', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}
                    cost={cost.toLocaleString('en-us', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}
                />

            </div>

            <Checkout cartOpen={cartOpen} src={products[cartData].thubmnail} clearCart={resetCart} checkout={cartControl}
                cost={`${cost.toLocaleString('en-us', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}
                *   ${quantity} =
                ${(cost * quantity).toLocaleString('en-us', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}`}
                srcDelete={Delete} quantity={quantity} />

        </main>
    )
}

export default Main