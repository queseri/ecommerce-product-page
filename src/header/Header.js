import { useContext, useState } from 'react'
import hamburger from '../images/icon-menu.svg'
import closeBtn from '../images/icon-close.svg'
import cart from '../images/icon-cart.svg'
import profile from '../images/image-avatar.png'
import logo from '../images/logo.svg'
import { DataContext } from '../context/Context'

function Header({removeOverlay}) {
    const [openModal, setOpenModal] = useState(false)
    const { quantity, cartControl } = useContext(DataContext)
    function showModal() {
        setOpenModal(!openModal)
        removeOverlay()
    }
    return (
        <header className='header container'>
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
                        <img className='logo-image' src={logo} alt="" aria-hidden={true}/>
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
                    <button className="cart-summary flex" onClick={cartControl}>
                        <img className='cart-image' src={cart} alt="" />
                        <span className="sr-only">number of items in the cart</span>
                        <span className={`cart-number ${quantity === 0 ? "cart-number-hide" : ""}`}>{quantity}</span>
                    </button>
                    <button className="profile">
                        <img className='profile-image' src={profile} alt="" />
                        <span className="sr-only">view the profile</span>
                    </button>
                </div>

            </nav>        
        </header>
    )
}

export default Header