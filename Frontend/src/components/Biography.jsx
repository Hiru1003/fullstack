import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <>
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="whoweare" />
      </div>
      <div className="banner">
        {/* <p>Biography</p> */}
        <h3>Who We Are</h3>
        <p>
        At Medicare, we are dedicated to ensuring that every individual receives the healthcare coverage and support they need. With a commitment to excellence, compassion, and accessibility, we strive to empower beneficiaries and their families to navigate the complexities of healthcare with confidence and peace of mind. Our experienced team works tirelessly to provide accurate information, personalized assistance, and innovative solutions to meet the diverse needs of our community. With a focus on integrity and inclusivity, we aim to foster a healthier, happier future for all.
        </p>
        <p>
        Our experienced team works tirelessly to provide accurate information, personalized assistance, and innovative solutions to meet the diverse needs of our community. With a focus on integrity and inclusivity, we aim to foster a healthier, happier future for all.
        
        </p>
        <p>Have a healthy day!</p>
      </div>
    </div>
  </>
  )
}

export default Biography
