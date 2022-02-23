import { useState } from 'react'
import hamburger from '../images/icon-menu.svg'
import closeBtn from '../images/icon-close.svg'
import cart from '../images/icon-cart.svg'
import profile from '../images/image-avatar.png'
import logo from '../images/logo.svg'

function Header({removeOverlay}) {
    const [openModal, setOpenModal] = useState(false)
    function showModal() {
        setOpenModal(!openModal)
        removeOverlay()
    }
    return (
        <header className='header'>
            <nav className="flex nav">
                <div className="menu-control flex">
                    <button className={`open-modal-nav`}
                        aria-expanded={openModal}
                        aria-controls='modal-menu'
                        onClick={showModal}>
                        <span className="sr-only">
                            {openModal ? "Close the navigation" : "open the navigation"}
                        </span>
                        <img className={`hamburger ${openModal ? "hide-nav-btn" : ""}`}
                            src={hamburger}
                            aria-hidden={true}
                            alt="" />
                        <img className={`close-btn ${openModal ? "" : "hide-nav-btn"}`}
                            aria-hidden={true}
                            src={closeBtn}
                            alt="" />
                    </button>

                    <div className="logo-container">
                        <img className='logo-image' src={logo} alt="" />
                    </div>
                </div>

                <div className={`modal-menu ${openModal ? "modal-active" : ""}`} id='modal-menu'>

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

                <div className="product-summary flex">
                    <button className="cart-summary flex">
                        <img className='cart-image' src={cart} alt="" />
                        <span className='cart-number'>1</span>
                    </button>
                    <button className="profile">
                        <img className='profile-image' src={profile} alt="" />
                    </button>
                </div>

            </nav>

        </header>
    )
}

export default Header