import React from 'react'
import './page.css'
import blog from '../assets/blog.png'
import HomeCard from '../card/HomeCard'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <>
    <div>

      <div class="card">
        <img src={blog} alt="..." className='imag' />
        <div class="card-content">
          <h2>The Sustainable Investor</h2>
          <h4>Making sustainability financially sound</h4>
          <h5>Start your journey with us .</h5>
        </div>
      </div>
<div className='homecard'>
  <HomeCard />
</div>
    </div>

    </>
  )
}

export default Home
