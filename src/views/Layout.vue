<template>
    <div>
        <div class="Top">
            <span style="font-size:1rem;">头部</span>
        </div>
        <div style="min-height:10rem;width:100%;">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style lang="">
.Top{
    height: 2rem;
    border: 1px solid black;
}
</style>