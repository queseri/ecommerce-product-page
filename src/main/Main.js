import React from 'react'
import { useState, useRef, useEffect } from 'react';
import * as Realm from 'realm-web'
import Left from '../images/icon-previous.svg'
import Right from '../images/icon-next.svg'
import useWindowSize from './useWindowResize';

function Main() {
    const sliderRef = useRef(null)
    const size = useWindowSize();
    const [error, setError] = useState(null);
    const [fetchStatus, setFetchStatus] = useState('idle')
    const [products, setProducts] = useState([])
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)
    // const [totalSlides, setTotalSlides] = useState(null)
    const [slideWidth, setSlideWidth] = useState(null)
   

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

    useEffect(() => {

    }, [size.width])

    const moveSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = "translateX(-" + targetSlide.style.left + ")"
        currentSlide.classList.remove("current-slide")
        targetSlide.classList.add("current-slide")
    }

    

    const nextImage = (evt) => {
      //  setSlideWidth(sliderRef.current.getBoundingClientRect().width)
        const currentSlide = document.querySelector(".current-slide")
        const nextSlide = currentSlide.nextElementSibling
        const track = document.querySelector(".carousel-track")
        if (nextSlide === null) return
        moveSlide(track, currentSlide, nextSlide)
      /*  const target = document.querySelector(".carousel-track")
        if (nextSlide === null) return
        const amountToMove = nextSlide.style.left
        target.style.transform = "translateX(-" + amountToMove + ")"
        currentSlide.classList.remove("current-slide")
        nextSlide.classList.add("current-slide")
        */
    }

    const previousImage = (evt) => {
        const currentSlide = document.querySelector(".current-slide")
        const prevSlide = currentSlide.previousElementSibling
        const track = document.querySelector(".carousel-track")
        if (prevSlide === null) return
        moveSlide(track, currentSlide, prevSlide)

        /*
        if (prevSlide === null) return

        const amountToMove = prevSlide.style.left
        target.style.transform = "translateX(-" + amountToMove + ")"
        currentSlide.classList.remove("current-slide")
        prevSlide.classList.add("current-slide")
        */
    }


    // Slider.getBoundingClientRect()

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
            <div className='carousel' tabIndex="-1">

                <div className='carousel-track-container'>
                    <button className='carousel-button carousel-button-left'
                        onClick={previousImage}>
                        <img src={Left} alt="" />
                    </button>
                    <ul className='carousel-track' ref={sliderRef}>
                        {products.map((product, idx) => <li key={product._id}
                            className={`carousel-slide  ${idx === 0 ? "current-slide" : ""}`}
                            style={{ left: `${idx * size.width}px` }}>
                            <img className='carousel-image' src={product.image} alt=""

                            />
                        </li>)}
                    </ul>
                    <button className='carousel-button carousel-button-right'
                        onClick={nextImage}>
                        <img src={Right} alt="" />
                    </button>
                </div>

                <div className="carousel-nav">
                    <button className="carousel-indicator"></button>
                    <button className="carousel-indicator"></button>
                    <button className="carousel-indicator"></button>
                </div>
            </div>
            <div className="primary-content">

            </div>
        </main>
    )
}

export default Main