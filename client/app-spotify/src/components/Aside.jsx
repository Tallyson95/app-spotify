import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import li_home from '../assets/li_home.svg';
import li_headphones from '../assets/li_headphones.svg';
import './Aside.css';
import { OptionContext } from '../contexts/Option';

function Aside() {
    const {selectedOption} = useContext(OptionContext);
    return (
        <div>
            <aside className="aside-container">
                <header className="aside-header">
                    <h1>.Monks Tune</h1>
                </header>
                <ul className="aside-list">
                    <Link className="aside-link" to='/'>
                        <li style={ selectedOption !== "artistas"? {backgroundColor:'#17a74a'} : null} className="aside-item">
                            <img src={li_home} className="aside-icon" alt="Home" />
                            <span className='txt-icon-menu'>Home</span>
                        </li>
                    </Link>
                    <Link className="aside-link" to={'/artistas'}>
                        <li style={ selectedOption === "artistas"? {backgroundColor:'#17a74a'} : null} className="aside-item">
                            <img src={li_headphones} className="aside-icon" alt="Artistas" />
                            <span className='txt-icon-menu'>Artistas</span>
                        </li>
                    </Link>
                </ul>
            </aside>
        </div>
    );
}

export default Aside;
