import React from 'react'

const Hero = ({ title, imageUrl }) => {
    return (
        <div className='hero container'>
            <div className="banner">
                <h1>{title}</h1>
                <p>ZeeCare Medical Institute is a state-of-the-art healthcare facility dedicated to providing comprehensive medical services with a focus on quality, innovation, and patient-centric care. Equipped with advanced medical technology and staffed by highly skilled professionals, the institute offers a wide range of medical specialties, including diagnostics, surgery, preventive care, and rehabilitation. ZeeCare is committed to enhancing the well-being of its patients through personalized treatment plans and a compassionate approach.</p>
            </div>
            <div className="banner">
                <img src={imageUrl} alt="hero" className='animated-image'/>
                <span>
                    <img src="/Vector.png" alt="vector" />
                </span>
            </div>
        </div>
    )
}

export default Hero