<template>
  <div>
    <h1>123</h1>
    <div class="img" :style="{ '--DefaultImageUrl': DefaultImageUrl}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        DefaultImageUrl: "",
      
    };
  },
  created() {
    this.DefaultImageUrl =
    'url("http://'+process.env.VUE_APP_API_URL+'/api/oss/getWorkContent?ImageDefaultStatus=1&WorksId=1")'
    console.log(this.DefaultImageUrl);
  },
};
</script>

<style lang="scss" scoped>
.img {
  width: 300px;
  height: 300px;
  background-image:var(--DefaultImageUrl);
}
</style>
