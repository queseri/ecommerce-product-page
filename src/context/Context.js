import { useState, createContext, useEffect } from 'react'
import * as Realm from 'realm-web'

export const DataContext = createContext()

export const DataProvider = (props) => {
    const [error, setError] = useState(null);
    const [fetchStatus, setFetchStatus] = useState('idle')
    const [products, setProducts] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [cartOpen, setCartOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [dataNum, setDataNum] = useState(1)

    const rate = .5
    const [cost, setCost] = useState(250)
    const [netPrice, setNetPrice] = useState(cost - (cost * rate))
    const [cartData, setCartData] = useState(3)

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

        } catch (err) {
            setError(err)
            setFetchStatus("error")
            console.error(err);
        }
    }

    const reduce = (evt) => {
        quantity > 0 ? setQuantity(quantity - 1) : setQuantity(0)
    }

    const increase = (evt) => {
        quantity < 10 ? setQuantity(quantity + 1) : setQuantity(10)
    }

    const resetCart = () => {
        setQuantity(0)
    }

    const cartControl = (evt) => {
        setCartOpen(!cartOpen)
    }

    const toggleModal = (evt) => {

        if (!showModal) {
            const target = parseInt(evt.target.closest(".carousel-slide").dataset.id)
            setDataNum(target - 1)           
            console.log(dataNum)
            console.log(`current slide number is ${dataNum + 1}` )
        }

        setShowModal(!showModal)
    }

    const moveSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = "translateX(-" + targetSlide.style.left + ")"
        currentSlide.classList.remove("current-slide")
        targetSlide.classList.add("current-slide")
    }

    const nextImage = () => {
        console.log(`current slide number is ${dataNum + 1}` )
        console.log(`length of array ${products.length}` )
        if (parseInt(dataNum) >= products.length - 1) {
            setDataNum(0)
        } else {
            setDataNum(parseInt(dataNum) + 1)
        }
    }

    const previousImage = () => {
        console.log(dataNum)
        console.log(products.length)
        if (parseInt(dataNum) <= 0) {
            setDataNum(products.length - 1 )
        } else {
            setDataNum(parseInt(dataNum) - 1)
        }
    }
/*
    const nextImage = (evt) => {
        const currentSlide = document.querySelector(".current-slide")
        const nextSlide = currentSlide.nextElementSibling
        const track = document.querySelector(".carousel-track")
        if (nextSlide === null) return
        moveSlide(track, currentSlide, nextSlide)
        setCost(parseInt(nextSlide.dataset.cost))
        setNetPrice(cost - (cost * rate))
        setCartData(parseInt(nextSlide.dataset.id - 1))
        console.log(evt)
    }

    const previousImage = (evt) => {
        const currentSlide = document.querySelector(".current-slide")
        const prevSlide = currentSlide.previousElementSibling
        const track = document.querySelector(".carousel-track")
        if (prevSlide === null) return
        moveSlide(track, currentSlide, prevSlide)
        setCost(parseInt(prevSlide.dataset.cost))
        setNetPrice(cost - (cost * rate))
        setCartData(prevSlide.dataset.id - 1)
        console.log(evt)
    }
*/
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

    useEffect(() => {
        fetchData()

        setFetchStatus("success")
    }, [])

    return (
        <DataContext.Provider value={{
            products, error, fetchStatus, quantity, increase, dataNum,
            reduce, cartControl, cartOpen, resetCart, toggleModal, 
            selectCarousel, previousImage, nextImage, netPrice, cartData, cost, showModal
        }}>
            {props.children}
        </DataContext.Provider>
    )
}