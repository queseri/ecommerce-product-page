import React from 'react'
import { useState, useRef, useEffect } from 'react';
import * as Realm from 'realm-web'
import Left from '../images/icon-previous.svg'
import Right from '../images/icon-next.svg'
import useWindowSize from './useWindowResize'
import Cart from '../images/icon-cart.svg'

function Main() {
    const sliderRef = useRef(null)
    const size = useWindowSize();
    const [error, setError] = useState(null);
    const [fetchStatus, setFetchStatus] = useState('idle')
    const [products, setProducts] = useState([])
    const rate = .5
    const [quantity, setQuantity] = useState(0)
    const [cost, setCost] = useState(250)
    const [netPrice, setNetPrice] = useState(cost - (cost * rate))

    //const sizeRect =  elm.getBoundingClientRect()
    //console.log(sizeRect)

    //  const [current, setCurrent] = useState(0)
    //  const [count, setCount] = useState(0)
    // const [totalSlides, setTotalSlides] = useState(null)
    // const [slideWidth, setSlideWidth] = useState(null)

    const fetchData = async () => {
        setFetchStatus("loading")
        const REALM_APP_ID = "ecommerce-app-yxftv"
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {
            const user = await app.logIn(credentials);
            const allProducts = await user.functions.getAllProducts()
            // setTotalSlides(allProducts.length)
            setProducts(await allProducts)
            setFetchStatus("success")

            console.log(allProducts)

            // console.log(sliderRef.current.getBoundingClientRect())
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

    /*
    useEffect(() => {
        window.addEventListener("resize", handleSize)
    }, [size.width])

    function handleSize() {
        console.log(size.width)
    }
*/
    const moveSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = "translateX(-" + targetSlide.style.left + ")"
        currentSlide.classList.remove("current-slide")
        targetSlide.classList.add("current-slide")
    }



    const nextImage = (evt) => {

        const currentSlide = document.querySelector(".current-slide")
        const nextSlide = currentSlide.nextElementSibling
        const track = document.querySelector(".carousel-track")
        if (nextSlide === null) return
        moveSlide(track, currentSlide, nextSlide)
        setCost(nextSlide.dataset.cost * quantity)
        setNetPrice(cost - (cost * rate))
        // console.log(nextSlide.dataset.cost)
    }

    const previousImage = (evt) => {
        const currentSlide = document.querySelector(".current-slide")
        const prevSlide = currentSlide.previousElementSibling
        const track = document.querySelector(".carousel-track")
        if (prevSlide === null) return
        moveSlide(track, currentSlide, prevSlide)
        setCost(prevSlide.dataset.cost)
        setNetPrice(cost - (cost * rate))

        //console.log(prevSlide.dataset.cost)
    }

    const reduce = (evt) => {
        quantity > 0 ? setQuantity(quantity - 1) : setQuantity(1)      
    }

    const increase = (evt) => {
        quantity < 10 ? setQuantity(quantity + 1) : setQuantity(10)       
    }

    if (fetchStatus === 'idle' || fetchStatus === 'loading') {
        return <div className='loading'>
            <p className='loading-title'>Loading...</p>
        </div>
    }

    if (fetchStatus === error) {
        return <div className='loading-error'>
            <p className='loading-error-title'>Something went wrong!!</p>
        </div>
    }


    return (
        <main className='main'>
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
                        {products.map((product, idx) => <li key={product._id}
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
                    {products.map((product, idx) => <li key={product._id}>
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
        </main>
    )
}

export default Main