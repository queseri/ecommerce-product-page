import React from 'react'
import hamburger from '../images/icon-menu.svg'
import cart from '../images/icon-cart.svg'
import profile from '../images/image-avatar.png'
import logo from '../images/logo.svg'

function Header() {
  return (
    <header className='header'>
        <div className="menu-control">
            <button className="open-modal-nav">
                <img src={hamburger} alt="" />
            </button>
            <div className="logo-container">
                <img src={logo} alt="" />
            </div>
        </div>
        <div className="product-summary">
            <div className="cart-summary">
                <img src={cart} alt="" />
            </div>
            <div className="profile">
                <img src={profile} alt="" />
            </div>
        </div>
    </header>
  )
}

export default Header