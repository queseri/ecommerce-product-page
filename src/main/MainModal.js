import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../context/Context'
//import useWindowSize from './useWindowResize'
import CloseImageButton from '../images/icon-close.svg'
import Left from '../images/icon-previous.svg'
import Right from '../images/icon-next.svg'
import CarouselBtn from './CarouselBtn'

function MainModal() {
    // const size = useWindowSize();
    const { products, showModal, dataNum, toggleModal, nextModalImage, previousModalImage, selectCarousel } = useContext(DataContext)
    const productList = products && products.filter((product, idx) => idx === (dataNum - 1))
    //  const sliderRef = useRef(null)

    return (
        <div className={`main-modal ${showModal ? "show-modal" : ""}`}>
            <div className='carousel-track-container carousel-track-container-modal'>
                <button className="close-modal-btn" onClick={toggleModal}>
                    <span className="sr-only">
                        close the modal image panel
                    </span>
                    <img src={CloseImageButton} alt="" />
                </button>

                <CarouselBtn leftDirection={true} onClick={previousModalImage} src={Left}
                    text="visit previous image" modalBtn={true} />

                <CarouselBtn leftDirection={false} onClick={nextModalImage} src={Right}
                    text="view the next slide" modalBtn={true} />

                <div className='carousel-track carousel-track-modal'>
                    {productList && productList.map(product => <img key={product._id} className='carousel-image' src={product.image} alt="" />)}
                </div>

            </div>

            <ul className="carousel-nav carousel-nav-hide">
                {products && products.map((product, idx) => <li key={product._id}>
                    <button className='carousel-indicator' data-id={product.id} onClick={selectCarousel}>
                        <img className='carousel-thumb' src={product.thubmnail} alt="" />
                        <span className="sr-only">Select product {product.name}</span>
                    </button>
                </li>)}
            </ul>
        </div>
    )
}

export default MainModal