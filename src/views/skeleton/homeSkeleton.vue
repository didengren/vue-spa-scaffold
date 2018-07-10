<template>
  <div class="skeleton page-1">
    <div class="section-1">
      <div class="floor-1">
        <dl>
          <dt></dt>
          <dd></dd>
          <dd></dd>
        </dl>
      </div>
      <div class="floor-2">
        <div class="area-1"><div></div><div></div></div>
        <div class="area-2"><div></div><div></div></div>
      </div>
    </div>
    <div class="section-2">
      <div class="rows">
        <div class="items" v-for="item in 2"></div>
      </div>
      <div class="rows">
        <div class="items" v-for="item in 2"></div>
      </div>
    </div>
  </div>
  <!-- <div class="skeleton page-2">
    <div class="art-title"><h2></h2> <p></p></div>
    <div class="art-con"></div>
  </div> -->
</template>
<style>
.skeleton{
  overflow: hidden;
}
.page-1 .section-1{
  overflow: hidden;
  height: 6rem;
}
.page-1 .section-1 .floor-1{
  margin-top: 1.05rem;
  margin-bottom: 0.7rem;
}
.page-1 .section-1 .floor-1 dl{
  margin: 0;
  padding: 0;
}
.page-1 .section-1 .floor-1 dl dt{
  border-radius: 50%;
  overflow: hidden;
  width: 0.933333rem;
  height: 0.933333rem;
  margin: 0 auto 0.64rem;
  background: #eee;
}
.page-1 .section-1 .floor-1 dl dd{
  margin: 0 auto 0.146667rem;
  height: 0.38rem;
  background: #eee;
  width: 50%;
}
.page-1 .section-1 .floor-1 dl dd:last-child h1{
  margin-bottom: 0;
}
.page-1 .section-1 .floor-2{
  overflow: hidden;
  padding: 0 0.5rem;
  margin-bottom: 0.72rem;
}
.page-1 .section-1 .floor-2 .area-1 div, .page-1 .section-1 .floor-2 .area-2 div{
  width: 70%;
  margin: 0 auto;
  background: #eee;
  height: 0.3rem;
  margin-bottom: 0.34rem;
}
.page-1 .section-1 .floor-2 .area-1{
  float: left;
  width: 50%;
  overflow: hidden;
}
.page-1 .section-1 .floor-2 .area-2{
  float: right;
  width: 50%;
  overflow: hidden;
}
.page-1 .section-1 .floor-2 .area-1 div:last-child, .page-1 .section-1 .floor-2 .area-2 div:last-child{
  margin-bottom: 0;
}
.page-1 .section-2{
  padding: 0 0.37rem 0.9rem;
  overflow: hidden;
}
.page-1 .section-2 .rows{
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.page-1 .section-2 .rows .items{
  margin: 0 0.09rem 0.2rem;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  background: #eee;
  height: 2rem;
}
.page-2{
  margin-top: 0.92rem;
  padding: 0.48rem 0.426667rem;
}
.page-2 .art-title{
  margin-bottom: 0.24rem;
}
.page-2 .art-title h2{
  height: 0.44rem;
  margin-bottom: 0.31rem;
  width: 1.6rem;
  background: #eee;
}
.page-2 .art-title p{
  height: 0.28rem;
  background: #eee;
  display: inline-block;
  width: 2.4rem;
}
.page-2 .art-con{
  width: 100%;
  height: 1.8rem;
  background: #eee;
}
</style>
