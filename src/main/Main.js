import React from 'react'
import { useContext, useState, useRef, useEffect } from 'react'
import Left from '../images/icon-previous.svg'
import Right from '../images/icon-next.svg'
import Delete from '../images/icon-delete.svg'
import useWindowSize from './useWindowResize'
import Cart from '../images/icon-cart.svg'
import { DataContext } from '../context/Context'
import Checkout from './Checkout'
import Primary from './Primary'

function Main() {
    const { products, error, fetchStatus, reduce, increase, quantity, cartOpen } = useContext(DataContext)
    const sliderRef = useRef(null)
    const size = useWindowSize();
    const rate = .5
    const [cost, setCost] = useState(250)
    const [netPrice, setNetPrice] = useState(cost - (cost * rate))
    const [cartData, setCartData] = useState(3)

    //  console.log(products)
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

    const selectCarousel = (evt) => {
        const track = document.querySelector(".carousel-track")
        const dots = Array.from(document.querySelectorAll(".carousel-indicator"))
        const slides = Array.from(document.querySelectorAll(".carousel-slide"))
        const targetDot = evt.target.closest("button")
        const currentSlide = document.querySelector(".current-slide")
        const targetIndex = dots.findIndex(dot => dot === targetDot)
        const targetSlide = slides[targetIndex]
        moveSlide(track, currentSlide, targetSlide)
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
    // size.width = slideRef.current.offsetWidth
    return (
        <main className='main'>
            <div className="main-container">
                <div className='carousel' tabIndex="-1">

                    <div className='carousel-track-container'>
                        <button className='carousel-button carousel-button-left'
                            onClick={previousImage}>
                            <img src={Left} alt="" />
                            <span className="sr-only">visit previous image</span>
                        </button>
                        <button className='carousel-button carousel-button-right'
                            onClick={nextImage}>
                            <img src={Right} alt="" />
                            <span className="sr-only">go to next image</span>
                        </button>
                        <ul className='carousel-track' ref={sliderRef}>
                            {products && products.map((product, idx) => <li key={product._id}
                                data-id={product.id}
                                data-cost={product.price}
                                className={`carousel-slide  ${idx === 0 ? "current-slide" : ""}`}
                                style={{ left: `${idx * size.width}px` }}>
                                <img className='carousel-image' src={product.image} alt={`view product ${product.name}`}
                                />
                            </li>)}
                        </ul>
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

            <Checkout cartOpen={cartOpen} src={products[cartData].thubmnail}
                cost={`${cost.toLocaleString('en-us', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}
                *   ${quantity} =
                ${(cost * quantity).toLocaleString('en-us', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}`}
                srcDelete={Delete} quantity={quantity} />

        </main>
    )
}

export default Main