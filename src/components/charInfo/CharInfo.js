import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';


const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const {getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props

        if(!charId) {
            return
        }

        getCharacter(charId)
            .then(onCharLoaded)
            .then(()=> setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )

}

const View = ({data}) => {
    
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    const styleImg = thumbnail.match(/image_not_available/) ? 'contain' : null;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={{objectFit: styleImg}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.length > 0 
                    ? comics.map((item, i) => {
                        while(i < 10) {
                            return(
                                <li key={i} className="char__comics-item">
                                    <Link 
                                    to={`/comics/${item.resourceURI.slice(43)}`}>{item.name}</Link>
                                </li>
                            )
                        }
                    })
                    : "Comics not found"
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;