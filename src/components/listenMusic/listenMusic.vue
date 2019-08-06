<template>
    <div>
        <div>
            播放音乐
        </div>
        <div>
            <audio  :src="url" controls="controls" autoplay="autoplay">
                Your browser does not support the audio element.
            </audio>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant';

export default {
    data() {
        return {
            id: '',
            musicInfo:[],
            url:''
        }
    },
    mounted() {
        this.id = this.$route.query.id
        this.getMusicInfo()
    },
    methods: {
        getMusicInfo(){
            axios.post('/api/song/url?id=' + this.id,{
                id: this.id
            }).then((res)=>{
                this.musicInfo = res.data.data
                console.log(res)
                this.url = res.data.data[0].url
                if(this.url == null)
                Toast('获取音乐失败，可能暂无版权')
            })
        }
    },
}
</script>