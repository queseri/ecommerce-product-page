import { useState } from 'react'
import hamburger from '../images/icon-menu.svg'
import closeBtn from '../images/icon-close.svg'
import cart from '../images/icon-cart.svg'
import profile from '../images/image-avatar.png'
import logo from '../images/logo.svg'

function Header() {
    const [openModal, setOpenModal] = useState(false)
    function showModal() {
        setOpenModal(!openModal)
    }
    return (
        <header className='header'>
            <nav className="flex nav">
                <div className="menu-control flex">
                    <button className={`open-modal-nav`} aria-pressed={false} onClick={showModal}>
                        <img className={`hamburger ${openModal ? "hide-nav-btn" : ""}`} src={hamburger} alt="" />
                        <img className={`close-btn ${openModal ? "" : "hide-nav-btn"}`} src={closeBtn} alt="" />
                    </button>

                    <div className="logo-container">
                        <img className='logo-image' src={logo} alt="" />
                    </div>
                </div>
                <div className="product-summary flex">
                    <button className="cart-summary flex">
                        <img className='cart-image' src={cart} alt="" />
                        <span className='cart-number'>1</span>
                    </button>
                    <button className="profile">
                        <img className='profile-image' src={profile} alt="" />
                    </button>
                </div>
                <div className={`modal-menu ${openModal ? "modal-active" : ""}`}>

                    <ul className="nav-list">
                        <li className='nav-list-item'>
                            <a className='nav-list-item-btn' href="/">Collections</a>
                        </li>
                        <li className='nav-list-item'>
                            <a className='nav-list-item-btn' href="/">Men</a>
                        </li>
                        <li className='nav-list-item'>
                            <a className='nav-list-item-btn' href="/">Women</a>
                        </li>
                        <li className='nav-list-item'>
                            <a className='nav-list-item-btn' href="/">About</a>
                        </li>
                        <li className='nav-list-item'>
                            <a className='nav-list-item-btn' href="/">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>

        </header>
    )
}

export default Header