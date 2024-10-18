import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Department = () => {
    const departmentsArray = [
        {
          name: "Pediatrics",
          imageUrl: "/departments/pedia.jpg",
        },
        {
          name: "Orthopedics",
          imageUrl: "/departments/ortho.jpg",
        },
        {
          name: "Cardiology",
          imageUrl: "/departments/cardio.jpg",
        },
        {
          name: "Neurology",
          imageUrl: "/departments/neuro.jpg",
        },
        {
          name: "Oncology",
          imageUrl: "/departments/onco.jpg",
        },
        {
          name: "Radiology",
          imageUrl: "/departments/radio.jpg",
        },
        {
          name: "Physical Therapy",
          imageUrl: "/departments/therapy.jpg",
        },
        {
          name: "Dermatology",
          imageUrl: "/departments/derma.jpg",
        },
        {
          name: "ENT",
          imageUrl: "/departments/ent.jpg",
        },
      ];
    
    const responsive = {
        extraLarge: {
            // the naming can be any, depends on you.
            breakpoint: { max: 3000, min: 1324 },
            items: 4,
            slidesToSlides:1,
        },
        large: {
            breakpoint: { max: 1324, min: 1005 },
            items: 3,
            slidesToSlides:1,
        },
        medium: {
            breakpoint: { max: 1005, min: 700 },
            items: 2,
            slidesToSlides:1,
        },
        small: {
            breakpoint: { max: 700, min: 0 },
            items: 1,
            slidesToSlides:1,
        }
    };
    return (
        <div className='container departments'>
            <h2>Department</h2>
            <Carousel responsive={responsive} removeArrowOnDeviceType={["medium","small"]}>
               {
                departmentsArray.map((department,index)=>{
                    return(
                        <div className="card" key={index}>
                            <div className="depart-name">{department.name}</div>
                            <img src={department.imageUrl} alt={department.name} />
                        </div>
                    )
                })
               }
            </Carousel>
        </div>
    )
}

export default Department