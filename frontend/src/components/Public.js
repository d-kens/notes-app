import { Link } from 'react-router-dom';

import React from 'react'

const Public = () => {
  return (
    <section className='public'>
        <header>
            <h1>Welcome to <span className='nowrap'>Dickens' Repairs</span></h1>
        </header>
        <main className='public__main'>
            <p>
                Located in Beautiful Downtown South B City, Dickens' Repairs privides a trained staff ready to meet your tech repair needs.
            </p>
            <address className='public__addr'>
                Dickens' Repairs <br />
                00500 Aoko Road<br />
                South B City, Nairobi<br />
                <a href='#'>0707127309</a>
            </address>
        </main>
        <footer>
            <Link to='/login'>Employee Login</Link>
        </footer>
    </section>
  )
}

export default Public