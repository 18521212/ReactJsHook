import "./Blog.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";

const YoutubeSearch = () => {
    const [videos, setVideos] = useState([]);
    const [query, setQuery] = useState('')
    const handleSearchYoutube = async () => {
        let res = await axios({
            "method": "GET",
            "url": "https://www.googleapis.com/youtube/v3/search",
            "params": {
                'part': 'snippet',
                'maxResults': '20',
                'key': 'AIzaSyBMr9y2Yz51y_21J0Vi1-IdJsHn5GDFi_s',
                'type': 'video',
                'q': query
            }
        })

        if (res && res.data && res.data.items) {
            let raw = res.data.items;
            let result = [];
            if (raw && raw.length > 0) {
                raw.map(item => {
                    let object = {};
                    object.id = item.id.videoId;
                    object.title = item.snippet.title;
                    object.createAt = item.snippet.publishedAt;
                    object.author = item.snippet.channelTitle;
                    object.description = item.snippet.description;

                    result.push(object);
                })
            }

            setVideos(result)
        }
    }
    return (
        <div className="youtube-search-container">
            <div className="youtube-search">
                <input type="text" placeholder="Search" 
                    value={query}
                    onChange={(event) => setQuery(event.target.value)} />
                <button type="button" onClick={handleSearchYoutube}>Search</button>
            </div>
            {videos && videos.length > 0 &&
                videos.map(item => {
                    return (
                        <div className="youtube-result" key={item.id}>
                            <div className="left">
                                <iframe className="iframe-youtube"
                                src={`https://www.youtube.com/embed/${item.id}`}
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen>
                                    
                                </iframe>
                            </div>
                            <div className="right">
                                <div className="title">
                                    {item.title}
                                </div>
                                <div className="created-at">
                                    Create At: {moment(item.createAt).format('DD-MM-YYYY HH:mm:ss A')}
                                </div>
                                <div className="author">
                                    Author: {item.author}
                                </div>
                                <div className="description">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default YoutubeSearch;