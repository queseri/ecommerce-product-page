import React from 'react'

function CarouselBtn(props) {
    const direction = props.leftDirection ? "carousel-button-left" : "carousel-button-right"
    const modalBtn = props.modalBtn ? "modal-btn-control" : ""
    return (
        <button className={`carousel-button  ${direction} ${modalBtn}`}
            onClick={props.onClick}>
            <img src={props.src} alt="" />
            <span className="sr-only">{props.text}</span>
        </button>
    )
}

export default CarouselBtn