import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import YoutubeSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDzNy6nqvH30tLGIp4jzJ9tOWP8sTTFuxw';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('Lucas Wei');
    }

    videoSearch(term) {
        YoutubeSearch({
            key: API_KEY,
            term: term
        }, videos => this.setState({
            videos: videos,
            selectedVideo: videos[0]
        }));
    }

    render() {
        const videoSearch = _.debounce(term => this.videoSearch(term), 300);

        return (
            <div>
                <SearchBar onSearchTermChanged={term => videoSearch(term)} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    videos={this.state.videos}
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));