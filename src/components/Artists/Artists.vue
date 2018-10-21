<template>
    <div id="artists">
       <!-- App logo and text -->
        <div class="title">
            <div class="row">
                <div class="col-sm-12 text-center">
                    <div class="page-title">
                        <div class="title-image">
                            <img src="../../../public/skull.png">
                        </div>
                        <div class="title-text">
                            Top 10 Artist by Genre from last.fm
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!--form for choosing genre-->
        <form v-on:submit.prevent="getData" id="choose-genre">
            <div class="row">
                <div class="col-8 offset-2">
                    <div class="input-group input-group-lg">
                        <input type="text" class="form-control" v-model="genre">
                        <div class="input-group-prepend">
                            <button type="submit" class="btn" id="submit-btn">Find</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        
        <!-- artist cards -->
        <div class="artists-cards text-center">
            <div class="row">
                <app-artist v-for="artist in artists" :artist="artist" class="col-12 col-sm-6 col-md-4"></app-artist> <!-- for every single artist in 'artists' array, create app-artist, and pass data about single artist as prop to 'artist' component -->
            </div>
        </div>
        
    </div>
</template>


<script>
    import Artist from './Artist.vue'

    export default {
        components: {
            appArtist: Artist
        },
        data() {
            return {
                artists: [], //contains artist from 'getData' mehtod
                genre: 'rock' //default genre, change on submiting form input
            }
        },
        methods: {
            //get data about top artist for specified genre from last.fm API
            getData() {
                this.$http.get('http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=' + this.genre + '&limit=10&page=1&api_key=af70d8b9968c2bb588bc7af8f554feef&format=json')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        this.artists = data.topartists.artist //put data about top artist in array
                    })
            }
        },
        created() {
            //run 'getData' method when component is created
            this.getData()
        }
    }

</script>


<style scoped>
    #artists {
        color: #212221;
    }

    .page-title {
        padding: 30px 0;
    }

    .page-title .title-image {
        margin-bottom: 15px;
    }

    .page-title .title-text {
        font-size: 1.9rem;
        color: #fff;
    }

    #choose-genre {
        margin-bottom: 40px;
    }

    #submit-btn {
        background: #212221;
        color: #fff;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
    }

</style>
