import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>
            break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
            break;
        case 'confirmed':
            return <Component/>
            break;
        case 'error':
            return <ErrorMessage/>
            break;
        default:
            throw new Error('Unexpected procces state')
    }
}

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(()=> setProcess('confirmed'));
    }

    const onComicsLoaded = (newComicsList) => {
        setComicsList(comicsList => [...comicsList, ...newComicsList])
        setNewItemLoading(false)
        setOffset(offset => offset + 8)
        console.log(offset)
    }

    function renderComics(arr)  {

        const item = arr.map((elem, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${elem.id}`}>
                        <img src={elem.thumbnail} alt={elem.name} className="comics__item-img"/>
                        <div className="comics__item-name">{elem.name}</div>
                        <div className="comics__item-price">{elem.price}$</div>
                    </Link>
                </li>
            )
        })


        return (
            <ul className="comics__grid">
                {item}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, ()=>renderComics(comicsList), newItemLoading)}
            <button className="button button__main button__long" onClick={() => onRequest(offset)} disabled={newItemLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;