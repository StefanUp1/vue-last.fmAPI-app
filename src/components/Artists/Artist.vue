<template>
    <div class="card-container">
        <div class="card-flip">
            <div class="front card">
                <img class="card-img-top" alt="Artist img" :src="artist.image[3]['#text']">
                <div class="card-body">
                    <h5 class="card-title">{{ artist['@attr'].rank}} . {{ artist.name }}</h5>
                </div>
            </div>
            <div class="back card">
                <div class="card-body">
                    <p class="card-text">{{ limitedInfo }} ...</p>
                    <router-link :to="{name: 'albums', params: {artist: artist.name}}">
                            <a href="#" class="btn btn-primary" id="album-button">Albums</a>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: ['artist'],
        data() {
            return {
                artistSummary: '' //contains additional info about single artist
            }
        },
        computed: {
            //limit summary about artist to 300 characters
            limitedInfo() {
                return this.artistSummary.substring(0, 300)
            }
        },
        methods: {
            //get additional info about single artist
            getArtistInfo() {
                this.$http.get('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + this.artist.name + '&api_key=af70d8b9968c2bb588bc7af8f554feef&format=json')
                    .then(response => response.json())
                    .then(data => {
                        this.artistSummary = data.artist.bio.summary
                    })
            }
        },
        created() {
            this.getArtistInfo()
        },
        beforeUpdate() {
            //update info about artist when genre is changed
            this.getArtistInfo()
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
        font-size: 1.1rem;
    }

    .card-container h5.card-title {
        font-size: 1.4rem;
        font-weight: 600;
    }

    .card-container .back .card-body #album-button {
        background-color: #AD172B;
        border: none;
        padding: 6px 18px;
        font-size: 1rem;
    }

    /*****************
        RESPONSIVE
    ******************/

    @media (max-width: 1200px) {
        .card-container {
            margin-bottom: 50px;
            height: auto;
            width: auto;
        }

        .card-container .back .card-body {
            font-size: 0.9rem;
        }
    }

    @media (max-width: 768px) {
        .card-container .back .card-body {
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
