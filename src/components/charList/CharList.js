import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false)

    const {loading, error, getAllCharacters, clearError} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        clearError();

        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllCharacters(offset)
        .then(onCharLoaded)
    }

    const onCharLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const myRefs = useRef([]);



    const clickFocus = (id) => {
       
        myRefs.current.forEach(item => {
            item.classList.remove('char__item_selected')
        })
        myRefs.current[id].classList.add('char__item_selected')
    }

    function renderItem(arr) {
        const items = arr.map((elem, i) => {
            const {name, thumbnail, id} = elem
            const styleImg = thumbnail.match(/image_not_available/) ? 'contain' : null;
            
            return (
                <li 
                className="char__item"
                key={i} ref={el => myRefs.current[i] = el} 
                tabIndex={i}
                onClick={(e) => {props.onCharSelected(id); clickFocus(i)}}>
                    <img src={thumbnail} alt={name} style={{objectFit: styleImg}}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        });
    
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItem(charList)

    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {items}
            <button className="button button__main button__long"
            disabled={newItemLoading}
            style={{'display': charEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;


    
            