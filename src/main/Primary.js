import React from 'react'

function Primary(props) {
    return (
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
                            {props.netprice}
                        </strong>
                        <span className='sr-only'>after</span>
                        <strong className='discount-rate'>50%</strong>
                    </p>

                    <p className='init-cost-container'>
                        <span className="sr-only">cost before discount is</span>
                        <strong className='init-cost'>
                            <s>
                                {props.cost}
                            </s>
                        </strong>
                    </p>

                </div>

                <div className="add-to-cart-container">

                    <div className='quantity-control'>

                        <button className="btn btn-reduce" onClick={props.reduce}>
                            <span className="sr-only">reduce the quantity to purchase from the cart</span>
                            -
                        </button>

                        <span className='quantity' aria-live='polite'>
                            {props.quantity === 0 ?
                                <small className='sr-only'>the cart is empty</small> :
                                <small className='sr-only'>total items in the cart is equal to </small>
                            }
                            {props.quantity}
                        </span>

                        <button className="btn btn-increase" onClick={props.increase}>
                            +
                            <span className="sr-only"> the quantity of items to the cart</span>
                        </button>

                    </div>

                    <button className='btn btn-add-to-cart' onClick={props.updateCart}>
                        <img src={props.cart} alt="" />
                        <span>Add to cart</span>
                    </button>

                </div>
            </div>

        </div>
    )
}

export default Primary