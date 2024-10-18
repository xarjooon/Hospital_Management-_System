import React from 'react'

const Biography = ({ imageUrl }) => {
    return (
        <div className='container biography'>
            <div className="banner">
                <img src={imageUrl} alt="aboutImg" />
            </div>
            <div className="banner">
                <p>Biography</p>
                <h3>Who We Are</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos, magni veniam error vitae quod reprehenderit maiores facere nam deleniti quaerat provident architecto consectetur eum quia vel laborum a voluptatibus tempora ratione nostrum asperiores! Doloribus qui corrupti facilis commodi corporis. Quidem aperiam minima explicabo minus magnam quia. Aperiam tempore libero animi?</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea impedit, soluta est, perferendis pariatur quo accusamus, debitis totam magni corrupti aperiam fugiat doloremque. Odit cumque excepturi veniam eveniet. Sit, esse. Voluptatibus iusto odit ipsa provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, debitis.</p>
                <p>Lorem, ipsum dolor.</p>
            </div>
        </div>
    )
}

export default Biography