<template>
    <div>
        <div class="Top">
            头部
        </div>
        <div style="min-height:500px;width:100%;">
            <router-view/>
        </div>
        <div style="border:1px solid black;height:100px;">
            尾部
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
    height: 70px;
    border: 1px solid black;
}
</style>