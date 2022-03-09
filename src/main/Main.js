import React from 'react'
import { useContext, useState, useRef, useEffect } from 'react'
import Left from '../images/icon-previous.svg'
import Right from '../images/icon-next.svg'
import useWindowSize from './useWindowResize'
import Cart from '../images/icon-cart.svg'
import { DataContext } from '../context/Context'

function Main() {
    const { products, error, fetchStatus, reduce, increase, quantity } = useContext(DataContext)
    const sliderRef = useRef(null)
    const size = useWindowSize();
    const rate = .5
    const [cost, setCost] = useState(250)
    const [netPrice, setNetPrice] = useState(cost - (cost * rate))
    const [cartData, setCartData] = useState(3)
    console.log(products)

    const moveSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = "translateX(-" + targetSlide.style.left + ")"
        currentSlide.classList.remove("current-slide")
        targetSlide.classList.add("current-slide")
    }


    useEffect(() => {

    }, [size])

    const nextImage = () => {
        const currentSlide = document.querySelector(".current-slide")
        const nextSlide = currentSlide.nextElementSibling
        const track = document.querySelector(".carousel-track")
        if (nextSlide === null) return
        moveSlide(track, currentSlide, nextSlide)
        setCost(parseInt(nextSlide.dataset.cost))
        setNetPrice(cost - (cost * rate))
        setCartData(parseInt(nextSlide.dataset.id - 1))
        console.log(nextSlide)
    }

    const previousImage = () => {
        const currentSlide = document.querySelector(".current-slide")
        const prevSlide = currentSlide.previousElementSibling
        const track = document.querySelector(".carousel-track")
        if (prevSlide === null) return
        moveSlide(track, currentSlide, prevSlide)
        setCost(parseInt(prevSlide.dataset.cost))
        setNetPrice(cost - (cost * rate))
        setCartData(prevSlide.dataset.id - 1)
    }

    if (fetchStatus === 'idle' || fetchStatus === 'loading' || products === 'undefined' || products.length === 0) {
        return <div className='loading'>
            <p className='loading-title'>Loading...</p>
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
                        <button className='carousel-button carousel-button-left'
                            onClick={previousImage}>
                            <img src={Left} alt="" />
                        </button>
                        <button className='carousel-button carousel-button-right'
                            onClick={nextImage}>
                            <img src={Right} alt="" />
                        </button>
                        <ul className='carousel-track' ref={sliderRef}>
                            {products && products.map((product, idx) => <li key={product._id}
                                data-id={product.id}
                                data-cost={product.price}
                                className={`carousel-slide  ${idx === 0 ? "current-slide" : ""}`}
                                style={{ left: `${idx * size.width}px` }}>
                                <img className='carousel-image' src={product.image} alt=""
                                />
                            </li>)}
                        </ul>
                    </div>

                    <ul className="carousel-nav carousel-nav-hide">
                        {products && products.map((product, idx) => <li key={product._id}>
                            <button className='carousel-indicator'>
                                <img className='carousel-thumb' src={product.thubmnail} alt="" />
                            </button>
                        </li>)}

                    </ul>
                </div>
                <div className='primary-content'>
                    <div className="primary-content-container">
                        <h1 className='main-title'>Sneaker company</h1>
                        <h2 className='secondary-title'>Fall Limited Edition Sneakers</h2>
                        <p className='main-content'>
                            These low-profile sneakers are your perfect casual wear companion. Featuring a
                            durable rubber outer sole, they'll withstand everything the weather can offer.
                        </p>
                    </div>
                    <div className='form'>
                        <div className="display">
                            <p className='product-discounted-cost'>
                                <strong className="discounted-cost">
                                    {netPrice.toLocaleString('en-us', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}
                                </strong>
                                <span className='sr-only'>after</span>
                                <strong className='discount-rate'>50%</strong>
                            </p>
                            <p className='init-cost-container'>
                                <span className="sr-only">cost before discount is</span>
                                <strong className='init-cost'>
                                    <s>
                                        {cost.toLocaleString('en-us', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}
                                    </s>
                                </strong>
                            </p>
                        </div>
                        <div className='quantity-control'>
                            <button className="btn btn-reduce" onClick={reduce}>
                                -
                            </button>
                            <span className='quantity'>{quantity}</span>
                            <button className="btn btn-increase" onClick={increase}>
                                +
                            </button>
                        </div>

                        <button className='btn-add-to-cart'>
                            <img src={Cart} alt="" />
                            <span>Add to cart</span>
                        </button>
                    </div>

                </div>
            </div>
            <div className="checkout-container">
                <h3 className="checkout-title">
                    cart
                </h3>
                {quantity <= 0 ? <div><p>The cart is empty</p></div> :
                    <div className="checkout">
                        <img src={products[cartData].thubmnail} alt="" />
                    </div>
                }

            </div>
        </main>
    )
}

export default Main