<template>
    <div class="albums " id="main">
       
        <div class="title">
            <div class="row">
                <div class="col-sm-12 text-center">
                    <div class="page-title">
                        <router-link to="/" class="title-image">
                            <img src="../../../public/skull.png">
                        </router-link>
                        <div class="title-text">
                            {{ artist }} Albums
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row" id="search-albums">
            <div class="col-md-6 offset-md-3">
                <input type="text" v-model="search" placeholder="Search for Albums" class="form-control">
            </div>
        </div>
        
        <div class="albums-cards">
            <div class="row" >
                <app-album v-for="album in filterAlbums" :album="album" :artist="artist" class="col-12 col-sm-6 col-md-4"></app-album>
                
                <div class="fixed-bottom hidden" id="arrow-up">
                    <a href="#main" v-smooth-scroll>
                        <i class="fas fa-arrow-up fixed"></i>
                    </a>
                </div>
            </div>
        </div>
        
    </div>
    
</template>

<script>
    import Album from './Album.vue'

    export default {
        components: {
            appAlbum: Album
        },
        data() {
            return {
                artist: this.$route.params.artist, //artist name
                pageCount: 1, //page counter used for infiniteScroll
                albums: [], //contains albums for single artist
                search: '' //holder for search input
            }
        },
        computed: {
            // method for searching albums by name
            filterAlbums() {
                return this.albums.filter(album => {
                    return album.name.toLowerCase().match(this.search.toLowerCase())
                })
            }
        },
        methods: {
            //get albums for single artist
            getData(page) {
                this.$http.get('http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=' + this.artist + '&page=' + page + '&limit=10&api_key=af70d8b9968c2bb588bc7af8f554feef&format=json')
                    .then(response => response.json())
                    .then(data => {
                        this.albums = data.topalbums.album
                    })

            },
            scroll() {
                window.onscroll = () => {
                    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight //check if user scrolled to the bottom of page

                    if (bottomOfWindow) { //if true
                        this.pageCount++ //page count is 2
                        this.getData(this.pageCount) //get albums data for 2 pages
                        document.querySelector('#arrow-up').classList.remove('hidden') // show arrow-up button
                    }
                }
            }
        },
        created() {
            this.getData(this.pageCount)
        },
        mounted() {
            this.scroll()
        },
        destroyed() {
            this.pageCount = 0
        }
    }

</script>

<style scoped>
    #arrow-up {
        transition: 0.4s ease;
    }

    .hidden {
        opacity: 0;
    }

    .page-title {
        padding: 30px 0;
    }

    .page-title .title-image {
        margin-bottom: 15px;
        cursor: pointer;
    }

    .page-title .title-text {
        font-size: 1.9rem;
        color: #fff;
    }

    #search-albums {
        margin-bottom: 40px;
    }

    #arrow-up {
        right: 25px;
        left: auto;
        bottom: 25px;
        font-size: 1.6rem;
        cursor: pointer;
    }

    #arrow-up a {
        text-decoration: none;
        color: #fff;
        padding: 15px 18px;
        ;
        border: 1px solid #fff;
        border-radius: 50%;
        transition: 0.4s ease;
    }

    #arrow-up:hover a {
        background-color: #ACACAC;
    }

</style>
