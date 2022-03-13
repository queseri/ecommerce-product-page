import { useState, createContext, useEffect } from 'react'
import * as Realm from 'realm-web'

export const DataContext = createContext()

export const DataProvider = (props) => {
    const [error, setError] = useState(null);
    const [fetchStatus, setFetchStatus] = useState('idle')
    const [products, setProducts] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [cartOpen, setCartOpen] = useState(false)

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

    useEffect(() => {
        fetchData()

        setFetchStatus("success")
    }, [])

    return (
        <DataContext.Provider value={{
            products, error, fetchStatus, quantity, increase,
            reduce, cartControl, cartOpen, resetCart
        }}>
            {props.children}
        </DataContext.Provider>
    )
}