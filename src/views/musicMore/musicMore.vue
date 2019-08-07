<template>
    <div>
        <div style="height:2rem;background:red;" @click="playAudio">
            播放音乐
        </div>
        <div style="height:2rem;background:red;" @click="pauseAudio">
            暂停音乐
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods:{
        // 进行播放歌曲
        playAudio(){
            let audio = document.getElementById('audio')
            audio.play()
        },
        // 暂停歌曲
        pauseAudio(){
            let audio = document.getElementById('audio')
            audio.pause()
        }
    }
}
</script>