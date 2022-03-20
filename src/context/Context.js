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
    const [currentQuantity, setCurrentQuantity] = useState(0)
    // const [inProp, setInProp] = useState(false);

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
    /*
        const reduce = (evt) => {
            quantity > 0 ? setQuantity(quantity - 1) : setQuantity(0)
        }
    
        const increase = (evt) => {
            quantity < 10 ? setQuantity(quantity + 1) : setQuantity(10)
        }
    */
    const increaseCurrentQuantity = () => {
        setCurrentQuantity(currentQuantity + 1)
    }

    const reduceCurrentQuantity = () => {
        currentQuantity > 0 ? setCurrentQuantity(currentQuantity - 1) : setCurrentQuantity(0)
    }


    const updateCart = () => {
        currentQuantity <= 0 ? alert("There are no items to add") : setQuantity(quantity + currentQuantity)
        setCurrentQuantity(0)
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
            console.log(`current slide number is ${dataNum + 1}`)
        }

        setShowModal(!showModal)
    }

    const updateCost = () => {
        const targetData = document.querySelector(".carousel-slide").dataset.cost
        setCost(parseInt(targetData))
        setNetPrice(cost - (cost * rate))
        setCartData(dataNum)
    }

    const nextImage = () => {

        if (parseInt(dataNum) >= products.length - 1) {
            setDataNum(0)
        } else {
            setDataNum(parseInt(dataNum) + 1)
        }
        updateCost()

    }

    const previousImage = () => {
        if (parseInt(dataNum) <= 0) {
            setDataNum(products.length - 1)
        } else {
            setDataNum(parseInt(dataNum) - 1)
        }
        updateCost()

    }

    const dots = Array.from(document.querySelectorAll(".carousel-indicator-main"))

    dots.forEach((dot, idx) => {
        dot.addEventListener("click", function () {
            const targetData = document.querySelector(".carousel-slide").dataset.cost
            setDataNum(idx)
            setCost(parseInt(targetData))
            setNetPrice(cost - (cost * rate))
        })
    })

    useEffect(() => {
        fetchData()
        setFetchStatus("success")
    }, [])


    return (
        <DataContext.Provider value={{
            products, error, fetchStatus, quantity, dataNum, updateCart,
            increaseCurrentQuantity, reduceCurrentQuantity, currentQuantity,
            cartControl, cartOpen, resetCart, toggleModal,
            previousImage, nextImage, netPrice, cartData, cost, showModal
        }}>
            {props.children}
        </DataContext.Provider>
    )
}