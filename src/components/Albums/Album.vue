<template>
    <div class="card-container">
        <div class="card-flip">
            <div class="front card text-center">
                <img class="card-img-top" alt="Album img" :src="album.image[3]['#text']">
                <div class="card-body">
                    <h5 class="card-title">{{ album.name }}</h5>
                </div>
            </div>
            <div class="back card">
                <div class="card-body">
                    <ul class="album-playlist">
                        <li v-for="track in tracks" id="playlist">
                            <a :href="track.url" target="_blank">{{ track['@attr'].rank }}. {{ track.name }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: ['album', 'artist'], //get data from 'Albums' component
        data() {
            return {
                tracks: [], // contains all tracks of single album for specified artist
            }
        },
        methods: {
            //get all tracks of single album for specified artist
            getAlbumInfo() {
                this.$http.get('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=af70d8b9968c2bb588bc7af8f554feef&artist=' + this.artist + '&album=' + this.album.name + '&format=json')
                    .then(response => response.json())
                    .then(data => {
                        if (data.album.tracks.track.length > 0) { //if tracks exists
                            this.tracks = data.album.tracks.track
                        } else {
                            this.tracks.push({
                                name: 'No playlist',
                                '@attr': {
                                    rank: ''
                                }
                            })
                        }
                    })
            }
        },
        created() {
            //run 'getAlbumInfo' method when component is created
            this.getAlbumInfo()
        }
    }

</script>


<style scoped>
    .card-container {
        height: 420px;
        width: 320px;
        color: #fff;
        margin-bottom: 80px;
    }

    .card-container .card {
        background-color: #212221;
        border-radius: 5px;

    }

    .card-container .front {
        max-height: 420px;
        overflow: hidden;
    }

    .card-container .back {
        max-height: 420px;
        overflow-y: scroll;
        font-size: 1.1rem;
    }

    .card-container h5.card-title {
        font-size: 1.4rem;
        font-weight: 600;
    }

    .card-container .album-playlist {
        padding: 5px 10px;
        font-size: 1.1rem;
    }

    .card-container .album-playlist li {
        list-style: none;
    }

    .card-container .album-playlist li a {
        text-decoration: none;
        color: #fff;
    }

    .card-container .album-playlist li a:hover {
        color: #ACACAC
    }

    /* Scrollbar */

    .card-container .back::-webkit-scrollbar {
        width: 1em;
    }

    .card-container .back::-webkit-scrollbar-thumb {
        background-color: #212221;
        outline: 1px solid slategrey;
    }

    /*****************
        RESPONSIVE
    ******************/

    @media (max-width: 1200px) {
        .card-container {
            margin-bottom: 60px;
            height: auto;
            width: auto;
        }

        .card-container .back .card-body a {
            font-size: 1rem;
        }
    }

    @media (max-width: 768px) {
        .card-container .back .card-body a {
            font-size: 1rem;
        }
    }

    @media (max-width: 575px) {
        .card-container {
            margin: 0 auto 80px auto;
            max-width: 320px;
            height: auto;
        }

        .card-container .back .card-body {
            font-size: 1.1rem;
        }
    }

    /*********************
        FLIP ANIMATION
    **********************/

    .card-container {
        perspective: 700px;
    }

    .card-flip .card-container {
        transform-style: preserve-3d;
        transition: all 0.8s ease;
    }

    .card-flip div {
        backface-visibility: hidden;
        transform-style: preserve-3d
    }

    .back {
        transform: rotateY(-180deg)
    }

    .card-container:hover .card-flip {
        transform: rotateY(180deg)
    }

    .card-flip {
        display: grid;
        grid-template: 1fr / 1fr;
        grid-template-areas: 'frontAndBack';
        transform-style: preserve-3d;
        transition: all 0.8s ease;
    }

    .front {
        grid-area: frontAndBack
    }

    .back {
        grid-area: frontAndBack;
        transform: rotateY(-180deg)
    }

    .card-container {
        display: grid;
        perspective: 700px;
    }

</style>
