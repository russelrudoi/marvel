import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import useMarvelService from '../../../services/MarvelService';
import './singleComicPage.scss';


const SingleComicPage = () => {
    const {comicId} = useParams()
    console.log(comicId)
    const [comic, setComic] = useState(null);
    const {loading, error, getComic} = useMarvelService();

    useEffect(() => {
        updateComic()
        
    }, [comicId])

    let a = "http://gateway.marvel.com/v1/public/comics/4277"

    console.log(a.slice(43, a.length))

    const updateComic = () => {
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
        console.log(comic)
    }
 
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null
    
    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {

    const {name, thumbnail, description, pageCount, language, price} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;