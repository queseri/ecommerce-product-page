import React from 'react'

function Checkout(props) {
    const CheckOut = () => {
        alert("Thank you for shopping with us")
        return props.checkout()
    }
    return (
        <div className={`hide-checkout ${props.cartOpen ? "checkout-container" : ""} `}>
            <h3 className="checkout-title">
                cart
            </h3>

            {props.quantity <= 0 ?
                <div className='checkout-empty flex'>
                    <p className='cart-empty-text'>The cart is empty</p>
                </div> :
                <div className="checkout-main-container">
                    <div className='checkout-detailled flex'>
                        <img src={props.src} alt="" />
                        <div className='checkout-list flex'>
                            <div className="checkout-separator">
                                <h4 className='checkout-list-title'>Fall Limited Edition Sneakers</h4>
                                <p className='checkout-list-details'>{props.cost}</p>
                            </div>
                            <button className='delete-cart' onClick={props.clearCart}>
                                <img src={props.srcDelete} alt="" />
                                <span className='sr-only'>clear cart items</span>
                            </button>
                        </div>
                    </div>
                    <button className='btn-checkout' onClick={CheckOut}>Checkout</button>
                </div>
            }
        </div>
    )
}

export default Checkout